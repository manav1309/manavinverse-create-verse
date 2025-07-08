
export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    id: string;
    avatar: string;
    bio: string;
  };
  thumbnail: string;
  type: 'blog' | 'article' | 'poem';
  date: string;
  tags: string[];
  summary?: string;
}

export interface Poem {
  id: string;
  title: string;
  preview: string;
  content: string;
  backgroundImage: string;
  date: string;
}

export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'The Art of Storytelling in Digital Age',
    excerpt: 'Exploring how traditional narratives evolve in our interconnected world, where every voice can find its audience through the power of digital platforms.',
    content: `In an era where technology shapes every aspect of our lives, storytelling has undergone a remarkable transformation. The digital age has democratized the art of narrative, allowing voices from every corner of the world to reach audiences previously unimaginable.

## The Evolution of Narrative

Traditional storytelling relied on physical presence, oral traditions, and later, printed media. Today, we have multimedia platforms that combine text, audio, video, and interactive elements to create immersive experiences.

### Key Changes in Modern Storytelling:

- **Accessibility**: Anyone with an internet connection can share their story
- **Interactivity**: Readers can engage directly with creators
- **Multimedia Integration**: Stories can incorporate various media types
- **Global Reach**: Local stories can achieve international recognition

The beauty of digital storytelling lies not just in its reach, but in its ability to preserve the human element while leveraging technology's power.

## The Human Connection

Despite all technological advances, the core of storytelling remains unchanged: the human desire to connect, share experiences, and find meaning in our collective journey.

Stories continue to serve as bridges between cultures, generations, and perspectives, reminding us of our shared humanity in an increasingly digital world.`,
    author: {
      name: 'Manav',
      id: '@manavinverse',
      avatar: '/placeholder.svg',
      bio: 'Digital storyteller and content creator passionate about exploring the intersection of technology and human narratives.'
    },
    thumbnail: '/placeholder.svg',
    type: 'blog',
    date: '2024-01-15',
    tags: ['storytelling', 'digital', 'technology'],
    summary: 'An exploration of how storytelling has evolved in the digital age, examining the democratization of narrative and the enduring importance of human connection in our technological world.'
  },
  {
    id: '2',
    title: 'Mindfulness in Modern Life',
    excerpt: 'A deep dive into practical mindfulness techniques that can transform your daily routine and bring peace to the chaos of contemporary living.',
    content: `In our fast-paced world, mindfulness has emerged as a crucial skill for maintaining mental health and finding balance. This practice, rooted in ancient wisdom, offers practical solutions for modern challenges.

## Understanding Mindfulness

Mindfulness is the practice of being fully present in the moment, aware of where we are and what we're doing, without being overwhelmed by what's happening around us.

### Benefits of Regular Practice:

- **Reduced Stress**: Lower cortisol levels and improved stress response
- **Better Focus**: Enhanced concentration and cognitive function
- **Emotional Regulation**: Greater ability to manage difficult emotions
- **Improved Relationships**: Better communication and empathy

## Practical Techniques

### Morning Mindfulness Routine
Start your day with 10 minutes of mindful breathing. Focus on the sensation of breath entering and leaving your body.

### Mindful Eating
During meals, pay attention to flavors, textures, and the act of nourishing your body.

### Walking Meditation
Transform your daily walk into a mindfulness practice by focusing on each step and your surroundings.

The key is consistency rather than perfection. Even a few minutes daily can create significant positive changes in your life.`,
    author: {
      name: 'Manav',
      id: '@manavinverse',
      avatar: '/placeholder.svg',
      bio: 'Wellness advocate and mindfulness practitioner sharing insights for balanced living.'
    },
    thumbnail: '/placeholder.svg',
    type: 'article',
    date: '2024-01-10',
    tags: ['mindfulness', 'wellness', 'mental-health'],
    summary: 'A comprehensive guide to incorporating mindfulness into daily life, featuring practical techniques and scientific benefits for stress reduction and improved well-being.'
  },
  {
    id: '3',
    title: 'Creative Writing in the Information Age',
    excerpt: 'How writers navigate the abundance of information available today while maintaining their unique voice and creative authenticity.',
    content: `The information age presents both unprecedented opportunities and unique challenges for creative writers. With access to vast resources and global audiences, writers must learn to filter noise while amplifying their authentic voice.

## The Information Paradox

Never before have writers had access to such extensive research materials, inspiration sources, and publishing platforms. Yet this abundance can also lead to overwhelm and creative paralysis.

### Navigating Information Overload:

- **Selective Consumption**: Choose quality over quantity in your reading
- **Purposeful Research**: Research with specific goals in mind
- **Digital Detox**: Regular breaks from information consumption
- **Note-Taking Systems**: Organize insights for future reference

## Maintaining Authenticity

In a world saturated with content, authenticity becomes your greatest differentiator.

### Strategies for Authentic Writing:

1. **Personal Experience**: Draw from your unique life experiences
2. **Distinctive Voice**: Develop a writing style that reflects your personality
3. **Honest Emotion**: Don't shy away from vulnerability in your work
4. **Original Perspectives**: Find fresh angles on familiar topics

## The Future of Creative Writing

As AI and automation reshape many industries, creative writing remains fundamentally human. The future belongs to writers who can blend technological tools with genuine human insight and emotion.

Remember: Information is abundant, but wisdom and authentic human experience remain rare and valuable.`,
    author: {
      name: 'Manav',
      id: '@manavinverse',
      avatar: '/placeholder.svg',
      bio: 'Author and writing coach helping creatives find their authentic voice in the digital landscape.'
    },
    thumbnail: '/placeholder.svg',
    type: 'article',
    date: '2024-01-05',
    tags: ['writing', 'creativity', 'authenticity'],
    summary: 'An examination of how modern writers can leverage information abundance while maintaining creative authenticity and developing their unique voice in a crowded digital landscape.'
  }
];

