import React from "react";
import styled from "styled-components";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the styles for toast notifications

// Styled Component for NewsItem
const NewsCard = styled.div`
  border:none;
  box-shadow: 6px 6px 6px 6px rgba(0.2, 0.2, 0.2, 0.2); // Shadow for depth
  overflow: hidden; // Ensure child elements don't overflow
  display: flex; // Flexbox for layout
  flex-direction: column; // Stack content vertically
  height: auto; // Allow height to adjust based on content
  max-width: 400px; // Max width for better control on larger screens
  margin: 10px; // Margin for spacing between cards

  img {
    width: 100%; // Full width image to fill container
    height: 200px; // Increased height for the image
    object-fit: cover; // Ensure image fits nicely
    border-bottom: 2px solid #ddd; // Subtle border for separation
  }

  div {
    padding: 5px; // Add padding inside the card
    display: flex;
    flex-direction: column; // Stack content vertically
    gap: 10px; // Spacing between elements
    flex-grow: 1; // Allow div to grow to fill available space
  }

  h5 {
    font-size: 1.2rem; // Slightly larger heading for titles
    font-weight: 600;
    margin: 0;
    color: #333; // Darker text color for better readability
  }

  p {
    color: #666; // Softer text color
    font-size: 0.95rem;
    margin: 0;
    flex-grow: 1; // Allow paragraph to grow to fill available space
    display: -webkit-box; // Use a box model for the text
    -webkit-box-orient: vertical; // Orient the box vertically
    overflow: hidden; // Hide overflow text
    -webkit-line-clamp: 2; // Limit to 2 lines
    line-clamp: 2; // Limit to 2 lines for non-WebKit browsers
    text-overflow: ellipsis; // Show ellipsis for overflow
  }

  a {
    color: #007bff; // Styled link for "Read more"
    font-weight: bold;
    text-decoration: none;
    border: 1px solid #007bff; // Border for button-like effect
    border-radius: 5px; // Rounded corners for the button
    padding: 10px 15px; // Padding inside the button
    text-align: center; // Center align text
    transition: background-color 0.3s ease; // Smooth background change
    margin-top: auto; // Push the link to the bottom
  }

  a:hover {
    background-color: #007bff; // Change background on hover
    color: white; // Change text color on hover
    text-decoration: none; // No underline on hover
  }

  button {
    background-color: #007bff; // Button background color
    color: white; // Button text color
    border: none; // No border
    border-radius: 5px; // Rounded corners for the button
    padding: 10px 15px; // Padding inside the button
    cursor: pointer; // Pointer cursor on hover
    transition: background-color 0.3s ease; // Smooth background change
  }

  button:hover {
    background-color: #0056b3; // Darker blue on hover
  }

  // Responsive styles
  @media (max-width: 768px) {
    height: auto; // Allow height to be dynamic on smaller screens
    max-width: 100%; // Full width on smaller screens
    margin: 10px 0; // Vertical margin for better spacing
    img {
      height: 150px; // Adjust image height for smaller screens
    }

    h5 {
      font-size: 1rem; // Adjust font size for smaller screens
    }

    p {
      font-size: 0.85rem; // Adjust font size for paragraph on smaller screens
    }
  }
`;

export default function NewsItem({
  title,
  description,
  imageUrl,
  newsUrl,
  source,
  username,
  saved
}) {
  if (!title) {
    return null;
  }

  // Function to handle the save button click
  const saveNews = async () => {
    try {
      // Send a POST request to the backend API to save the news item
      const response = await axios.post('http://localhost:8080/save-news', { 
        title,
        description,
        imageUrl,
        newsUrl,
        source,
        username
      });
      if (response.status === 200) {
        toast.success('News saved successfully!'); // Show success toast
      } else {
        toast.error('Failed to save the news.'); // Show error toast
      }
    } catch (error) {
      console.error('Error saving the news:', error);
      toast.error('An error occurred while saving the news.'); // Show error toast
    }
  };

  return (
    <>
      <NewsCard>
        <img src={imageUrl} alt="News" />
        <div>
          <h5>{title}...</h5>
          <p>{description}</p>
          <a href={newsUrl} target="_blank" rel="noopener noreferrer">
            Read more
          </a>
          {
            saved ? null : <button onClick={saveNews}>Save News</button>
          }
        </div>
      </NewsCard>
      <ToastContainer /> {/* Add ToastContainer to render the toasts */}
    </>
  );
}
