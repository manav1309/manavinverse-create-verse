
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-8xl font-serif font-bold text-chocolate mb-4">404</h1>
          <h2 className="text-2xl font-serif font-semibold text-charcoal mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            The story you're looking for seems to have wandered off the beaten path. 
            Let's get you back to familiar territory.
          </p>
          
          <div className="space-y-4">
            <Link 
              to="/"
              className="inline-flex items-center space-x-2 bg-chocolate text-cream px-6 py-3 rounded-lg hover:bg-chocolate/90 transition-colors font-medium"
            >
              <Home size={18} />
              <span>Return Home</span>
            </Link>
            
            <div className="text-center">
              <button 
                onClick={() => window.history.back()}
                className="inline-flex items-center space-x-2 text-chocolate hover:text-chocolate/80 transition-colors"
              >
                <ArrowLeft size={16} />
                <span>Go Back</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
