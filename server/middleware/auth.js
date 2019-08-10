const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  //creates a new prop called sessions
  //access parsed cookies
  // looks up user data
  // assigns an obj to session prop containing relevant user info

  //generates new session when req has no cookies
  var cookieLength = Object.keys(req.cookies).length
  if (cookieLength === 0) {
    return models.Sessions.create()
      .then((options) => {
        return models.Sessions.get({ id: options.insertId });
      })
      .then((object) => {
        req.session = object;
        var cookieMonster = { shortlyid: { value: object.hash } };
        res.cookies = cookieMonster;
        next();
      })
  } else {
    return models.Sessions.get({ hash: req.cookies.shortlyid })
      .then((data) => {
        if (data !== undefined) {
          req.session = data;
          next();
        } else {
          return models.Sessions.create()
            .then((options) => {
              return models.Sessions.get({ id: options.insertId });
            })
            .then((object) => {
              req.session = object;
              var cookieMonster = { shortlyid: { value: object.hash } };
              res.cookies = cookieMonster;
              next();
            })
        }
      })

    // console.log(req)
    // req.cookies = {}
    // var cookieMonster = req.headers.cookie.split('; ');
    // cookieMonster = cookieMonster.map((cookie) => {
    //   return cookie.split('=')
    // });

    // for (var i = 0; i < cookieMonster.length; i++) {
    //   req.cookies[cookieMonster[i][0]] = cookieMonster[i][1];
    // }
    // next();
  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

