'use strict';
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class GoodsItem {
    constructor(name, price, color, size, img) {
        this.name = name;
        this.price = price;
        this.color = color;
        this.size = size;
        this.img = img;
    }
    render() {
        return `<div class="fetured-item content__fetured-item"><div class="fetured-item__hidden"><button class="fetured-item__cart"> <img src= "image/index/cart_featured.png"alt="bascket"><p>Add to Cart</p> </button> </div><img src=${this.img} alt="item"><p class="fetured-item__title">${this.name}</p><p class="fetured-item__subtitle">${this.price}</p></div>`
    }
}

class GoodOfBascket extends GoodsItem {
    constructor(name, price, color, size, img, number) {
        super(name, price, color, size, img);
        this.number = number; // количество товара в корзине
    }

    priceOfElement() {
        //подсчет стоимости одного товара, в зависимости от колличества
        return this.price * this.number;
    }

    changeNumber() {
        // изменение количества выбранного товара в корзине
        return this.number;
    }

    renderGoodInBascket() {
        // отрисовка элемента корзины
        return `<div class="header__cart">
        <img class="header__cart-img" src=${this.img} alt="basck">
        <div class="header__context">
            <h3 class="header__cart-label">${this.name}</h3>
            <div class="header__starts">
                <i class="fas fa-star header__star" aria-hidden="true"></i>
                <i class="fas fa-star header__star" aria-hidden="true"></i>
                <i class="fas fa-star header__star" aria-hidden="true"></i>
                <i class="fas fa-star header__star" aria-hidden="true"></i>
                <i class="fas fa-star-half-alt header__star" aria-hidden="true"></i>
            </div>
            <p class="header__price">${this.number} <span>x</span> $${this.price}</p>
        </div>
        <i class="fas fa-times-circle header__cross" aria-hidden="true"></i>
    </div>`
    }
}

class Bascket extends GoodOfBascket {
    constructor(markup, discount, shipping) {
        super(markup);
        this.discount = discount; //скидка
        this.shipping = shipping; //стоимость доставки
        this.goods = [];// список товаров
    }

    addItem() {
        // метод добавления товара в корзину
        makeGETRequest('https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/addToBasket.json').then((data) => {
            let productObject = JSON.parse(data);
            console.log(productObject);
        }).catch((error) => {
            console.log(error);
        })
    }

    typeOfShipping() {
        // определение способа доставки
    }

    costOfShipping() {
        // подсчет стоимости доставки
    }

    deleteGood() {
        // удаляет товар из корзины, если количесто товара = 0,
        // то также задействуется этот метод
        makeGETRequest('https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/deleteFromBasket.json').then((data) => {
            let productObject = JSON.parse(data);
            console.log(productObject);
        }).catch((error) => {
            console.log(error);
        })
    }

    clearBascket() {
        // очищение корзины
    }

    appDiscount() {
        // применяется скидка, если она есть
    }

    renderBascket() {
        makeGETRequest('https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json').then((data) => {
            let productObject = JSON.parse(data);
            console.log(productObject);
        }).catch((error) => {
            console.log(error);
        })
        // наполняет корзину элементами, с помощью renderGoodInBascket()
    }
    fetchGoods() {
        this.goods = [
            {
                name: 'Куртка',
                price: 1000
            },
            {
                name: 'Блузка',
                price: 500
            },
            {
                name: 'Рубашка',
                price: 2300
            },
            {
                name: 'Джинсы',
                price: 1400
            },
            {
                name: 'Свитер',
                price: 850
            },
            {
                name: 'Кроссовки',
                price: 7100
            },
        ]
    }
    goodsSum() {
        // считаем итоговую стоимость покупки
        let sum = 0;
        this.goods.forEach(good => {
            sum += good.price;
        });
        console.log(sum);

    }
}
// второе задание второго урока

let list = new Bascket();
list.fetchGoods();
list.goodsSum();