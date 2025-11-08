import mongoose from "mongoose";

export async function connectDB(){

    try{
        mongoose.connect(process.env.MONGOBD_URL!)
        const connection = mongoose.connection

        connection.on('connected', ()=>{
            console.log('db connected!!!')
        })

        connection.on('error', (err)=>{
            console.log('error with db:',err)
            process.exit()
        })
    }
    catch(error){
        console.log('error is bdconfig connect:',error)
    }
}