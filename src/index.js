import express from 'express';
import AppRoutes from './routes/index.js'

const app = express();
const port = 8000;

app.use(express.json());
app.use('/', AppRoutes);



app.get('/user/:id', (req, res) => {
    try {
        res.status(200).send({
            message: "Data fetched succefully",
            user
        })
    } catch (error) {
        res.status(500).send({
            message: "Internal server error"
        })
    }
})

app.listen(port, () => console.log(`App is listening to ${port}`))
