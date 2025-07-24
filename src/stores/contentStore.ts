import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import { Blog, Article, Poem } from '../data/mockData';

interface Genre {
  id: string;
  name: string;
  description: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

interface ContentState {
  blogs: Blog[];
  articles: Article[];
  poems: Poem[];
  genres: Genre[];
  loading: boolean;
  
  // Data fetching
  fetchBlogs: () => Promise<void>;
  fetchArticles: () => Promise<void>;
  fetchPoems: () => Promise<void>;
  fetchGenres: () => Promise<void>;
  fetchContentByGenre: (genreId: string, contentType: 'blogs' | 'articles' | 'poems') => Promise<any[]>;
  
  // Blog operations
  createBlog: (blog: Omit<Blog, 'id' | 'date' | 'slug'>, genreIds?: string[]) => Promise<void>;
  updateBlog: (id: string, blog: Partial<Blog>, genreIds?: string[]) => Promise<void>;
  deleteBlog: (id: string) => Promise<void>;
  
  // Article operations
  createArticle: (article: Omit<Article, 'id' | 'date' | 'slug'>, genreIds?: string[]) => Promise<void>;
  updateArticle: (id: string, article: Partial<Article>, genreIds?: string[]) => Promise<void>;
  deleteArticle: (id: string) => Promise<void>;
  
  // Poem operations
  createPoem: (poem: Omit<Poem, 'id' | 'date' | 'slug'>, genreIds?: string[]) => Promise<void>;
  updatePoem: (id: string, poem: Partial<Poem>, genreIds?: string[]) => Promise<void>;
  deletePoem: (id: string) => Promise<void>;
}

const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const useContentStore = create<ContentState>((set, get) => ({
  blogs: [],
  articles: [],
  poems: [],
  genres: [],
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

  fetchGenres: async () => {
    try {
      const { data, error } = await supabase
        .from('genres')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      set({ genres: data || [] });
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  },

  fetchContentByGenre: async (genreId: string, contentType: 'blogs' | 'articles' | 'poems') => {
    try {
      if (contentType === 'blogs') {
        const { data, error } = await supabase
          .from('blog_genres')
          .select('blogs (*)')
          .eq('genre_id', genreId);
        if (error) throw error;
        return data?.map(item => item.blogs) || [];
      } else if (contentType === 'articles') {
        const { data, error } = await supabase
          .from('article_genres')
          .select('articles (*)')
          .eq('genre_id', genreId);
        if (error) throw error;
        return data?.map(item => item.articles) || [];
      } else if (contentType === 'poems') {
        const { data, error } = await supabase
          .from('poem_genres')
          .select('poems (*)')
          .eq('genre_id', genreId);
        if (error) throw error;
        return data?.map(item => item.poems) || [];
      }
      return [];
    } catch (error) {
      console.error('Error fetching content by genre:', error);
      return [];
    }
  },

  // Blog operations
  createBlog: async (blogData, genreIds) => {
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

      // Assign genres if provided
      if (genreIds && genreIds.length > 0) {
        const genreAssignments = genreIds.map(genreId => ({
          blog_id: data.id,
          genre_id: genreId
        }));

        const { error: genreError } = await supabase
          .from('blog_genres')
          .insert(genreAssignments);

        if (genreError) throw genreError;
      }

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

  updateBlog: async (id, blogData, genreIds) => {
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

      // Update genre assignments if provided
      if (genreIds !== undefined) {
        // Delete existing assignments
        await supabase
          .from('blog_genres')
          .delete()
          .eq('blog_id', id);

        // Add new assignments
        if (genreIds.length > 0) {
          const genreAssignments = genreIds.map(genreId => ({
            blog_id: id,
            genre_id: genreId
          }));

          const { error: genreError } = await supabase
            .from('blog_genres')
            .insert(genreAssignments);

          if (genreError) throw genreError;
        }
      }

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
  createArticle: async (articleData, genreIds) => {
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

      // Assign genres if provided
      if (genreIds && genreIds.length > 0) {
        const genreAssignments = genreIds.map(genreId => ({
          article_id: data.id,
          genre_id: genreId
        }));

        const { error: genreError } = await supabase
          .from('article_genres')
          .insert(genreAssignments);

        if (genreError) throw genreError;
      }

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

  updateArticle: async (id, articleData, genreIds) => {
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

      // Update genre assignments if provided
      if (genreIds !== undefined) {
        // Delete existing assignments
        await supabase
          .from('article_genres')
          .delete()
          .eq('article_id', id);

        // Add new assignments
        if (genreIds.length > 0) {
          const genreAssignments = genreIds.map(genreId => ({
            article_id: id,
            genre_id: genreId
          }));

          const { error: genreError } = await supabase
            .from('article_genres')
            .insert(genreAssignments);

          if (genreError) throw genreError;
        }
      }

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
  createPoem: async (poemData, genreIds) => {
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

      // Assign genres if provided
      if (genreIds && genreIds.length > 0) {
        const genreAssignments = genreIds.map(genreId => ({
          poem_id: data.id,
          genre_id: genreId
        }));

        const { error: genreError } = await supabase
          .from('poem_genres')
          .insert(genreAssignments);

        if (genreError) throw genreError;
      }

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

  updatePoem: async (id, poemData, genreIds) => {
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

      // Update genre assignments if provided
      if (genreIds !== undefined) {
        // Delete existing assignments
        await supabase
          .from('poem_genres')
          .delete()
          .eq('poem_id', id);

        // Add new assignments
        if (genreIds.length > 0) {
          const genreAssignments = genreIds.map(genreId => ({
            poem_id: id,
            genre_id: genreId
          }));

          const { error: genreError } = await supabase
            .from('poem_genres')
            .insert(genreAssignments);

          if (genreError) throw genreError;
        }
      }

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