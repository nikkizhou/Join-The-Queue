import express from "express"
import axios from "axios"
import cors from "cors"
import "dotenv/config"

import { connectToDatabase } from "/mongodb";

const app = express()
const PORT = process.env.PORT || 5001

app.use(cors())
app.use(express.json({ extended: false }));


app.get('/', (req, res) => {
    res.send('Hellow world')
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})


async function dbGetRes(request, response) {
    const queryId = request.query.id;
    const {database}  = await connectToDatabase();
    const resturants = await database.collection('restaurants').find({productId:queryId}).toArray();
    response.status(200).json(product);
}

