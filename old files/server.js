const http = require('http');
const fs = require('fs');
const server= http.createServer(function(req,res){ 
   
    if(req.url=="/"){
        fs.readFile("index.html",(error,data) =>{
            if(error){
                res.writeHead(404,{'content-type':'text/plain'});
                res.end("File not Found;");
            }
            else{
                res.writeHead(200,{'content-type':"text/html"});
                res.end(data);
            }
        })
    }
    else if(req.url=="/css.css"){
        fs.readFile("css.css",(error,data) =>{
            if(error){
                   res.writeHead(404,{'content-type':'text/plain'});
                   res.end("File not Found;");
            }
            else{
                   res.writeHead(200,{'content-type':"text/css"});
                   res.end(data);
            }
        })        
    }
    else if(req.url=="/java.js"){
        fs.readFile("java.js",(error,data) =>{
            if(error){
                   res.writeHead(404,{'content-type':'text/plain'});
                   res.end("File not Found;");
            }
            else{
                   res.writeHead(200,{'content-type':"application/javascript"});
                   res.end(data);
            }
        })
}

    });

server.listen(3800,function(error){
    if(error){
        console.log("Error in server setup");
    }   
    else{
        console.log("Server is listening on port 3800");
    }
});