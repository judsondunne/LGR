import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();
  const [selectedButton, setSelectedButton] = useState('featured');

  // Handle button selection
  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <div style={styles.container}>
      {/* Logo Container */}
      <div style={styles.logoContainer}>
        <img src="https://firebasestorage.googleapis.com/v0/b/learn-32d72.appspot.com/o/LGRLogo.jpeg?alt=media&token=edd61e82-4f2f-4a64-9e94-a40a92a39f18" alt="Logo" style={styles.logo} /> {/* Replace with your logo */}
      </div>
{/* 
      <nav style={styles.navbar}>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link 
              to="/" 
              style={{ 
                ...styles.link, 
                ...(location.pathname === '/' ? styles.activeLink : {}) 
              }}
            >
              Home
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link 
              to="/create" 
              style={{ 
                ...styles.link, 
                ...(location.pathname === '/create' ? styles.activeLink : {}) 
              }}
            >
              Create Post
            </Link>
          </li>
        </ul>
      </nav> */}

      {/* Featured and Other buttons below */}
      <div style={styles.buttonContainer}>
        <button
          onClick={() => handleButtonClick('featured')}
          style={{
            ...styles.button,
            ...(selectedButton === 'featured' ? styles.selectedButton : {}),
          }}
        >
          Featured
        </button>
        <button
          onClick={() => handleButtonClick('other')}
          style={{
            ...styles.button,
            ...(selectedButton === 'other' ? styles.selectedButton : {}),
          }}
        >
          Other
        </button>
      </div>

      {/* Bottom grey line */}
      <div style={styles.bottomLine}></div>
    </div>
  );
}

// Inline styles for a modern black & white look with animated buttons
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff', // White background for the whole nav
    padding: '20px 0',
  },
  logoContainer: {
    marginBottom: '-10px',
    textAlign: 'center',
  },
  logo: {
    maxWidth: '300px', // Adjust this based on your logo size
    height: 'auto',
  },
  navbar: {
    backgroundColor: '#fff', // White navbar background
    padding: '10px 0',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end', // Align navbar links to the right
   transform: 'translateY(-200)', // Moves the navbar completely to the left

  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'flex-end', // Align navbar items to the right
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: '0 20px',
  },
  link: {
    color: '#000', // Black color for links
    textDecoration: 'none', // Remove the underline
    fontSize: '18px',
    fontWeight: '500', // Slightly bolder text for a modern feel
    transition: 'all 0.3s ease',
  },
  activeLink: {
    fontWeight: '700', // Bold active links
    color: '#000', // Black for active links
  },
  buttonContainer: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'center',
    gap: '20px', // Space between buttons
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#fff',
    color: '#000',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    borderRadius: '5px', // Slight border radius
    border: 'none', // Remove border
    transition: 'all 0.3s ease', // Smooth transition for hover and active states
  },
  selectedButton: {
    backgroundColor: '#000', // Black background for selected button
    color: '#fff', // White text for selected button
    transform: 'scale(1.1)', // Slight zoom effect when selected
  },
  bottomLine: {
    width: '90%', // Make the line 90% of the width
    height: '2px',
    backgroundColor: '#ddd', // Light grey color for the line
    marginTop: '20px',
  },
};

export default Navigation;
