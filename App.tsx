import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import BlogPage from './components/BlogPage.tsx';
import { Project, Service } from './types.ts';

// --- Constants & Data ---

const PROJECTS: Project[] = [
  { 
    id: 1, 
    title: 'Tattoo Studio', 
    description: 'Interactive portfolio & booking platform for modern artists in Kampala.', 
    image: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=800&fm=webp&auto=format&fit=crop', 
    category: 'Web',
    client: 'InkMasters Kampala',
    timeline: '4 Weeks',
    challenge: 'The client needed a way to showcase intricate tattoo art while handling appointment scheduling without manual intervention.',
    solution: 'We built a React-based gallery with a custom booking engine integrated with their Google Calendar.'
  },
  { 
    id: 2, 
    title: 'Portfolio Website', 
    description: 'Advanced animations & creative showcase for high-end East African talent.', 
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&fm=webp&auto=format&fit=crop', 
    category: 'UI/UX',
    client: 'Sarah Creative',
    timeline: '2 Weeks',
    challenge: 'To stand out in the global market, the client required a portfolio that felt alive and interactive.',
    solution: 'Utilized Framer Motion for scroll-based animations and a headless CMS for easy content updates.'
  },
  { 
    id: 3, 
    title: 'Furniture Store', 
    description: 'Minimalist e-commerce with unique visualization for premium local brands.', 
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&fm=webp&auto=format&fit=crop', 
    category: 'E-commerce',
    client: 'WoodWorks Uganda',
    timeline: '8 Weeks',
    challenge: 'Converting browsing visitors into buyers for high-ticket furniture items online.',
    solution: 'Implemented high-fidelity image zoom and an AR quick-view feature to visualize furniture in a room.'
  },
  { 
    id: 4, 
    title: 'Foundation Website', 
    description: 'Donation campaigns & community engagement for Ugandan NGOs.', 
    image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=800&fm=webp&auto=format&fit=crop', 
    category: 'NGO',
    client: 'Hope Future',
    timeline: '3 Weeks',
    challenge: 'Building trust and simplifying the donation process for international donors.',
    solution: 'Secure payment gateway integration (Stripe/Flutterwave) and a transparent impact dashboard.'
  },
  { 
    id: 5, 
    title: 'Tech Blog Platform', 
    description: 'Modern publishing platform for the growing tech community in East Africa.', 
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&fm=webp&auto=format&fit=crop', 
    category: 'Product',
    client: 'TechInside',
    timeline: '6 Weeks',
    challenge: 'Handling high traffic spikes and ensuring excellent SEO performance.',
    solution: 'A Next.js static site with ISR (Incremental Static Regeneration) for instant page loads and perfect SEO scores.'
  },
  { 
    id: 6, 
    title: 'Corporate Portal', 
    description: 'Professional identity & user portal for scalable enterprises in Uganda.', 
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&fm=webp&auto=format&fit=crop', 
    category: 'Corporate',
    client: 'Apex Group',
    timeline: '10 Weeks',
    challenge: 'Integrating legacy internal systems with a modern, user-friendly frontend.',
    solution: 'A secure client dashboard with real-time data visualization and role-based access control.'
  },
];

