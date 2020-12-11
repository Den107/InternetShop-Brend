Vue.component('filter-el', {
    data() {
        return {
            searchLine: ''
        }
    },
    template:
        `
        <form class="header__form-search" method="GET" @submit.prevent="$parent.$refs.products.filter(searchLine)">
        <input class="header__browse-input" type="checkbox" value="" id="inp">
        <label for="inp">
            <div class="header__browse-button">Browse <i class="fas fa-caret-down"></i></div>
        </label>
        <div class="header__down-menu">
            <h3 class="header__label-down-menu">Women</h3>
            <div class="header__line"></div>
            <ul class="header__list-down-menu">
                <li class="header__item-down-menu"><a href="#" class="header__link-down-menu">Dresses
                    </a></li>
                <li class="header__item-down-menu"><a href="#" class="header__link-down-menu">Tops
                    </a></li>
                <li class="header__item-down-menu"><a href="#" class="header__link-down-menu">Sweaters/Knits
                    </a></li>
                <li class="header__item-down-menu"><a href="#" class="header__link-down-menu">Jackets/Coats
                    </a></li>
                <li class="header__item-down-menu"><a href="#" class="header__link-down-menu">Blazers
                    </a></li>
                <li class="header__item-down-menu"><a href="#" class="header__link-down-menu">Denim
                    </a></li>
                <li class="header__item-down-menu"><a href="#" class="header__link-down-menu">Leggings/Pants
                    </a></li>
                <li class="header__item-down-menu"><a href="#" class="header__link-down-menu">Skirts/Shorts
                    </a></li>
                <li class="header__item-down-menu"><a href="#" class="header__link-down-menu">
                        Accessories</a>
                </li>
            </ul>



            <h3 class="header__label-down-menu">Men</h3>
            <div class="header__line"></div>
            <ul class="header__list-down-menu">
                <li class="header__item-down-menu"><a href="#" class="header__link-down-menu">Tees/Tank
                        tops</a>
                </li>
                <li class="header__item-down-menu"><a href="#"
                        class="header__link-down-menu">Shirts/Polos</a>
                </li>
                <li class="header__item-down-menu"><a href="#" class="header__link-down-menu">Sweaters</a>
                </li>
                <li class="header__item-down-menu"><a href="#"
                        class="header__link-down-menu">Sweatshirts/Hoodies</a></li>
                <li class="header__item-down-menu"><a href="#" class="header__link-down-menu">Blazers</a>
                </li>
                <li class="header__item-down-menu"><a href="#"
                        class="header__link-down-menu">Jackets/vests</a>
                </li>
            </ul>
        </div>
        <input class="header__imput" type="text" name="search" id="searchInp" 
            placeholder="Search for Item..." v-model="searchLine">
            
        <button class="header__search-button" type="submit" id="searchBtn"><i
                class="fas fa-search"></i></button>
    </form>
`


});

