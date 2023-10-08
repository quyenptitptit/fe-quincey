import img1 from "../assets/img/slideshow/slider_1.webp";
import img2 from "../assets/img/slideshow/slider_2.webp";
import img3 from "../assets/img/slideshow/slider_3.webp";

const fadeImages = [img1, img2, img3];

const TYPE = [
  { value: "men", label: "Men" },
  { value: "women", label: "Women" },
  { value: "kids", label: "Kids" },
];

const TRADEMARK = [
  { value: "chanels", label: "Chanels" },
  { value: "dior", label: "Dior" },
  { value: "shein", label: "Shein" },
  { value: "other", label: "Other" },
];

const CATEGORY = [
  { value: "t-shirt", label: "T-Shirt" },
  { value: "jean", label: "Jean" },
  { value: "dress", label: "Dress" },
  { value: "shirt", label: "Shirt" },
  { value: "other", label: "Other" },
];

const STYLE = [
  { value: "boho", label: "Boho" },
  { value: "casual", label: "Casual" },
  { value: "cute", label: "Cute" },
  { value: "elegant", label: "Elegant" },
  { value: "fashionable", label: "Fashionable" },
  { value: "party", label: "Party" },
  { value: "other", label: "Other" },
]

const SIZE = [
  { value: "XS", label: "XS" },
  { value: "S", label: "S" },
  { value: "M", label: "M" },
  { value: "L", label: "L" },
  { value: "XL", label: "XL" },
  { value: "FreeSize", label: "FreeSize" },
];

const COLOR = [
  { value: "Red", label: "Red" },
  { value: "Black", label: "Black" },
  { value: "White", label: "White" },
  { value: "Blue", label: "Blue" },
  { value: "Green", label: "Green" },
  { value: "Grey", label: "Grey" },
  { value: "Pink", label: "Pink" },
  { value: "Violet", label: "Violet" },
  { value: "Yellow", label: "Yellow" },
  { value: "Orange", label: "Orange" },
];

export { fadeImages, CATEGORY, TRADEMARK, SIZE, COLOR, STYLE, TYPE };