const SERVICES: Service[] = [
  { 
    id: 1, 
    title: 'Web Design Kampala', 
    description: 'High-performance, responsive web design and development optimized for Uganda and international markets.', 
    icon: 'desktop_windows',
    longDescription: 'Our web design service combines aesthetic excellence with technical precision. We build websites that not only look stunning but also perform flawlessly across all devices and network conditions common in East Africa. From simple landing pages to complex web applications, we ensure your online presence is robust, secure, and conversion-focused.',
    features: ['Custom UI/UX Design', 'Responsive & Mobile-First', 'Speed Optimization', 'CMS Integration (WordPress/Sanity)', 'Analytics Setup']
  },
  { 
    id: 2, 
    title: 'App Development Uganda', 
    description: 'Native iOS & Android mobile applications built for the mobile-first East African landscape.', 
    icon: 'smartphone',
    longDescription: 'We build native and cross-platform mobile applications that provide seamless experiences. Whether for iOS or Android, our apps are built for scalability and performance. We utilize frameworks like React Native and Flutter to deliver high-quality apps efficiently.',
    features: ['iOS & Android Support', 'React Native / Flutter', 'Offline Capabilities', 'Push Notifications', 'API Integration']
  },
  { 
    id: 3, 
    title: 'UI/UX Design Experts', 
    description: 'User-centric research and interface design for apps and dashboards based in Kampala.', 
    icon: 'design_services',
    longDescription: 'User experience is at the heart of digital success. We conduct in-depth research to create intuitive interfaces that delight users and drive conversion rates. Our process involves wireframing, prototyping, and rigorous usability testing.',
    features: ['User Research', 'Wireframing & Prototyping', 'Interaction Design', 'Usability Testing', 'Design Systems']
  },
  { 
    id: 4, 
    title: 'Branding East Africa', 
    description: 'Comprehensive branding strategy, logo design, and visual systems for growing startups.', 
    icon: 'branding_watermark',
    longDescription: 'Your brand is more than just a logo. We build comprehensive visual identities that tell your story and resonate with your target audience. We define your brand voice, color palette, and visual language to ensure consistency across all touchpoints.',
    features: ['Logo Design', 'Brand Guidelines', 'Visual Strategy', 'Social Media Assets', 'Print Collateral']
  },
  { 
    id: 5, 
    title: 'Motion & Animation', 
    description: 'Engaging motion graphics that elevate your brand story on social media and web.', 
    icon: 'layers',
    longDescription: 'Bring your digital presence to life with captivating motion graphics. We create animations that explain complex ideas, showcase products, and add a layer of polish to your user interface that static images simply cannot match.',
    features: ['Lottie Animations', 'Micro-interactions', 'Explainer Videos', '3D Motion', 'Logo Reveals']
  },
  { 
    id: 6, 
    title: 'Local SEO Uganda', 
    description: 'Dominate local search results in Kampala and attract targeted traffic to your business.', 
    icon: 'search',
    longDescription: 'Visibility is key. Our SEO strategies are tailored for the Ugandan and global market to ensure your business appears exactly where your customers are looking. We focus on technical SEO, content strategy, and local listings to boost your organic traffic.',
    features: ['Keyword Research', 'On-Page Optimization', 'Technical SEO', 'Content Strategy', 'Google Business Profile']
  },
  {
    id: 7,
    title: 'E-Commerce Solutions',
    description: 'Scalable online stores helping Ugandan businesses sell products globally with secure payments.',
    icon: 'shopping_cart',
    longDescription: 'We build robust e-commerce platforms that drive sales. Whether you need a simple Shopify store or a complex custom WooCommerce solution, we integrate secure local payment gateways like MTN MoMo and Airtel Money alongside international options like Stripe.',
    features: ['Payment Integration (MoMo/Card)', 'Inventory Management', 'User Accounts', 'Sales Analytics', 'Security Audits']
  },
  {
    id: 8,
    title: 'Digital Marketing',
    description: 'Data-driven social media and PPC campaigns to grow your audience and ROI.',
    icon: 'campaign',
    longDescription: 'Building a product is half the battle; selling it is the other. Our digital marketing strategies include targeted Social Media Management, Google Ads (PPC), and Email Marketing campaigns designed to convert visitors into loyal customers.',
    features: ['Social Media Management', 'Google Ads', 'Email Campaigns', 'Conversion Optimization', 'Audience Analytics']
  },
  {
    id: 9,
    title: 'Content Strategy',
    description: 'Compelling copywriting and content creation that speaks your brand voice clearly.',
    icon: 'article',
    longDescription: 'Words matter. We craft compelling narratives that resonate with your target audience. From website copy to blog posts and technical documentation, we ensure your brand voice is clear, persuasive, and consistent across all channels.',
    features: ['Copywriting', 'Blog Writing', 'Technical Writing', 'Video Scripts', 'Brand Voice Development']
  },
  {
    id: 10,
    title: 'Tech Consultancy',
    description: 'Expert advice on digital transformation, tech stack selection, and software architecture.',
    icon: 'school',
    longDescription: 'Not sure which technology to use? Need to digitize manual processes? Our consultants provide expert guidance on software architecture, tool selection, and digital transformation strategies to future-proof your business.',
    features: ['Tech Stack Selection', 'Code Audits', 'Digital Transformation', 'Team Training', 'Project Management']
  },
  {
    id: 11,
    title: 'Cloud & DevOps',
    description: 'Secure, scalable hosting infrastructure management on AWS, Google Cloud, or DigitalOcean.',
    icon: 'cloud',
    longDescription: 'Ensure your application is always online, fast, and secure. We manage cloud infrastructure, setting up CI/CD pipelines for automated deployments and scaling your resources to handle traffic spikes effortlessly.',
    features: ['AWS/GCP Setup', 'CI/CD Pipelines', 'Server Management', 'Database Optimization', 'Security Hardening']
  },
  {
    id: 12,
    title: 'Maintenance & Support',
    description: 'Ongoing technical support to keep your digital products secure, fast, and up-to-date.',
    icon: 'support_agent',
    longDescription: 'Software needs care. Our maintenance packages ensure your website or app remains secure against threats, runs fast, and stays compatible with the latest browser and OS updates. We handle the technical details so you can focus on your business.',
    features: ['Security Updates', 'Daily Backups', 'Performance Monitoring', 'Bug Fixes', '24/7 Uptime Monitoring']
  }
];

const FAQS = [
  {
    question: "How long does a typical project take?",
    answer: "Timelines depend on complexity. A standard business website typically takes 2–3 weeks, while complex e-commerce or web apps can take 6–10 weeks. We provide a detailed timeline before starting."
  },
  {
    question: "Do I own the code and design?",
    answer: "Absolutely. Once the final payment is made, you have 100% ownership of your website, domain, and all design assets. We don't believe in holding your digital property hostage."
  },
  {
    question: "Will my website be visible on Google?",
    answer: "Yes. All our websites are built with SEO best practices in mind (fast loading, mobile-optimized, proper meta tags). We also offer dedicated SEO packages to help you rank for competitive keywords in Kampala and beyond."
  },
  {
    question: "Can I update the content myself?",
    answer: "Yes! We build on user-friendly Content Management Systems (like WordPress or Sanity). We provide a training session and a guide so you can easily edit text, images, and blog posts without needing a developer."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept bank transfers, mobile money (MTN/Airtel), and international payments via Stripe or Wise. We typically require a 50% deposit to begin, with the balance due upon successful launch."
  }
];

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

