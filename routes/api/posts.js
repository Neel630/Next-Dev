const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

//@route        POST api/posts
//@desc         Create Post
//@access       Private

router.post(
  '/',
  [auth, [check('text', 'Text cannot be empty').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (error) {
      res.status(500).send('Server Error');
    }
  }
);

//@route        GET api/posts
//@desc         Get all public post
//@access       Private

router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

//@route        GET api/posts/:post_id
//@desc         Get all post by ID
//@access       Private

router.get('/:post_id', auth, async (req, res) => {
  try {
    const posts = await Post.findById(req.params.post_id);

    if (!posts) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(posts);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

//@route        DELETE api/posts/:post_id
//@desc         Delete Post by ID
//@access       Private

router.delete('/:post_id', auth, async (req, res) => {
  try {
    const posts = await Post.findById(req.params.post_id);

    if (!posts) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    //Check if user owns the post
    if (posts.user.toString() !== req.user.id) {
      return res.status(401).send('User Not Authorized');
    }

    await posts.remove();

    res.json({ msg: 'Post Deleted' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

//@route        PUT api/posts/like/:post_id
//@desc         Like Post by ID
//@access       Private

router.put('/like/:post_id', auth, async (req, res) => {
  try {
    const posts = await Post.findById(req.params.post_id);

    if (!posts) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    //Check if post is already been liked
    if (
      posts.likes.filter((like) => like.user.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    posts.likes.unshift({ user: req.user.id });

    await posts.save();

    res.json(posts.likes);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

//@route        PUT api/posts/unlike/:post_id
//@desc         UnLike Post by ID
//@access       Private

router.put('/unlike/:post_id', auth, async (req, res) => {
  try {
    const posts = await Post.findById(req.params.post_id);

    if (!posts) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    //Check if post is already been liked
    if (
      posts.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Post has not liked yet' });
    }

    //Get remove index

    const removeIndex = posts.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    posts.likes.splice(removeIndex, 1);

    await posts.save();

    res.json(posts.likes);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

//@route        POST api/posts/comment/:post_id
//@desc         Add Comment
//@access       Private

router.post(
  '/comment/:post_id',
  [auth, [check('text', 'Text cannot be empty').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const post = await Post.findById(req.params.post_id);

      const newComment = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      post.comments.unshift(newComment);
      await post.save();

      res.json(post.comments);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }
);

//@route        DELETE api/posts/comment/:post_id/:comment_id
//@desc         Delete Comment
//@access       Private
router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    //Find the comment

    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    //If comment exist or not
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    //Get remove index
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
