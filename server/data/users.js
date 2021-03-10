const bcrypt = require('bcryptjs')

const users = [
  {
    name: 'Philippe from Dolphin Team',
    email: 'philippe@dolphin.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Aidan from Dolphin Team',
    email: 'aidan@dolphin.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Alan from Dolphin Team',
    email: 'alan@dolphin.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

module.exports = users
