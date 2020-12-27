const bcrypt = require('bcrypt')
const saltRounds = 11

const bcrypter = {
  encrypt: valueToEncrypt => {
    function result() {
      bcrypt.hash(valueToEncrypt, saltRounds, (err, hash) => {
        return hash
      })
    }
  },
  compare: (valueToCompare, hash, next) => {
    bcrypt.compare(valueToCompare, hash, (err, result) => {
      next(result)
    })
  }
}

const runner = (req, res, err) => {
  bcrypt.compare('Wayne', '$2b$11$fFupgWnPe.Iyl6.9/K1DZOlfYjbWwxsozcOVFgPNhSaYAzw4sJExK',
    (err, res) => {
      console.log({ result: res, err })
    })
}

module.exports = runner