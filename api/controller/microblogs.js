const mongoose = require('mongoose');
const BlogPost = require('../models/blogPost');

exports.blogpostsGetTopTrending = (req, res, next) => {
    BlogPost.find()
        .select('_id author title content datePosted likes')
        .exec()
        .then(blogPosts => {
            //sort the trending by number of likes / when the post was created, if the result is equal - sort by dates
            blogPosts.sort((blogPost1, blogPost2) => {
                var rank1 = blogPost1.likes / ((Date.now() - blogPost1.datePosted) / 1000);
                var rank2 = blogPost2.likes / ((Date.now() - blogPost2.datePosted) / 1000);
                return rank1 !== rank2 ? rank2 - rank1 : blogPost2.datePosted - blogPost1.datePosted;
            })

            res.status(200).json({
                length: blogPosts.length,
                topTrending: blogPosts.map(blogPost => {
                    return buildBlogPostObject(blogPost);
                })
            })
        })
        .catch(err => {
            next(err);
        });

};

exports.blogpostsGetPost = (req, res, next) => {
    const blogId = req.params.blogId;
    BlogPost.findById(blogId)
        .exec()
        .then(blogPost => {
            if (blogPost) {
                res.status(200).json({
                    blogPost: buildBlogPostObject(blogPost)
                });
            } else {
                res.status(404).json({
                    message: 'No valid entry found for this blog id'
                });
            }
        })
        .catch(err => {
            next(err);
        });
};

exports.blogpostsAddLike = (req, res, next) => {
    const blogId = req.query.blogId;
    BlogPost.findById(blogId)
        .then(blogPost => {
            if (blogPost === null) {
                return res.status(404).json({
                    message: 'No valid entry found for this blog id'
                });
            }
            blogPost.likes++;
            return BlogPost.findOneAndUpdate({ _id: blogPost._id }, 
                { likes: blogPost.likes }, 
                { useFindAndModify: false, new: true })
                .exec()
                .then(result => {
                    res.status(200).json(buildBlogPostResponse(result, 'You have successfully liked this post'))
                })
        })
        .catch(err => {
            next(err);
        });
};

exports.blogpostsGetAll = (req, res, next) => {
    BlogPost.find()
        .sort('-datePosted')
        .exec()
        .then(blogPosts => {
            const response = {
                count: blogPosts.length,
                blogPosts: blogPosts.map(blogPost => { return buildBlogPostObject(blogPost) })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            next(err);
        });
};

exports.blogpostsCreateNewBlog = (req, res, next) => {
    const blogPost = new BlogPost({
        _id: new mongoose.Types.ObjectId(),
        author: req.body.author,
        title: req.body.title,
        content: req.body.content,
        datePosted: Date(Date.now()),
        likes: 0
    });

    blogPost
        .save()
        .then(result => {
            res.status(201).json(
                buildBlogPostResponse(result, 'You have successfully added blog post')
            );
        })
        .catch(err => {
            next(err);
        });
};

exports.blogpostsUpdateBlog = (req, res, next) => {
    const blogId = req.params.blogId;

    if (!req.body.author || !req.body.title || !req.body.content) {
        return res.status(400).json({
            message: 'Invalid input'
        });
    }

    BlogPost.findById(blogId)
        .then(blogPost => {
            if (blogPost === null) {
                return this.blogpostsCreateNewBlog(req, res, next);
            } else {
                return BlogPost.findOneAndUpdate({ _id: blogId }, {
                    author: req.body.author,
                    title: req.body.title,
                    content: req.body.content}, 
                    { useFindAndModify: false, new: true })
                    .exec()
                    .then(result => {
                        res.status(200).json(buildBlogPostResponse(result, 'You have successfully updated blog post'))
                    })
            }
        })
        .catch(err => {
            next(err);
        });

};

exports.blogpostsUpdateBlogField = (req, res, next) => {
    const blogId = req.params.blogId;
    const updateOptions = {};

    for (const option of Object.keys(req.body)) {
        if ((option === 'author' || option === 'title' || option === 'content') && (req.body[option] !== null)) {
            updateOptions[option] = req.body[option];
        }
    };

    if (Object.keys(updateOptions).length === 0) {
        return res.status(400).json({
            message: 'Invalid input'
        });
    }

    BlogPost.findById(blogId)
        .then(blogPost => {
            if (blogPost === null) {
                return res.status(404).json({
                    message: 'No valid entry found for this blog id'
                })
            } else {
                return BlogPost.findOneAndUpdate({ _id: blogId }, 
                    updateOptions, 
                    { useFindAndModify: false, new: true })
                    .exec()
                    .then(result => {
                        res.status(200).json(buildBlogPostResponse(result, 'You have successfully updated blog post'))
                    })
            }
        })
        .catch(err => {
            next(err);
        });
};

exports.blogpostsDeleteBlog = (req, res, next) => {
    const blogId = req.params.blogId;
    BlogPost.findByIdAndDelete(blogId)
        .exec()
        .then(result => {
            if (result === null) {
                res.status(404).json({
                    message: 'No valid entry found for this blog id'
                })
            } else {
                res.status(200).json({
                    message: 'You have successfully deleted blog post'
                });
            }
        })
        .catch(err => {
            next(err);
        });

};

/**
 * Build a json response object with a message and blog post.
 * @param {BlogPost} blogPost - the blog post object. 
 * @param {String} message - the string for message.
 */
function buildBlogPostResponse(blogPost, message) {
    return {
        message: message,
        blogPost: buildBlogPostObject(blogPost)
    };
}

/**
 * Builds a json object for blog post.
 * @param {BlogPost} blogPost 
 */
function buildBlogPostObject(blogPost) {
    return {
        _id: blogPost._id,
        author: blogPost.author,
        title: blogPost.title,
        content: blogPost.content,
        datePosted: blogPost.datePosted,
        likes: blogPost.likes
    }
}