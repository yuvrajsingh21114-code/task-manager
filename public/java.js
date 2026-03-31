window.onload = loadTasks;

//add item function block
function additem(){

let input=document.getElementById("itemname");
let itemname=input.value;

let input2=document.getElementById("duedate");
let duedate=input2.value;

if(itemname==""){
    if(duedate==""){
        console.log("Error: Empty name and due date");
        alert("Please Enter Name and Due Date");
    }
    else{
        console.log("Error: Empty name");
        alert("Please Enter Name");
    }
}
else if(duedate==""){
    console.log("Error: Empty due date");
    alert("Please Enter Due Date");
}
else{

let tasks=localStorage.getItem("tasks");

if (tasks == null) {
    tasks = [];
} else {
    tasks = JSON.parse(tasks);
}

tasks.push({name: itemname, due: duedate, complete:"f"});
localStorage.setItem("tasks", JSON.stringify(tasks));
console.log("Inserted: "+itemname+" :: "+duedate);

let item=document.createElement("li");
item.innerHTML=" Name: "+itemname+"  Due on: "+duedate+"<br>";

let del=document.createElement("button");
del.type="button";
del.onclick=function(){
    item.remove();
 
    let tasks=localStorage.getItem("tasks");

    if (tasks == null) {
        tasks = [];
    } else {
    tasks = JSON.parse(tasks);
   }
    
    tasks=tasks.filter(task => task.name !== itemname);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("Deleted item: "+itemname);

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

document.getElementById("list1").appendChild(item);
item.appendChild(del);
item.appendChild(comp);

input.value="";
input.focus();
input2.value="";
}
}


//complete function block

function cln(){
let check=confirm("Are you sure you want to clear all tasks?");
if(check==true){
localStorage.clear();
window.location.reload();
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

