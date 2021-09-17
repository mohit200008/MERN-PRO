const Product = require('../models/product')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')

exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
        .populate("category")
        .exec((err, product) => {
            if (err || !user) {
                res.status(400).json({
                    error: "Product could not be found,please check"
                })
            }

            req.product = product
            next();
        });
};

exports.createProduct = (req,res) => {
   let form = new formidable.IncomingForm();
   form.keepExtensions = true;

   form.parse(req,(err,fields,file)=> {
       if(err){
           return res.status(403).json({
               error: "problem with Image"
           });
       }

       const {name,description,price,category,stock} = fields;

       if(
           !name || 
           !description ||
           !price || 
           !category ||
           !stock 
       ) {
           return res.status(403).json({
               error: "Some fields are missing, Please Check"
           });
       }

       let product = new Product(fields)

       if(file.photo){
           if(file.photo.size > 3000000){
               return res.status(403).json({
                   error: "File size too big"
               })
           }

           product.photo.path = fs.readFileSync(file.photo.path)
           product.photo.contentType = file.photo.type

       }

       product.save((err,product) => {
           if(err){
               res.status(403).json({
                   error: "This product cannot be saved"
               })
           }
           res.json(product)
       })
   })
}