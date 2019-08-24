const Category = require('../models/category');

exports.createCatogory = (req, res, next) => {
    const post = new Category({
        name: req.body.name
    });
    post.save()
        .then(createdCategory => {
            res.status(201).json({
                message: 'success',
                categoryId: createdCategory._id
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Creating a catrgory failed.'
            })
        });
}

exports.getCategories = (req, res, next) => {
    Category.find()
    .then((documents) => {
        res.status(200).json({
            message: 'success',
            data: documents
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "Could not get categories."
        });
    });
}

exports.deleteCategory = (req, res, next) => {
    Category.remove({ _id: req.params.id })
    .then(() => {
        res.status(200).json({
            message: 'success'
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "Could not delete category."
        });
    });;
}

exports.updateCategory = (req, res, next) => {
    Category.findOne({_id: req.params.id})
        .then((document) => {
            if(!document) {
                res.status(404).json({
                    message: 'Category does not exist.'
                });
            } else {
                document.name = req.body.name;
                document.save()
                .then(() => {
                    res.status(200).json({
                        message: 'success',
                        data: document
                    });
                })
                .catch(error => {
                    res.status(500).send({
                        message: 'Could not save updated category.'
                    });
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Could not update category.'
            });
        });
}