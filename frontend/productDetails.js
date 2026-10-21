import { quantities } from "./state.js";
const idProdSelected=(new URLSearchParams(window.location.search)).get("id");

console.log(idProdSelected)
fetch(`http://localhost:3000/api/products/${idProdSelected}`)
.then(response=>response.json())
.then(product=>{
  let quantity = quantities[idProdSelected] || 1;
  refreshPage(quantity,product);
})

function refreshPage(quantity,product){
  document.body.innerHTML=
  `
  <img class="shopping-logo" src="./images/shopping-logo.png">
  <div class="container">
    <div class="horisental">
      <img class="product-img" src="${product.image}">
      <div class="vertical">
        <p class="product-name">${product.name}</p>
        <p class="product-price">${product.price.toFixed(3)}$</p>
        <p class="product-stock">${(product.quantity)>0 ? 'In stock' : 'Out of stock'}</p>
        <p class="product-desc">${product.description}</p>
        <div class="quantityDiv">
          <button class="btnQuantity js-addbtn">+</button>
            <p class="quantity">${quantity}</p>
          <button class="btnQuantity js-deletebtn">-</button>
        </div>
        <button data-set-id="${product.idProduct}"  class="btn-add-cart">Add to cart</button>
      </div>
    </div>
  </div>`;
  document.querySelector('.shopping-logo').addEventListener('click',()=>{
    document.location.href='home.html';
  })
  document.querySelector('.js-addbtn').addEventListener('click',()=>{
     if (!quantities[idProdSelected]) {
        quantities[idProdSelected] = 1;
      }
      quantities[idProdSelected]++;
      console.log(quantities[idProdSelected])
      localStorage.setItem('quantities',JSON.stringify(quantities));
      refreshPage(quantities[idProdSelected],product);
  }) 
  document.querySelector('.js-deletebtn').addEventListener('click',()=>{
    if (!quantities[idProdSelected]) {
      quantities[idProdSelected] = 1;
    }
    if(quantities[idProdSelected]>0) {
      quantities[idProdSelected]--;
      localStorage.setItem('quantities',JSON.stringify(quantities));
      refreshPage(quantities[idProdSelected],product);
    }
  })  
  // document.querySelector('.js-btn-add-cart')
  //   .addEventListener('click',e=>{
      

  //   })    
}