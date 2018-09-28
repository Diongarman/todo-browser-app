'use strict'

let todos = getSavedTodos();

const filters = {
    searchText: '',
    hideCompleted: false
}

//initialization
renderTodos(todos, filters)

document.querySelector('#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})


document.querySelector('#add-todo-form').addEventListener('submit', (e) => {
    const text = e.target.elements.todoText.value.trim()
    e.preventDefault()

    if (text) {
        const newTodo = {
            id: uuidv4(),
            text,
            completed: false
        }
    
        e.target.elements.todoText.value = ''
        todos.push(newTodo)
    
        saveTodos(todos)
        renderTodos(todos, filters)
    } 

})

document.querySelector('#hide-completed').addEventListener('change', (e) => {
    filters.hideCompleted =  e.target.checked
    renderTodos(todos, filters)
})