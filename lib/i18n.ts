import type { MenuCategory, MenuItem, SpiceLevel } from "@/data/menu";
import { menuCategories } from "@/data/menu";
import type { Locale } from "@/lib/locales";

export {
  defaultLocale,
  isLocale,
  languageLabels,
  locales,
  localizePath,
  switchLocalePath,
  type Locale,
} from "@/lib/locales";

type SectionCopy = {
  eyebrow: string;
  title: string;
  accent: string;
  body?: string;
};

export type SiteDictionary = {
  meta: {
    homeTitle: string;
    homeDescription: string;
    menuTitle: string;
    menuDescription: string;
  };
  brand: { name: string; descriptor: string };
  nav: {
    home: string;
    menu: string;
    about: string;
    contact: string;
    story: string;
    signature: string;
    preview: string;
    menuLink: string;
    reserve: string;
    toggle: string;
    language: string;
  };
  hero: {
    eyebrow: string;
    titleTop: string;
    titleAccent: string;
    body: string;
    primary: string;
    secondary: string;
    scroll: string;
  };
  story: SectionCopy & {
    body1: string;
    body2: string;
    primary: string;
    secondary: string;
    stat: string;
  };
  stats: Array<{ value: number; suffix: string; label: string; prefix?: string; displayValue?: string }>;
  featured: {
    eyebrow: string;
    title: string;
    accent: string;
    dishes: Array<{
      name: string;
      tagline: string;
      description: string;
      price: string;
      spice: number;
      image: string;
    }>;
  };
  menuPreview: {
    eyebrow: string;
    title: string;
    accent: string;
    viewMenu: string;
    viewFull: string;
    categories: Array<{ id: string; label: string; tagline: string; image: string }>;
  };
  gallery: SectionCopy;
  values: {
    eyebrow: string;
    title: string;
    accent: string;
    items: Array<{ title: string; text: string }>;
  };
  cta: {
    eyebrow: string;
    title: string;
    accent: string;
    body: string;
    hours: string;
    addressLine: string;
  };
  footer: {
    summary: string;
    navigation: string;
    menu: string;
    visit: string;
    address: string;
    phone: string;
    email: string;
    hours: string;
    rights: string;
    crafted: string;
    designedBy: string;
    links: {
      fullMenu: string;
      special: string;
      starters: string;
      tandoori: string;
      mains: string;
      chef: string;
      drinks: string;
    };
  };
  menuPage: {
    eyebrow: string;
    title: string;
    accent: string;
    vegetarian: string;
    spiceIndicator: string;
    priceNote: string;
    chefSpecial: string;
    proteins: Record<string, string>;
    spice: Record<SpiceLevel, string>;
  };
};

const baseFeatured = [
  { image: "/images/food/14.jpg", spice: 1 },
  { image: "/images/food/9.jpg", spice: 2 },
  { image: "/images/food/3.jpeg", spice: 2 },
];

