const express=require('express');
const pool=require('./db/db');
const app=express();
app.use(express.json());

app.use(express.static('public'));

app.get('/tasks',async (req,res)=>{
    try{
        const result= await pool.query('select * from tasks');
        res.json(result.rows);

    }
    catch(err){
        console.error(err);
        res.status(500).send('ERROR');
    }
})

app.listen(4500,()=>{
    console.log("Server running!!yay!!");
}
)