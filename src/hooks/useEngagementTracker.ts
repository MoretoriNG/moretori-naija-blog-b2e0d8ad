import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Post } from '@/types/blog';

// Keys for localStorage
const LS_KEYS = {
  categories: 'mt_engagement_categories',
  likes: 'mt_engagement_likes',
  saves: 'mt_engagement_saves',
  views: 'mt_engagement_views',
} as const;

type CategoryCounts = Record<string, number>;

type ViewsMap = Record<string, number>; // postId -> timestamp

type SetString = string[];

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export function useEngagementTracker() {
  const [categoryCounts, setCategoryCounts] = useState<CategoryCounts>(() => readJSON<CategoryCounts>(LS_KEYS.categories, {}));
  const [liked, setLiked] = useState<SetString>(() => readJSON<SetString>(LS_KEYS.likes, []));
  const [saved, setSaved] = useState<SetString>(() => readJSON<SetString>(LS_KEYS.saves, []));
  const [views, setViews] = useState<ViewsMap>(() => readJSON<ViewsMap>(LS_KEYS.views, {}));

  useEffect(() => writeJSON(LS_KEYS.categories, categoryCounts), [categoryCounts]);
  useEffect(() => writeJSON(LS_KEYS.likes, liked), [liked]);
  useEffect(() => writeJSON(LS_KEYS.saves, saved), [saved]);
  useEffect(() => writeJSON(LS_KEYS.views, views), [views]);

  const recordCategoryView = useCallback((category: string) => {
    if (!category) return;
    setCategoryCounts(prev => ({ ...prev, [category]: (prev[category] || 0) + 1 }));
  }, []);

  const recordPostView = useCallback((postId: string | number) => {
    const id = String(postId);
    setViews(prev => ({ ...prev, [id]: Date.now() }));
  }, []);

  const recordLike = useCallback((postId: string | number, category?: string) => {
    const id = String(postId);
    setLiked(prev => (prev.includes(id) ? prev : [...prev, id]));
    if (category) recordCategoryView(category);
  }, [recordCategoryView]);

  const recordSave = useCallback((postId: string | number, category?: string) => {
    const id = String(postId);
    setSaved(prev => (prev.includes(id) ? prev : [...prev, id]));
    if (category) recordCategoryView(category);
  }, [recordCategoryView]);

  const removeSave = useCallback((postId: string | number) => {
    const id = String(postId);
    setSaved(prev => prev.filter(x => x !== id));
  }, []);

  const topCategories = useMemo(() => {
    return Object.entries(categoryCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([cat]) => cat);
  }, [categoryCounts]);

  // Simple scoring: likes > saves > category affinity > recency
  const getRecommendedPosts = useCallback((allPosts: Post[], limit = 6): Post[] => {
    const scores = new Map<string | number, number>();

    const now = Date.now();

    allPosts.forEach(p => {
      let s = 0;
      const id = p.id;
      const idStr = String(id);

      if (liked.includes(idStr)) s += 50;
      if (saved.includes(idStr)) s += 25;

      const cat = (p.category as string) || '';
      const catIndex = topCategories.indexOf(cat);
      if (catIndex > -1) s += Math.max(20 - catIndex * 5, 5);

      const viewTs = views[idStr];
      if (viewTs) {
        const hours = (now - viewTs) / (1000 * 60 * 60);
        s += Math.max(10 - Math.floor(hours / 24), 0); // small recency boost
      }

      // Featured gets a slight boost
      if (p.featured) s += 5;

      scores.set(id, s);
    });

    return [...allPosts]
      .sort((a, b) => (scores.get(b.id) || 0) - (scores.get(a.id) || 0))
      .slice(0, limit);
  }, [liked, saved, topCategories, views]);

  return {
    categoryCounts,
    liked,
    saved,
    views,
    topCategories,
    recordCategoryView,
    recordPostView,
    recordLike,
    recordSave,
    removeSave,
    getRecommendedPosts,
  };
}
