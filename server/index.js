const express = require('express')
const app = express();
const cors = require('cors');
const User = require("./Model/User")
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser")
const multer  = require('multer')
const uploadMiddleware = multer({ dest: 'uploads/' })
const fs = require("fs")
const Post = require("./Model/PostModel.js")

app.use('/uploads' , express.static(__dirname + '/uploads'));
const secret = "skdrfuhq43r732hef734gyu8234sdfvsdfgsdfsdfgsdf4";
mongoose.connect("mongodb+srv://kundanlal96580:P3kFgKWNGvqxDB8k@cluster0.dlkxxnw.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('Error connecting to MongoDB:', err);
});


app.use(cors({credentials : true , origin : "http://localhost:3000"}));
app.use(express.json());
app.use(cookieParser());
var salt = bcrypt.genSaltSync(10);
const PORT = 8000;

app.post("/register" , async (req, res) => {
    const {username ,password } = req.body;
    try{
        const UserDoc = await User.create({username ,password:bcrypt.hashSync(password , salt)})
        res.json(UserDoc);
    }catch(e){
        console.log(e);
    }
});

app.post("/login" , async (req, res) => {
    const {username ,password } = req.body;
        const UserDoc = await User.findOne({username});
        const matched =  bcrypt.compareSync(password, UserDoc.password); 
   
        if(matched){
            jwt.sign({username , id : UserDoc._id} , secret , {} ,(err, token) => {
                if (err) throw err;
                res.cookie('token' , token);
                res.json('ok cookie');

            })
        }else{
            res.status(400).json('invalid crenentials');
        }
});


app.get('/profile' , (req , res) => {
    const {token} = req.cookies;
    jwt.verify(token , secret , {} , (err , info) => {
        if (err) throw err;
        res.json(info);
    })
    res.json(req.cookies);
});

app.post('/logout' ,(req, res) => {
    const {token} = req.cookies;
    res.cookie('token' , "");
    res.json('ok cookie removed'); 
})

app.post('/post' ,  uploadMiddleware.single('file'), async (req, res) => {
    const {originalname,path} = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length -1]
    const newPath = path+"."+ext;
    fs.renameSync(path , newPath )

    const {token} = req.cookies;
    jwt.verify(token , secret , {} , async (err , info) => {
        if (err) throw err;

        const {title, summary , content} = req.body;
        const PostDoc = await Post.create({
            title,
            summary,
            content,
            cover:newPath,
            author:info.id,
        });

        res.json(PostDoc)
    })
})

app.get("/post", async (req,res) => {
  
    res.json(await Post.find()
    .populate('author' , ['username'])
    .sort({createdAt: -1})
    .limit(20)
    );
})

app.get('/post/:id', async (req , res) => {
    const {id} = req.params;
    const resp = await Post.findById(id).populate('author' , ['username']);
    res.json(resp);
})

app.put("/post" , uploadMiddleware.single('file') , async (req , res ) => {
    let newPath = ''; 
    if(req.file){
        const {originalname,path} = req.file;
        const parts = originalname.split(".");
        const ext = parts[parts.length - 1]
        newPath = path+"."+ext;
        fs.renameSync(path , newPath )
    }
    const { token } = req.cookies;

jwt.verify(token, secret, {}, async (err, info) => {
    if (err) {
        return res.status(401).json("Invalid token"); // Handle invalid token
    }

    const { id, title, summary, content } = req.body;

    try {
        const post = await Post.findById(id);
        console.log(post);
        if (!post) {
            return res.status(404).json("Post not found");
        }

        const isAuthor = JSON.stringify(post.author) === JSON.stringify(info.id);

        console.log(isAuthor);
        if (!isAuthor) {
            return res.status(400).json("You are not the author of this post");
        }

        const update = {
            title,
            summary,
            content,
            cover: newPath ? newPath : post.cover,
        };

        const updatedPost = await Post.updateOne({ _id: id }, update);

        console.log(updatedPost);

        if (updatedPost.modifiedCount === 1) {
            const updatedPostDoc = await Post.findById(id);
            res.json(updatedPostDoc);
        } else {
            return res.status(500).json("Failed to update post");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
});

app.listen(PORT , () => {
    console.log(`Server is runnig on ${PORT} number.`)
})



