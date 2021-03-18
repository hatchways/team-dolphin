const bcrypt = require('bcryptjs')

const users = [
  {
    name: 'Airbus',
    email: 'philippe@dolphin.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Stripe',
    email: 'aidan@dolphin.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Amazon',
    email: 'alan@dolphin.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

module.exports = users
