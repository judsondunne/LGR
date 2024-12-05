// src/components/Home.jsx

import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; // Import the Firestore instance
import { collection, getDocs, orderBy, query } from "firebase/firestore";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch posts from Firestore
  const fetchPosts = async () => {
    try {
      // Create a query to order posts by creation date (newest first)
      const q = query(collection(db, "posts"), orderBy("time", "desc"));
      const querySnapshot = await getDocs(q);
      const postsData = [];
      querySnapshot.forEach((doc) => {
        postsData.push({ id: doc.id, ...doc.data() });
      });
      setPosts(postsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts: ", error);
      setLoading(false);
    }
  };

  // Fetch posts when the component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  // Helper function to truncate content
  const truncateContent = (content, maxLength) => {
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + '...';
  };

  return (
    <div className="Home" style={styles.homeContainer}>
      <h2>All Posts</h2>
      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map(post => (
          <div key={post.id} className="Post" style={styles.postContainer}>
            {/* Header Image */}
            {post.photo && (
              <div style={styles.headerImageContainer}>
                <img
                  src={post.photo}
                  alt={`${post.title} photo`}
                  style={styles.headerImage}
                />
              </div>
            )}

            {/* Title */}
            <h3 style={styles.postTitle}>
              <a
                href={`/post/${post.id}`}
                style={styles.postLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {post.title}
              </a>
            </h3>

            {/* Metadata (Author and Time) */}
            <div style={styles.metadata}>
              <small>By {post.author || 'Unknown Author'}</small>
              <small>
                {post.time
                  ? ` | ${new Date(post.time.seconds * 1000).toLocaleString()}`
                  : ' | No date provided'}
              </small>
            </div>

            {/* Content Preview */}
            <p style={styles.postContent}>
              {truncateContent(post.content, 200)}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

// Inline styles for structured wireframe layout
const styles = {
  homeContainer: {
    marginTop: '20px',
    width: '80%',
    maxWidth: '800px',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'left'
  },
  postContainer: {
    borderRadius: '5px',
    marginBottom: '20px',
    overflow: 'hidden' // Removed background color/shadow
  },
  headerImageContainer: {
    width: '100%',
    height: '400px', // Fixed height for landscape layout
    overflow: 'hidden', // Hide overflow to crop the image
    position: 'relative'
  },
  headerImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // Ensure the image covers the container and is cropped
    objectPosition: 'center', // Center the image within the container
  },
  postTitle: {
    margin: '15px 10px',
    fontSize: '30px',
    color: 'black' // Set title color to black
  },
  metadata: {
    margin: '0 10px 10px',
    fontSize: '16px', // Increased font size
    color: '#666'
  },
  postContent: {
    margin: '0 10px 15px',
    fontSize: '14px',
    color: '#333'
  },
  postLink: {
    textDecoration: 'none',
    color: 'inherit' // Inherit color from parent (black)
  }
};

export default Home;
