
import { generateId } from "../utils";

// Auto posts
export const autoPosts = [
  {
    id: generateId(),
    title: 'New Innoson SUV Takes Nigerian Roads by Storm',
    slug: 'innoson-suv-nigerian-roads',
    excerpt: 'Innoson Motors releases a game-changing SUV designed specifically for Nigerian terrain and conditions.',
    content: `<p>Nigerian automaker Innoson Vehicle Manufacturing (IVM) has unveiled its latest SUV model, designed specifically to handle the diverse and challenging road conditions across Nigeria. The new IVM G80 combines durability with modern comfort features at a competitive price point.</p>
    <h2>Built for Nigerian Roads</h2>
    <p>The IVM G80 features enhanced suspension systems, higher ground clearance, and reinforced underbody protection to tackle both urban potholes and rural unpaved roads with ease.</p>
    <h2>Local Manufacturing, Global Standards</h2>
    <p>Manufactured in Innoson's Nnewi plant, the G80 incorporates locally sourced materials while adhering to international safety and emissions standards. This approach has allowed Innoson to keep costs lower than imported competitors while maintaining quality.</p>
    <h2>Market Response</h2>
    <p>Early sales figures show strong demand from both private buyers and fleet operators, with government agencies also expressing interest in supporting local manufacturing through procurement.</p>`,
    category_id: 3,
    image_url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1470&q=80',
    author: 'Chidi Okonkwo',
    published_at: '2023-11-05',
    featured: true,
    tags: ['Innoson', 'SUV', 'Nigerian Manufacturing', 'Automotive']
  },
  {
    id: generateId(),
    title: 'Electric Mobility Solutions Gaining Traction in Lagos',
    slug: 'electric-mobility-lagos',
    excerpt: 'How innovative electric vehicle startups are solving transportation challenges in Nigeria's largest city.',
    content: `<p>As Lagos continues to battle traffic congestion and air pollution, a new wave of electric mobility startups is emerging with solutions tailored to Nigeria's unique transportation landscape.</p>
    <h2>Two-Wheel Revolution</h2>
    <p>Electric motorcycle services are leading the charge, with companies like MAX.ng and Gokada introducing e-bikes to their fleets. These vehicles produce zero emissions, have lower operating costs than their petrol counterparts, and can navigate through Lagos traffic efficiently.</p>
    <h2>Charging Infrastructure Challenges</h2>
    <p>While the benefits of electric vehicles are clear, inadequate power supply and limited charging infrastructure remain significant hurdles. Innovative startups are addressing these challenges through solar-powered charging stations and battery swap systems that eliminate lengthy charging times.</p>
    <h2>Local Manufacturing Potential</h2>
    <p>Some companies are exploring local assembly and manufacturing options to reduce costs and create jobs. This approach could make electric mobility more accessible to Nigerians while building technical expertise in the emerging sector.</p>`,
    category_id: 3,
    image_url: 'https://images.unsplash.com/photo-1521827298201-a290d203ae8f?auto=format&fit=crop&w=1491&q=80',
    author: 'Amina Ibrahim',
    published_at: '2023-12-18',
    featured: false,
    tags: ['Electric Vehicles', 'Lagos', 'Transportation', 'Clean Energy']
  },
  {
    id: generateId(),
    title: 'Nigeria's Growing Aftermarket Auto Parts Industry',
    slug: 'nigeria-aftermarket-auto-parts',
    excerpt: 'How local entrepreneurs are filling gaps in the automotive supply chain and creating opportunities.',
    content: `<p>Nigeria's automotive aftermarket sector is experiencing significant growth, driven by a large aging vehicle fleet and entrepreneurial innovation in parts manufacturing and distribution.</p>
    <h2>Local Manufacturing on the Rise</h2>
    <p>Small and medium-scale manufacturers are now producing certain vehicle components locally, including batteries, filters, and body parts. These businesses are creating employment while reducing dependency on imports.</p>
    <h2>Digital Marketplaces Connect Buyers and Sellers</h2>
    <p>Online platforms connecting mechanics, spare parts dealers, and consumers are streamlining the auto parts supply chain. Mobile apps like AutoSpareHub and PartsCatalog are making genuine parts more accessible across the country.</p>
    <h2>Quality Control Challenges</h2>
    <p>Despite progress, counterfeit parts remain a significant concern. Industry associations and regulatory bodies are working to implement better standards and certification processes to protect consumers and legitimate businesses.</p>`,
    category_id: 3,
    image_url: 'https://images.unsplash.com/photo-1566395727916-533deeee1a46?auto=format&fit=crop&w=1374&q=80',
    author: 'Gabriel Okafor',
    published_at: '2024-01-22',
    featured: false,
    tags: ['Auto Parts', 'Manufacturing', 'Supply Chain', 'Entrepreneurship']
  },
  {
    id: generateId(),
    title: 'Eco-Friendly Auto Detailing Gains Popularity in Nigeria',
    slug: 'eco-friendly-auto-detailing-nigeria',
    excerpt: 'Nigerian car owners embrace environmentally conscious car care services and products.',
    content: `<p>A growing environmental awareness among Nigerian car enthusiasts has fueled the rise of eco-friendly auto detailing services that use water-saving techniques and biodegradable cleaning products.</p>
    <h2>Water Conservation Techniques</h2>
    <p>Traditional car washing methods can waste hundreds of liters of water per vehicle. Newer eco-detailing services employ waterless or low-water cleaning methods that maintain quality while reducing environmental impact.</p>
    <h2>Natural and Biodegradable Products</h2>
    <p>Locally developed car care products using natural ingredients are replacing chemical-heavy imported alternatives. These products break down naturally without harming water systems and are often gentler on vehicle surfaces.</p>
    <h2>Premium Service with Environmental Benefits</h2>
    <p>Although typically priced higher than conventional detailing, eco-friendly services are finding success by marketing both the environmental benefits and the premium care they provide to valuable vehicles.</p>`,
    category_id: 3,
    image_url: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=1471&q=80',
    author: 'Folake Adebayo',
    published_at: '2024-02-08',
    featured: false,
    tags: ['Auto Detailing', 'Eco-Friendly', 'Car Care', 'Sustainability']
  },
  {
    id: generateId(),
    title: 'Classic Car Restoration Scene Thriving in Nigeria',
    slug: 'classic-car-restoration-nigeria',
    excerpt: 'Meet the craftsmen preserving automotive history and creating valuable classics in Nigerian workshops.',
    content: `<p>A passionate community of automotive enthusiasts and skilled technicians is breathing new life into classic vehicles, preserving Nigeria's automotive heritage while creating valuable assets.</p>
    <h2>Colonial-Era Collections</h2>
    <p>Vintage British cars from Nigeria's colonial era are among the most sought-after restoration projects, with Austin, Morris, and early Land Rover models finding new appreciation among collectors.</p>
    <h2>Traditional Craftsmanship Meets Modern Techniques</h2>
    <p>Restoration workshops often blend traditional metalworking and upholstery skills passed down through generations with modern tools and techniques. This combination allows for authentic restorations that meet contemporary reliability standards.</p>
    <h2>Growing Market for Restored Classics</h2>
    <p>Fully restored classic cars are fetching impressive prices in Nigeria's growing collector market, creating economic opportunities for skilled restorers and investment potential for owners.</p>`,
    category_id: 3,
    image_url: 'https://images.unsplash.com/photo-1533912295875-8c15a0ecd8e0?auto=format&fit=crop&w=1374&q=80',
    author: 'Emeka Ndukwe',
    published_at: '2024-03-12',
    featured: false,
    tags: ['Classic Cars', 'Restoration', 'Automotive Heritage', 'Craftsmanship']
  },
  {
    id: generateId(),
    title: 'Motorsport Development Programs Expanding Across Nigeria',
    slug: 'motorsport-development-nigeria',
    excerpt: 'New racing initiatives are creating pathways for Nigerian drivers to compete internationally.',
    content: `<p>Nigeria's motorsport scene is experiencing a revival with new racing events, driver development programs, and improved facilities offering opportunities for local talent to shine.</p>
    <h2>From Karting to Professional Racing</h2>
    <p>New karting facilities in Lagos, Abuja, and Port Harcourt are providing accessible entry points for young drivers. Structured progression programs help promising racers advance to formula and touring car competitions.</p>
    <h2>Rally Racing's Natural Advantage</h2>
    <p>Nigeria's diverse terrain makes it ideal for rally competitions. The Nigerian Rally Championship has expanded to include stages across the country, highlighting both driving skill and the nation's scenic landscapes.</p>
    <h2>International Recognition</h2>
    <p>Several Nigerian drivers who began in local development programs have secured seats in African and European racing series, bringing international attention to Nigeria's growing motorsport culture.</p>`,
    category_id: 3,
    image_url: 'https://images.unsplash.com/photo-1571607388263-1044f9ea01dd?auto=format&fit=crop&w=1395&q=80',
    author: 'Seun Ajayi',
    published_at: '2024-04-05',
    featured: false,
    tags: ['Motorsport', 'Racing', 'Driver Development', 'Sports']
  }
];
