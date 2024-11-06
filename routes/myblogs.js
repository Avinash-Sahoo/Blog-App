const express = require("express")
const router = express.Router()
const Blog = require("../models/blog")

router.get("/", async(req,res)=>{
    const myBlogs = await Blog.find({createdBy: req.user._id}).populate("createdBy")
    return res.render("myblogs",{
        user: req.user,
        blogs: myBlogs
    })
 })

 router.get("/delete/:blogId",async(req,res)=>{
    const blogId = req.params.blogId
    await Blog.findByIdAndDelete(blogId)
    return res.redirect("/myblogs")
 })

 router.get("/update/:blogId",(req,res)=>{
    const blogId = req.params.blogId
    return res.render("update",{
        user:req.user,
        blogId
    })
 })

 router.post("/update/:blogId",async(req,res)=>{
    const {title , body} = req.body
    const blogId = req.params.blogId
    await Blog.findByIdAndUpdate(blogId,{title , body})
    return res.redirect("/myblogs")
 })



 module.exports = router;