export const mockPoems: Poem[] = [
  {
    id: '1',
    title: 'Whispers of Dawn',
    preview: 'In the gentle light of morning\'s first breath, silence speaks louder than words...',
    content: `In the gentle light of morning's first breath,
Silence speaks louder than words,
Each ray of sun a whispered promise,
That darkness always yields to light.

The world awakens slowly, tenderly,
Like a lover's gentle touch,
And in this sacred moment,
Between night and day,
I find myself
Complete.

Birds begin their symphony,
A chorus of hope and renewal,
While dewdrops catch the golden light,
Each one a universe entire.

This is the hour of possibility,
When dreams and reality dance,
And the heart remembers
What the mind forgot:
We are more than our fears,
Brighter than our shadows,
And capable of infinite love.

In the whispers of dawn,
I hear my name
Called softly by the morning,
Reminding me that today
Is a gift,
And I am here
To receive it.`,
    backgroundImage: '/placeholder.svg',
    date: '2024-01-20'
  },
  {
    id: '2',
    title: 'Digital Solitude',
    preview: 'In rooms full of screens and empty of souls, we search for connection in the glow...',
    content: `In rooms full of screens and empty of souls,
We search for connection in the glow,
Scrolling through lives we'll never touch,
Hearts beating in digital silence.

The notification's chime
Has replaced the doorbell's song,
And emojis stand where
Facial expressions once lived.

Yet beneath the surface
Of this electric ocean,
Real hearts still beat
With ancient rhythms,
Yearning for the warmth
Of genuine presence.

Sometimes I close my eyes
And remember
The weight of a handwritten letter,
The anticipation of waiting,
The joy of real surprise.

In this world of instant everything,
We've forgotten the beauty
Of patient becoming,
The sweetness of earning
What we desire.

But perhaps this too
Is just another chapter
In humanity's long story
Of learning to love
Across distance,
Through time,
Despite the obstacles
We create for ourselves.

And maybe, just maybe,
These glowing rectangles
Are simply new windows
Through which
The same eternal light
Continues to shine.`,
    backgroundImage: '/placeholder.svg',
    date: '2024-01-18'
  },
  {
    id: '3',
    title: 'The Writer\'s Garden',
    preview: 'Words grow like wildflowers in the mind\'s fertile soil, each thought a seed waiting...',
    content: `Words grow like wildflowers
In the mind's fertile soil,
Each thought a seed waiting
For the right season to bloom.

I tend this garden carefully,
Watering ideas with attention,
Pruning sentences with precision,
Allowing metaphors to climb
Toward the light of understanding.

Some days the harvest is abundant,
Phrases flowing like mountain streams,
Images cascading in vivid color,
Stories ripening on the vine
Of imagination.

Other days, drought comes,
And I must trust
That beneath the surface,
Roots are growing deeper,
Preparing for the next
Creative spring.

The blank page is my greenhouse,
Where tender seedlings of thought
Are protected from
The harsh wind of criticism
Until they're strong enough
To stand on their own.

Each word I plant
Carries within it
The potential for forests,
For entire ecosystems
Of meaning and beauty.

And when readers come
To walk through
This garden of language,
They bring their own seeds,
Their own interpretations,
Creating new growth
From what I've sown.

This is the miracle
Of the written word:
It multiplies in the reading,
Becomes more than
It ever was
In the writing.

In my writer's garden,
Every season is possible
At once,
And every reader
Is a gardener too.`,
    backgroundImage: '/placeholder.svg',
    date: '2024-01-12'
  }
];

export const authorInfo = {
  name: 'Manav',
  bio: 'A passionate writer and digital storyteller exploring the depths of human experience through words. With a background in literature and technology, Manav creates content that bridges the ancient art of storytelling with modern digital platforms.',
  image: '/placeholder.svg',
  experience: [
    'Digital Content Creator for 5+ years',
    'Published author of contemporary fiction',
    'Speaker at literary conferences',
    'Mentor for emerging writers'
  ],
  achievements: [
    'Featured in Top 50 Digital Writers 2023',
    'Winner of the Modern Narrative Award',
    'Guest lecturer at creative writing workshops',
    'Over 100K readers across all platforms'
  ]
};
