const mongoose = require('mongoose');
const User = require('../schemas/users.schemas');
const utils = require('./utils.service');
const authService = require('./auth.service');

module.exports = {
  signup,
  login,
  find,
  findOne, 
  update,
  remove
}

function signup(req, res, next) {
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (user) {
        res.status(422).json({ message: 'A user with this email already exists' });
      }
      return authService.hashPassword(req);
    })
    .then(hash => {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: hash
      });
      return user.save();
    })
    .then(_ => res.status(201).json({ message: 'User created' }))
    .catch(err => next(err))
}

function login(req, res, next) {
  const findUser = User.findOne({ email: req.body.email }).exec();
  const comparePwd = findUser.then(user => authService.comparePwd(req.body.password, user.password));
  return Promise.all([findUser, comparePwd])
    .then(result => {
      const [ user, match ] = result;
      if (match) {
        const token = authService.signToken({ email: user.email, id: user._id });
        res.status(200).json({ message: 'auth successful', token })
      } else {
        res.status(401).json({ message: `auth failed` })
      }
    })
    .catch(err => next(err));
}

function find(req, res, next) {
  User.find()
    .select('_id email password')
    .exec()
    .then(users => {
      res.status(200).json({
        message: 'Users found',
        count: users.length,
        data: users.map(user => createUserResponse(user))
      })
    })
    .catch(err => next(err))
}

function findOne(req, res, next) {
  User.findById(req.params.id)
    .select('_id email password')
    .exec()
    .then(user => res.status(200).json({ message: 'User found', data: createUserResponse(user) }))
    .catch(err => next(err))
}

function update(req, res, next) {
  if (utils.passwordIsInvalid(req.body.password)) {
    res.status(401).json({ message: 'password must be at least six characters '});
  }
  return authService.hashPassword(req, res, next)
    .then(hash => {
      updatedUser = {
        email: req.body.email,
        password: hash
      }
      return User.findOneAndUpdate(req.params.id, { $set: updatedUser }).exec()
    })
    .then(user => res.status(200).json(
      { 
        message: 'successfully updated',
        user: { ...user._doc },
        request: {
          type: 'GET && PATCH && DELETE',
          url: utils.createURL(process.env.dbURL, 'users', user._id)
        }
      })
    )
    .catch(err => next(err));
}

function remove(req, res, next) {
  User.findByIdAndRemove(req.params.id)
    .exec()
    .then(result => res.status(200).json({ message: 'successfully deleted', data: result }))
    .catch(err => next(err));
}

function createUserResponse(user) {
  const { _id, email, password } = user;
  return {
    _id,
    email,
    password,
    request: {
      type: 'GET && PATCH && DELETE',
      url: utils.createURL(process.env.dbURL, 'users', _id)
    } 
  } 
}

