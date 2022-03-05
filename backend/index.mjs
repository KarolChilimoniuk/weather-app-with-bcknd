import express from 'express';
import cors from 'cors';
import router from './routes.mjs';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const app = express();
const port = process.env.PORT || 4000;

app.get('/', (req, res) =>{
    res.send('Welcome!');
})
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/weather', router);

app.listen(port, () => {
    console.log(`Server works on port ${port}`);
});