
import { generateId } from "../utils";

// Health posts with enhanced images
export const healthPosts = [
  {
    id: 2,
    title: 'Mental Health Awareness in Nigeria: Breaking the Stigma',
    slug: 'mental-health-awareness-nigeria-breaking-stigma',
    excerpt: 'Addressing the growing mental health crisis and changing perceptions',
    content: `<p>Mental health awareness in Nigeria is gradually improving, but significant challenges remain in addressing stigma, accessibility of care, and public understanding of mental health conditions.</p>
    <h2>Cultural Barriers</h2>
    <p>Traditional beliefs and cultural stigma around mental health continue to prevent many Nigerians from seeking professional help, often leading to reliance on spiritual or traditional remedies alone.</p>
    <h2>Healthcare Infrastructure</h2>
    <p>Nigeria faces a severe shortage of mental health professionals, with limited specialized facilities and resources dedicated to mental health care across the country.</p>
    <h2>Digital Health Solutions</h2>
    <p>Mobile apps and telemedicine platforms are beginning to bridge the gap in mental health services, providing accessible support and resources to underserved populations.</p>`,
    category_id: 2,
    image_url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80',
    author: 'Dr. Yemi Kale',
    published_at: '2023-03-20',
    featured: true,
    tags: ['Mental Health', 'Healthcare', 'Awareness', 'Stigma']
  },
  {
    id: generateId(),
    title: 'Combating Malaria: Nigeria\'s Fight Against Endemic Disease',
    slug: 'combating-malaria-nigeria-fight-endemic-disease',
    excerpt: 'Latest developments in malaria prevention and treatment strategies',
    content: `<p>Nigeria continues to bear the highest burden of malaria globally, but innovative prevention strategies, improved treatments, and international partnerships are making significant progress in reducing infection rates and mortality.</p>
    <h2>Prevention Strategies</h2>
    <p>Distribution of long-lasting insecticidal nets, indoor residual spraying, and community education programs have shown measurable success in reducing malaria transmission in targeted areas.</p>
    <h2>Treatment Advances</h2>
    <p>The introduction of rapid diagnostic tests and artemisinin-based combination therapies has improved treatment outcomes and reduced mortality rates, particularly among children under five.</p>
    <h2>Research and Development</h2>
    <p>Nigerian research institutions are contributing to global malaria research, including vaccine development and studies on drug resistance patterns specific to local parasite strains.</p>`,
    category_id: 2,
    image_url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
    author: 'Dr. Adaora Okonkwo',
    published_at: '2023-04-15',
    featured: false,
    tags: ['Malaria', 'Public Health', 'Disease Prevention', 'Healthcare']
  },
  {
    id: generateId(),
    title: 'Traditional Medicine Meets Modern Healthcare',
    slug: 'traditional-medicine-meets-modern-healthcare',
    excerpt: 'Integrating indigenous healing practices with contemporary medical care',
    content: `<p>Nigeria's rich tradition of herbal medicine and traditional healing practices is increasingly being integrated with modern healthcare, creating opportunities for more holistic and culturally appropriate treatment approaches.</p>
    <h2>Research and Validation</h2>
    <p>Scientific studies are validating the efficacy of certain traditional remedies, leading to the development of standardized herbal medicines and integration into formal healthcare systems.</p>
    <h2>Practitioner Training</h2>
    <p>Programs are being developed to train traditional healers in basic medical principles while educating modern healthcare providers about traditional practices and their potential benefits.</p>
    <h2>Regulatory Framework</h2>
    <p>Government agencies are working to establish quality standards and regulations for traditional medicine to ensure safety and efficacy while preserving cultural heritage.</p>`,
    category_id: 2,
    image_url: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=800&q=80',
    author: 'Dr. Bola Tinubu',
    published_at: '2023-05-22',
    featured: false,
    tags: ['Traditional Medicine', 'Healthcare Integration', 'Cultural Heritage', 'Medical Research']
  },
  {
    id: generateId(),
    title: 'Maternal and Child Health: Progress and Challenges',
    slug: 'maternal-child-health-progress-challenges',
    excerpt: 'Improving outcomes for mothers and children across Nigeria',
    content: `<p>Nigeria has made significant strides in reducing maternal and infant mortality rates, but substantial challenges remain in ensuring all women and children have access to quality healthcare services.</p>
    <h2>Rural Healthcare Access</h2>
    <p>Mobile health clinics and community health programs are bringing essential services to remote areas, including prenatal care, skilled birth attendance, and vaccination programs.</p>
    <h2>Nutrition Programs</h2>
    <p>Initiatives addressing malnutrition and micronutrient deficiencies are showing positive results in improving child development outcomes and reducing mortality rates.</p>
    <h2>Healthcare Worker Training</h2>
    <p>Expanded training programs for midwives, community health workers, and traditional birth attendants are improving the quality of care available in underserved areas.</p>`,
    category_id: 2,
    image_url: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80',
    author: 'Dr. Ngozi Okafor',
    published_at: '2023-06-10',
    featured: false,
    tags: ['Maternal Health', 'Child Health', 'Healthcare Access', 'Rural Health']
  },
  {
    id: generateId(),
    title: 'Telemedicine Revolution in Nigerian Healthcare',
    slug: 'telemedicine-revolution-nigerian-healthcare',
    excerpt: 'How digital health platforms are transforming medical care delivery',
    content: `<p>The COVID-19 pandemic accelerated the adoption of telemedicine in Nigeria, with digital health platforms now providing consultations, prescription services, and health monitoring to patients across the country.</p>
    <h2>Remote Consultations</h2>
    <p>Video and voice consultation platforms are enabling patients in remote areas to access specialist care without traveling long distances, reducing costs and improving access to quality healthcare.</p>
    <h2>Digital Health Records</h2>
    <p>Electronic health record systems are improving continuity of care and enabling better coordination between healthcare providers, while giving patients more control over their health information.</p>
    <h2>Health Monitoring Apps</h2>
    <p>Mobile health applications are helping Nigerians track chronic conditions, medication adherence, and preventive care, promoting better health outcomes and early intervention.</p>`,
    category_id: 2,
    image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=800&q=80',
    author: 'Dr. Olumide Adeyemi',
    published_at: '2023-07-18',
    featured: false,
    tags: ['Telemedicine', 'Digital Health', 'Healthcare Technology', 'Remote Care']
  },
  {
    id: generateId(),
    title: 'Vaccine Hesitancy and Public Health Education',
    slug: 'vaccine-hesitancy-public-health-education',
    excerpt: 'Addressing misconceptions and building trust in vaccination programs',
    content: `<p>Vaccine hesitancy remains a significant challenge in Nigeria, affecting routine immunization programs and outbreak response efforts, requiring targeted education and community engagement strategies.</p>
    <h2>Community Engagement</h2>
    <p>Successful vaccination programs increasingly rely on community leaders, religious figures, and local influencers to build trust and address specific concerns within different communities.</p>
    <h2>Education Campaigns</h2>
    <p>Multi-platform education campaigns using local languages and culturally appropriate messaging are helping to counter misinformation and improve vaccine acceptance rates.</p>
    <h2>Healthcare Provider Training</h2>
    <p>Training healthcare workers in effective communication about vaccine benefits and risks is crucial for addressing patient concerns and improving vaccination rates at the community level.</p>`,
    category_id: 2,
    image_url: 'https://images.unsplash.com/photo-1632053002636-e1d0ef220e9d?auto=format&fit=crop&w=800&q=80',
    author: 'Dr. Funmi Adebayo',
    published_at: '2023-08-30',
    featured: false,
    tags: ['Vaccination', 'Public Health', 'Health Education', 'Community Engagement']
  }
];
