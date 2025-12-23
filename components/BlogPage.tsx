
import React, { useState } from 'react';
import { BlogPost, Author } from '../types.ts';

const AUTHORS: Record<string, Author> = {
  andrew: {
    name: "Andrew K.",
    avatar: "https://i.pravatar.cc/150?u=andrew",
    role: "Creative Director"
  },
  sarah: {
    name: "Sarah Namuli",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    role: "Lead Designer"
  },
  davis: {
    name: "Davis Okello",
    avatar: "https://i.pravatar.cc/150?u=davis",
    role: "Fullstack Engineer"
  }
};

const ALL_BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Web Design in 2025",
    excerpt: "Exploring how AI and spatial computing are reshaping how we interact with the web and the rise of glassmorphism 2.0.",
    content: [
      "The web is evolving rapidly. As we approach 2025, the boundaries between the digital and physical worlds are blurring. Spatial computing is no longer a buzzword; it's becoming a design standard.",
      "We are seeing a resurgence of depth in UI design. Glassmorphism is evolving into what we call 'Crystal Interface' - sharper, more refractive, and responsive to device movement.",
      "At DrewVerse, we are already experimenting with 3D web experiences that don't require heavy headsets. The future is immersive, and it's right around the corner."
    ],
    date: "May 12, 2024",
    category: "Trends",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&fm=webp&auto=format&fit=crop",
    author: AUTHORS.andrew
  },
  {
    id: 2,
    title: "How Much Does a Website Cost in Uganda?",
    excerpt: "A transparent guide on web design pricing in Kampala, from basic landing pages to complex e-commerce platforms.",
    content: [
        "One of the most common questions we get is: 'How much for a website?'. The answer, unsurprisingly, is: 'It depends'.",
        "For a basic brochure site in Kampala, prices can range from 1M to 3M UGX. This includes standard responsiveness and basic SEO.",
        "Custom web applications or e-commerce platforms start higher, often requiring a dedicated team for backend and frontend development. At DrewVerse, we focus on value-based pricing, ensuring you get a return on your investment."
    ],
    date: "May 05, 2024",
    category: "Strategy",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&fm=webp&auto=format&fit=crop",
    author: AUTHORS.andrew
  },
  {
    id: 3,
    title: "React Native vs Flutter for African Apps",
    excerpt: "Why cross-platform is king for the East African market and which framework our Kampala dev team prefers.",
    content: [
        "In the East African market, device fragmentation is a real challenge. Developing separate native apps for iOS and Android is often cost-prohibitive for startups.",
        "Flutter offers incredible performance and a unified UI, but React Native allows for easier integration with existing JavaScript codebases.",
        "Our team prefers React Native for its vast ecosystem and over-the-air update capabilities, which are crucial for maintaining apps in regions with expensive data plans."
    ],
    date: "April 15, 2024",
    category: "Engineering",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&fm=webp&auto=format&fit=crop",
    author: AUTHORS.davis
  },
  {
    id: 4,
    title: "Mastering React Native Performance",
    excerpt: "Top tips from our engineering team on building butter-smooth mobile applications with zero frame drops.",
    content: [
        "Performance is the #1 feature. If your app janks, users uninstall. It's that simple.",
        "We focus on minimizing bridge crossings, using Reanimated for complex gestures, and optimizing list rendering with FlashList.",
        "Always profile on low-end Android devices. If it runs smooth there, it will fly on an iPhone."
    ],
    date: "March 15, 2024",
    category: "Engineering",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&fm=webp&auto=format&fit=crop",
    author: AUTHORS.davis
  },
  {
    id: 5,
    title: "SEO Strategies for Kampala Businesses",
    excerpt: "A comprehensive guide to dominating local search results in Uganda and attracting higher-quality leads.",
    content: [
        "Local SEO is underutilized in Uganda. Many businesses have a website but no Google Business Profile optimization.",
        "Key strategy: Ensure your NAP (Name, Address, Phone) is consistent across the web. Use local keywords like 'Kampala', 'Entebbe', or 'Uganda' naturally in your headers.",
        "Speed matters. Google penalizes slow sites. We ensure all our client sites score 90+ on Core Web Vitals."
    ],
    date: "Feb 10, 2024",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1572177222102-786193874484?q=80&w=800&fm=webp&auto=format&fit=crop",
    author: AUTHORS.andrew
  },
  {
    id: 6,
    title: "The Impact of Minimalist Design",
    excerpt: "Why less is often more when it comes to high-converting digital product interfaces in the Uganda tech scene.",
    content: [
        "Minimalism isn't just about white space; it's about focus. In an era of notification overload, a clean interface is a sanctuary.",
        "By removing visual clutter, we guide the user's eye to the call-to-action. Conversion rates on minimalist pages are consistently higher.",
        "We believe in 'Complexity Reduction'. Make the system do the hard work so the user doesn't have to."
    ],
    date: "Jan 15, 2024",
    category: "Aesthetics",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&fm=webp&auto=format&fit=crop",
    author: AUTHORS.sarah
  },
  {
    id: 7,
    title: "Digital Transformation in Banking",
    excerpt: "How fintech apps are revolutionizing the banking sector in Uganda and the role of UX in trust-building.",
    content: [
      "Traditional banking is being disrupted by agile fintech startups. User experience is the main differentiator.",
      "We analyze how intuitive interfaces build trust with users who are new to digital banking.",
      "Security features don't have to mean bad UX. Biometrics and clear feedback loops are key."
    ],
    date: "Dec 05, 2023",
    category: "Strategy",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&fm=webp&auto=format&fit=crop",
    author: AUTHORS.davis
  },
  {
    id: 8,
    title: "Color Psychology in African Markets",
    excerpt: "Understanding cultural associations with color in East Africa and how to apply them in brand identity.",
    content: [
      "Colors have different meanings in different cultures. In East Africa, vibrant colors are often preferred but must be balanced.",
      "We look at case studies of successful rebranding campaigns in Kampala.",
      "Using color to guide user attention and evoke the right emotions."
    ],
    date: "Nov 20, 2023",
    category: "Aesthetics",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&fm=webp&auto=format&fit=crop",
    author: AUTHORS.sarah
  },
  {
    id: 9,
    title: "The Rise of No-Code Tools",
    excerpt: "Can no-code platforms replace custom development? Pros, cons, and when to choose which path.",
    content: [
      "No-code tools like Webflow and Framer are powerful for marketing sites.",
      "However, for complex logic and scalability, custom code is often still required.",
      "At DrewVerse, we use a hybrid approach to maximize speed and flexibility."
    ],
    date: "Oct 10, 2023",
    category: "Trends",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&fm=webp&auto=format&fit=crop",
    author: AUTHORS.andrew
  },
];