export const dictionaries: Record<Locale, SiteDictionary> = {
  en: {
    meta: {
      homeTitle: "Masala Indian Restaurant | Authentic Indian Cuisine",
      homeDescription:
        "Experience authentic Indian flavours at Masala Indian Restaurant. Tandoori dishes, classic curries, vegetarian choices and a full drinks menu.",
      menuTitle: "Menu | Masala Indian Restaurant",
      menuDescription:
        "Explore our full menu of authentic Indian starters, tandoori dishes, main courses, biryanis, desserts and drinks.",
    },
    brand: { name: "Masala", descriptor: "Indian Restaurant" },
    nav: {
      home: "Home",
      menu: "Menu",
      about: "About",
      contact: "Contact",
      story: "Story",
      signature: "Dishes",
      preview: "Gallery",
      menuLink: "Menu",
      reserve: "Reserve a Table",
      toggle: "Toggle menu",
      language: "Change language",
    },
    hero: {
      eyebrow: "Authentic Indian Cuisine",
      titleTop: "Taste the",
      titleAccent: "Soul of India",
      body:
        "Classic Indian dishes, tandoori favourites, vegetarian choices and a full drinks menu served with warmth.",
      primary: "Explore Menu",
      secondary: "Reserve a Table",
      scroll: "Scroll",
    },
    story: {
      eyebrow: "Our Story",
      title: "Where Heritage",
      accent: "Meets Hospitality",
      body1:
        "Masala is an Indian restaurant serving a broad menu of tandoori dishes, curries, biryanis, vegetarian plates, desserts and drinks.",
      body2:
        "From the clay tandoor to fragrant curries and fresh breads, every section of the menu is built around familiar Indian favourites.",
      primary: "Book a Table",
      secondary: "View Menu",
      stat: "Special Menu",
    },
    stats: [
      { value: 90, suffix: "+", label: "Food Items" },
      { value: 70, suffix: "+", label: "Drinks" },
      { value: 19, suffix: ".95", prefix: "€", displayValue: "€19.95", label: "Special Menu" },
      { value: 4, suffix: "", label: "Kids Meals" },
    ],
    featured: {
      eyebrow: "Signature Dishes",
      title: "Crafted with",
      accent: "Passion",
      dishes: [
        {
          ...baseFeatured[0],
          name: "Butter Chicken",
          tagline: "Chef's Signature",
          description: "Tender chicken in a luscious tomato and butter sauce, an Indian icon reimagined.",
          price: "€11.50",
        },
        {
          ...baseFeatured[1],
          name: "Mix Grill Sizzler",
          tagline: "Tandoori Special",
          description: "A sizzling platter of chicken tikka, seekh kebab and lamb tikka, theatre on a plate.",
          price: "€15.95",
        },
        {
          ...baseFeatured[2],
          name: "Rogan Josh",
          tagline: "Kashmiri Classic",
          description: "Slow-cooked lamb in an aromatic Kashmiri sauce with whole spices and dried chillies.",
          price: "from €10.95",
        },
      ],
    },
    menuPreview: {
      eyebrow: "Explore Our Menu",
      title: "A World of",
      accent: "Flavour",
      viewMenu: "View Menu",
      viewFull: "View Full Menu",
      categories: [
        { id: "starters", label: "Starters", tagline: "Light and vibrant", image: "/images/food/11.jpg" },
        { id: "tandoori", label: "Tandoori", tagline: "From the clay oven", image: "/images/food/9.jpg" },
        { id: "mains", label: "Main Courses", tagline: "Hearty and aromatic", image: "/images/food/8.jpg" },
        { id: "soft-drinks", label: "Drinks", tagline: "Lassi to cocktails", image: "/images/food/drink.png" },
      ],
    },
    gallery: { eyebrow: "Our World", title: "A Feast for", accent: "the Eyes" },
    values: {
      eyebrow: "Why Masala",
      title: "The Masala",
      accent: "Promise",
      items: [
        {
          title: "Indian Favourites",
          text: "The menu includes familiar Indian favourites, from tandoori dishes to curries and biryanis.",
        },
        {
          title: "Full Menu",
          text: "Vegetarian dishes, breads, rice, desserts and drinks are all listed clearly from the house menus.",
        },
        {
          title: "Warm Hospitality",
          text: "Call to reserve or visit us at Av. Mediterráneo 33, Local 1B, Guardamar del Segura.",
        },
      ],
    },
    cta: {
      eyebrow: "Reserve Your Table",
      title: "Ready to Experience",
      accent: "India Tonight?",
      body:
        "Gather your friends and family for Indian starters, tandoori dishes, curries, biryanis, desserts and drinks.",
      hours: "Call to reserve",
      addressLine: "Av. Mediterráneo 33, Guardamar del Segura - Walk-ins welcome",
    },
    footer: {
      summary: "Indian starters, tandoori dishes, curries, biryanis, vegetarian plates, desserts and drinks.",
      navigation: "Navigation",
      menu: "Our Menu",
      visit: "Visit Us",
      address: "Address",
      phone: "Phone",
      email: "Email",
      hours: "Reservations",
      rights: "All rights reserved.",
      crafted: "Crafted with love for Indian cuisine",
      designedBy: "Designed by",
      links: {
        fullMenu: "Full Menu",
        special: "Special Menu",
        starters: "Starters",
        tandoori: "Tandoori",
        mains: "Main Courses",
        chef: "Chef's Specials",
        drinks: "Drinks",
      },
    },
    menuPage: {
      eyebrow: "Masala Indian Restaurant",
      title: "Our",
      accent: "Menu",
      vegetarian: "Vegetarian",
      spiceIndicator: "Spice level indicator",
      priceNote: "All prices in euros · Subject to availability",
      chefSpecial: "Special",
      proteins: {
        chicken: "Chicken",
        lamb: "Lamb",
        beef: "Beef",
        prawn: "Prawn",
        fish: "Fish",
        vegetable: "Veg",
        special: "Special",
      },
      spice: { 0: "No spice", 1: "Mild", 2: "Medium", 3: "Hot", 4: "Extra Hot" },
    },
  },
  nl: {
    meta: {
      homeTitle: "Masala Indian Restaurant | Authentieke Indiase keuken",
      homeDescription:
        "Ervaar authentieke Indiase smaken bij Masala Indian Restaurant met tandoori, curry's, vegetarische keuzes en een volledig drankmenu.",
      menuTitle: "Menu | Masala Indian Restaurant",
      menuDescription: "Ontdek ons volledige menu met Indiase voorgerechten, tandoori, hoofdgerechten, biryani, desserts en drankjes.",
    },
    brand: { name: "Masala", descriptor: "Indian Restaurant" },
    nav: {
      home: "Home",
      menu: "Menu",
      about: "Over ons",
      contact: "Contact",
      story: "Verhaal",
      signature: "Gerechten",
      preview: "Galerij",
      menuLink: "Menu",
      reserve: "Reserveer een tafel",
      toggle: "Menu openen",
      language: "Taal wijzigen",
    },
    hero: {
      eyebrow: "Authentieke Indiase Keuken",
      titleTop: "Proef de",
      titleAccent: "Ziel van India",
      body: "Klassieke Indiase gerechten, tandoori favorieten, vegetarische keuzes en een volledig drankmenu, warm geserveerd.",
      primary: "Bekijk Menu",
      secondary: "Reserveer een tafel",
      scroll: "Scroll",
    },
    story: {
      eyebrow: "Ons Verhaal",
      title: "Waar Erfgoed",
      accent: "Gastvrijheid Ontmoet",
      body1: "Masala is een Indiaas restaurant met een breed menu van tandoori, curry's, biryani, vegetarische gerechten, desserts en drankjes.",
      body2: "Van de kleioven tot geurige curry's en vers brood, het menu draait om herkenbare Indiase favorieten.",
      primary: "Boek een tafel",
      secondary: "Bekijk menu",
      stat: "Speciaal menu",
    },
    stats: [
      { value: 90, suffix: "+", label: "Gerechten" },
      { value: 70, suffix: "+", label: "Drankjes" },
      { value: 19, suffix: ".95", prefix: "€", displayValue: "€19.95", label: "Speciaal menu" },
      { value: 4, suffix: "", label: "Kids maaltijden" },
    ],
    featured: {
      eyebrow: "Signatuurgerechten",
      title: "Bereid met",
      accent: "Passie",
      dishes: [
        { ...baseFeatured[0], name: "Butter Chicken", tagline: "Signatuur van de Chef", description: "Malse kip in rijke tomaten-botersaus, een Indiaas icoon opnieuw verfijnd.", price: "€11.50" },
        { ...baseFeatured[1], name: "Mix Grill Sizzler", tagline: "Tandoori Special", description: "Een sissende schaal met chicken tikka, seekh kebab en lamb tikka.", price: "€15.95" },
        { ...baseFeatured[2], name: "Rogan Josh", tagline: "Kashmiri Klassieker", description: "Langzaam gegaard lamsvlees in aromatische Kashmiri saus met hele specerijen.", price: "vanaf €10.95" },
      ],
    },
    menuPreview: {
      eyebrow: "Ontdek Ons Menu",
      title: "Een Wereld van",
      accent: "Smaak",
      viewMenu: "Bekijk Menu",
      viewFull: "Bekijk Volledig Menu",
      categories: [
        { id: "starters", label: "Voorgerechten", tagline: "Licht en levendig", image: "/images/food/11.jpg" },
        { id: "tandoori", label: "Tandoori", tagline: "Uit de kleioven", image: "/images/food/9.jpg" },
        { id: "mains", label: "Hoofdgerechten", tagline: "Hartverwarmend en aromatisch", image: "/images/food/8.jpg" },
        { id: "soft-drinks", label: "Drankjes", tagline: "Van lassi tot cocktails", image: "/images/food/drink.png" },
      ],
    },
    gallery: { eyebrow: "Onze Wereld", title: "Een Feest voor", accent: "het Oog" },
    values: {
      eyebrow: "Waarom Masala",
      title: "De Masala",
      accent: "Belofte",
      items: [
        { title: "Indiase favorieten", text: "Het menu bevat vertrouwde Indiase gerechten, van tandoori tot curry's en biryani." },
        { title: "Volledig menu", text: "Vegetarische gerechten, brood, rijst, desserts en drankjes staan duidelijk op de menukaarten." },
        { title: "Reserveer direct", text: "Bel om te reserveren of bezoek ons aan Av. Mediterráneo 33, Local 1B, Guardamar del Segura." },
      ],
    },
    cta: {
      eyebrow: "Reserveer Je Tafel",
      title: "Klaar om vanavond",
      accent: "India te Ervaren?",
      body: "Verzamel vrienden en familie voor Indiase voorgerechten, tandoori, curry's, biryani, desserts en drankjes.",
      hours: "Bel om te reserveren",
      addressLine: "Av. Mediterráneo 33, Guardamar del Segura - Binnenlopen welkom",
    },
    footer: {
      summary: "Indiase voorgerechten, tandoori, curry's, biryani, vegetarische gerechten, desserts en drankjes.",
      navigation: "Navigatie",
      menu: "Ons Menu",
      visit: "Bezoek Ons",
      address: "Adres",
      phone: "Telefoon",
      email: "E-mail",
      hours: "Reserveringen",
      rights: "Alle rechten voorbehouden.",
      crafted: "Gemaakt met liefde voor de Indiase keuken",
      designedBy: "Ontworpen door",
      links: { fullMenu: "Volledig Menu", special: "Speciaal Menu", starters: "Voorgerechten", tandoori: "Tandoori", mains: "Hoofdgerechten", chef: "Chef Specials", drinks: "Drankjes" },
    },
    menuPage: {
      eyebrow: "Masala Indian Restaurant",
      title: "Ons",
      accent: "Menu",
      vegetarian: "Vegetarisch",
      spiceIndicator: "Pittigheidsniveau",
      priceNote: "Alle prijzen in euro · Afhankelijk van beschikbaarheid",
      chefSpecial: "Special",
      proteins: { chicken: "Kip", lamb: "Lam", beef: "Rund", prawn: "Garnaal", fish: "Vis", vegetable: "Veg", special: "Special" },
      spice: { 0: "Niet pittig", 1: "Mild", 2: "Medium", 3: "Pittig", 4: "Extra pittig" },
    },
  },
  es: {
    meta: {
      homeTitle: "Masala Indian Restaurant | Cocina india autentica",
      homeDescription: "Disfruta sabores indios autenticos en Masala Indian Restaurant con tandoori, curries, opciones vegetarianas y una carta completa de bebidas.",
      menuTitle: "Menu | Masala Indian Restaurant",
      menuDescription: "Explora nuestro menu completo de entrantes indios, tandoori, platos principales, biryanis, postres y bebidas.",
    },
    brand: { name: "Masala", descriptor: "Indian Restaurant" },
    nav: { home: "Inicio", menu: "Menu", about: "Nosotros", contact: "Contacto", story: "Historia", signature: "Platos", preview: "Galeria", menuLink: "Menu", reserve: "Reservar mesa", toggle: "Abrir menu", language: "Cambiar idioma" },
    hero: {
      eyebrow: "Cocina India Autentica",
      titleTop: "Prueba el",
      titleAccent: "Alma de India",
      body: "Platos indios clasicos, favoritos tandoori, opciones vegetarianas y una carta completa de bebidas, servidos con calidez.",
      primary: "Ver Menu",
      secondary: "Reservar mesa",
      scroll: "Bajar",
    },
    story: {
      eyebrow: "Nuestra Historia",
      title: "Donde la Herencia",
      accent: "Encuentra Hospitalidad",
      body1: "Masala es un restaurante indio con una carta amplia de tandoori, curries, biryani, platos vegetarianos, postres y bebidas.",
      body2: "Del horno tandoor a los curries aromaticos y panes frescos, la carta se centra en favoritos indios reconocibles.",
      primary: "Reservar mesa",
      secondary: "Ver menu",
      stat: "Menu especial",
    },
    stats: [
      { value: 90, suffix: "+", label: "Platos" },
      { value: 70, suffix: "+", label: "Bebidas" },
      { value: 19, suffix: ".95", prefix: "€", displayValue: "€19.95", label: "Menu especial" },
      { value: 4, suffix: "", label: "Menus infantiles" },
    ],
    featured: {
      eyebrow: "Platos de Autor",
      title: "Elaborado con",
      accent: "Pasion",
      dishes: [
        { ...baseFeatured[0], name: "Butter Chicken", tagline: "Firma del Chef", description: "Pollo tierno en salsa rica de tomate y mantequilla, un icono indio renovado.", price: "€11.50" },
        { ...baseFeatured[1], name: "Mix Grill Sizzler", tagline: "Especial Tandoori", description: "Bandeja chispeante de chicken tikka, seekh kebab y lamb tikka.", price: "€15.95" },
        { ...baseFeatured[2], name: "Rogan Josh", tagline: "Clasico de Cachemira", description: "Cordero cocinado lentamente en salsa aromatica de Cachemira con especias enteras.", price: "desde €10.95" },
      ],
    },
    menuPreview: {
      eyebrow: "Explora Nuestro Menu",
      title: "Un Mundo de",
      accent: "Sabor",
      viewMenu: "Ver Menu",
      viewFull: "Ver Menu Completo",
      categories: [
        { id: "starters", label: "Entrantes", tagline: "Ligeros y vivos", image: "/images/food/11.jpg" },
        { id: "tandoori", label: "Tandoori", tagline: "Del horno de barro", image: "/images/food/9.jpg" },
        { id: "mains", label: "Principales", tagline: "Intensos y aromaticos", image: "/images/food/8.jpg" },
        { id: "soft-drinks", label: "Bebidas", tagline: "De lassi a cocteles", image: "/images/food/drink.png" },
      ],
    },
    gallery: { eyebrow: "Nuestro Mundo", title: "Un Festin para", accent: "la Vista" },
    values: {
      eyebrow: "Por Que Masala",
      title: "La Promesa",
      accent: "Masala",
      items: [
        { title: "Favoritos indios", text: "La carta incluye platos indios conocidos, desde tandoori hasta curries y biryani." },
        { title: "Carta completa", text: "Platos vegetarianos, panes, arroz, postres y bebidas aparecen claramente en las cartas de la casa." },
        { title: "Reserva directa", text: "Llama para reservar o visitanos en Av. Mediterráneo 33, Local 1B, Guardamar del Segura." },
      ],
    },
    cta: {
      eyebrow: "Reserva Tu Mesa",
      title: "Listo para vivir",
      accent: "India Esta Noche?",
      body: "Reune a tus amigos y familia para entrantes indios, tandoori, curries, biryani, postres y bebidas.",
      hours: "Llama para reservar",
      addressLine: "Av. Mediterráneo 33, Guardamar del Segura - Sin reserva tambien bienvenidos",
    },
    footer: {
      summary: "Entrantes indios, tandoori, curries, biryani, platos vegetarianos, postres y bebidas.",
      navigation: "Navegacion",
      menu: "Nuestro Menu",
      visit: "Visitanos",
      address: "Direccion",
      phone: "Telefono",
      email: "Correo",
      hours: "Reservas",
      rights: "Todos los derechos reservados.",
      crafted: "Hecho con amor por la cocina india",
      designedBy: "Diseñado por",
      links: { fullMenu: "Menu Completo", special: "Menu Especial", starters: "Entrantes", tandoori: "Tandoori", mains: "Principales", chef: "Especiales del Chef", drinks: "Bebidas" },
    },
    menuPage: {
      eyebrow: "Masala Indian Restaurant",
      title: "Nuestro",
      accent: "Menu",
      vegetarian: "Vegetariano",
      spiceIndicator: "Indicador de picante",
      priceNote: "Todos los precios en euros · Sujeto a disponibilidad",
      chefSpecial: "Especial",
      proteins: { chicken: "Pollo", lamb: "Cordero", beef: "Ternera", prawn: "Gamba", fish: "Pescado", vegetable: "Veg", special: "Especial" },
      spice: { 0: "Sin picante", 1: "Suave", 2: "Medio", 3: "Picante", 4: "Extra picante" },
    },
  },
  fr: {
    meta: {
      homeTitle: "Masala Indian Restaurant | Cuisine indienne authentique",
      homeDescription: "Decouvrez les saveurs indiennes authentiques chez Masala Indian Restaurant avec tandoori, currys, choix vegetariens et carte complete des boissons.",
      menuTitle: "Menu | Masala Indian Restaurant",
      menuDescription: "Explorez notre menu complet: entrees indiennes, tandoori, plats, biryanis, desserts et boissons.",
    },
    brand: { name: "Masala", descriptor: "Indian Restaurant" },
    nav: { home: "Accueil", menu: "Menu", about: "A propos", contact: "Contact", story: "Histoire", signature: "Plats", preview: "Galerie", menuLink: "Menu", reserve: "Reserver une table", toggle: "Ouvrir le menu", language: "Changer de langue" },
    hero: {
      eyebrow: "Cuisine Indienne Authentique",
      titleTop: "Goutez",
      titleAccent: "l'Ame de l'Inde",
      body: "Plats indiens classiques, favoris tandoori, choix vegetariens et carte complete des boissons, servis avec chaleur.",
      primary: "Voir le Menu",
      secondary: "Reserver une table",
      scroll: "Defiler",
    },
    story: {
      eyebrow: "Notre Histoire",
      title: "Quand l'Heritage",
      accent: "Rencontre l'Hospitalite",
      body1: "Masala est un restaurant indien avec une large carte de tandoori, currys, biryani, plats vegetariens, desserts et boissons.",
      body2: "Du four tandoor aux currys parfumes et pains frais, la carte met en avant des favoris indiens familiers.",
      primary: "Reserver",
      secondary: "Voir le menu",
      stat: "Menu special",
    },
    stats: [
      { value: 90, suffix: "+", label: "Plats" },
      { value: 70, suffix: "+", label: "Boissons" },
      { value: 19, suffix: ".95", prefix: "€", displayValue: "€19.95", label: "Menu special" },
      { value: 4, suffix: "", label: "Menus enfants" },
    ],
    featured: {
      eyebrow: "Plats Signature",
      title: "Prepare avec",
      accent: "Passion",
      dishes: [
        { ...baseFeatured[0], name: "Butter Chicken", tagline: "Signature du Chef", description: "Poulet tendre dans une riche sauce tomate et beurre, une icone indienne revisitee.", price: "€11.50" },
        { ...baseFeatured[1], name: "Mix Grill Sizzler", tagline: "Special Tandoori", description: "Un plateau gril sizzling avec chicken tikka, seekh kebab et lamb tikka.", price: "€15.95" },
        { ...baseFeatured[2], name: "Rogan Josh", tagline: "Classique du Cachemire", description: "Agneau mijote dans une sauce cachemirie aromatique aux epices entieres.", price: "a partir de €10.95" },
      ],
    },
    menuPreview: {
      eyebrow: "Explorez Notre Menu",
      title: "Un Monde de",
      accent: "Saveurs",
      viewMenu: "Voir le Menu",
      viewFull: "Voir Tout le Menu",
      categories: [
        { id: "starters", label: "Entrees", tagline: "Legeres et vives", image: "/images/food/11.jpg" },
        { id: "tandoori", label: "Tandoori", tagline: "Du four d'argile", image: "/images/food/9.jpg" },
        { id: "mains", label: "Plats", tagline: "Genereux et aromatiques", image: "/images/food/8.jpg" },
        { id: "soft-drinks", label: "Boissons", tagline: "Du lassi aux cocktails", image: "/images/food/drink.png" },
      ],
    },
    gallery: { eyebrow: "Notre Monde", title: "Un Festin pour", accent: "les Yeux" },
    values: {
      eyebrow: "Pourquoi Masala",
      title: "La Promesse",
      accent: "Masala",
      items: [
        { title: "Favoris indiens", text: "La carte comprend des plats indiens familiers, du tandoori aux currys et biryanis." },
        { title: "Carte complete", text: "Plats vegetariens, pains, riz, desserts et boissons sont clairement listes dans les menus maison." },
        { title: "Reservation directe", text: "Appelez pour reserver ou venez nous voir a Av. Mediterráneo 33, Local 1B, Guardamar del Segura." },
      ],
    },
    cta: {
      eyebrow: "Reservez Votre Table",
      title: "Pret a decouvrir",
      accent: "l'Inde ce soir?",
      body: "Reunissez vos proches pour des entrees indiennes, tandoori, currys, biryanis, desserts et boissons.",
      hours: "Appelez pour reserver",
      addressLine: "Av. Mediterráneo 33, Guardamar del Segura - Sans reservation bienvenus",
    },
    footer: {
      summary: "Entrees indiennes, tandoori, currys, biryanis, plats vegetariens, desserts et boissons.",
      navigation: "Navigation",
      menu: "Notre Menu",
      visit: "Nous Trouver",
      address: "Adresse",
      phone: "Telephone",
      email: "E-mail",
      hours: "Reservations",
      rights: "Tous droits reserves.",
      crafted: "Prepare avec amour pour la cuisine indienne",
      designedBy: "Conçu par",
      links: { fullMenu: "Menu Complet", special: "Menu Special", starters: "Entrees", tandoori: "Tandoori", mains: "Plats", chef: "Specialites du Chef", drinks: "Boissons" },
    },
    menuPage: {
      eyebrow: "Masala Indian Restaurant",
      title: "Notre",
      accent: "Menu",
      vegetarian: "Vegetarien",
      spiceIndicator: "Niveau d'epices",
      priceNote: "Tous les prix sont en euros · Selon disponibilite",
      chefSpecial: "Special",
      proteins: { chicken: "Poulet", lamb: "Agneau", beef: "Boeuf", prawn: "Crevette", fish: "Poisson", vegetable: "Veg", special: "Special" },
      spice: { 0: "Non epice", 1: "Doux", 2: "Moyen", 3: "Fort", 4: "Tres fort" },
    },
  },
  no: {
    meta: {
      homeTitle: "Masala Indian Restaurant | Autentisk indisk mat",
      homeDescription:
        "Opplev autentiske indiske smaker hos Masala Indian Restaurant med tandoori, curry, vegetaralternativer og full drikkemeny.",
      menuTitle: "Meny | Masala Indian Restaurant",
      menuDescription:
        "Utforsk hele menyen vår med indiske forretter, tandoori, hovedretter, biryani, desserter og drikke.",
    },
    brand: { name: "Masala", descriptor: "Indian Restaurant" },
    nav: {
      home: "Hjem",
      menu: "Meny",
      about: "Om oss",
      contact: "Kontakt",
      story: "Historie",
      signature: "Retter",
      preview: "Galleri",
      menuLink: "Meny",
      reserve: "Reserver bord",
      toggle: "Åpne meny",
      language: "Bytt språk",
    },
    hero: {
      eyebrow: "Autentisk Indisk Mat",
      titleTop: "Smak",
      titleAccent: "Sjelen til India",
      body:
        "Klassiske indiske retter, tandoori-favoritter, vegetaralternativer og full drikkemeny, servert med varme.",
      primary: "Se meny",
      secondary: "Reserver bord",
      scroll: "Scroll",
    },
    story: {
      eyebrow: "Vår historie",
      title: "Hvor arv",
      accent: "møter gjestfrihet",
      body1:
        "Masala er en indisk restaurant med et bredt utvalg av tandoori, curry, biryani, vegetarretter, desserter og drikke.",
      body2:
        "Fra leirovn til duftende curry og ferskt brød er hele menyen bygget rundt kjente indiske favoritter.",
      primary: "Bestill bord",
      secondary: "Se meny",
      stat: "Spesialmeny",
    },
    stats: [
      { value: 90, suffix: "+", label: "Retter" },
      { value: 70, suffix: "+", label: "Drikke" },
      { value: 19, suffix: ".95", prefix: "€", displayValue: "€19.95", label: "Spesialmeny" },
      { value: 4, suffix: "", label: "Barnemenyer" },
    ],
    featured: {
      eyebrow: "Signaturretter",
      title: "Lagd med",
      accent: "Lidenskap",
      dishes: [
        {
          ...baseFeatured[0],
          name: "Butter Chicken",
          tagline: "Kokkens signatur",
          description: "Mør kylling i rik tomatsaus og smør, et indisk ikon på ny.",
          price: "€11.50",
        },
        {
          ...baseFeatured[1],
          name: "Mix Grill Sizzler",
          tagline: "Tandoori-spesial",
          description: "Et sydende fat med chicken tikka, seekh kebab og lamb tikka.",
          price: "€15.95",
        },
        {
          ...baseFeatured[2],
          name: "Rogan Josh",
          tagline: "Kashmir-klassiker",
          description: "Langtidskokt lam i aromatisk kashmirsaus med hele krydder.",
          price: "fra €10.95",
        },
      ],
    },
    menuPreview: {
      eyebrow: "Utforsk menyen",
      title: "En verden av",
      accent: "Smak",
      viewMenu: "Se meny",
      viewFull: "Se full meny",
      categories: [
        { id: "starters", label: "Forretter", tagline: "Lett og livlig", image: "/images/food/11.jpg" },
        { id: "tandoori", label: "Tandoori", tagline: "Fra leirovnen", image: "/images/food/9.jpg" },
        { id: "mains", label: "Hovedretter", tagline: "Mettende og aromatisk", image: "/images/food/8.jpg" },
        { id: "soft-drinks", label: "Drikke", tagline: "Fra lassi til cocktail", image: "/images/food/drink.png" },
      ],
    },
    gallery: { eyebrow: "Vår verden", title: "En fest for", accent: "Øyet" },
    values: {
      eyebrow: "Hvorfor Masala",
      title: "Masala",
      accent: "Løftet",
      items: [
        {
          title: "Indiske favoritter",
          text: "Menyen inkluderer kjente indiske retter, fra tandoori til curry og biryani.",
        },
        {
          title: "Full meny",
          text: "Vegetarretter, brød, ris, desserter og drikke står tydelig på husets menyer.",
        },
        {
          title: "Varm gjestfrihet",
          text: "Ring for å reservere eller besøk oss i Av. Mediterráneo 33, Local 1B, Guardamar del Segura.",
        },
      ],
    },
    cta: {
      eyebrow: "Reserver bord",
      title: "Klar til å oppleve",
      accent: "India i kveld?",
      body:
        "Samle venner og familie til indiske forretter, tandoori, curry, biryani, desserter og drikke.",
      hours: "Ring for å reservere",
      addressLine: "Av. Mediterráneo 33, Guardamar del Segura – drop-in velkommen",
    },
    footer: {
      summary: "Indiske forretter, tandoori, curry, biryani, vegetarretter, desserter og drikke.",
      navigation: "Navigasjon",
      menu: "Menyen vår",
      visit: "Besøk oss",
      address: "Adresse",
      phone: "Telefon",
      email: "E-post",
      hours: "Reservasjoner",
      rights: "Alle rettigheter forbeholdt.",
      crafted: "Lagd med kjærlighet for indisk mat",
      designedBy: "Designet av",
      links: {
        fullMenu: "Full meny",
        special: "Spesialmeny",
        starters: "Forretter",
        tandoori: "Tandoori",
        mains: "Hovedretter",
        chef: "Kokkens spesialiteter",
        drinks: "Drikke",
      },
    },
    menuPage: {
      eyebrow: "Masala Indian Restaurant",
      title: "Vår",
      accent: "meny",
      vegetarian: "Vegetar",
      spiceIndicator: "Styrkegrad",
      priceNote: "Alle priser i euro · Avhengig av tilgjengelighet",
      chefSpecial: "Spesial",
      proteins: {
        chicken: "Kylling",
        lamb: "Lam",
        beef: "Storfe",
        prawn: "Reke",
        fish: "Fisk",
        vegetable: "Veg",
        special: "Spesial",
      },
      spice: { 0: "Ikke sterk", 1: "Mild", 2: "Medium", 3: "Sterk", 4: "Ekstra sterk" },
    },
  },
};

