const express = require("express")
const router = express.Router();
const multer  = require('multer')
const path = require("path")
const Blog = require("../models/blog");
const Comment = require("../models/comment");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve("./public/uploads"))
    },
    filename: function (req, file, cb) {
      const filename = `${Date.now()}-${file.originalname}`
      cb(null, filename)
    }
  })
  
  const upload = multer({ storage: storage })

router.get("/add-new",(req,res)=>{
    return res.render("addBlog",{
        user: req.user
    })
})

router.post("/",upload.single('coverImage'),async(req,res)=>{
    const {title , body}= req.body
    await Blog.create({
        title,
        body,
        coverImageUrl: `/uploads/${req.file.filename}`,
        createdBy: req.user._id
    }) 
    return res.redirect("/")
})

router.get("/:id",async(req,res)=>{
  const blog = await Blog.findById(req.params.id)
  const comments = await Comment.find({blogId: req.params.id}).populate("createdBy")
  return res.render("blog",{
    user:req.user,
    blog,
    comments,
 })
})

router.post("/comment/:blogId",async(req,res)=>{
  const blogId = req.params.blogId
  await Comment.create({
    content: req.body.comment,
    blogId,
    createdBy:req.user._id
   })
   
   return res.redirect(`/blog/${blogId}`)
})

module.exports = router