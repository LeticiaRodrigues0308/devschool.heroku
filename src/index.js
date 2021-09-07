import db from './db.js';
import express from 'express'
import cors from 'cors'
const app = express();
app.use(cors());


app.get('/matricula', async (req, resp) => {
    try {
        let matriculas = await 
    } catch (e) {
        
    }
})

app.listen(process.env.PORT,

x => console.log(`Server up at port ${process.env.PORT}`))