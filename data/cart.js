export let cart = JSON.parse(localStorage.getItem('cart'))

    if(cart == null){
      cart = [];
    }
    function saveToStorage(){
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
      //Update numbger of quantity in the cart
      let cartQuantity = 0;
      cart.forEach((cartItem)=>{
        cartQuantity += cartItem.quantity;;
      });
      document.querySelector('.cart-quantity').innerHTML = cartQuantity;
    }