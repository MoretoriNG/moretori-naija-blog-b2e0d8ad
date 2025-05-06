
// Mock data for blog posts
export const categories = [
  { id: 1, name: 'Technology', slug: 'tech', description: 'Latest in tech and innovation' },
  { id: 2, name: 'Health', slug: 'health', description: 'Wellness and medical insights' },
  { id: 3, name: 'Entertainment', slug: 'entertainment', description: 'Movies, music, and celebrity news' },
  { id: 4, name: 'Business', slug: 'business', description: 'Finance, entrepreneurship, and market trends' },
  { id: 5, name: 'Sports', slug: 'sports', description: 'Latest in sports news and events' },
  { id: 6, name: 'Lifestyle', slug: 'lifestyle', description: 'Fashion, food, travel, and personal development' },
];

// Helper function to generate a unique ID
const generateId = (() => {
  let id = 30; // Start from a high number to avoid conflicts with existing posts
  return () => ++id;
})();

export const posts = [
  {
    id: 1,
    title: 'The Future of AI in Healthcare',
    slug: 'future-ai-healthcare',
    excerpt: 'How artificial intelligence is revolutionizing the healthcare industry',
    content: `<p>The integration of artificial intelligence in healthcare is transforming patient care, diagnosis, and treatment planning. From predictive analytics to robotic surgery, AI technologies are enhancing precision medicine approaches.</p>
    <h2>Early Detection</h2>
    <p>AI algorithms can detect patterns in medical images that might be missed by human eyes, potentially identifying diseases at earlier stages when they're more treatable.</p>
    <h2>Administrative Efficiency</h2>
    <p>Beyond clinical applications, AI is streamlining administrative tasks, reducing paperwork, and allowing healthcare professionals to spend more time with patients.</p>
    <h2>Challenges Ahead</h2>
    <p>Despite promising advances, concerns about data privacy, algorithmic bias, and the human element of care remain important considerations as AI becomes more prevalent in healthcare settings.</p>`,
    category_id: 2,
    image_url: '/images/healthcare-ai.jpg',
    author: 'Dr. Amina Okonkwo',
    published_at: '2023-04-15',
    featured: true,
    tags: ['AI', 'Healthcare', 'Technology', 'Medicine']
  },
  {
    id: 2,
    title: 'Nigeria\'s Rising Tech Ecosystem',
    slug: 'nigeria-rising-tech-ecosystem',
    excerpt: 'The growth of technology startups in Nigeria and their global impact',
    content: `<p>Nigeria's technology ecosystem is experiencing unprecedented growth, with Lagos emerging as one of Africa's leading startup hubs. Investment in Nigerian tech companies continues to rise as local entrepreneurs develop solutions for both local and global markets.</p>
    <h2>Fintech Leadership</h2>
    <p>Financial technology companies are at the forefront of Nigeria's tech revolution, addressing challenges in banking, payments, and financial inclusion across the continent.</p>
    <h2>Creating Opportunities</h2>
    <p>The expanding tech sector is creating new job opportunities and contributing significantly to economic diversification beyond traditional oil and gas industries.</p>
    <h2>Infrastructure Challenges</h2>
    <p>Despite remarkable progress, challenges in power supply, internet connectivity, and regulatory frameworks continue to impact scaling efforts for many promising startups.</p>`,
    category_id: 1,
    image_url: '/images/lagos-tech-hub.jpg',
    author: 'Tunde Johnson',
    published_at: '2023-05-02',
    featured: true,
    tags: ['Startups', 'Technology', 'Africa', 'Innovation']
  },
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
    image_url: '/images/afrobeats-concert.jpg',
    author: 'Chioma Okafor',
    published_at: '2023-03-18',
    featured: true,
    tags: ['Music', 'Culture', 'Entertainment', 'Afrobeats']
  },
  {
    id: 4,
    title: 'Sustainable Fashion in Nigeria',
    slug: 'sustainable-fashion-nigeria',
    excerpt: 'Nigerian designers pioneering eco-friendly fashion',
    content: `<p>A new generation of Nigerian fashion designers is embracing sustainability, using locally-sourced materials, traditional techniques, and ethical production processes while gaining international recognition.</p>
    <h2>Reviving Traditional Crafts</h2>
    <p>Many sustainable brands are revitalizing traditional textile techniques like adire and aso-oke, creating contemporary designs while preserving cultural heritage.</p>
    <h2>Environmental Innovation</h2>
    <p>From fabric recycling to plant-based dyes, Nigerian designers are finding creative ways to reduce the environmental impact of fashion production.</p>
    <h2>Challenging Fast Fashion</h2>
    <p>These sustainable brands are offering alternatives to imported fast fashion, educating consumers about the environmental and economic benefits of supporting local, ethical fashion.</p>`,
    category_id: 6,
    image_url: '/images/sustainable-fashion.jpg',
    author: 'Folake Adeola',
    published_at: '2023-06-10',
    featured: false,
    tags: ['Fashion', 'Sustainability', 'Design', 'Culture']
  },
  {
    id: 5,
    title: 'The Rise of Fintech in Africa',
    slug: 'rise-of-fintech-africa',
    excerpt: 'How digital financial services are transforming economies across the continent',
    content: `<p>Financial technology companies are driving unprecedented financial inclusion across Africa, providing services to millions previously excluded from traditional banking systems.</p>
    <h2>Mobile Money Revolution</h2>
    <p>The widespread adoption of mobile money solutions has created new economic opportunities and transformed how people save, send, and invest money.</p>
    <h2>Regulatory Innovation</h2>
    <p>African countries are developing progressive regulatory frameworks to balance innovation with consumer protection in the rapidly evolving fintech landscape.</p>
    <h2>Cross-Border Solutions</h2>
    <p>New fintech solutions are addressing the challenges of cross-border payments and trade, potentially accelerating economic integration across the continent.</p>`,
    category_id: 4,
    image_url: '/images/fintech-africa.jpg',
    author: 'Oluwaseun Adeyemi',
    published_at: '2023-02-28',
    featured: true,
    tags: ['Fintech', 'Banking', 'Innovation', 'Economy']
  },
  // Adding 25 new posts (5 for each category)
  // Technology posts
  {
    id: generateId(),
    title: 'The Impact of 5G Technology in Nigeria',
    slug: 'impact-5g-technology-nigeria',
    excerpt: 'Exploring how 5G is transforming connectivity and digital services in Nigeria',
    content: `<p>Nigeria's adoption of 5G technology marks a significant milestone in the country's digital transformation journey, promising faster speeds, lower latency, and enabling new applications from smart cities to remote healthcare.</p>
    <h2>Infrastructure Development</h2>
    <p>The rollout of 5G requires significant investment in infrastructure, creating both challenges and opportunities for Nigeria's telecommunications sector and digital economy.</p>
    <h2>Economic Opportunities</h2>
    <p>From enabling new business models to enhancing productivity across sectors, 5G technology has the potential to contribute significantly to Nigeria's economic growth and diversification efforts.</p>
    <h2>Addressing the Digital Divide</h2>
    <p>As 5G deployment begins in major cities, stakeholders must work to ensure that the benefits of this advanced technology eventually reach underserved communities to avoid widening the digital divide.</p>`,
    category_id: 1,
    image_url: '/images/5g-tower.jpg',
    author: 'Emeka Nwosu',
    published_at: '2023-07-15',
    featured: false,
    tags: ['5G', 'Telecommunications', 'Digital Transformation', 'Infrastructure']
  },
  {
    id: generateId(),
    title: 'Blockchain Applications Beyond Cryptocurrency',
    slug: 'blockchain-beyond-cryptocurrency',
    excerpt: 'How blockchain technology is being applied in various sectors in Nigeria',
    content: `<p>While often associated primarily with cryptocurrencies, blockchain technology is finding diverse applications across multiple sectors in Nigeria, from supply chain management to property registration.</p>
    <h2>Ensuring Food Safety</h2>
    <p>Blockchain-based systems are being developed to trace agricultural products from farm to table, enhancing food safety and helping farmers access premium markets through verified sustainability practices.</p>
    <h2>Securing Land Records</h2>
    <p>Pilot projects using blockchain for land registration aim to address longstanding challenges in property rights, reducing fraud and disputes while increasing transparency in land transactions.</p>
    <h2>Enhancing Public Services</h2>
    <p>Government agencies are exploring blockchain solutions for identity verification, academic credential verification, and other public services to reduce corruption and improve efficiency.</p>`,
    category_id: 1,
    image_url: '/images/blockchain-application.jpg',
    author: 'Yusuf Ibrahim',
    published_at: '2023-08-05',
    featured: false,
    tags: ['Blockchain', 'Technology', 'Innovation', 'Digital Transformation']
  },
  {
    id: generateId(),
    title: 'The Growth of Cloud Computing Services in Africa',
    slug: 'cloud-computing-africa',
    excerpt: 'How businesses across Africa are leveraging cloud technologies',
    content: `<p>Cloud computing adoption is accelerating across Africa, allowing businesses to access sophisticated IT infrastructure and services without massive capital investments in hardware.</p>
    <h2>Startups and Innovation</h2>
    <p>Cloud platforms are enabling African startups to build and scale innovative solutions rapidly, competing globally without the traditional barriers of IT infrastructure limitations.</p>
    <h2>Major Providers Expanding</h2>
    <p>Leading cloud service providers are establishing data centers across the continent, improving performance and addressing data sovereignty concerns for African businesses and governments.</p>
    <h2>Connectivity Challenges</h2>
    <p>Despite its benefits, cloud adoption faces challenges including reliable connectivity, cost of data, and skills gaps that stakeholders must address to fully realize its potential.</p>`,
    category_id: 1,
    image_url: '/images/cloud-computing.jpg',
    author: 'Blessing Afolabi',
    published_at: '2023-08-22',
    featured: false,
    tags: ['Cloud Computing', 'Digital Transformation', 'Business Technology', 'Data Centers']
  },
  {
    id: generateId(),
    title: 'Artificial Intelligence in African Languages',
    slug: 'ai-african-languages',
    excerpt: 'Efforts to develop AI solutions that support indigenous African languages',
    content: `<p>Researchers and developers across Africa are working to ensure that artificial intelligence technologies can understand and process African languages, making digital tools more accessible to diverse linguistic communities.</p>
    <h2>Natural Language Processing</h2>
    <p>Projects focusing on natural language processing for languages like Yoruba, Igbo, Swahili, and others are creating the foundation for more inclusive AI applications across the continent.</p>
    <h2>Voice Recognition Advances</h2>
    <p>Voice recognition systems being developed for African languages could transform how millions interact with technology, especially in communities with lower literacy rates.</p>
    <h2>Cultural Preservation</h2>
    <p>Beyond practical applications, these AI language projects contribute to the digital preservation of linguistic diversity and cultural heritage that might otherwise be at risk in the digital age.</p>`,
    category_id: 1,
    image_url: '/images/ai-language.jpg',
    author: 'Dr. Nkem Adebiyi',
    published_at: '2023-09-10',
    featured: false,
    tags: ['Artificial Intelligence', 'Languages', 'Technology', 'Cultural Heritage']
  },
  {
    id: generateId(),
    title: 'Cybersecurity Challenges in Nigeria\'s Digital Economy',
    slug: 'cybersecurity-nigeria-digital-economy',
    excerpt: 'Addressing growing security concerns as Nigeria\'s digital presence expands',
    content: `<p>As Nigeria's digital economy grows rapidly, cybersecurity threats are increasing in both frequency and sophistication, presenting significant challenges for businesses, individuals, and government institutions.</p>
    <h2>Financial Sector Vulnerabilities</h2>
    <p>Nigeria's expanding digital financial services face particular security challenges, with banks and fintech companies investing heavily in cybersecurity measures to protect customer assets and data.</p>
    <h2>Building Local Expertise</h2>
    <p>Educational institutions and training programs are working to address the shortage of cybersecurity professionals in Nigeria, developing local talent to meet growing demand for expertise.</p>
    <h2>Policy and Regulation</h2>
    <p>Government agencies are developing and implementing policies and regulations to enhance cybersecurity frameworks, though challenges remain in enforcement and keeping pace with evolving threats.</p>`,
    category_id: 1,
    image_url: '/images/cybersecurity.jpg',
    author: 'Victor Okonkwo',
    published_at: '2023-10-05',
    featured: false,
    tags: ['Cybersecurity', 'Digital Economy', 'Technology', 'Risk Management']
  },
  // Health posts
  {
    id: generateId(),
    title: 'Traditional Medicine in Modern Nigerian Healthcare',
    slug: 'traditional-medicine-modern-healthcare',
    excerpt: 'How traditional healing practices are being integrated with contemporary medicine',
    content: `<p>Nigeria is experiencing a growing interest in integrating traditional medicine with modern healthcare practices, recognizing the potential benefits of combining indigenous knowledge with scientific approaches.</p>
    <h2>Research and Standardization</h2>
    <p>Universities and research institutions are studying traditional remedies, documenting their properties, and working to establish standards that ensure safety and efficacy.</p>
    <h2>Policy Frameworks</h2>
    <p>Government health agencies are developing regulations to formally incorporate traditional practitioners into the healthcare system while ensuring patient safety and quality control.</p>
    <h2>Preserving Knowledge</h2>
    <p>Efforts to document and preserve traditional medical knowledge not only contribute to healthcare options but also protect cultural heritage that might otherwise be lost to future generations.</p>`,
    category_id: 2,
    image_url: '/images/traditional-medicine.jpg',
    author: 'Dr. Folashade Adewumi',
    published_at: '2023-07-20',
    featured: false,
    tags: ['Traditional Medicine', 'Healthcare', 'Cultural Heritage', 'Research']
  },
  {
    id: generateId(),
    title: 'Mental Health Awareness in Nigeria',
    slug: 'mental-health-awareness-nigeria',
    excerpt: 'Breaking stigma and improving access to mental health services',
    content: `<p>Mental health awareness is gradually increasing in Nigeria, with advocates working to reduce stigma, improve understanding, and expand access to mental health services across the country.</p>
    <h2>Challenging Stigma</h2>
    <p>Social media campaigns, community outreach, and celebrity advocacy are helping to challenge longstanding stigmas around mental health conditions and seeking professional help.</p>
    <h2>Training Healthcare Workers</h2>
    <p>Programs to train more mental health professionals and integrate mental health services into primary healthcare are expanding, though significant gaps in access remain.</p>
    <h2>Policy Development</h2>
    <p>Recent policy initiatives aim to improve mental health services and protections for people with mental health conditions, though implementation challenges persist due to resource limitations.</p>`,
    category_id: 2,
    image_url: '/images/mental-health.jpg',
    author: 'Damilola Owolabi',
    published_at: '2023-08-12',
    featured: false,
    tags: ['Mental Health', 'Healthcare', 'Awareness', 'Public Health']
  },
  {
    id: generateId(),
    title: 'Malaria Prevention Innovations in Africa',
    slug: 'malaria-prevention-innovations',
    excerpt: 'New approaches to combating one of Africa\'s most persistent health challenges',
    content: `<p>Innovative approaches to malaria prevention are showing promising results across Africa, combining new technologies with community engagement strategies to reduce infection rates.</p>
    <h2>Next-Generation Insecticides</h2>
    <p>Researchers are developing new types of insecticides to address the growing resistance of mosquitoes to current formulations, as well as more effective and longer-lasting bed nets.</p>
    <h2>Genetic Approaches</h2>
    <p>Experimental projects using genetically modified mosquitoes aim to reduce populations of malaria-carrying species in targeted areas, though these approaches remain controversial.</p>
    <h2>Vaccine Developments</h2>
    <p>Recent advances in malaria vaccines are creating new possibilities for prevention, with ongoing trials across the continent working to optimize effectiveness and implementation strategies.</p>`,
    category_id: 2,
    image_url: '/images/malaria-prevention.jpg',
    author: 'Dr. Ngozi Eze',
    published_at: '2023-09-05',
    featured: false,
    tags: ['Malaria', 'Public Health', 'Innovation', 'Disease Prevention']
  },
  {
    id: generateId(),
    title: 'Nutrition and Food Security in Nigeria',
    slug: 'nutrition-food-security-nigeria',
    excerpt: 'Addressing malnutrition challenges through policy and innovation',
    content: `<p>Nigeria continues to face significant challenges in nutrition and food security, with efforts underway to address malnutrition through agricultural innovation, education, and policy reform.</p>
    <h2>Child Nutrition Programs</h2>
    <p>Targeted programs focusing on the first 1000 days of life aim to reduce stunting and improve cognitive development through improved maternal and child nutrition practices.</p>
    <h2>Agricultural Solutions</h2>
    <p>Biofortification of staple crops and support for diverse farming systems are among the strategies being employed to increase the nutrient content of foods available to vulnerable communities.</p>
    <h2>Urban Food Systems</h2>
    <p>With increasing urbanization, initiatives focusing on urban agriculture and improved food distribution networks are working to ensure nutritious foods remain accessible and affordable in cities.</p>`,
    category_id: 2,
    image_url: '/images/food-security.jpg',
    author: 'Amara Nwankwo',
    published_at: '2023-10-15',
    featured: false,
    tags: ['Nutrition', 'Food Security', 'Public Health', 'Agriculture']
  },
  {
    id: generateId(),
    title: 'Telemedicine Expansion Across Rural Nigeria',
    slug: 'telemedicine-rural-nigeria',
    excerpt: 'How remote healthcare services are reaching underserved communities',
    content: `<p>Telemedicine services are expanding across rural Nigeria, helping bridge healthcare access gaps by connecting remote communities with medical expertise without requiring long and expensive travel.</p>
    <h2>Mobile Health Units</h2>
    <p>Mobile clinics equipped with telemedicine technology are reaching villages without permanent healthcare facilities, providing both basic care and specialist consultations.</p>
    <h2>Training Community Health Workers</h2>
    <p>Local health workers are being trained to facilitate telemedicine sessions, perform basic diagnostics, and provide follow-up care under the remote guidance of physicians.</p>
    <h2>Connectivity Challenges</h2>
    <p>Despite its promise, telemedicine expansion faces significant challenges including reliable internet connectivity, electricity access, and ensuring the quality of remote consultations.</p>`,
    category_id: 2,
    image_url: '/images/telemedicine.jpg',
    author: 'Dr. Chinedu Obi',
    published_at: '2023-11-08',
    featured: false,
    tags: ['Telemedicine', 'Rural Health', 'Healthcare Access', 'Technology']
  },
  // Entertainment posts
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
    image_url: '/images/nollywood-streaming.jpg',
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
    image_url: '/images/nigerian-comedy.jpg',
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
    image_url: '/images/nigeria-animation.jpg',
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
    image_url: '/images/music-festival.jpg',
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
    image_url: '/images/gaming-nigeria.jpg',
    author: 'Tobi Ajayi',
    published_at: '2023-11-15',
    featured: false,
    tags: ['Gaming', 'Esports', 'Entertainment', 'Technology']
  },
  // Business posts
  {
    id: generateId(),
    title: 'Agricultural Startups Revolutionizing Farming in Nigeria',
    slug: 'agritech-startups-nigeria',
    excerpt: 'How technology companies are addressing challenges in Nigeria\'s agricultural sector',
    content: `<p>Innovative agricultural technology startups are addressing longstanding challenges in Nigeria's farming sector, from improving access to markets to providing data-driven insights for increased productivity.</p>
    <h2>Market Access Solutions</h2>
    <p>Digital platforms connecting farmers directly with buyers are helping reduce waste, improve pricing, and increase profits by eliminating multiple intermediaries in the agricultural value chain.</p>
    <h2>Financial Inclusion</h2>
    <p>Agritech startups are developing specialized financial services for farmers, including micro-loans, insurance products, and payment systems designed for the unique needs and cash flow patterns of agricultural businesses.</p>
    <h2>Data-Driven Farming</h2>
    <p>Companies providing soil analysis, weather monitoring, and crop management tools are helping farmers make more informed decisions, potentially increasing yields while optimizing resource use.</p>`,
    category_id: 4,
    image_url: '/images/agritech.jpg',
    author: 'Adebayo Ogunlesi',
    published_at: '2023-07-30',
    featured: false,
    tags: ['Agriculture', 'Technology', 'Startups', 'Innovation']
  },
  {
    id: generateId(),
    title: 'Women Entrepreneurs Reshaping Nigeria\'s Business Landscape',
    slug: 'women-entrepreneurs-nigeria',
    excerpt: 'The growing influence of female-led businesses across various sectors',
    content: `<p>Women entrepreneurs are playing an increasingly significant role in Nigeria's economy, launching and scaling businesses across diverse sectors from technology to manufacturing, retail, and professional services.</p>
    <h2>Access to Funding</h2>
    <p>While funding disparities persist, specialized investment funds, grants, and networks focused on women-led businesses are helping address historical gaps in access to capital.</p>
    <h2>Mentorship and Training</h2>
    <p>Organizations providing mentorship, business skills development, and networking opportunities specifically for women entrepreneurs are contributing to higher success rates for female-led ventures.</p>
    <h2>Sector Diversity</h2>
    <p>Women business leaders are making notable impacts beyond traditionally female-dominated sectors, with growing representation in technology, renewable energy, construction, and other fields.</p>`,
    category_id: 4,
    image_url: '/images/women-entrepreneurs.jpg',
    author: 'Ngozi Orji',
    published_at: '2023-08-25',
    featured: false,
    tags: ['Entrepreneurship', 'Women in Business', 'Economic Development', 'Leadership']
  },
  {
    id: generateId(),
    title: 'Renewable Energy Investments in Nigeria',
    slug: 'renewable-energy-investments',
    excerpt: 'The growing business opportunities in Nigeria\'s green energy transition',
    content: `<p>Investment in renewable energy is accelerating in Nigeria, driven by improving technology economics, energy access challenges, and increasing awareness of climate considerations among businesses and policymakers.</p>
    <h2>Solar Solutions</h2>
    <p>Solar power companies are finding success with both large-scale projects and distributed solutions, including innovative pay-as-you-go models that make clean energy accessible to households and small businesses.</p>
    <h2>Policy Environment</h2>
    <p>Recent policy reforms are creating more favorable conditions for renewable energy investments, though challenges remain in areas such as permitting, grid integration, and consistent regulatory implementation.</p>
    <h2>Local Manufacturing</h2>
    <p>Beyond energy generation, businesses are exploring opportunities in local assembly and manufacturing of renewable energy components, potentially creating new jobs and reducing import dependencies.</p>`,
    category_id: 4,
    image_url: '/images/renewable-energy.jpg',
    author: 'Ibrahim Suleiman',
    published_at: '2023-09-28',
    featured: false,
    tags: ['Renewable Energy', 'Investment', 'Sustainability', 'Business']
  },
  {
    id: generateId(),
    title: 'E-commerce Evolution in Nigeria',
    slug: 'ecommerce-evolution-nigeria',
    excerpt: 'How online retail is adapting to local market conditions',
    content: `<p>Nigeria's e-commerce sector continues to evolve, with companies adapting their models to address unique local challenges while capitalizing on the country's large market and increasing smartphone penetration.</p>
    <h2>Payment Innovations</h2>
    <p>E-commerce platforms are implementing diverse payment options beyond credit cards, including mobile money, bank transfers, and pay-on-delivery to accommodate varied consumer preferences and financial access realities.</p>
    <h2>Logistics Solutions</h2>
    <p>Companies are developing innovative approaches to last-mile delivery in challenging environments, from hyper-local fulfillment centers to partnerships with existing informal transportation networks.</p>
    <h2>Social Commerce</h2>
    <p>Beyond traditional e-commerce websites, significant online retail activity is occurring through social media platforms, messaging apps, and informal online marketplaces, creating a distinctive Nigerian digital commerce ecosystem.</p>`,
    category_id: 4,
    image_url: '/images/ecommerce-nigeria.jpg',
    author: 'Amina Mohammed',
    published_at: '2023-10-30',
    featured: false,
    tags: ['E-commerce', 'Retail', 'Digital Business', 'Consumer Trends']
  },
  {
    id: generateId(),
    title: 'Corporate Sustainability Initiatives in Nigerian Business',
    slug: 'corporate-sustainability-nigeria',
    excerpt: 'How major companies are incorporating environmental and social responsibility',
    content: `<p>Sustainability practices are gaining prominence in Nigeria's corporate landscape, with companies across sectors developing environmental and social initiatives that go beyond compliance to create business and societal value.</p>
    <h2>Industry Leaders</h2>
    <p>Major corporations in sectors like banking, telecommunications, and energy are setting sustainability benchmarks through comprehensive strategies addressing their environmental footprint, social impact, and governance practices.</p>
    <h2>Supply Chain Focus</h2>
    <p>Companies are increasingly extending sustainability requirements to their suppliers, creating ripple effects that influence practices across business ecosystems beyond direct corporate operations.</p>
    <h2>Reporting Standards</h2>
    <p>Adoption of international sustainability reporting frameworks is increasing, improving transparency and allowing stakeholders to more effectively compare and evaluate companies' environmental and social performance.</p>`,
    category_id: 4,
    image_url: '/images/corporate-sustainability.jpg',
    author: 'Chika Okeke',
    published_at: '2023-11-22',
    featured: false,
    tags: ['Sustainability', 'Corporate Responsibility', 'Business', 'Environment']
  },
  // Sports posts
  {
    id: generateId(),
    title: 'Nigeria\'s Basketball Renaissance',
    slug: 'nigeria-basketball-renaissance',
    excerpt: 'The rising global profile of Nigerian basketball talent',
    content: `<p>Nigerian basketball is experiencing unprecedented international recognition, with players of Nigerian heritage making significant impacts in the NBA, European leagues, and international competitions.</p>
    <h2>NBA Success</h2>
    <p>The number of NBA players with Nigerian connections has grown substantially, with several achieving star status and using their platforms to promote basketball development in Nigeria.</p>
    <h2>National Team Progress</h2>
    <p>Nigeria's national basketball teams are achieving historic milestones in international competitions, raising the profile of the sport domestically and attracting increased resources and attention.</p>
    <h2>Grassroots Development</h2>
    <p>Basketball academies and development programs are expanding across Nigeria, improving the pathway for young players and potentially establishing the country as a global talent hub for the sport.</p>`,
    category_id: 5,
    image_url: '/images/nigeria-basketball.jpg',
    author: 'Michael Olajuwon',
    published_at: '2023-08-02',
    featured: false,
    tags: ['Basketball', 'Sports', 'NBA', 'Athlete Development']
  },
  {
    id: generateId(),
    title: 'The Evolution of Nigerian Football Academies',
    slug: 'nigerian-football-academies',
    excerpt: 'How youth development structures are transforming Nigerian soccer',
    content: `<p>Professional football academies are multiplying across Nigeria, providing more structured development pathways for young players and potentially transforming how the country produces talent for domestic and international careers.</p>
    <h2>Professional Standards</h2>
    <p>Leading academies are implementing international standards in coaching, facilities, and education, creating more comprehensive development environments than traditional talent pathways.</p>
    <h2>Education Integration</h2>
    <p>Many modern academies emphasize academic education alongside football training, preparing players for alternative careers and addressing historical concerns about young players' welfare.</p>
    <h2>International Partnerships</h2>
    <p>Collaborations between Nigerian academies and European clubs are becoming more common, creating clearer pathways for exceptional talents while providing technical and financial resources for local development.</p>`,
    category_id: 5,
    image_url: '/images/football-academy.jpg',
    author: 'Sunday Oliseh',
    published_at: '2023-09-12',
    featured: false,
    tags: ['Football', 'Youth Development', 'Sports', 'Education']
  },
  {
    id: generateId(),
    title: 'Nigeria\'s Olympic Preparations and Prospects',
    slug: 'nigeria-olympic-preparations',
    excerpt: 'The country\'s preparation strategy for upcoming Olympic Games',
    content: `<p>Nigeria is implementing more systematic approaches to Olympic preparation, investing in targeted sports where Nigerian athletes have shown potential for international success.</p>
    <h2>Focus Sports</h2>
    <p>Rather than spreading resources thinly, sports authorities are concentrating on disciplines like athletics, wrestling, and table tennis where Nigerian athletes have demonstrated competitive advantages.</p>
    <h2>Athlete Support</h2>
    <p>Improved funding mechanisms for elite athletes are providing more consistent training support, international competition exposure, and access to scientific and medical resources.</p>
    <h2>Facility Development</h2>
    <p>Strategic investments in training facilities for priority sports aim to reduce the need for top athletes to relocate abroad for quality training environments, though significant infrastructure gaps remain.</p>`,
    category_id: 5,
    image_url: '/images/olympic-preparation.jpg',
    author: 'Chioma Ajunwa',
    published_at: '2023-10-05',
    featured: false,
    tags: ['Olympics', 'Sports', 'Athletics', 'National Team']
  },
  {
    id: generateId(),
    title: 'The Growth of Combat Sports in Nigeria',
    slug: 'combat-sports-nigeria',
    excerpt: 'How boxing, MMA, and traditional wrestling are gaining popularity',
    content: `<p>Combat sports are experiencing a significant resurgence in Nigeria, with increasing participation, viewership, and international success across disciplines from boxing and MMA to traditional wrestling forms.</p>
    <h2>Boxing Revival</h2>
    <p>Following a period of decline, Nigerian boxing is showing signs of revival with new promotions, emerging talents, and increasing international opportunities for fighters across weight divisions.</p>
    <h2>MMA Expansion</h2>
    <p>Mixed martial arts is rapidly growing in popularity, with local promotions developing and Nigerian fighters making impacts in major international organizations like the UFC and Bellator.</p>
    <h2>Traditional Wrestling</h2>
    <p>Indigenous wrestling traditions are finding new audiences through modernized promotions that maintain cultural elements while adding production values that appeal to contemporary sports fans.</p>`,
    category_id: 5,
    image_url: '/images/combat-sports.jpg',
    author: 'Kamaru Usman',
    published_at: '2023-11-08',
    featured: false,
    tags: ['Combat Sports', 'Boxing', 'MMA', 'Traditional Sports']
  },
  {
    id: generateId(),
    title: 'Women\'s Sports Development in Nigeria',
    slug: 'womens-sports-nigeria',
    excerpt: 'Progress and challenges in growing female participation in sports',
    content: `<p>Women's sports in Nigeria are gaining momentum, with increasing participation, visibility, and success at international competitions, though significant challenges in resources and cultural attitudes remain.</p>
    <h2>Football Growth</h2>
    <p>Women's football has seen substantial development, with the national team achieving continental success and increasing numbers of players securing professional contracts domestically and internationally.</p>
    <h2>Emerging Champions</h2>
    <p>Nigerian female athletes are achieving breakthrough successes in individual sports like wrestling, athletics, and basketball, becoming role models for the next generation of young women in sports.</p>
    <h2>Structural Challenges</h2>
    <p>Despite progress, women's sports continue to face disparities in funding, facilities, media coverage, and commercial support compared to men's sports, limiting growth potential and career opportunities.</p>`,
    category_id: 5,
    image_url: '/images/womens-sports.jpg',
    author: 'Blessing Okagbare',
    published_at: '2023-12-10',
    featured: false,
    tags: ['Women in Sports', 'Gender Equality', 'Athletics', 'Football']
  },
  // Lifestyle posts
  {
    id: generateId(),
    title: 'Modern Nigerian Interior Design Trends',
    slug: 'nigerian-interior-design',
    excerpt: 'How contemporary Nigerian homes are blending tradition with modern aesthetics',
    content: `<p>Nigerian interior design is evolving with distinctive approaches that blend traditional cultural elements with contemporary international influences, creating spaces that are both globally current and culturally grounded.</p>
    <h2>Local Materials Renaissance</h2>
    <p>Designers are rediscovering and reimagining traditional Nigerian materials like aso-oke textiles, local woods, and artisanal metalwork, incorporating them into modern interiors in fresh, sophisticated ways.</p>
    <h2>Color Philosophy</h2>
    <p>While global minimalist trends favor neutral palettes, many Nigerian designers embrace bold colors that reflect the vibrancy of local culture while using contemporary applications that avoid visual overwhelm.</p>
    <h2>Functional Adaptations</h2>
    <p>Designs increasingly address practical realities of urban Nigerian living, with innovative solutions for challenges like power supply, security, climate control, and space optimization in growing cities.</p>`,
    category_id: 6,
    image_url: '/images/nigerian-interior.jpg',
    author: 'Tola Akerele',
    published_at: '2023-08-05',
    featured: false,
    tags: ['Interior Design', 'Home Decor', 'Cultural Heritage', 'Architecture']
  },
  {
    id: generateId(),
    title: 'Nigerian Fitness Culture',
    slug: 'nigerian-fitness-culture',
    excerpt: 'The evolution of fitness trends and wellness practices in Nigeria',
    content: `<p>Fitness culture is flourishing in Nigeria's urban centers, with diverse approaches to physical wellness gaining popularity and fitness becoming an increasingly important aspect of contemporary lifestyle for many Nigerians.</p>
    <h2>Gym Proliferation</h2>
    <p>Modern fitness centers are expanding rapidly in major cities, offering everything from traditional weight training to specialized fitness concepts catering to different preferences and price points.</p>
    <h2>Outdoor Fitness Communities</h2>
    <p>Community running clubs, boot camps, and outdoor workout groups are creating social fitness experiences that blend exercise with networking and community building across Nigerian cities.</p>
    <h2>Digital Transformation</h2>
    <p>Nigerian fitness influencers and digital platforms are making workout guidance more accessible, while wearable fitness technology adoption is growing among health-conscious urban professionals.</p>`,
    category_id: 6,
    image_url: '/images/fitness-culture.jpg',
    author: 'Femi Adeyemi',
    published_at: '2023-09-18',
    featured: false,
    tags: ['Fitness', 'Wellness', 'Health', 'Lifestyle']
  },
  {
    id: generateId(),
    title: 'Nigerian Food Bloggers Transforming Culinary Culture',
    slug: 'nigerian-food-bloggers',
    excerpt: 'How digital content creators are influencing cooking and dining trends',
    content: `<p>Nigerian food bloggers and content creators are significantly influencing how people cook, eat, and think about Nigerian cuisine, both within the country and internationally.</p>
    <h2>Recipe Documentation</h2>
    <p>Food bloggers are systematically documenting traditional recipes that were previously passed down orally, helping preserve culinary heritage while making it accessible to younger, urban audiences.</p>
    <h2>Modern Adaptations</h2>
    <p>Creative content creators are developing health-conscious or internationally-influenced adaptations of classic Nigerian dishes, responding to changing dietary preferences and global food trends.</p>
    <h2>Cultural Ambassadors</h2>
    <p>Through engaging content, Nigerian food influencers are introducing global audiences to the country's rich culinary traditions, contributing to growing international interest in West African cuisine.</p>`,
    category_id: 6,
    image_url: '/images/food-bloggers.jpg',
    author: 'Ozoz Sokoh',
    published_at: '2023-10-20',
    featured: false,
    tags: ['Food', 'Culinary Arts', 'Digital Media', 'Cultural Heritage']
  },
  {
    id: generateId(),
    title: 'Domestic Tourism Growth in Nigeria',
    slug: 'domestic-tourism-nigeria',
    excerpt: 'Nigerians exploring their own country\'s destinations and attractions',
    content: `<p>Domestic tourism is experiencing significant growth in Nigeria, with more citizens choosing to explore destinations within the country for leisure, cultural experiences, and adventure travel.</p>
    <h2>Destination Development</h2>
    <p>Both government initiatives and private investments are improving infrastructure and services at key tourist sites, making them more accessible and appealing to domestic visitors.</p>
    <h2>Travel Content Creation</h2>
    <p>Nigerian travel bloggers and social media influencers are showcasing the country's diverse attractions, inspiring followers to visit locations they might otherwise not have considered.</p>
    <h2>Experience Evolution</h2>
    <p>Tour operators are developing more sophisticated offerings beyond basic sightseeing, including themed experiences, adventure tourism, cultural immersion, and sustainable tourism options.</p>`,
    category_id: 6,
    image_url: '/images/domestic-tourism.jpg',
    author: 'Funmi Oyatogun',
    published_at: '2023-11-15',
    featured: false,
    tags: ['Tourism', 'Travel', 'Domestic Exploration', 'Cultural Experience']
  },
  {
    id: generateId(),
    title: 'Minimalism and Intentional Living in Nigerian Context',
    slug: 'minimalism-nigeria',
    excerpt: 'Adapting global simple living trends to Nigerian cultural realities',
    content: `<p>Minimalist and intentional living philosophies are being adapted to Nigerian contexts, with growing interest in simpler, more mindful approaches to consumption, possessions, and lifestyle choices.</p>
    <h2>Cultural Adaptation</h2>
    <p>Nigerian minimalism often differs from Western versions, incorporating values of community, generosity, and cultural heritage while still focusing on reducing excess and intentional living.</p>
    <h2>Practical Applications</h2>
    <p>From decluttering homes to mindful consumption and digital detoxing, Nigerians are applying minimalist principles in ways that address local lifestyle challenges and priorities.</p>
    <h2>Financial Minimalism</h2>
    <p>Concepts of financial minimalism and intentional spending are resonating particularly strongly, with communities forming around debt-free living, saving, and investment rather than consumption.</p>`,
    category_id: 6,
    image_url: '/images/minimalism-nigeria.jpg',
    author: 'Tunde Johnson',
    published_at: '2023-12-05',
    featured: false,
    tags: ['Minimalism', 'Lifestyle', 'Intentional Living', 'Sustainability']
  }
];

