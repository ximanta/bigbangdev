const generateRandomContent = (length) => {
  const words = [
    "Lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do",
    "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "Ut",
    "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi",
    "ut", "aliquip", "ex", "ea", "commodo", "consequat", "Duis", "aute", "irure", "dolor",
    "in", "reprehenderit", "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat",
    "nulla", "pariatur", "Excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "in",
    "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"
  ];
  let content = '';
  for (let i = 0; i < length; i++) {
    content += words[Math.floor(Math.random() * words.length)] + ' ';
  }
  return content.trim() + '.';
};

const mockPosts = [
  {
    id: '1',
    title: 'Getting Started with SimpleBlog',
    author: 'Admin',
    date: '2023-10-26',
    excerpt: generateRandomContent(20),
    content: `<h3>Welcome to SimpleBlog!</h3>
<p>This is your very first blog post. SimpleBlog is designed to be a straightforward platform for sharing your thoughts and ideas. We've focused on creating a clean, intuitive interface for both creating and consuming content.</p>
<p>You can use this platform to write about anything you like: technology, personal experiences, tutorials, or just daily musings. The goal is to make publishing as easy as possible so you can focus on what matters most: your content.</p>
<p>Stay tuned for more updates and features in the future, but for now, enjoy the simplicity of sharing your voice with the world!</p>`
  },
  {
    id: '2',
    title: 'The Joys of Minimalist Web Development',
    author: 'Jane Doe',
    date: '2023-10-25',
    excerpt: generateRandomContent(25),
    content: `<p>In an age where web applications are becoming increasingly complex, there's a growing appreciation for minimalist web development. This approach emphasizes simplicity, performance, and a clear focus on core functionality, often leading to a better user experience.</p>
<p>By stripping away unnecessary features and dependencies, developers can create lighter, faster, and more maintainable applications. This not only benefits the end-user with quicker load times and less clutter but also streamlines the development process itself.</p>
<p>SimpleBlog is a prime example of this philosophy in action. It prioritizes core blogging features without the bloat, making it an efficient tool for content creators.</p>`
  },
  {
    id: '3',
    title: 'A Look into the Future of Blogging Platforms',
    author: 'John Smith',
    date: '2023-10-24',
    excerpt: generateRandomContent(18),
    content: `<p>The landscape of blogging platforms is constantly evolving. From early personal websites to modern content management systems, the tools available to writers have come a long way. What does the future hold?</p>
<p>We might see more integration with AI for content generation and optimization, enhanced personalization for readers, and even more streamlined publishing workflows. The emphasis will likely remain on making it easier for anyone to share their story.</p>
<p>Decentralized blogging platforms are also gaining traction, promising greater control and ownership for creators over their content. It's an exciting time to be a blogger!</p>`
  }
];

export const getPosts = () => {
  // In a real app, this would fetch from an API
  // For now, we'll return a deep copy to prevent direct modification
  return JSON.parse(JSON.stringify(mockPosts));
};

export const addPost = (newPost) => {
  // In a real app, this would send to an API
  const posts = JSON.parse(localStorage.getItem('blogPosts') || JSON.stringify(mockPosts));
  posts.unshift(newPost);
  localStorage.setItem('blogPosts', JSON.stringify(posts));
};

// Initialize localStorage with mock posts if not already present
if (!localStorage.getItem('blogPosts')) {
  localStorage.setItem('blogPosts', JSON.stringify(mockPosts));
}
