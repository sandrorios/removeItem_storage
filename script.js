const formItem = document.getElementById('form-item');
const inputField = document.getElementById('input-field');
const listItem = document.getElementById('list-item');
const clearBtn = document.getElementById('clear');
const filter = document.getElementById('filter');

function addItem(e) {
    e.preventDefault();
    let newItem = inputField.value;
    if(newItem === ''){
        alert("Please add an item");
        return;
    }
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));
    listItem.appendChild(li);
    let button = createButton('remove-item text-red');
    li.appendChild(button);
}

function createButton(classes){
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

function createIcon(classes){
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

function removeItem(e){
    if(e.target.parentElement.classList.contains('remove-item')){
        e.target.parentElement.parentElement.remove();
    }
}


formItem.addEventListener('submit', addItem);
listItem.addEventListener('click', removeItem);