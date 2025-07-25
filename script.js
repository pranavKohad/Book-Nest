
const books = [
  {
    id: 1,
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 299,
    image: "https://covers.openlibrary.org/b/id/15102369-M.jpg",
    genre: "fictional",
    description: "A mystical story about following your dreams and listening to your heart."
  },
  {
    id: 2,
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    price: 349,
    image: "https://covers.openlibrary.org/b/id/15103629-L.jpg",
    genre: "money",
    description: "Personal finance classic that teaches the value of financial education."
  },
  {
    id: 3,
    title: "Atomic Habits",
    author: "James Clear",
    price: 399,
    image: "https://covers.openlibrary.org/b/id/15106405-L.jpg",
    genre: "self-development",
    description: "A guide to building good habits and breaking bad ones with tiny changes."
  },
  {
    id: 4,
    title: "The Power of Now",
    author: "Eckhart Tolle",
    price: 320,
    image: "https://covers.openlibrary.org/b/id/15095333-L.jpg",
    genre: "spiritual",
    description: "A spiritual guide to living fully in the present moment."
  },
  {
    id: 5,
    title: "Ikigai",
    author: "Héctor García & Francesc Miralles",
    price: 250,
    image: "https://covers.openlibrary.org/b/id/15095588-L.jpg",
    genre: "self-development",
    description: "Discover the Japanese secret to a long and happy life."
  },
  {
    id: 6,
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    price: 370,
    image: "https://covers.openlibrary.org/b/id/15073849-L.jpg",
    genre: "self-development",
    description: "A counterintuitive approach to living a good life by caring less."
  },
  {
    id: 7,
    title: "Deep Work",
    author: "Cal Newport",
    price: 410,
    image: "https://covers.openlibrary.org/b/id/14859612-L.jpg",
    genre: "self-development",
    description: "Rules for focused success in a distracted world."
  },
  {
    id: 8,
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    price: 450,
    image: "https://covers.openlibrary.org/b/id/8284312-L.jpg",
    genre: "history",
    description: "A thought-provoking journey through the history of humankind."
  },
  {
    id: 9,
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    price: 380,
    image: "https://covers.openlibrary.org/b/id/473779-M.jpg",
    genre: "self-development",
    description: "A framework for personal and professional effectiveness."
  },
  {
    id: 10,
    title: "Start With Why",
    author: "Simon Sinek",
    price: 340,
    image: "https://covers.openlibrary.org/b/id/7351450-L.jpg",
    genre: "self-development",
    description: "How great leaders inspire everyone to take action."
  },
  {
    id: 11,
    title: "The Monk Who Sold His Ferrari",
    author: "Robin Sharma",
    price: 299,
    image: "https://covers.openlibrary.org/b/id/10693306-M.jpg",
    genre: "fictional",
    description: "A fable about achieving your dreams and realizing your destiny."
  },
  {
    id: 12,
    title: "Can't Hurt Me",
    author: "David Goggins",
    price: 420,
    image: "https://covers.openlibrary.org/b/id/14606379-M.jpg",
    genre: "autobiography",
    description: "A story of mastering your mind and defying the odds."
  },
  {
    id: 13,
    title: "Zero to One",
    author: "Peter Thiel",
    price: 360,
    image: "https://covers.openlibrary.org/b/id/15091674-L.jpg",
    genre: "money",
    description: "Notes on startups and how to build the future."
  }
  

  
];

let cart = [];

let wishlist = [];

const booksContainer = document.getElementById('booksContainer');
const cartSection = document.getElementById('cartSection');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const totalPrice = document.getElementById('totalPrice');
const searchInput = document.getElementById('searchInput');
const genreSelect = document.getElementById('genreSelect');


