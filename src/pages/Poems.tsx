import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import Modal from '@/components/ui/modal';
import { authorInfo } from '@/data/mockData';
import { useContentStore } from '@/stores/contentStore';
const Poems = () => {
  const [selectedPoem, setSelectedPoem] = useState(null);
  const {
    poems,
    fetchPoems,
    loading
  } = useContentStore();
  useEffect(() => {
    fetchPoems();
  }, [fetchPoems]);
  const openPoem = poem => {
    setSelectedPoem(poem);
  };
  const closePoem = () => {
    setSelectedPoem(null);
  };
  return <div className="min-h-screen">
      {/* Intro Banner */}
      <section className="relative h-96 flex items-center justify-center bg-cover bg-center" style={{
      backgroundImage: 'linear-gradient(rgba(61, 44, 44, 0.6), rgba(61, 44, 44, 0.6)), url(/lovable-uploads/de91bcb0-b712-49a2-8ec5-ce5ea4383861.png)'
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
            Poetry
          </motion.h1>
          <div className="flex items-center justify-center space-x-4 mb-4">
            <img src={authorInfo.image} alt={authorInfo.name} className="w-16 h-16 rounded-full border-2 border-cream" />
            <div className="text-left">
              <p className="text-cream font-extrabold text-xl">{authorInfo.name}</p>
              <p className="text-off-white/80 font-bold">Poet & Wordsmith</p>
            </div>
          </div>
          <p className="text-lg text-cream max-w-2xl mx-auto font-medium">The words are poured from the ink of the pen just like honey, and the poets are the weavers of the silky threads of feelings.</p>
        </div>
      </section>

      {/* Poem Teasers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          {loading ? <div className="text-center">Loading...</div> : <div className="space-y-8">
              {poems.map((poem, index) => <motion.div key={poem.id} initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: index * 0.1
          }} className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group" onClick={() => openPoem(poem)}>
                <div className="h-64 bg-cover bg-center relative" style={{
              backgroundImage: `linear-gradient(rgba(61, 44, 44, 0.7), rgba(61, 44, 44, 0.7)), url(${poem.image || '/placeholder.svg'})`
            }}>
                  <div className="absolute inset-0 flex items-center justify-center text-center text-white p-8">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4 group-hover:text-cream transition-colors">
                        {poem.title}
                      </h3>
                      <p className="text-lg italic leading-relaxed mb-4">
                        {poem.preview}
                      </p>
                      <div className="flex items-center justify-center text-sm text-cream">
                        <Calendar size={14} className="mr-2" />
                        <span>{poem.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-chocolate/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white font-medium">Read Full Poem →</span>
                  </div>
                </div>
              </motion.div>)}
            </div>}
        </div>
      </section>

      {/* Poem Modal */}
      <Modal isOpen={!!selectedPoem} onClose={closePoem} className="max-w-4xl">
        {selectedPoem && <div className="relative min-h-96 bg-cover bg-center" style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(${selectedPoem.image || '/placeholder.svg'})`
      }}>
            <div className="p-8 md:p-12">
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-chocolate mb-4">
                  {selectedPoem.title}
                </h1>
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <Calendar size={14} className="mr-2" />
                  <span>{selectedPoem.date}</span>
                </div>
              </div>
              
              <div className="max-w-2xl mx-auto">
                <div className="text-center font-serif text-lg leading-relaxed text-charcoal whitespace-pre-line">
                  {selectedPoem.content}
                </div>
              </div>
            </div>
          </div>}
      </Modal>
    </div>;
};
export default Poems;