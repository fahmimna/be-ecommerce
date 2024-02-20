import app from './app.js';
import { config } from 'dotenv';

config()

const port = process.env.APP_PORT || 3000;

// app.get('/', (req, res) => {
//   res.status(200).json("Hello World");
// })

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})