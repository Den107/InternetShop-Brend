'use strict';
const myAPI = 'https://raw.githubusercontent.com/Den107/InternetShop-Brend/master/responses/getProducts.json';
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';



class GoodsItem {
    constructor(product, color = 'red', size = 'XL', img = 'https://placehold.it/263x280') {
        this.name = product.name;
        this.price = product.price;
        this.id = product.id;
        this.color = color;
        this.size = size;
        this.img = img;
    }
    render() {
        return `<div class="fetured-item content__fetured-item" data-id="${this.id}">
        <div class="fetured-item__hidden">
        <button class="fetured-item__cart"> 
        <img src= "image/index/cart_featured.png"alt="bascket">
        <p>Add to Cart</p> </button> </div>
        <img src=${this.img} alt="item">
        <p class="fetured-item__title">${this.name}</p><p class="fetured-item__subtitle">$${this.price}</p></div>`
    }
}


class GoodList {
    constructor(container = '.content__main') {
        this.container = container;
        this._goods = [];
        this._allProducts = [];

        this._fetchGoods().then((data) => {
            this._goods = [...data];
            this._render();
        })
        this.goodsSum();
    }


    _fetchGoods() {
        return fetch(myAPI)
            .then(response => response.json())
            .catch((error) => {
                console.log(error);
            })
    }
    _render() {
        const block = document.querySelector(this.container);
        for (let product of this._goods) {
            const productObject = new GoodsItem(product);
            this._allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render())
        }
    }
    goodsSum() {
        // считаем итоговую стоимость покупки
        let sum = 0;
        this._goods.forEach(good => {
            sum += good.price;
        });
        console.log(sum);
    }

}
new GoodList();


class GoodInBascket extends GoodsItem {
    constructor(name, price, color, size, img, count = 1, shipping = 'FREE') {
        super(name, price, color, size, img);
        this.count = count; // количество товара в корзине
        this.shipping = shipping; //стоимость доставки
    }

    priceOfElement() {
        //подсчет стоимости одного товара, в зависимости от колличества
        return this.price * this.count;
    }

    changeCount() {
        // изменение количества выбранного товара в корзине
        return this.count;
    }

    renderGoodInBascketSmall() {
        // отрисовка элемента корзины в шапке
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
    renderGoodInBascketBig() {
        //отрисовка элемента корзины на странице корзины
        return `<div class="product-details__item product-details-item">
        <div class="product-details-item__left">
            <img class="product-details-item__image" src="${this.img}" alt="man1">
            <div class="product-details-item__content">
                <h4 class="product-details-item__name">${this.name}</h4>
                <p class="product-details-item__color">Color: <span>${this.color}</span></p>
                <p class="product-details-item__size">Size: <span>${this.size}</span></p>
            </div>
        </div>
        <div class="product-details-item__right">
            <p class="product-details-item__price">$${this.price}</p>
            <input class="product-details-item__quantity" type="number" name="quantity" value="${this.count}">
            <p class="product-details-item__shipping">${this.shipping}</p>
            <p class="product-details-item__subtotal">$${this.priceOfElement()}</p>
            <a href="#"><i class="fas fa-times-circle" aria-hidden="true"></i></a>

        </div>
    </div>`
    }
}

class Bascket extends GoodInBascket {
    constructor(discount, shipping) {
        super(shipping);
        this.discount = discount; //скидка
        this.goods = [];// список товаров
    }

    addItem() {
        // метод добавления товара в корзину
        return fetch(`${API}/addToBasket.json`)
            .then(response => response.json())
            .catch((error) => {
                console.log(error);
            })
    }

    costOfShipping() {
        // подсчет стоимости доставки
    }

    deleteGood() {
        // удаляет товар из корзины, если количесто товара = 0,
        // то также задействуется этот метод
        return fetch(`${API}/deleteFromBasket.json`)
            .then(response => response.json())
            .catch((error) => {
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
        return fetch(`${API}/getBasket.json`)
            .then(response => response.json())
            .catch((error) => {
                console.log(error);
            })
        // наполняет корзину элементами, с помощью renderGoodInBascketBig()
    }
}
