const parseCookies = (req, res, next) => {
  if (!req.headers.hasOwnProperty('cookie')) {
    req.cookies = {}
    next();
  } else {
    req.cookies = {}
    var cookieMonster = req.headers.cookie.split('; ');
    cookieMonster = cookieMonster.map((cookie) => {
      return cookie.split('=')
    });

    for (var i = 0; i < cookieMonster.length; i++) {
      req.cookies[cookieMonster[i][0]] = cookieMonster[i][1];
    }
    next();
  }
};

module.exports = parseCookies;