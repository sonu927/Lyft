import express from "express";
import path from "path";
import { Post } from "../models/postModel.js";
import { Comment } from "../models/commentModel.js";
const router = express.Router();

//Create New Post
router.post("/add", (req, res) => {
  Post.create({
    caption: req.body.caption,
    user: req.body.user,
  })
    .then((createdPost) => {
      createdPost.populate("user");
      createdPost.save();
      return res.status(200).json({
        success: true,
        message: "New Post Added",
        post: createdPost,
      });
    })

    .catch((error) => {
      console.log(`Error in post creation: ${error}`);
      return res.status(401).json({
        success: false,
        message: "Internal server error",
      });
    });
});

//To get all the posts
router.get("/all", async (req, res) => {
  try {
    // Use the find method to fetch all posts
    const posts = await Post.find()
      .populate("user")
      .populate({
        path: "comments",
        populate: { path: "user" }, // Populate the 'user' field inside 'comments'
      })
      .sort({ createdAt: -1 });

    // Send the posts as a JSON response
    res.status(200).json({
      success: true,
      message: "All posts are fetched",
      posts: posts,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetching the posts",
    });
  }
});

//Like the Post
router.post("/like", async (req, res) => {
  try {
    const post = await Post.findById(req.body.postId);
    if (post.likes.includes(req.body.user._id)) {
      post.likes = post.likes.filter((item) => item === req.body.user);
      post.save();
      return res.status(200).json({
        success: true,
        message: "Unliked Post",
        post: post,
      });
    } else {
      post.likes.push(req.body.user);
      post.save();
      return res.status(200).json({
        success: true,
        message: "Liked Post",
        post: post,
      });
    }
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({
      success: false,
      message: "Error in liking the post",
    });
  }
});

//Add comment to post
router.post("/comment", async (req, res) => {
  try {
    const post = await Post.findById(req.body.postId);
    const comment = await Comment.create({
      context: req.body.comment,
      user: req.body.user,
    });

    post.comments.push(comment);
    post.save();

    return res.status(200).json({
      success: true,
      message: "Comment Added",
      comment: comment,
    });
  } catch (error) {
    console.error("Error in adding comment to post:", error);
    res.status(500).json({
      success: false,
      message: "Error in  adding comment to post",
    });
  }
});

export default router;
