const { Pool }=require('pg');
const pool= new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'inga',
    database: 'likeme',
    allowExitOnIdle: true
    });

    const getPosts = async () => {
        const result = await pool.query("SELECT * FROM posts ORDER BY id")
        return result.rows;
        }

    const addPost = async (title, img,description,likes) => {
        const query = "INSERT INTO posts values (DEFAULT, $1, $2, $3, $4)"
        const values = [title, img,description,likes]
        const { rows } = await pool.query(query, values)
        return rows[0]
        
        }
    const modifyPost = async (id,title,img,description,likes) => {
       
        const query = "UPDATE posts SET titulo=$1, img=$2, descripcion=$3,likes=$4 WHERE id=$5"
        values = [title,img,description,likes,id];
        const {rowCount} = await pool.query(query,values);
        if(rowCount===0){
            throw {code:404, message: "None post updated to this id"}
        }
        
    }
    const getPost=async (id) => {
        
        const query="SELECT * FROM posts WHERE id=$1"
        values = [id];
        const result = await pool.query(query,values);
        if(result.rowCount===0){
            throw {code:404, message: "None post founded to this id"}
        } 
        return result.rows[0];


    }
    const addOneLike= async (identifier) =>{
       const post = await getPost(identifier);
        let likes;
        if (post.likes==null){
            likes=1;
        }else{
            likes=post.likes+1;

        }
        await modifyPost(post.id,post.titulo,post.img,post.descripcion,likes);
    }
    const deletePost = async (id) => {
        const query = "DELETE from posts WHERE id=$1";
        const values = [ id ];
        const {rowCount} =  pool.query(query,values);
        if(rowCount===0){
            throw {code:404, message: "None post was deleted to this id"}
        } 
    }



module.exports = { getPosts, addPost,modifyPost,deletePost,addOneLike };