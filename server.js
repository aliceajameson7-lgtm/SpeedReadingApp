import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import router from './userTime.js';
import geminiRouter from './geminiRoute.js';
const app = express();
const __filename =fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
app.use(express.json());

app.use('/randomGeneration', geminiRouter);
app.use('/times', router);
app.use(express.static(path.join(__dirname, 'public')));



app.listen(8000, () => console.log('Server connected'));
