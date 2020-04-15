const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const BlogsController = require('../controller/microblogs');

/**
 * Get top trending blogs. A blog trending is calculated by number of likes / date posted.
 */
router.get('/toptrending', BlogsController.blogpostsGetTopTrending);

/**
 * Like a blog post by the specified id.
 */
router.post('/favorites/', BlogsController.blogpostsAddLike);

/**
 * Get a blog post by the specified id.
 */
router.get('/:blogId', BlogsController.blogpostsGetPost);

/**
 * Get all blog posts.
 */
router.get('/', BlogsController.blogpostsGetAll);

/**
 * Create new blog post.
 */
router.post('/',BlogsController.blogpostsCreateNewBlog);

/**
 * Update blog post by specified id. If the id is not found on db - create new blog post.
 */
router.put('/:blogId', BlogsController.blogpostsUpdateBlog);

/**
 * Update specific fields in blog post by specified id.
 */
router.patch('/:blogId', BlogsController.blogpostsUpdateBlogField);

/**
 * Delete blog post by specified id.
 */
router.delete('/:blogId', BlogsController.blogpostsDeleteBlog);

module.exports = router;