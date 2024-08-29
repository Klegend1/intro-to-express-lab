// import express 
const express = require('express');

// initialize the app
const app = express();



//1. Be Polite, Greet the User
//Create a route that responds to URLs like /greetings/<username-parameter></username-parameter>


app.get('/greeting/:Megan', (req, res) => {
    const Megan = req.params.Megan
    res.send(`Hello there, ${Megan}!`)
});   

//2. Rolling the Dice
//Set up a route to handle URLs following the pattern /roll/<number-parameter></number-parameter>

app.get('/roll/:number', (req, res) => {
    const param = req.params.number;

    const number = parseInt (req.params.number, 10);
    if (isNaN(number) || number < 0) 
     return res.send(`Rolling a die with ${number} sides!`);

    const result = Math.floor(Math.random() * (number + 1));
    res.send(`You rolled a ${result}.`);
});


//Create a route for URLs like /collectibles/<index-parameter>.
//Matches routes such as /collectibles/2 or /collectibles/0

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];


app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);

    if (isNaN(index) || index < 0 || index >= collectibles.length) {
        return res.status(404).send("This item is not yet in stock. Check back soon!");
    }

    const item = collectibles[index];
    res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);

});


//Create a route /shoes that filters the list of shoes based on query parameters

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
    const { 'min-price': minPrice, 'max-price': maxPrice, type } = req.query;

let filteredShoes = shoes;

if (minPrice) {
    const min = parseFloat(minPrice);
    if (!isNaN(min)) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price >= min);
    }
}

if (maxPrice) {
    const max = parseFloat(maxPrice);
    if (!isNaN(max)) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price <= max);
    }
}

if (type) {
    filteredShoes = filteredShoes.filter(shoe => shoe.type === type);
}

res.json(filteredShoes);
});

// start the llistener method

app.listen(3000, ()=>console.log('Server is running'))