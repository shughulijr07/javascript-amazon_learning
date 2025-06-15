
 let myCart = {
  cartItem: undefined,

  loadFromStorage:function(){
   this.cartItem = JSON.parse(localStorage.getItem('cart-oop'));

   if(!this.cartItem){
      this.cartItem = [
        {
          productId: '3ebe75dc-64d2-4137-8860-1f5a963e534b',
          quantity:2
        },
        {
          productId: '8c9c52b5-5a19-4bcb-a5d1-158a74287c53',
          quantity:1
        }
      ];
   }
  },

  saveToStorage(){ //this line can also be written saveToStorage:function(){
    localStorage.setItem('cart-oop', JSON.stringify(this.cartItem));
  },

  addToCart(productId){
    let quantitySelected = document.querySelector(`.quantity-selector-${productId}`).value;
    let selectedQuantity = Number(quantitySelected);

    let matchingItem;
    this.cartItem.forEach((item)=>{
      if(productId === item.productId){
          matchingItem = item;
      }
    });

    if(matchingItem){
      matchingItem.quantity +=selectedQuantity;
    }else{
      this.cartItem.push({
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
    this.saveToStorage();
  },

  removeFromCart(productId){
    let updatedCart = this.cartItem.filter(cartItem => cartItem.productId !== productId); 
    //It return new array with only products whose id is not equal to id u want ro remove 

    this.cartItem = updatedCart;
    this.saveToStorage();
  },

  updateCartQuantity(){
    //Update number of quantity in the cart
    let cartQuantity = 0;
    this.cartItem.forEach((cartItem)=>{
      cartQuantity += cartItem.quantity;;
    });
    document.querySelector('.cart-quantity').innerHTML = cartQuantity;
  },
  
  updateCart(productId, quantityValue){
    let matchingItem;
    this.cartItem.forEach((cartItem) =>{
      if(cartItem.productId === productId){
          matchingItem = cartItem;
      }
    });
    if(matchingItem){
       matchingItem.quantity = Number(quantityValue);
    }
    this.saveToStorage();
  },

  updateProductQuantity(renderPaymentSummary){
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

        this.updateCart(productId, quantityValue);
        this.updateCartQuantity();
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
  },
  
  updateItemsQuantity(){
    //Update number of quantity in the cart
    let cartQuantity = 0;
    this.cartItem.forEach((cartItem)=>{
      cartQuantity += cartItem.quantity;;
    });
    document.querySelector('.items-quantity').innerHTML = cartQuantity;
  
    return cartQuantity;
  }
}

myCart.loadFromStorage();

 
console.log(myCart.cartItem);

