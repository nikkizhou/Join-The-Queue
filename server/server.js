import express from "express"
import cors from "cors"
import "dotenv/config"
import router from './routes/index.js';
import nodemailer from "nodemailer"

const app = express()
const PORT = process.env.PORT || 5001

app.use(cors())
app.use(express.json({ extended: false }));

app.use('/api', router);
app.get('/', (req, res) => {
    res.send('Hellow world')
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})

/*-------------------------------
AUTHENTICATION
---------------------------------*/
// const contactEmail = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: "apolloqueuemanager@gmail.com",
//       pass: "Ap0ll0!!",
//     },
//   });
  
//   contactEmail.verify((error) => {
//     if (error) {
//       console.log(error, 'there has been a wee error');
//     } else {
//       console.log("Ready to Send");
//     }
//   });

// router.post("/contact", (req, res) => {
//     const name = req.body.name;
//     const email = req.body.email;
//     const message = req.body.message; 
//     const mail = {
//       from: name,
//       to: "apolloqueuemanager@gmail.com",
//       subject: "Contact Form Submission",
//       html: `<p>Name: ${name}</p>
//             <p>Type: ${type}</p>
//             <p>Address: ${address}</p>
//              <p>Email: ${email}</p>
//              <p>Message: ${message}</p>`,
//     };
//     contactEmail.sendMail(mail, (error) => {
//       if (error) {
//         res.json({ status: "ERROR" });
//       } else {
//         res.json({ status: "Message Sent" });
//       }
//     });
//   });