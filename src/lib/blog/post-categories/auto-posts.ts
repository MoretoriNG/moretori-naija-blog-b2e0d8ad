
import { generateId } from "../utils";

// Auto posts with enhanced images
export const autoPosts = [
  {
    id: generateId(),
    title: 'Electric Vehicles in Nigeria: The Road to Sustainable Transportation',
    slug: 'electric-vehicles-nigeria-sustainable-transportation',
    excerpt: 'Exploring the potential and challenges of EV adoption in Nigeria',
    content: `<p>Electric vehicles represent a significant opportunity for Nigeria to reduce its carbon footprint and dependence on imported fuel, but infrastructure and cost challenges must be addressed for widespread adoption.</p>
    <h2>Infrastructure Development</h2>
    <p>The development of charging station networks in major cities is crucial for EV adoption, with both government and private sector initiatives beginning to address this need.</p>
    <h2>Local Manufacturing</h2>
    <p>Several Nigerian companies are exploring local assembly and manufacturing of electric vehicles, which could reduce costs and create employment opportunities in the automotive sector.</p>
    <h2>Policy Support</h2>
    <p>Government incentives, including tax breaks and import duty reductions on EVs and charging equipment, are needed to accelerate adoption and make electric vehicles more affordable for Nigerian consumers.</p>`,
    category_id: 8,
    image_url: 'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?auto=format&fit=crop&w=800&q=80',
    author: 'Chidi Okwu',
    published_at: '2023-03-25',
    featured: true,
    tags: ['Electric Vehicles', 'Sustainability', 'Transportation', 'Technology']
  },
  {
    id: generateId(),
    title: 'The Rise of Local Car Assembly Plants',
    slug: 'rise-local-car-assembly-plants',
    excerpt: 'How Nigeria is building its automotive manufacturing capacity',
    content: `<p>Nigeria's automotive industry is experiencing renewed growth with several local assembly plants established by international manufacturers, creating jobs and reducing reliance on vehicle imports.</p>
    <h2>Manufacturing Partnerships</h2>
    <p>Partnerships between Nigerian companies and international automakers are bringing vehicle assembly operations to Nigeria, with plants producing cars, trucks, and buses for both local and regional markets.</p>
    <h2>Skills Development</h2>
    <p>Training programs are developing the technical skills needed for automotive manufacturing, creating opportunities for Nigerian workers in engineering, assembly, and quality control.</p>
    <h2>Supply Chain Development</h2>
    <p>Local content requirements are encouraging the development of Nigerian suppliers for automotive components, building a more integrated and sustainable automotive ecosystem.</p>`,
    category_id: 8,
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
    author: 'Amina Hassan',
    published_at: '2023-04-12',
    featured: false,
    tags: ['Manufacturing', 'Automotive Industry', 'Local Content', 'Economic Development']
  },
  {
    id: generateId(),
    title: 'Motorcycle Taxis: Transforming Urban Mobility',
    slug: 'motorcycle-taxis-transforming-urban-mobility',
    excerpt: 'The role of okada and ride-hailing motorcycles in Nigerian cities',
    content: `<p>Motorcycle taxis have become an integral part of Nigeria's urban transportation system, providing affordable mobility solutions and employment opportunities despite regulatory challenges.</p>
    <h2>Digital Platforms</h2>
    <p>Ride-hailing apps for motorcycles are improving safety and convenience while providing tracking and payment solutions that benefit both riders and passengers.</p>
    <h2>Safety Initiatives</h2>
    <p>Training programs for motorcycle taxi operators focus on road safety, defensive driving, and customer service to reduce accidents and improve service quality.</p>
    <h2>Economic Impact</h2>
    <p>The motorcycle taxi industry provides livelihoods for millions of Nigerians and offers an affordable transportation option that supports economic activity in urban areas.</p>`,
    category_id: 8,
    image_url: 'https://images.unsplash.com/photo-1558377052-81dad8e1b596?auto=format&fit=crop&w=800&q=80',
    author: 'Kemi Adebayo',
    published_at: '2023-05-08',
    featured: false,
    tags: ['Motorcycle Taxis', 'Urban Mobility', 'Transportation', 'Gig Economy']
  },
  {
    id: generateId(),
    title: 'Car Import vs Local Assembly: Economic Implications',
    slug: 'car-import-vs-local-assembly-economic-implications',
    excerpt: 'Analyzing the economic impact of vehicle import policies and local production',
    content: `<p>Nigeria's automotive policy aims to balance consumer choice with industrial development, creating tension between vehicle imports and local assembly operations.</p>
    <h2>Import Restrictions</h2>
    <p>Restrictions on vehicle imports are designed to encourage local assembly, but implementation challenges and enforcement issues affect both consumers and manufacturers.</p>
    <h2>Price Considerations</h2>
    <p>The cost of locally assembled vehicles compared to imports influences consumer purchasing decisions and the competitiveness of Nigerian automotive operations.</p>
    <h2>Technology Transfer</h2>
    <p>Local assembly operations provide opportunities for technology transfer and skills development that benefit Nigeria's long-term industrial capabilities and competitiveness.</p>`,
    category_id: 8,
    image_url: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80',
    author: 'Tunde Fashola',
    published_at: '2023-06-15',
    featured: false,
    tags: ['Automotive Policy', 'Import Substitution', 'Economic Policy', 'Manufacturing']
  },
  {
    id: generateId(),
    title: 'Road Infrastructure and Vehicle Maintenance Challenges',
    slug: 'road-infrastructure-vehicle-maintenance-challenges',
    excerpt: 'How poor road conditions affect vehicle longevity and maintenance costs',
    content: `<p>Nigeria's road infrastructure challenges significantly impact vehicle maintenance costs and lifespan, affecting both individual car owners and commercial transportation operators.</p>
    <h2>Maintenance Industry</h2>
    <p>The challenging road conditions have created a robust vehicle maintenance and repair industry, with skilled mechanics and spare parts dealers serving communities across the country.</p>
    <h2>Cost Implications</h2>
    <p>Poor road conditions increase fuel consumption, tire wear, and mechanical stress on vehicles, leading to higher total cost of ownership for Nigerian vehicle operators.</p>
    <h2>Infrastructure Investment</h2>
    <p>Ongoing road improvement projects aim to reduce vehicle operating costs and improve transportation efficiency, though progress varies significantly across different regions.</p>`,
    category_id: 8,
    image_url: 'https://images.unsplash.com/photo-1486754735734-325b5831c3ad?auto=format&fit=crop&w=800&q=80',
    author: 'Bola Tinubu',
    published_at: '2023-07-20',
    featured: false,
    tags: ['Road Infrastructure', 'Vehicle Maintenance', 'Transportation Costs', 'Infrastructure Development']
  },
  {
    id: generateId(),
    title: 'The Future of Autonomous Vehicles in Africa',
    slug: 'future-autonomous-vehicles-africa',
    excerpt: 'Exploring the potential impact of self-driving cars on African transportation',
    content: `<p>While autonomous vehicles may seem futuristic for Nigeria, understanding their potential impact and preparing for their eventual introduction is important for long-term transportation planning.</p>
    <h2>Infrastructure Requirements</h2>
    <p>Autonomous vehicles require sophisticated road infrastructure, digital mapping, and communication systems that present both challenges and opportunities for Nigerian development.</p>
    <h2>Economic Disruption</h2>
    <p>The introduction of autonomous vehicles could significantly impact employment in transportation sectors while creating new opportunities in technology and maintenance fields.</p>
    <h2>Gradual Adoption</h2>
    <p>The transition to autonomous vehicles will likely be gradual, starting with specific applications like highway freight transport before expanding to urban passenger services.</p>`,
    category_id: 8,
    image_url: 'https://images.unsplash.com/photo-1555487505-50e91d1f640d?auto=format&fit=crop&w=800&q=80',
    author: 'Dr. Adaora Okafor',
    published_at: '2023-08-10',
    featured: false,
    tags: ['Autonomous Vehicles', 'Future Technology', 'Transportation Planning', 'Innovation']
  }
];
