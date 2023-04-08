const mongoose=require('mongoose')

async  function  databaseConnection(){


mongoose.set("strictQuery", false);

try{
await mongoose.connect(process.env.MONGOURL)
console.log("mongoDb connected")

}catch(error){
console.log(err)

}


}

module.exports=databaseConnection