const formItem = document.getElementById('form-item');
const inputField = document.getElementById('input-field');
const listItem = document.getElementById('list-item');
const clearBtn = document.getElementById('clear');
const filter = document.getElementById('filter');

function displayItems(){
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemToDOM(item));
}
function onAddItemSubmit(e){
    e.preventDefault();
    let newItem = inputField.value;
    if(newItem === ''){
        alert("Please add an item");
        return;
    }

    addItemToDOM(newItem);
    addItemToStorage(newItem);
}

function addItemToDOM(item) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
    listItem.appendChild(li);
    const button = createButton('remove-item text-red');
    li.appendChild(button);
    inputField.value = '';
    inputField.focus();

    checkUI();
    
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

function filterItems(e) {
    const items = listItem.querySelectorAll('li');
    const text = e.target.value.toLowerCase();
    items.forEach((items) => {
        const itemName = items.firstChild.textContent.toLowerCase();
        if(itemName.indexOf(text)!= -1){
            items.style.display = 'flex';
        }else{
            items.style.display = 'none'
        }
        checkUI();
    })
}
function onClickItem(e){
    if(e.target.parentElement.classList.contains('remove-item')){
        removeItem(e.target.parentElement.parentElement);
    }
    checkUI();
}

function removeItem(item){
    item.remove()
    removeItemFromStorage(item.textContent)
}

function addItemToStorage(item){
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.push(item);
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
    checkUI();
}
function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage()
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
    
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
    checkUI();
}

function clearItems(){
    while(listItem.firstChild){
        listItem.firstChild.remove(listItem.firstChild);
    }

    localStorage.removeItem('items');

    checkUI();
}

function getItemsFromStorage(){
    let itemsFromStorage;
    if(localStorage.getItem('items') === null){
        itemsFromStorage = [];
    }else{
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemsFromStorage;

    checkUI();
}

function checkUI(){
    const items = listItem.querySelectorAll('li');
    if(items.length === 0){
        clearBtn.style.display = 'none';
        filter.style.display = 'none'
    }else{
        clearBtn.style.display = 'block';
        filter.style.display = 'block';
    }
}

formItem.addEventListener('submit', onAddItemSubmit);
listItem.addEventListener('click', onClickItem);
filter.addEventListener('input', filterItems);
clearBtn.addEventListener('click', clearItems);
document.addEventListener('DOMContentLoaded', displayItems)


checkUI();