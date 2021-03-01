const items = document.querySelector('.items');
const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('.footer__button');
function onAdd() {
    const text = input.value;
    console.log(text);

    if( text === '') {
        return;
    }

    const item = createItem(text);
    items.appendChild(item);

    input.value = '';
    input.focus();
}

function createItem(text) {
    const itemRow = document.createElement('li');
    itemRow.setAttribute('class', 'item__row');

    const item = document.createElement('div');
    item.setAttribute('class', 'item');
    
    const name = document.createElement('span');
    name.setAttribute('class', 'item__name');
    name.innerText = text;

    const delBtn = document.createElement('button');
    delBtn.setAttribute('class','item__delete');
    delBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    delBtn.addEventListener('click', () => {
        items.removeChild(itemRow);
    })

    const divider = document.createElement('div');
    divider.setAttribute('class', 'item__divider');

    item.appendChild(name);
    item.appendChild(delBtn);
    itemRow.appendChild(item);
    itemRow.appendChild(divider);

    return itemRow;
}

addBtn.addEventListener('click', () => {
    onAdd();
})

input.addEventListener('keypress', function(e) {
    if(e.key === 'Enter') {
        onAdd();

    }
})

