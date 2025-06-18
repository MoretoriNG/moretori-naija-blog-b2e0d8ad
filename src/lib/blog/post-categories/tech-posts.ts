
import { generateId } from "../utils";

// Technology posts with enhanced images
export const techPosts = [
  {
    id: 1,
    title: 'The Future of AI in Nigeria: Opportunities and Challenges',
    slug: 'future-ai-nigeria-opportunities-challenges',
    excerpt: 'Exploring how artificial intelligence is reshaping various sectors in Nigeria',
    content: `<p>Artificial Intelligence is rapidly transforming Nigeria's technology landscape, with significant implications for various sectors including healthcare, education, finance, and agriculture.</p>
    <h2>Current AI Initiatives</h2>
    <p>Several Nigerian tech companies and startups are already implementing AI solutions to address local challenges, from fraud detection in banking to crop monitoring in agriculture.</p>
    <h2>Educational Integration</h2>
    <p>Universities and tech hubs across Nigeria are incorporating AI curriculum and training programs to prepare the next generation of tech professionals for an AI-driven economy.</p>
    <h2>Regulatory Framework</h2>
    <p>The Nigerian government is working on policies to govern AI development and deployment while encouraging innovation and protecting citizens' rights.</p>`,
    category_id: 1,
    image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    author: 'Dr. Adebayo Ogundimu',
    published_at: '2023-03-15',
    featured: true,
    tags: ['AI', 'Technology', 'Innovation', 'Nigeria']
  },
  {
    id: generateId(),
    title: 'Nigeria\'s Fintech Revolution: Banking for the Unbanked',
    slug: 'nigeria-fintech-revolution-banking-unbanked',
    excerpt: 'How mobile banking and digital payments are transforming financial inclusion',
    content: `<p>Nigeria's fintech sector has experienced explosive growth, with companies like Flutterwave, Paystack, and Interswitch leading the charge in revolutionizing financial services across Africa.</p>
    <h2>Mobile Money Adoption</h2>
    <p>The widespread adoption of mobile money services has brought millions of previously unbanked Nigerians into the formal financial system, enabling them to save, transfer money, and access credit.</p>
    <h2>Regulatory Support</h2>
    <p>The Central Bank of Nigeria has implemented progressive policies that support fintech innovation while maintaining financial stability and consumer protection.</p>
    <h2>Regional Expansion</h2>
    <p>Nigerian fintech companies are expanding across Africa, positioning Nigeria as a continental hub for financial technology innovation and investment.</p>`,
    category_id: 1,
    image_url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80',
    author: 'Kemi Adeosun',
    published_at: '2023-04-20',
    featured: false,
    tags: ['Fintech', 'Mobile Banking', 'Financial Inclusion', 'Innovation']
  },
  {
    id: generateId(),
    title: 'Smart Cities Initiative: Lagos Leading the Way',
    slug: 'smart-cities-initiative-lagos-leading',
    excerpt: 'How Lagos is implementing smart city technologies to improve urban living',
    content: `<p>Lagos State is at the forefront of Nigeria's smart city initiatives, implementing various technological solutions to address urban challenges and improve the quality of life for its residents.</p>
    <h2>Traffic Management</h2>
    <p>The implementation of intelligent traffic management systems and digital mapping has begun to address Lagos's notorious traffic congestion, with real-time monitoring and adaptive signal control.</p>
    <h2>Digital Infrastructure</h2>
    <p>Investment in fiber optic networks and 5G infrastructure is creating the backbone necessary for smart city applications and improved connectivity across the state.</p>
    <h2>Citizen Services</h2>
    <p>Digital platforms for government services, online payment systems, and mobile apps for public services are making it easier for residents to interact with government and access essential services.</p>`,
    category_id: 1,
    image_url: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=800&q=80',
    author: 'Tunde Bakare',
    published_at: '2023-05-10',
    featured: false,
    tags: ['Smart Cities', 'Urban Planning', 'Technology', 'Lagos']
  },
  {
    id: generateId(),
    title: 'Blockchain Technology in Nigeria: Beyond Cryptocurrency',
    slug: 'blockchain-technology-nigeria-beyond-cryptocurrency',
    excerpt: 'Exploring practical applications of blockchain in governance, supply chain, and identity management',
    content: `<p>While cryptocurrency often dominates blockchain discussions in Nigeria, the technology's potential extends far beyond digital currency, with applications in governance, supply chain management, and digital identity verification.</p>
    <h2>Supply Chain Transparency</h2>
    <p>Nigerian companies are beginning to use blockchain to track products from farm to consumer, ensuring authenticity and reducing fraud in agricultural exports and pharmaceutical supply chains.</p>
    <h2>Digital Identity</h2>
    <p>Blockchain-based identity management systems could help address challenges with identity verification and documentation, particularly in rural areas where traditional ID systems are less accessible.</p>
    <h2>Government Applications</h2>
    <p>Several state governments are exploring blockchain for land registry, voting systems, and transparent resource allocation to reduce corruption and improve public trust.</p>`,
    category_id: 1,
    image_url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80',
    author: 'Dr. Chinyere Okwu',
    published_at: '2023-06-18',
    featured: false,
    tags: ['Blockchain', 'Digital Identity', 'Supply Chain', 'Governance']
  },
  {
    id: generateId(),
    title: 'Nigeria\'s Tech Talent Exodus: Brain Drain or Global Expansion?',
    slug: 'nigeria-tech-talent-exodus-brain-drain-global-expansion',
    excerpt: 'Analyzing the impact of Nigerian tech professionals seeking opportunities abroad',
    content: `<p>The migration of Nigerian tech professionals to Europe, North America, and other global tech hubs has sparked debate about whether this represents a loss for Nigeria or an opportunity for global influence and knowledge transfer.</p>
    <h2>Skills and Opportunity Gap</h2>
    <p>Many Nigerian developers and tech professionals cite limited opportunities, poor infrastructure, and lower compensation as primary reasons for seeking opportunities abroad.</p>
    <h2>Remittances and Investment</h2>
    <p>Nigerian tech professionals abroad often invest back home, start companies with Nigerian operations, or eventually return with valuable experience and international connections.</p>
    <h2>Policy Responses</h2>
    <p>Government and private sector initiatives aimed at retaining tech talent include improved internet infrastructure, tax incentives for tech companies, and programs to support local startups and innovation hubs.</p>`,
    category_id: 1,
    image_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    author: 'Emeka Okafor',
    published_at: '2023-07-12',
    featured: false,
    tags: ['Tech Talent', 'Migration', 'Innovation', 'Policy']
  },
  {
    id: generateId(),
    title: 'Renewable Energy Tech: Solar Solutions for Rural Nigeria',
    slug: 'renewable-energy-tech-solar-solutions-rural-nigeria',
    excerpt: 'How innovative solar technology is bringing power to underserved communities',
    content: `<p>Innovative solar technology solutions are addressing Nigeria's electricity challenges, particularly in rural areas where grid connectivity is limited or unreliable.</p>
    <h2>Mini-Grid Solutions</h2>
    <p>Solar mini-grids are providing reliable electricity to rural communities, enabling small businesses, schools, and healthcare facilities to operate more effectively and improve quality of life.</p>
    <h2>Pay-as-You-Go Systems</h2>
    <p>Mobile payment integration with solar home systems allows families to access clean energy through affordable, flexible payment plans that match their income patterns.</p>
    <h2>Agricultural Applications</h2>
    <p>Solar-powered irrigation systems, cold storage, and processing equipment are helping farmers increase productivity and reduce post-harvest losses, contributing to food security and rural economic development.</p>`,
    category_id: 1,
    image_url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    author: 'Fatima Abubakar',
    published_at: '2023-08-25',
    featured: false,
    tags: ['Renewable Energy', 'Solar Power', 'Rural Development', 'Innovation']
  }
];
