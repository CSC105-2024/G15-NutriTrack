import db from "../src/lib/db.ts";

const ingredientCategories: Record<string, string> = {
  // Proteins
  Shrimp: "Protein",
  Chicken: "Protein",
  Beef: "Protein",
  Pork: "Protein",
  Tofu: "Protein",
  Eggs: "Protein",
  "Fish fillets": "Protein",
  "Whole fish": "Protein",
  "Ground chicken": "Protein",

  // Vegetables
  "Bean sprouts": "Vegetable",
  Mushrooms: "Vegetable",
  "Bamboo shoots": "Vegetable",
  Eggplant: "Vegetable",
  "Green papaya": "Vegetable",
  Tomatoes: "Vegetable",
  Carrots: "Vegetable",
  Onion: "Vegetable",
  Shallots: "Vegetable",
  "Chinese broccoli": "Vegetable",
  "Green beans": "Vegetable",
  "Green mango": "Vegetable",
  "Pickled mustard greens": "Vegetable",

  // Herbs & Spices
  Lemongrass: "Herb/Spice",
  "Kaffir lime leaves": "Herb/Spice",
  Galangal: "Herb/Spice",
  Chili: "Herb/Spice",
  Garlic: "Herb/Spice",
  "Thai basil": "Herb/Spice",
  Basil: "Herb/Spice",
  Coriander: "Herb/Spice",
  Mint: "Herb/Spice",
  "Lime leaves": "Herb/Spice",

  // Sauces & Pastes
  Tamarind: "Sauce/Paste",
  "Fish sauce": "Sauce/Paste",
  "Green curry paste": "Sauce/Paste",
  "Massaman curry paste": "Sauce/Paste",
  "Red curry paste": "Sauce/Paste",
  "Curry paste": "Sauce/Paste",
  "Soy sauce": "Sauce/Paste",
  "Oyster sauce": "Sauce/Paste",

  // Grains & Noodles
  "Rice noodles": "Grain/Noodle",
  "Sticky rice": "Grain/Noodle",
  Rice: "Grain/Noodle",
  "Egg noodles": "Grain/Noodle",

  // Dairy & Alternatives
  "Coconut milk": "Dairy/Alternative",
  "Condensed milk": "Dairy/Alternative",

  // Fruits
  Lime: "Fruit",
  Mango: "Fruit",

  // Nuts & Seeds
  Peanuts: "Nut/Seed",

  // Sweeteners
  Sugar: "Sweetener",

  // Others
  "Black tea": "Other",
  Ice: "Other",
  Salt: "Other",
};

