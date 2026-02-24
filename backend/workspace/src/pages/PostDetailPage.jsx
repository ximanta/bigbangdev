import React,
       { useState,
         useEffect
       } from 'react';
import { useParams,
         useNavigate
       } from 'react-router-dom';
import { getPosts } from '../data/mockPosts';

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post,
         setPost
        ] = useState(null);

  useEffect(() => {
    const allPosts = JSON.parse(localStorage.getItem('blogPosts') || JSON.stringify(getPosts()));
    const foundPost = allPosts.find(p => p.id === id);
    if (foundPost) {
      setPost(foundPost);
    } else {
      navigate('/'); // Redirect to home if post not found
    }
  },
  [id,
   navigate
  ]);

  if (!post) {
    return (
      <div className="container">
        <p>Loading post or post not found...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="post-detail">
        <h1 className="post-detail-title">{post.title}</h1>
        <p className="post-detail-meta">
          By {post.author} on {post.date}
        </p>
        <div
          className="post-detail-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        >
        </div>
        <button
          onClick={() => navigate('/')}
          className="back-button"
        >
          Back to Blog
        </button>
      </div>
    </div>
  );
};

export default PostDetailPage;
