import express, { Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import {config} from "dotenv";
const PORT = 3000;

config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log('Server banco de dados: ' + process.env.DB_SERVER);
});