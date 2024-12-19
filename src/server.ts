import mongoose from 'mongoose';
import app from './app';
import { Server } from 'http';

const port = 3000;
let server: Server;

async function main() {
  try {
    await mongoose.connect(
      'mongodb+srv://assignment-3:assignment-3@cluster0.dr6rgwa.mongodb.net/assignment-3?retryWrites=true&w=majority&appName=Cluster0',
    );
    server = app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on('unhandledRejection', () => {
  console.log('Unhandeled Rejection');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
