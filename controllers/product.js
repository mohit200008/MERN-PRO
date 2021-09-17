const Product = require('../models/product')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs');

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

exports.getProduct = (req,res) => {
    req.product.photo = undefined
    return res.json(req.product)
}


exports.photo = (req,res,next) => {
    if(req.product.photo.data) {
        res.set("Content-Type" , req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }

    next();
}


exports.deleteProduct = (req,res) => {
    let product = req.product;
    product.remove((err,deletedProduct) => {
        if(err) {
            return res.satus(400).json({
                error: "Failed to delete the product from the DB"
            })
        }

        res.json({
            message: "The product has been successfully deleted",
            deletedProduct
        });
    });
};


exports.updateProduct = (req,res) => {
    let form = new formidable.IncomingForm();
   form.keepExtensions = true;

   form.parse(req,(err,fields,file)=> {
       if(err){
           return res.status(403).json({
               error: "problem with Image"
           });
       }

       

       let product = req.product;
       product= _.extend(product,fields)

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
                   error: "This product data cannot be updated"
               })
           }
           res.json(product)
       })
   })
}

exports.getAllProducts = (req,res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

    Product.find()
       .select("-photo")
       .populate("category")
       .sort([[ sortBy,"asc"]])
       .limit(limit)
       .exec((err,products) => {
           if(err) {
               return res.status(400).json({
                   error:"Cannot get all products"
               })
           }
           res.json(products);
       })
}

exports.updateStock = (req,res,next) => {
    let myOperations = req.body.order.products.map(prod => {
        return {
            updateOne : {
                filter : { _id: prod.id},
                update: {$inc : {stock: -prod.count, sold: +prod.count}}
            }
        }
    })

    Product.bulkWrite(myOperations, {}, (err,products) => {
        if(err) {
            return res.status(400).json({
                error: "Bulk Operation failed"
            })
        }
        next();
    })
}

exports.getAllUniqueCategories = (req,res) => {
    Product.distinct("category",{}, (err,category) => {
        if(err) {
            return res.status(400).json({
                error: "Cannot fetch categories"
            })
        }

        res.json(category)
    })
}