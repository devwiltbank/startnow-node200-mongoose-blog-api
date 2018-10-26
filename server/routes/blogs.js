const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

router.get('/', (req, res) => {
    Blog    
        .find()
        .then(blogs => {
            res.status(200).json(blogs);
        });
});

router.get('/featured', (req, res) => {
    Blog    
        .where('featured', true)
        .then(blogs => {
            res.status(200).json(blogs);
        }).catch(err => res.status(500).send('bad request'))
});

router.get('/:id', (req, res) => {
    Blog    
        .findById(req.params.id)
        .then(users => (users ? (res.status(200).json(users)) : res.status(404).send('Can\'t find that')))
});

router.post('/', (req, res) => {
    // Both versions of this route do work.
    // let theUser;
    // let newBlog = new Blog(req.body);
    // User
    //     .findById(req.body.author)
    //     .then(user => {
    //         theUser = user;
    //         newBlog.author = user._id;
    //         return newBlog.save();
    //     })
    //     .then(blog => {
    //         theUser.blogs.push(blog);
    //         theUser
    //             .save()
    //             .then(() => res.status(201).send(blog))
    //     });

    
    let dbUser = null;
    User 
        .findById(req.body.author)
        .then(user => {
            dbUser = user;
            const newBlog = new Blog(req.body);
            newBlog.author = user._id;
            return newBlog.save();
        })
        .then(blog => {
            dbUser.blogs.push(blog);
            dbUser.save().then(() => res.status(201).json(blog));
        })
        .catch(err => res.status(500).send());
});

router.put('/:id', (req, res) => {
    Blog    
        .findByIdAndUpdate(req.params.id, {$set: req.body })
        .then(blogs => {
            res.status(204).json(blogs);
        })
        .catch(err => res.status(500).send('Houston, we have a problem'))
});

router.delete('/:id', (req, res) => {
    Blog    
        .findByIdAndDelete(req.params.id)
        .then(blogs => {
            res.status(200).json(blogs);
        })
        .catch(err => res.status(500).send('Houston, we have a problem'))
});

module.exports = router;
