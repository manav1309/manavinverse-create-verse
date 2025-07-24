import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Pencil, Trash2, Plus, GripVertical } from 'lucide-react';

interface Genre {
  id: string;
  name: string;
  description: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

const AdminGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingGenre, setEditingGenre] = useState<Genre | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    display_order: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const { data, error } = await supabase
        .from('genres')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setGenres(data || []);
    } catch (error) {
      console.error('Error fetching genres:', error);
      toast({
        title: "Error",
        description: "Failed to fetch genres",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingGenre) {
        const { error } = await supabase
          .from('genres')
          .update(formData)
          .eq('id', editingGenre.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Genre updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('genres')
          .insert([formData]);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Genre created successfully",
        });
      }

      setFormData({ name: '', description: '', display_order: 0 });
      setEditingGenre(null);
      setShowForm(false);
      fetchGenres();
    } catch (error) {
      console.error('Error saving genre:', error);
      toast({
        title: "Error",
        description: "Failed to save genre",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (genre: Genre) => {
    setEditingGenre(genre);
    setFormData({
      name: genre.name,
      description: genre.description || '',
      display_order: genre.display_order
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this genre?')) return;

    try {
      const { error } = await supabase
        .from('genres')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({
        title: "Success",
        description: "Genre deleted successfully",
      });
      fetchGenres();
    } catch (error) {
      console.error('Error deleting genre:', error);
      toast({
        title: "Error",
        description: "Failed to delete genre",
        variant: "destructive",
      });
    }
  };

  const updateDisplayOrder = async (id: string, newOrder: number) => {
    try {
      const { error } = await supabase
        .from('genres')
        .update({ display_order: newOrder })
        .eq('id', id);

      if (error) throw error;
      fetchGenres();
    } catch (error) {
      console.error('Error updating display order:', error);
      toast({
        title: "Error",
        description: "Failed to update display order",
        variant: "destructive",
      });
    }
  };

  if (loading) return <div>Loading genres...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Genres</h1>
        <Button 
          onClick={() => {
            setFormData({ name: '', description: '', display_order: genres.length });
            setEditingGenre(null);
            setShowForm(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Genre
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingGenre ? 'Edit Genre' : 'Add New Genre'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Display Order</label>
                <Input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">
                  {editingGenre ? 'Update' : 'Create'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {genres.map((genre, index) => (
          <Card key={genre.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <GripVertical className="w-4 h-4 text-muted-foreground" />
                <div>
                  <h3 className="font-semibold">{genre.name}</h3>
                  {genre.description && (
                    <p className="text-sm text-muted-foreground">{genre.description}</p>
                  )}
                  <Badge variant="secondary" className="mt-1">
                    Order: {genre.display_order}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateDisplayOrder(genre.id, index > 0 ? index - 1 : 0)}
                  disabled={index === 0}
                >
                  ↑
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateDisplayOrder(genre.id, index + 1)}
                  disabled={index === genres.length - 1}
                >
                  ↓
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(genre)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(genre.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminGenres;