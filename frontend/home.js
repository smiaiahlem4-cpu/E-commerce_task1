import { quantities } from "./state.js";
function generateProductCard(product,quantity){
  return (`<div id="${product.idProduct}" class="product-div js-product-div">
              <img class="product-img" src="${product.image}">
              <p class="product-name ">${product.name}</p>
              <p class="product-price">${product.price.toFixed(3)}$</p>
              <p class="product-stock">${(product.quantity)>0 ? 'In stock' : 'Out of stock'}</p>
              <p class="product-desc">${product.description.substring(0,50)}...<span class="seemore"><b>see more</b></span></p>
              <div class="quantityDiv">
                <button data-product-id="${product.idProduct}" class="btnQuantity js-addbtn">+</button>
                  <p data-product-id="${product.idProduct}" class="quantity">${quantity}</p>
                <button data-product-id="${product.idProduct}" class="btnQuantity js-deletebtn">-</button>
              </div>
              <button data-product-id="${product.idProduct}"  class="btn-add-cart js-btn-add-cart">Add to cart</button>
          </div>      
    `);
}

function searchHandler(productSearched){
  fetch(`http://localhost:3000/api/products/search/${productSearched}`)
    .then(response=>response.json())
    .then(result=> {
      let productsHtml='';
      if(result.length>1){
        result.forEach(product => {
          productsHtml += generateProductCard(
            product,
            quantities[product.idProduct] || 1
          );
        });
      }else{
        const [product]=result;
        productsHtml += generateProductCard(
          product,
          quantities[product.idProduct] || 1
        );
      }
      document.querySelector('.js-products-div').innerHTML=productsHtml;
      document.querySelectorAll('.js-product-div')
        .forEach( productCard=>{
            productCard.addEventListener('click', async (e) => {
              const idProdSelected=productCard.id;
              document.location.href=`productDetails.html?id=${idProdSelected}`;
          })
        })
      document.querySelectorAll('.js-btn-add-cart')
        .forEach(button=>{
          button.addEventListener('click',e=>{
            e.stopPropagation();
          })
      })
    })
}

function displayAllProducts(){
  fetch("http://localhost:3000/api/products")
  .then(response=>response.json())
  .then(products=>{
    let productsHtml='';
    products.forEach(product => {
      productsHtml += generateProductCard(
        product,
        quantities[product.idProduct] || 1
      );
    });
    document.querySelector('.js-products-div').innerHTML=productsHtml;
    document.querySelectorAll('.js-product-div')
    .forEach( productCard=>{
        productCard.addEventListener('click', async (e) => {
          const idProdSelected=productCard.id;
          document.location.href=`productDetails.html?id=${idProdSelected}`;
      })
    })
    document.querySelectorAll('.js-btn-add-cart')
      .forEach(button=>{
        button.addEventListener('click',e=>{
          e.stopPropagation();
        })
    })
    document.querySelectorAll('.js-addbtn')
    .forEach(button=>{ 
      button.addEventListener('click',e=>{
        e.stopPropagation();
        const {productId}=button.dataset;
        if (!quantities[productId]) {
          quantities[productId] = 1;
        }
        quantities[productId]++;
        localStorage.setItem('quantities',JSON.stringify(quantities));
        displayAllProducts();
      })
    })
    document.querySelectorAll('.js-deletebtn')
    .forEach(button=>{
      button.addEventListener('click',e=>{
        e.stopPropagation();
        const {productId}=button.dataset;
        if (!quantities[productId]) {
          quantities[productId] = 1;
        }
        if(quantities[productId]>0) {
          quantities[productId]--;
          localStorage.setItem('quantities',JSON.stringify(quantities));
        }
        displayAllProducts();
      })
    })
  })
}  
displayAllProducts();

document.querySelector('.js-search-btn')
    .addEventListener('click',()=>{
      const productSearched=document.querySelector('.js-search-input').value;
      if(productSearched.length===0){
        displayAllProducts();
      }else{
        searchHandler(productSearched);
      }
})
document.querySelector('.js-search-input')
    .addEventListener('keydown',(e)=>{
      const productSearched=document.querySelector('.js-search-input').value;
      if(e.key==='Enter'){
        const productSearched=document.querySelector('.js-search-input').value;
        if(productSearched.length===0){
          displayAllProducts();
        }else{
          searchHandler(productSearched);
        }
      }
})   

  
