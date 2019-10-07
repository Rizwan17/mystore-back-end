const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');
const Category = require('../models/category');


router.post('/create', (req, res, next) => {

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        slug: req.body.slug,
        price: req.body.price,
        stock: req.body.stock,
        description: req.body.description,
        productPic: req.body.productPic,
        keyword: req.body.keyword,
        category: req.body.category,
        createdBy: req.body.createdBy
    });

    product.save()
    .then(product => {
        res.status(201).json({
            message: product
        });
    })
    .catch(er => {
        res.status(500).json({
            error: er
        });
    })

});

router.get('/', (req, res, next) => {

    Product.find({})
    .select('_id name price productPic slug')
    .exec()
    .then(products => {
        res.status(200).json({
            message: products
        });
    })
    .catch(er => {
        res.status(500).json({
            error: er
        });
    })

});



router.get('/:categorySlug', (req, res, next) => {
    
    const slug = req.params.categorySlug;
    Category.findOne({slug: slug})
    .select('_id')
    .exec()
    .then(category => {
        if(category){

            Product.find({category: category._id})
            .select('_id name price productPic category slug')
            .exec()
            .then(products => {
                res.status(200).json({
                    message: products
                })
            })
            .catch(error => {
                return res.status(404).json({
                    message: error
                })
            })

        }else{
            return res.status(404).json({
                message: 'Not Found'
            })
        }
    })
    .catch(er => {
        res.status(500).json({
            error: er
        });
    });
});

router.get('/:categorySlug/:productSlug', (req, res, next) => {

    const productSlug = req.params.productSlug;
    
    Product.findOne({slug: productSlug})
    .exec()
    .then(product => {
        if(product){
            res.status(200).json({
                message: product
            });
        }else{
            return res.status(404).json({
                message: 'Not Found'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });


});

module.exports = router;