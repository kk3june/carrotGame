const items = document.querySelector('.items');
const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('.footer__button');
function onAdd() {
    const text = input.value;

    if( text === '') {
        return;
    }

    const item = createItem(text);
    items.appendChild(item);

    input.value = '';
    input.focus();
}

let id = 0;  // UUID
function createItem(text) {
    const itemRow = document.createElement('li');
    itemRow.setAttribute('class', 'item__row');
    itemRow.setAttribute('data-id', `${id}`);
    itemRow.innerHTML = `
    <div class="item">
        <span class="item__name">${text}</span>
        <button class="item__delete">
            <i class="fas fa-trash-alt" data-id=${id}></i>
        </button>
    </div>
    <div class="item__divider"></div>`;
    id++

    // const item = document.createElement('div');
    // item.setAttribute('class', 'item');
    
    // const name = document.createElement('span');
    // name.setAttribute('class', 'item__name');
    // name.innerText = text;

    // const delBtn = document.createElement('button');
    // delBtn.setAttribute('class','item__delete');
    // delBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    // delBtn.addEventListener('click', () => {
    //     items.removeChild(itemRow);
    // })

    // const divider = document.createElement('div');
    // divider.setAttribute('class', 'item__divider');

    // item.appendChild(name);
    // item.appendChild(delBtn);
    // itemRow.appendChild(item);
    // itemRow.appendChild(divider);
    return itemRow;
}

addBtn.addEventListener('click', () => {
    onAdd();
});

input.addEventListener('keypress', function(e) {
    if(e.key === 'Enter') {
        onAdd();
    }
});

items.addEventListener('click', event => {
    console.log('items clicked');
    const id = event.target.dataset.id;
    if(id) {
        const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`)
        toBeDeleted.remove();
    }
});


