class errorHandler extends Error{
    constructor(message,statuscode){
        super(message)  // ye node js ki Error class ka constructor  he 
        this.statuscode=statuscode
    
       
    }

} 




module.exports=errorHandler