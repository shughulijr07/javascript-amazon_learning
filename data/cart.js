export let cart = [];

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