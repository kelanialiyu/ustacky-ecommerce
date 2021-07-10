// a product class 
class Product{
    name;
    price;
    image_url ="../img/product1.png";
    selected;
    quantity;
    product_ui;
    table_ui = null;
    constructor(name, price, image_url, selected,quantity, parent_id){
        this.name = name;
        this.price = price;
        this.selected = selected;
        this.quantity = eval(quantity);
        this.image_url = image_url;
        this.product_ui = this.display(parent_id);
    }

    // displaying a product
    display = function (parent_id) {
        var parent = document.querySelector(parent_id);
        var shop_product = document.createElement("div");
        var product_img = document.createElement("div");
        var product_detail = document.createElement("div");
        var price = document.createElement("p");
        var name = document.createElement("p");
        var text = (this.selected) ? "Remove from Cart" : "Add to Cart";
        var button = document.createElement("button");
        var product_name = document.createElement("div");
        price.classList.add("price");
        price.innerText = eval(this.price).toLocaleString();
        product_detail.appendChild(price);
        product_detail.className = "product-details";
        product_img.appendChild(product_detail);
        product_img.className = "product-img";
        product_img.style.backgroundImage = "url(" + this.image_url + ")";
        name.innerText = this.name;
        product_name.className = "product-name"
        product_name.appendChild(name);
        button.classList.add("product-button");
        button.innerText = text;
        shop_product.classList.add("shop-product");
        shop_product.appendChild(product_img);
        shop_product.appendChild(product_name);
        shop_product.appendChild(button);
        parent.appendChild(shop_product);
        return shop_product;
    }

    //displaying a product in a table
    display_table = function (parent_id, counter) {
        this.selected = true;
        parent = document.querySelector(parent_id);
        var tablerow = document.createElement("tr");
        tablerow.innerHTML = "<td>" + counter + "</td><td>" + this.name + "</td><td>" + eval(this.price).toLocaleString() + "</td ><td><button class='quantity-add'>+</button><span class='quantity-count'>" + this.quantity + "</span>    <button class='quantity-sub'>-</button></td><td><button class='remove'>remove</button></td>";
        parent.appendChild(tablerow);
        this.button_text();
        return tablerow;
    }

    // removing a product from a table 
    remove_table=function(parent_id) {
        this.selected = false;
        this.quantity = 0;
        this.button_text();
        if(this.table_ui != null){
            parent = document.querySelector(parent_id);
            parent.removeChild(this.table_ui);
           
        }
        return null;
    }

    visual_remove_table=function(parent_id) {
        if(this.table_ui != null){
            parent = document.querySelector(parent_id);
            parent.removeChild(this.table_ui);
        }
        return null;
    }

    // manipulating product quantity 
    manipulate_quantity=function(operator,parent_id){
        if(operator =="+"){
            this.quantity++;   
        }
        else if(operator=="-"){
            if (this.quantity > 1) {
                this.quantity--;
            }
            else {
                if (window.confirm("Opps you cant have less than 1 item. \nwould you like to remove product from cart")) {
                    this.table_ui=this.remove_table(parent_id);
                    return
                }
            }
        }

        this.table_ui.querySelector("span.quantity-count").innerText = this.quantity;
    }

    // maipulating product button text 
    button_text=function(){
        var button = this.product_ui.querySelector("button");
        if(!this.selected){
            button.className = "product-button";
            button.innerText = "Add to Cart";
        }
        else{
            button.className = "product-button product-button-remove";
            button.innerText = "Remove from Cart"; 
        }
    }
}

// an array of products 
var no_of_products_in_cart;
var total_price;
var products=[];
var product;
product = new Product("samsung TV", "500000", "img/product1.png", false, 0, ".shop-products");
products.unshift(product);
product = new Product("pixel 4a", "250000", "img/product2.png", false, 0, ".shop-products");
products.unshift(product);
product = new Product("ps 5", "300000", "img/product3.png", false, 0, ".shop-products");
products.unshift(product);
product = new Product("macbook air", "800000", "img/product4.png", false, 0, ".shop-products");
products.unshift(product);
product = new Product("Apple watch", "950000", "img/product5.png", false, 0, ".shop-products");
products.unshift(product);
product = new Product("air pods", "75000", "img/product6.png", false, 0, ".shop-products");
products.unshift(product);


