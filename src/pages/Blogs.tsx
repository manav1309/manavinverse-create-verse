import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Clock } from 'lucide-react';
import Modal from '@/components/ui/modal';
import { authorInfo } from '@/data/mockData';
import { useContentStore } from '@/stores/contentStore';
const Blogs = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const {
    blogs,
    fetchBlogs,
    loading
  } = useContentStore();
  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);
  const openPost = post => {
    setSelectedPost(post);
  };
  const closePost = () => {
    setSelectedPost(null);
  };
  return <div className="min-h-screen">
      {/* Intro Banner */}
      <section className="relative h-96 flex items-center justify-center bg-cover bg-center" style={{
      backgroundImage: 'linear-gradient(rgba(61, 44, 44, 0.6), rgba(61, 44, 44, 0.6)), url(/lovable-uploads/aa13b974-49fc-4f40-8941-e3f2815daf0f.png)'
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
        }} className="text-4xl md:text-6xl font-serif font-bold mb-6">
            Blogs
          </motion.h1>
          <div className="flex items-center justify-center space-x-4 mb-4">
            <img src={authorInfo.image} alt={authorInfo.name} className="w-16 h-16 rounded-full border-2 border-cream" />
            <div className="text-left">
              <p className="text-cream text-lg font-medium">{authorInfo.name}</p>
              <p className="text-off-white/80">Digital Storyteller & Writer</p>
            </div>
          </div>
          <p className="text-lg text-cream max-w-2xl mx-auto font-semibold">Exploring the intersection of creativity and human experience through thoughtful narratives and insights.</p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          {loading ? <div className="text-center">Loading...</div> : <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((post, index) => <motion.div key={post.id} initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: index * 0.1
          }} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group" onClick={() => openPost(post)}>
                <div className="relative">
                  <img src={post.image || '/placeholder.svg'} alt={post.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Blog
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar size={14} className="mr-1" />
                    <span className="mr-4">{post.date}</span>
                    <User size={14} className="mr-1" />
                    <span>{post.author}</span>
                  </div>
                  
                  <h3 className="text-xl font-serif font-bold text-chocolate mb-3 group-hover:text-chocolate/80 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-charcoal mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock size={14} className="mr-1" />
                      <span>5 min read</span>
                    </div>
                    <span className="text-chocolate font-medium hover:text-chocolate/80 transition-colors">
                      Read More →
                    </span>
                  </div>
                </div>
              </motion.div>)}
            </div>}
        </div>
      </section>

      {/* Post Modal */}
      <Modal isOpen={!!selectedPost} onClose={closePost} className="max-w-4xl">
        {selectedPost && <div className="p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-serif font-bold text-chocolate mb-4">
                {selectedPost.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <img src={authorInfo.image} alt={authorInfo.name} className="w-8 h-8 rounded-full mr-2" />
                  <span>{selectedPost.author}</span>
                </div>
                <span>{selectedPost.date}</span>
              </div>
              {selectedPost.excerpt && <div className="bg-cream p-4 rounded-lg mb-6">
                  <h3 className="font-semibold text-chocolate mb-2">Excerpt</h3>
                  <p className="text-charcoal">{selectedPost.excerpt}</p>
                </div>}
            </div>
            
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap leading-relaxed text-charcoal">
                {selectedPost.content}
              </div>
            </div>
            
          </div>}
      </Modal>
    </div>;
};
export default Blogs;