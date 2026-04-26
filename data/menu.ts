export type SpiceLevel = 0 | 1 | 2 | 3 | 4;

export type ProteinPrices = {
  chicken?: number;
  lamb?: number;
  beef?: number;
  prawn?: number;
  fish?: number;
  vegetable?: number;
  special?: number;
};

export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price: number | ProteinPrices;
  spiceLevel?: SpiceLevel;
  isVegetarian?: boolean;
  isChefSpecial?: boolean;
  image?: string;
  note?: string;
};

export type SectionVariant = "default" | "special" | "chef" | "tandoori" | "biryani";

export type MenuCategory = {
  id: string;
  label: string;
  description?: string;
  bannerImage?: string;
  variant?: SectionVariant;
  items: MenuItem[];
};

export const menuCategories: MenuCategory[] = [
  {
    id: "special-menu",
    label: "Special Menu",
    description: "Starter, main course, rice or naan, plus a glass of wine, small beer or soft drink",
    bannerImage: "/images/menu-image/butter-chicken.png",
    variant: "special",
    items: [
      {
        id: "special-menu-per-person",
        name: "Special Menu",
        description: "Any starter from the menu, any main course, any rice or naan bread, and a glass of wine, small beer or soft drink.",
        price: 19.95,
        spiceLevel: 0,
        note: "Per person",
      },
    ],
  },
  {
    id: "starters",
    label: "Starters",
    description: "Appetisers, starters, puri starters and soups from the house menu",
    bannerImage: "/images/menu-image/pakora-group.png",
    items: [
      { id: "pappadum", name: "Pappadum", description: "Deep fried poppadum", price: 1.00, spiceLevel: 0, isVegetarian: true },
      { id: "mix-chutney", name: "Mix Chutney & Dips", description: "Mango, mint and onion dips", price: 2.00, spiceLevel: 0, isVegetarian: true },
      { id: "onion-bhaji", name: "Onion Bhaji", description: "Onion pieces marinated, battered with flour and fried", price: 4.75, spiceLevel: 2, isVegetarian: true, note: "2 pieces", image: "/images/food/4.jpeg" },
      { id: "veg-samosa", name: "Vegetable Samosa", description: "Deep-fried pastry filled with potato, turmeric and green peas", price: 4.75, spiceLevel: 1, isVegetarian: true, note: "2 pieces", image: "/images/food/11.jpg" },
      { id: "meat-samosa", name: "Meat Samosa", description: "Deep-fried pastry filled with spiced meat", price: 5.50, spiceLevel: 2, note: "2 pieces" },
      { id: "veg-pakora", name: "Vegetable Pakora", description: "Vegetable pieces coated with gram flour and fried", price: 4.75, spiceLevel: 1, isVegetarian: true },
      { id: "chicken-pakora", name: "Chicken Pakora", description: "Chicken pieces deep fried in gram flour batter", price: 5.50, spiceLevel: 2, image: "/images/food/3.jpeg" },
      { id: "paneer-pakora", name: "Paneer Pakora", description: "Soft paneer coated with savoury gram flour batter and fried", price: 5.50, spiceLevel: 1, isVegetarian: true },
      { id: "gobi-pakora", name: "Gobi Pakora", description: "Cauliflower florets dipped in gram flour batter and fried", price: 4.95, spiceLevel: 1, isVegetarian: true },
      { id: "fish-pakora", name: "Fish Pakora", description: "Fish marinated in lemon, coated in spiced gram flour batter and deep-fried", price: 7.50, spiceLevel: 2 },
      { id: "mix-pakora", name: "Mix Pakora Platter", description: "Mix of chicken, vegetable and pakora served together", price: 6.95, spiceLevel: 2 },
      { id: "chicken-chaat", name: "Chicken Chaat", description: "Chicken pieces cooked with onions, tomatoes, chaat masala and lemon juice", price: 5.50, spiceLevel: 2, image: "/images/food/5.jpg" },
      { id: "chana-chaat", name: "Chana Chaat", description: "Chickpeas with tamarind chutney, green chutney, onions and tomatoes", price: 5.00, spiceLevel: 1, isVegetarian: true },
      { id: "prawn-puri", name: "Prawn Puri", description: "Shelled prawns sauteed in tangy marinade and placed inside soft puri bread", price: 6.00, spiceLevel: 2 },
      { id: "chicken-puri", name: "Chicken Puri", description: "Chicken pieces sauteed in tangy marinade and placed inside soft puri bread", price: 5.50, spiceLevel: 2 },
      { id: "chana-puri", name: "Chana Puri", description: "Chickpeas sauteed in tangy marinade and placed inside soft puri bread", price: 5.00, spiceLevel: 1, isVegetarian: true },
      { id: "chicken-soup", name: "Chicken Soup", price: 4.95, spiceLevel: 1 },
      { id: "veg-soup", name: "Vegetable Soup", price: 4.50, spiceLevel: 0, isVegetarian: true },
      { id: "tomato-soup", name: "Tomato Soup", price: 4.50, spiceLevel: 0, isVegetarian: true },
    ],
  },
  {
    id: "tandoori",
    label: "Tandoori Starters",
    description: "Marinated and cooked in the clay oven",
    bannerImage: "/images/menu-image/tandoori-chicken.png",
    variant: "tandoori",
    items: [
      { id: "tandoori-chicken-tikka-s", name: "Chicken Tikka", description: "Tender chicken breast pieces cooked in the tandoor", price: 5.75, spiceLevel: 2 },
      { id: "tandoori-chicken-s", name: "Tandoori Chicken", description: "Chicken marinated and smoke-roasted in the tandoor", price: 5.75, spiceLevel: 2, image: "/images/food/6.jpg" },
      { id: "chicken-wings", name: "Chicken Wings", description: "Chicken wings marinated with yoghurt and cooked in the clay oven", price: 5.75, spiceLevel: 2, image: "/images/food/14.jpg" },
      { id: "seekh-kebab-s", name: "Seekh Kebab", description: "Minced chicken and lamb cooked on skewers in the tandoor", price: 5.95, spiceLevel: 2 },
      { id: "lamb-tikka-s", name: "Lamb Tikka", description: "Tender lamb pieces cooked in the tandoor", price: 5.95, spiceLevel: 2 },
      { id: "mix-platter-s", name: "Mix Platter", description: "Chicken wings, tandoori chicken, seekh kebab and chicken tikka", price: 6.95, spiceLevel: 2 },
    ],
  },
  {
    id: "tandoori-mains",
    label: "Tandoori Mains",
    description: "Served on a sizzling bed of onion with curry sauce on the side",
    bannerImage: "/images/menu-image/sizzler-group.png",
    variant: "tandoori",
    items: [
      { id: "tm-chicken-tikka", name: "Chicken Tikka", description: "Tender chicken breast pieces cooked in the tandoor", price: 10.95, spiceLevel: 2 },
      { id: "tm-tandoori-chicken", name: "Tandoori Chicken", description: "Chicken marinated and smoke-roasted in the tandoor", price: 10.95, spiceLevel: 2, image: "/images/food/6.jpg" },
      { id: "tm-seekh-kebab", name: "Seekh Kebab", description: "Minced chicken and lamb cooked on skewers in the tandoor", price: 10.95, spiceLevel: 2 },
      { id: "tm-lamb-tikka", name: "Lamb Tikka", description: "Tender lamb pieces cooked in the tandoor", price: 12.95, spiceLevel: 2 },
      { id: "tm-chicken-shashlik", name: "Chicken Tikka Shashlik", description: "Chicken marinated with capsicum, onion and garlic paste, cooked in the tandoor", price: 14.95, spiceLevel: 2 },
      { id: "tm-prawn-shashlik", name: "Prawn Tikka Shashlik", description: "King prawn marinated with capsicum, onion and garlic paste, cooked in the tandoor", price: 15.95, spiceLevel: 2 },
      { id: "tm-paneer-shashlik", name: "Paneer Tikka Shashlik", description: "Paneer marinated with capsicum, onion and garlic paste, cooked in the tandoor", price: 12.95, spiceLevel: 1, isVegetarian: true },
      { id: "tm-mix-grill", name: "Mix Grill", description: "Chicken wings, tandoori chicken, seekh kebab and chicken tikka", price: 15.95, spiceLevel: 2 },
      { id: "mix-raita", name: "Mix Raita", description: "Whisked yoghurt mixed with vegetables, fruits and spices", price: 4.95, spiceLevel: 0, isVegetarian: true },
      { id: "indian-mix-salad", name: "Indian Mix Salad", price: 4.95, spiceLevel: 0, isVegetarian: true },
    ],
  },
  {
    id: "mains",
    label: "Main Courses",
    description: "Choice of mild, medium or hot where available; rice and naan are not included",
    bannerImage: "/images/menu-image/curry-1.png",
    items: [
      { id: "korma", name: "Korma", description: "Creamy mild curry made with coconut cream and ground almonds", price: { chicken: 9.95, lamb: 10.50, beef: 10.95, prawn: 11.50 }, spiceLevel: 1 },
      { id: "tikka-masala", name: "Tikka Masala", description: "Marinated tikka simmered in a rich, creamy tomato-based sauce", price: { chicken: 10.50, lamb: 11.50, beef: 10.95, prawn: 11.50 }, spiceLevel: 2, image: "/images/food/12.jpg" },
      { id: "curry", name: "Curry", description: "Traditional onion and tomato based sauce flavoured with ginger and garlic", price: { chicken: 9.95, lamb: 10.95, beef: 10.95, prawn: 11.50, fish: 10.50 }, spiceLevel: 2 },
      { id: "rogan-josh", name: "Rogan Josh", description: "Aromatic tomato sauce flavoured with garlic and ginger", price: { chicken: 10.50, lamb: 10.95, beef: 10.95, prawn: 11.50 }, spiceLevel: 2 },
      { id: "karahi", name: "Karahi", description: "Cooked with ginger, garlic, onion and yoghurt for a smoky grilled flavour", price: { chicken: 11.95, lamb: 12.95, beef: 12.95, prawn: 12.95 }, spiceLevel: 2 },
      { id: "bhuna", name: "Bhuna", description: "Prepared with a thick dry curry sauce", price: { chicken: 10.50, lamb: 10.95, beef: 10.95, prawn: 11.50 }, spiceLevel: 2 },
      { id: "balti", name: "Balti", description: "Prepared with garlic, ginger, onion, peppers and tomato-based curry", price: { chicken: 9.95, lamb: 10.50, beef: 10.50, prawn: 11.50, special: 13.50 }, spiceLevel: 2 },
      { id: "jalfrezi", name: "Jalfrezi", description: "Stir-fried peppers, onions and tomatoes in a thick semi-dry gravy", price: { chicken: 9.95, lamb: 10.75, beef: 10.95, prawn: 11.50 }, spiceLevel: 3 },
      { id: "madras", name: "Madras", description: "Spicy tomato-onion gravy finished with coconut milk, garlic and ginger", price: { chicken: 9.95, lamb: 10.75, beef: 10.95, prawn: 11.50 }, spiceLevel: 3 },
      { id: "vindaloo", name: "Vindaloo", description: "Hot and tangy curry with ginger, chillies, garlic and potatoes", price: { chicken: 9.95, lamb: 10.95, beef: 10.95, prawn: 11.50 }, spiceLevel: 4 },
      { id: "palak", name: "Palak", description: "Spinach curry with fresh ginger and cardamom", price: { chicken: 10.50, lamb: 10.95, beef: 10.95, prawn: 11.50 }, spiceLevel: 2 },
      { id: "pathia", name: "Pathia", description: "Onion and tomato based sauce flavoured with ginger and garlic", price: { chicken: 9.95, lamb: 10.95, beef: 10.95, prawn: 11.50 }, spiceLevel: 3 },
      { id: "dhansak", name: "Dhansak", description: "Sweet and sour lentil curry with garlic and ginger", price: { chicken: 10.95, lamb: 11.95, beef: 11.95, prawn: 12.95 }, spiceLevel: 2 },
    ],
  },
  {
    id: "biryani",
    label: "Biryani",
    description: "Layered rice dishes served with side gravy",
    bannerImage: "/images/menu-image/biryani.png",
    variant: "biryani",
    items: [
      { id: "chicken-biryani", name: "Chicken Biryani", price: 12.50, spiceLevel: 2 },
      { id: "lamb-biryani", name: "Lamb Biryani", price: 13.50, spiceLevel: 2 },
      { id: "prawn-biryani", name: "Prawn Biryani", price: 13.95, spiceLevel: 2 },
      { id: "veg-biryani", name: "Vegetable Biryani", price: 11.50, spiceLevel: 1, isVegetarian: true },
      { id: "special-biryani", name: "Special Biryani", price: 14.50, spiceLevel: 2, isChefSpecial: true },
    ],
  },
  {
    id: "vegetarian",
    label: "Vegetable Dish",
    description: "Vegetarian dishes from the house menu",
    bannerImage: "/images/menu-image/curry-2.png",
    items: [
      { id: "aloo-palak", name: "Aloo Palak", description: "Spinach and potatoes cooked together with spices", price: 8.95, spiceLevel: 2, isVegetarian: true },
      { id: "veg-curry", name: "Vegetable Curry", description: "Mixed vegetables in a spiced sauce", price: 8.50, spiceLevel: 2, isVegetarian: true },
      { id: "chana-masala", name: "Chana Masala", description: "Chickpeas with onions, tomatoes, spices and herbs", price: 8.50, spiceLevel: 2, isVegetarian: true },
      { id: "paneer-jalfrezi", name: "Paneer Jalfrezi", description: "Paneer, vegetables, peppers and onions in a thick tomato sauce", price: 9.50, spiceLevel: 3, isVegetarian: true },
      { id: "veg-korma", name: "Vegetable Korma", description: "Creamy vegetable curry with coconut or nut-based gravy", price: 8.95, spiceLevel: 1, isVegetarian: true },
      { id: "dal-tarka", name: "Dal Tarka", description: "Creamy lentils with cumin seeds, garlic and coriander", price: 7.95, spiceLevel: 2, isVegetarian: true },
      { id: "paneer-palak", name: "Paneer Palak", description: "Paneer in a thick pureed spinach sauce", price: 8.50, spiceLevel: 1, isVegetarian: true },
      { id: "bombay-aloo", name: "Bombay Aloo", description: "Boiled potato stir-fried with cumin, turmeric, curry leaves and coriander", price: 7.95, spiceLevel: 2, isVegetarian: true },
      { id: "gobi-aloo", name: "Gobi Aloo", description: "Potatoes and cauliflower with spices, tomatoes, ginger, garlic and onions", price: 8.50, spiceLevel: 2, isVegetarian: true },
      { id: "mushroom-bhaji", name: "Mushroom Bhaji", description: "Mushrooms sauteed with onions, garlic, ginger and spices", price: 8.50, spiceLevel: 2, isVegetarian: true },
    ],
  },
  {
    id: "kids",
    label: "Kids Meal",
    description: "Kids meals from the house menu",
    items: [
      { id: "kids-chicken-korma-rice", name: "Chicken Korma with Rice", price: 9.95, spiceLevel: 1 },
      { id: "kids-chicken-tikka-masala-chips", name: "Chicken Tikka Masala with Chips", price: 9.95, spiceLevel: 1 },
      { id: "kids-fish-finger-chips", name: "Fish Finger and Chips", price: 6.95, spiceLevel: 0 },
      { id: "kids-nuggets-chips", name: "Nuggets and Chips", price: 6.95, spiceLevel: 0 },
    ],
  },
  {
    id: "chef-specials",
    label: "Chef Special",
    description: "Chef special dishes from the house menu",
    bannerImage: "/images/menu-image/curry.png",
    variant: "chef",
    items: [
      { id: "butter-chicken", name: "Butter Chicken", description: "Chicken cooked in a creamy sauce with butter, cream and spices", price: 11.50, spiceLevel: 1, isChefSpecial: true, image: "/images/food/2.jpeg" },
      { id: "paneer-makhani", name: "Paneer Makhani", description: "Paneer in tomato sauce with butter and spices", price: 10.95, spiceLevel: 1, isChefSpecial: true, isVegetarian: true, image: "/images/food/1.jpeg" },
      { id: "chilli-chicken", name: "Chilli Chicken", description: "Chicken stir-fried with chillies, onions and sauces", price: 13.50, spiceLevel: 3, isChefSpecial: true },
      { id: "chicken-tikka-jaipuri", name: "Chicken Tikka Jaipuri", description: "Marinated chicken with yoghurt, spices and creamy tomato sauce", price: 11.50, spiceLevel: 2, isChefSpecial: true },
      { id: "honey-chicken", name: "Honey Chicken", description: "Chicken tossed in a sweet and savoury honey-based sauce", price: 10.95, spiceLevel: 1, isChefSpecial: true },
      { id: "chicken-mango", name: "Chicken Mango", description: "Sweet and savoury chicken curry made with ripe mango and spices", price: 10.95, spiceLevel: 1, isChefSpecial: true },
      { id: "chicken-chasni", name: "Chicken Chasni", description: "Chicken in a sweet and tangy sauce", price: 11.50, spiceLevel: 1, isChefSpecial: true },
      { id: "chicken-kashmiri", name: "Chicken Kashmiri", description: "Chicken cooked with spices, yoghurt, nuts or dried fruits", price: 11.50, spiceLevel: 1, isChefSpecial: true },
      { id: "chicken-dopiaza", name: "Chicken Dopiaza", description: "Chicken cooked in an onion-based sauce with sauteed and fried onions", price: 10.95, spiceLevel: 2, isChefSpecial: true },
      { id: "chicken-pasanda", name: "Chicken Pasanda", description: "Chicken cooked in a creamy sauce with nuts, cream and spices", price: 10.95, spiceLevel: 1, isChefSpecial: true },
    ],
  },
  {
    id: "breads-rice",
    label: "Rice & Naan Bread",
    description: "Rice and breads from the house menu",
    bannerImage: "/images/menu-image/roti-rice-group.png",
    items: [
      { id: "boiled-rice", name: "Boiled Rice", price: 2.95, spiceLevel: 0, isVegetarian: true },
      { id: "pilau-rice", name: "Pilau Rice", price: 3.25, spiceLevel: 0, isVegetarian: true },
      { id: "mushroom-rice", name: "Mushroom Rice", price: 3.75, spiceLevel: 0, isVegetarian: true },
      { id: "fried-rice", name: "Fried Rice", price: 3.95, spiceLevel: 0, isVegetarian: true },
      { id: "lemon-rice", name: "Lemon Rice", price: 3.75, spiceLevel: 0, isVegetarian: true },
      { id: "special-rice", name: "Special Rice", price: 4.95, spiceLevel: 1, isVegetarian: true },
      { id: "plain-naan", name: "Plain Naan", price: 2.75, spiceLevel: 0, isVegetarian: true },
      { id: "garlic-naan", name: "Garlic Naan", price: 3.00, spiceLevel: 0, isVegetarian: true },
      { id: "cheese-naan", name: "Cheese Naan", price: 3.75, spiceLevel: 0, isVegetarian: true },
      { id: "butter-naan", name: "Butter Naan", price: 3.75, spiceLevel: 0, isVegetarian: true },
      { id: "keema-naan", name: "Keema Naan", price: 4.25, spiceLevel: 2 },
      { id: "peshwari-naan", name: "Peshwari Naan", price: 3.95, spiceLevel: 0, isVegetarian: true },
      { id: "tandoori-roti", name: "Tandoori Roti", price: 2.95, spiceLevel: 0, isVegetarian: true },
      { id: "chapati-roti", name: "Chapati Roti", price: 2.95, spiceLevel: 0, isVegetarian: true },
    ],
  },
  {
    id: "desserts",
    label: "Dessert",
    description: "Desserts from the house menu",
    bannerImage: "/images/menu-image/kulfi.png",
    items: [
      { id: "mango-kulfi", name: "Mango Kulfi", description: "Frozen dessert made with ripe mango pulp", price: 5.50, spiceLevel: 0, isVegetarian: true },
      { id: "pistachio-kulfi", name: "Pistachio Kulfi", description: "Frozen dessert flavoured with almonds, saffron and pistachio", price: 5.50, spiceLevel: 0, isVegetarian: true },
      { id: "mango-cream", name: "Mango Cream with Ice Cream", price: 5.50, spiceLevel: 0, isVegetarian: true, image: "/images/food/13.jpg" },
      { id: "ice-cream", name: "Ice Cream", price: 3.95, spiceLevel: 0, isVegetarian: true },
    ],
  },
  {
    id: "soft-drinks",
    label: "Soft Drinks",
    description: "Soft drinks from the drinks menu",
    items: [
      { id: "coca-cola", name: "Coca Cola", price: 2.65, spiceLevel: 0 },
      { id: "cola-zero", name: "Cola Zero", price: 2.65, spiceLevel: 0 },
      { id: "fanta-orange", name: "Fanta Orange", price: 2.65, spiceLevel: 0 },
      { id: "fanta-lemon", name: "Fanta Lemon", price: 2.65, spiceLevel: 0 },
      { id: "sprite", name: "Sprite", price: 2.65, spiceLevel: 0 },
      { id: "nestea", name: "Nestea", price: 2.65, spiceLevel: 0 },
      { id: "aquarius", name: "Aquarius", price: 2.65, spiceLevel: 0 },
      { id: "apple-juice", name: "Apple Juice", price: 2.65, spiceLevel: 0 },
      { id: "orange-juice", name: "Orange Juice", price: 2.65, spiceLevel: 0 },
      { id: "pineapple-juice", name: "Pineapple Juice", price: 2.65, spiceLevel: 0 },
    ],
  },
  {
    id: "waters-indian-drinks",
    label: "Waters & Indian Drinks",
    description: "Waters, tonics, gaseosa and lassi",
    items: [
      { id: "tonic-water", name: "Tonic Water", price: 2.75, spiceLevel: 0 },
      { id: "tonic-light", name: "Tonic Light", price: 2.75, spiceLevel: 0 },
      { id: "small-water", name: "Small Water", price: 1.75, spiceLevel: 0 },
      { id: "large-water", name: "Large Water", price: 2.75, spiceLevel: 0 },
      { id: "sparkling-water", name: "Sparkling Water", price: 2.65, spiceLevel: 0 },
      { id: "gaseosa", name: "Gaseosa", price: 2.65, spiceLevel: 0 },
      { id: "mango-lassi", name: "Mango Lassi", price: 4.95, spiceLevel: 0, isVegetarian: true },
      { id: "salt-lassi", name: "Salt Lassi", price: 4.95, spiceLevel: 0, isVegetarian: true },
      { id: "sweet-lassi", name: "Sweet Lassi", price: 4.95, spiceLevel: 0, isVegetarian: true },
    ],
  },
  {
    id: "wines",
    label: "Wines",
    description: "White, red, rose and sparkling wine",
    items: [
      { id: "white-bottle-house", name: "Bottle House White (Verdejo)", price: 11.95, spiceLevel: 0 },
      { id: "white-house-glass", name: "House White Wine (glass)", price: 2.95, spiceLevel: 0 },
      { id: "el-coto-white", name: "El Coto White", price: 12.95, spiceLevel: 0 },
      { id: "red-bottle-house", name: "Bottle House Red (Tempranillo)", price: 11.95, spiceLevel: 0 },
      { id: "red-house-glass", name: "House Red Wine (glass)", price: 2.95, spiceLevel: 0 },
      { id: "ribera-del-duero", name: "Ribera Del Duero", price: 15.95, spiceLevel: 0 },
      { id: "embotellado-la-propiedad", name: "Embotellado la Propiedad", price: 26.95, spiceLevel: 0 },
      { id: "rose-bottle-house", name: "Bottle House Rose (Tempranillo)", price: 11.95, spiceLevel: 0 },
      { id: "rose-house-glass", name: "House Rose Wine (glass)", price: 2.95, spiceLevel: 0 },
      { id: "el-coto-rose", name: "El Coto Rose", price: 12.95, spiceLevel: 0 },
      { id: "bottle-cava-brut", name: "Bottle Cava (Brut)", price: 14.95, spiceLevel: 0 },
      { id: "glass-cava", name: "Glass of Cava", price: 5.50, spiceLevel: 0 },
    ],
  },
  {
    id: "beer-spirits",
    label: "Beer & Spirits",
    description: "Beer, bottle beers, spirits, brandy and whisky",
    items: [
      { id: "large-beer", name: "Large Beer", price: 3.85, spiceLevel: 0 },
      { id: "small-beer", name: "Small Beer", price: 2.65, spiceLevel: 0 },
      { id: "cobra", name: "Cobra", price: 3.25, spiceLevel: 0 },
      { id: "san-miguel", name: "San Miguel", price: 3.65, spiceLevel: 0 },
      { id: "coronita", name: "Coronita", price: 3.65, spiceLevel: 0 },
      { id: "magners-cider", name: "Magners Cider", price: 5.50, spiceLevel: 0 },
      { id: "sin-alcohol", name: "Alcohol-Free Beer", price: 3.25, spiceLevel: 0 },
      { id: "vodka", name: "Vodka", price: 4.50, spiceLevel: 0 },
      { id: "gin", name: "Gin", price: 4.50, spiceLevel: 0 },
      { id: "rum", name: "Rum", price: 4.50, spiceLevel: 0 },
      { id: "tequila", name: "Tequila", price: 4.50, spiceLevel: 0 },
      { id: "bacardi", name: "Bacardi", price: 4.50, spiceLevel: 0 },
      { id: "baileys", name: "Baileys", price: 4.90, spiceLevel: 0 },
      { id: "tia-maria", name: "Tia Maria", price: 4.90, spiceLevel: 0 },
      { id: "malibu", name: "Malibu", price: 4.50, spiceLevel: 0 },
      { id: "soberano", name: "Soberano", price: 4.50, spiceLevel: 0 },
      { id: "magno", name: "Magno", price: 4.50, spiceLevel: 0 },
      { id: "ballantines", name: "Ballantine's", price: 4.50, spiceLevel: 0 },
      { id: "red-label", name: "Red Label", price: 5.50, spiceLevel: 0 },
      { id: "jameson", name: "Jameson", price: 5.50, spiceLevel: 0 },
      { id: "j-and-b", name: "J&B", price: 4.50, spiceLevel: 0 },
      { id: "jack-daniels", name: "Jack Daniel's", price: 6.50, spiceLevel: 0 },
    ],
  },
  {
    id: "cocktails-coffees",
    label: "Cocktails & Coffees",
    description: "Cocktails and coffees from the drinks menu",
    items: [
      { id: "sex-on-the-beach", name: "Sex on the Beach", price: 7.50, spiceLevel: 0 },
      { id: "porn-star-martini", name: "Porn Star Martini", price: 7.50, spiceLevel: 0 },
      { id: "pina-colada", name: "Piña Colada", price: 7.50, spiceLevel: 0 },
      { id: "mojito", name: "Mojito", price: 7.50, spiceLevel: 0 },
      { id: "espresso-martini", name: "Espresso Martini", price: 7.50, spiceLevel: 0 },
      { id: "red-sangria", name: "Red Sangria", price: 6.50, spiceLevel: 0 },
      { id: "white-sangria", name: "White Sangria", price: 6.50, spiceLevel: 0 },
      { id: "tinto-de-verano", name: "Tinto de Verano", price: 3.95, spiceLevel: 0 },
      { id: "espresso", name: "Espresso", price: 1.75, spiceLevel: 0 },
      { id: "double-espresso", name: "Double Espresso", price: 2.00, spiceLevel: 0 },
      { id: "cortado", name: "Cortado", price: 1.75, spiceLevel: 0 },
      { id: "americano", name: "Americano", price: 1.95, spiceLevel: 0 },
      { id: "cappuccino", name: "Cappuccino", price: 2.75, spiceLevel: 0 },
      { id: "cafe-con-leche", name: "Cafe Con Leche", price: 1.95, spiceLevel: 0 },
      { id: "irish-coffee", name: "Irish Coffee", price: 5.50, spiceLevel: 0 },
      { id: "baileys-coffee", name: "Baileys Coffee", price: 5.50, spiceLevel: 0 },
      { id: "masala-tea", name: "Masala Tea", price: 2.95, spiceLevel: 0, isVegetarian: true },
      { id: "bombon", name: "Bombon", price: 2.25, spiceLevel: 0 },
    ],
  },
];

export const spiceLevelLabel: Record<SpiceLevel, string> = {
  0: "No spice",
  1: "Mild",
  2: "Medium",
  3: "Hot",
  4: "Extra Hot",
};

export function formatPrice(price: number | ProteinPrices): string {
  if (typeof price === "number") return `€${price.toFixed(2)}`;
  const min = Math.min(...Object.values(price));
  const max = Math.max(...Object.values(price));
  if (min === max) return `€${min.toFixed(2)}`;
  return `€${min.toFixed(2)} – €${max.toFixed(2)}`;
}
