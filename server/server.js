import express from "express"
import cors from "cors"
import "dotenv/config"
import path from "path"
import router from './routes/index.js';
import { fileURLToPath } from 'url';


const app = express()
const PORT = process.env.PORT || 5001

// app.use(cors());
app.use(express.json({ extended: false }));
app.use('/api', router);


// Serving the Front End
if (process.env.NODE_ENV == 'production') {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    app.use(express.static(path.join(__dirname, "../client/build")));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}

// Serve the server
app.listen(PORT, () => {
  console.log('Listening to ' + PORT)
})