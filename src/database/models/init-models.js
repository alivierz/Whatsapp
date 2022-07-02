var DataTypes = require("sequelize").DataTypes;
var _conversations = require("./conversations");
var _message = require("./message");
var _participants = require("./participants");
var _users = require("./users");

const Sequelize = require('sequelize');
require('dotenv').config()
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config');

const configObj = config[env]

let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[configObj.use_env_variable], configObj);
// }
if (config.use_env_variable) {
  sequelize = new Sequelize('postgres://pixodpejhbyxgr:20c647f3c80cfb849269571287ca2ed4b71312c9f6422b14fea2b7df46a189af@ec2-34-198-186-145.compute-1.amazonaws.com:5432/dqu4uhoc4drh4', configObj);
}
else {
  sequelize = new Sequelize(configObj.database, configObj.username, configObj.password, configObj);
}

function initModels() {
  var conversations = _conversations(sequelize, DataTypes);
  var message = _message(sequelize, DataTypes);
  var participants = _participants(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  message.belongsTo(conversations, { as: "consersation", foreignKey: "consersation_id"});
  conversations.hasMany(message, { as: "messages", foreignKey: "consersation_id"});
  participants.belongsTo(conversations, { as: "conversation", foreignKey: "conversation_id"});
  conversations.hasMany(participants, { as: "participants", foreignKey: "conversation_id"});
  conversations.belongsTo(users, { as: "created_by_user", foreignKey: "created_by"});
  users.hasMany(conversations, { as: "conversations", foreignKey: "created_by"});
  message.belongsTo(users, { as: "sender", foreignKey: "sender_id"});
  users.hasMany(message, { as: "messages", foreignKey: "sender_id"});
  participants.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(participants, { as: "participants", foreignKey: "user_id"});

  return {
    conversations,
    message,
    participants,
    users,
  };
}

module.exports.initModels = initModels;
module.exports.sequelize = sequelize;