function renderBooks(bookList) {
  booksContainer.innerHTML = "";
  if (bookList.length === 0) {
    booksContainer.innerHTML = `<div style="grid-column: 1/-1; text-align:center; font-size:1.3rem; color:#888; margin:40px 0;">
      Will be available soon
    </div>`;
    return;
  }
  bookList.forEach(book => {
    const isWishlisted = wishlist.some(item => item.id === book.id);
    const card = document.createElement('div');
    card.classList.add('book-card');
    card.innerHTML = `
      <img src="${book.image}" alt="${book.title}">
      <h3 class="book-title">${book.title}</h3>
      <p class="book-genre"><strong>Genre:</strong> ${book.genre.replace('-', ' ')}</p>
      <p class="book-author"><strong>Author:</strong> ${book.author}</p>
      <p class="book-price"><strong>Price:</strong> ₹${book.price}</p>
      <button onclick="addToCart(${book.id})">Add to Cart</button>
      <button onclick="addToWishlist(${book.id})" class="wishlist-btn"${isWishlisted ? ' disabled' : ''}>Add to Wishlist</button>
      <button class="like-btn" data-id="${book.id}" style="background:none;border:none;font-size:1.5rem;cursor:pointer;vertical-align:middle;${isWishlisted ? 'color:#e63946;' : ''}">&#10084;</button>
    `;
    booksContainer.appendChild(card);
  });

  document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const bookId = parseInt(this.getAttribute('data-id'));
      addToWishlist(bookId);
      this.style.color = "#e63946";
      this.disabled = true;
      // Also disable the "Add to Wishlist" button for this book
      const wishlistBtn = this.parentElement.querySelector('.wishlist-btn');
      if (wishlistBtn) wishlistBtn.disabled = true;
    });
  });
}

const cartBtn = document.getElementById('cartBtn');
cartBtn.addEventListener('click', () => {
  booksContainer.style.display = "none";
  cartSection.style.display = "block";
});

document.querySelectorAll('nav a').forEach(link => {
  if (link.textContent.trim() === "Home") {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      cartSection.style.display = "none";
      booksContainer.style.display = "grid";
      searchInput.value = ""; 
      filterBooks();
    });
  }
});

// Cart tab click
cartBtn.addEventListener('click', () => {
  booksContainer.style.display = "none";
  cartSection.style.display = "block";
  searchInput.value = ""; // Clear search bar when switching section
  filterBooks();
});

// Continue Shopping button
document.getElementById('continueShoppingBtn').onclick = function() {
  cartSection.style.display = "none";
  booksContainer.style.display = "grid";
  searchInput.value = ""; // Clear search bar when switching section
  filterBooks();
};

function addToCart(id) {
  const book = books.find(b => b.id === id);
  const cartItem = cart.find(item => item.book.id === id);
  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({ book, quantity: 1 });
  }
  updateCart();
 
  showAddedMessage(`${book.title} added to cart!`);
}

function showAddedMessage(message) {
  let msgDiv = document.getElementById('addedMsg');
  if (!msgDiv) {
    msgDiv = document.createElement('div');
    msgDiv.id = 'addedMsg';
    msgDiv.style.position = 'fixed';
    msgDiv.style.top = '20px';
    msgDiv.style.right = '20px';
    msgDiv.style.background = '#28a745';
    msgDiv.style.color = '#fff';
    msgDiv.style.padding = '12px 24px';
    msgDiv.style.borderRadius = '6px';
    msgDiv.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
    msgDiv.style.zIndex = '2000';
    document.body.appendChild(msgDiv);
  }
  msgDiv.textContent = message;
  msgDiv.style.display = 'block';
  setTimeout(() => {
    msgDiv.style.display = 'none';
  }, 1200);
}

function removeFromCart(id) {
  cart = cart.filter(item => item.book.id !== id);
  updateCart();
}

function changeQuantity(id, delta) {
  const cartItem = cart.find(item => item.book.id === id);
  if (!cartItem) return;
  cartItem.quantity += delta;
  if (cartItem.quantity <= 0) {
    removeFromCart(id);
  } else {
    updateCart();
  }
}

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.book.price * item.quantity;
    const cartItemDiv = document.createElement('div');
    cartItemDiv.classList.add('cart-item');
    cartItemDiv.innerHTML = `
      <span>${item.book.title} - ₹${item.book.price} x ${item.quantity}</span>
      <div class="cart-actions">
        <button onclick="changeQuantity(${item.book.id}, 1)">+</button>
        <button onclick="changeQuantity(${item.book.id}, -1)">-</button>
        <button class="remove-btn" onclick="removeFromCart(${item.book.id})">Remove</button>
      </div>
    `;
    cartItems.appendChild(cartItemDiv);
  });

  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  totalPrice.textContent = total;
  cartSection.style.display = cart.length > 0 ? "block" : "none";
}

genreSelect.addEventListener('change', filterBooks);