export const menuCategoryText: Record<Locale, Partial<Record<string, Pick<MenuCategory, "label" | "description">>>> = {
  en: {},
  nl: {
    "special-menu": { label: "Speciaal menu", description: "Voorgerecht, hoofdgerecht, rijst of naan en een glas wijn, klein bier of frisdrank" },
    starters: { label: "Voorgerechten", description: "Begin je reis met levendige hapjes" },
    tandoori: { label: "Tandoori", description: "Gemarineerd en bereid in onze authentieke kleioven" },
    "tandoori-mains": { label: "Tandoori hoofdgerechten", description: "Sissend op uien, geserveerd met currysaus" },
    mains: { label: "Hoofdgerechten", description: "Kies je saus en eiwit, van mild tot vurig" },
    "chef-specials": { label: "Chef Specials", description: "De meest geliefde creaties van onze chef" },
    biryani: { label: "Biryani", description: "Geurige basmatirijst langzaam gegaard met specerijen" },
    vegetarian: { label: "Vegetarisch", description: "Plantaardige gerechten vol smaak en traditie" },
    kids: { label: "Kids maaltijden", description: "Kids maaltijden van het huismenu" },
    "breads-rice": { label: "Brood en rijst", description: "De perfecte begeleiding" },
    desserts: { label: "Desserts", description: "Een zoete afsluiter van je Indiase maaltijd" },
    "soft-drinks": { label: "Frisdranken", description: "Frisdranken van de drankkaart" },
    "waters-indian-drinks": { label: "Water en Indiase drankjes", description: "Water, tonic, gaseosa en lassi" },
    wines: { label: "Wijnen", description: "Witte, rode, rose en mousserende wijn" },
    "beer-spirits": { label: "Bier en sterke drank", description: "Bier, flesbier, sterke drank, brandy en whisky" },
    "cocktails-coffees": { label: "Cocktails en koffie", description: "Cocktails en koffie van de drankkaart" },
  },
  es: {
    "special-menu": { label: "Menu especial", description: "Entrante, plato principal, arroz o naan y copa de vino, cerveza pequena o refresco" },
    starters: { label: "Entrantes", description: "Empieza tu viaje con aperitivos vivos" },
    tandoori: { label: "Tandoori", description: "Marinado y cocinado en nuestro horno de barro" },
    "tandoori-mains": { label: "Principales tandoori", description: "Servidos chispeantes sobre cebolla con salsa curry" },
    mains: { label: "Platos principales", description: "Elige salsa y proteina, de suave a ardiente" },
    "chef-specials": { label: "Especiales del chef", description: "Las creaciones mas celebradas del chef" },
    biryani: { label: "Biryani", description: "Arroz basmati aromatico cocinado lentamente con especias" },
    vegetarian: { label: "Vegetariano", description: "Platos vegetales ricos en sabor y tradicion" },
    kids: { label: "Menu infantil", description: "Menus infantiles de la carta de la casa" },
    "breads-rice": { label: "Panes y arroz", description: "El acompanamiento perfecto" },
    desserts: { label: "Postres", description: "Un final dulce para tu banquete indio" },
    "soft-drinks": { label: "Refrescos", description: "Refrescos de la carta de bebidas" },
    "waters-indian-drinks": { label: "Aguas y bebidas indias", description: "Aguas, tonicas, gaseosa y lassi" },
    wines: { label: "Vinos", description: "Vino blanco, tinto, rose y espumoso" },
    "beer-spirits": { label: "Cervezas y licores", description: "Cerveza, botella, licores, brandy y whisky" },
    "cocktails-coffees": { label: "Cocteles y cafes", description: "Cocteles y cafes de la carta de bebidas" },
  },
  fr: {
    "special-menu": { label: "Menu special", description: "Entree, plat, riz ou naan et verre de vin, petite biere ou boisson sans alcool" },
    starters: { label: "Entrees", description: "Commencez le voyage avec des bouchees vives" },
    tandoori: { label: "Tandoori", description: "Marine et cuit dans notre four d'argile authentique" },
    "tandoori-mains": { label: "Plats tandoori", description: "Servis grilles sur oignons avec sauce curry" },
    mains: { label: "Plats principaux", description: "Choisissez votre sauce et proteine, de doux a ardent" },
    "chef-specials": { label: "Specialites du chef", description: "Les creations les plus celebres du chef" },
    biryani: { label: "Biryani", description: "Riz basmati parfume mijote avec des epices" },
    vegetarian: { label: "Vegetarien", description: "Plats vegetaux riches en saveur et tradition" },
    kids: { label: "Menus enfants", description: "Menus enfants de la carte maison" },
    "breads-rice": { label: "Pains et riz", description: "L'accompagnement parfait" },
    desserts: { label: "Desserts", description: "Une finale sucree pour votre repas indien" },
    "soft-drinks": { label: "Boissons sans alcool", description: "Boissons sans alcool de la carte" },
    "waters-indian-drinks": { label: "Eaux et boissons indiennes", description: "Eaux, tonics, gaseosa et lassi" },
    wines: { label: "Vins", description: "Vin blanc, rouge, rose et petillant" },
    "beer-spirits": { label: "Bieres et spiritueux", description: "Biere, bieres bouteille, spiritueux, brandy et whisky" },
    "cocktails-coffees": { label: "Cocktails et cafes", description: "Cocktails et cafes de la carte des boissons" },
  },
  no: {
    "special-menu": {
      label: "Spesialmeny",
      description: "Forrett, hovedrett, ris eller naan og et glass vin, lite øl eller mineralvann",
    },
    starters: { label: "Forretter", description: "Start reisen med livlige småretter" },
    tandoori: { label: "Tandoori", description: "Marinert og tilberedt i vår autentiske leirovn" },
    "tandoori-mains": { label: "Tandoori hovedretter", description: "Serveres sydende på løk med currysaus" },
    mains: { label: "Hovedretter", description: "Velg saus og protein, fra mild til sterk" },
    "chef-specials": { label: "Kokkens spesialiteter", description: "Kokkens mest populære kreasjoner" },
    biryani: { label: "Biryani", description: "Duftende basmatiris langkokt med krydder" },
    vegetarian: { label: "Vegetar", description: "Plantebaserte retter fulle av smak og tradisjon" },
    kids: { label: "Barnemenyer", description: "Barnemenyer fra husets meny" },
    "breads-rice": { label: "Brød og ris", description: "Det perfekte tilbehøret" },
    desserts: { label: "Desserter", description: "En søt avslutning på det indiske måltidet" },
    "soft-drinks": { label: "Mineralvann og brus", description: "Brus og leskedrikker fra drikkemenyen" },
    "waters-indian-drinks": { label: "Vann og indiske drikker", description: "Vann, tonic, gaseosa og lassi" },
    wines: { label: "Vin", description: "Hvit, rød, rosé og musserende" },
    "beer-spirits": { label: "Øl og brennevin", description: "Øl, flaskeøl, brennevin, brandy og whisky" },
    "cocktails-coffees": { label: "Cocktail og kaffe", description: "Cocktail og kaffe fra drikkemenyen" },
  },
};

