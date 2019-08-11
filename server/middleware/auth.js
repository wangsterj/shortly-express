const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  //creates a new prop called sessions
  //access parsed cookies
  // looks up user data
  // assigns an obj to session prop containing relevant user info

  //generates new session when req has no cookies
  var cookieLength = Object.keys(req.cookies).length;
  var sessionId;
  if (cookieLength === 0) {
    return models.Sessions.create()
      .then((options) => {
        return models.Sessions.get({ id: options.insertId });
      })
      .then((session) => {
        req.session = session;
        res.cookie('shortlyid', session.hash);
        next();
      });
  } else {
    return models.Sessions.get({ hash: req.cookies.shortlyid })
      .then((session) => {
        if (session !== undefined) {
          req.session = session;
          res.cookie('shortlyid', req.cookies.shortlyid);
          next();
        } else {
          return models.Sessions.create()
            .then((options) => {
              return models.Sessions.get({ id: options.insertId });
            })
            .then((session) => {
              req.session = session;
              res.cookie('shortlyid', session.hash);
              next();
            });
        }
      });
  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

