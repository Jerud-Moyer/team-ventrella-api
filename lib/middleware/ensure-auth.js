import UserService from '../services/user-service';

const breakOutToken = (reqToken) => {
  const tokenArr = reqToken.split(' ');
  return tokenArr[0] === 'Bearer'
    ? tokenArr[1]
    : 'bad-token';
};   

export default (req, res, next) => {
  const token = breakOutToken(req.headers.authorization);
  const user = UserService.verifyToken(token);
  req.user = user;
  next();
};
