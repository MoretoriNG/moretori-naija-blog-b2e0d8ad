
import { generateId } from "../utils";

// Lifestyle posts
export const lifestylePosts = [
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
    image_url: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=1486&q=80',
    author: 'Folake Adeola',
    published_at: '2023-06-10',
    featured: false,
    tags: ['Fashion', 'Sustainability', 'Design', 'Culture']
  },
  {
    id: generateId(),
    title: 'Modern Nigerian Home Design Trends',
    slug: 'modern-nigerian-home-design',
    excerpt: 'Architects blend traditional elements with contemporary functionality in Nigeria's evolving residential design landscape.',
    content: `<p>Nigeria's residential architecture is experiencing an exciting evolution as designers create homes that respond to local climate and cultural contexts while embracing modern aesthetics and functionality.</p>
    <h2>Climate-Responsive Design</h2>
    <p>Contemporary Nigerian homes increasingly incorporate passive cooling techniques, including strategic orientation, cross-ventilation, and shade elements that reduce energy consumption while maintaining comfort in hot climates.</p>
    <h2>Cultural Integration</h2>
    <p>Traditional Nigerian architectural elements from various regions are being reinterpreted in modern contexts, with designers incorporating courtyard concepts, decorative screening patterns, and indoor-outdoor living spaces that reflect cultural heritage.</p>
    <h2>Material Innovation</h2>
    <p>Local materials like compressed earth blocks, bamboo, and reclaimed wood are finding new applications in high-end residential construction, offering sustainability benefits while creating distinctive aesthetic qualities.</p>`,
    category_id: 6,
    image_url: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?auto=format&fit=crop&w=1470&q=80',
    author: 'Tunde Adewale',
    published_at: '2023-09-15',
    featured: true,
    tags: ['Architecture', 'Design', 'Home', 'Sustainability']
  },
  {
    id: generateId(),
    title: 'The Rise of Wellness Tourism in Nigeria',
    slug: 'wellness-tourism-nigeria',
    excerpt: 'Nigeria's natural hot springs and traditional healing practices attract health-conscious travelers seeking unique wellness experiences.',
    content: `<p>Nigeria is emerging as a destination for wellness tourism, with resorts and retreats highlighting the country's natural healing resources and traditional wellness practices.</p>
    <h2>Thermal Springs Experiences</h2>
    <p>Facilities developed around natural hot springs in Wikki (Bauchi State) and Ikogosi (Ekiti State) offer therapeutic bathing experiences combined with massage and physiotherapy treatments drawing on both local and international techniques.</p>
    <h2>Traditional Medicine Retreats</h2>
    <p>Several wellness centers are now offering programs that incorporate traditional Nigerian healing practices, including herbal medicine, spiritual counseling, and cultural immersion experiences guided by certified practitioners.</p>
    <h2>Nature-Based Recovery</h2>
    <p>Eco-resorts in Nigeria's diverse landscapes, from rainforest to savanna, provide peaceful environments for stress recovery programs combining nature experiences with nutrition and mindfulness coaching.</p>`,
    category_id: 6,
    image_url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1470&q=80',
    author: 'Ngozi Okafor',
    published_at: '2023-11-28',
    featured: false,
    tags: ['Wellness', 'Tourism', 'Health', 'Traditional Medicine']
  },
  {
    id: generateId(),
    title: 'Nigerian Food Bloggers Transforming Culinary Scene',
    slug: 'nigerian-food-bloggers',
    excerpt: 'Digital content creators are documenting, preserving and innovating Nigerian cuisine for local and international audiences.',
    content: `<p>A vibrant community of Nigerian food bloggers and content creators is reshaping the culinary landscape by documenting traditional recipes, creating modern adaptations, and sharing Nigerian food culture with global audiences.</p>
    <h2>Preserving Culinary Heritage</h2>
    <p>Many food bloggers are documenting regional recipes and cooking techniques that might otherwise be lost, interviewing elderly family members and traveling to remote communities to learn authentic preparation methods.</p>
    <h2>Modern Adaptations</h2>
    <p>Creative recipe developers are reimagining Nigerian classics with health-conscious twists, international fusion elements, and adaptations that make traditional dishes accessible to diaspora audiences without traditional ingredients.</p>
    <h2>Global Influence</h2>
    <p>Nigerian food content is gaining international attention, with several bloggers securing cookbook deals, television appearances, and brand partnerships that are introducing Nigerian flavors to new audiences worldwide.</p>`,
    category_id: 6,
    image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1480&q=80',
    author: 'Chioma Okoli',
    published_at: '2024-01-07',
    featured: false,
    tags: ['Food', 'Culinary Arts', 'Digital Content', 'Culture']
  },
  {
    id: generateId(),
    title: 'Urban Gardening Movement Takes Root in Nigerian Cities',
    slug: 'urban-gardening-nigerian-cities',
    excerpt: 'City dwellers transform balconies, rooftops and community spaces into productive green oases.',
    content: `<p>Amid rising food prices and growing environmental awareness, urban gardening is flourishing across Nigeria's major cities as residents convert available spaces into productive gardens for food, beauty, and wellbeing.</p>
    <h2>Vertical Solutions</h2>
    <p>Innovative vertical gardening techniques are enabling apartment dwellers to grow significant amounts of vegetables in limited balcony spaces using recycled containers, hanging systems, and space-efficient trellises.</p>
    <h2>Community Initiatives</h2>
    <p>Neighborhood garden projects are transforming vacant lots into productive community spaces where residents share gardening knowledge, distribute harvests, and build stronger social connections.</p>
    <h2>Tech-Enabled Growing</h2>
    <p>Young urban farmers are incorporating simple hydroponic and aquaponic systems to maximize production in small spaces, often sharing their setups and results through social media communities focused on self-sufficiency.</p>`,
    category_id: 6,
    image_url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1632&q=80',
    author: 'Adebayo Johnson',
    published_at: '2024-02-12',
    featured: false,
    tags: ['Gardening', 'Urban Living', 'Sustainability', 'Food Security']
  },
  {
    id: generateId(),
    title: 'Traditional Nigerian Games Find New Life in Digital Age',
    slug: 'traditional-nigerian-games-digital',
    excerpt: 'Classic cultural pastimes are being preserved and reimagined through mobile apps and community events.',
    content: `<p>Nigeria's rich heritage of traditional games is experiencing a revival through both digital adaptations and renewed interest in physical gameplay among younger generations seeking connection to cultural roots.</p>
    <h2>Digital Preservation</h2>
    <p>Mobile app developers have created digital versions of traditional Nigerian games like Ayo (mancala), Ludo, and Whot, making them accessible to new generations while preserving their rules and cultural significance.</p>
    <h2>Community Play Events</h2>
    <p>Urban community centers and cultural organizations are hosting regular game nights featuring traditional Nigerian games, creating intergenerational spaces where elders teach younger participants while sharing cultural stories and wisdom.</p>
    <h2>Educational Integration</h2>
    <p>Several schools have incorporated traditional games into their physical education and cultural curriculum, recognizing their value for cognitive development, mathematical thinking, and cultural education.</p>`,
    category_id: 6,
    image_url: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&w=1470&q=80',
    author: 'Emmanuel Oladele',
    published_at: '2024-03-25',
    featured: false,
    tags: ['Games', 'Cultural Heritage', 'Technology', 'Education']
  },
  {
    id: generateId(),
    title: 'Nigeria's New Wave of Boutique Hotels',
    slug: 'nigeria-boutique-hotels',
    excerpt: 'Distinctive accommodations offer travelers authentic experiences beyond standard international chains.',
    content: `<p>A growing number of unique, locally-owned boutique hotels is transforming Nigeria's accommodation landscape, offering travelers distinctive experiences that highlight local culture, design, and hospitality.</p>
    <h2>Architectural Statement Properties</h2>
    <p>Several standout boutique hotels showcase contemporary Nigerian architecture and design, incorporating local materials, art installations by Nigerian creators, and spatial concepts drawn from traditional building practices.</p>
    <h2>Culinary Focus</h2>
    <p>Farm-to-table dining featuring refined interpretations of regional Nigerian cuisines has become a hallmark of the boutique hotel movement, with some properties developing on-site gardens and partnerships with local farmers.</p>
    <h2>Cultural Programming</h2>
    <p>Many boutique establishments differentiate themselves through cultural experiences including art exhibitions, live music showcasing local talent, craft workshops, and guided community explorations that connect guests with authentic Nigerian culture.</p>`,
    category_id: 6,
    image_url: 'https://images.unsplash.com/photo-1445991842772-097fea258e7b?auto=format&fit=crop&w=1470&q=80',
    author: 'Zainab Ibrahim',
    published_at: '2024-04-08',
    featured: true,
    tags: ['Travel', 'Hospitality', 'Design', 'Tourism']
  }
];
