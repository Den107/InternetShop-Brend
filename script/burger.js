'use strict';

class Burger {
    constructor(price, callories, topping = '') {
        this.price = price;
        this.callories = callories;
        this.topping = topping;
    }
    addTopping(topping) {
        switch (topping) {
            case "spice":
                this.price += 15;
                this.topping = 'специи';
            case "mayo":
                this.price += 20;
                this.callories += 5;
                this.topping = 'майонез';
            case "cheese":
                this.price += 10;
                this.callories += 20;
                this.topping = 'сыр';
            case "salad":
                this.price += 20;
                this.callories += 5;
                this.topping = 'салат';
            case "potato":
                this.price += 15;
                this.callories += 10;
                this.topping = 'картошка';
            default:
                console.log('Пожалуйста, введите название добавки, spice, mayo, cheese, salad или potato');

        }
    }
    removeTopping(topping) {
        switch (topping) {
            case "spice":
                this.price -= 15;
                this.topping = '';
            case "mayo":
                this.price -= 20;
                this.callories -= 5;
                this.topping = '';
            case "cheese":
                this.price -= 10;
                this.callories -= 20;
                this.topping = '';
            case "salad":
                this.price -= 20;
                this.callories -= 5;
                this.topping = '';
            case "potato":
                this.price -= 15;
                this.callories -= 10;
                this.topping = '';
            default:
                console.log('Пожалуйста, введите название добавки, spice, mayo, cheese, salad или potato');

        }
    }
    getToppings() {
        console.log('Доступные добавки: майонез, специи, сыр, салат, картофель');
    }
    getSize() {
        if (this.price === 100) {
            console.log('Это большой бургер');
        } else console.log('Это маленький бургер');
    }
    getStuffing() {
        console.log(`Начинка этого бургера: ${this.topping}`);

    }
    calculatePrice() {
        console.log(`Цена этого бургера ${this.price} рублей`);

    }
    calculateCalories() {
        console.log(`Каллорийность этого бургера ${this.callories} калл`);

    }
}




let bigBurger = new Burger(100, 40);
let smallBurger = new Burger(50, 20);
