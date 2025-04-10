// we are going to write Sample to-do items

const todos = [
  {
    title: "New Additions",
    description: "To stay representative of framework & new example apps.",
    date: "July 7, 2023"
  },
  {
    title: "New Additions",
    description: "To stay representative of framework & new example apps.",
    date: "July 7, 2023"
  },
  {
    title: "New Additions",
    description: "To stay representative of framework & new example apps.",
    date: "July 7, 2023"
  },
  {
    title: "New Additions",
    description: "To stay representative of framework & new example apps.",
    date: "July 7, 2023"
  },
  {
    title: "New Additions",
    description: "To stay representative of framework & new example apps.",
    date: "July 7, 2023"
  },
  {
    title: "New Additions",
    description: "To stay representative of framework & new example apps.",
    date: "July 7, 2023"
  },
  {
    title: "New Additions",
    description: "To stay representative of framework & new example apps.",
    date: "July 7, 2023"
  },
  {
    title: "New Additions",
    description: "To stay representative of framework & new example apps.",
    date: "July 7, 2023"
  },
];

const todoList = document.getElementById('todoList');
const searchInput = document.getElementById('search');
const editorContent = document.querySelector('.editor-content');
const noteTitle = document.getElementById('noteTitle');
const trashBtn = document.querySelector('.trash');

let currentIndex = 0;

// use of some text format like left, right......
const editor = document.querySelector(".editor-content");

document.getElementById("alignLeft").addEventListener("click", () => {
  editor.style.textAlign = "left";
});

document.getElementById("alignCenter").addEventListener("click", () => {
  editor.style.textAlign = "center";
});

document.getElementById("alignRight").addEventListener("click", () => {
  editor.style.textAlign = "right";
});

// color button 
const colorBtn = document.getElementById("colorPickerBtn");
const colorInput = document.getElementById("colorInput");

colorBtn.addEventListener("click", () => {
  colorInput.click(); // opens the color picker
});

colorInput.addEventListener("input", () => {
  const color = colorInput.value;
  document.execCommand("foreColor", false, color);
});


// Render all to-dos
function renderTodos(filter = "") {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    if (
      todo.title.toLowerCase().includes(filter.toLowerCase()) ||
      todo.description.toLowerCase().includes(filter.toLowerCase())
    ) {
      const li = document.createElement("li");
      li.className = "todo-item" + (index === currentIndex ? " active" : "");
      li.innerHTML = `
        <div class="title">${todo.title}</div>
        <div class="desc">${todo.description}</div>
        <div class="date">${todo.date}</div>
      `;
      li.addEventListener("click", () => selectTodo(index));
      todoList.appendChild(li);
    }
  });
}

// Select a to-do ---------
function selectTodo(index) {
  currentIndex = index;
  const todo = todos[index];
  noteTitle.textContent = todo.title;
  editorContent.innerText = todo.description;
  renderTodos(searchInput.value);
}

// Delete selected to-do -----------
trashBtn.addEventListener("click", () => {
  if (todos.length > 0) {
    todos.splice(currentIndex, 1);
    currentIndex = 0;
    renderTodos();
    if (todos.length > 0) {
      selectTodo(0);
    } else {
      noteTitle.textContent = "";
      editorContent.innerText = "";
    }
  }
});

// Toolbar button actions -------
document.querySelectorAll(".toolbar button").forEach((button, i) => {
  button.addEventListener("click", () => {
    document.execCommand(getCommand(i), false, null);
  });
});

// Commands for toolbar ----------
function getCommand(index) {
  const commands = ["bold", "underline", "justifyLeft", "insertUnorderedList", "insertOrderedList", "italic", "formatBlock"];
  return commands[index] || "insertParagraph";
}

// Search functionality ---------
searchInput.addEventListener("input", () => {
  renderTodos(searchInput.value);
});

// Initial render ----------
renderTodos();
selectTodo(0);