function filterBooks() {
  const genre = genreSelect.value;
  const query = searchInput.value.toLowerCase();
  let filtered = books;

  if (genre !== "all") {
    filtered = filtered.filter(book => book.genre === genre);
  }
  if (query) {
    filtered = filtered.filter(book =>
      book.title.toLowerCase().includes(query)
    );

    searchInput.value = query + "";
  }
  renderBooks(filtered);
}

searchInput.addEventListener("input", filterBooks);


function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  alert("Thank you for your purchase!");
  cart = [];
  updateCart();
}

// Add to Wishlist function
function addToWishlist(id) {
  const book = books.find(b => b.id === id);
  if (!wishlist.some(item => item.id === id)) {
    wishlist.push(book);
    showAddedMessage(`"${book.title}" added to wishlist!`);
    renderBooks(document.querySelectorAll('.book-card').length ? books : []); 
    renderWishlist(); 
  } else {
    showAddedMessage(`"${book.title}" is already in wishlist!`);
  }
}

const wishlistBtn = document.getElementById('wishlistBtn');
wishlistBtn.addEventListener('click', () => {
  booksContainer.style.display = "none";
  cartSection.style.display = "none";
  showWishlistSection();
  searchInput.value = "";
  filterBooks();
});

function showWishlistSection() {
  let wishlistSection = document.getElementById('wishlistSection');
  if (!wishlistSection) {
    wishlistSection = document.createElement('section');
    wishlistSection.className = "wishlist-section";
    wishlistSection.id = "wishlistSection";
    wishlistSection.style.marginTop = "32px";
    wishlistSection.style.background = "#f4f8fb";
    wishlistSection.style.borderRadius = "14px";
    wishlistSection.style.boxShadow = "0 6px 32px rgba(0,0,0,0.08)";
    wishlistSection.style.maxWidth = "900px";
    wishlistSection.style.marginLeft = "auto";
    wishlistSection.style.marginRight = "auto";
    wishlistSection.style.padding = "32px 16px";
    document.querySelector('main.container').appendChild(wishlistSection);
  }
  wishlistSection.style.display = "block";
  renderWishlist();
}

function renderWishlist() {
  const wishlistSection = document.getElementById('wishlistSection');
  if (!wishlistSection) return;
  wishlistSection.innerHTML = `<h2 style="text-align:center;color:#e63946;margin-bottom:24px;">❤️ Wishlist</h2>`;
  if (wishlist.length === 0) {
    wishlistSection.innerHTML += `<div style="text-align:center; color:#888; font-size:1.2rem;">No books in wishlist yet.</div>`;
    return;
  }
  wishlist.forEach(book => {
    const card = document.createElement('div');
    card.classList.add('book-card');
    card.style.margin = "18px auto";
    card.style.maxWidth = "350px";
    card.innerHTML = `
      <img src="${book.image}" alt="${book.title}">
      <h3 class="book-title">${book.title}</h3>
      <p class="book-genre"><strong>Genre:</strong> ${book.genre.replace('-', ' ')}</p>
      <p class="book-author"><strong>Author:</strong> ${book.author}</p>
      <p class="book-price"><strong>Price:</strong> ₹${book.price}</p>
      <button onclick="removeFromWishlist(${book.id})" class="remove-btn" style="background:#dc3545;margin-bottom:10px;">Remove from Wishlist</button>
    `;
    wishlistSection.appendChild(card);
  });
}

function removeFromWishlist(id) {
  wishlist = wishlist.filter(book => book.id !== id);
  renderWishlist();
  renderBooks(books);
}

document.querySelectorAll('nav a').forEach(link => {
  if (link.textContent.trim() === "Home") {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      cartSection.style.display = "none";
      booksContainer.style.display = "grid";
      const wishlistSection = document.getElementById('wishlistSection');
      if (wishlistSection) wishlistSection.style.display = "none";
      searchInput.value = "";
      filterBooks();
    });
  }
});

cartBtn.addEventListener('click', () => {
  booksContainer.style.display = "none";
  cartSection.style.display = "block";
  const wishlistSection = document.getElementById('wishlistSection');
  if (wishlistSection) wishlistSection.style.display = "none";
  searchInput.value = "";
  filterBooks();
});

document.getElementById('continueShoppingBtn').onclick = function() {
  cartSection.style.display = "none";
  booksContainer.style.display = "grid";
  const wishlistSection = document.getElementById('wishlistSection');
  if (wishlistSection) wishlistSection.style.display = "none";
  searchInput.value = "";
  filterBooks();
};

renderBooks(books);
