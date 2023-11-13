import { Router } from 'express';
import { Column } from '../models/column.js';
import paginateResults from '../utils/paginateResults.js';

const router = Router();
router
  .get('/', (req, res) => {
    const { page, limit } = req.query;
    Column
      .find()
      .then(columns => paginateResults(columns, page, limit))
      .then(cols => res.send(cols));
  });

export default router;
