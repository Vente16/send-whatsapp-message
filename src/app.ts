import "dotenv/config"
import express from "express"
import cors from "cors"
import routes from "./infrastructure/router"
const port = process.env.PORT || 3001
const app = express()
app.use(cors())
app.use(express.json())
// Check if the app is  running
app.get('/', (_, res, __) => res.status(200).send({ uptime: process.uptime()}));
// Returns the QR code
app.get('/qr', (_, res, __) => {
    const pathQr = `${process.cwd()}/tmp`;
    res.header('Content-Type', 'image/svg+xml');
    res.sendFile(`${pathQr}/qr.svg`);
});

app.use(`/`,routes)

app.listen(port, () => console.log(`Ready...${port}`))