import express from 'express';
import EventsRouter from './routes/EventsRouter.js';
import UserRouter from './routes/UserRouter.js';

const PORT = 5001;

const app = express();

app.use(express.json());
app.use('/events', EventsRouter);
app.use('/login', UserRouter);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please use a different port.`);
    process.exit(1);
  } else {
    console.error('Failed to start server:', err);
  }
});