// dealing with the cart 

var cart=[]

// adding event listeners to all products 
var total_price = document.querySelector(".checkout-form p.total-amount");
var parent_id =".checkout-items table tbody";
var count= document.querySelector(".shopping-cart span.count");
var pkey ="pk_test_c6f81d32e6774d7565f2ae803d6177082983fd34";

count.innerText=0;
console.log(count)
products.forEach(product => {
    product.product_ui.querySelector("button").addEventListener("click", function () {
        // adding table button event listers
        if (!product.selected) {
            add_product_to_cart(product)
            refresh();
        }
        else{
            remove_product_from_cart(product)           
            refresh();
        }
    });
});

function refresh(){
    
    var counter=0;
    cart.forEach(product => {
        counter++;
        if (product.table_ui !=null){
            product.table_ui = product.visual_remove_table(parent_id);
        }
        product.table_ui = product.display_table(".checkout-items table tbody", counter)
        add_productEventListener(product)
    });
    
    document.querySelector(".shopping-cart span.count").innerText = counter;
    total_price.innerText = get_cart_total();
}

function reset() {
    while (cart.length>0) {
        remove_product_from_cart(cart[0]);
    }
    refresh()
    console.log(cart)
}

// helper functions
function remove_product_from_cart(product) {
    var index = cart.findIndex(function (currproduct) {
        if (currproduct.name == product.name &&
            currproduct.price == product.price &&
            currproduct.image_url == product.image_url 
        ){
            return true
        }
        else{
            return false
        }

    }, product);

    if (index != -1){

        cart[index].table_ui = product.remove_table(parent_id);
        cart.splice(index, 1); 
    }
}

function add_product_to_cart(product){
    product.quantity = eval(product.quantity) + 1;
    cart.unshift(product);
}

function get_cart_total(){
    var total = 0;
    cart.forEach(product => {
        total+=product.price* product.quantity;
    });
    return total.toLocaleString();
    
}

function get_cart_total_number() {
    var total = 0;
    cart.forEach(product => {
        total += product.price * product.quantity;
    });
    return total;
}

// adding product event listiners
function add_productEventListener(product){
    product.table_ui.querySelector(".quantity-add").addEventListener("click", function () {
        product.manipulate_quantity("+", parent_id);
        refresh()
    });
    product.table_ui.querySelector(".quantity-sub").addEventListener("click", function () {
        product.manipulate_quantity("-", parent_id);
        if (!product.selected) {
            remove_product_from_cart(product)
        }
        refresh()
    });
    product.table_ui.querySelector("button.remove").addEventListener("click", function () {
        remove_product_from_cart(product)
        refresh()
    });
}

// checkoutbutton toggle
document.querySelector(".shopping-cart").addEventListener("click",function(){
        document.querySelector(".checkout").className = "checkout checkout-reappear";
})

document.querySelector(".checkout .button button[type=reset]").addEventListener("click", function () {
    document.querySelector(".checkout").className = "checkout checkout-disappear";
})

document.querySelector("main").addEventListener("click", function () {
    if (document.querySelector(".checkout").className !="checkout loaded"){
        document.querySelector(".checkout").className = "checkout checkout-disappear";
    }

    if (document.querySelector(".checkout-success").className != "checkout-success loaded") {
        document.querySelector(".checkout-success").className = "checkout-success checkout-disappear";
    }
})

// document.querySelector("header").addEventListener("click", function () {
//     document.querySelector(".checkout").className = "checkout checkout-disappear";
// })

document.querySelector("footer").addEventListener("click", function () {
    document.querySelector(".checkout").className = "checkout checkout-disappear";
    document.querySelector(".checkout-success").className = "checkout-success checkout-disappear";
})

//success toggle
document.querySelector(".checkout-success .button button[type]").addEventListener("click", function () {
    document.querySelector(".checkout-success").className = "checkout-success checkout-disappear";
})


// form validation
document.querySelector(".checkout form").addEventListener("submit",function (event) {
    event.preventDefault();
    if (validateForm() ){
        payWithPaystack()
    }
    else{
        return false;
    }
})

