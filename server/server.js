import "dotenv/config"
import cors from "cors"
import path from "path"
import express from "express"
import router from './routes/index.js';
import { fileURLToPath } from "url";

const app = express()
const PORT = process.env.PORT || 5001

app.use(cors());
app.use(express.json({ extended: false }));
app.use('/api', router);

// Serve the Front End
if (process.env.NODE_ENV == 'production') {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  // app.use(express.static(path.join(__dirname, "static")));
  // app.get('*', (req, res) => {
  //     res.sendFile(path.join(__dirname, 'static', 'index.html'));
  // });

  // app.use(express.static('client/build'));
  // app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
  app.use(express.static(path.join(__dirname, '/client/build')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
}

// Serve the server
app.listen(PORT, () => {
  console.log('Listening to ' + PORT)
})
