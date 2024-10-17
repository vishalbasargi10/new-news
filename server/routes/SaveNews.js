const express = require('express');
const router = express.Router();
const News = require('../models/newsDB'); // Assuming you have the Article model

// POST request to save a news item
router.post('/save-news', async (req, res) => {
  const { title, description, imageUrl, newsUrl ,source,username} = req.body;

  try {
    // Create a new Article document
    const newArticle = new News({
      title,
      description,
      imageUrl: imageUrl,
      newsUrl: newsUrl,
      source:source,
      username:username
    });

    // Save the document to the database
    await newArticle.save();
    res.status(200).json({ message: 'News saved successfully!' });
  } catch (error) {
    console.error('Error saving news:', error);
    res.status(500).json({ error: 'Failed to save news' });
  }
});

router.get('/get-news', async (req, res) => {
    try {
      // Fetch all news articles from the database
      const newsArticles = await News.find({});
      res.status(200).json(newsArticles); // Send the news data to the frontend
    } catch (error) {
      console.error('Error retrieving news:', error);
      res.status(500).json({ error: 'Failed to retrieve news' });
    }
  });

module.exports = router;

