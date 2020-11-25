'use strict';

let findInput = document.getElementById('inp').value;
let findButton = document.querySelector('.header__search-button');
let nameOfProduct = document.querySelector('.fetured-item__title');

findButton.addEventListener('click', findItem);

console.dir(nameOfProduct.parentNode.style);


function findItem() {

    if (findInput === nameOfProduct.innerHTML) {
        nameOfProduct.parentNode.style.display = 'none';
    }
}

