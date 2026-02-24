import React,
       { useState,
         useContext,
         useEffect
       } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { addPost } from '../data/mockPosts';

const CreatePostPage = () => {
  const [title,
         setTitle
        ] = useState('');
  const [content,
         setContent
        ] = useState('');
  const { user,
          showNotification
        } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      showNotification('You must be logged in to create a post.', 'error');
      navigate('/login');
    }
  },
  [user,
   navigate,
   showNotification
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      showNotification('You must be logged in to create a post.', 'error');
      return;
    }

    if (!title.trim() || !content.trim()) {
      showNotification('Title and content cannot be empty.', 'error');
      return;
    }

    const newPost = {
      id: Date.now().toString(),
      title,
      content,
      author: user.username,
      date: new Date().toLocaleDateString('en-US',
                                           { year: 'numeric',
                                             month: '2-digit',
                                             day: '2-digit'
                                           }).replace(/\//g, '-')
    };

    addPost(newPost);
    showNotification('Post published successfully!', 'success');
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (!user) {
    return null; // Redirect handled by useEffect
  }

  return (
    <div className="container">
      <div className="create-post-container">
        <h2 className="create-post-title">Create New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label
              htmlFor="postTitle"
              className="form-label"
            >
              Post Title
            </label>
            <input
              type="text"
              id="postTitle"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="postContent"
              className="form-label"
            >
              Content
            </label>
            <textarea
              id="postContent"
              className="form-textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              placeholder="Start writing your blog post here... (Note: This is a basic textarea. A full rich text editor would require external libraries, which are out of scope for this demo.)"
            >
            </textarea>
          </div>
          <div className="button-group">
            <button
              type="button"
              onClick={handleCancel}
              className="form-button cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="form-button"
            >
              Publish Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostPage;
