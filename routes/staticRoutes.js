const express = require("express");
const router = express.Router();
const Blog = require("../models/blog")

router.get("/",async(req,res)=>{
    const allBlogs = await Blog.find({}).populate("createdBy");
    return res.render("home",{
        user: req.user,
        blogs: allBlogs
    })
})

router.get("/logout",(req,res)=>{
    res.clearCookie("token").redirect("/")
})

// router.get("/myblogs", async(req,res)=>{
//     const myBlogs = await Blog.find({createdBy: req.user._id}).populate("createdBy")
//     return res.render("myblogs",{
//         user: req.user,
//         blogs: myBlogs
//     })
//  })






module.exports = router;
