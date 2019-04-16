const Article = require('../models/Article');
const User = require('../models/User');
const fs = require('fs');
const cloudinary = require('cloudinary');

module.exports = {
  addArticle: (req, res, next) => {
    let { text, title, claps, description } = req.body;
    if (req.files.image) {
      cloudinary.uploader.upload(
        req.files.image.path,
        result => {
          let obj = {
            text,
            title,
            claps,
            description,
            feature_img: result.url !== null ? result.url : ''
          };
          saveArticle(obj);
        },
        {
          resource_type: 'image',
          eager: [{ effect: 'sepia' }]
        }
      );
    } else {
      saveArticle({ text, title, claps, description, feature_img: '' });
    }

    function saveArticle(obj) {
      new Article(obj).save((err, article) => {
        if (err) {
          res.send(err);
        } else if (!article) {
          res.send(400);
        } else {
          return article.addAuthor(req.body.author_id).then(_article => {
            req.send(_article);
          });
        }
      });
    }
  }
};
