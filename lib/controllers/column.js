import { Router } from 'express';
import { Column } from '../models/column.js';
import paginateResults from '../utils/paginateResults.js';

const router = Router();
router
  .get('/', (req, res) => {
    const { page, limit } = req.query;
    Column
      .find()
      .then(columns => {
        return paginateResults(columns, page, limit);
      })
      .then(cols => res.send(cols));
  })

  .get('/:id', (req, res) => {
    Column
      .findById(req.params.id)
      .then(col => res.send(col));
  })

  .post('/', (req, res) => {
    const column = req.body;
    Column
      .insert(column)
      .then(col => res.send(col));
  })

  .put('/', (req, res) => {
    const column = req.body;
    Column
      .update(column)
      .then(col => res.send(col));
  })

  .delete('/:id', (req, res) => {
    const id = req.params.id;
    Column
      .delete(id)
      .then(col => res.send(col));
  });

export default router;
