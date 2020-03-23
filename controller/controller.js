const express = require('express');
const mongoose = require('mongoose');
const Product = require('../model/product.model');
const assert = require('assert');

module.exports = {

    home: (req, res) => {
        //To Read all the products
        Product.find( (err,data)=>{
            if(err){
                assert.equal(err, null);
            }
            else{
                //Response in JSON
                res.json(data);
            }
        });
    },

    newProduct: (req, res) => {
        //Posting of New Products
        let pro = new Product(req.body);
        pro.save().then(
            response => {
                //res.redirect('/');
                res.status(200).json({ message: 'Product Created'});
            }
        )
        .catch(
            err => {
                res.status(400).json({ message: 'Unable to Save Product'});
            }
        );
    },

    editProduct: (req, res) => {
        //To get Single Product
        const id = req.params.id;
        Product.findById({_id: id}, (err, data) => {
            if(err){
                assert.equal(null, err);
            }else{
                res.json(data);
            }
        });
    },

    updateProduct: (req, res) => {
        //Update existing values
        const id = req.params.id;
        Product.findById({_id: id}, (err, data) => {
            if(err){
                assert.equal(null, err);
            } else 
            {
                if(!data){
                    res.status(400).json({ message: 'No data found'});
                }
                else{
                    data.title = req.body.title;
                    data.image = req.body.image;
                    data.price = req.body.price;               
                    data.category = req.body.category;
                    data.description = req.body.description;
                    data
                        .save()
                        .then(myData => {
                            //res.redirect('/');
                            res.status(200).json({ message: 'Product Updated Successfully'});
                        })
                        .catch(err => {
                            res.status(400).json({ message: 'Unable to Update ProductProduct'});
                        });
                }
            }

        });        
    },

    deleteProduct: (req, res) => {
        let id = req.params.id;
        Product.findByIdAndDelete({_id: id}, (err, data) => {
            if(err){
                assert.equal(null, err);
            }
            else{
                //res.redirect('/');
                res.status(200).json({message: 'Product Deleted'});
            }
        });
    }

};