const noteText: Record<Locale, Record<string, string>> = {
  en: {},
  nl: { "2 pieces": "2 stuks", "Per person": "Per persoon" },
  es: { "2 pieces": "2 piezas", "Per person": "Por persona" },
  fr: { "2 pieces": "2 pieces", "Per person": "Par personne" },
  no: { "2 pieces": "2 stk", "Per person": "Per person" },
};

function localizeItem(locale: Locale, item: MenuItem): MenuItem {
  if (locale === "en") return item;
  return {
    ...item,
    note: item.note ? noteText[locale][item.note] ?? item.note : undefined,
    description: item.description
      ? draftMenuDescription(locale, item.description)
      : undefined,
  };
}

function draftMenuDescription(locale: Locale, description: string) {
  const prefix: Record<Exclude<Locale, "en">, string> = {
    nl: "Huisgemaakte bereiding:",
    es: "Preparacion de la casa:",
    fr: "Preparation maison:",
    no: "Husets tilberedelse:",
  };
  if (locale === "en") return description;
  return `${prefix[locale]} ${description}`;
}

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export function getLocalizedMenuCategories(locale: Locale): MenuCategory[] {
  return menuCategories.map((category) => ({
    ...category,
    ...menuCategoryText[locale][category.id],
    items: category.items.map((item) => localizeItem(locale, item)),
  }));
}
