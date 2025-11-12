// Mock data cho development khi API chưa sẵn sàng
export const mockUsers = [
  {
    email: "admin@blindbox.com",
    password: "admin123",
    token: "mock-admin-jwt-token",
    username: "Admin",
    role: "ADMIN"
  },
  {
    email: "user@example.com", 
    password: "password123",
    token: "mock-user-jwt-token",
    username: "John Doe",
    role: "USER"
  }
]

export const mockBrands = [
  { brandID: 1, brandName: "POP MART", countryOfOrigin: "China" },
  { brandID: 2, brandName: "Funko", countryOfOrigin: "USA" },
  { brandID: 3, brandName: "Good Smile Company", countryOfOrigin: "Japan" },
  { brandID: 4, brandName: "Banpresto", countryOfOrigin: "Japan" },
  { brandID: 5, brandName: "Kotobukiya", countryOfOrigin: "Japan" },
  { brandID: 6, brandName: "Medicom Toy", countryOfOrigin: "Japan" },
  { brandID: 7, brandName: "52TOYS", countryOfOrigin: "China" },
  { brandID: 8, brandName: "MINISO", countryOfOrigin: "China" }
]

export const mockBlindBoxes = [
  {
    blindBoxID: 1,
    name: "Mystic Creatures Series 1",
    categoryID: 1,
    categoryName: "Fantasy",
    brandID: 1,
    brandName: "POP MART",
    rarity: "Rare",
    price: 29.99,
    releaseDate: "01/15/2024",
    stock: 150
  },
  {
    blindBoxID: 2, 
    name: "Labubu Monster Collection",
    categoryID: 1,
    categoryName: "Fantasy", 
    brandID: 1,
    brandName: "POP MART",
    rarity: "Epic",
    price: 45.99,
    releaseDate: "03/20/2024",
    stock: 75
  },
  {
    blindBoxID: 3,
    name: "Hirono Mini Figure Set",
    categoryID: 2,
    categoryName: "Anime",
    brandID: 3,
    brandName: "Good Smile",
    rarity: "Common",
    price: 19.99,
    releaseDate: "02/10/2024",
    stock: 300
  },
  {
    blindBoxID: 4,
    name: "Dragon Ball Legends Ultimate", 
    categoryID: 2,
    categoryName: "Anime",
    brandID: 4,
    brandName: "Banpresto",
    rarity: "Legendary", 
    price: 89.99,
    releaseDate: "04/01/2024",
    stock: 25
  },
  {
    blindBoxID: 5,
    name: "Pokemon TCG Mystery Box",
    categoryID: 3, 
    categoryName: "Trading Cards",
    brandID: 2,
    brandName: "Funko",
    rarity: "Epic",
    price: 35.99,
    releaseDate: "05/12/2024",
    stock: 120
  },
  {
    blindBoxID: 6,
    name: "Studio Ghibli Collection",
    categoryID: 2,
    categoryName: "Anime", 
    brandID: 3,
    brandName: "Good Smile",
    rarity: "Rare",
    price: 42.99,
    releaseDate: "06/08/2024",
    stock: 90
  },
  {
    blindBoxID: 7,
    name: "Kawaii Friends Series",
    categoryID: 4,
    categoryName: "Cute",
    brandID: 1,
    brandName: "POP MART",
    rarity: "Common",
    price: 24.99,
    releaseDate: "07/15/2024",
    stock: 200
  },
  {
    blindBoxID: 8,
    name: "Vintage Toy Collection",
    categoryID: 5,
    categoryName: "Retro",
    brandID: 6,
    brandName: "Medicom Toy",
    rarity: "Legendary",
    price: 125.99,
    releaseDate: "08/22/2024",
    stock: 15
  }
]