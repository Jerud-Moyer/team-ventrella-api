import bcrypt from 'bcryptjs';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';

export default  {
  signup: async ({ email, password, firstName }) => {
    const passwordHash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
    const addUser = await User.insert({
      email,
      passwordHash,
      firstName
    });
  
    return addUser;
  },
  
  authorize: async ({ email, password }) => {
    const user = await User.findByEmail(email);
  
    if(!user) throw new Error('Inavalid username or password');
  
    const validPassword = await bcrypt.compare(password, user.passwordHash);
  
    if(!validPassword) throw new Error('Invalid username or password');
  
    return user;
  },
   
  authToken: (user) => {
    const token = jwt.sign({
      payload: user.toJSON()
    }, process.env.APP_SECRET, {
      expiresIn: '24h'
    });
    return token;
  },
  
  verifyToken: (token) => {
    const { payload } = jwt.verify(token, process.env.APP_SECRET);
    return payload;
  }

};
