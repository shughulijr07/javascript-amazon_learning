 import { products } from "../data/products.js";
 import { cart,removeFromCart } from "../data/cart.js";

  let cartListHtml = '';
  
    cart.forEach((cartItem) =>{
       let productId = cartItem.productId;
  
        let matchingItem;
        products.forEach((product) =>{
          if(productId === product.id){
             matchingItem = product;
          } 
        });
            let html = `
              <div class="cart-item-container-${productId}">
              <div class="delivery-date">
                Delivery date: Tuesday, June 21
              </div>
  
              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingItem.image}">
  
                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingItem.name}
                  </div>
                  <div class="product-price">
                    ${matchingItem.priceCents}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary" data-product-id="${matchingItem.id}">
                      Delete
                    </span>
                  </div>
                </div>
  
                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  <div class="delivery-option">
                    <input type="radio" checked
                      class="delivery-option-input"
                      name="delivery-option-${matchingItem.id}">
                    <div>
                      <div class="delivery-option-date">
                        Tuesday, June 21
                      </div>
                      <div class="delivery-option-price">
                        FREE Shipping
                      </div>
                    </div>
                  </div>
                  <div class="delivery-option">
                    <input type="radio"
                      class="delivery-option-input"
                      name="delivery-option-${matchingItem.id}">
                    <div>
                      <div class="delivery-option-date">
                        Wednesday, June 15
                      </div>
                      <div class="delivery-option-price">
                        $4.99 - Shipping
                      </div>
                    </div>
                  </div>
                  <div class="delivery-option">
                    <input type="radio"
                      class="delivery-option-input"
                      name="delivery-option-${matchingItem.id}">
                    <div>
                      <div class="delivery-option-date">
                        Monday, June 13
                      </div>
                      <div class="delivery-option-price">
                        $9.99 - Shipping
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
       cartListHtml += html;
    });

  document.querySelector('.order-summary').innerHTML = cartListHtml; 

   document.querySelectorAll('.delete-quantity-link').forEach((deleteLink)=>{
    deleteLink.addEventListener('click',()=>{
      //To know what a link is clicked, we have to get its id! We can get it using data attachment
      let productId = deleteLink.dataset.productId;
      removeFromCart(productId);
      
      //Then remove the cartItem from the page
      let container = document.querySelector(`.cart-item-container-${productId}`);
      container.remove();
    });

   })