import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Users, Calendar, RefreshCw, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { exportToCSV, exportToJSON, type ContactSubmission } from '@/utils/csvExport';

const AdminContactSubmissions = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

  const fetchSubmissions = async () => {
    try {
      // Use service role key for admin access to bypass RLS
      const { data, error } = await supabase.functions.invoke('get-contact-submissions');

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      toast({
        title: "Error",
        description: "Failed to fetch contact submissions",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchSubmissions();
  };

  const handleExportCSV = () => {
    exportToCSV(submissions, 'manavinverse-contact-submissions');
    toast({
      title: "Export Successful",
      description: "Contact submissions exported as CSV file"
    });
  };

  const handleExportJSON = () => {
    exportToJSON(submissions, 'manavinverse-contact-submissions');
    toast({
      title: "Export Successful", 
      description: "Contact submissions exported as JSON file"
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setSubmissions(prev => prev.filter(sub => sub.id !== id));
      toast({
        title: "Deleted",
        description: "Contact submission deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting submission:', error);
      toast({
        title: "Error",
        description: "Failed to delete submission",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const stats = [
    { 
      title: 'Total Submissions', 
      count: submissions.length.toString(), 
      icon: FileText, 
      color: 'bg-blue-500' 
    },
    { 
      title: 'Unique Contacts', 
      count: new Set(submissions.map(s => s.email)).size.toString(), 
      icon: Users, 
      color: 'bg-green-500' 
    },
    { 
      title: 'This Month', 
      count: submissions.filter(s => 
        new Date(s.submitted_at).getMonth() === new Date().getMonth()
      ).length.toString(), 
      icon: Calendar, 
      color: 'bg-purple-500' 
    },
    { 
      title: 'Synced to Sheets', 
      count: submissions.filter(s => s.google_sheets_synced).length.toString(), 
      icon: Download, 
      color: 'bg-orange-500' 
    },
  ];

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <RefreshCw className="h-8 w-8 animate-spin text-chocolate" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-chocolate">Contact Submissions</h1>
          <p className="text-gray-600 mt-2">Manage and export contact form submissions</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={handleRefresh} 
            disabled={refreshing}
            variant="outline"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={handleExportCSV} className="bg-green-600 hover:bg-green-700">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button onClick={handleExportJSON} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export JSON
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-chocolate">{stat.count}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-full`}>
                    <stat.icon className="text-white" size={20} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Submissions List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-chocolate">Recent Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            {submissions.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">No contact submissions yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {submissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-chocolate">{submission.name}</h3>
                          <Badge variant={submission.google_sheets_synced ? "default" : "secondary"}>
                            {submission.google_sheets_synced ? "Synced" : "Pending"}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          <strong>Email:</strong> {submission.email}
                          {submission.phone && (
                            <span className="ml-4">
                              <strong>Phone:</strong> {submission.phone}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 mb-2">{submission.message}</p>
                        <p className="text-xs text-gray-500">
                          Submitted: {new Date(submission.submitted_at).toLocaleString()}
                        </p>
                      </div>
                      <Button
                        onClick={() => handleDelete(submission.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminContactSubmissions;