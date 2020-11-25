'use strict';

let input = document.getElementById('searchInp');
let findButton = document.getElementById('searchBtn');
let nameOfProduct = document.querySelectorAll('.fetured-item__title');

findButton.addEventListener('click', findItem);




function findItem() {
    let value = input.value;
    nameOfProduct.forEach(name => {
        if (name.innerText !== value) {
            name.parentNode.style = 'display: none;';
        }
    })
}

