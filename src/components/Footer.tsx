
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

interface FooterProps {
  showAnimation?: boolean;
}

const Footer = ({ showAnimation = true }: FooterProps) => {
  return (
    <footer className="bg-chocolate text-cream mt-16">
      {/* Animated Contact Bar */}
      {showAnimation && (
        <div className="relative overflow-hidden bg-cream h-2">
          <motion.div
            className="absolute inset-0 bg-chocolate h-full"
            animate={{ x: ['-100%', '100%'] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">ManavInVerse</h3>
            <p className="text-off-white/80 mb-4">
              Exploring the depths of human experience through words, stories, and poetry.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-cream hover:text-off-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-cream hover:text-off-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-cream hover:text-off-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/blogs" className="text-off-white/80 hover:text-cream transition-colors">Latest Blogs</Link></li>
              <li><Link to="/articles" className="text-off-white/80 hover:text-cream transition-colors">Featured Articles</Link></li>
              <li><Link to="/poems" className="text-off-white/80 hover:text-cream transition-colors">Poetry Collection</Link></li>
              <li><Link to="/about" className="text-off-white/80 hover:text-cream transition-colors">About the Author</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span className="text-off-white/80">hello@manavinverse.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span className="text-off-white/80">+1 (555) 123-4567</span>
              </div>
            </div>
            <Link 
              to="/contact"
              className="inline-block mt-4 bg-cream text-charcoal px-4 py-2 rounded-md hover:bg-off-white transition-colors font-medium"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="border-t border-cream/20 mt-8 pt-8 text-center">
          <p className="text-off-white/60">
            © 2024 ManavInVerse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
