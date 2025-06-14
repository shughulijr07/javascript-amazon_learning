import { products } from "../../data/products.js";
import { cart,removeFromCart, updateCartQuantity,updateProductQuantity } from "../../data/cart.js";
import dayjs from "http://unpkg.com/dayjs@1.11.10/esm/index.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { formatNumber } from "../../data/utils.js";

    export function renderOrderSummary(){
      // If no product to cart, hide payment summary and review text
      if(cart.length === 0){
        document.querySelector('.payment-summary').classList.add('hidden');
        document.querySelector('.has-order').classList.add('hidden');
        document.querySelector('.no-order').classList.add('is-shown');
      }else{
        document.querySelector('.payment-summary').classList.remove('hidden');
      }
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
              <div class="cart-item-container cart-item-container-${productId}">
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
                    ${formatNumber(matchingItem.priceCents)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label quantity-label-${productId}">${cartItem.quantity}</span>
                    </span>


                    <span class="update-quantity-link update-quantity-link-${productId} link-primary" data-product-id="${productId}">
                      Update
                    </span>
                    <input type="text" class="new-quantity new-quantity-${productId} hidden">
                    <span class="save-quantity save-quantity-${productId} link-primary hidden" data-product-id="${productId}">Save</span>


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

    updateCartQuantity();  

    document.querySelector('.order-summary').innerHTML = cartListHtml; 

    document.querySelectorAll('.delete-quantity-link').forEach((deleteLink)=>{
        deleteLink.addEventListener('click',()=>{
          //To know what a link is clicked, we have to get its id! We can get it using data attachment
          let productId = deleteLink.dataset.productId;
          removeFromCart(productId);
  
          //Then remove the cartItem from the page
          let container = document.querySelector(`.cart-item-container-${productId}`);
          container.remove();
          updateCartQuantity();
          renderPaymentSummary();
          renderOrderSummary();
 
        });
    });

    updateProductQuantity(renderPaymentSummary);
    }
  
