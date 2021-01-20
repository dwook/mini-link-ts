const { User, Home } = require('../models');
const axios = require('axios');
const Vibrant = require('node-vibrant');

exports.getHome = async (req, res, next) => {
  try {
    console.log('유저네임', req.params.username);
    const user = await User.findOne({
      where: {
        username: req.params.username,
      },
    });
    console.log('유저아이디', user.id);
    const home = await Home.findOne({
      where: {
        UserId: user.id,
      },
    });
    res.status(200).json(home);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.editHome = async (req, res, next) => {
  try {
    const editedHome = {
      introduction: req.body.introduction,
      instagram: req.body.instagram,
      youtube: req.body.youtube,
      website: req.body.website,
    };
    if (req.file) {
      const bufferImage = (
        await axios({ url: req.file.location, responseType: 'arraybuffer' })
      ).data;
      const palette = await Vibrant.from(bufferImage).getPalette();
      const mainColor = palette.LightVibrant.getHex();
      editedHome.mainColor = mainColor;
      editedHome.coverImage = req.file.location;
    }
    await Home.update(editedHome, {
      where: {
        UserId: req.user.id,
      },
    });
    res.status(200).json({ UserId: parseInt(req.user.id, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
