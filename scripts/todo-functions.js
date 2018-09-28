'use strict'

//Get saved todos
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')

    try {
        return todosJSON ? JSON.parse(todosJSON): []
    } catch (e) {
        return []
    }

    
}

//Save todos to local storage
const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

const removeTodo = (id) => {
    todos = todos.filter((todo) => todo.id !== id)
}

const toggleCheck = (todo) => {
    todo.completed = !todo.completed
}
//Get dom elements for an individual note
const generateTodoDom = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkBox = document.createElement('input')
    const textEl = document.createElement('span')
    const button = document.createElement('button')

    //Set up todo checkbox
    checkBox.setAttribute('type', 'checkbox')
    checkBox.checked = todo.completed
    checkBox.addEventListener('change', () => {
        toggleCheck(todo)
        saveTodos(todos)
        renderTodos(todos, filters)   
    })
    //Set up todo text
    textEl.textContent = todo.text
    


    //set up container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    //set up remove button
    button.textContent = 'remove'
    button.classList.add('button', 'button--text')
    button.addEventListener('click', (e) => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })



    //append components to container
    todoEl.appendChild(button)
    containerEl.appendChild(textEl)
    containerEl.appendChild(checkBox)
    
    return todoEl
}

//Get Dom elements for list summary
const generateSummaryDom = (incompleteTodos) => {
    const summary = document.createElement('h2')
    summary.classList.add('list-title')

    if (incompleteTodos.length === 1) {
        summary.textContent = `You have ${incompleteTodos.length} last remaining todo`
    } else {
        summary.textContent = `You have ${incompleteTodos.length} remaining todos`
        
    }
    

    return summary
}


//Render application todos based on filters
const renderTodos = (todos, filters) => {
    const todoEl = document.querySelector('#todos')
    const filteredTodos = todos.filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed
        return searchTextMatch && hideCompletedMatch
    })

    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed)


    todoEl.innerHTML = ''
    todoEl.appendChild(generateSummaryDom(incompleteTodos))
    
    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
            todoEl.appendChild(generateTodoDom(todo))
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.classList.add('empty-message')
        emptyMessage.textContent = 'no to-dos to show'
        todoEl.appendChild(emptyMessage)
    }


      
    
}

