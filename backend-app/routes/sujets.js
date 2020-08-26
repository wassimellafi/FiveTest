const express = require('express');
const router = express.Router();
const Sujet = require('../models/sujet');
const mongoose = require('mongoose');


router.get('/', (req, res, next) => {
    Sujet.find().select('titre description').exec()
        .then((documents) => {
            res.status(200).json({
                sujets: documents,
                count: documents.length
            })
        }).catch((error) => {
            res.status(500).json({
                error: err
            });
        })
})

router.get('/:id', (req, res, next) => {
    const sujet_id = req.params.id;
    Sujet.findById(sujet_id).select('titre description').exec()
        .then((doc) => {
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    error: "Not Valid Entry Found for this provided ID."
                });
            }
        }).catch((err) => {
            res.status(500).json({
                error: err
            });
        })
})

router.post('/', (req, res, next) => {
    const sujet = new Sujet({
        _id: new mongoose.Types.ObjectId(),
        titre: req.body.titre,
        description: req.body.description,
        createdBy: req.body.createdBy
    })

    sujet.save().then((result) => {
        res.status(201).json({
            message: 'Subject was created!',
            data: result
        });
    }).catch((err) => {
        res.status(500).json({
            error: err
        });
    })
})

router.patch('/:id', (req, res, next) => {
    const sujet_id = req.params.id;
    const requestBody = req.body;
    Sujet.update({_id: sujet_id}, {$set: requestBody}).exec()
        .then(result => {
            res.status(200).json({
                message: `Subject ${sujet_id} was updated!`,
                product: requestBody
            })
        }).catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

router.delete('/:id', (req, res, next) => {
    const sujet_id = req.params.id;
    Sujet.remove({_id: sujet_id}).exec()
        .then(result => {
            if (result.deletedCount !== 0) {
                res.status(200).json({
                    message: `Subject ${sujet_id} was deleted!`,
                    res: result
                })
            } else {
                res.status(404).json({
                    error: "Not Valid Entry Found for this provided ID."
                });
            }
        }).catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

module.exports = router;