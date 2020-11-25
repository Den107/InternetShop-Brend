'use strict';

function makeGETRequest(url, callback) {
    let xhr;

    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            callback(xhr.responseText);
        }
    }

    xhr.open('GET', url, true);
    xhr.send();
}


makeGETRequest('https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json', r => console.log(r))


/**
 * класс для корзины
 * count - количество товаров в корзине
 */
class Bascket {
    constructor(count) {
        this.count = count;
    }
    /**
     * подсчет общей суммы товаров в корзине
     */
    calcTotalSum() {
        this.count * this.price;
    }
    /**
     * удаление всех товаров из корзины
     */
    clearBascket() { }
    /**
     * купить все товары в корзине
     */
    buyAll() { }
    /**
     * получение всех товаров в корзине
     */
    getAllGoodsInBascket() {

        makeGETRequest('https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json', r => console.log(r))
    }
}

/**
 * класс товара в корзине
 */
class GoodInBascket {
    constructor(name, price, img, count = 1) {
        this.name = name;
        this.price = price;
        this.img = img;
        this.count = count;
    }
    /**
     * добавление товаров в корзину
     */
    addCount() {

        makeGETRequest('https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/addToBasket.json', r => console.log(r))
    }
    /**
     * увеличение количества определенного товара в корзине 
     * @param {number} item 
     */
    plusCount(item) {
        this.count += item;
    }
    /**
     * уменьшение количества определенного товара в корзине
     * @param {number} item 
     */
    removeCount(item) {
        this.count -= item;
        if (this.count < 1) {
            removeGood();
        }
    }
    /**
    * удаление товара из корзины
    */
    removeGood() {

        makeGETRequest('https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/deleteFromBasket.json', r => console.log(r))
    }
}