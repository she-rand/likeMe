const { Pool }=require('pg');
const pool= new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'inga',
    database: 'likeme',
    allowExitOnIdle: true
    });

    const getPosts = async () => {
        const result = await pool.query("SELECT * FROM posts")
        return result.rows;
        console.log(result)
        }

    const addPost = async (title, img,description,likes) => {
        const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3, $4)"
        const values = [title, img,description,likes]
        const { rows } = await pool.query(consulta, values)
        return rows[0]
        
        }


module.exports = { getPosts, addPost };