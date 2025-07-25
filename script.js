const books = [
  {
    id: 1,
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 9.99,
    image: "https://covers.openlibrary.org/b/id/15102369-M.jpg"
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    price: 11.99,
    image: "https://covers.openlibrary.org/b/id/15106405-L.jpg"
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    price: 8.99,
    image: "https://covers.openlibrary.org/b/id/7222246-L.jpg"
  },
  {
    id: 4,
    title: "Deep Work",
    author: "Cal Newport",
    price: 12.99,
    image: "https://covers.openlibrary.org/b/id/8752222-L.jpg"
  }
];

let cart = [];

const bookList = document.getElementById("book-list");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartPanel = document.getElementById("cart-panel");
const searchInput = document.getElementById("searchInput");

function renderBooks(filteredBooks = books) {
  bookList.innerHTML = "";
  filteredBooks.forEach(book => {
    const bookEl = document.createElement("div");
    bookEl.className = "book";
    bookEl.innerHTML = `
      <img src="${book.image}" alt="${book.title}">
      <h3>${book.title}</h3>
      <p>by ${book.author}</p>
      <p><strong>$${book.price.toFixed(2)}</strong></p>
      <button onclick="addToCart(${book.id})">Add to Cart</button>
    `;
    bookList.appendChild(bookEl);
  });
}

function addToCart(bookId) {
  const book = books.find(b => b.id === bookId);
  if (book) {
    cart.push(book);
    updateCart();
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  cartCount.textContent = cart.length;
  cartItems.innerHTML = "";

  let total = 0;
  cart.forEach((item, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.title} - $${item.price.toFixed(2)}
      <button onclick="removeFromCart(${i})" style="margin-left:10px;">❌</button>
    `;
    cartItems.appendChild(li);
    total += item.price;
  });

  cartTotal.textContent = total.toFixed(2);
}

function toggleCart() {
  cartPanel.classList.toggle("hidden");
}

searchInput.addEventListener("input", () => {
  const term = searchInput.value.toLowerCase();
  const filtered = books.filter(book =>
    book.title.toLowerCase().includes(term) ||
    book.author.toLowerCase().includes(term)
  );
  renderBooks(filtered);
});

renderBooks();
