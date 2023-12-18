import express from 'express';
import columnController from './controllers/column.js';
import cors from 'cors';
import error from './middleware/error.js';
import notFound from './middleware/not-found.js';
import userController from './controllers/user.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/columns', columnController);
app.use('/api/v1/user', userController);

app.use(error);
app.use(notFound);

export default app;
