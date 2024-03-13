// ----------------------------------------------------------
// IMPORTANDO
// ----------------------------------------------------------

import {postsModel} from "../models/posts.model.js";

// ----------------------------------------------------------
// FUNCION - read
// ----------------------------------------------------------

const read = async (req, res) => {
    console.log("posts.controller.read: start");
    try {
        const posts = await postsModel.findAllPosts();
        console.log("Success");
        return res.status(200).json({message:"Success", response: posts});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error", response: error});   
    }
    finally{
        console.log("posts.controller.read: closed");
    }
};

// ----------------------------------------------------------
// FUNCION - readById
// ----------------------------------------------------------

const readById = async (req, res) => {
    console.log("posts.controller.readById: start");
    const id = await req.params.id;
    try {
        const post = await postsModel.findById(id);
        if(!post){
            console.log("Post not found");
            return res.status(404).json({message:"Post not found", response: null});
        }
        else{
            console.log("Success");
            return res.status(200).json({message:"Success", response: post});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error", response: error}); 
    }
    finally{
        console.log("posts.controller.readById: closed");
    }
};

// ----------------------------------------------------------
// FUNCION - create
// ----------------------------------------------------------

const create = async (req, res) => {
    console.log("posts.controller.create: start");
    const post = await req.body;
    let newPost;
    console.log(post);
    if(!post){
        console.log("Post is required");
        return res.status(400).json({message:"Post is required", response: null});
    }
    else if(!post.titulo || !post.img || !post.descripcion){
        console.log("Post data is required");
        return res.status(400).json({message:"Post data is required", response: null});
    }
    else{
        newPost = {titulo: post.titulo, img: post.img, descripcion: post.descripcion, likes: 0};
    }

    try {
        const posted = await postsModel.createPost(newPost);
        console.log("Posted");
        return res.status(201).json({message:"Posted", response: posted});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error", response: error});
    }
    finally{
        console.log("posts.controller.create: closed");
    }
};

// ----------------------------------------------------------
// FUNCION - update
// ----------------------------------------------------------

const update = async (req, res) => {
    console.log("posts.controller.update: start");
    const id = await req.params.id;
    const post = await req.body;
    let newPost;

    if(!post){
        console.log("Post is required");
        return res.status(400).json({message:"Post is required", response: null});
    }
    else{
        newPost = {titulo: post.titulo, img: post.img, descripcion: post.descripcion, likes: post.likes};
    }
    try {
        const posted = await postsModel.updateById(id, newPost);
        if(!posted){
            console.log("Post not found");
            return res.status(404).json({message:"Post not found", response: null});
        }
        else{
            console.log("Updated");
            return res.status(200).json({message:"Updated", response: posted});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error", response: error});
    }
    finally{
        console.log("posts.controller.update: closed");
    }
};

// ----------------------------------------------------------
// FUNCION - remove
// ----------------------------------------------------------

const remove = async (req, res) => {
    console.log("posts.controller.remove: start");
    const id = await req.params.id;
    try {
        const post = await postsModel.removeById(id);
        if(!post){
            console.log("Post not found");
            return res.status(404).json({message:"Post not found", response: null});
        }
        else{
            console.log("Removed");
            return res.status(200).json({message:"Removed", response: post});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error", response: error});
    }
    finally{
        console.log("posts.controller.remove: closed");
    }
};

// ----------------------------------------------------------
// EXPORTANDO
// ----------------------------------------------------------

export const postsController = {read, readById, create, update, remove};