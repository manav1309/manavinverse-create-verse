import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import { Blog, Article, Poem } from '../data/mockData';

interface ContentState {
  blogs: Blog[];
  articles: Article[];
  poems: Poem[];
  loading: boolean;
  
  // Data fetching
  fetchBlogs: () => Promise<void>;
  fetchArticles: () => Promise<void>;
  fetchPoems: () => Promise<void>;
  
  // Blog operations
  createBlog: (blog: Omit<Blog, 'id' | 'date' | 'slug'>) => Promise<void>;
  updateBlog: (id: string, blog: Partial<Blog>) => Promise<void>;
  deleteBlog: (id: string) => Promise<void>;
  
  // Article operations
  createArticle: (article: Omit<Article, 'id' | 'date' | 'slug'>) => Promise<void>;
  updateArticle: (id: string, article: Partial<Article>) => Promise<void>;
  deleteArticle: (id: string) => Promise<void>;
  
  // Poem operations
  createPoem: (poem: Omit<Poem, 'id' | 'date' | 'slug'>) => Promise<void>;
  updatePoem: (id: string, poem: Partial<Poem>) => Promise<void>;
  deletePoem: (id: string) => Promise<void>;
}

const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const useContentStore = create<ContentState>((set, get) => ({
  blogs: [],
  articles: [],
  poems: [],
  loading: false,

  // Data fetching
  fetchBlogs: async () => {
    set({ loading: true });
    try {
      const { data, error } = await (supabase as any)
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      const blogs = data?.map((blog: any) => ({
        id: blog.id,
        title: blog.title,
        excerpt: blog.excerpt,
        content: blog.content,
        image: blog.image || '',
        author: blog.author,
        date: new Date(blog.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        slug: blog.slug
      }));
      
      set({ blogs: blogs || [], loading: false });
    } catch (error) {
      console.error('Error fetching blogs:', error);
      set({ loading: false });
    }
  },

  fetchArticles: async () => {
    set({ loading: true });
    try {
      const { data, error } = await (supabase as any)
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      const articles = data?.map((article: any) => ({
        id: article.id,
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        image: article.image || '',
        author: article.author,
        date: new Date(article.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        slug: article.slug
      }));
      
      set({ articles: articles || [], loading: false });
    } catch (error) {
      console.error('Error fetching articles:', error);
      set({ loading: false });
    }
  },

  fetchPoems: async () => {
    set({ loading: true });
    try {
      const { data, error } = await (supabase as any)
        .from('poems')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      const poems = data?.map((poem: any) => ({
        id: poem.id,
        title: poem.title,
        preview: poem.preview,
        content: poem.content,
        image: poem.image || '',
        date: new Date(poem.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        slug: poem.slug
      }));
      
      set({ poems: poems || [], loading: false });
    } catch (error) {
      console.error('Error fetching poems:', error);
      set({ loading: false });
    }
  },

  // Blog operations
  createBlog: async (blogData) => {
    try {
      const slug = generateSlug(blogData.title);
      const { data, error } = await (supabase as any)
        .from('blogs')
        .insert([{
          title: blogData.title,
          excerpt: blogData.excerpt,
          content: blogData.content,
          image: blogData.image,
          author: blogData.author,
          slug: slug,
          status: 'published'
        }])
        .select()
        .single();

      if (error) throw error;

      const newBlog = {
        id: data.id,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        image: data.image || '',
        author: data.author,
        date: new Date(data.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        slug: data.slug
      };

      set(state => ({ blogs: [newBlog, ...state.blogs] }));
    } catch (error) {
      console.error('Error creating blog:', error);
      throw error;
    }
  },

  updateBlog: async (id, blogData) => {
    try {
      const updateData: any = { ...blogData };
      if (blogData.title) {
        updateData.slug = generateSlug(blogData.title);
      }

      const { data, error } = await (supabase as any)
        .from('blogs')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      const updatedBlog = {
        id: data.id,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        image: data.image || '',
        author: data.author,
        date: new Date(data.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        slug: data.slug
      };

      set(state => ({
        blogs: state.blogs.map(blog => blog.id === id ? updatedBlog : blog)
      }));
    } catch (error) {
      console.error('Error updating blog:', error);
      throw error;
    }
  },

  deleteBlog: async (id) => {
    try {
      const { error } = await (supabase as any)
        .from('blogs')
        .delete()
        .eq('id', id);

      if (error) throw error;

      set(state => ({
        blogs: state.blogs.filter(blog => blog.id !== id)
      }));
    } catch (error) {
      console.error('Error deleting blog:', error);
      throw error;
    }
  },

  // Article operations
  createArticle: async (articleData) => {
    try {
      const slug = generateSlug(articleData.title);
      const { data, error } = await (supabase as any)
        .from('articles')
        .insert([{
          title: articleData.title,
          excerpt: articleData.excerpt,
          content: articleData.content,
          image: articleData.image,
          author: articleData.author,
          slug: slug,
          status: 'published'
        }])
        .select()
        .single();

      if (error) throw error;

      const newArticle = {
        id: data.id,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        image: data.image || '',
        author: data.author,
        date: new Date(data.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        slug: data.slug
      };

      set(state => ({ articles: [newArticle, ...state.articles] }));
    } catch (error) {
      console.error('Error creating article:', error);
      throw error;
    }
  },

  updateArticle: async (id, articleData) => {
    try {
      const updateData: any = { ...articleData };
      if (articleData.title) {
        updateData.slug = generateSlug(articleData.title);
      }

      const { data, error } = await (supabase as any)
        .from('articles')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      const updatedArticle = {
        id: data.id,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        image: data.image || '',
        author: data.author,
        date: new Date(data.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        slug: data.slug
      };

      set(state => ({
        articles: state.articles.map(article => article.id === id ? updatedArticle : article)
      }));
    } catch (error) {
      console.error('Error updating article:', error);
      throw error;
    }
  },

  deleteArticle: async (id) => {
    try {
      const { error } = await (supabase as any)
        .from('articles')
        .delete()
        .eq('id', id);

      if (error) throw error;

      set(state => ({
        articles: state.articles.filter(article => article.id !== id)
      }));
    } catch (error) {
      console.error('Error deleting article:', error);
      throw error;
    }
  },

  // Poem operations
  createPoem: async (poemData) => {
    try {
      const slug = generateSlug(poemData.title);
      const { data, error } = await (supabase as any)
        .from('poems')
        .insert([{
          title: poemData.title,
          preview: poemData.preview,
          content: poemData.content,
          image: poemData.image,
          slug: slug
        }])
        .select()
        .single();

      if (error) throw error;

      const newPoem = {
        id: data.id,
        title: data.title,
        preview: data.preview,
        content: data.content,
        image: data.image || '',
        date: new Date(data.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        slug: data.slug
      };

      set(state => ({ poems: [newPoem, ...state.poems] }));
    } catch (error) {
      console.error('Error creating poem:', error);
      throw error;
    }
  },

  updatePoem: async (id, poemData) => {
    try {
      const updateData: any = { ...poemData };
      if (poemData.title) {
        updateData.slug = generateSlug(poemData.title);
      }

      const { data, error } = await (supabase as any)
        .from('poems')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      const updatedPoem = {
        id: data.id,
        title: data.title,
        preview: data.preview,
        content: data.content,
        image: data.image || '',
        date: new Date(data.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        slug: data.slug
      };

      set(state => ({
        poems: state.poems.map(poem => poem.id === id ? updatedPoem : poem)
      }));
    } catch (error) {
      console.error('Error updating poem:', error);
      throw error;
    }
  },

  deletePoem: async (id) => {
    try {
      const { error } = await (supabase as any)
        .from('poems')
        .delete()
        .eq('id', id);

      if (error) throw error;

      set(state => ({
        poems: state.poems.filter(poem => poem.id !== id)
      }));
    } catch (error) {
      console.error('Error deleting poem:', error);
      throw error;
    }
  }
}));