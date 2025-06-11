export let cart = [
  {
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
  },
  {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity:3
  }
];
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
}