const foods = [
  {
    name: "Pad Thai",
    calories: 350,
    protein: 15,
    fat: 14,
    carb: 45,
    description:
      "A stir-fried noodle dish with shrimp, tofu, peanuts, and a tangy tamarind sauce.",
    ingredients: [
      "Rice noodles",
      "Shrimp",
      "Tofu",
      "Eggs",
      "Peanuts",
      "Bean sprouts",
      "Tamarind",
      "Lime",
      "Sugar",
    ],
    preparation:
      "Stir-fry noodles, tofu, and shrimp with tamarind sauce. Top with peanuts and lime.",
    showDetails: false,
    imgUrl:
      "https://imgs.search.brave.com/H7-BoEeTJBCc3TcPBjgvox2kePuZ306BIz96rnZyIGU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjI5/NjAwNjg0L3Bob3Rv/L3BhZC10aGFpLWlz/b2xhdGVkLW9uLXRo/ZS10YWJsZS5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9UHU0/clNGd2RjRUpTcnZo/cFZRcUlVNnlFY3BJ/S0Y5QnBEYm85ekxt/MWg3VT0",
  },
  {
    name: "Tom Yum Soup",
    calories: 120,
    protein: 10,
    fat: 5,
    carb: 15,
    description:
      "A tangy and spicy hot and sour soup with shrimp and mushrooms.",
    ingredients: [
      "Shrimp",
      "Mushrooms",
      "Lemongrass",
      "Kaffir lime leaves",
      "Galangal",
      "Fish sauce",
      "Lime juice",
      "Chili",
    ],
    preparation:
      "Boil shrimp with herbs and spices to create a hot and sour broth.",
    showDetails: false,
    imgUrl:
      "https://imgs.search.brave.com/H7-BoEeTJBCc3TcPBjgvox2kePuZ306BIz96rnZyIGU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjI5/NjAwNjg0L3Bob3Rv/L3BhZC10aGFpLWlz/b2xhdGVkLW9uLXRo/ZS10YWJsZS5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9UHU0/clNGd2RjRUpTcnZo/cFZRcUlVNnlFY3BJ/S0Y5QnBEYm85ekxt/MWg3VT0",
  },
  {
    name: "Green Curry (Gaeng Keow Wan)",
    calories: 400,
    protein: 20,
    fat: 22,
    carb: 25,
    description:
      "A spicy, aromatic curry with coconut milk, green curry paste, and vegetables.",
    ingredients: [
      "Green curry paste",
      "Chicken",
      "Coconut milk",
      "Bamboo shoots",
      "Eggplant",
      "Basil",
      "Fish sauce",
    ],
    preparation:
      "Cook curry paste in coconut milk, then add chicken and vegetables.",
    showDetails: false,
    imgUrl:
      "https://imgs.search.brave.com/H7-BoEeTJBCc3TcPBjgvox2kePuZ306BIz96rnZyIGU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjI5/NjAwNjg0L3Bob3Rv/L3BhZC10aGFpLWlz/b2xhdGVkLW9uLXRo/ZS10YWJsZS5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9UHU0/clNGd2RjRUpTcnZo/cFZRcUlVNnlFY3BJ/S0Y5QnBEYm85ekxt/MWg3VT0",
  },
  {
    name: "Som Tum (Papaya Salad)",
    calories: 150,
    protein: 3,
    fat: 10,
    carb: 18,
    description:
      "A spicy and sour green papaya salad with peanuts, lime, and chili.",
    ingredients: [
      "Green papaya",
      "Lime",
      "Chili",
      "Fish sauce",
      "Peanuts",
      "Tomatoes",
    ],
    preparation:
      "Pound ingredients together in a mortar and pestle for a crunchy, fresh salad.",
    showDetails: false,
    imgUrl:
      "https://imgs.search.brave.com/H7-BoEeTJBCc3TcPBjgvox2kePuZ306BIz96rnZyIGU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjI5/NjAwNjg0L3Bob3Rv/L3BhZC10aGFpLWlz/b2xhdGVkLW9uLXRo/ZS10YWJsZS5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9UHU0/clNGd2RjRUpTcnZo/cFZRcUlVNnlFY3BJ/S0Y5QnBEYm85ekxt/MWg3VT0",
  },
  {
    name: "Massaman Curry",
    calories: 500,
    protein: 20,
    fat: 30,
    carb: 40,
    description:
      "A mild, flavorful curry with potatoes, peanuts, and a mix of aromatic spices.",
    ingredients: [
      "Massaman curry paste",
      "Beef or chicken",
      "Coconut milk",
      "Potatoes",
      "Peanuts",
      "Onion",
      "Fish sauce",
    ],
    preparation:
      "Simmer meat, curry paste, and coconut milk, adding potatoes and peanuts toward the end.",
    showDetails: false,
    imgUrl:
      "https://imgs.search.brave.com/H7-BoEeTJBCc3TcPBjgvox2kePuZ306BIz96rnZyIGU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjI5/NjAwNjg0L3Bob3Rv/L3BhZC10aGFpLWlz/b2xhdGVkLW9uLXRo/ZS10YWJsZS5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9UHU0/clNGd2RjRUpTcnZo/cFZRcUlVNnlFY3BJ/S0Y5QnBEYm85ekxt/MWg3VT0",
  },
  {
    name: "Thai Basil Chicken (Pad Krapow Gai)",
    calories: 350,
    protein: 30,
    fat: 18,
    carb: 15,
    description:
      "A spicy and savory stir-fried chicken dish with Thai basil and chili.",
    ingredients: [
      "Ground chicken",
      "Thai basil",
      "Garlic",
      "Chili",
      "Fish sauce",
      "Sugar",
      "Soy sauce",
    ],
    preparation:
      "Stir-fry ground chicken with garlic, chili, and sauces, then add Thai basil at the end.",
    showDetails: false,
    imgUrl:
      "https://imgs.search.brave.com/H7-BoEeTJBCc3TcPBjgvox2kePuZ306BIz96rnZyIGU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjI5/NjAwNjg0L3Bob3Rv/L3BhZC10aGFpLWlz/b2xhdGVkLW9uLXRo/ZS10YWJsZS5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9UHU0/clNGd2RjRUpTcnZo/cFZRcUlVNnlFY3BJ/S0Y5QnBEYm85ekxt/MWg3VT0",
  },
  {
    name: "Mango Sticky Rice",
    calories: 250,
    protein: 3,
    fat: 6,
    carb: 45,
    description:
      "A sweet and creamy dessert with sticky rice, coconut milk, and fresh mango.",
    ingredients: ["Sticky rice", "Mango", "Coconut milk", "Sugar", "Salt"],
    preparation:
      "Cook sticky rice and mix with coconut milk and sugar, then serve with sliced mango.",
    showDetails: false,
    imgUrl:
      "https://imgs.search.brave.com/H7-BoEeTJBCc3TcPBjgvox2kePuZ306BIz96rnZyIGU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjI5/NjAwNjg0L3Bob3Rv/L3BhZC10aGFpLWlz/b2xhdGVkLW9uLXRo/ZS10YWJsZS5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9UHU0/clNGd2RjRUpTcnZo/cFZRcUlVNnlFY3BJ/S0Y5QnBEYm85ekxt/MWg3VT0",
  },
  {
    name: "Pad See Ew",
    calories: 400,
    protein: 15,
    fat: 10,
    carb: 60,
    description:
      "A stir-fried noodle dish with soy sauce, Chinese broccoli, and your choice of protein.",
    ingredients: [
      "Rice noodles",
      "Chinese broccoli",
      "Eggs",
      "Chicken or beef",
      "Soy sauce",
      "Oyster sauce",
    ],
    preparation:
      "Stir-fry noodles, Chinese broccoli, and eggs with soy sauce and your choice of protein.",
    showDetails: false,
    imgUrl:
      "https://imgs.search.brave.com/H7-BoEeTJBCc3TcPBjgvox2kePuZ306BIz96rnZyIGU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjI5/NjAwNjg0L3Bob3Rv/L3BhZC10aGFpLWlz/b2xhdGVkLW9uLXRo/ZS10YWJsZS5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9UHU0/clNGd2RjRUpTcnZo/cFZRcUlVNnlFY3BJ/S0Y5QnBEYm85ekxt/MWg3VT0",
  },
  {
    name: "Khao Pad (Thai Fried Rice)",
    calories: 400,
    protein: 12,
    fat: 15,
    carb: 50,
    description:
      "A flavorful fried rice dish with eggs, vegetables, and your choice of protein.",
    ingredients: [
      "Rice",
      "Eggs",
      "Garlic",
      "Carrots",
      "Onion",
      "Chicken or shrimp",
      "Soy sauce",
      "Fish sauce",
    ],
    preparation:
      "Fry rice with garlic, vegetables, and eggs. Add protein and season with sauces.",
    showDetails: false,
    imgUrl:
      "https://imgs.search.brave.com/H7-BoEeTJBCc3TcPBjgvox2kePuZ306BIz96rnZyIGU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjI5/NjAwNjg0L3Bob3Rv/L3BhZC10aGFpLWlz/b2xhdGVkLW9uLXRo/ZS10YWJsZS5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9UHU0/clNGd2RjRUpTcnZo/cFZRcUlVNnlFY3BJ/S0Y5QnBEYm85ekxt/MWg3VT0",
  },
  {
    name: "Thai Iced Tea",
    calories: 120,
    protein: 0,
    fat: 4,
    carb: 20,
    description:
      "A sweet, creamy iced tea made with strong brewed tea and condensed milk.",
    ingredients: ["Black tea", "Sugar", "Condensed milk", "Ice"],
    preparation:
      "Brew black tea strong, sweeten with sugar, and mix with condensed milk. Serve over ice.",
    showDetails: false,
    imgUrl:
      "https://imgs.search.brave.com/H7-BoEeTJBCc3TcPBjgvox2kePuZ306BIz96rnZyIGU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjI5/NjAwNjg0L3Bob3Rv/L3BhZC10aGFpLWlz/b2xhdGVkLW9uLXRo/ZS10YWJsZS5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9UHU0/clNGd2RjRUpTcnZo/cFZRcUlVNnlFY3BJ/S0Y5QnBEYm85ekxt/MWg3VT0",
  },
  {
    name: "Thai Fish Cakes",
    calories: 250,
    protein: 20,
    fat: 15,
    carb: 10,
    description:
      "Fried fish cakes made from minced fish, green beans, and Thai spices.",
    ingredients: [
      "Fish fillets",
      "Green beans",
      "Red curry paste",
      "Eggs",
      "Fish sauce",
      "Coriander",
      "Lime leaves",
    ],
    preparation:
      "Mix ingredients into a batter, shape into cakes, and fry until golden brown.",
    showDetails: false,
    imgUrl:
      "https://imgs.search.brave.com/H7-BoEeTJBCc3TcPBjgvox2kePuZ306BIz96rnZyIGU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjI5/NjAwNjg0L3Bob3Rv/L3BhZC10aGFpLWlz/b2xhdGVkLW9uLXRo/ZS10YWJsZS5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9UHU0/clNGd2RjRUpTcnZo/cFZRcUlVNnlFY3BJ/S0Y5QnBEYm85ekxt/MWg3VT0",
  },
  {
    name: "Khao Soi (Curry Noodles)",
    calories: 450,
    protein: 20,
    fat: 25,
    carb: 40,
    description:
      "A rich, creamy curry noodle soup from northern Thailand with crispy noodles on top.",
    ingredients: [
      "Egg noodles",
      "Chicken",
      "Curry paste",
      "Coconut milk",
      "Shallots",
      "Lime",
      "Pickled mustard greens",
    ],
    preparation:
      "Simmer chicken in curry paste and coconut milk, then serve over noodles with crispy noodles on top.",
    showDetails: false,
    imgUrl:
      "https://imgs.search.brave.com/H7-BoEeTJBCc3TcPBjgvox2kePuZ306BIz96rnZyIGU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjI5/NjAwNjg0L3Bob3Rv/L3BhZC10aGFpLWlz/b2xhdGVkLW9uLXRo/ZS10YWJsZS5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9UHU0/clNGd2RjRUpTcnZo/cFZRcUlVNnlFY3BJ/S0Y5QnBEYm85ekxt/MWg3VT0",
  },
  {
    name: "Satay Skewers",
    calories: 200,
    protein: 15,
    fat: 12,
    carb: 6,
    description:
      "Grilled skewers of marinated meat (usually chicken or pork) served with peanut sauce.",
    ingredients: [
      "Chicken or pork",
      "Peanut butter",
      "Coconut milk",
      "Soy sauce",
      "Lemongrass",
      "Garlic",
      "Curry powder",
    ],
    preparation:
      "Marinate meat, skewer, grill, and serve with a homemade peanut dipping sauce.",
    showDetails: false,
    imgUrl:
      "https://imgs.search.brave.com/H7-BoEeTJBCc3TcPBjgvox2kePuZ306BIz96rnZyIGU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjI5/NjAwNjg0L3Bob3Rv/L3BhZC10aGFpLWlz/b2xhdGVkLW9uLXRo/ZS10YWJsZS5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9UHU0/clNGd2RjRUpTcnZo/cFZRcUlVNnlFY3BJ/S0Y5QnBEYm85ekxt/MWg3VT0",
  },
  {
    name: "Thai Green Mango Salad",
    calories: 150,
    protein: 3,
    fat: 8,
    carb: 18,
    description:
      "A refreshing salad made with green mango, chili, peanuts, and a sweet-sour dressing.",
    ingredients: [
      "Green mango",
      "Chili",
      "Fish sauce",
      "Peanuts",
      "Garlic",
      "Lime",
      "Sugar",
    ],
    preparation:
      "Shred green mango and mix with other ingredients for a spicy, tangy salad.",
    showDetails: false,
    imgUrl:
      "https://imgs.search.brave.com/H7-BoEeTJBCc3TcPBjgvox2kePuZ306BIz96rnZyIGU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjI5/NjAwNjg0L3Bob3Rv/L3BhZC10aGFpLWlz/b2xhdGVkLW9uLXRo/ZS10YWJsZS5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9UHU0/clNGd2RjRUpTcnZo/cFZRcUlVNnlFY3BJ/S0Y5QnBEYm85ekxt/MWg3VT0",
  },
  {
    name: "Larb (Minced Meat Salad)",
    calories: 250,
    protein: 20,
    fat: 15,
    carb: 5,
    description: "A spicy minced meat salad with lime, herbs, and chili.",
    ingredients: [
      "Ground chicken or pork",
      "Lime juice",
      "Mint",
      "Chili",
      "Fish sauce",
      "Shallots",
    ],
    preparation:
      "Cook the ground meat, then mix with lime, mint, chili, and other seasonings.",
    showDetails: false,
    imgUrl:
      "https://imgs.search.brave.com/H7-BoEeTJBCc3TcPBjgvox2kePuZ306BIz96rnZyIGU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjI5/NjAwNjg0L3Bob3Rv/L3BhZC10aGFpLWlz/b2xhdGVkLW9uLXRo/ZS10YWJsZS5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9UHU0/clNGd2RjRUpTcnZo/cFZRcUlVNnlFY3BJ/S0Y5QnBEYm85ekxt/MWg3VT0",
  },
  {
    name: "Thai Coconut Soup (Tom Kha Gai)",
    calories: 200,
    protein: 10,
    fat: 14,
    carb: 8,
    description:
      "A rich and creamy coconut milk soup with chicken, lemongrass, and galangal.",
    ingredients: [
      "Chicken",
      "Coconut milk",
      "Lemongrass",
      "Galangal",
      "Kaffir lime leaves",
      "Chili",
      "Fish sauce",
    ],
    preparation:
      "Simmer chicken and herbs in coconut milk to make a rich, flavorful soup.",
    showDetails: false,
    imgUrl:
      "https://imgs.search.brave.com/H7-BoEeTJBCc3TcPBjgvox2kePuZ306BIz96rnZyIGU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjI5/NjAwNjg0L3Bob3Rv/L3BhZC10aGFpLWlz/b2xhdGVkLW9uLXRo/ZS10YWJsZS5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9UHU0/clNGd2RjRUpTcnZo/cFZRcUlVNnlFY3BJ/S0Y5QnBEYm85ekxt/MWg3VT0",
  },
  {
    name: "Thai Steamed Fish",
    calories: 350,
    protein: 25,
    fat: 10,
    carb: 15,
    description:
      "A light and flavorful steamed fish dish with garlic, lime, and chili.",
    ingredients: [
      "Whole fish",
      "Garlic",
      "Lime",
      "Chili",
      "Fish sauce",
      "Coriander",
    ],
    preparation: "Steam the fish and top with a garlic, lime, and chili sauce.",
    showDetails: false,
    imgUrl:
      "https://imgs.search.brave.com/H7-BoEeTJBCc3TcPBjgvox2kePuZ306BIz96rnZyIGU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjI5/NjAwNjg0L3Bob3Rv/L3BhZC10aGFpLWlz/b2xhdGVkLW9uLXRo/ZS10YWJsZS5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9UHU0/clNGd2RjRUpTcnZo/cFZRcUlVNnlFY3BJ/S0Y5QnBEYm85ekxt/MWg3VT0",
  },
];

async function main() {
  try {
    const allIngredientNames = [
      ...new Set(foods.flatMap((f) => f.ingredients)),
    ];

    await db.$transaction([
      ...allIngredientNames.map((name) =>
        db.ingredient.upsert({
          where: { name },
          update: {},
          create: {
            name,
            category: ingredientCategories[name] || "Other",
          },
        }),
      ),
    ]);

    for (const food of foods) {
      await db.food.create({
        data: {
          name: food.name,
          calories: food.calories,
          protein: food.protein,
          fat: food.fat,
          carb: food.carb,
          description: food.description,
          imgUrl: food.imgUrl,
          preparation: food.preparation,
          showDetails: food.showDetails,
          ingredients: {
            connect: food.ingredients.map((name) => ({
              name,
            })),
          },
        },
      });
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await db.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
