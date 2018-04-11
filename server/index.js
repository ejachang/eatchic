const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('flash');
const cookieParser = require('cookie-parser');
const router = require('./routes.js');
const { localLogIn, googleLogIn } = require('./middleware');
const models = require('./models');
// const CryptoJS = require('crypto-js');

const PORT = process.env.PORT || 3000;

const app = express();

passport.use(localLogIn());
passport.use(googleLogIn());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((username, done) => {
  models.users.findByUsername(username)
    .then((results) => {
      if (results.rowCount === 1) {
        done(null, results.rows[0]);
      } else {
        done(null, false);
      }
    })
    .catch((err) => {
      done(err);
    });
});

// Middleware
app.use('/images', express.static(path.join(__dirname, '/../images')));
app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use('/login', express.static(path.join(__dirname, '/../client/dist/login.html')));
app.use('/signup', express.static(path.join(__dirname, '/../client/dist')));

app.get('/session', (req, res) => {
  if (req.session.user) {
    const { user } = req.session;
    models.users.getUserId(user)
      .then((result) => {
        const { id } = result.rows[0];
        res.json({ user, id });
      })
      .catch(err => console.log(err));
  } else {
    res.json(null);
  }
});

app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  // const hash = CryptoJS.AES.encrypt(password, 'eatchic');
  models.users.findByUsername(username)
    .then((results) => {
      if (results.rowCount === 0) {
        models.users.create(username, password)
          .then(() => {
            req.session.regenerate(() => {
              req.session.user = username;
              res.redirect('/');
            });
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      } else {
        res.redirect('/login');
      }
    });
});

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      // return res.send(info);
      return res.redirect('/login');
    }
    req.session.regenerate(() => {
      req.session.user = user;
      res.redirect('/');
    });
  })(req, res, next);
});

app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

app.get('/auth/google/callback', (req, res, next) => {
  passport.authenticate('google', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      return res.send(info);
    }
    req.session.regenerate(() => {
      req.session.user = user;
      res.redirect('/');
    });
  })(req, res, next);
});

app.get('/logout', (req, res) => {
  res.clearCookie();
  req.session.destroy(() => {
    res.redirect('/home');
  });
});

app.use(router);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