export const getPostsByCategory = (categoryId) => {
  return posts.filter(post => post.category_id === categoryId);
};

export const getPostBySlug = (slug) => {
  return posts.find(post => post.slug === slug);
};

export const getFeaturedPosts = () => {
  return posts.filter(post => post.featured);
};

export const getRecentPosts = (limit = 6) => {
  return [...posts]
    .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
    .slice(0, limit);
};

export const getRelatedPosts = (currentPostId, categoryId, limit = 3) => {
  return posts
    .filter(post => post.category_id === categoryId && post.id !== currentPostId)
    .sort(() => 0.5 - Math.random())
    .slice(0, limit);
};

export const getCategoryBySlug = (slug) => {
  return categories.find(category => category.slug === slug);
};

export const getCategoryById = (id) => {
  return categories.find(category => category.id === id);
};

export const searchPosts = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return posts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) || 
    post.excerpt.toLowerCase().includes(lowercaseQuery) || 
    post.content.toLowerCase().includes(lowercaseQuery)
  );
};

// Tags related functions
export const getAllTags = () => {
  const tagsSet = new Set();
  posts.forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => tagsSet.add(tag));
    }
  });
  return Array.from(tagsSet);
};

export const getPostsByTag = (tag) => {
  return posts.filter(post => post.tags && post.tags.includes(tag));
};
