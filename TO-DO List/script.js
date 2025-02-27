document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todoForm');
    const todoInput = document.getElementById('todoInput');
    const todoList = document.getElementById('todoList');
    const emptyMessage = document.getElementById('emptyMessage');
  
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
  
    function saveTodos() {
      localStorage.setItem('todos', JSON.stringify(todos));
      updateEmptyMessage();
    }
  
    function updateEmptyMessage() {
      emptyMessage.style.display = todos.length === 0 ? 'block' : 'none';
    }
  
    function createTodoElement(todo) {
      const li = document.createElement('li');
      li.className = 'todo-item';
      li.innerHTML = `
        <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
        <span class="todo-text ${todo.completed ? 'completed' : ''}">${todo.text}</span>
        <button class="delete-button">Delete</button>
      `;
  
      const checkbox = li.querySelector('.todo-checkbox');
      const deleteButton = li.querySelector('.delete-button');
      const todoText = li.querySelector('.todo-text');
  
      checkbox.addEventListener('change', () => {
        todo.completed = checkbox.checked;
        todoText.classList.toggle('completed', todo.completed);
        saveTodos();
      });
  
      deleteButton.addEventListener('click', () => {
        todos = todos.filter(t => t !== todo);
        li.remove();
        saveTodos();
      });
  
      return li;
    }
  
    function renderTodos() {
      todoList.innerHTML = '';
      todos.forEach(todo => {
        todoList.appendChild(createTodoElement(todo));
      });
      updateEmptyMessage();
    }
  
    todoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = todoInput.value.trim();
      
      if (text) {
        const todo = {
          id: Date.now(),
          text,
          completed: false
        };
        
        todos.push(todo);
        todoList.appendChild(createTodoElement(todo));
        saveTodos();
        
        todoInput.value = '';
      }
    });
  
    
    renderTodos();
  });
  