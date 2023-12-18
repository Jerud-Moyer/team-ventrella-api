import { Router } from 'express';
import { Column } from '../models/column.js';
import paginateResults from '../utils/paginateResults.js';

const router = Router();
router
  .get('/count', (req, res) => {
    Column
      .getCount()
      .then(count => res.send(count));
  })
  
  .get('/count-published', (req, res) => {
    Column
      .getCountPublished()
      .then(count => res.send(count));

  })

  .get('/published', (req, res) => {
    const { page, limit } = req.query;
    Column
      .findPublished()
      .then(cols => paginateResults(cols, page, limit))
      .then(cols => res.send(cols));
  })

  .get('/', (req, res) => {
    const { page, limit } = req.query;
    Column
      .find()
      .then(columns => paginateResults(columns, page, limit))
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
