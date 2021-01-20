const bcrypt = require('bcrypt');
const passport = require('passport');
const { User, Home } = require('../models');

exports.getMyInfo = async (req, res, next) => {
  try {
    if (req.user) {
      const userInfo = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['password'],
        },
      });
      res.status(200).json(userInfo);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.signUp = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const user = await User.create({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    });
    await Home.create({
      coverImage: '',
      introduction: '',
      instagram: '',
      youtube: '',
      website: '',
      UserId: user.id,
    });
    res.status(201).send('ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.checkUserExist = async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (exUser) {
      return res.send(true);
    }
    res.send(false);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).json({ message: info.reason });
    }
    return req.login(user, async (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      const userInfo = await User.findOne({
        where: { id: user.id },
        attributes: ['id', 'username', 'email'],
      });
      return res.status(200).json(userInfo);
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout();
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
};