function displaySummary (parent_id) {
    var ancestor = document.querySelector(parent_id);
    ancestor.querySelector("span.customername").innerText = document.querySelector(".checkout form input.name").value;
    var parent = ancestor.querySelector(".checkout-items table tbody");
    parent.innerHTML="";
    var counter=0;
    cart.forEach(product=>{
        counter++;
        var tablerow = document.createElement("tr");
        tablerow.innerHTML = "<td>" + counter + "</td><td>" + product.name + "</td><td>" +  product.quantity +"</td>";
        parent.appendChild(tablerow);
    })
    reset()
}

 function validateForm(){
    var name = document.querySelector(".checkout form input.name").value;
    var nameError=false;
    var email = document.querySelector(".checkout form input.email").value;
    var emailError = false;
    var phone = document.querySelector(".checkout form input.phone").value;
    var phoneError=false;
    var cartError=false;
    if(name == ""){
        document.querySelector(".checkout form .error-message.name").innerText="Opps! name is required";
        nameError= true;
    }

    if(email == ""){
        document.querySelector(".checkout form .error-message.email").innerText = "Opps! Email is required";
        emailError = true;
    }
    else if(validateEmail(email)){
        document.querySelector(".checkout form .error-message.email").innerText = "Pls Enter a valid email";
        emailError = true;
    }

    if (phone == "") {
        document.querySelector(".checkout form .error-message.phone").innerText = "Opps! Phone number is required";
        phoneError = true;
    }
    else if(!phonenumber(phone)){
        document.querySelector(".checkout form .error-message.phone").innerText = "Pls Enter a valid ng phone number";
        phoneError = true;
    }
     if (cart.length <= 0) {
         document.querySelector(".checkout .error-message.cart").innerText = "Pls select some products";
         cartError=true;
     }
    if(emailError){
        document.querySelector(".checkout form .error-message.email").style.display = "block";
        document.querySelector(".checkout form input.email").className=" email input-error";
    }
    else{
        document.querySelector(".checkout form .error-message.email").style.display = "hidden";
        document.querySelector(".checkout form .error-message.email").innerText=""
        document.querySelector(".checkout form input.email").className = "email";
    }

    if (phoneError) {
        document.querySelector(".checkout form .error-message.phone").style.display = "block";
        document.querySelector(".checkout form input.phone").className = " phone input-error";
    }
    else {
        document.querySelector(".checkout form .error-message.phone").style.display = "hidden";
        document.querySelector(".checkout form .error-message.phone").innerText = "";
        document.querySelector(".checkout form input.phone").className = "phone";
    }

    if (nameError) {
        document.querySelector(".checkout form .error-message.name").style.display = "block";
        document.querySelector(".checkout form input.name").className = " name input-error";
    }
    else {
        document.querySelector(".checkout form .error-message.name").style.display = "hidden";
        document.querySelector(".checkout form .error-message.name").innerText = ""
        document.querySelector(".checkout form input.name").className = "name";
    }

     if (cartError) {
         document.querySelector(".checkout .error-message.cart").style.display = "block";
     }
     else {
         document.querySelector(".checkout  .error-message.cart").style.display = "hidden";
         document.querySelector(".checkout  .error-message.cart").innerText = ""
     }
    return !(nameError || phoneError || emailError || cartError);
 }

function validateEmail(email) {
    const re = /^\S+\@\S+\.\S$/;
    return re.test(email.toLowerCase());
}

function phonenumber(num){
    var phoneno = /(^\d{11}$)|(^(\+)?234\d{10}$)/;
    return phoneno.test(num)
}

function payWithPaystack() {
    var handler = PaystackPop.setup({
        key: pkey, // Replace with your public key
        email: document.querySelector(".checkout form input.email").value,
        amount: get_cart_total_number() * 100, // the amount value is multiplied by 100 to convert to the lowest currency unit
        currency: 'NGN', // Use GHS for Ghana Cedis or USD for US Dollars
        ref: Math.floor(Math.random() * 100000000), // Replace with a reference you generated
        callback: function (response) {
            document.querySelector(".checkout").className = "checkout checkout-disappear";
            displaySummary(".checkout-success")
            document.querySelector(".checkout-success").className = "checkout-success checkout-reappear";

            // Make an AJAX call to your server with the reference to verify the transaction
        },
        onClose: function () {
            return false;
        },
    });
    handler.openIframe();
}