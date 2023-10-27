const User=require("../models/user.model")
const bcryptjs=require("bcryptjs")
const jwt =require("jsonwebtoken")

// Logic behind signup
module.exports.signup=async (req,res,next)=>
{
try 
{
    const {email,name,password}=req.body
    if(!email || !password || !name)
    {
     return res.status(400).json({message:"Please proveide all the details"})
    
    }
    const user=await User.findOne({email})
    if(user)
    {
       res.status(409).json({message:"User already exist"})
    }
    const hashedPassword=await bcryptjs.hash(password, 12)
    const newUser= new User({
        name,
        email,
        password:hashedPassword
    })
    const result=await newUser.save()
    res.status(201).json({message:"User Created Successfully",result})

}
catch(err)
{
    if(!err.statusCode)
    {
        err.statusCode=500;
    }
    if(!err.message)
    {
        err.message="Internal server error"
    }
    next(err)
}
}

// Logic behind login 
module.exports.login=async(req,res,next)=>
{
    try{
        const{email,password}=req.body
        if(!email || !password )
        {
            res.status(400).json({message:"Please fill all the fields"})
        }
        const user=await User.findOne({email}).select('+password')
        if(!user)
        {
            res.status(400).json({message:"User not exist"})
        }
        const isMatch=await bcryptjs.compare(password, user.password)
        if(!isMatch)
        {
            res.status(400).json({message:"Invalid credentials"})
        }
        const token=jwt.sign({email:user.email, id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'})
        res.status(200).json({message:"User logged in successfully",token})
    }
    catch(err){
        if(!err.status)
        {
            err.status=500;
        }
        if(!err.message)
        {
            err.message="Internal server error"
        }
        next(err)
    }
}

module.exports.bankBalance=async(req,res,next)=>
{
    console.log(req.userData)

    try{
        const user=await User.findOne({email:req.userData.email})
        if(!user)
        {
            return res.status(400).json({message:"User not exists"})
        }
        return res.status(200).json({message:"Bank Balance fetched successfully",balance:user.bankBalance})
    }
    catch(err)
    {
        if(!err.status)
        {
            err.status=500;
        }
        if(!err.message)
        {
            err.message="Internal Server Error"
        }
        next(err)
    }
}

module.exports.deposit=async(req,res,next)=>
{
    try{
       const {depositBalance}=req.body;
       const user=await User.findOne({email:req.userData.email})
       if(!user)
       {
        return res.status(400).json({message:"User doesnot exists"})
       }
       user.bankBalance+=depositBalance;
       await user.save();
       return res.status(200).json({message:"Amount deposited successfully",balance:user.bankBalance})
    }
    catch(err)
    {
        if(!err.status)
        {
            err.status=500;
        }
        if(!err.message)
        {
            err.message="Internal Server Error"
        }
        next(err)
    }
}