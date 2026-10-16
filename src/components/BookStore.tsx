import React, { useState, useEffect } from 'react';
import { Search, Filter, ShoppingCart, Heart, Star, Book as BookIcon, Eye } from 'lucide-react';
import './BookStore.css';

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  category: string;
  publishedDate: string;
  pages: number;
  format: 'ebook' | 'audiobook' | 'hardcover' | 'paperback';
  coverUrl: string;
  previewUrl?: string;
  featured?: boolean;
  bestseller?: boolean;
  tags: string[];
}

interface BookStoreProps {
  isAuthenticated?: boolean;
  onCartUpdate?: (itemCount: number) => void;
}

const BookStore: React.FC<BookStoreProps> = ({ isAuthenticated = false, onCartUpdate }) => {
  const [books] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [cart, setCart] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showCart, setShowCart] = useState(false);

  // No sample books: the store lists only real published books (none yet).

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'comedy', label: 'Comedy & Satire' },
    { value: 'technical', label: 'Technical Disasters' },
    { value: 'economics', label: 'Real Economics' },
    { value: 'fantasy', label: 'Fantasy & Delusion' },
    { value: 'self-help', label: 'Self-Help & Cope' },
    { value: 'propaganda', label: 'Propaganda' },
    { value: 'autobiography', label: 'Autobiography' },
    { value: 'reality', label: 'Reality Check' }
  ];

  const formats = [
    { value: 'all', label: 'All Formats' },
    { value: 'ebook', label: 'E-book' },
    { value: 'audiobook', label: 'Audiobook' },
    { value: 'hardcover', label: 'Hardcover' },
    { value: 'paperback', label: 'Paperback' },
  ];

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Customer Rating' },
    { value: 'newest', label: 'Newest First' },
    { value: 'bestseller', label: 'Best Sellers' }
  ];

  useEffect(() => {
    let filtered = books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           book.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
      const matchesFormat = selectedFormat === 'all' || book.format === selectedFormat;
      const matchesPrice = book.price >= priceRange[0] && book.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesFormat && matchesPrice;
    });

    // Sort books
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
        break;
      case 'bestseller':
        filtered.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    setFilteredBooks(filtered);
  }, [books, searchTerm, selectedCategory, selectedFormat, priceRange, sortBy]);

  useEffect(() => {
    onCartUpdate?.(cart.length);
  }, [cart, onCartUpdate]);

  const addToCart = (bookId: string) => {
    if (!cart.includes(bookId)) {
      setCart([...cart, bookId]);
    }
  };

  const removeFromCart = (bookId: string) => {
    setCart(cart.filter(id => id !== bookId));
  };

  const toggleWishlist = (bookId: string) => {
    if (wishlist.includes(bookId)) {
      setWishlist(wishlist.filter(id => id !== bookId));
    } else {
      setWishlist([...wishlist, bookId]);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="star filled" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="star half" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="star empty" />);
    }

    return stars;
  };

  const getCartTotal = () => {
    return cart.reduce((total, bookId) => {
      const book = books.find(b => b.id === bookId);
      return total + (book?.price || 0);
    }, 0);
  };

  const getCartBooks = () => {
    return cart.map(bookId => books.find(b => b.id === bookId)).filter(Boolean) as Book[];
  };

  const CartSidebar = () => (
    <div className={`cart-sidebar ${showCart ? 'open' : ''}`}>
      <div className="cart-header">
        <h3>Shopping Cart ({cart.length})</h3>
        <button onClick={() => setShowCart(false)}>×</button>
      </div>
      
      <div className="cart-content">
        {cart.length === 0 ? (
          <div className="empty-cart">
            <ShoppingCart size={48} />
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {getCartBooks().map(book => (
                <div key={book.id} className="cart-item">
                  <img src={book.coverUrl} alt={book.title} className="cart-item-image" />
                  <div className="cart-item-info">
                    <h4>{book.title}</h4>
                    <p>{book.author}</p>
                    <span className="cart-item-price">${book.price}</span>
                  </div>
                  <button 
                    onClick={() => removeFromCart(book.id)}
                    className="remove-item"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            
            <div className="cart-footer">
              <div className="cart-total">
                <strong>Total: ${getCartTotal().toFixed(2)}</strong>
              </div>
              <button className="checkout-btn">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  const BookCard: React.FC<{ book: Book }> = ({ book }) => (
    <div className={`book-card ${viewMode}`} onClick={() => setSelectedBook(book)}>
      <div className="book-cover-container">
        <img src={book.coverUrl} alt={book.title} className="book-cover" />
        {book.bestseller && <div className="badge bestseller">Bestseller</div>}
        {book.featured && <div className="badge featured">Featured</div>}
        <div className="book-actions">
          <button
            className={`action-btn wishlist ${wishlist.includes(book.id) ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(book.id);
            }}
          >
            <Heart />
          </button>
          <button
            className="action-btn preview"
            onClick={(e) => {
              e.stopPropagation();
              // Preview functionality
            }}
          >
            <Eye />
          </button>
        </div>
      </div>
      
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">by {book.author}</p>
        
        <div className="book-rating">
          <div className="stars">
            {renderStars(book.rating)}
          </div>
          <span className="rating-text">
            {book.rating} ({book.reviewCount} reviews)
          </span>
        </div>
        
        <div className="book-price">
          <span className="current-price">${book.price}</span>
          {book.originalPrice && (
            <span className="original-price">${book.originalPrice}</span>
          )}
        </div>
        
        <div className="book-meta">
          <span className="format">{book.format}</span>
          <span className="pages">{book.pages} pages</span>
        </div>
        
        <button
          className={`add-to-cart-btn ${cart.includes(book.id) ? 'in-cart' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            if (cart.includes(book.id)) {
              removeFromCart(book.id);
            } else {
              addToCart(book.id);
            }
          }}
        >
          <ShoppingCart />
          {cart.includes(book.id) ? 'Remove from Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="bookstore">
      {/* Header */}
      <div className="bookstore-header">
        <div className="search-bar">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search books, authors, topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="header-actions">
          <button
            className="filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter />
            Filters
          </button>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          <div className="view-toggle">
            <button
              className={viewMode === 'grid' ? 'active' : ''}
              onClick={() => setViewMode('grid')}
            >
              Grid
            </button>
            <button
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => setViewMode('list')}
            >
              List
            </button>
          </div>
          
          <button
            className="cart-toggle"
            onClick={() => setShowCart(true)}
          >
            <ShoppingCart />
            Cart ({cart.length})
          </button>
        </div>
      </div>

      {/* Filters Sidebar */}
      {showFilters && (
        <div className="filters-sidebar">
          <h3>Filters</h3>
          
          <div className="filter-group">
            <label>Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Format</label>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
            >
              {formats.map(format => (
                <option key={format.value} value={format.value}>
                  {format.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Price Range</label>
            <div className="price-range">
              <input
                type="range"
                min="0"
                max="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              />
              <span>${priceRange[0]} - ${priceRange[1]}</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`bookstore-content ${showFilters ? 'with-filters' : ''}`}>
        <div className="results-header">
          <h2>
            Bitcoin Books ({filteredBooks.length} results)
          </h2>
          {selectedCategory !== 'all' && (
            <span className="category-label">
              Category: {categories.find(c => c.value === selectedCategory)?.label}
            </span>
          )}
        </div>
        
        <div className={`books-grid ${viewMode}`}>
          {filteredBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
        
        {filteredBooks.length === 0 && (
          <div className="no-results">
            <BookIcon size={64} />
            <h3>{books.length === 0 ? 'No books published yet' : 'No books found'}</h3>
            <p>{books.length === 0 ? 'Books published to Bitcoin will appear here.' : 'Try adjusting your search or filters'}</p>
          </div>
        )}
      </div>

      {/* Book Detail Modal */}
      {selectedBook && (
        <div className="book-modal-overlay" onClick={() => setSelectedBook(null)}>
          <div className="book-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedBook(null)}
            >
              ×
            </button>
            
            <div className="modal-content">
              <div className="modal-image">
                <img src={selectedBook.coverUrl} alt={selectedBook.title} />
              </div>
              
              <div className="modal-info">
                <h2>{selectedBook.title}</h2>
                <p className="modal-author">by {selectedBook.author}</p>
                
                <div className="modal-rating">
                  <div className="stars">
                    {renderStars(selectedBook.rating)}
                  </div>
                  <span>{selectedBook.rating} ({selectedBook.reviewCount} reviews)</span>
                </div>
                
                <div className="modal-price">
                  <span className="current-price">${selectedBook.price}</span>
                  {selectedBook.originalPrice && (
                    <span className="original-price">${selectedBook.originalPrice}</span>
                  )}
                </div>
                
                <p className="modal-description">{selectedBook.description}</p>
                
                <div className="modal-meta">
                  <div className="meta-item">
                    <strong>Format:</strong> {selectedBook.format}
                  </div>
                  <div className="meta-item">
                    <strong>Pages:</strong> {selectedBook.pages}
                  </div>
                  <div className="meta-item">
                    <strong>Published:</strong> {new Date(selectedBook.publishedDate).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="modal-actions">
                  <button
                    className={`add-to-cart-btn ${cart.includes(selectedBook.id) ? 'in-cart' : ''}`}
                    onClick={() => {
                      if (cart.includes(selectedBook.id)) {
                        removeFromCart(selectedBook.id);
                      } else {
                        addToCart(selectedBook.id);
                      }
                    }}
                  >
                    <ShoppingCart />
                    {cart.includes(selectedBook.id) ? 'Remove from Cart' : 'Add to Cart'}
                  </button>
                  
                  <button
                    className={`wishlist-btn ${wishlist.includes(selectedBook.id) ? 'active' : ''}`}
                    onClick={() => toggleWishlist(selectedBook.id)}
                  >
                    <Heart />
                    {wishlist.includes(selectedBook.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </button>
                  
                  <button className="preview-btn">
                    <Eye />
                    Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shopping Cart Sidebar */}
      <CartSidebar />

      {/* Cart Overlay */}
      {showCart && (
        <div className="cart-overlay" onClick={() => setShowCart(false)} />
      )}
    </div>
  );
};

export default BookStore;