export interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  unit: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const categories: Category[] = [
  { id: "hepsi", name: "Hepsi", icon: "grid" },
  { id: "atistirmalik", name: "Atistirmalik", icon: "cookie" },
  { id: "et-tavuk", name: "Et & Tavuk", icon: "beef" },
  { id: "icecekler", name: "Icecekler", icon: "cup-soda" },
  { id: "meyve-sebze", name: "Meyve & Sebze", icon: "apple" },
  { id: "sut-urunleri", name: "Sut Urunleri", icon: "milk" },
  { id: "temel-gida", name: "Temel Gida", icon: "wheat" },
  { id: "temizlik", name: "Temizlik", icon: "sparkles" },
];

export const products: Product[] = [
  // Meyve & Sebze
  {
    _id: "1",
    name: "Domates",
    price: 34.9,
    category: "meyve-sebze",
    image: "/products/domates.jpg",
    unit: "kg",
  },
  {
    _id: "2",
    name: "Salatalik",
    price: 29.9,
    category: "meyve-sebze",
    image: "/products/salatalik.jpg",
    unit: "kg",
  },
  {
    _id: "3",
    name: "Elma",
    price: 39.9,
    category: "meyve-sebze",
    image: "/products/elma.jpg",
    unit: "kg",
  },
  {
    _id: "4",
    name: "Muz",
    price: 69.9,
    category: "meyve-sebze",
    image: "/products/muz.jpg",
    unit: "kg",
  },
  {
    _id: "5",
    name: "Patates",
    price: 24.9,
    category: "meyve-sebze",
    image: "/products/patates.jpg",
    unit: "kg",
  },
  {
    _id: "6",
    name: "Sogan",
    price: 19.9,
    category: "meyve-sebze",
    image: "/products/sogan.jpg",
    unit: "kg",
  },

  // Sut Urunleri
  {
    _id: "7",
    name: "Tam Yagli Sut",
    price: 42.9,
    category: "sut-urunleri",
    image: "/products/sut.jpg",
    unit: "lt",
  },
  {
    _id: "8",
    name: "Beyaz Peynir",
    price: 89.9,
    category: "sut-urunleri",
    image: "/products/peynir.jpg",
    unit: "ad",
  },
  {
    _id: "9",
    name: "Tereyagi",
    price: 74.9,
    category: "sut-urunleri",
    image: "/products/tereyagi.jpg",
    unit: "ad",
  },
  {
    _id: "10",
    name: "Yogurt",
    price: 54.9,
    category: "sut-urunleri",
    image: "/products/yogurt.jpg",
    unit: "ad",
  },
  {
    _id: "11",
    name: "Kasar Peyniri",
    price: 119.9,
    category: "sut-urunleri",
    image: "/products/kasar.jpg",
    unit: "kg",
  },

  // Et & Tavuk
  {
    _id: "12",
    name: "Dana Kiyma",
    price: 289.9,
    category: "et-tavuk",
    image: "/products/kiyma.jpg",
    unit: "kg",
  },
  {
    _id: "13",
    name: "Tavuk Gogus",
    price: 149.9,
    category: "et-tavuk",
    image: "/products/tavuk.jpg",
    unit: "kg",
  },
  {
    _id: "14",
    name: "Kusbasi Et",
    price: 349.9,
    category: "et-tavuk",
    image: "/products/kusbasi.jpg",
    unit: "kg",
  },
  {
    _id: "15",
    name: "Tavuk Kanat",
    price: 109.9,
    category: "et-tavuk",
    image: "/products/kanat.jpg",
    unit: "kg",
  },

  // Icecekler
  {
    _id: "16",
    name: "Su (1.5L)",
    price: 9.9,
    category: "icecekler",
    image: "/products/su.jpg",
    unit: "ad",
  },
  {
    _id: "17",
    name: "Ayran",
    price: 14.9,
    category: "icecekler",
    image: "/products/ayran.jpg",
    unit: "ad",
  },
  {
    _id: "18",
    name: "Kola (1L)",
    price: 34.9,
    category: "icecekler",
    image: "/products/kola.jpg",
    unit: "ad",
  },
  {
    _id: "19",
    name: "Portakal Suyu",
    price: 44.9,
    category: "icecekler",
    image: "/products/portakal-suyu.jpg",
    unit: "ad",
  },
  {
    _id: "20",
    name: "Cay (1kg)",
    price: 119.9,
    category: "icecekler",
    image: "/products/cay.jpg",
    unit: "ad",
  },

  // Atistirmalik
  {
    _id: "21",
    name: "Cikolata",
    price: 29.9,
    category: "atistirmalik",
    image: "/products/cikolata.jpg",
    unit: "ad",
  },
  {
    _id: "22",
    name: "Cips",
    price: 24.9,
    category: "atistirmalik",
    image: "/products/cips.jpg",
    unit: "ad",
  },
  {
    _id: "23",
    name: "Biskuvi",
    price: 19.9,
    category: "atistirmalik",
    image: "/products/biskuvi.jpg",
    unit: "ad",
  },
  {
    _id: "24",
    name: "Kuruyemis",
    price: 89.9,
    category: "atistirmalik",
    image: "/products/kuruyemis.jpg",
    unit: "ad",
  },

  // Temel Gida
  {
    _id: "25",
    name: "Ekmek",
    price: 12.5,
    category: "temel-gida",
    image: "/products/ekmek.jpg",
    unit: "ad",
  },
  {
    _id: "26",
    name: "Pirinc (1kg)",
    price: 54.9,
    category: "temel-gida",
    image: "/products/pirinc.jpg",
    unit: "ad",
  },
  {
    _id: "27",
    name: "Makarna",
    price: 24.9,
    category: "temel-gida",
    image: "/products/makarna.jpg",
    unit: "ad",
  },
  {
    _id: "28",
    name: "Un (2kg)",
    price: 39.9,
    category: "temel-gida",
    image: "/products/un.jpg",
    unit: "ad",
  },
  {
    _id: "29",
    name: "Seker (1kg)",
    price: 34.9,
    category: "temel-gida",
    image: "/products/seker.jpg",
    unit: "ad",
  },
  {
    _id: "30",
    name: "Zeytinyagi",
    price: 179.9,
    category: "temel-gida",
    image: "/products/zeytinyagi.jpg",
    unit: "lt",
  },

  // Temizlik
  {
    _id: "31",
    name: "Bulasik Deterjani",
    price: 64.9,
    category: "temizlik",
    image: "/products/bulasik.jpg",
    unit: "ad",
  },
  {
    _id: "32",
    name: "Camasir Deterjani",
    price: 129.9,
    category: "temizlik",
    image: "/products/camasir.jpg",
    unit: "ad",
  },
  {
    _id: "33",
    name: "Kagit Havlu",
    price: 49.9,
    category: "temizlik",
    image: "/products/havlu.jpg",
    unit: "ad",
  },
  {
    _id: "34",
    name: "Cop Torbasi",
    price: 34.9,
    category: "temizlik",
    image: "/products/cop-torbasi.jpg",
    unit: "ad",
  },
];

export const salesData = [
  { month: "Ocak", satis: 4200 },
  { month: "Subat", satis: 3800 },
  { month: "Mart", satis: 5100 },
  { month: "Nisan", satis: 4600 },
  { month: "Mayis", satis: 5400 },
  { month: "Haziran", satis: 6200 },
  { month: "Temmuz", satis: 5800 },
  { month: "Agustos", satis: 6500 },
  { month: "Eylul", satis: 5900 },
  { month: "Ekim", satis: 6100 },
  { month: "Kasim", satis: 7200 },
  { month: "Aralik", satis: 8100 },
];

export const productSalesData = [
  { name: "Domates", miktar: 320 },
  { name: "Ekmek", miktar: 580 },
  { name: "Sut", miktar: 290 },
  { name: "Tavuk Gogus", miktar: 210 },
  { name: "Su", miktar: 450 },
  { name: "Muz", miktar: 175 },
  { name: "Peynir", miktar: 195 },
  { name: "Makarna", miktar: 260 },
  { name: "Ayran", miktar: 310 },
  { name: "Cikolata", miktar: 185 },
];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 2,
  }).format(price);
}
