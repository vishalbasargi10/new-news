import React, { useEffect, useState, useCallback } from "react";
import Spinner from "./Spinner";
import NewsItem from "./NewsItem";
import styled from "styled-components";

// Styled component for NewsBlockContainer
const NewsBlockContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
  flex-wrap: wrap;
  gap: 6px;
  background-color: #f4f4f9;

  @media (max-width: 768px) {
    padding: 10px;
    flex-direction: column; // Stack items in a column on smaller screens
  }
`;

// Styled component for each news block (NewsItemWrapper)
const NewsItemWrapper = styled.div`
  flex: 1 1 32%;
  max-width: 400px;
  margin: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: #fff;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  gap: 15px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    flex: 1 1 100%; // Make it take full width on smaller screens
  }
`;

// Styled component for NewsHeading
const NewsHeading = styled.h2`
  font-size: 36px;
  font-weight: bold;
  color: #ffcc00;
  text-align: center;
  margin: 20px 0;
  background-color: #003366;
  border: 2px solid #0099ff;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }

  @media (max-width: 768px) {
    font-size: 28px; // Adjust font size for smaller screens
    padding: 10px;
  }
`;

const News = (props) => {
  const { saved } = props;

  const username = localStorage.getItem('loggedInUser');
  const { category } = props;
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const updateNews = useCallback(async () => {
    setLoading(true);
    const url = `https://saurav.tech/NewsAPI/top-headlines/category/${category}/in.json`;

    try {
      let response = await fetch(url);
      
      // Check if response is ok
      if (!response.ok) {
        console.error("HTTP error:", response.status, response.statusText);
        setLoading(false);
        return;
      }

      let parsedData = await response.json();
      console.log("Fetched articles:", parsedData.articles);
      
      if (parsedData.articles) {
        setArticles(parsedData.articles);
      } else {
        console.error("No articles found:", parsedData);
        setArticles([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    updateNews();
  }, [category, updateNews]);

  const gizmodoArticles = articles.filter(
    (article) => article.source.name === "CNBCTV18"
  );
  const vergeArticles = articles.filter(
    (article) => article.source.name === "Moneycontrol"
  );
  const BBCArticles = articles.filter(
    (article) => article.source.name === "News18"
  );

  return (
    <>
      {loading && <Spinner />}

      <NewsBlockContainer>
        <NewsItemWrapper>
          <NewsHeading>CNBCTV18</NewsHeading>
          {gizmodoArticles.map((element) => (
            <NewsItem
              key={element.url}
              title={element.title ? element.title.slice(0, 45) : ""}
              description={element.description}
              imageUrl={element.urlToImage}
              newsUrl={element.url}
              author={element.author}
              date={element.publishedAt}
              source={element.source.name}
              username={username}
              saved={saved}
            />
          ))}
        </NewsItemWrapper>
        <NewsItemWrapper>
          <NewsHeading>Moneycontrol</NewsHeading>
          {vergeArticles.map((element) => (
            <NewsItem
              key={element.url}
              title={element.title ? element.title.slice(0, 45) : ""}
              description={element.description}
              imageUrl={element.urlToImage}
              newsUrl={element.url}
              author={element.author}
              date={element.publishedAt}
              source={element.source.name}
              username={username}
              saved={saved}
            />
          ))}
        </NewsItemWrapper>
        <NewsItemWrapper>
          <NewsHeading>News18</NewsHeading>
          {BBCArticles.map((element) => (
            <NewsItem
              key={element.url}
              title={element.title ? element.title.slice(0, 45) : ""}
              description={element.description}
              imageUrl={element.urlToImage}
              newsUrl={element.url}
              author={element.author}
              date={element.publishedAt}
              source={element.source.name}
              username={username}
              saved={saved}
            />
          ))}
        </NewsItemWrapper>
      </NewsBlockContainer>
    </>
  );
};

export default News;
