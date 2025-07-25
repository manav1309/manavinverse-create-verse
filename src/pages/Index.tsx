import { motion } from 'framer-motion';
import { ArrowDown, BookOpen, PenTool, Heart } from 'lucide-react';
import Carousel from '@/components/ui/carousel';
import { Link } from 'react-router-dom';
import { useContentStore } from '@/stores/contentStore';
import { useEffect } from 'react';
const Index = () => {
  const {
    blogs,
    articles,
    poems,
    fetchBlogs,
    fetchArticles,
    fetchPoems,
    loading
  } = useContentStore();
  useEffect(() => {
    fetchBlogs();
    fetchArticles();
    fetchPoems();
  }, [fetchBlogs, fetchArticles, fetchPoems]);
  const scrollToFeatured = () => {
    document.getElementById('featured')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  // Combine all content and take the first 3 for featured
  const allContent = [...blogs.map(blog => ({
    ...blog,
    type: 'blog'
  })), ...articles.map(article => ({
    ...article,
    type: 'article'
  })), ...poems.map(poem => ({
    ...poem,
    type: 'poem',
    excerpt: poem.preview
  }))];
  const featuredPosts = allContent.slice(0, 3);
  return <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-cover bg-center" style={{
      backgroundImage: 'linear-gradient(rgba(61, 44, 44, 0.6), rgba(61, 44, 44, 0.6)), url(/lovable-uploads/337c3455-5c52-44dd-977e-caa0de49683b.png)'
    }}>
        <div className="text-center text-white z-10 max-w-4xl mx-auto px-4">
          <motion.h1 initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} className="text-5xl font-serif font-bold mb-6 text-justify md:text-7xl">Welcome to my Universe</motion.h1>
          <motion.p initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }} className="text-xl md:text-2xl mb-8 text-cream font-semibold">
            Where words become worlds and stories find their home
          </motion.p>
          <motion.button initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.4
        }} onClick={scrollToFeatured} className="bg-cream text-chocolate px-8 py-4 rounded-lg font-semibold text-lg hover:bg-off-white transition-colors duration-300 inline-flex items-center space-x-2 animate-pulse-scale">
            <span>Discover My Latest Writing</span>
            <ArrowDown size={20} />
          </motion.button>
        </div>
      </section>

      {/* Featured Content Section */}
      <section id="featured" className="py-16 bg-gradient-to-br from-chocolate to-cream bg-[#73635d]">
        <div className="max-w-7xl mx-auto px-4 bg-gradient-to-br from-chocolate/20 to-cream/30 rounded-2xl py-8 bg-[#270f08]">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="text-center mb-12">
            <h2 className="text-4xl font-serif mb-4 font-bold text-amber-100">
              Featured Works
            </h2>
            <p className="max-w-2xl mx-auto text-amber-100 text-lg font-bold">
              Explore the latest stories, insights, and poetry from ManavInVerse
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {loading ? <div className="text-center">Loading...</div> : featuredPosts.length > 0 ? <Carousel autoSlide={5000}>
                {featuredPosts.map(post => <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img src={post.image || '/placeholder.svg'} alt={post.title} className="w-full h-64 md:h-full object-cover" />
                    </div>
                    <div className="md:w-2/3 p-8">
                      <div className="mb-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${post.type === 'blog' ? 'bg-blue-100 text-blue-800' : post.type === 'article' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'}`}>
                          {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                        </span>
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-chocolate mb-4">
                        {post.title}
                      </h3>
                      <p className="text-charcoal mb-6 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <Link to={`/${post.type === 'poem' ? 'poems' : post.type + 's'}`} className="inline-flex items-center space-x-2 bg-chocolate text-cream px-6 py-3 rounded-lg hover:bg-chocolate/90 transition-colors">
                        <span>Read More</span>
                        <BookOpen size={16} />
                      </Link>
                    </div>
                  </div>
                  </div>)}
              </Carousel> : <div className="text-center text-gray-500">No content available yet.</div>}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6
          }} className="text-center p-8 rounded-lg hover:shadow-lg transition-shadow relative overflow-hidden" style={{
            backgroundImage: 'linear-gradient(rgba(139, 69, 19, 0.4), rgba(139, 69, 19, 0.4)), url(/lovable-uploads/165c6897-3209-490b-9bdb-1b1578a0f739.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>
              <div className="bg-cream text-chocolate w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-serif font-bold text-cream mb-4">Blogs & Articles</h3>
              <p className="text-cream mb-6 font-bold">Dive deep into thought-provoking contemporary insights</p>
              <Link to="/blogs" className="text-cream hover:text-cream/80 font-medium inline-flex items-center space-x-1">
                <span>Explore Blogs</span>
                <ArrowDown size={16} className="rotate-[-90deg]" />
              </Link>
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.1
          }} className="text-center p-8 rounded-lg hover:shadow-lg transition-shadow relative overflow-hidden" style={{
            backgroundImage: 'linear-gradient(rgba(139, 69, 19, 0.4), rgba(139, 69, 19, 0.4)), url(/lovable-uploads/4f53a926-3f07-4dac-b1e2-eb33a40ea82f.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>
              <div className="bg-chocolate text-cream w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <PenTool size={24} />
              </div>
              <h3 className="font-serif font-bold text-cream mb-4 text-3xl">Poetry</h3>
              <p className="text-cream mb-6 font-bold">Words are not mere verses; they are honey dripping from the ✒️</p>
              <Link to="/poems" className="text-cream hover:text-cream/80 font-medium inline-flex items-center space-x-1">
                <span>Read Poetry</span>
                <ArrowDown size={16} className="rotate-[-90deg]" />
              </Link>
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.2
          }} className="text-center p-8 rounded-lg hover:shadow-lg transition-shadow relative overflow-hidden" style={{
            backgroundImage: 'linear-gradient(rgba(139, 69, 19, 0.4), rgba(139, 69, 19, 0.4)), url(/lovable-uploads/af9bcdee-1787-4a62-b339-d68c0cc2f092.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>
              <div className="bg-chocolate text-cream w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart size={24} />
              </div>
              <h3 className="text-xl font-serif font-bold text-cream mb-4">About the Journey</h3>
              <p className="text-cream mb-6 font-bold">
                Learn about the mind and heart behind the words
              </p>
              <Link to="/about" className="text-cream hover:text-cream/80 font-medium inline-flex items-center space-x-1">
                <span>Meet the Author</span>
                <ArrowDown size={16} className="rotate-[-90deg]" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>;
};
export default Index;