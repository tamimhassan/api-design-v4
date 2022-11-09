import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import router from './router';
import { protect } from './modules/auth';
import { createNewUser, signin } from './handlers/user';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  console.log(req.headers);
  res.status(200).json({ message: 'Hello' });
});

app.use('/api', protect, router);

app.use('/user', createNewUser);
app.use('/signin', signin);

export default app;
