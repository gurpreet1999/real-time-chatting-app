const Errormiddleware=async(err,req,res,next)=>{

err.statuscode=err.statuscode || 500
err.message=err.message || "Internal Server Error"
res.status(err.statuscode).json({
    success:false,
    message:err.message
})

}


module.exports=Errormiddleware