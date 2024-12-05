// src/components/Display.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase'; // Import the Firestore instance
import { doc, getDoc } from "firebase/firestore";

function Display() {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch post details by ID
  const fetchPost = async () => {
    try {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPost({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.error("No such post!");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching post: ", error);
      setLoading(false);
    }
  };

  // Fetch the post when the component mounts
  useEffect(() => {
    fetchPost();
  }, [id]);

  if (loading) {
    return <p>Loading post...</p>;
  }

  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <div className="Display" style={styles.displayContainer}>
      {/* Display Title */}
      <h2 style={styles.title}>{post.title}</h2>

      {/* Display Photo */}
      {post.photo && (
        <div style={styles.photoContainer}>
          <img src={post.photo} alt={`${post.title} photo`} style={styles.photo} />
        </div>
      )}

      {/* Display Author and Date */}
      <div style={styles.authorSection}>
        <strong>Author:</strong> {post.author}
      </div>
      <div style={styles.timeText}>
        {post.time
          ? new Date(post.time.seconds * 1000).toLocaleString()
          : 'No date provided'}
      </div>

      {/* Display Content */}
      <div style={styles.contentText}>{post.content}</div>
    </div>
  );
}

// Inline styles for simplicity
const styles = {
  displayContainer: {
    marginTop: '20px',
    width: '80%',
    maxWidth: '800px',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'left',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    
  },
  title: {
    fontSize: '2.5rem', // Big and bold title
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center',
  },
  photoContainer: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  photo: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
  },
  authorSection: {
    marginBottom: '10px',
    color: '#555',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  timeText: {
    color: '#777',
    fontSize: '0.9rem',
    marginBottom: '15px',
  },
  contentText: {
    fontSize: '1.1rem',
    color: '#333',
    lineHeight: '1.6',
    marginBottom: '20px'
  },
};

export default Display;
