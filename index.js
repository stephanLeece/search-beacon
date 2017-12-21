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
    res.json({error: 'Looks like something\'s missing.'});
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
          res.json({error: 'Seems to be a mistake...'});
        }
      });
    }).catch(function(err) {
      console.log(err);
      res.json({error: 'Seems to be a mistake...'});
    })
  } else {
    res.json({error: 'Looks like something\'s missing.'});
  }
});

app.get('/authorize.json', function(req, res) {
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

app.get('/userProfile.json', function(req, res) {
  if (req.session.user) {
    dbGets.getUserProfile(req.session.user.id).then(function(user) {
      console.log('server user results', user);
      let userProfile = {
        id: user.id,
        usertype: user.usertype,
        title: user.title,
        description: user.description,
        responsibilites: user.responsibilites,
        skills: user.skills,
        image1: user.image1,
        image2: user.image2,
        image3: user.image3,
        address: user.address,
        lat: user.lat,
        lng: user.lng
      };
      res.json({userProfile: userProfile});
    })
  } else {
    res.redirect('/landing/');
  }
});

app.get('/otherUserProfile.json/:id', function(req, res) {
  const id = req.params.id;
  if (id == req.session.user.id) {
    res.json({success: false, redirect: true});
  } else {
    dbGets.getUserById(id).then(function(results) {
      if (results === 0) {
        console.log('nowt there');
        res.json({error: 'An error!', redirect: true});
      } else {
        console.log('results are in', results);
        let otherUserProfileObj = {
          OtherUserFname: results.fname,
          OtherUserLname: results.lname,
          OtherUserType: results.usertype,
          OtherUserTitle: results.title,
          OtherUserDescription: results.description,
          OtherUserResponsibilites: results.responsibilites,
          OtherUserSkills: [],
          OtherImage1: results.image1,
          OtherImage2: results.image2,
          OtherImage3: results.image3,
          OtherUserId: results.userid
        };

        if (otherUserProfileObj.OtherUserSkills.length > 0) {
        let skillsSplit = results.skills.split(' ');
        let trimmedSkills = []
        for (let i = 0; i < skillsSplit.length; i++) {
          trimmedSkills.push(skillsSplit[i].trim())
        }
        for (let i = 0; i < trimmedSkills.length; i++) {
          if (otherUserProfileObj.OtherUserSkills.indexOf(trimmedSkills[i]) == -1) {
            otherUserProfileObj.OtherUserSkills.push(trimmedSkills[i])
          }
        }
      }
        console.log('server sending back', otherUserProfileObj);
        res.json(otherUserProfileObj);
      }
    });
  }
});

app.get('/allUsers.json', function(req, res) {
  if (req.session.user) {
    dbGets.getAllUsers(0).then(function(results) {
      console.log('server user results', results);
      res.json({allUsers: results});
    })
  } else {
    res.redirect('/landing/');
  }
});

app.post('/saveProfile', function(req, res) {
  dbSets.saveProfile(req.body.userTitle, req.body.userDescription, req.body.userResponsibilites, req.body.userSkills, req.session.user.id).then(function(results) {
    res.json({error: false});
  }).catch(function(err) {
    console.log(err);
    res.json({error: 'Whoops! Somethings gone a bit wrong...'});
  });
});


app.post('/saveAddress', function(req, res) {
  console.log('save address',  req.body);
  dbSets.saveAddress(req.body.address, req.body.lat, req.body.lng, req.session.user.id).then(function(results) {
    res.json({error: false});
  }).catch(function(err) {
    console.log(err);
    res.json({error: 'Whoops! Somethings gone a bit wrong...'});
  });
});



app.post('/uploadImage', uploader.single('image'), function(req, res) {
  console.log('imageNumber', req.body.imageNo);
  if (req.file) {
    console.log("found a file", req.file);
    s3.upload(req.file).then(function() {
      dbSets.saveImage(req.body.imageNo, req.file.filename, req.session.user.id).then(function(image) {
        console.log('groovy', req.body.imageNo, image);
        res.json({imageNo: req.body.imageNo, image: image})
      });
    });
  } else {
    res.json({error: 'Shrink it down a bit!'});
  }
});

app.post('/search.json', function(req, res) {
  console.log('search term is',req.body.searchTerm );
  dbGets.search(req.body.searchTerm, req.session.user.id, req.body.userType).then(function(results) {
    if (results === 0) {
      console.log('no results');
      res.json({error: 'No Results...'});
    } else {
      console.log('results', results);
      res.json(results);
    }
  }).catch(function(err) {
    console.log(err);
    res.json({error: 'Whoops! Somethings gone a bit wrong...'});
  });
});

app.post('/convo.json', function(req, res) {
  dbSets.saveMessage(req.body.senderId, req.body.senderfname, req.body.senderlname, req.body.receiverid, req.body.receivierfname, req.body.receivierlname, req.body.message).then(function(results){
    res.json({error: false});
  }).catch(function(err) {
    console.log(err);
    res.json({error: 'Whoops! Somethings gone a bit wrong...'});
  });
});


app.get('/convoHistory.json/:id', function(req, res) {
  console.log('i got', req.params.id);
  dbGets.getConvo(req.params.id, req.session.user.id).then(function(results){
    console.log('history', results);
    res.json(results);
  }).catch(function(err) {
    console.log(err);
    res.json({error: 'Whoops! Somethings gone a bit wrong...'});
  });
});

app.post('/allMessages.json', function(req, res) {
console.log(req.body);
if(req.body.msg ==0 ) {
  console.log('getting sent');
  dbGets.getSent(req.session.user.id).then(function(results){
    if (results === 0) {
      console.log('nowt there');
      res.json({error: 'No Results...'});
    } else {
      res.json(results);
    }
  }).catch(function(err) {
    console.log(err);
    res.json({error: 'Whoops! Somethings gone a bit wrong...'});
  });
} else {
  console.log('getting received');
  dbGets.getReceived(req.session.user.id).then(function(results){
    if (results === 0) {
      console.log('nowt there');
      res.json({error: 'No Results...'});
    } else {
      console.log('all history', results);
      res.json(results);
    }
  }).catch(function(err) {
    console.log(err);
    res.json({error: 'Whoops! Somethings gone a bit wrong...'});
  });
}

});





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
