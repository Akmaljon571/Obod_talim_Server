import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import path from 'path'
import router from './router/index.js'
dotenv.config()

const PORT = process.env.PORT
const app = express()
const mongoURI = process.env.MONGODB;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/image', express.static(path.join(process.cwd(), 'uploads')));
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));
app.use(router)

app.listen(PORT, console.log('SERVER RUN: ' + PORT))