// --- Helper Components (Defined Outside App) ---

interface ServiceModalProps {
  service: Service | null;
  onClose: () => void;
  onBook: (serviceTitle: string) => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose, onBook }) => {
  if (!service) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-surface-dark w-full max-w-2xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-subtle-light dark:border-white/10 animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          
          <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-8">
              <span className="material-symbols-outlined text-3xl">{service.icon}</span>
          </div>
          
          <h3 className="text-3xl md:text-4xl font-bold display-font uppercase mb-6 leading-tight">{service.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 text-lg">
              {service.longDescription || service.description}
          </p>
          
          <div className="space-y-6 mb-10">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">Key Features</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.features?.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm font-medium">
                          <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                          {feature}
                      </li>
                  ))}
              </ul>
          </div>
          
          <button 
              onClick={() => onBook(service.title)}
              className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-xl font-bold uppercase tracking-widest transition-all shadow-lg shadow-orange-500/20"
          >
              Get Started with this Service
          </button>
      </div>
    </div>
  );
};

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onStartProject: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onStartProject }) => {
  if (!project) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-surface-dark w-full max-w-4xl rounded-[2.5rem] overflow-hidden shadow-2xl border border-subtle-light dark:border-white/10 animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col md:flex-row">
          <div className="md:w-2/5 h-64 md:h-auto relative">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-6 left-6">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur text-white text-[10px] font-bold uppercase tracking-widest rounded-full border border-white/20">
                      {project.category}
                  </span>
              </div>
          </div>
          <div className="md:w-3/5 p-8 md:p-12 overflow-y-auto relative">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              <h3 className="text-3xl font-bold display-font uppercase mb-6 leading-tight pr-10">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  {project.description}
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8 border-t border-b border-gray-100 dark:border-white/5 py-6">
                  <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Client</p>
                      <p className="font-bold">{project.client}</p>
                  </div>
                  <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Timeline</p>
                      <p className="font-bold">{project.timeline}</p>
                  </div>
              </div>

              <div className="space-y-6">
                  <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider mb-2 text-primary">The Challenge</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{project.challenge}</p>
                  </div>
                  <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider mb-2 text-primary">Our Solution</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{project.solution}</p>
                  </div>
              </div>

              <button 
                  onClick={onStartProject}
                  className="mt-8 w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-colors"
              >
                  Start Similar Project
              </button>
          </div>
      </div>
    </div>
  );
};

// --- Refactored Sections (Moved outside App) ---

