import { Router } from 'express';
import { Blog } from '../models/blog.js';


const router = Router();
router
  .get('/', (req, res) => {
    Blog
      .find()
      .then(blogs => res.send(blogs));
  });

export default router;
