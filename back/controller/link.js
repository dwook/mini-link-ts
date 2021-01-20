const sequelize = require('sequelize');
const { Link, User, Visit } = require('../models');

exports.getLink = async (req, res, next) => {
  try {
    const link = await Link.findOne({
      where: {
        id: req.params.linkId,
        UserId: req.user.id,
      },
    });
    res.status(200).json(link);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.getLinks = async (req, res, next) => {
  try {
    console.log('유저네임', req.query.username);
    console.log('유저쿠키', req.user && req.user.id);
    const user = await User.findOne({
      where: {
        username: req.query.username,
      },
    });
    console.log('유저아이디', req.user && req.user.id, user.id);
    let links;
    if (req.user && req.user.id === user.id && req.query.public !== '1') {
      // 어드민용
      links = await Link.findAll({
        where: {
          UserId: user.id,
        },
        attributes: {
          include: [
            [sequelize.fn('COUNT', sequelize.col('Visits.id')), 'VisitCount'],
          ],
        },
        include: [
          {
            model: Visit,
            attributes: [],
          },
        ],
        group: ['Link.id']
      });
    } else {
      // 공개용
      links = await Link.findAll({
        where: {
          UserId: user.id,
          public: true,
        },
      });
    }
    res.status(200).json(links);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.createLink = async (req, res, next) => {
  try {
    const createdLink = {
      name: req.body.name,
      url: req.body.url,
      public: req.body.public,
      UserId: req.user.id,
    };
    if (req.file) {
      createdLink.image = req.file.location;
    }
    const link = await Link.create(createdLink);
    res.status(200).json(link);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.editLink = async (req, res, next) => {
  try {
    const editedLink = {
      name: req.body.name,
      url: req.body.url,
      public: req.body.public,
    };
    if (req.file) {
      editedLink.image = req.file.location;
    }
    await Link.update(editedLink, {
      where: {
        id: req.params.linkId,
        UserId: req.user.id,
      },
    });
    res.status(200).json({ LinkId: parseInt(req.params.linkId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.deleteLink = async (req, res, next) => {
  try {
    await Link.destroy({
      where: {
        id: req.params.linkId,
        UserId: req.user.id,
      },
    });
    res.status(200).json({ LinkId: parseInt(req.params.linkId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
