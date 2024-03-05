// ----------------------------------------------------------
// IMPORTANDO
// ----------------------------------------------------------

import {pool} from "../database/connection.js"

// ----------------------------------------------------------
// FUNCION - findAllPosts
// ----------------------------------------------------------

export const findAllPosts = async function(){
    const query = "SELECT * FROM posts";
    const {rows} = await pool.query(query);
    return rows;
}

// ----------------------------------------------------------
// FUNCION - createPost
// ----------------------------------------------------------

export const createPost = async function(post){
    if(post.titulo && post.img && post.descripcion){
        const query = "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *";
        const {rows} = await pool.query(query,[post.titulo, post.img, post.descripcion, 0]);
        return {message: "Posted", posted: rows[0]};
    }
    else{
        return {message: "Not posted"};
    }  
}

