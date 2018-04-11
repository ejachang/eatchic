const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const LocalStrategy = require('passport-local').Strategy;
const models = require('../models');
// const CryptoJS = require('crypto-js');

module.exports = {
  localLogIn: () => new LocalStrategy((username, password, done) => {
    // const hash = CryptoJS.AES.encrypt(password, 'eatchic');
    models.users.checkUserCredential(username, password)
      .then((results) => {
        if (results.rowCount === 1) {
          const { username } = results.rows[0];
          done(null, username);
        } else {
          done(null, false, { message: 'Incorrect username or password' });
        }
      })
      .catch((err) => {
        done(err);
      });
  }),
  googleLogIn: () => new GoogleStrategy({
    clientID: process.env.EATCHIC_CLIENT_ID || 'YOUR CLIENT ID HERE',
    clientSecret: process.env.EATCHIC_CLIENT_SECRET || 'YOUR CLIENT SECRET HERE',
    callbackURL: process.env.EATCHIC_CALLBACK_URL || 'YOUR CALLBACK URL HERE',
  }, (accessToken, refreshToken, profile, done) => {
    const { displayName } = profile;
    models.users.findByUsername(displayName)
      .then((results) => {
        if (results.rowCount) {
          const { username } = results.rows[0];
          done(null, username);
        } else {
          models.users.create(displayName, 'googleUsers')
            .then(() => {
              done(null, displayName);
            })
            .catch((err) => {
              done(err);
            });
        }
      })
      .catch((err) => {
        done(err);
      });
  }),
  isLoggedIn: (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      res.redirect('/login');
    }
  },
};
