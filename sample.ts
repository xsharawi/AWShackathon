import AWS from 'aws-sdk'
import 'dotenv/config'
import fs from 'fs'
import rekognition from 'aws-sdk/clients/rekognition.js'

let config = {accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY}


AWS.config.update({
    region:process.env.AWS_REGION,
    credentials:{
        accessKeyId: String(config.accessKeyId),
        secretAccessKey: String(config.secretAccessKey)
    }
})

let reke = new rekognition({
    region: process.env.AWS_REGION,
    credentials:{
        accessKeyId: String(config.accessKeyId),
        secretAccessKey: String(config.secretAccessKey)
    }
})

let DetectLabels = (fileName)=>{
    // AWS_ACCESS_KEY_ID
    // AWS_SECRET_ACCESS_KEY
    // AWS_REGION


    let img = fs.readFileSync(fileName)
    let params = {
        Image:{
            Bytes: img
        },
        //Attributes: ['ALL']
    }

    return new Promise((res,rej)=>{
        reke.detectLabels(params,async (err,data)=>{
            if(err){
                rej(err)
            }
            res(data)
        })
    })
}
let DetectCeleb = (fileName)=>{
    // AWS_ACCESS_KEY_ID
    // AWS_SECRET_ACCESS_KEY
    // AWS_REGION


    let img = fs.readFileSync(fileName)
    let params = {
        Image:{
            Bytes: img
        },
        //Attributes: ['ALL']
    }

    return new Promise((res,rej)=>{
        reke.recognizeCelebrities(params,async (err,data)=>{
            if(err){
                rej(err)
            }
            res(data)
        })
    })
}

let DetectText = (fileName)=>{
    // AWS_ACCESS_KEY_ID
    // AWS_SECRET_ACCESS_KEY
    // AWS_REGION


    let img = fs.readFileSync(fileName)
    let params = {
        Image:{
            Bytes: img
        },
        //Attributes: ['ALL']
    }

    return new Promise((res,rej)=>{
        reke.detectText(params,async (err,data)=>{
            if(err){
                rej(err)
            }
            res(data)
        })
    })
}

export default {DetectLabels, DetectCeleb, DetectText};