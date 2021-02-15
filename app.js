//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const userStartingName = "Annoymous";
const userStartingComment = "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const productStartingTitle = "White T-Shirt -Nike";
const productStartingDiscription = "Nike Woments Pink Half Zip Lightweight Hooded Shirt Top Athelkadfx Size M";


const app = express();

var users = [];
var products = [{
        name: 'ALN',
        qty: '4',
        price: '3',
        detail: 'adsfdsf',
        category: 'Eletronics'
    },
    {
        name: 'lnlkjo',
        qty: '4',
        price: '4',
        detail: 'asdfvc',
        category: 'Eletronics'
    }
];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

app.get("/", function (req, res) {
        res.render("home", {
            products: products
        });
});

app.get("/product/:productTitle", function (req, res) {
    
    products.forEach(function(product){
        if(product.name === req.params.productTitle){
            res.render("product", {
                users: users,
                product: product
            });
        }
    });
});

app.post("/product/:productTitle", function (req, res) {
    const user = {
        name: req.body.userName,
        comment: req.body.userComment
    };

    users.push(user);
    res.redirect("/product/"+req.params.productTitle);

});

app.get("/admin", function (req, res) {
    res.render("admin/products", {
        products: products
    });
});

app.get("/addproduct", function (req, res) {
    res.render("admin/addproduct");
});

app.post("/addproduct", function (req, res) {
    const product = {
        name: req.body.productName,
        qty: req.body.quantity,
        price: req.body.pricePerProduct,
        detail: req.body.detail,
        category: req.body.category
    };

    products.push(product);
    res.redirect("/admin");

});

app.get("/delete/:productTitle", function (req, res) {
    products.forEach(function (product) {
        if (req.params.productTitle === product.name) {
            products.pop(product);
        }
        res.redirect("/admin");
    });
});

app.get("/update/:productTitle", function(req, res){
   

    for(var i=0; i<products.length; i++){
        if (req.params.productTitle === products[i].name) {
            res.render("admin/Updateproduct", {
                products:products[i]
            });
            products.pop(products[i]);
        }
    } 
});

app.post("/update", function(req, res){
    const product = {
        name: req.body.productName,
        qty: req.body.quantity,
        price: req.body.pricePerProduct,
        detail: req.body.detail,
        category: req.body.category
    };

    products.push(product);
    res.redirect("/admin");
});

app.get("/signin", function(req, res){
    res.render("signin");
});



app.listen(3000, function () {
    console.log("Sever started on port 3000");
});