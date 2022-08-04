import express from "express"
import cors from "cors"
import "dotenv/config"
import path from "path"
import router from './routes/index.js';
import { fileURLToPath } from 'url';
import { Server } from "socket.io";
import { connectToDatabase } from "./mongodb.js";
import runChangeStream from "./changeStream.js";
import http from 'http';

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
  }
})
const PORT = process.env.PORT || 5001
const { database, mongoClient } = await connectToDatabase();
io.on('connection', socket => runChangeStream(database, mongoClient,socket))

app.use(cors());
app.use(express.json({ extended: false }));
app.use("/api", router);


// Serving the Front End
if (process.env.NODE_ENV == 'production') {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    app.use(express.static(path.join(__dirname, "static")));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'static', 'index.html'));
    });
}

//Serve the server
server.listen(PORT, () => {
  console.log('Listening to ' + PORT)
})
