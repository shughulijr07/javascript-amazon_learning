// Promise ni njia ya kushughulika na asynchronous operations (vitu vinavyofanyika kwa muda fulani, mfano: kusubiri response kutoka kwa server).

// Kwa mfano, badala ya kutumia callback functions (ambazo mara nyingi husababisha code ngumu), Promise hurahisisha kazi hiyo.

// Mfano rahisi: “Naahidi nitakuletea chai. Ukikubali (fulfilled), nitakuletea. Ukikataa (rejected), sitaleta.

const ahadi = new Promise((resolve, reject) => {
  // kazi fulani inafanyika hapa...

  if (kazi_imefanikiwa) {
      resolve("Kazi imefanikiwa!");
  } else {
      reject("Kuna tatizo limetokea!");
  }
});

// ✅ STEP 3: Kutumia Promise (then & catch)
ahadi
  .then(response => {
    console.log("SUKSESI:", response);
  })
  .catch(error => {
    console.log("KOSA:", error);
  });

  // ✅ STEP 4: Mfano halisi rahisi
  const kuletaChai = new Promise((resolve, reject) => {
    const imeleta = true;
  
    if (imeleta) {
      resolve("Chai imeletwa!");
    } else {
      reject("Samahani, hakuna chai.");
    }
  });
  
  kuletaChai
    .then(msg => {
      console.log(msg);
    })
    .catch(kosa => {
      console.log(kosa);
    });

    // ✅ STEP 5: Promise with Delay (setTimeout)
    const delayedPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("I arrived after 2 seconds");
      }, 2000);
    });
    
    delayedPromise.then(msg => {
      console.log(msg);
    });

    //✅ STEP 6: Promise Chaining,
    //  You can chain multiple .then() calls:
    new Promise((resolve, reject) => {
      resolve(5);
    })
      .then(n => {
        console.log("Start:", n);
        return n * 2;
      })
      .then(n => {
        console.log("Doubled:", n);
        return n + 10;
      })
      .then(n => {
        console.log("Total:", n);
      });

      // ✅ STEP 7: Using async/await (Simpler way)
      function getFood() {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve("Food is ready!");
          }, 2000);
        });
      }
      
      async function eatFood() {
        const food = await getFood();
        console.log(food);
      }
      
      eatFood();

      
      // Examples
      // 1.Fetch data from API
          fetch("https://api.example.com/users")
          .then(response => response.json())
          .then(data => {
            console.log("User Data:", data);
          })
          .catch(error => {
            console.log("Failed to fetch:", error);
          });
          // fetch() ni Promise inayorejesha data kutoka kwa server

      // 2.Kusubiri user login
          function loginUser(email, password) {
            return new Promise((resolve, reject) => {
              if (email === "admin@test.com" && password === "1234") {
                resolve("Login successful!");
              } else {
                reject("Invalid credentials.");
              }
            });
          }
          
          loginUser("admin@test.com", "1234")
            .then(msg => console.log(msg))    //.then() – inachukuliwa iwapo login imefanikiwa.
            .catch(err => console.log(err));  //.catch() – inachukuliwa iwapo login imekosea.

            //mfano no 2 kwa kutumia async/await badala ya .then

            function loginUser(email, password) {
              return new Promise((resolve, reject) => {
                if (email === "admin@test.com" && password === "1234") {
                  resolve("Login successful!");
                } else {
                  reject("Invalid credentials.");
                }
              });
            }
            
            async function handleLogin() {
              try {
                const response = await loginUser("admin@test.com", "1234");
                console.log(response);
              } catch (error) {
                console.log(error);
              }
            }
            
            handleLogin();
            

       // 3.Loading animation
          function wait(ms) {
            return new Promise(resolve => {
              setTimeout(resolve, ms);
            });
          }
          
          async function showLoading() {
            console.log("Loading...");
            await wait(3000);
            console.log("Finished Loading!");
          }
          
          showLoading();

        // 4.Kufanya multiple request kwa wakati mmoja
              const request1 = fetch("https://api.example.com/users");
              const request2 = fetch("https://api.example.com/products");

              Promise.all([request1, request2])
                .then(async ([res1, res2]) => {
                  const users = await res1.json();
                  const products = await res2.json();
                  console.log("Users:", users);
                  console.log("Products:", products);
                })
                .catch(error => {
                  console.log("One of the requests failed:", error);
                });

        // 5.Ku upload picha kwenye server
              function uploadImage(imageFile) {
                return new Promise((resolve, reject) => {
                  const isSuccess = true; // Pretend we uploaded
              
                  setTimeout(() => {
                    if (isSuccess) {
                      resolve("Image uploaded successfully!");
                    } else {
                      reject("Image upload failed.");
                    }
                  }, 2000);
                });
              }
              
              uploadImage("myImage.png")
                .then(msg => console.log(msg))
                .catch(err => console.error(err));
                
  
      

          
    

    
    
    


