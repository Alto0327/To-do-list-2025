const inputEl = document.getElementById('input-el')
const inputBtn = document.getElementById('input-btn')
const deleteBtn = document.getElementById('delete-btn')
const UlEl = document.getElementById('ul-el')

let todo = []

inputEl.addEventListener('keypress', (press) => press.key === 'Enter' && inputBtn.click())

inputBtn.addEventListener('click', () => {
    inputEl.value.trim() !== '' 
    ? (
        todo.push(inputEl.value),
        inputEl.value="",
        addToDo(todo)
    ) : null
})

function addToDo(todos){
    console.log('function activated')
    let todoTasks =""
    for(let i = 0; i < todo.length; i++){
        todoTasks += `
            <li class="todo-item">
                ${todos[i]}
            </li>
        `
    }
    UlEl.innerHTML = todoTasks

    const listItems = document.querySelectorAll(".todo-item");
    listItems.forEach((li) => {
        li.addEventListener("click", function () {
            this.remove(); 
        });
    });
}
