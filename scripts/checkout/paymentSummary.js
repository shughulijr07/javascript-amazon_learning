import { cart, updateCartQuantity, updateItemsQuantity } from "../../data/cart.js";

  export function renderPaymentSummary(){
    
    let html = `
        <div class="payment-summary-title">
        Order Summary
      </div>

      <div class="payment-summary-row">
        <div>Items (<span class="items-quantity"></span>):</div>
        <div class="payment-summary-money">$42.75</div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$4.99</div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$47.74</div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$4.77</div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$52.51</div>
      </div>

      <button class="place-order-button button-primary">
        Place your order
      </button>
    `;
    
    document.querySelector('.payment-summary').innerHTML = html;
    
    updateItemsQuantity();
    // let itemQuantity = updateItemsQuantity();
    // document.querySelector('.items-quantity').innerHTML = itemQuantity;
  }
  renderPaymentSummary();
