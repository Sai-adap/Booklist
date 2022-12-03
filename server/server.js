const express = require('express');
const mongoose = require('mongoose');
const userModel = require('./model/user');
const Book = require("./model/Book")
const {checkExistingUser, generatePasswordHash} = require("./utility");
const jwt = require('jsonwebtoken');
const multer = require("multer")();
const bcrypt = require("bcryptjs");
const salt=10;
const cors = require('cors')
const app = express();
require('dotenv').config();
app.use(multer.array());

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));

app.listen(3002,(err)=>{
    if(!err) {
        console.log("Server started at  port 3002")
    } else {
        console.log(err);
    }
});

mongoose.connect("mongodb+srv://adapasai:adapasai@cluster0.0menc.mongodb.net/Booklist?retryWrites=true&w=majority",(data)=>{
    console.log("successfully connected to db");

},(err)=>{
    console.log(err)
});
app.post("/register", async (req, res)=> {
    if(await checkExistingUser(req.body.username)) {
        res.status(400).send("email exist. Please try with different email");
    } else {
        generatePasswordHash(req.body.password).then((passwordHash)=> {
            userModel.create({username: req.body.username,password: passwordHash})
                            .then(()=> { 
                                res.status(200).send(`${req.body.username} added successfully`); 
                            }).catch((err)=> {
                                res.status(400).send(err.message)
            })
        });
    }
    
});

app.post("/login", (req, res)=> {
    userModel.find({username: req.body.username}).then((userData)=> {
        
        if(userData.length) {
            bcrypt.compare(req.body.password, userData[0].password).then((val)=> {
                if(val) {
                    const authToken = jwt.sign(userData[0].username, process.env.SECRET_KEY);
                    res.status(200).send({authToken});
                } else {
                    console.log("Invalid Password")
                    res.status(400).send("Invalid Password");
                }
            })
        } else {
            res.status(400).send("Unauthorized user");
        }
    })
});

app.get("/books",async (req, res, next) => {
    let books;
    try {
      books = await Book.find();
    } catch (err) {
      console.log(err);
    }
  
    if (!books) {
      return res.status(404).json({ message: "No products found" });
    }
    return res.status(200).json({ books });
  });
app.get("/books/:id", async (req, res, next) => {
    const id = req.params.id;
    let book;
    try {
      book = await Book.findById(id);
    } catch (err) {
      console.log(err);
    }
    if (!book) {
      return res.status(404).json({ message: "No Book found" });
    }
    return res.status(200).json({ book });
  });

  app.post("/books",async (req, res, next) => {
    const { name, author, description, price, available, image } = req.body;
    let book;
    try {
      book = new Book({
        name,
        author,
        description,
        price,
        available,
        image,
      });
      await book.save();
    } catch (err) {
      console.log(err);
    }
  
    if (!book) {
      return res.status(500).json({ message: "Unable To Add" });
    }
    return res.status(201).json({ book });
  });

app.put("/books/:id",async (req, res, next) => {
    const id = req.params.id;
    const { name, author, description, price, available, image } = req.body;
    let book;
    try {
      book = await Book.findByIdAndUpdate(id, {
        name,
        author,
        description,
        price,
        available,
        image,
      });
      book = await book.save();
    } catch (err) {
      console.log(err);
    }
    if (!book) {
      return res.status(404).json({ message: "Unable To Update By this ID" });
    }
    return res.status(200).json({ book });
  });

app.delete("/books/:id",async (req, res, next) => {
    const id = req.params.id;
    let book;
    try {
      book = await Book.findByIdAndRemove(id);
    } catch (err) {
      console.log(err);
    }
    if (!book) {
      return res.status(404).json({ message: "Unable To Delete By this ID" });
    }
    return res.status(200).json({ message: "Product Successfully Deleted" });
  })