interface BlogPostModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

const BlogPostModal: React.FC<BlogPostModalProps> = ({ post, onClose }) => {
  if (!post) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-surface-dark w-full max-w-3xl rounded-[2.5rem] overflow-hidden shadow-2xl border border-subtle-light dark:border-white/10 animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
          <div className="relative h-64 md:h-80 flex-shrink-0">
              <img src={post.image} className="w-full h-full object-cover" alt={post.title} />
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/50 text-white backdrop-blur-md flex items-center justify-center hover:bg-primary transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
              <div className="absolute bottom-6 left-6">
                  <span className="px-4 py-1.5 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                      {post.category}
                  </span>
              </div>
          </div>
          
          <div className="p-8 md:p-12 overflow-y-auto">
              <div className="flex items-center gap-3 text-gray-500 mb-4">
                  <span className="material-symbols-outlined text-sm">calendar_today</span>
                  <p className="text-xs font-bold uppercase tracking-widest">{post.date}</p>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold display-font mb-8 leading-tight">{post.title}</h2>
              
              <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed space-y-6 mb-10">
                  {post.content?.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                  ))}
              </div>

              <div className="flex items-center gap-4 pt-8 border-t border-gray-100 dark:border-white/10">
                  <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full" />
                  <div>
                      <p className="font-bold text-sm text-gray-900 dark:text-white">{post.author.name}</p>
                      <p className="text-xs text-gray-500 uppercase tracking-widest">{post.author.role}</p>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

