
import { generateId } from "../utils";

// News posts
export const newsPosts = [
  {
    id: generateId(),
    title: 'Nigeria's Digital Infrastructure Plan Receives Major Funding',
    slug: 'nigeria-digital-infrastructure-funding',
    excerpt: 'Federal government secures international partnerships to expand broadband access across rural communities.',
    content: `<p>A landmark $500 million investment package from international development partners will fund Nigeria's ambitious rural connectivity program, aiming to bring high-speed internet access to 60% of rural communities by 2026.</p>
    <h2>Closing the Digital Divide</h2>
    <p>The initiative will deploy a combination of fiber optic networks and low-orbit satellite technology to connect previously underserved communities, enabling access to digital education, telehealth services, and e-commerce opportunities.</p>
    <h2>Economic Impact Projections</h2>
    <p>Government economists estimate the program could generate over 100,000 direct and indirect jobs while adding up to 2% to the country's GDP through increased digital participation and new online businesses.</p>
    <h2>Implementation Timeline</h2>
    <p>The first phase will target 200 rural communities across all six geopolitical zones, with installations beginning next quarter. The full program is expected to reach over 1,000 communities within three years.</p>`,
    category_id: 7,
    image_url: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=1470&q=80',
    author: 'Ibrahim Mohammed',
    published_at: '2023-12-05',
    featured: true,
    tags: ['Infrastructure', 'Digital Economy', 'Rural Development', 'Technology']
  },
  {
    id: generateId(),
    title: 'Landmark Climate Adaptation Policy Enacted',
    slug: 'nigeria-climate-adaptation-policy',
    excerpt: 'New legislation establishes funding and guidelines for climate resilience projects across vulnerable regions.',
    content: `<p>Nigeria's parliament has approved a comprehensive climate adaptation framework that allocates 1% of federal revenue to climate resilience projects and establishes clear guidelines for implementation across all levels of government.</p>
    <h2>Flood Mitigation Priority</h2>
    <p>Following devastating floods in recent years, the policy prioritizes infrastructure improvements in flood-prone communities, including drainage systems, early warning networks, and elevated housing standards.</p>
    <h2>Agricultural Resilience Programs</h2>
    <p>Farmers will receive support for climate-smart agricultural practices, drought-resistant crop varieties, and improved irrigation systems to stabilize food production despite increasing climate volatility.</p>
    <h2>Urban Heat Management</h2>
    <p>Major cities will implement urban cooling strategies including expanded green spaces, reflective building standards, and cooling centers to combat rising temperatures and heat-related health risks.</p>`,
    category_id: 7,
    image_url: 'https://images.unsplash.com/photo-1544961371-516024f8e267?auto=format&fit=crop&w=1374&q=80',
    author: 'Amina Abdulkadir',
    published_at: '2024-01-15',
    featured: false,
    tags: ['Climate Change', 'Policy', 'Environmental Protection', 'Infrastructure']
  },
  {
    id: generateId(),
    title: 'Nigerian Researchers Develop Low-Cost Water Purification System',
    slug: 'nigerian-water-purification-innovation',
    excerpt: 'Team from University of Lagos creates sustainable solution for clean drinking water using locally available materials.',
    content: `<p>A research team from the University of Lagos has developed and successfully tested an innovative water purification system that uses locally sourced materials to remove contaminants, providing clean drinking water at a fraction of conventional treatment costs.</p>
    <h2>Sustainable Design</h2>
    <p>The system combines activated carbon made from agricultural waste, locally manufactured ceramic filters, and solar disinfection to create a purification process that operates without electricity or expensive imported components.</p>
    <h2>Field Tests Promising</h2>
    <p>Initial deployments in communities across Lagos State have demonstrated the system's effectiveness in removing bacterial contamination, heavy metals, and other pollutants from various water sources.</p>
    <h2>Scaling Potential</h2>
    <p>With production costs estimated at less than $100 per unit capable of providing clean water to 50 people daily, the technology has significant potential for widespread implementation in water-stressed communities nationwide.</p>`,
    category_id: 7,
    image_url: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1635&q=80',
    author: 'Dr. Oluwaseun Adeyemi',
    published_at: '2024-02-12',
    featured: false,
    tags: ['Innovation', 'Water Security', 'Public Health', 'Research']
  },
  {
    id: generateId(),
    title: 'New Census Data Reveals Shifting Demographics Across Nigeria',
    slug: 'nigeria-census-demographic-shifts',
    excerpt: 'Latest population figures show significant urban growth and changing age distribution patterns.',
    content: `<p>Nigeria's National Population Commission has released preliminary results from the latest census, revealing significant demographic shifts that will influence policy planning across all sectors.</p>
    <h2>Urban Acceleration</h2>
    <p>The data confirms accelerating urbanization, with cities growing at nearly twice the rate of rural areas. Secondary cities are experiencing particularly rapid expansion as people seek economic opportunities beyond traditional urban centers.</p>
    <h2>Youth Bulge Continues</h2>
    <p>With over 70% of the population under age 35, Nigeria maintains one of the world's youngest demographic profiles. This presents both economic opportunities and challenges for education, employment, and social services.</p>
    <h2>Regional Population Changes</h2>
    <p>Some northern states have recorded slower population growth than projected, while certain southeastern and southwestern states show higher-than-anticipated increases, potentially shifting political representation and resource allocation.</p>`,
    category_id: 7,
    image_url: 'https://images.unsplash.com/photo-1501870190084-cdf29f15ef87?auto=format&fit=crop&w=1374&q=80',
    author: 'Chinedu Okafor',
    published_at: '2024-03-08',
    featured: true,
    tags: ['Demographics', 'Population', 'Urban Development', 'Data']
  },
  {
    id: generateId(),
    title: 'Historic Cultural Artifacts Returned to Nigeria in Repatriation Agreement',
    slug: 'nigeria-artifacts-repatriation',
    excerpt: 'European museums begin process of returning valuable Benin Bronzes and other historical treasures to their original communities.',
    content: `<p>Following years of diplomatic negotiations, several European museums have signed a comprehensive agreement to return thousands of historical artifacts taken from Nigeria during the colonial era, including the renowned Benin Bronzes.</p>
    <h2>Phased Return Plan</h2>
    <p>The repatriation will occur in stages over five years, with the first shipment of 100 significant pieces scheduled to arrive next month. Museums in Germany, Britain, and France are among the first participants.</p>
    <h2>New National Museum Expansion</h2>
    <p>To house the returning treasures, Nigeria has accelerated the expansion of the National Museum in Benin City, incorporating modern conservation technology while honoring traditional architectural elements.</p>
    <h2>Cultural Tourism Potential</h2>
    <p>Government officials and tourism experts anticipate the repatriated artifacts will significantly boost cultural tourism, creating economic opportunities in regions receiving their historical treasures.</p>`,
    category_id: 7,
    image_url: 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&w=1374&q=80',
    author: 'Osahon Iyamu',
    published_at: '2024-03-21',
    featured: false,
    tags: ['Cultural Heritage', 'Repatriation', 'Museums', 'History']
  },
  {
    id: generateId(),
    title: 'Major Transportation Infrastructure Project Connects Northern and Southern Economic Corridors',
    slug: 'nigeria-transportation-corridor-project',
    excerpt: 'Newly completed rail and highway networks are transforming goods movement and travel across Nigeria's economic regions.',
    content: `<p>The final section of Nigeria's ambitious North-South Transportation Corridor has been completed, creating an integrated network of modern rail lines and highways that connects the country's major economic centers from Kano to Lagos and Port Harcourt.</p>
    <h2>Reduced Transit Times</h2>
    <p>The new infrastructure cuts travel time between northern agricultural centers and southern ports by up to 60%, significantly reducing transportation costs for goods and encouraging increased trade between regions.</p>
    <h2>Multimodal Integration</h2>
    <p>The corridor incorporates seamless connections between rail, highway, and inland waterway transportation, with modern logistics hubs at key junction points facilitating efficient cargo transfers.</p>
    <h2>Economic Impact</h2>
    <p>Early data shows a 30% increase in agricultural exports from corridor-adjacent communities and growing manufacturing investment in previously underserved regions now connected to national and international markets.</p>`,
    category_id: 7,
    image_url: 'https://images.unsplash.com/photo-1568442258898-9fa2130d0c22?auto=format&fit=crop&w=1471&q=80',
    author: 'Fatima Usman',
    published_at: '2024-04-02',
    featured: false,
    tags: ['Infrastructure', 'Transportation', 'Economic Development', 'Trade']
  }
];
