const express = require("express");
const pool = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create Post
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content required" });
    }

    const newPost = await pool.query(
      "INSERT INTO posts (title, content, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, content, userId]
    );

    res.status(201).json(newPost.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all posts with comments
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.id AS post_id,
        p.title,
        p.content,
        p.created_at AS post_created_at,
        u.name AS author_name,
        c.id AS comment_id,
        c.content AS comment_content,
        cu.name AS comment_author,
        c.created_at AS comment_created_at
      FROM posts p
      JOIN users u ON p.user_id = u.id
      LEFT JOIN comments c ON p.id = c.post_id
      LEFT JOIN users cu ON c.user_id = cu.id
      ORDER BY p.created_at DESC;
    `);

    res.json(result.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Add comment to a post
router.post("/:postId/comments", authMiddleware, async (req, res) => {
  try {
    const { content } = req.body;
    const { postId } = req.params;
    const userId = req.user.id;

    if (!content) {
      return res.status(400).json({ message: "Comment content required" });
    }

    // Check if post exists
    const postCheck = await pool.query(
      "SELECT * FROM posts WHERE id = $1",
      [postId]
    );

    if (postCheck.rows.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = await pool.query(
      "INSERT INTO comments (content, user_id, post_id) VALUES ($1, $2, $3) RETURNING *",
      [content, userId, postId]
    );

    res.status(201).json(newComment.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;