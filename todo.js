const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosUI)
    secondCardBody.addEventListener("click",deletetodo);
}
function deletetodo(e){
    if(e.target.classname === "fa fa-remove"){
        e.target.parentelement.parentelement.remove();
        deleteTodoFromStrorage(e.target.parentelement.parentelement.textContent);
        showAlert("success","Todo başarıyla silindi...");
    }
}
function deleteTodoFromStrorage(deletetodo){
let todos = getTodosFromStorage();
todos.foreach(function(todo){
    if(todo === deletetodo){
        todos.splice(index,1); // Array'den değer silme.
    }
});
localStorage.setItem("todos",JSON.stringify(todos));


}
function loadAllTodosUI(){
let todos = getTodosFromStorage();
todos.foreach(function(todo){
    addTodoToUI(todo);
})

}
function addTodo(e){

const newTodo = todoInput.value;

if(newTodo===""){

  /*  <div class="alert alert-danger" role="alert">
  <strong>Oh snap!</strong> Change a few things up and try submitting again.
</div> */

    showAlert("danger","lütfen bir todo girin...");
}
else{
    addTodoToUI(newTodo);
    addTodoStorage(newTodo);
    showAlert("success","todo başarıyla eklendi");
}


    e.preventDefault();
}
function getTodosFromStorage(){
    let todos;
    if(localStorage.getItem("todos") === null){
    todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    return todos;
}
function addTodoStorage(newTodo){
let todos = getTodosFromStorage();
todos.push(newTodo);
localStorage.setItem("todos",JSON.stringify(todos));

}
function showAlert(type,message){
const alert = document.createElement("div");
alert.className = 'alert alert-danger';
alert.textContent = message;
firstCardBody.appendChild(alert);
setTimeout(function(){
alert.remove();

},1000)


}

function addTodoToUI(newTodo){
/*
<li class="list-group-item d-flex justify-content-between">
                            Todo 1
                            <a href = "#" class ="delete-item">
                                <i class = "fa fa-remove"></i>
                            </a>

                        </li>
*/
const listItem = document.createElement("li");
const link = document.createElement("a");
link.href = "#";
link.className = "delete-item";
link.innerHTML = "<i class = 'fa fa-remove'></i> ";

listItem.className = "list-group-item d-flex justify-content-between";
listItem.appendChild(document.createTextNode(newTodo));
listItem.appendChild(link);
todoList.appendChild(listItem);
todoInput.value = "";

}
