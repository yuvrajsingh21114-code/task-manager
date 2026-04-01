window.onload = loadTasks;

//add item function block
async function additem(){

let input=document.getElementById("itemname");
let itemname=input.value;

let input2=document.getElementById("duedate");
let duedate=input2.value;

if(!itemname){
    alert("Task name empty");
    return;
}
if(!duedate){
    alert("Duedate empty");
    return;
}

try{
    const res= await fetch("http://localhost:4500/tasks/add-task",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            name:itemname,
            due:duedate

        })
    });

    const data = await res.json();
    console.log(data.message);

    window.location.reload();
}
catch(err){
    console.error("Error:",err);
}

}


//complete function block

async function cln(){
let check=confirm("Are you sure you want to clear all tasks?");
if(check==true){

    try{
        const res=await fetch('/tasks',{
            method:"DELETE"
        });

        const data=await res.json();
        console.log(data.message);

        window.location.reload();

    }
    catch(err){
        console.error("Error:",err);
    }
}
}


//loading tasks from local storage

async function loadTasks(){
    console.log("Loading tasks from localStorage...");

    try{

        const response=await fetch('http://localhost:4500/tasks');
        const tasks= await response.json();

        for(let i=0; i<tasks.length; i++){
        let itemname=tasks[i].name;
        let duedate=tasks[i].date;

        let item=document.createElement("li");
        item.innerHTML=" Name: "+itemname+"  Due on: "+duedate+"<br>";

        let del=document.createElement("button");
        del.type="button";
        del.onclick=function(){
            item.remove();
            console.log("Deleted item: "+itemname);

            let tasks=localStorage.getItem("tasks");

            if (tasks == null) {
                tasks = [];
            } else {
                tasks = JSON.parse(tasks);
            }
    
            tasks=tasks.filter(task => task.name !== itemname);
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
        del.textContent="Delete";

        let comp=document.createElement("button");
        comp.type="button"; 
        comp.onclick=function(){
            item.style.color="green";
            
            let tasks=localStorage.getItem("tasks");

            if (tasks == null) {
               tasks = [];
            } else {
            tasks = JSON.parse(tasks);
           }

            tasks.forEach(task =>{
            if(task.name===itemname){
                task.complete="t";
            }
           });
            localStorage.setItem("tasks", JSON.stringify(tasks));

            console.log("Completed item: "+itemname);
        }
        comp.textContent="Complete";

        
        if(tasks[i].complete == "true" ){
            item.style.color="green";
        }

        document.getElementById("list1").appendChild(item);
        item.appendChild(del);
        item.appendChild(comp);

        if(i===tasks.length-1){
            console.log("All tasks loaded.");
        }

    }

    }
    catch(err){
        console.error('Error loadind tasks:', err);
    }

    
    

}

