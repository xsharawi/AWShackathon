import AWS from 'aws-sdk'
import 'dotenv/config'
import fs from 'fs'
import rekognition from 'aws-sdk/clients/rekognition.js'

// AWS_ACCESS_KEY_ID
// AWS_SECRET_ACCESS_KEY
// AWS_REGION

let config = {accesskey: process.env.AWS_ACCESS_KEY_ID, secret: process.env.AWS_SECRET_ACCESS_KEY}

AWS.config.update({
    region:process.env.AWS_REGION,
    credentials:config
})

let reke = new rekognition({
    region: process.env.AWS_REGION,
    credentials: config
})

let img = fs.readFileSync('./imgs/img.jpg')
//img = img.toString('base64')

let params = {
    Image: img,
}

reke.detectLabels(params,(err,data)=>{
    if(err){
        console.error(err)
    }
    console.log(data)
})

//console.log(reke)

