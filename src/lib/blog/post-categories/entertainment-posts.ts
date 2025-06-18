
import { generateId } from "../utils";

// Entertainment posts with enhanced images
export const entertainmentPosts = [
  {
    id: 3,
    title: 'Afrobeats: Nigeria\'s Global Cultural Export',
    slug: 'afrobeats-nigeria-cultural-export',
    excerpt: 'How Nigerian music is conquering the global stage',
    content: `<p>Nigerian Afrobeats has evolved from local sound to global phenomenon, with artists like Burna Boy, Wizkid, and Tems collaborating with international stars and winning prestigious awards worldwide.</p>
    <h2>Historic Grammy Recognitions</h2>
    <p>Recent Grammy wins by Nigerian artists mark a significant milestone in the genre's international recognition and influence on global music trends.</p>
    <h2>Cultural Impact</h2>
    <p>Beyond music, Afrobeats is introducing global audiences to Nigerian fashion, dance, language, and cultural expressions, creating new opportunities for cultural exchange.</p>
    <h2>Industry Growth</h2>
    <p>The success of Afrobeats is transforming Nigeria's music industry infrastructure, with improvements in production quality, distribution networks, and intellectual property protection.</p>`,
    category_id: 3,
    image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80',
    author: 'Chioma Okafor',
    published_at: '2023-03-18',
    featured: true,
    tags: ['Music', 'Culture', 'Entertainment', 'Afrobeats']
  },
  {
    id: generateId(),
    title: 'Nollywood\'s Global Streaming Success',
    slug: 'nollywood-global-streaming',
    excerpt: 'How Nigerian films are finding new audiences through international streaming platforms',
    content: `<p>Nigerian films are reaching unprecedented global audiences through major streaming platforms, introducing international viewers to Nollywood storytelling and creating new opportunities for the industry.</p>
    <h2>Production Quality Evolution</h2>
    <p>Streaming partnerships are driving improvements in production values, with platforms investing in Nigerian filmmakers and studios to create content that appeals to both local and international audiences.</p>
    <h2>Content Diversity</h2>
    <p>The streaming era is enabling Nigerian filmmakers to explore diverse genres and storytelling approaches beyond what traditional distribution channels typically supported.</p>
    <h2>Industry Impact</h2>
    <p>International streaming success is changing career trajectories for Nigerian actors, directors, and crew members, while also influencing how films are financed and produced locally.</p>`,
    category_id: 3,
    image_url: 'https://images.unsplash.com/photo-1489599809873-caab7b7e2fe7?auto=format&fit=crop&w=800&q=80',
    author: 'Ebuka Okafor',
    published_at: '2023-07-25',
    featured: false,
    tags: ['Nollywood', 'Streaming', 'Film Industry', 'Entertainment']
  },
  {
    id: generateId(),
    title: 'The Rise of Nigerian Comedy Shows',
    slug: 'nigerian-comedy-shows',
    excerpt: 'How stand-up comedy has become a major entertainment industry in Nigeria',
    content: `<p>Stand-up comedy has evolved into a thriving entertainment sector in Nigeria, with comedy shows filling major venues, attracting corporate sponsorship, and launching the careers of performers who have become household names.</p>
    <h2>Digital Transformation</h2>
    <p>Social media platforms and YouTube have transformed how comedians build audiences, with short clips and online specials often serving as entry points to larger careers in live performance and television.</p>
    <h2>Social Commentary</h2>
    <p>Nigerian comedians often blend humor with social and political commentary, addressing contemporary issues in ways that resonate with audiences while navigating sensitive topics.</p>
    <h2>International Tours</h2>
    <p>Leading Nigerian comedians now regularly tour internationally, performing for diaspora audiences and increasingly crossing over to mainstream comedy scenes in other countries.</p>`,
    category_id: 3,
    image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    author: 'Joy Adekunle',
    published_at: '2023-08-18',
    featured: false,
    tags: ['Comedy', 'Entertainment', 'Performance', 'Social Media']
  },
  {
    id: generateId(),
    title: 'Nigeria\'s Animation Industry Growth',
    slug: 'nigeria-animation-industry',
    excerpt: 'The emerging animation scene creating original African content',
    content: `<p>Nigeria's animation industry is experiencing significant growth, with studios producing original content that showcases African stories, aesthetics, and cultural elements for both local and international audiences.</p>
    <h2>Training New Talent</h2>
    <p>Animation schools and training programs are developing across Nigeria, building the skilled workforce needed to support the industry's expansion and technical advancement.</p>
    <h2>Cultural Storytelling</h2>
    <p>Many Nigerian animation projects draw inspiration from local folklore, history, and contemporary life, creating distinctive content that stands out in the global animation landscape.</p>
    <h2>Distribution Challenges</h2>
    <p>Despite creative successes, Nigerian animation studios continue to face challenges in distribution and monetization, with many exploring partnerships with international platforms to reach wider audiences.</p>`,
    category_id: 3,
    image_url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=800&q=80',
    author: 'Kemi Adeleke',
    published_at: '2023-09-20',
    featured: false,
    tags: ['Animation', 'Entertainment', 'Creative Industry', 'Digital Media']
  },
  {
    id: generateId(),
    title: 'Music Festivals Transforming Nigeria\'s Cultural Calendar',
    slug: 'music-festivals-nigeria',
    excerpt: 'The growth of major music events boosting tourism and cultural exchange',
    content: `<p>Large-scale music festivals are becoming increasingly significant in Nigeria's entertainment landscape, attracting international visitors, boosting local economies, and showcasing diverse musical talents.</p>
    <h2>Tourism Impact</h2>
    <p>Major festivals are emerging as tourism drivers, with events like Calabar Carnival and Gidi Culture Festival attracting visitors from across Africa and beyond, contributing to Nigeria's cultural economy.</p>
    <h2>Genre Diversity</h2>
    <p>While Afrobeats dominates many lineups, festivals celebrating jazz, alternative, indigenous, and fusion music are creating platforms for diverse musical expressions and audience development.</p>
    <h2>Infrastructure Development</h2>
    <p>The growing festival scene is driving investments in event infrastructure, sound and lighting technology, and logistics capabilities that benefit Nigeria's broader entertainment industry.</p>`,
    category_id: 3,
    image_url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80',
    author: 'Femi Adeyemi',
    published_at: '2023-10-22',
    featured: false,
    tags: ['Music', 'Festivals', 'Tourism', 'Cultural Events']
  },
  {
    id: generateId(),
    title: 'Gaming and Esports in Nigeria',
    slug: 'gaming-esports-nigeria',
    excerpt: 'The rapid growth of gaming culture and competitive esports',
    content: `<p>Gaming is rapidly emerging as a significant entertainment sector in Nigeria, with increasing numbers of young Nigerians participating in gaming communities and competitive esports events.</p>
    <h2>Local Game Development</h2>
    <p>Nigerian game developers are creating titles that reflect local themes and experiences, though they face challenges in distribution and monetization in a market still dominated by international games.</p>
    <h2>Competitive Gaming</h2>
    <p>Organized esports competitions are growing in scale and prize pools, with Nigerian players beginning to make their mark in regional and international tournaments across various game titles.</p>
    <h2>Economic Opportunities</h2>
    <p>The gaming ecosystem is creating new career paths for young Nigerians, from professional players and content creators to event organizers, commentators, and technical support roles.</p>`,
    category_id: 3,
    image_url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
    author: 'Tobi Ajayi',
    published_at: '2023-11-15',
    featured: false,
    tags: ['Gaming', 'Esports', 'Entertainment', 'Technology']
  },
];
