$(function () {
    $("#header").load("../Documents/header.html");
    $("#footer").load("../Documents/footer.html");
});


const animalsForSale = [
    {
        name: "bird1",
        price: 300
    },
    {
        name: "bird2",
        price: 150
    },
    {
        name: "bird3",
        price: 500
    },
    {
        name: "bird4",
        price: 250
    }
];

let shoppingCartItems = {};

const products = 
{
    animal: {
            itema: {info: "bla", price: 2},
            itemb: {info: "bla", price: 3}
        },
    animal2: {
            itemc: {info: "bla", price: 4},
            itemd: {info: "bla", price: 5}
        },
        animal3: {
                item: {info: "bla", price: 3},
                item2: {info: "blaaa", price: 2},
                item3: {info: "blaasd", price: 5},
                sas4: {info: "bla", price: 5}
            }
}
;


function generateProducts() {
    let template;
    let productInfo;
    Object.keys(products).forEach(animal => { 
        template =`
        <div class="item-wrapper"><h3>${animal}</h3>
        `
        console.log(animal + " <---- animal");
        Object.keys(products[animal]).forEach(item => { 
            productInfo = `
            <div class="each-item ${animal}"><h4 class="item-name">${item}</h4>
            <p>${products[animal][item].info}</p>
            <p>${products[animal][item].price}</p>
            <button class="buy-btn">Köp</button></div>`
            console.log(item + " <----- item")
            console.log(products[animal][item].price)
            console.log(products[animal][item].info)
            template += productInfo;
        })  
        template += `</div>`
        document.getElementById("products-wrapper").innerHTML += template;
    })
    
}


function numOfItemsInCart(shoppingCartItems) {

    let displayNumOfItems = document.getElementById("num-of-items");
    let size = Object.keys(shoppingCartItems).length;
    let totalItems = 0;
    for (const animal in shoppingCartItems) {
        totalItems += shoppingCartItems[animal].amount
    }
    size < 1 ? displayNumOfItems.textContent = "Empty" : displayNumOfItems.textContent = totalItems;
}


function addBuyEvent() {
    let buyBtn = document.getElementsByClassName("buy-btn");
    for (let btn of buyBtn) {
        btn.addEventListener('click', clickBuyBtn);
    }
}

function clickBuyBtn(event) {
    let getAnimal = event.target.parentElement.parentElement.getElementsByClassName("item-name")[0].textContent;
    console.log(shoppingCartItems);
    Object.keys(products).forEach(animal => {
        Object.keys(products[animal]).forEach(item => {
            // console.log(item + " sadasdasdsa")
            if(getAnimal === item) {
                if(shoppingCartItems.hasOwnProperty(item)) {
                    shoppingCartItems[item].amount++;
                    showItemsInCart(shoppingCartItems)
                    numOfItemsInCart(shoppingCartItems)
                }
                else {
                    shoppingCartItems[item] = { price: products[animal][item].price, amount: 1 }
                    // console.log("hej")
                    showItemsInCart(shoppingCartItems)
                    numOfItemsInCart(shoppingCartItems)
                }
            }
           
        })
        // if (animal.name === getAnimal) {
        //     if (getAnimal in shoppingCartItems) {
        //         shoppingCartItems[getAnimal].amount++;
        //         showItemsInCart(shoppingCartItems)
        //         numOfItemsInCart(shoppingCartItems)
        //     } else {
        //         shoppingCartItems[getAnimal] = { price: animal.price, amount: 1 }
        //         // console.log("hej")
        //         showItemsInCart(shoppingCartItems)
        //         numOfItemsInCart(shoppingCartItems)
        //     }
        // }
    })
}

function showItemsInCart(shoppingCart) {
    let template = "";
    document.getElementById("shopping-cart").innerHTML = "";
    for (const item in shoppingCart) {
        console.log(shoppingCart[item].price);
        template += `
        <div id="${item}">
            <h5>${item}</h5>
            <p>${shoppingCart[item].price}</p>            
            <p class="amount-of-item"><button class="decrease-item">-</button>${shoppingCart[item].amount}<button class="increase-item">+</button></p>
            <p class="total-item-cost">total: ${shoppingCart[item].amount * shoppingCart[item].price}</p>
            <button class="remove-item">Remove</button>
        </div>
            `;
        document.getElementById("shopping-cart").innerHTML = template;

    }
    document
        .querySelectorAll(".increase-item")
        .forEach(btn =>
            btn.addEventListener('click', (event) => increaseBtn(shoppingCart, event)));
    document
        .querySelectorAll(".decrease-item")
        .forEach(btn =>
            btn.addEventListener("click", (event) => decreaseBtn(shoppingCart, event)));
    document    
            .querySelectorAll(".remove-item")
            .forEach(btn => 
                btn.addEventListener('click', (event) => removeFromCart(event.target.parentElement.id)));

}

function increaseBtn(shoppingCart, event) {
    let itemToIncrease = event.target.parentElement.parentElement.id;
    shoppingCart[itemToIncrease].amount++;
    showItemsInCart(shoppingCart)
    numOfItemsInCart(shoppingCartItems)
}

function decreaseBtn(shoppingCart, event) {
    let itemToDecrease = event.target.parentElement.parentElement.id;
    if (shoppingCart[itemToDecrease].amount <= 1) {
        removeFromCart(itemToDecrease)
        showItemsInCart(shoppingCart)
        numOfItemsInCart(shoppingCartItems)
    } else {
        shoppingCart[itemToDecrease].amount--;
        showItemsInCart(shoppingCart)
        numOfItemsInCart(shoppingCartItems)
    }

}

function showShopIcon() {
    const showShopIconToggle = document.getElementById("shop-icon");
    showShopIconToggle.addEventListener("click", () => { showShop() });
}

function removeFromCart(itemToRemove) {
    console.log(itemToRemove)
    delete shoppingCartItems[itemToRemove];
    showItemsInCart(shoppingCartItems);
    numOfItemsInCart(shoppingCartItems);

}




function showShop() {
    console.log("hej")
    const shoppingCart = document.querySelector("#shopping-cart")
    let visibility = shoppingCart.style.display;
    console.log(visibility)
    if (visibility == "flex") {
        shoppingCart.style.display = "none";
    } else {
        shoppingCart.style.display = "flex";
    }
}

window.onload = () => {
    if(window.location.href.indexOf('products.html') > -1){
        generateProducts();
    }
    addBuyEvent();
    showShopIcon();
    numOfItemsInCart(shoppingCartItems);
};
