const {getPosts, addPost}=require("./queries");

const express=require('express');
const cors=require('cors');
const app=express();

app.use(express.json());
app.use(cors())

app.listen(3000, console.log("Server on"));

app.get("/posts",async(req, res)=>{
    try {
        const posts=await getPosts();
        return     res.json(posts);
    
        } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
        }     

});


app.post("/posts",async(req, res)=>{
 const {title, img,description,likes} =  req.body;
 if (!title) {
    return res.status(400).json({ message: "Title is required" });
}
try {
    const post=await addPost(title, img,description,likes);    
    return res.send("Post added!");
    } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
    }
        
});