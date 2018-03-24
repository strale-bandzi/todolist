var todoList = {
    todos: [],
    addTodo: function(newOne){
      this.todos.push({
        textTodo: newOne, 
        completed: false
        
      });
    },
    changeTodo: function(position, newTextTodo){
      // this.todos[position] = val;
      this.todos[position].textTodo = newTextTodo;
      }, 
    delTodo: function(pos){
      this.todos.splice(pos, 1);
      },
    toggleCompleted: function(position){
      var todo = this.todos[position];
      todo.completed = !todo.completed;
      },
    toggleAll: function(){
      // case1: if everything is true make all false
      var completedTodos = 0;
      var totalTodos = this.todos.length;
        
        this.todos.forEach(function(todo){
              if(todo.completed === true){
                completedTodos++;
              }
          });
      
     this.todos.forEach(function(todo){
       if(completedTodos === totalTodos){
         todo.completed = false;
       }
       else{
         todo.completed = true;
       }
     });
      
      
    }
    
};

var handlers = {
  addTodo: function(){
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function(){
    var changeTodoPosition = document.getElementById('changeTodoPosition');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    
    todoList.changeTodo(changeTodoPosition.valueAsNumber, changeTodoTextInput.value);
    changeTodoPosition.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function(position){
    todoList.delTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function(){
    var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
    view.displayTodos();
  },
  toggleAll: function(){
    todoList.toggleAll();
    view.displayTodos();
  }
};

var view = {
  displayTodos: function(){
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';

    todoList.todos.forEach(function(todo, position){
      
      var todosLi = document.createElement('li');
      var todoTextWithCompletion = '';
    
        if(todo.completed === true){
          todoTextWithCompletion = '(x) ' + todo.textTodo;
        }else{
          todoTextWithCompletion = '( ) ' + todo.textTodo;
        }
      
      todosLi.id = position;
      todosLi.textContent = todoTextWithCompletion;
      todosLi.appendChild(this.deleteButton());
      todosUl.appendChild(todosLi);
    }, this);
    
  },
  deleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';
    return deleteButton;
  },
  setUpEventListeners: function(){
      var todoUl = document.querySelector('ul');
  
      todoUl.addEventListener('click', function(event){
      // console.log(event.target.parentNode.id);
      
      var elementClicked = event.target; // gives us tag(element data)
      
        if(elementClicked.className === 'delete-btn'){ //if class name is delete btn do next
         var pos = parseInt(elementClicked.parentNode.id); // moves to its parent which is li, grabs id, converts to number
         handlers.deleteTodo(pos); //runs deleteTodo function in handlers object 
        }
        
    });
  }
};

view.setUpEventListeners(); // in order to work we need to call our new function



