
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
import { useContentStore } from '../../stores/contentStore';
import { useToast } from '../../hooks/use-toast';
import Modal from '../ui/modal';
import PoemForm from './PoemForm';

const AdminPoems = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPoem, setSelectedPoem] = useState(null);
  
  const { poems, createPoem, updatePoem, deletePoem, fetchPoems, loading } = useContentStore();
  const { toast } = useToast();

  useEffect(() => {
    fetchPoems();
  }, [fetchPoems]);

  const filteredPoems = poems.filter(poem =>
    poem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    poem.preview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (poem) => {
    setSelectedPoem(poem);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (poemId) => {
    if (window.confirm('Are you sure you want to delete this poem?')) {
      try {
        await deletePoem(poemId);
        toast({
          title: "Success",
          description: "Poem deleted successfully",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete poem. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleCreate = async (data) => {
    try {
      await createPoem(data);
      setIsCreateModalOpen(false);
      toast({
        title: "Success",
        description: "Poem created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create poem. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdate = async (data) => {
    try {
      await updatePoem(selectedPoem.id, data);
      setIsEditModalOpen(false);
      setSelectedPoem(null);
      toast({
        title: "Success",
        description: "Poem updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update poem. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-chocolate">Poetry Management</h1>
          <p className="text-gray-600 mt-2">Create and manage your poems</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-chocolate text-cream px-4 py-2 rounded-lg hover:bg-chocolate/90 transition-colors flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>New Poem</span>
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search poems..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-chocolate/20 focus:border-chocolate"
          />
        </div>
      </div>

      {/* Poems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPoems.map((poem, index) => (
          <motion.div
            key={poem.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative h-48">
              <img
                src={poem.image}
                alt={poem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white p-4">
                  <h3 className="text-lg font-serif font-bold mb-2">{poem.title}</h3>
                  <p className="text-sm opacity-90 italic">{poem.preview}</p>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <span>{poem.date}</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                  Published
                </span>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => window.open(`/poems/${poem.slug}`, '_blank')}
                  className="flex-1 bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                >
                  <Eye size={16} />
                  <span>View</span>
                </button>
                <button
                  onClick={() => handleEdit(poem)}
                  className="flex-1 bg-chocolate/10 text-chocolate hover:bg-chocolate/20 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                >
                  <Edit size={16} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(poem.id)}
                  className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Create Modal */}
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <PoemForm
          onClose={() => setIsCreateModalOpen(false)}
          onSave={handleCreate}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <PoemForm
          poem={selectedPoem}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleUpdate}
        />
      </Modal>
    </div>
  );
};

export default AdminPoems;
