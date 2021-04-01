const bcrypt = require("bcryptjs");

const users = [
  {
    activeCompany: "Airbus",
    email: "philippe@newdolphin.com",
    reportEmail: "philippe@newdolphin.com",
    password: bcrypt.hashSync("123456", 10),
    companies: ["Airbus"],
    platforms: {
      reddit: true,
      twitter: false,
      facebook: false,
      amazon: false,
      forbes: false,
      shopify: false,
      businessinsider: false,
    },
  },
  {
    activeCompany: "Walmart",
    email: "aidan@newdolphin.com",
    reportEmail: "aidan@newdolphin.com",
    password: bcrypt.hashSync("123456", 10),
    companies: ["Walmart"],
    platforms: {
      reddit: true,
      twitter: false,
      facebook: false,
      amazon: false,
      forbes: false,
      shopify: false,
      businessinsider: false,
    },
  },
  {
    activeCompany: "Loblaws",
    email: "alan@newdolphin.com",
    reportEmail: "alan@newdolphin.com",
    password: bcrypt.hashSync("123456", 10),
    companies: ["Loblaws"],
    platforms: {
      reddit: true,
      twitter: false,
      facebook: false,
      amazon: false,
      forbes: false,
      shopify: false,
      businessinsider: false,
    },
  },
];

module.exports = users;
