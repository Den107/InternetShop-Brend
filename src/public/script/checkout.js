'use strict';
//раскрытие основного слайдера
const sliderItem = document.querySelectorAll('.main-slider__label');

sliderItem.forEach(function (elem) {
    elem.addEventListener('click', function () {
        if (elem.nextElementSibling.style.display === 'flex') {
            elem.nextElementSibling.style.display = 'none';
        } else {
            elem.nextElementSibling.style.display = 'flex';
        }
    })
});












