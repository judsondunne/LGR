// src/components/Create.jsx

import React, { useState } from 'react';
import { db } from '../firebase'; // Import the Firestore instance
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function Create() {
  // State variables for form inputs
  const [author, setAuthor] = useState('');
  const [photo, setPhoto] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('');

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');

    try {
      // Add a new document with a generated id to the 'posts' collection
      await addDoc(collection(db, "posts"), {
        author: author,
        photo: photo,
        title: title,
        content: content,
        time: serverTimestamp() // Use server timestamp for consistency
      });
      setStatus('Post submitted successfully!');
      // Clear form fields
      setAuthor('');
      setPhoto('');
      setTitle('');
      setContent('');
    } catch (error) {
      console.error("Error adding document: ", error);
      setStatus('Error submitting post. Please try again.');
    }
  };

  return (
    <div className="Create" style={styles.createContainer}>
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="author">Author:</label><br />
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            style={styles.input}
            placeholder="Enter your name"
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="photo">Photo URL:</label><br />
          <input
            type="url"
            id="photo"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            required
            style={styles.input}
            placeholder="Enter photo URL"
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="title">Title:</label><br />
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={styles.input}
            placeholder="Enter post title"
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="content">Content:</label><br />
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="4"
            style={styles.textarea}
            placeholder="Enter post content"
          ></textarea>
        </div>
        <button type="submit" style={styles.button}>Submit</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}

// Inline styles for simplicity
const styles = {
  createContainer: {
    marginTop: '40px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    width: '80%',
    maxWidth: '500px',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  formGroup: {
    marginBottom: '15px'
  },
  input: {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    boxSizing: 'border-box'
  },
  textarea: {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    boxSizing: 'border-box'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#61dafb',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default Create;
