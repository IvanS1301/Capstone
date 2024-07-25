const jwt = require('jsonwebtoken')
const UserLG = require('../models/userLGModel')

const requireAuth = async (req, res, next) => {

  // verify authentication
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' })
  }

  const token = authorization.split(' ')[1]

  try {
    const { _id } = jwt.verify(token, process.env.SECRET)

    req.userLG = await UserLG.findOne({ _id }).select('_id name team status')
    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({ error: 'Request is not authorized' })
  }
}

module.exports = requireAuth