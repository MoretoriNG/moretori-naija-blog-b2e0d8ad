
import { Post, PostCategory } from "@/types/blog";

// Sample post data
export const posts: Post[] = [
  {
    id: '1',
    title: 'The Future of AI: How It Will Transform Our Daily Lives',
    slug: 'future-of-ai-transform-daily-lives',
    excerpt: 'Exploring how artificial intelligence is set to revolutionize everything from how we work to how we live our everyday lives.',
    content: `<p>Artificial intelligence is rapidly transforming our world in ways we couldn't have imagined just a few years ago. From voice assistants that can understand complex commands to algorithms that can diagnose diseases with greater accuracy than human doctors, AI is becoming an integral part of our daily lives.</p>
    <p>The impact of AI extends far beyond just consumer tech gadgets. In healthcare, AI systems are helping to detect diseases earlier and develop personalized treatment plans. In transportation, self-driving vehicles promise to make our roads safer and more efficient. In education, AI tutors can adapt to individual learning styles to help students master difficult concepts.</p>
    <h2>The Workplace Revolution</h2>
    <p>One of the most significant changes will be in how we work. AI is already automating routine tasks, freeing up human workers to focus on more creative and strategic activities. But this is just the beginning. In the coming years, AI will become a true collaborator in the workplace, assisting with complex problem-solving and decision-making.</p>
    <p>This doesn't mean AI will replace human workers. Instead, it will augment human capabilities, handling the repetitive and data-heavy tasks while allowing people to focus on the uniquely human aspects of work: creativity, empathy, and strategic thinking.</p>
    <h2>Everyday Impact</h2>
    <p>In our homes, AI will continue to make our lives more convenient and efficient. Smart home systems will anticipate our needs, adjusting temperature, lighting, and other environmental factors automatically. Virtual assistants will become more natural and helpful, managing our schedules, helping us stay connected with loved ones, and even monitoring our health.</p>
    <p>As we look to the future, it's clear that AI will be as transformative as electricity or the internet. The question isn't whether AI will change our lives, but how we will adapt to and shape this powerful technology to benefit humanity.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80',
    category: 'tech',
    author: 'Alex Johnson',
    publishedAt: '2023-04-15T12:00:00Z',
    featured: true
  },
  {
    id: '2',
    title: 'Electric Cars vs. Hydrogen: The Future of Sustainable Vehicles',
    slug: 'electric-cars-vs-hydrogen-future-sustainable-vehicles',
    excerpt: 'Analyzing the pros and cons of electric and hydrogen-powered vehicles in the race for sustainable transportation.',
    content: `<p>As the world moves towards a more sustainable future, the automotive industry is at a crossroads: electric vehicles (EVs) or hydrogen fuel cell vehicles? Both technologies promise zero emissions at the tailpipe, but they take very different approaches to powering our transportation needs.</p>
    <h2>The Rise of Electric Vehicles</h2>
    <p>Electric vehicles have seen explosive growth in recent years, with companies like Tesla leading the charge. EVs offer several advantages: they're efficient, requiring less energy per mile than hydrogen vehicles; they can be charged at home; and they benefit from an increasingly robust public charging infrastructure.</p>
    <p>However, EVs also face challenges. Battery production requires mining rare earth materials, raising environmental and ethical concerns. Charging times, while improving, are still longer than refueling a conventional vehicle. And range anxiety remains a concern for many potential buyers, despite newer models offering 300+ miles on a single charge.</p>
    <h2>The Hydrogen Alternative</h2>
    <p>Hydrogen fuel cell vehicles convert hydrogen gas into electricity, emitting only water vapor. These vehicles can be refueled quickly, similar to conventional cars, and offer comparable range. Companies like Toyota and Hyundai have made significant investments in this technology.</p>
    <p>Yet hydrogen faces its own hurdles. The infrastructure for hydrogen refueling is minimal in most countries. Most hydrogen is currently produced from natural gas, negating some of its environmental benefits unless green hydrogen (produced using renewable energy) becomes more common. And the overall efficiency of hydrogen vehicles is lower than that of battery electric vehicles.</p>
    <h2>A Dual-Path Future?</h2>
    <p>Rather than a winner-takes-all scenario, we may see both technologies finding their place. Electric vehicles may dominate personal transportation, especially in urban areas, while hydrogen could power larger vehicles like buses, trucks, and possibly planes, where batteries would be too heavy or take too long to charge.</p>
    <p>What's clear is that the days of the internal combustion engine are numbered, and the future of transportation will be cleaner, quieter, and more sustainable.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=1200&q=80',
    category: 'auto',
    author: 'Maria Rodriguez',
    publishedAt: '2023-04-10T14:30:00Z',
    featured: false
  },
  {
    id: '3',
    title: 'Mindfulness and Mental Health: A Scientific Perspective',
    slug: 'mindfulness-mental-health-scientific-perspective',
    excerpt: 'Research shows how mindfulness practices can have significant benefits for mental health and overall wellbeing.',
    content: `<p>In recent years, mindfulness has gone from an ancient Buddhist practice to a mainstream wellness trend. But beyond the hype, scientific research is increasingly backing up the benefits of mindfulness for our mental health.</p>
    <p>Mindfulness, at its core, is the practice of paying attention to the present moment without judgment. This simple concept has profound implications for our mental wellbeing in a world that often feels designed to distract and fragment our attention.</p>
    <h2>The Science Behind Mindfulness</h2>
    <p>A growing body of research demonstrates that regular mindfulness practice can lead to measurable changes in the brain. MRI scans show increased density in the prefrontal cortex, which is responsible for rational thinking and decision-making, and decreased density in the amygdala, which is associated with fear and stress responses.</p>
    <p>Clinical studies have found that mindfulness-based interventions can be effective in treating a range of mental health conditions, including anxiety, depression, and post-traumatic stress disorder. These practices have also been shown to reduce stress, improve sleep quality, and enhance overall life satisfaction.</p>
    <h2>Integrating Mindfulness into Daily Life</h2>
    <p>The good news is that you don't need to meditate for hours to reap the benefits of mindfulness. Even short, regular practices can make a difference. This might involve formal meditation sessions, but it could also be as simple as taking a few mindful breaths before an important meeting, eating a meal without distractions, or going for a walk while fully engaging with your surroundings.</p>
    <p>In our increasingly fast-paced and digitally connected world, the ability to be fully present might be one of the most valuable skills we can cultivate for our mental health and overall wellbeing.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    category: 'health',
    author: 'David Kim',
    publishedAt: '2023-04-05T09:45:00Z',
    featured: true
  },
  {
    id: '4',
    title: 'Streaming Wars: How Platforms Are Fighting for Your Attention',
    slug: 'streaming-wars-platforms-fighting-attention',
    excerpt: 'As streaming services multiply, companies are spending billions on original content and exclusive rights to win subscribers.',
    content: `<p>Remember when Netflix was the only streaming service you needed? Those days are long gone. Today, viewers face an overwhelming array of options: Netflix, Amazon Prime, Disney+, HBO Max, Apple TV+, Paramount+, Peacock, Hulu, and many more niche services vying for a slice of the streaming pie.</p>
    <h2>Content is King</h2>
    <p>The battle for subscribers has sparked a content arms race. Netflix alone spent over $17 billion on content in 2021, while Disney pledged to spend $33 billion across its streaming platforms in 2022. This massive investment has led to a golden age of television, with high-quality original programming across genres and formats.</p>
    <p>Exclusive content has become the primary weapon in this war. Disney+ has the Marvel and Star Wars franchises, HBO Max offers DC movies and HBO's prestigious library, while Netflix continues to fund an enormous range of original shows and films across multiple languages and cultures.</p>
    <h2>The Subscriber Dilemma</h2>
    <p>For consumers, this proliferation of services presents a challenge: subscribe to multiple platforms at considerable cumulative cost, strategically rotate subscriptions, or miss out on must-see content. This has led to subscription fatigue, with some viewers returning to piracy as a way to access content spread across too many paywalls.</p>
    <p>Industry analysts predict that consolidation is inevitable. Not all current streaming services will survive as standalone offerings, and we may see more bundling options emerge, similar to traditional cable packages but with more flexibility.</p>
    <h2>The Future of Streaming</h2>
    <p>As competition intensifies, streaming platforms are exploring new ways to differentiate themselves beyond content. Interactive experiences, gaming integration, virtual reality, and innovative release strategies are all being tested. The lines between different forms of media and entertainment continue to blur.</p>
    <p>One thing is certain: the streaming landscape of five years from now will look very different from today's. The winners in this war will be those who can not only produce compelling content but also create an overall experience that viewers find indispensable.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?auto=format&fit=crop&w=1200&q=80',
    category: 'entertainment',
    author: 'Sarah Chen',
    publishedAt: '2023-03-28T16:15:00Z',
    featured: false
  },
  {
    id: '5',
    title: 'Climate Change: Latest Findings and What They Mean',
    slug: 'climate-change-latest-findings',
    excerpt: 'New research reveals accelerating climate impacts and highlights the urgent need for global action.',
    content: `<p>The latest scientific reports on climate change paint a sobering picture: global temperatures continue to rise, extreme weather events are becoming more frequent and severe, and the window for avoiding the worst impacts is rapidly closing.</p>
    <h2>Accelerating Impacts</h2>
    <p>Recent findings show that many climate impacts are occurring faster than previously predicted. Arctic sea ice is disappearing at rates not expected until mid-century. Sea levels are rising more quickly than forecast models suggested. And extreme weather events—from devastating wildfires to record-breaking floods—are increasing in both frequency and intensity.</p>
    <p>Scientists have also identified concerning feedback loops and tipping points in the climate system. For example, as permafrost thaws in Arctic regions, it releases methane, a potent greenhouse gas, which in turn accelerates warming—a vicious cycle that could lead to runaway climate change.</p>
    <h2>The Path Forward</h2>
    <p>Despite these alarming trends, researchers emphasize that it's not too late to avoid the worst-case scenarios. Rapid reductions in greenhouse gas emissions could still limit global warming to levels that, while challenging, would be more manageable than the catastrophic outcomes of unchecked climate change.</p>
    <p>The transition to renewable energy is happening faster than many expected, with solar and wind power now cheaper than fossil fuels in many regions. Electric vehicles are gaining market share rapidly. And new technologies for reducing emissions in hard-to-decarbonize sectors like steel and cement production are showing promise.</p>
    <h2>Individual and Collective Action</h2>
    <p>Addressing climate change requires action at all levels—from individual choices about consumption and transportation to national policies and international agreements. The latest research suggests that both systemic change and personal responsibility have important roles to play.</p>
    <p>While the challenge is immense, there is also reason for hope. The growing awareness of climate change has sparked a global movement for action, with young people leading the charge. As more people, companies, and governments commit to addressing this existential threat, the possibility of creating a sustainable future remains within reach—but time is of the essence.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
    category: 'news',
    author: 'Michael Thompson',
    publishedAt: '2023-03-22T11:20:00Z',
    featured: true
  }
];

// Helper functions
export const getAllPosts = (): Post[] => {
  return [...posts].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
};

export const getPostBySlug = (slug: string): Post | undefined => {
  return posts.find(post => post.slug === slug);
};

export const getPostsByCategory = (category: PostCategory): Post[] => {
  return posts
    .filter(post => post.category === category)
    .sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
};

export const getFeaturedPosts = (): Post[] => {
  return posts
    .filter(post => post.featured)
    .sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
};

export const getRecentPosts = (limit: number = 3): Post[] => {
  return [...posts]
    .sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, limit);
};

export const getCategoryColor = (category: PostCategory): string => {
  const colors: Record<PostCategory, string> = {
    tech: 'bg-blue-100 text-blue-800',
    auto: 'bg-red-100 text-red-800',
    health: 'bg-green-100 text-green-800',
    entertainment: 'bg-purple-100 text-purple-800',
    news: 'bg-amber-100 text-amber-800'
  };
  
  return colors[category] || 'bg-gray-100 text-gray-800';
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }).format(date);
};
