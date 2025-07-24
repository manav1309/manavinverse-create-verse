
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from '../components/admin/AdminDashboard';
import AdminBlogs from '../components/admin/AdminBlogs';
import AdminArticles from '../components/admin/AdminArticles';
import AdminPoems from '../components/admin/AdminPoems';
import AdminGenres from '../components/admin/AdminGenres';
import AdminContactSubmissions from '../components/admin/AdminContactSubmissions';
import AdminLayout from '../components/admin/AdminLayout';

const Admin = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/blogs" element={<AdminBlogs />} />
        <Route path="/articles" element={<AdminArticles />} />
        <Route path="/poems" element={<AdminPoems />} />
        <Route path="/genres" element={<AdminGenres />} />
        <Route path="/contacts" element={<AdminContactSubmissions />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  );
};

export default Admin;
