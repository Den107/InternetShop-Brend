'use strict';

let input = document.getElementById('searchInp');
let findButton = document.getElementById('searchBtn');
let nameOfProduct = document.querySelectorAll('.fetured-item__title');

findButton.addEventListener('click', findItem);
input.addEventListener('change', findItem);



function findItem() {

    let value = input.value;
    let re = /[A-Za-z\-\ ]{3,30}/i;
    nameOfProduct.forEach(name => {
        if (name.innerText.toLowerCase().indexOf(value.toLowerCase()) != -1) {
            name.parentNode.style = 'display: block;';
        } else if (value === '') {
            name.parentNode.style = 'display: block;';
        } else name.parentNode.style = 'display: none;';
    })
}




