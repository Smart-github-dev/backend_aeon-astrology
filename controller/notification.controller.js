const db = require("../models");

const Notify = db.notify;
const User = db.user;

const getNotify = async (req, res) => {
  const { userId } = req.body;
  try {
    const result = await Notify.find({
      permissions: { $in: [userId, "all"] },
      read: { $nin: [userId] },
    });
    var data = [];
    for (var i = 0; i < result.length; i++) {
      var notification = {};
      if (result[i].title == "friend request") {
        var user = await User.findById(result[i].content);
        notification = {
          _id: result[i]._id,
          title: result[i].title,
          receiver: user.username,
          content: result[i].content,
          createdAt: result[i].createdAt,
        };
      } else {
        notification = result[i];
      }

      data.push(notification);
    }
    res.send({ success: true, data: data });
  } catch (error) {
    res.status(400).send({ message: error, success: false });
  }
};

const readOne = async (req, res) => {
  try {
    const { notifyId, userId } = req.body;

    var result = await Notify.findById(notifyId);

    result.read.push(userId);
    await result.save();
    res.send({ success: true });
  } catch (error) {
    res.status(400).send({ message: error, success: false });
  }
};

const pushNotify = async (req, res) => {
  try {
    const newNotify = new Notify(req.body);
    const result = await newNotify.save();

    res.send({ success: true });
  } catch (error) {
    res.status(400).send({ message: error, success: false });
  }
};

const removeNotify = (req, res) => {};

const updateNotify = (req, res) => {};

module.exports = {
  getNotify,
  readOne,
  pushNotify,
  removeNotify,
  updateNotify,
};
