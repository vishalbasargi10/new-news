import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner'; // Spinner for loading state
import styled from 'styled-components';
import axios from 'axios'; // Axios to fetch data from the backend

// Styled component for NewsBlockContainer
const NewsBlockContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
  flex-wrap: wrap;
  gap: 10px;
  background-color: #f4f4f9;

  @media (max-width: 768px) {
    padding: 10px;
    flex-direction: column;
  }
`;

export default function NewsFromDB() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Get the logged-in user's username from localStorage
  const username = localStorage.getItem('loggedInUser'); // Ensure this matches how you store usernames

  useEffect(() => {
    const fetchNewsFromDB = async () => {
      try {
        const response = await axios.get('http://localhost:8080/get-news');
        setNewsData(response.data); // Assuming the data is an array of news articles
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news from the backend', error);
        setLoading(false); // Stop loading even if there's an error
      }
    };

    fetchNewsFromDB();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <NewsBlockContainer>
      {newsData.map((newsItem) => (
        // Only render the NewsItem if the username matches
        newsItem.username === username ? (
          <NewsItem
            key={newsItem._id} // Assuming MongoDB gives each item a unique _id
            title={newsItem.title}
            description={newsItem.description}
            imageUrl={newsItem.imageUrl}
            newsUrl={newsItem.newsUrl}
            source={newsItem.source}
            username={newsItem.username}
            saved={1} // Pass a prop to indicate that this news item is saved
          />
        ) : null
      ))}
    </NewsBlockContainer>
  );
}
