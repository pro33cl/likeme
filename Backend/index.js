// ----------------------------------------------------------
// IMPORTANDO
// ----------------------------------------------------------

import express from 'express';
import cors from 'cors';
import {findAllPosts, createPost} from './models/posts.model.js';

// ----------------------------------------------------------
// DECLARACION DE VARIABLES
// ----------------------------------------------------------

const app = express();
const server = "http://localhost";
const port = 3000;
const routes = ["/","/posts"];

// ----------------------------------------------------------
// MIDDLEWARES
// ----------------------------------------------------------

app.use(express.json());
app.use(cors());

// ----------------------------------------------------------
// LEVANTAR SERVIDOR
// ----------------------------------------------------------

app.listen(port, ()=>{
    console.log(`SERVER BACKEND ON, PORT: ${port}`)
    console.log(`Server: ${server}:${port}`)
});

// ----------------------------------------------------------
// ROUTE: "/"
// ----------------------------------------------------------

app.get(routes[0], (req, res)=>{
    console.log(`GET: ${routes[0]}`);
    let response = {message: `Welcome to Server: ${server}:${port}`};
    console.log(`GET: ${routes[0]} , Finished`);
    return res.status(200).json(response);
});

// ----------------------------------------------------------
// ROUTE: "/posts"
// ----------------------------------------------------------

app.get(routes[1], async (req, res)=>{
    let posts;
    console.log(`GET: ${routes[1]}`);
    try {
        posts = await findAllPosts();
        return res.status(200).json(posts); 
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal server error"});
    }
    finally{
        console.log(`GET: ${routes[1]} , Finished`);
    } 
});

app.post([routes[1]], async(req, res)=>{
    let post;
    let response;
    console.log(`POST: ${routes[1]}`);
    try {
        post= req.body;
        if(!post){
            console.log("Post is required");
            return res.status(400).json({message: "Post is required"});
        }
        else{
            response = await createPost(post);
            if(response.message == "Posted" ){
                console.log("Posted");
                return res.status(201).json({message: response.message, posted: response.posted});
            }
            else{
                console.log("Not posted");
                return res.status(400).json({message: response.message});
            }  
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal server error"});
    }
    finally{
        console.log(`POST: ${routes[1]} , Finished`);
    } 
});