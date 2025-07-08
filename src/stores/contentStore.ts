
import { create } from 'zustand';
import { Blog, Article, Poem } from '../data/mockData';
import { blogs as initialBlogs, articles as initialArticles, poems as initialPoems } from '../data/mockData';

interface ContentState {
  blogs: Blog[];
  articles: Article[];
  poems: Poem[];
  
  // Blog operations
  createBlog: (blog: Omit<Blog, 'id' | 'date' | 'slug'>) => void;
  updateBlog: (id: string, blog: Partial<Blog>) => void;
  deleteBlog: (id: string) => void;
  
  // Article operations
  createArticle: (article: Omit<Article, 'id' | 'date' | 'slug'>) => void;
  updateArticle: (id: string, article: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  
  // Poem operations
  createPoem: (poem: Omit<Poem, 'id' | 'date' | 'slug'>) => void;
  updatePoem: (id: string, poem: Partial<Poem>) => void;
  deletePoem: (id: string) => void;
}

const generateId = () => Date.now().toString();
const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const getCurrentDate = () => new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export const useContentStore = create<ContentState>((set) => ({
  blogs: initialBlogs,
  articles: initialArticles,
  poems: initialPoems,
  
  // Blog operations
  createBlog: (blogData) => set((state) => ({
    blogs: [...state.blogs, {
      ...blogData,
      id: generateId(),
      date: getCurrentDate(),
      slug: generateSlug(blogData.title)
    }]
  })),
  
  updateBlog: (id, blogData) => set((state) => ({
    blogs: state.blogs.map(blog => 
      blog.id === id 
        ? { ...blog, ...blogData, slug: blogData.title ? generateSlug(blogData.title) : blog.slug }
        : blog
    )
  })),
  
  deleteBlog: (id) => set((state) => ({
    blogs: state.blogs.filter(blog => blog.id !== id)
  })),
  
  // Article operations
  createArticle: (articleData) => set((state) => ({
    articles: [...state.articles, {
      ...articleData,
      id: generateId(),
      date: getCurrentDate(),
      slug: generateSlug(articleData.title)
    }]
  })),
  
  updateArticle: (id, articleData) => set((state) => ({
    articles: state.articles.map(article => 
      article.id === id 
        ? { ...article, ...articleData, slug: articleData.title ? generateSlug(articleData.title) : article.slug }
        : article
    )
  })),
  
  deleteArticle: (id) => set((state) => ({
    articles: state.articles.filter(article => article.id !== id)
  })),
  
  // Poem operations
  createPoem: (poemData) => set((state) => ({
    poems: [...state.poems, {
      ...poemData,
      id: generateId(),
      date: getCurrentDate(),
      slug: generateSlug(poemData.title)
    }]
  })),
  
  updatePoem: (id, poemData) => set((state) => ({
    poems: state.poems.map(poem => 
      poem.id === id 
        ? { ...poem, ...poemData, slug: poemData.title ? generateSlug(poemData.title) : poem.slug }
        : poem
    )
  })),
  
  deletePoem: (id) => set((state) => ({
    poems: state.poems.filter(poem => poem.id !== id)
  }))
}));
