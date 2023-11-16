const db = require("../models");
const User = db.user;
const Notify = db.notify;

exports.getContacts = async (req, res) => {
  try {
    const userid = req.query.userid;
    const findUser = await User.findById(userid);

    const users = await User.find({ _id: { $nin: userid } }, [
      "_id",
      "username",
      "email",
    ]);

    res.status(200).send(
      users
        .filter((user) => {
          return (
            findUser.friends.findIndex(
              (f) => f.status == "accepted" && f.userid == user._id
            ) == -1
          );
        })
        .map((user) => {
          return {
            _id: user._id,
            username: user.username,
            email: user.email,
            pending:
              findUser.friends.findIndex((f) => f.userid == user._id) !== -1,
          };
        })
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

exports.getFriends = async (req, res) => {
  try {
    const userid = req.query.userid;
    console.log(req.query);
    const findUser = await User.findById(userid);
    const users = await User.find(
      {
        _id: {
          $in: findUser.friends
            .filter((f) => f.status == "accepted")
            .map((f) => f.userid),
        },
      },
      ["_id", "username", "email"]
    );
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.addRequest = async (req, res) => {
  try {
    const userid = req.body.userid;
    const otherid = req.body.otherid;

    const findUser = await User.findById(userid);
    const otherUser = await User.findById(otherid);

    findUser.friends.push({ userid: otherid, status: "pending" });
    otherUser.friends.push({ userid: userid, status: "pending" });

    const newNotify = new Notify({
      title: "friend request",
      content: userid,
      permissions: otherid,
    });

    await newNotify.save();
    await findUser.save();
    await otherUser.save();
    res.send({ success: true });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

exports.acceptResponse = async (req, res) => {
  try {
    const userid = req.body.userid;
    const otherid = req.body.otherid;
    const notifyId = req.body.notifyId;
    const findUser = await User.findById(userid);
    const otherUser = await User.findById(otherid);
    findUser.friends = findUser.friends.map((f) => {
      if (f.userid == otherid) {
        f.status = "accepted";
      }
      return { ...f };
    });

    otherUser.friends = otherUser.friends.map((f) => {
      if (f.userid == userid) {
        f.status = "accepted";
      }
      return { ...f };
    });
    await findUser.save();
    await otherUser.save();
    var findNotifi = await Notify.findById(notifyId);
    findNotifi.read.push(userid);
    await findNotifi.save();
    res.send({ success: true });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

exports.rejectResponse = async (req, res) => {
  try {
    const userid = req.body.userid;
    const otherid = req.body.otherid;
    const notifyId = req.body.notifyId;

    const findUser = await User.findById(userid);
    const otherUser = await User.findById(otherid);
    findUser.friends = findUser.friends.filter((f) => f.userid !== otherid);
    otherUser.friends = otherUser.friends.filter((f) => f.userid !== userid);

    await findUser.save();
    await otherUser.save();
    var findNotifi = await Notify.findById(notifyId);
    findNotifi.read.push(userid);
    await findNotifi.save();
    res.send({ success: true });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.removeFriend = async (req, res) => {
  try {
    const userid = req.body.userid;
    const otherid = req.body.otherid;
    const findUser = await User.findById(userid);
    const otherUser = await User.findById(otherid);
    findUser.friends = findUser.friends.filter((f) => f.userid !== otherid);
    otherUser.friends = otherUser.friends.filter((f) => f.userid !== userid);
    await findUser.save();
    await otherUser.save();
    res.send({ success: true });
  } catch (error) {
    res.status(400).send(error);
  }
};
