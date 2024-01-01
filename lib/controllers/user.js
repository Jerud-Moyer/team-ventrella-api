import { Router } from 'express';
import UserService from '../services/user-service.js';
import ensureAuth from '../middleware/ensure-auth.js';

export default Router()
  .post('/signup', (req, res, next) => {
    UserService
      .signup(req.body)
      .then(user => {
        const token = UserService.authToken(user);
        res.send({ ...user.toJSON(), token });
      })
      .catch(next);
  })

  .post('/login', (req, res, next) => {
    UserService
      .authorize(req.body)
      .then(user => {
        const token = UserService.authToken(user);
        res.send({ ...user.toJSON(), token });
      })
      .catch(next);
  })

  .get('/verify', ensureAuth, (req, res) => {
    res.send(req.user);
  });
