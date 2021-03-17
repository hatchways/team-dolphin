const bcrypt = require('bcryptjs')

const users = [
  {
    name: 'ArcturusCorp',
    email: 'philippe@dolphin.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'MercuryCorp',
    email: 'aidan@dolphin.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'JupiterCorp',
    email: 'alan@dolphin.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

module.exports = users
