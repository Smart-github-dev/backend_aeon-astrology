const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");

db.notify = require("./notification.model");
db.chat = require("./chat.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
