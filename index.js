class TodoApp {
    constructor(){
        this.todos = JSON.parse(localStorage.getItem('todos')) || []
        this.title = ''
        this.text = ''
        this.id =""

        this.$form = document.querySelector('#form')
        this.$todos = document.querySelector("#todos")
        this.$todoTitle = document.querySelector('#todo-title')
        this.$todoText = document.querySelector('#todo-text')
        this.$placeholder = document.querySelector('#placeholder')

        this.addEventListener()
        this.render()
    }

    
    addEventListener(){
        document.body.addEventListener('click', (event)=>{
            this.selectTodo(event)
            this.strikeThroughTodo(event)
        })
        document.body.addEventListener('dblclick',(event) =>{
            this.deleteTodo(event)
        })

        this.$form.addEventListener('submit', event => {
            event.preventDefault()            
            const title = this.$todoTitle.value.trim()
            const text = this.$todoText.value.trim()
            
            if (title || text) {
                console.log('has value')
                this.addTodo({ title, text })
            } else {
                console.log('No value entered')
            }
        })
        

    }

    addTodo({title,text}){
        const newTodo ={
            title,
            text,
            id: this.todos.length > 0 ? this.todos[this.todos.length -1].id + 1 : 1
        }
        this.todos = [...this.todos, newTodo]
        this.$todoTitle.value =""
        this.$todoText.value =""

        this.render()
    }

    selectTodo(event){
        const $selectedTodo = event.target.closest('.todo')
        if(!$selectedTodo)return
        const [$todoTitle,$todoText] = $selectedTodo.children
        this.title = $todoTitle.innerText
        this.text = $todoText.innerText
        this.id = $selectedTodo.dataset.id
        console.log(`you clicked todo: ${this.title}`)
    }

    strikeThroughTodo(e){
        const $selectedTodo = e.target.closest('.todo')
        if(!$selectedTodo)return
        const id = Number($selectedTodo.dataset.id)
       this.todos.forEach(todo => {
        if(todo.id === id) $selectedTodo.style.textDecoration = "line-through";
       })
        
    }

    deleteTodo(e){
        const $selectedTodo = e.target.closest('.todo')
        if(!$selectedTodo)return
        const id = Number($selectedTodo.dataset.id)
        this.todos = this.todos.filter(todo => todo.id !== id)
        this.render()
    }
    
    displayTodos(){
        const hasTodos = this.todos.length > 0
        this.$placeholder.style.display = hasTodos ? "none" : "flex"
        this.$todos.innerHTML = this.todos.map((todo) => `
            <div class='todo' data-id=${todo.id}>
                <h1 id=${todo.title &&'todo-title'}>${todo.title}</h1>
                <p id=${todo.text &&'todo-text'}>${todo.text}</p>
                
            </div>
        
        `)
        .join("")
    }

    saveTodos(){
        localStorage.setItem('todos', JSON.stringify(this.todos))
    }

    render(){
        this.saveTodos()
        this.displayTodos()
    }
    
    
}

new TodoApp()