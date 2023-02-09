import Post from "../models/post.js";
import User from "../models/user.js";

//Create

export const createPost = async (req, res) => {
  try {
    const { userId, desc, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      username: user.username,
      desc,
      userPic: user.userPic,
      picturePath,
      likes: {},
      comments: [],
    });

    await newPost.save();

    const post = await Post.find();

    res.status(201).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Read

//Grabing all the posts from everyone

export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Update

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
