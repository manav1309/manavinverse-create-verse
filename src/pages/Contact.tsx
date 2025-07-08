
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });

    setFormData({ name: '', email: '', phone: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <section 
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(61, 44, 44, 0.3), rgba(61, 44, 44, 0.3)), url(/placeholder.svg)',
        }}
      >
        <div className="text-center z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-md mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">
              ManavInVerse
            </h1>
            <p className="text-cream text-lg">
              Let's start a conversation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-chocolate rounded-lg shadow-xl p-8 md:p-12"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif font-bold text-cream mb-4">
                Get in Touch
              </h2>
              <p className="text-off-white/80">
                Have a story to share? A question to ask? I'd love to hear from you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-cream font-medium mb-2">
                    Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-cream text-charcoal border-cream focus:border-off-white"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-cream font-medium mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-cream text-charcoal border-cream focus:border-off-white"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-cream font-medium mb-2">
                  Phone (Optional)
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="bg-cream text-charcoal border-cream focus:border-off-white"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-cream font-medium mb-2">
                  Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="bg-cream text-charcoal border-cream focus:border-off-white resize-none"
                  placeholder="Tell me what's on your mind..."
                />
              </div>

              <div className="text-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-cream text-chocolate hover:bg-off-white px-8 py-3 font-semibold disabled:opacity-50"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send size={18} className="mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Contact Info & Social */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-serif font-bold text-chocolate mb-6">
                Let's Connect
              </h3>
              <div className="space-y-4">
                <a
                  href="mailto:hello@manavinverse.com"
                  className="flex items-center space-x-3 text-charcoal hover:text-chocolate transition-colors group"
                >
                  <div className="bg-chocolate text-cream p-3 rounded-full group-hover:bg-chocolate/90 transition-colors">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p>hello@manavinverse.com</p>
                  </div>
                </a>

                <a
                  href="tel:+15551234567"
                  className="flex items-center space-x-3 text-charcoal hover:text-chocolate transition-colors group"
                >
                  <div className="bg-chocolate text-cream p-3 rounded-full group-hover:bg-chocolate/90 transition-colors">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </a>

                <div className="flex items-center space-x-3 text-charcoal">
                  <div className="bg-chocolate text-cream p-3 rounded-full">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="font-medium">Location</p>
                    <p>Everywhere & Nowhere</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-serif font-bold text-chocolate mb-6">
                Follow the Journey
              </h3>
              <p className="text-charcoal mb-6">
                Stay connected and be the first to know about new stories, poems, and insights.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="#"
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-chocolate hover:bg-gray-50 transition-colors group"
                >
                  <Facebook size={24} className="text-blue-600" />
                  <div>
                    <p className="font-medium text-charcoal group-hover:text-chocolate">Facebook</p>
                    <p className="text-sm text-gray-500">@manavinverse</p>
                  </div>
                </a>

                <a
                  href="#"
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-chocolate hover:bg-gray-50 transition-colors group"
                >
                  <Twitter size={24} className="text-blue-400" />
                  <div>
                    <p className="font-medium text-charcoal group-hover:text-chocolate">Twitter</p>
                    <p className="text-sm text-gray-500">@manavinverse</p>
                  </div>
                </a>

                <a
                  href="#"
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-chocolate hover:bg-gray-50 transition-colors group"
                >
                  <Instagram size={24} className="text-pink-600" />
                  <div>
                    <p className="font-medium text-charcoal group-hover:text-chocolate">Instagram</p>
                    <p className="text-sm text-gray-500">@manavinverse</p>
                  </div>
                </a>

                <a
                  href="#"
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-chocolate hover:bg-gray-50 transition-colors group"
                >
                  <Linkedin size={24} className="text-blue-700" />
                  <div>
                    <p className="font-medium text-charcoal group-hover:text-chocolate">LinkedIn</p>
                    <p className="text-sm text-gray-500">Manav</p>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
