export let cart = JSON.parse(localStorage.getItem('cart'))

  // if(!cart){
  //   cart = [
  //     {
  //       productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  //       quantity:1
  //     },
  //     {
  //       productId:'83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
  //       quantity:3
  //     },
  //     {
  //       productId:'3ebe75dc-64d2-4137-8860-1f5a963e534b',
  //       quantity:2
  //     },
  //   ]
  // }

    export function saveToStorage(){
      localStorage.setItem('cart', JSON.stringify(cart));
    }

    export function addToCart(productId){
          let quantitySelected = document.querySelector(`.quantity-selector-${productId}`).value;
          //Convert it to number, coz quantitySelected inakuja kama string 
          let selectedQuantity = Number(quantitySelected);

          //Check if the product is already in the cart, if yes, update quantity
          let matchingItem;
          cart.forEach((item)=>{
            if(productId === item.productId){
                matchingItem = item;
            }
          });

          if(matchingItem){
            matchingItem.quantity +=selectedQuantity;
          }else{
            cart.push({
              productId: productId,
              quantity: selectedQuantity,
              deliveryOptionId: 1,
            });
          }

          //Display added message 
          let addedVisible = document.querySelector(`.added-to-cart-${productId}`);
          addedVisible.classList.add('added-to-cart-visible');

          //Remove the message displayed after 2 sec
          setTimeout(() => {
            let removeVisibility = document.querySelector(`.added-to-cart-${productId}`);
            removeVisibility.classList.remove('added-to-cart-visible');
          }, 2000);
          saveToStorage();
    }

    export function removeFromCart(productId){
      let updatedCart = cart.filter(cartItem => cartItem.productId !== productId); 
      //It return new array with only products whose id is not equal to id u want ro remove 

      // Alternative way for above code 
      // let newCart = [];
      // cart.forEach(cartItem =>{
      //     if(cartItem.productId !== productId){
      //       newCart.push(cartItem);
      //     }
      // });

      cart = updatedCart;
      saveToStorage();
    }

    export function updateCartQuantity(){
      //Update number of quantity in the cart
      let cartQuantity = 0;
      cart.forEach((cartItem)=>{
        cartQuantity += cartItem.quantity;;
      });
      document.querySelector('.cart-quantity').innerHTML = cartQuantity;
    }

    export function updateCart(productId, quantityValue){
      let matchingItem;
      cart.forEach((cartItem) =>{
        if(cartItem.productId === productId){
            matchingItem = cartItem;
        }
      });
      if(matchingItem){
         matchingItem.quantity = Number(quantityValue);
      }
      saveToStorage();
    }

    export function updateProductQuantity(renderPaymentSummary){
      document.querySelectorAll(`.update-quantity-link`).forEach((updateLink) => {
          updateLink.addEventListener('click', ()=>{
            let productId = updateLink.dataset.productId;

            //Show quantity input and save link
            document.querySelector(`.new-quantity-${productId}`).classList.add('is-shown');
            document.querySelector(`.save-quantity-${productId}`).classList.add('is-shown');
            //Hide update link and quantity label
            document.querySelector(`.quantity-label-${productId}`).classList.add('hidden');
            document.querySelector(`.update-quantity-link-${productId}`).classList.add('hidden');

          })
        });

      document.querySelectorAll('.save-quantity').forEach((saveLink) => {
        saveLink.addEventListener('click', ()=>{
          let productId = saveLink.dataset.productId;
          let quantityElement = document.querySelector(`.new-quantity-${productId}`);
          let quantityValue = quantityElement.value;

          updateCart(productId, quantityValue);
          updateCartQuantity();
          //make new quantity appear instantly after click save
          document.querySelector(`.quantity-label-${productId}`).innerHTML = quantityValue;
          quantityElement.value = '';

            //Hide quantity input and save link
            document.querySelector(`.new-quantity-${productId}`).classList.remove('is-shown');
            document.querySelector(`.save-quantity-${productId}`).classList.remove('is-shown');

            //Show update link and quantity label
            document.querySelector(`.quantity-label-${productId}`).classList.remove('hidden');
            document.querySelector(`.update-quantity-link-${productId}`).classList.remove('hidden');
            renderPaymentSummary();
        })
      });
    }
    

export function updateItemsQuantity(){
  //Update number of quantity in the cart
  let cartQuantity = 0;
  cart.forEach((cartItem)=>{
    cartQuantity += cartItem.quantity;;
  });
  document.querySelector('.items-quantity').innerHTML = cartQuantity;

  return cartQuantity;
}