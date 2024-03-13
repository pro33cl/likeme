// ----------------------------------------------------------
// IMPORTANDO
// ----------------------------------------------------------

import {pool} from "../database/connection.js";

// ----------------------------------------------------------
// FUNCION - findAllPosts
// ----------------------------------------------------------

const findAllPosts = async function(){
    console.log("posts.model.findAllPosts: start");
    const query = 'SELECT * FROM posts ORDER BY id ASC';
    const {rows} = await pool.query(query);
    console.log("posts.model.findAllPosts: closed");
    return rows;
};

// ----------------------------------------------------------
// FUNCION - findById
// ----------------------------------------------------------

const findById = async function(id){
    console.log("posts.model.findById: start");
    const query = "SELECT * FROM posts WHERE id = $1";
    const values = [id];
    const {rows} = await pool.query(query, values);
    console.log(rows);
    console.log("posts.model.findById: closed");
    return rows[0];
};

// ----------------------------------------------------------
// FUNCION - createPost
// ----------------------------------------------------------

const createPost = async function(post){
    console.log("posts.model.createPost: start");
    const query = "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [post.titulo, post.img, post.descripcion, post.likes];
    const {rows} = await pool.query(query, values);
    console.log("posts.model.createPost: closed");
    return rows[0]; 
};

// ----------------------------------------------------------
// FUNCION - updateById
// ----------------------------------------------------------

const updateById = async function(id, post){
    console.log("posts.model.updateById: start");
    const columns = ['titulo', 'img', 'descripcion', 'likes'];
    const values = [[post.titulo, id], [post.img, id], [post.descripcion, id], [post.likes, id]];
    values.forEach(async (element, index)=>{
        if(element[0]){
            let query = `UPDATE posts SET ${columns[index]} = $1 WHERE id = $2`;
            let {rows} = await pool.query(query, element);
            console.log(rows[0]);
        }
    });
    const response = await findById(Number(id));
    console.log("posts.model.updateById: closed");
    return response;
};

// ----------------------------------------------------------
// FUNCION - removeById
// ----------------------------------------------------------

const removeById = async function(id){
    console.log("posts.model.removeById: start");
    const query = "DELETE FROM posts WHERE id = $1 RETURNING *";
    const values = [id];
    const {rows} = await pool.query(query, values);
    console.log("posts.model.removeById: closed");
    return rows[0];
};

// ----------------------------------------------------------
// EXPORTANDO
// ----------------------------------------------------------

export const postsModel = {findAllPosts, findById, createPost, updateById, removeById};