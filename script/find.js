'use strict';

let formSearch = document.querySelector('.header__form-search');
let input = document.getElementById('searchInp');
let nameOfProduct = document.querySelectorAll('.fetured-item__title');


function find(value) {
    const regexp = new RegExp(value, 'ig');
    nameOfProduct.forEach(name => {
        if (regexp.test(name.innerText)) {
            name.parentNode.style = 'display: block;';
        } else if (value === '') {
            name.parentNode.style = 'display: block;';
        } else name.parentNode.style = 'display: none;';
    })


}


formSearch.addEventListener('submit', event => {
    event.preventDefault();
    find(input.value);
})

