const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Airbus",
    email: "philippe@dolphin.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Walmart",
    email: "aidan@dolphin.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Lufthanza",
    email: "alan@dolphin.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

module.exports = users;