interface PricingSectionProps {
  currency: 'UGX' | 'USD';
  toggleCurrency: () => void;
  handleBookService: (service: string) => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({ currency, toggleCurrency, handleBookService }) => {
  const pricingData = {
      website: {
        starter: { ugx: "450,000", usd: "120" },
        business: { ugx: "1,200,000", usd: "350" },
        corporate: { ugx: "3,000,000", usd: "900" }
      },
      ecommerce: {
        basic: { ugx: "1,800,000", usd: "550" },
        advanced: { ugx: "4,500,000", usd: "1,300" }
      },
      branding: {
        logo: { ugx: "150,000 – 300,000", usd: "50 – 100" },
        identity: { ugx: "600,000 – 1,200,000", usd: "180 – 350" }
      },
      uiux: {
        design: { ugx: "400,000 – 1,500,000", usd: "120 – 450" }
      },
      maintenance: {
        basic: { ugx: "50,000", usd: "15" },
        standard: { ugx: "120,000", usd: "35" },
        full: { ugx: "300,000", usd: "90" }
      }
  };

  const getPrice = (item: any) => currency === 'UGX' ? `UGX ${item.ugx}` : `USD ${item.usd}`;

  return (
    <section className="py-24 bg-gray-50 dark:bg-[#080808]" id="pricing">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
           <div className="inline-block px-4 py-1.5 rounded-full border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-[10px] font-bold tracking-widest uppercase">
              Investment
           </div>
          <h2 className="text-4xl md:text-5xl font-bold display-font uppercase">Transparent Pricing</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">No hidden fees. Choose the package that fits your growth stage.</p>
          
          {/* Currency Switcher */}
          <div className="flex justify-center pt-4">
              <div className="bg-white dark:bg-surface-dark p-1 rounded-full border border-gray-200 dark:border-white/10 flex items-center">
                  <button 
                      onClick={toggleCurrency}
                      className={`px-6 py-2 rounded-full text-xs font-bold uppercase transition-all ${currency === 'UGX' ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
                  >
                      UGX
                  </button>
                  <button 
                      onClick={toggleCurrency}
                      className={`px-6 py-2 rounded-full text-xs font-bold uppercase transition-all ${currency === 'USD' ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
                  >
                      USD
                  </button>
              </div>
          </div>
        </div>

        {/* Website Design */}
        <div className="mb-20">
           <h3 className="text-2xl font-bold display-font uppercase mb-8 text-center">Website Design</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Starter */}
              <div className="bg-white dark:bg-surface-dark p-8 rounded-[2rem] border border-gray-100 dark:border-white/5 relative group hover:border-primary/30 transition-all flex flex-col">
                  <h4 className="text-xl font-bold uppercase mb-2">Starter Website</h4>
                  <p className="text-sm text-gray-500 mb-6 h-10">Perfect for personal brands and small portfolios.</p>
                  <div className="mb-6">
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Starting from</p>
                      <p className="text-3xl font-bold display-font">{getPrice(pricingData.website.starter)}</p>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                      {["Up to 5 pages", "Mobile responsive", "Basic SEO", "Contact form", "SSL Security", "Social links"].map(item => (
                          <li key={item} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                              <span className="material-symbols-outlined text-primary text-base">check</span>
                              {item}
                          </li>
                      ))}
                  </ul>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Timeline: 5–7 days</p>
                  <button onClick={() => handleBookService("Starter Website")} className="w-full py-3 rounded-xl border border-gray-200 dark:border-white/10 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-bold uppercase text-xs tracking-widest transition-all">
                      Request Quote
                  </button>
              </div>

              {/* Business */}
              <div className="bg-white dark:bg-surface-dark p-8 rounded-[2rem] border-2 border-primary relative transform md:-translate-y-4 shadow-2xl shadow-primary/10 flex flex-col">
                  <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-xl rounded-tr-xl">
                      Most Popular
                  </div>
                  <h4 className="text-xl font-bold uppercase mb-2">Business Website</h4>
                  <p className="text-sm text-gray-500 mb-6 h-10">For growing businesses needing a professional edge.</p>
                  <div className="mb-6">
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Starting from</p>
                      <p className="text-3xl font-bold display-font text-primary">{getPrice(pricingData.website.business)}</p>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                      {["Up to 10 pages", "Custom design", "Advanced SEO", "Blog setup", "WhatsApp chat", "Analytics Dashboard"].map(item => (
                          <li key={item} className="flex items-start gap-2 text-sm text-gray-900 dark:text-white font-medium">
                              <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                              {item}
                          </li>
                      ))}
                  </ul>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Timeline: 7–14 days</p>
                  <button onClick={() => handleBookService("Business Website")} className="w-full py-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold uppercase text-xs tracking-widest transition-all shadow-lg shadow-orange-500/30">
                      Start Your Project
                  </button>
              </div>

              {/* Premium */}
              <div className="bg-white dark:bg-surface-dark p-8 rounded-[2rem] border border-gray-100 dark:border-white/5 relative group hover:border-primary/30 transition-all flex flex-col">
                  <h4 className="text-xl font-bold uppercase mb-2">Corporate</h4>
                  <p className="text-sm text-gray-500 mb-6 h-10">Uncompromised quality for established organizations.</p>
                  <div className="mb-6">
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Starting from</p>
                      <p className="text-3xl font-bold display-font">{getPrice(pricingData.website.corporate)}</p>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                      {["Unlimited pages", "Premium UI/UX", "Lead generation system", "Full CMS", "Performance optimization", "1-month support"].map(item => (
                          <li key={item} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                              <span className="material-symbols-outlined text-primary text-base">check</span>
                              {item}
                          </li>
                      ))}
                  </ul>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Timeline: 2–4 weeks</p>
                  <button onClick={() => handleBookService("Corporate Website")} className="w-full py-3 rounded-xl border border-gray-200 dark:border-white/10 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-bold uppercase text-xs tracking-widest transition-all">
                      Request Quote
                  </button>
              </div>
           </div>
        </div>

        {/* E-Commerce & Others Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* E-Commerce */}
          <div className="space-y-8">
              <h3 className="text-2xl font-bold display-font uppercase text-center md:text-left">E-Commerce</h3>
              <div className="grid gap-6">
                  <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
                      <div className="text-center sm:text-left">
                          <h4 className="font-bold uppercase mb-1">Basic Store</h4>
                          <p className="text-xs text-gray-500 mb-2">Up to 30 products, Cart, Mobile-friendly</p>
                          <p className="text-primary font-bold">Starts {getPrice(pricingData.ecommerce.basic)}</p>
                      </div>
                       <button onClick={() => handleBookService("Basic E-Commerce")} className="px-6 py-2 rounded-full border border-gray-200 dark:border-white/10 text-[10px] font-bold uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">Select</button>
                  </div>
                  <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
                      <div className="text-center sm:text-left">
                          <h4 className="font-bold uppercase mb-1">Advanced Store</h4>
                          <p className="text-xs text-gray-500 mb-2">Unlimited, Admin Dashboard, Inventory</p>
                          <p className="text-primary font-bold">Starts {getPrice(pricingData.ecommerce.advanced)}</p>
                      </div>
                       <button onClick={() => handleBookService("Advanced E-Commerce")} className="px-6 py-2 rounded-full border border-gray-200 dark:border-white/10 text-[10px] font-bold uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">Select</button>
                  </div>
              </div>

              <h3 className="text-2xl font-bold display-font uppercase text-center md:text-left pt-4">Maintenance</h3>
              <div className="bg-black dark:bg-white/5 text-white p-6 rounded-2xl">
                  <div className="grid grid-cols-3 gap-4 text-center divide-x divide-white/20">
                      <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Basic</p>
                          <p className="font-bold text-lg">{currency === 'UGX' ? '50k' : '$15'}</p>
                          <p className="text-[10px] text-gray-500">/ mo</p>
                      </div>
                       <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Standard</p>
                          <p className="font-bold text-lg text-primary">{currency === 'UGX' ? '120k' : '$35'}</p>
                          <p className="text-[10px] text-gray-500">/ mo</p>
                      </div>
                       <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Full</p>
                          <p className="font-bold text-lg">{currency === 'UGX' ? '300k' : '$90'}</p>
                          <p className="text-[10px] text-gray-500">/ mo</p>
                      </div>
                  </div>
              </div>
          </div>

          {/* Other Services */}
          <div className="space-y-8">
               <h3 className="text-2xl font-bold display-font uppercase text-center md:text-left">Creative Services</h3>
               <div className="bg-gray-100 dark:bg-white/5 p-8 rounded-[2rem]">
                  <div className="space-y-6">
                      <div className="flex justify-between items-center border-b border-gray-200 dark:border-white/10 pb-4">
                          <div>
                              <h4 className="font-bold uppercase text-sm">Logo Design</h4>
                              <p className="text-xs text-gray-500">Professional vector formats</p>
                          </div>
                          <div className="text-right">
                              <p className="font-bold text-sm">{getPrice(pricingData.branding.logo)}</p>
                          </div>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-200 dark:border-white/10 pb-4">
                          <div>
                              <h4 className="font-bold uppercase text-sm">Full Brand Identity</h4>
                              <p className="text-xs text-gray-500">Guidelines, fonts, palette</p>
                          </div>
                          <div className="text-right">
                              <p className="font-bold text-sm">{getPrice(pricingData.branding.identity)}</p>
                          </div>
                      </div>
                      <div className="flex justify-between items-center pb-2">
                          <div>
                              <h4 className="font-bold uppercase text-sm">UI/UX Design</h4>
                              <p className="text-xs text-gray-500">Figma prototypes</p>
                          </div>
                          <div className="text-right">
                              <p className="font-bold text-sm">{getPrice(pricingData.uiux.design)}</p>
                          </div>
                      </div>
                  </div>
                   <button onClick={() => handleBookService("Creative Services")} className="w-full mt-8 py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold uppercase text-xs tracking-widest hover:opacity-80 transition-all">
                      Request a Custom Quote
                  </button>
               </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <section className="py-24 bg-white dark:bg-background-dark border-t border-gray-100 dark:border-white/5" id="faq">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold display-font uppercase">F.A.Q</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Answers to common questions about our web design and development process.</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {FAQS.map((faq, index) => (
            <div 
              key={index}
              className={`bg-gray-50 dark:bg-surface-dark rounded-2xl border transition-all overflow-hidden ${openIndex === index ? 'border-primary/50 shadow-lg shadow-primary/5' : 'border-transparent hover:border-gray-200 dark:hover:border-white/10'}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <span className={`font-bold text-lg pr-8 transition-colors ${openIndex === index ? 'text-primary' : 'text-gray-900 dark:text-white'}`}>{faq.question}</span>
                <span className={`material-symbols-outlined transform transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-primary' : 'text-gray-400'}`}>
                  expand_more
                </span>
              </button>
              <div 
                className={`px-6 text-gray-600 dark:text-gray-400 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

interface FooterProps {
    currentPath: string;
    setCurrentPath: (path: string) => void;
}

const Footer: React.FC<FooterProps> = ({ currentPath, setCurrentPath }) => (
    <footer className="bg-black text-white border-t border-white/10 pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          <div className="md:col-span-5 space-y-6">
            <a 
              href="/"
              className="flex items-center gap-2 cursor-pointer" 
              onClick={(e) => { e.preventDefault(); setCurrentPath('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
               <span className="text-2xl font-bold tracking-tighter uppercase display-font">
                DrewVerse<br/><span className="text-primary text-xs tracking-widest">Design</span>
              </span>
            </a>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
              We build digital products that define the future of business in East Africa. Bold, strategic, and relentlessly creative.
            </p>
            <div className="flex gap-4 pt-2">
              {['linkedin', 'instagram'].map(social => (
                <a key={social} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 group">
                  <img src={`https://cdn.simpleicons.org/${social}/white`} className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" alt={social} />
                </a>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="font-bold uppercase tracking-widest text-xs mb-8 text-white/40">Company</h4>
            <ul className="space-y-4 text-sm font-medium text-gray-400">
              <li>
                  <a 
                    href="/"
                    onClick={(e) => { e.preventDefault(); setCurrentPath('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="hover:text-primary transition-colors text-left"
                  >
                    Home
                  </a>
              </li>
              <li>
                  <a 
                    href="/#hero"
                    onClick={(e) => { e.preventDefault(); setCurrentPath('home'); setTimeout(() => scrollToSection('hero'), 100)}} 
                    className="hover:text-primary transition-colors text-left"
                  >
                    About
                  </a>
              </li>
              <li>
                  <a 
                    href="/blog"
                    onClick={(e) => { e.preventDefault(); setCurrentPath('blog'); }}
                    className="hover:text-primary transition-colors text-left"
                  >
                    Blog
                  </a>
              </li>
              <li><a href="#" className="hover:text-primary transition-colors block">Careers</a></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-bold uppercase tracking-widest text-xs mb-8 text-white/40">Services</h4>
            <ul className="space-y-4 text-sm font-medium text-gray-400">
              <li>
                  <a 
                    href="/#services"
                    onClick={(e) => { e.preventDefault(); setCurrentPath('home'); setTimeout(() => scrollToSection('services'), 100)}} 
                    className="hover:text-primary transition-colors text-left"
                  >
                    Web Design
                  </a>
              </li>
              <li>
                  <a 
                    href="/#services"
                    onClick={(e) => { e.preventDefault(); setCurrentPath('home'); setTimeout(() => scrollToSection('services'), 100)}} 
                    className="hover:text-primary transition-colors text-left"
                  >
                    App Development
                  </a>
              </li>
              <li>
                  <a 
                    href="/#services"
                    onClick={(e) => { e.preventDefault(); setCurrentPath('home'); setTimeout(() => scrollToSection('services'), 100)}} 
                    className="hover:text-primary transition-colors text-left"
                  >
                    Branding
                  </a>
              </li>
              <li>
                  <a 
                    href="/#services"
                    onClick={(e) => { e.preventDefault(); setCurrentPath('home'); setTimeout(() => scrollToSection('services'), 100)}} 
                    className="hover:text-primary transition-colors text-left"
                  >
                    SEO
                  </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-600 text-xs font-medium">© 2024 DrewVerse Design. Built with passion in Kampala.</p>
          <div className="flex gap-8">
            <a href="#" className="text-xs font-bold uppercase tracking-wider text-gray-600 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-xs font-bold uppercase tracking-wider text-gray-600 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-xs font-bold uppercase tracking-wider text-gray-600 hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
);

interface LandingPageProps {
    setSelectedService: (service: Service | null) => void;
    setSelectedProject: (project: Project | null) => void;
    currency: 'UGX' | 'USD';
    toggleCurrency: () => void;
    handleBookService: (service: string) => void;
    isSubmitted: boolean;
    setIsSubmitted: (submitted: boolean) => void;
    handleFormSubmit: (e: React.FormEvent) => void;
    formState: any;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    isSubmitting: boolean;
    formOptions: string[];
}

const LandingPage: React.FC<LandingPageProps> = ({ 
    setSelectedService, 
    setSelectedProject, 
    currency, 
    toggleCurrency, 
    handleBookService, 
    isSubmitted, 
    setIsSubmitted, 
    handleFormSubmit, 
    formState, 
    handleInputChange, 
    isSubmitting, 
    formOptions 
}) => (
    <>
      <section className="pt-32 pb-20 px-6 relative" id="hero">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -z-10 blur-3xl rounded-full"></div>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
              <div className="inline-block px-4 py-1.5 rounded-full border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-[10px] font-bold tracking-widest uppercase">
                🚀 Top-Rated Web Design Agency Uganda
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] display-font uppercase">
                World-Class <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Web Design Kampala</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
                DrewVerse Design is Kampala's premier agency for <span className="font-bold text-gray-900 dark:text-white">website development, branding, and mobile apps</span>. We help Uganda's boldest startups go global.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-full font-bold uppercase tracking-wide transition-all shadow-xl shadow-orange-500/20 transform hover:-translate-y-1"
                >
                  Start Project
                </button>
                <button 
                  onClick={() => scrollToSection('portfolio')}
                  className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 px-8 py-4 rounded-full font-bold uppercase tracking-wide hover:bg-gray-50 transition-all"
                >
                  Our Work
                </button>
              </div>
            </div>
            
            <div className="relative group animate-in zoom-in duration-1000">
              <div className="relative bg-surface-light dark:bg-surface-dark rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white dark:border-white/5 animate-float">
                <img 
                  alt="DrewVerse Design Team - Leading Web Design and Development Agency in Kampala Uganda" 
                  width="800"
                  height="1000"
                  className="w-full aspect-[4/5] object-cover" 
                  src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800&fm=webp&auto=format&fit=crop"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-background-dark" id="services">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold display-font uppercase">Digital Services in Uganda</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Expert digital solutions for the East African market. From high-end web design in Kampala to mobile app development in Uganda.</p>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <div key={service.id} className="bg-gray-50 dark:bg-surface-dark p-10 rounded-[2rem] border border-transparent hover:border-primary/20 transition-all duration-500 group">
                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-subtle-dark flex items-center justify-center mb-8 shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                  <span className="material-symbols-outlined text-3xl">{service.icon}</span>
                </div>
                <h3 className="text-xl font-bold display-font uppercase mb-4 leading-tight">{service.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8">{service.description}</p>
                <button 
                  onClick={() => setSelectedService(service)}
                  className="inline-flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest group-hover:gap-4 transition-all hover:underline"
                >
                  Service Details <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50 dark:bg-[#080808]" id="portfolio">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div className="space-y-4 max-w-xl">
               <h2 className="text-4xl md:text-5xl font-bold display-font uppercase leading-tight">Featured <br/>Uganda Projects</h2>
            </div>
            <p className="text-gray-500 text-sm max-w-xs mb-2">We help brands across <span className="text-primary font-bold">Kampala and East Africa</span> stand out.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {PROJECTS.map((project) => (
              <div 
                key={project.id} 
                className="group relative cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative overflow-hidden rounded-[2rem] bg-surface-dark shadow-2xl aspect-[4/5]">
                  <img 
                    src={project.image} 
                    alt={`${project.title} - Website Development project by DrewVerse Design Kampala`} 
                    className="w-full h-full object-cover transition duration-700 opacity-80 group-hover:opacity-100 group-hover:scale-110" 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white">
                          <span className="material-symbols-outlined text-2xl">visibility</span>
                      </div>
                  </div>
                  <div className="absolute bottom-0 left-0 p-8 w-full z-20">
                    <p className="text-primary text-[10px] font-bold uppercase tracking-widest mb-2">{project.category}</p>
                    <h3 className="text-2xl font-bold text-white display-font uppercase mb-1">{project.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PricingSection 
        currency={currency} 
        toggleCurrency={toggleCurrency} 
        handleBookService={handleBookService} 
      />
      <FAQSection />

      <section className="py-24 bg-black text-white" id="contact">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-12">
              <h2 className="text-5xl md:text-6xl font-bold uppercase display-font leading-none">Let's Ignite <br/> Your Project</h2>
              <div className="space-y-8">
                 <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center">
                       <span className="material-symbols-outlined text-primary">location_on</span>
                    </div>
                    <div>
                       <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Our Kampala Office</p>
                       <p className="text-lg font-medium">Plot 12, Kampala Road, Uganda</p>
                    </div>
                 </div>
              </div>
            </div>
            <div className="bg-[#111] p-10 md:p-14 rounded-[3rem] border border-white/5 min-h-[400px] flex items-center justify-center">
              {isSubmitted ? (
                <div className="text-center space-y-6 animate-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                    <span className="material-symbols-outlined text-primary text-4xl">check_circle</span>
                  </div>
                  <h3 className="text-3xl font-bold display-font uppercase">Message Sent!</h3>
                  <p className="text-gray-400 max-w-sm mx-auto">Thank you for reaching out. Our creative team will review your project details and get back to you within 24 hours.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-primary text-xs font-bold uppercase tracking-widest hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form 
                  name="contact" 
                  method="POST" 
                  data-netlify="true" 
                  onSubmit={handleFormSubmit}
                  className="space-y-6 w-full"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <input type="hidden" name="bot-field" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input 
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border-none rounded-2xl p-4 text-sm focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600" 
                      placeholder="Name" 
                      type="text" 
                      aria-label="Your Name" 
                    />
                    <input 
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border-none rounded-2xl p-4 text-sm focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600" 
                      placeholder="Email" 
                      type="email" 
                      aria-label="Your Email" 
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input 
                      name="phone"
                      value={formState.phone}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border-none rounded-2xl p-4 text-sm focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600" 
                      placeholder="Phone Number" 
                      type="tel" 
                      aria-label="Phone Number" 
                    />
                    <select 
                      name="budget"
                      value={formState.budget}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border-none rounded-2xl p-4 text-sm text-gray-400 focus:ring-1 focus:ring-primary transition-all" 
                      aria-label="Select Budget Range"
                    >
                      <option disabled>Select Budget Range</option>
                      <option>Less than 1M UGX ($270)</option>
                      <option>1M - 3M UGX ($270 - $800)</option>
                      <option>3M - 10M UGX ($800 - $2,700)</option>
                      <option>10M+ UGX ($2,700+)</option>
                    </select>
                  </div>
                  <select 
                    name="service"
                    value={formState.service}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border-none rounded-2xl p-4 text-sm text-gray-400 focus:ring-1 focus:ring-primary transition-all" 
                    aria-label="Select Service"
                  >
                    <option disabled>Select Service</option>
                    {formOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <textarea 
                    name="message"
                    required
                    value={formState.message}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border-none rounded-2xl p-4 text-sm h-32 focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600" 
                    placeholder="Tell us about your project vision..." 
                    aria-label="Project Details"
                  ></textarea>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-primary hover:bg-primary-hover text-white py-5 rounded-2xl font-bold uppercase tracking-widest transition-all transform active:scale-95 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        Sending...
                      </>
                    ) : (
                      'Start Project'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
);

// --- Main App Component ---

const App: React.FC = () => {
  // Initialize state based on current URL to handle direct links/refreshes
  const [currentPath, setCurrentPathState] = useState(() => {
    if (typeof window !== 'undefined') {
       return window.location.pathname.includes('/blog') ? 'blog' : 'home';
    }
    return 'home';
  });
  
  // Custom setter to update URL history
  const setCurrentPath = (path: string) => {
    setCurrentPathState(path);
    if (typeof window !== 'undefined') {
      const newUrl = path === 'home' ? '/' : `/${path}`;
      if (window.location.pathname !== newUrl) {
        window.history.pushState({}, '', newUrl);
      }
    }
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
       const path = window.location.pathname.includes('/blog') ? 'blog' : 'home';
       setCurrentPathState(path);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const [currency, setCurrency] = useState<'UGX' | 'USD'>('USD');
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Select Service',
    budget: 'Select Budget Range',
    message: ''
  });
  // Removed Newsletter state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Currency & Location Detection
  useEffect(() => {
    const storedCurrency = localStorage.getItem('drewverse_currency');
    if (storedCurrency === 'UGX' || storedCurrency === 'USD') {
      setCurrency(storedCurrency);
    } else {
      setCurrency('USD');
      fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => {
          if (data.country_code === 'UG') {
            setCurrency('UGX');
            localStorage.setItem('drewverse_currency', 'UGX');
          } else {
            setCurrency('USD');
            localStorage.setItem('drewverse_currency', 'USD');
          }
        })
        .catch(err => {
          console.warn("Location detection failed, defaulting to USD", err);
        });
    }
  }, []);

  const toggleCurrency = () => {
    const newCurrency = currency === 'UGX' ? 'USD' : 'UGX';
    setCurrency(newCurrency);
    localStorage.setItem('drewverse_currency', newCurrency);
  };

  useEffect(() => {
    const metaDesc = document.querySelector('meta[name="description"]');
    const canonical = document.querySelector('link[rel="canonical"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    
    if (currentPath === 'home') {
      document.title = "Top Web Design & Branding Agency in Kampala | DrewVerse Design";
      metaDesc?.setAttribute("content", "Expert web design, app development, e-commerce stores, and digital marketing agency in Kampala. We build bold digital products for Uganda and international markets. Get a quote from $120.");
      canonical?.setAttribute("href", "https://www.drewversedesign.online/");
      ogTitle?.setAttribute("content", "Web Design & Branding Agency in Kampala | DrewVerse Design");
      ogUrl?.setAttribute("content", "https://www.drewversedesign.online/");
    } else if (currentPath === 'blog') {
      document.title = "Tech Insights & Web Design Trends Blog | DrewVerse Uganda";
      metaDesc?.setAttribute("content", "Stay ahead with expert perspectives on web design trends, mobile app engineering, and SEO strategies specifically for the East African tech landscape.");
      canonical?.setAttribute("href", "https://www.drewversedesign.online/blog");
      ogTitle?.setAttribute("content", "Insights & Tech Trends Blog | DrewVerse Uganda");
      ogUrl?.setAttribute("content", "https://www.drewversedesign.online/blog");
    }
  }, [currentPath]);

  const getBudgetForService = (service: string) => {
    if (service.includes('Starter') || service.includes('Maintenance') || service.includes('SEO') || service.includes('Logo') || service.includes('Content') || service.includes('Support')) return 'Less than 1M UGX ($270)';
    if (service.includes('Business') || service.includes('Basic E-Commerce') || service.includes('Branding') || service.includes('UI/UX') || service.includes('Creative') || service.includes('Marketing') || service.includes('Consultancy') || service.includes('Motion')) return '1M - 3M UGX ($270 - $800)';
    if (service.includes('Corporate') || service.includes('Advanced') || service.includes('App') || service.includes('E-Commerce') || service.includes('Cloud') || service.includes('Web Design')) return '3M - 10M UGX ($800 - $2,700)';
    return 'Select Budget Range';
  };

  const encode = (data: any) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formState.service === 'Select Service' || formState.budget === 'Select Budget Range') {
        alert("Please select a valid service and budget range.");
        return;
    }

    setIsSubmitting(true);
    // Inject a subject line based on the user's name to prevent spam filtering
    const formData = {
        "form-name": "contact",
        "bot-field": "",
        "subject": `New Project Inquiry from ${formState.name} - ${formState.service}`,
        ...formState
    };
    
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode(formData)
    })
    .then(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
    })
    .catch(error => {
      alert("Submission failed. Please try again.");
      console.error(error);
      setIsSubmitting(false);
    });
  };

  // Removed handleNewsletterSubmit

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'service') {
        const budget = getBudgetForService(value);
        setFormState(prev => ({ ...prev, [name]: value, budget }));
    } else {
        setFormState(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleBookService = (serviceTitle: string) => {
    const budget = getBudgetForService(serviceTitle);
    setFormState(prev => ({ ...prev, service: serviceTitle, budget }));
    setSelectedService(null);
    setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    }, 100);
  };

  const formOptions = [
    "Starter Website",
    "Business Website",
    "Corporate Website",
    "Basic E-Commerce",
    "Advanced E-Commerce",
    "Creative Services",
    "Maintenance / Other",
    ...SERVICES.map(s => s.title)
  ].filter((value, index, self) => self.indexOf(value) === index);

  return (
    <div className="relative">
      <Navbar currentPath={currentPath} onNavigate={setCurrentPath} />
      
      {currentPath === 'home' ? (
        <LandingPage 
            setSelectedService={setSelectedService}
            setSelectedProject={setSelectedProject}
            currency={currency}
            toggleCurrency={toggleCurrency}
            handleBookService={handleBookService}
            isSubmitted={isSubmitted}
            setIsSubmitted={setIsSubmitted}
            handleFormSubmit={handleFormSubmit}
            formState={formState}
            handleInputChange={handleInputChange}
            isSubmitting={isSubmitting}
            formOptions={formOptions}
        />
      ) : (
        <BlogPage onBack={() => setCurrentPath('home')} />
      )}

      <Footer 
          currentPath={currentPath}
          setCurrentPath={setCurrentPath}
      />

      <ServiceModal 
        service={selectedService} 
        onClose={() => setSelectedService(null)} 
        onBook={handleBookService} 
      />
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
        onStartProject={() => {
            setSelectedProject(null);
            setTimeout(() => scrollToSection('contact'), 100);
        }} 
      />
    </div>
  );
};

export default App;