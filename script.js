const formItem = document.getElementById('form-item');
const inputField = document.getElementById('input-field');
const listItem = document.getElementById('list-item');
const clearBtn = document.getElementById('clear');
const filter = document.getElementById('filter');

function onAddItemSubmit(e) {
    e.preventDefault();
    let newItem = inputField.value;
    if(newItem === ''){
        alert("Please add an item");
        return;
    }
   
    addItemToDOM(newItem)
    addItemToStorage(newItem);
    
}

function addItemToDOM(item) {
     const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
    listItem.appendChild(li);
    let button = createButton('remove-item text-red');
    li.appendChild(button);

    inputField.value = '';
    inputField.focus();

    checkUI();
}

function addItemToStorage(item){
    let itemsFromStorage;
    if(localStorage.getItem('items') === null){
        itemsFromStorage = [];
    }else{
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
        itemsFromStorage.push(item);
        localStorage.setItem('items', JSON.stringify(itemsFromStorage));
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
    checkUI();
}

function clearItems(){
    while(listItem.firstChild){
        listItem.firstChild.remove(listItem.firstChild);
    }
    checkUI();
}

function filterItems(e){
    const items = listItem.querySelectorAll('li');
    const text = e.target.value.toLowerCase();
    items.forEach((items) => {
        const itemName = items.firstChild.textContent.toLowerCase();
        if(itemName.indexOf(text)!= -1){
            items.style.display = 'flex';
        }else{
            items.style.display = 'none';
        }
    })

    checkUI();
}

function checkUI(){
    let items = listItem.querySelectorAll('li');
    if(items.length === 0){
        filter.style.display = 'none';
        clearBtn.style.display = 'none';
    }else{
        filter.style.display = 'block';
        clearBtn.style.display = 'block';
    }
}

formItem.addEventListener('submit', onAddItemSubmit);
listItem.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
filter.addEventListener('input', filterItems);

checkUI();