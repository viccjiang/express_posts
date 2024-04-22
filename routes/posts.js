var express = require('express');
var router = express.Router();

const Post = require("../models/postsModel");

const handleSuccess = require('../handleSuccess');
const handleError = require('../handleError');

router.get('/', async function (req, res, next) {
  const post = await Post.find();
  handleSuccess(res, post);
});

router.post('/', async function (req, res, next) {
  try {
    const { body } = req;
    if (body.content !== undefined) {
      const newPost = await Post.create(
        {
          name: body.name,
          content: body.content
        }
      );
      handleSuccess(res, newPost);

    } else {
      handleError(res);
    }
  } catch (err) {
    handleError(res, err);
  }
});

// router.delete 刪除單筆
router.delete('/:id', async function (req, res, next) {
  const post = await Post.findByIdAndDelete(req.params.id);
  try {
    handleSuccess(res, null);
  } catch (err) {
    handleError(res, err);
  }
});

// router.delete 刪除全部
router.delete('/', async function (req, res, next) {
  await Post.deleteMany({});
  handleSuccess(res, null);
});

// router.patch 修改單筆
router.patch('/:id', async function (req, res, next) {
  try {
    const { body } = req;

    const id = req.params.id

    if (id !== undefined && body.content !== undefined) {
      const post = await Post.findByIdAndUpdate( id,
        {
          name: body.name,
          content: body.content,
        },
        { 
          new: true,
          runValidators: true 
        }
      );
      handleSuccess(res, post);
    }else{
      handleError(res);
    }
  } catch (err) {
    handleError(res, err);
  }
}
);

// router options
router.options('/', async function (req, res, next) {
  res.status(200).send({
    status: "success",
    message: "options"
  })
});

// router 404
router.all('*', async function (req, res, next) {
  res.status(404).send({
    status: "fail",
    message: "無此網站路由"
  })
});

module.exports = router;
