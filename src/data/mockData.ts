
export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  slug: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  slug: string;
}

export interface Poem {
  id: string;
  title: string;
  preview: string;
  content: string;
  image: string;
  date: string;
  slug: string;
}

export const blogs: Blog[] = [
  {
    id: '1',
    title: 'The Art of Digital Storytelling',
    excerpt: 'Exploring how technology shapes modern narratives and creative expression in our interconnected world.',
    content: 'Digital storytelling has revolutionized how we share experiences and connect with audiences...',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68e2c6f44d?w=800&h=400&fit=crop',
    author: 'Manav',
    date: 'March 15, 2024',
    slug: 'art-of-digital-storytelling'
  },
  {
    id: '2',
    title: 'Mindfulness in the Modern Age',
    excerpt: 'Finding peace and clarity in our fast-paced digital world through mindful practices.',
    content: 'In our hyperconnected world, finding moments of stillness becomes increasingly important...',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
    author: 'Manav',
    date: 'March 10, 2024',
    slug: 'mindfulness-modern-age'
  },
  {
    id: '3',
    title: 'The Future of Creative Expression',
    excerpt: 'How emerging technologies are reshaping artistic boundaries and creative possibilities.',
    content: 'Creative expression continues to evolve with new technologies and platforms...',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=400&fit=crop',
    author: 'Manav',
    date: 'March 5, 2024',
    slug: 'future-creative-expression'
  }
];

export const articles: Article[] = [
  {
    id: '1',
    title: 'Understanding Human Connection',
    excerpt: 'Deep insights into building meaningful relationships in both digital and physical spaces.',
    content: 'Human connection remains fundamental to our well-being, regardless of the medium through which we connect...',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=400&fit=crop',
    author: 'Manav',
    date: 'March 12, 2024',
    slug: 'understanding-human-connection'
  },
  {
    id: '2',
    title: 'The Philosophy of Growth',
    excerpt: 'Exploring personal development through philosophical lenses and practical wisdom.',
    content: 'Growth is not merely about accumulating knowledge or skills, but about developing wisdom...',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop',
    author: 'Manav',
    date: 'March 8, 2024',
    slug: 'philosophy-of-growth'
  },
  {
    id: '3',
    title: 'Creativity and Innovation',
    excerpt: 'The intersection of creative thinking and innovative problem-solving in modern contexts.',
    content: 'Innovation emerges at the crossroads of creativity, necessity, and opportunity...',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=400&fit=crop',
    author: 'Manav',
    date: 'March 3, 2024',
    slug: 'creativity-and-innovation'
  }
];

export const poems: Poem[] = [
  {
    id: '1',
    title: 'Whispers of Dawn',
    preview: 'Morning light breaks through darkness...\nA symphony of hope begins...',
    content: `Morning light breaks through darkness,
A symphony of hope begins,
Where shadows once held their ground,
Now golden rays dance and spin.

The world awakens slowly,
Birds sing their ancient song,
In this moment of pure beauty,
Nothing can go wrong.`,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    date: 'March 14, 2024',
    slug: 'whispers-of-dawn'
  },
  {
    id: '2',
    title: 'Digital Dreams',
    preview: 'In screens we find reflection...\nOf souls seeking connection...',
    content: `In screens we find reflection,
Of souls seeking connection,
Through pixels and through code,
We travel every road.

The virtual becomes real,
When hearts begin to feel,
That distance cannot sever,
Bonds that last forever.`,
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop',
    date: 'March 9, 2024',
    slug: 'digital-dreams'
  },
  {
    id: '3',
    title: 'The Quiet Mind',
    preview: 'In stillness, wisdom speaks...\nThrough silence, truth we seek...',
    content: `In stillness, wisdom speaks,
Through silence, truth we seek,
The noise of world grows dim,
When peace flows from within.

A quiet mind can see,
What busy thoughts conceal,
In moments of pure being,
The soul begins to heal.`,
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
    date: 'March 6, 2024',
    slug: 'the-quiet-mind'
  }
];

// Author information
export const authorInfo = {
  name: 'Manav Puri',
  image: '/lovable-uploads/390e7104-ca6f-438c-b925-a2c214c1ed0c.png',
  bio: "Hi, I'm Manav Puri — a writer, performer, and community storyteller. With over 2 years of experience in content writing across university projects, international collaborations, and a tech startup, I bring words to life through 2100+ poems, 4 stage plays, and stories that spark connection. Whether leading India's largest university theatre festival as Promotion Head, performing spoken word on 30+ stages, or interviewing top dignitaries as an independent journalist, I write to connect, express, and inspire.",
  experience: [
    "Content Writer for Chitkara University's Entrepreneurship Cell & Global Department",
    'Web content and social media writer at assistive-tech startup (4 months)',
    "Promotion Head of Rangrezz'24 – managed 75-day campaign, led hospitality & logistics",
    'Performed 2100+ poems and 4 stage plays across 30+ events and festivals',
    'Independent journalist at DU Lit Fest 2025 – interviewed dignitaries, covered events',
    'Organized and promoted 15+ cultural events, including open-mics and street plays'
  ],
  achievements: [
    'Performed live poetry at Laugh Club Chandigarh and alongside RJ Shanky',
    "Led outreach that secured 60% of national participation for Rangrezz'24",
    'Represented university in North Zone AIU Youth Festival (Debate)',
    'Built community through 3 street-play campaigns and 2 flash mobs',
    'Interviewed prominent public figures including Smt. Smriti Irani and EU MPs'
  ]
};

// Mock posts for compatibility with existing pages
export const mockPosts = [
  { ...blogs[0], type: 'blog' as const, thumbnail: blogs[0].image, author: { id: '@manav', name: 'Manav', avatar: authorInfo.image }, tags: ['storytelling', 'digital', 'creativity'], summary: 'An exploration of how digital platforms are changing the way we tell stories.' },
  { ...articles[0], type: 'article' as const, thumbnail: articles[0].image, author: { id: '@manav', name: 'Manav', avatar: authorInfo.image }, tags: ['connection', 'relationships', 'digital'], summary: 'Deep insights into building meaningful relationships in our modern world.' },
  { ...blogs[1], type: 'blog' as const, thumbnail: blogs[1].image, author: { id: '@manav', name: 'Manav', avatar: authorInfo.image }, tags: ['mindfulness', 'peace', 'wellness'], summary: 'Finding peace and clarity in our fast-paced digital world.' },
  { ...articles[1], type: 'article' as const, thumbnail: articles[1].image, author: { id: '@manav', name: 'Manav', avatar: authorInfo.image }, tags: ['growth', 'philosophy', 'wisdom'], summary: 'Exploring personal development through philosophical lenses.' },
  { ...blogs[2], type: 'blog' as const, thumbnail: blogs[2].image, author: { id: '@manav', name: 'Manav', avatar: authorInfo.image }, tags: ['creativity', 'future', 'technology'], summary: 'How emerging technologies are reshaping artistic boundaries.' }
];

// Mock poems for compatibility with existing pages
export const mockPoems = [
  { ...poems[0], backgroundImage: poems[0].image },
  { ...poems[1], backgroundImage: poems[1].image },
  { ...poems[2], backgroundImage: poems[2].image }
];

// Combined posts for featured content
export const featuredPosts = [
  { ...blogs[0], type: 'blog' as const },
  { ...articles[0], type: 'article' as const },
  { ...poems[0], type: 'poem' as const },
  { ...blogs[1], type: 'blog' as const },
  { ...articles[1], type: 'article' as const }
];