interface BlogPageProps {
  onBack: () => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ onBack }) => {
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Posts');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 3);
      setIsLoading(false);
    }, 800);
  };

  const categories = ['All Posts', 'Trends', 'Strategy', 'Engineering', 'Marketing', 'Aesthetics'];
  
  const filteredPosts = selectedCategory === 'All Posts' 
    ? ALL_BLOG_POSTS 
    : ALL_BLOG_POSTS.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white dark:bg-background-dark pt-32 pb-24">
      <BlogPostModal post={activePost} onClose={() => setActivePost(null)} />
      <div className="container mx-auto px-6">
        <div className="mb-20 space-y-6 text-center md:text-left">
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest hover:gap-4 transition-all"
          >
            <span className="material-symbols-outlined">west</span>
            Back to Home
          </button>
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold display-font uppercase leading-none">
              Insights & <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Perspectives</span>
            </h1>
            <p className="max-w-2xl text-lg text-gray-500 dark:text-gray-400 mx-auto md:mx-0">
              Exploring technology, web design, and digital branding strategies in the Kampala and East African landscape.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-16 border-b border-gray-100 dark:border-white/5 pb-8 justify-center md:justify-start">
          {categories.map((cat) => (
            <button 
              key={cat} 
              onClick={() => { setSelectedCategory(cat); setVisibleCount(3); }}
              className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${selectedCategory === cat ? 'bg-primary text-white shadow-lg shadow-orange-500/30' : 'bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPosts.slice(0, visibleCount).map((post) => (
              <article 
                key={post.id} 
                className="group relative bg-white dark:bg-surface-dark rounded-[2.5rem] overflow-hidden border border-subtle-light dark:border-white/5 transition-all duration-500 ease-out shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] hover:-translate-y-3 hover:scale-[1.02] cursor-pointer flex flex-col"
                onClick={() => setActivePost(post)}
              >
                <div className="relative h-72 overflow-hidden flex-shrink-0">
                  <img 
                    src={post.image} 
                    alt={`${post.title} - Article by DrewVerse Design Uganda team`} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out" 
                    loading="lazy"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-1.5 bg-white/90 dark:bg-black/80 backdrop-blur-md text-gray-900 dark:text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-10 space-y-6 flex flex-col flex-1">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-3 text-gray-400">
                      <span className="w-6 h-[1px] bg-primary/40"></span>
                      <p className="text-[10px] uppercase font-black tracking-[0.15em]">{post.date}</p>
                    </div>
                    <h3 className="text-2xl font-bold display-font leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-white/5 mt-auto">
                    <div className="flex items-center gap-3">
                      <img src={post.author.avatar} alt={`Author ${post.author.name} at DrewVerse Kampala`} className="w-10 h-10 rounded-full border-2 border-white dark:border-subtle-dark" />
                      <div className="flex flex-col">
                        <p className="text-[11px] font-black dark:text-white uppercase tracking-wider">{post.author.name}</p>
                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{post.author.role}</p>
                      </div>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 opacity-50">
             <span className="material-symbols-outlined text-4xl mb-2">sentiment_dissatisfied</span>
             <p>No articles found in this category.</p>
          </div>
        )}

        {visibleCount < filteredPosts.length && (
          <div className="mt-20 flex justify-center">
            <button 
              onClick={loadMore}
              disabled={isLoading}
              className="px-12 py-5 bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-[0.2em] text-[10px] rounded-full hover:bg-primary transition-all flex items-center gap-3"
            >
              {isLoading ? 'Loading...' : 'More Articles'}
              <span className="material-symbols-outlined text-sm">add_circle</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
