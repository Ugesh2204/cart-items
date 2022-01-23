let decrease = document.querySelector(".decrease");
let increase = document.querySelector(".increase");
let value = document.querySelector("#value");
let sellingprice = document.querySelector(".selling-price");
let total = document.querySelector(".total");
let btns = document.querySelectorAll(".btn");


// display items onload with DOMContentLoaded


if(localStorage.getItem("products")=== null){
    alert("no item found");
} else {
    window.addEventListener("DOMContentLoaded",  getProductLocalStorage());

}




let count = 0

btns.forEach(function (btn) {
    console.log(btn);
    //pou chak btn add a click
    btn.addEventListener("click", function (e){
        const styles = e.currentTarget.classList;
        if(styles.contains("increase")){
            count++;
        }
        else if (styles.contains("decrease")){
            count--;
        }
        else {
            count = 0;
        }

    //value.textContent = count;
    value.innerHTML = `<span id="result">${count}</span>`;
    // value.innerHTML = count;

    })
});

//calculation of items

let addtocart = document.querySelector(".cart-btn");
 let cartcontainer = document.getElementById("cart-container");
let totalcount = 0;

addtocart.addEventListener("click",function(){
    //let result = document.querySelector("#result").value;
    //this below is to get value from an input files
      // or innerText, or textContent
    let result = document.getElementById("result").innerText;
    totalcount = result*250;
    console.log(totalcount);
    total.innerHTML = totalcount;
    const id = new Date().getTime().toString();
   
    if(totalcount > 0) {
        //Add to cart 
        
        cartcontainer.innerHTML += `<div id="${id}" class="cart-item">
        <img  class="imglink" src="./img/image-product-1-thumbnail.jpg" width="30" heigh="30"/>
        <span>Fall Limited Edition Sneakers 
          <span class="fixedprice">$125.00</span> x 
          <span id="numberofproduct">${result}</span> 
          <b>$${totalcount}.00</b>
        </span>
        <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
        </div>`

        let fixedprice = document.querySelector(".fixedprice").textContent;
        console.log(fixedprice);
        let imglink = document.querySelector(".imglink").src;
        let numberofproduct = document.getElementById("numberofproduct").textContent;
        
        addProduct(id,imglink,fixedprice,numberofproduct,totalcount);
        
    } else{

        cartcontainer.innerHTML += "";
    }

})



 function addProduct(id,imglink,fixedprice,numberofproduct,totalcount){
     
    let products = [];
    console.log(products);

    if(localStorage.getItem('products')){
        products = JSON.parse(localStorage.getItem('products'));
    }

    products.push(
        {
            'productId' : id,
            'imglink' : imglink,
            'fixedprice':fixedprice,
            'numberofproduct': numberofproduct,
            'totalcount': totalcount
        }
        
    );

    localStorage.setItem('products', JSON.stringify(products));

 }

 function getProductLocalStorage(){
     let listofproduct = JSON.parse(localStorage.getItem("products"));
     let container = document.getElementById("cart-container");

     for(let i = 0; i<listofproduct.length; i++){
        let productitem = listofproduct[i];

        let cartitem = document.createElement('div');
        cartitem.setAttribute('class','cart-item');
        cartitem.setAttribute('id',`card-${productitem.productId}`);
        container.appendChild(cartitem);

        let cartitemcontainer = document.getElementById(`card-${productitem.productId}`);
        let productimg = document.createElement('img');
        productimg.src=`${productitem.imglink}`;
        productimg.setAttribute('class','imglink');
        productimg.setAttribute('width','30');
        productimg.setAttribute('height','30');
        cartitemcontainer.appendChild(productimg);
        

        let span = document.createElement('span');
        span.setAttribute('id',`pricecontainer-${productitem.productId}`);
        cartitemcontainer.appendChild(span);
        let spanconatiner = document.getElementById(`pricecontainer-${productitem.productId}`);
        spanconatiner.innerHTML =`Fall Limited Edition Sneakers 
        <span class="fixedprice">${productitem.fixedprice} </span> x  
        <span id='numberofitem-${productitem.productId}'>${productitem.numberofproduct}</span>
        <b>$${productitem.totalcount}.00</b>`


         console.log(listofproduct[i].numberofproduct);

         
     }

     
 }



