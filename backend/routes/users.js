const express = require('express')
const router = require('express').Router()
const User = require('../models/user.model')

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json({ users }))
    .catch(err => res.status(400).json({ error: err }))
})

router.route('/add').post((req, res) => {
  const username = req.body.username
  const newUser = new User({ username })
  User.find({ username })
    .then(users => {
      if (!users.length) {
        newUser.save()
          .then(() => {
            console.log('SUCCESS!')
            res.json({ status: 'User added!', user: username })
          })
          .catch(err => {
            console.log(err)
            res.status(400).json({ error: err.data })
          })
      } else {
        console.log('Duplicate User!')
        res.json({ status: 'User already exists!', user: username })
      }
    })
    .catch(err => res.status(400).json({ error: err }))


})

module.exports = router