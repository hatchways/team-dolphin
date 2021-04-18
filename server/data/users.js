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
      nyt: false,
    },
    likedMentions: [],
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
      nyt: false,
    },
    likedMentions: [],
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
      nyt: false,
    },
    likedMentions: [],
  },
  {
    activeCompany: "Westjet",
    email: "martherobin1944@gmail.com",
    reportEmail: "martherobin1944@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    companies: ["Westjet"],
    platforms: {
      reddit: true,
      twitter: false,
      nyt: false,
    },
    likedMentions: [],
  },
  {
    activeCompany: "Astrazeneca",
    email: "astra@astra.com",
    reportEmail: "astra@astra.com",
    password: bcrypt.hashSync("123456", 10),
    companies: ["Astrazeneca"],
    platforms: {
      reddit: true,
      twitter: false,
      nyt: false,
    },
    likedMentions: [],
  },
];

module.exports = users;
