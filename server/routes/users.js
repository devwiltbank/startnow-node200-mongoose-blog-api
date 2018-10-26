const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.get('/', (req, res) => {
    User    
        .find()
        .then(users => {
            res.status(200).json(users);
        });
});

router.get('/:id', (req, res) => {
    User    
        .findById(req.params.id)
        .then(users => (users ? (res.status(200).json(users)) : res.status(404).send('Not Found')))
});

router.post('/', (req, res) => {
    let newUser = new User(req.body)
    newUser    
        .save()
        .then(users => {
            res.status(201).json(users);
        });
});

router.put('/:id', (req, res) => {
    User    
        .findOneAndUpdate(req.params.id)
        .then(users => ( !users ? (res.status(404).send('Not Found')) : res.status(204).json(users))
        );
    
});

router.delete('/:id', (req, res) => {
   User
        .findByIdAndRemove(req.params.id)
        .then(users => {
            if (!users) res.status(404).send();
                res.status(200).json(users);
        
        }).catch(err => res.status(500).send("baddelete"))

   
   
    // const userId = req.params.id;
    // User    
    //     .findOneAndDelete(userId, (err, deletedUser) => {
    //         if (deletedUser) {
    //             res.status(200).json(deletedUser);
    //         } else {
    //             console.log(err);
    //             res.status(404).send(`404 Error: User #${userId} not found`);
    //         }
    //     });
});


module.exports = router;
