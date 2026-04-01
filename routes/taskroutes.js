const express= require('express');
const pool=require('../db/db');
const router=express.Router();

router.delete('/tasks',async (req,res)=>{
    try{
        await pool.query('delete from tasks;');

        res.json({
            message:"Table cleared!"
        });

    }
    catch(err){
        console.error("Error:",err);
    }

});

router.post('/tasks/add-task', async(req,res)=>{
    const {name,due}=req.body;

    try{
        const result= await pool.query(
            'insert into tasks values($1,$2,$3) returning *;',
            [name,due,"false"]
        );
        console.log(name,due);

        res.json({
            message:"Insertion success i guess,"
        });

    }
    catch(err){
        console.error("Error:",err);
    }

});

module.exports=router;