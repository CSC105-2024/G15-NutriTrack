import db from "../src/lib/db.ts";

const foods = [
  {
    name: "Pad Thai",
    calories: 350,
    protein: 15,
    fat: 14,
    carb: 45,
    mealType: "DINNER",
  },
  {
    name: "Tom Yum Soup",
    calories: 120,
    protein: 10,
    fat: 5,
    carb: 15,
    mealType: "LUNCH",
  },
  {
    name: "Green Curry (Gaeng Keow Wan)",
    calories: 400,
    protein: 20,
    fat: 22,
    carb: 25,
    mealType: "DINNER",
  },
  {
    name: "Som Tum (Papaya Salad)",
    calories: 150,
    protein: 3,
    fat: 10,
    carb: 18,
    mealType: "LUNCH",
  },
  {
    name: "Massaman Curry",
    calories: 500,
    protein: 20,
    fat: 30,
    carb: 40,
    mealType: "DINNER",
  },
  {
    name: "Thai Basil Chicken (Pad Krapow Gai)",
    calories: 350,
    protein: 30,
    fat: 18,
    carb: 15,
    mealType: "DINNER",
  },
  {
    name: "Mango Sticky Rice",
    calories: 250,
    protein: 3,
    fat: 6,
    carb: 45,
    mealType: null,
  },
  {
    name: "Pad See Ew",
    calories: 400,
    protein: 15,
    fat: 10,
    carb: 60,
    mealType: "DINNER",
  },
  {
    name: "Khao Pad (Thai Fried Rice)",
    calories: 400,
    protein: 12,
    fat: 15,
    carb: 50,
    mealType: "LUNCH",
  },
  {
    name: "Thai Iced Tea",
    calories: 120,
    protein: 0,
    fat: 4,
    carb: 20,
    mealType: null,
  },
  {
    name: "Thai Fish Cakes",
    calories: 250,
    protein: 20,
    fat: 15,
    carb: 10,
    mealType: "LUNCH",
  },
  {
    name: "Khao Soi (Curry Noodles)",
    calories: 450,
    protein: 20,
    fat: 25,
    carb: 40,
    mealType: "DINNER",
  },
  {
    name: "Satay Skewers",
    calories: 200,
    protein: 15,
    fat: 12,
    carb: 6,
    mealType: "LUNCH",
  },
  {
    name: "Thai Green Mango Salad",
    calories: 150,
    protein: 3,
    fat: 8,
    carb: 18,
    mealType: "LUNCH",
  },
  {
    name: "Larb (Minced Meat Salad)",
    calories: 250,
    protein: 20,
    fat: 15,
    carb: 5,
    mealType: "LUNCH",
  },
  {
    name: "Thai Coconut Soup (Tom Kha Gai)",
    calories: 200,
    protein: 10,
    fat: 14,
    carb: 8,
    mealType: "LUNCH",
  },
  {
    name: "Thai Steamed Fish",
    calories: 350,
    protein: 25,
    fat: 10,
    carb: 15,
    mealType: "DINNER",
  },
];

async function main() {
  await db.defaultFood.createMany({
    data: foods,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
