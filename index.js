const express = require('express');
const app = express();
const compression = require('compression');
const bodyParser = require('body-parser');
const dbGets = require('./sql/dbGets.js');
const dbSets = require('./sql/dbSets.js');
const s3 = require('./s3.js');
const multer = require('multer');
const uidSafe = require('uid-safe');
const path = require('path');
const knox = require('knox');
const bcrypt = require('./bcrypt.js');
const csurf = require('csurf');
const cookieSession = require('cookie-session');

var diskStorage = multer.diskStorage({
  filename: function(req, file, callback) {
    uidSafe(24).then(function(uid) {
      callback(null, uid + path.extname(file.originalname));
    });
  }
});

var uploader = multer({
  storage: diskStorage,
  limits: {
    fileSize: 2097152
  }
});

app.use(compression());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieSession({
  secret: 'never reveal the wu tang secret',
  maxAge: 1000 * 60 * 60 * 24 * 14
}));
app.use(csurf());
app.use(function(req, res, next) {
  res.cookie('wutang', req.csrfToken());
  next();
});
if (process.env.NODE_ENV != 'production') {
  app.use('/bundle.js', require('http-proxy-middleware')({target: 'http://localhost:8081/'}));
}
app.use(express.static('./public'));

app.get('/', function(req, res) {
  if (!req.session.user && req.url != '/landing/') {
    res.redirect('/landing/');
    return;
  } else {
    res.sendFile(__dirname + '/index.html');
  }
});

app.get('/landing', function(req, res) {
  if (req.session.user) {
    res.redirect('/');
  } else {
    res.sendFile(__dirname + '/index.html');
  }
});

app.post('/register', function(req, res) {
  if (req.body.fname && req.body.lname && req.body.email && req.body.pword && req.body.usertype) {
    var password = req.body.pword.trim();
    bcrypt.hashPassword(password).then(function(hash) {
      dbSets.saveUserDetails(req.body.fname, req.body.lname, req.body.email, hash, req.body.usertype).then(function(results) {
        res.json({error: false});
      }).catch(function(err) {
        console.log(err);
        res.json({error: 'That E-Mail is in use..'});
      });
    });
  } else {
    res.json({error: 'Something is missing...'});
  }
});

app.post('/authorize', function(req, res) {
  if (req.body.email && req.body.pword) {
    dbGets.getUserByEmail(req.body.email).then(function(user) {
      let id = user.id
      bcrypt.checkPassword(req.body.pword, user.hashedpass).then(function(doesMatch, id) {
        if (doesMatch) {
          req.session.user = {
            email: req.body.email,
            id: user.id,
            fname: user.fname,
            lname: user.lname,
            usertype: user.usertype
          };
            res.redirect('/');
        } else {
          res.json({error: 'There seems to be a mistake..'});
        }
      });
    });
  } else {
    res.json({error: 'Somethings Missing...'});
  }
});

app.get('/authorize', function(req, res) {
  if (req.session.user) {
    dbGets.getUserByEmail(req.session.user.email).then(function(user) {
      let userDetails = {
        email: user.email,
        id: user.id,
        fname: user.fname,
        lname: user.lname,
        usertype: user.usertype
      };
      res.json({userDetails: userDetails});
    })
  } else {
    res.redirect('/landing/');
  }
});

// app.post('/uploadImage', uploader.single('profilepic'), function(req, res) {
//   console.log('starting upload');
//   if (req.file) {
//     console.log("found a file");
//     s3.upload(req.file).then(function() {
//       dbSets.saveImage(req.file.filename, req.session.user.email).then(function(image) {
//         res.json({success: true, image: image});
//       });
//     });
//   } else {
//     res.json({error: 'A smaller picture, perhaps?'});
//   }
// });



































app.get('/logout', function(req, res) {
  req.session = null;
  res.redirect('/landing/');
});

app.get('*', function(req, res) {
  if (!req.session.user && req.url != '/landing/') {
    res.redirect('/landing/');
    return;
  } else {
    res.sendFile(__dirname + '/index.html');
  }
});

app.listen(process.env.PORT || 8080, function() {
  console.log("I'm listening.");
});
