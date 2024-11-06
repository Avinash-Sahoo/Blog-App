const express = require("express");
const app = express();
const path = require("path")
const {mongodbConnect} = require("./connection")
const staticRoutes = require("./routes/staticRoutes")
const userRoutes = require("./routes/user")
const cookieParser = require('cookie-parser')
const {checkAuthenticationCookie} = require("./middlewares/auth")
const blogRouter = require("./routes/blog")
const myblogRouter = require("./routes/myblogs")

app.use(express.urlencoded({extended : false}))
app.use(cookieParser())
app.use(checkAuthenticationCookie("token"))
app.use(express.static(path.resolve("./public")))

app.set("view engine", "ejs")
app.set("views",path.resolve("./views"))

mongodbConnect("mongodb://127.0.0.1:27017/blogify")

app.use("/",staticRoutes)
app.use("/user",userRoutes)
app.use("/blog",blogRouter)
app.use("/myblogs",myblogRouter)



app.listen(3000,()=>console.log("Server Started..."))