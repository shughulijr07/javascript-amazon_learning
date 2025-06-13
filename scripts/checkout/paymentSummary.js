import { cart, updateCartQuantity, updateItemsQuantity } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatNumber } from "../../data/utils.js";

  export function renderPaymentSummary(){    
    let html = `
      <div class="payment-summary-title">
        Order Summary
      </div>

      <div class="payment-summary-row">
        <div>Items (<span class="items-quantity"></span>):</div>
        <div class="payment-summary-money total-product-cost"></div>
      </div>

      <div class="payment-summary-row ">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money shipping"></div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total Cost:</div>
        <div class="payment-summary-money total-cost"></div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (0%):</div>
        <div class="payment-summary-money estimated-tax"></div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money order-total"></div>
      </div>

      <button class="place-order-button button-primary">
        Place your order
      </button>
    `;
    
    document.querySelector('.payment-summary').innerHTML = html;
    updateItemsQuantity(); 

    let totalProductCost = 0;

    cart.forEach((cartItem) =>{
      let matchingItem;
      products.forEach(product =>{
        if(cartItem.productId === product.id){
           totalProductCost += product.priceCents * cartItem.quantity;
        }
      });
    });

    let shippingCost = 5000;
    let totalCost = shippingCost + totalProductCost;
    let estimatedTax = 0;
    let orderTotal = totalCost + estimatedTax;

    document.querySelector('.total-product-cost').innerHTML = formatNumber(totalProductCost);
    document.querySelector('.shipping').innerHTML = formatNumber(shippingCost);
    document.querySelector('.total-cost').innerHTML = formatNumber(totalCost);
    document.querySelector('.estimated-tax').innerHTML = formatNumber(estimatedTax);
    document.querySelector('.order-total').innerHTML = formatNumber(orderTotal);



  }

