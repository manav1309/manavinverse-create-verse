import { motion } from 'framer-motion';
import { Award, BookOpen, Users, Mic } from 'lucide-react';
import { authorInfo } from '@/data/mockData';
const About = () => {
  return <div className="min-h-screen">
      {/* Banner */}
      <section className="relative h-96 flex items-center justify-center bg-cover bg-center" style={{
      backgroundImage: 'linear-gradient(rgba(61, 44, 44, 0.6), rgba(61, 44, 44, 0.6)), url(/lovable-uploads/7c92874b-01e6-4842-bc84-261168369ec7.png)'
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
            About the Journey
          </motion.h1>
          <motion.p initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }} className="text-lg text-cream max-w-2xl mx-auto">
            Every story has a storyteller, every verse a voice. Welcome to the mind and heart behind ManavInVerse.
          </motion.p>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Portrait */}
            <motion.div initial={{
            opacity: 0,
            x: -30
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.8
          }} className="relative">
              <div className="relative z-10">
                <img src={authorInfo.image} alt={authorInfo.name} className="w-full max-w-md mx-auto rounded-lg shadow-xl" />
              </div>
              <div className="absolute inset-0 bg-cover bg-center opacity-10 rounded-lg" style={{
              backgroundImage: 'url(/placeholder.svg)'
            }} />
            </motion.div>

            {/* Bio Content */}
            <motion.div initial={{
            opacity: 0,
            x: 30
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.8,
            delay: 0.2
          }} className="space-y-6">
              <div>
                <h2 className="text-3xl font-serif font-bold text-chocolate mb-4">
                  Meet {authorInfo.name}
                </h2>
                <p className="text-lg text-charcoal leading-relaxed mb-6">
                  {authorInfo.bio}
                </p>
              </div>

              {/* Experience */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-chocolate mb-4 flex items-center">
                  <BookOpen size={20} className="mr-2" />
                  Experience
                </h3>
                <ul className="space-y-2">
                  {authorInfo.experience.map((item, index) => <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-chocolate rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-charcoal">{item}</span>
                    </li>)}
                </ul>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="text-xl font-semibold text-chocolate mb-4 flex items-center">
                  <Award size={20} className="mr-2" />
                  Achievements
                </h3>
                <ul className="space-y-2">
                  {authorInfo.achievements.map((item, index) => <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-chocolate rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-charcoal">{item}</span>
                    </li>)}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6
          }} className="text-center">
              <div className="bg-chocolate text-cream w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen size={24} />
              </div>
              <h3 className="text-2xl font-bold text-chocolate mb-2">2100+</h3>
              <p className="text-charcoal font-semibold">Written Pieces</p>
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
          }} className="text-center">
              <div className="bg-chocolate text-cream w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-2xl font-bold text-chocolate mb-2">35+</h3>
              <p className="text-charcoal font-semibold">Stage Appearnces</p>
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
          }} className="text-center">
              <div className="bg-chocolate text-cream w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={24} />
              </div>
              <h3 className="text-2xl font-bold text-chocolate mb-2">3+</h3>
              <p className="text-charcoal text-base font-semibold">Years Experience</p>
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.3
          }} className="text-center">
              <div className="bg-chocolate text-cream w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mic size={24} />
              </div>
              <h3 className="text-2xl font-bold text-chocolate mb-2">25+</h3>
              <p className="text-charcoal">Written and Spoken Societies' Experience</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }}>
            <h2 className="text-3xl font-serif font-bold text-chocolate mb-8">
              Writing Philosophy
            </h2>
            <blockquote className="text-xl italic text-charcoal leading-relaxed mb-8 px-0">"The greatest gift given to humanity by God is words. I have sailed the boats of words through the turbulent seas of fear, pain, and peace. And I found a home at the shore of poems. Thus I write, उस दौर की तरह हमें भी भुला दिया जाए,  उसके फूल सलामत हैं, हमें मगर जला दिया जाए। 🥀"</blockquote>
            <p className="text-chocolate font-medium">— {authorInfo.name}</p>
          </motion.div>
        </div>
      </section>
    </div>;
};
export default About;