
import { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';

interface PoemFormProps {
  poem?: any;
  onClose: () => void;
  onSave: (data: any) => void;
}

const PoemForm = ({ poem, onClose, onSave }: PoemFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    preview: '',
    image: '',
    status: 'published'
  });

  useEffect(() => {
    if (poem) {
      setFormData({
        title: poem.title || '',
        content: poem.content || '',
        preview: poem.preview || '',
        image: poem.image || '',
        status: 'published'
      });
    }
  }, [poem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-serif font-bold text-chocolate">
          {poem ? 'Edit Poem' : 'Create New Poem'}
        </h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-chocolate/20 focus:border-chocolate"
            placeholder="Enter poem title..."
          />
        </div>

        <div>
          <label htmlFor="preview" className="block text-sm font-medium text-gray-700 mb-2">
            Preview Lines *
          </label>
          <textarea
            id="preview"
            name="preview"
            value={formData.preview}
            onChange={handleChange}
            required
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-chocolate/20 focus:border-chocolate"
            placeholder="First few lines of your poem..."
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
            Background Image URL
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-chocolate/20 focus:border-chocolate"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Full Poem *
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={15}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-chocolate/20 focus:border-chocolate font-serif"
            placeholder="Write your full poem here..."
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-chocolate/20 focus:border-chocolate"
          >
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </div>

        <div className="flex justify-end space-x-4 pt-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-chocolate text-cream px-6 py-2 rounded-lg hover:bg-chocolate/90 transition-colors flex items-center space-x-2"
          >
            <Save size={16} />
            <span>{poem ? 'Update' : 'Create'} Poem</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PoemForm;
