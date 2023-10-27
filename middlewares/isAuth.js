const jwt =require("jsonwebtoken")

module.exports=(req,res,next)=>
{
    try{
        if(!req.headers.authorization)
        {
            throw new Error("Missing token")
        }
        const token=req.headers.authorization.split(" ") [1]
        const decoded=jwt.verify(token, process.env.JWT_SECRET)
        req.userData=decoded;
        next()
    }
    catch(err)
    {
        if(!err.status)
        {
            err.status=401;
        }
        if(!err.message)
        {
            err.message="Authentication Failed"
        }
        next(err)
    }
}