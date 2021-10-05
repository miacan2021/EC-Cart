const orderTitle = document.querySelector('.added');
const cartUl = document.querySelector('.list-group');
const products = document.querySelector('#products');
const cartTitle = document.querySelector('#exampleModalToggleLabel2');
const navCart = document.querySelectorAll('.nav-cart');
const total = document.querySelector('.total');

//product object
class Product {
    constructor(img, name, price, text, num) {
        this.img = img;
        this.name = name;
        this.price = price;
        this.text = text;
        this.num = num;
    }
}
const product1 = new Product('product5', 'Product1', 110, 'texttext from js obj', 0);
const product2 = new Product('product2', 'Product2', 170, 'texttext sample text', 0);
const product3 = new Product('product3', 'Product3', 120, 'texttext watch detail', 0);

let cartItem = {
    product1,
    product2,
    product3
};

//add product items
for (item in cartItem) {
    const product = document.createElement('div');
    product.classList.add('col');
    product.innerHTML = ` 
    <div class="card h-100">
      <form id="add" class="text-center">
      <img src="img/${cartItem[item].img}.jpg" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${cartItem[item].name}</h5>
        <h6>$ ${cartItem[item].price}</h6>
        <p class="card-text">${cartItem[item].text}</p>
      </div>
        <input type="number" min="0" max="100" value="1">
        <input type="submit" class="btn btn-light order" data-bs-toggle="modal" href="#exampleModalToggle" value="Add">
      </form>
    </div>
   `;
    products.appendChild(product);
}

const orders = document.querySelectorAll('form');

const cart = (e) => {
    const name = e.path[0].childNodes[3].childNodes[1].textContent;
    for (let item in cartItem) {
        const itemName = cartItem[item].name;
        const itemPrice = cartItem[item].price;
        const itemImg = cartItem[item].img;
        let itemNum;
        if (cartItem[item].name === name) {
            if(!cartUl.textContent.includes(name)){
                itemNum = e.target[0].value * 1;
                const li = document.createElement('li');
                li.classList.add('list-group-item','img-thumb');
                li.innerHTML = `
                <img src = img/${itemImg}.jpg>
                <p>${itemName}</p>
                <p class='itemN'>x${itemNum}</p>
                <p>${itemPrice}<p>
                <button class='remove'> X </button>
            `;
            total.before(li);
            cartItem[item].num = itemNum;
            }else{
                itemNum = e.target[0].value * 1;
                const itemN = document.querySelector('.itemN');
                itemN.textContent = `x${itemNum}`;
                cartItem[item].num = itemNum;
            }
        }
    }
}

const del = () => {
    const removeBtns = document.querySelectorAll('.remove');
    removeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            totalCost();
            e.path[2].remove();
            for (let item in cartItem){
                if(cartItem[item].name == e.path[2].childNodes[3].textContent)
                {
                    cartItem[item].num = 0;
            }
            }
        });
    })
}

const count = () => {
    let count = 0;  
    for (let item in cartItem){
        count += cartItem[item].num;
    }
    return count;
}

const warning= () => {
    const createTitle = `You added ${count()} items.`;
    orderTitle.textContent = createTitle;
    const cartText = `SHOPPING CART [ ${count()}items ]`;
    cartTitle.textContent = cartText;
    navCart.forEach(cart => {
        const navCartText = `Cart (${count()})`;
        cart.textContent = navCartText;
        cart.style.cursor = "pointer";
    })
}

const totalCost = () =>{
    del();
    let totalNum = 0;
    for (let item in cartItem){
       totalNum += cartItem[item].num * cartItem[item].price;
    }
    const totalShow = `Total: $ ${totalNum}`;
    total.textContent = totalShow;
}

const ordered = (e) => {
    e.preventDefault();
    cart(e);
    count();
    del();
    warning();
    totalCost();
}
orders.forEach(order => {
    order.addEventListener('submit', ordered);
})
