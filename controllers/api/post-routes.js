const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id','title','post_content','createdAt'],
      // order: [[, 'DESC']],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id','createdAt' ],
          include: {
            model: User,
            attributes: ['username'] 
          }
        },
        {
          model: User,
          attributes: ['username']
        },
      ]
    }).then(dbPostData => res.json(dbPostData.reverse()))
      .catch(err => {
       console.log('this is it',err)
        res.status(500).json(err);
      });
  });
  router.get('/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id','title',,'post_content','createdAt'],
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id','createdAt' ],
          include: {
            model: User,
            attributes: ['username']
          }
        }]
    }).then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'Invalid ID' });
          return;
        }
        res.json(dbPostData);
      }).catch(err => {
        res.status(500).json(err);
      });
  });
router.post('/', withAuth, (req, res) => {
    Post.create({
      title: req.body.title,
      post_content: req.body.content,
      user_id: req.session.user_id
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        res.status(500).json(err);
      });
});
router.put('/:id', withAuth, (req, res) => {
    Post.update({
        title: req.body.title,
        post_content: req.body.post_content
      },
      {
        where: {
          id: req.params.id
        }
      }).then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'Invalid ID' });
          return;
        }
        res.json(dbPostData);
      }).catch(err => {
        res.status(500).json(err);
      });
  });
  router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'Invalid ID' });
          return;
        }
        res.json(dbPostData);
      }).catch(err => {
        res.status(500).json(err);
      });
  });

  module.exports = router;