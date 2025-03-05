export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter Your Name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter Your Email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter Your Password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter Your Email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter Your Password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "masala", label: "Masala" },
    { id: "organic_oil", label: "Organic oil" },
    { id: "date", label: "Dates" },
    { id: "accessories", label: "Accessories" },
    { id: "date_molasses", label: "Date molasses" },
    { id: "honey", label: "Honey" },
    { id: "foods", label: "Foods" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
    { id: "", label: "" },
      { id: "", label: "" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "levi", label: "Levi's" },
      { id: "zara", label: "Zara" },
      { id: "nobrand", label: "No brand" },
      { id: "h&m", label: "H&M" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "ghee",
    label: "Ghee",
    path: "/shop/listing",
  },
  {
    id: "oils",
    label: "Oils",
    path: "/shop/listing",
  },
  {
    id: "dates",
    label: "Dates",
    path: "/shop/listing",
  },
  {
    id: "honey",
    label: "Honey",
    path: "/shop/listing",
  },
  {
    id: "masala",
    label: "Masala",
    path: "/shop/listing",
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  masala: "Masalas",
  organic_oil: "Organic Oil",
  date: "Dates",
  date_molasses: "Date molasses",
  honey: "Honey",
  foods: "Foods",
  accessories: "Accessories",
};

export const brandOptionsMap = {
  nike: "Nike",
  adidas: "Adidas",
  puma: "Puma",
  levi: "Levi",
  zara: "Zara",
  nobrand: "No Brand",
  "h&m": "H&M",
};

export const filterOptions = {
  category: [
    { id: "masala", label: "Masala" },
    { id: "organic_oil", label: "Organic oil" },
    { id: "date", label: "Dates" },
    { id: "accessories", label: "Accessories" },
    { id: "date_molasses", label: "Date molasses" },
    { id: "honey", label: "Honey" },
  ],
  brand: [
    { id: "", label: "" },
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "levi", label: "Levi's" },
    { id: "zara", label: "Zara" },
    { id: "h&m", label: "H&M" },
    { id: "nobrand", label: "No brand" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pinCode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Division",
    name: "division",
    componentType: "input",
    type: "text",
    placeholder: "Enter your division",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];