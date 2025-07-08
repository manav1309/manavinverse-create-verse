
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Clock } from 'lucide-react';
import Modal from '@/components/ui/modal';
import { mockPosts, authorInfo } from '@/data/mockData';

const Articles = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  
  const articlePosts = mockPosts.filter(post => post.type === 'article');

  const openPost = (post) => {
    setSelectedPost(post);
  };

  const closePost = () => {
    setSelectedPost(null);
  };

  return (
    <div className="min-h-screen">
      {/* Intro Banner */}
      <section 
        className="relative h-96 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(61, 44, 44, 0.6), rgba(61, 44, 44, 0.6)), url(/placeholder.svg)',
        }}
      >
        <div className="text-center text-white z-10 max-w-4xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-serif font-bold mb-6"
          >
            Articles
          </motion.h1>
          <div className="flex items-center justify-center space-x-4 mb-4">
            <img
              src={authorInfo.image}
              alt={authorInfo.name}
              className="w-16 h-16 rounded-full border-2 border-cream"
            />
            <div className="text-left">
              <p className="text-cream text-lg font-medium">{authorInfo.name}</p>
              <p className="text-off-white/80">Digital Storyteller & Writer</p>
            </div>
          </div>
          <p className="text-lg text-cream max-w-2xl mx-auto">
            In-depth explorations of topics that matter, from mindfulness and creativity to the evolving landscape of digital communication.
          </p>
        </div>
      </section>

      {/* Article Posts Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {articlePosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                onClick={() => openPost(post)}
              >
                <div className="md:flex h-full">
                  <div className="md:w-2/5 relative">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Article
                      </span>
                    </div>
                  </div>
                  
                  <div className="md:w-3/5 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Calendar size={14} className="mr-1" />
                        <span className="mr-4">{new Date(post.date).toLocaleDateString()}</span>
                        <User size={14} className="mr-1" />
                        <span>{post.author.id}</span>
                      </div>
                      
                      <h3 className="text-xl font-serif font-bold text-chocolate mb-3 group-hover:text-chocolate/80 transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-charcoal mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock size={14} className="mr-1" />
                        <span>8 min read</span>
                      </div>
                      <span className="text-chocolate font-medium hover:text-chocolate/80 transition-colors">
                        Read More →
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Post Modal */}
      <Modal
        isOpen={!!selectedPost}
        onClose={closePost}
        className="max-w-4xl"
      >
        {selectedPost && (
          <div className="p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-serif font-bold text-chocolate mb-4">
                {selectedPost.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <img
                    src={selectedPost.author.avatar}
                    alt={selectedPost.author.name}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span>{selectedPost.author.name} {selectedPost.author.id}</span>
                </div>
                <span>{new Date(selectedPost.date).toLocaleDateString()}</span>
              </div>
              {selectedPost.summary && (
                <div className="bg-cream p-4 rounded-lg mb-6">
                  <h3 className="font-semibold text-chocolate mb-2">Summary</h3>
                  <p className="text-charcoal">{selectedPost.summary}</p>
                </div>
              )}
            </div>
            
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap leading-relaxed text-charcoal">
                {selectedPost.content}
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {selectedPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Articles;
