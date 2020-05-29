  const jwt = require('jsonwebtoken');

  function auth(req, res, next) {
      const jwtToken = req.header('Autorizacion');
      if (!jwtToken) return res.status(401).send('Acceso Denegado. Necesitamos un token valido');

      try {
          const payload = jwt.verify(jwtToken, 'password');
          req.user = payload;
          console.log(req.user);

          next();
      } catch (e) {
          res.status(400).send('Acceso Denegado. Token no valido');
      }
  }

  module.exports = auth;