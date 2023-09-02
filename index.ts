import express from "express"
import fs from 'fs'
import 'dotenv/config'
import os from "os"
import multer from "multer"
import "reflect-metadata"
import Detection from "./sample.js"
import { MulterRequest } from './types.js';
const app = express();
const HOST = os.hostname()
const PORT = process.env.PORT || 3000
import db from './db/dataSource.js'
import { Data } from "./db/entities/Data.js"

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const storage = multer.diskStorage({
    destination(req,file,callback){
        callback(null,'Uploads/')
    },
    filename(req,file,callback){
        callback(null,file.originalname)
    },
})

const upload = multer({storage})

app.get('/health',(req,res)=>{
    res.sendStatus(200);
})

app.post('/img', upload.single('file'),async (req,res)=>{
    if(!req.file){
        res.status(500).send('error uploading')
        return;
    }
    let response = await Detection.DetectLabels("./"+req.file.path)
    const newData = new Data();
    newData.filePath = "./"+req.file.path;
    console.log(JSON.stringify(response.Labels))
    newData.response = JSON.stringify(response);
    newData.type = 'image'
    await newData.save()
    res.status(200).send({
        msg: 'file uploaded',
        upload,
        response
    })
})

app.post('/celeb', upload.single('file'),async (req,res)=>{
    if(!req.file){
        res.status(500).send('error uploading')
        return;
    }
    let response = await Detection.DetectCeleb("./"+req.file.path)
    const newData = new Data();
    newData.filePath = "./"+req.file.path;
    newData.response = JSON.stringify(response);
    newData.type = 'celeb'
    await newData.save()
    res.status(200).send({
        msg: 'file uploaded',
        upload,
        response
    })
})

app.post('/text', upload.single('file'),async (req,res)=>{
    if(!req.file){
        res.status(500).send('error uploading')
        return;
    }
    let response = await Detection.DetectText("./"+req.file.path)
    const newData = new Data();
    newData.filePath = "./"+req.file.path;
    newData.response = JSON.stringify(response);
    newData.type = 'text'
    await newData.save()
    res.status(200).send({
        msg: 'file uploaded',
        upload,
        response
    })
})

app.listen(PORT,async ()=>{
    db.init()
    console.log(`server running on http://${HOST}:${PORT} `)
})