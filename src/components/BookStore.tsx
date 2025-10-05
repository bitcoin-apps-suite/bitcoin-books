import React, { useState, useEffect } from 'react';
import { Search, Filter, ShoppingCart, Heart, Star, Book, DollarSign, Eye, Download } from 'lucide-react';
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
  const [books, setBooks] = useState<Book[]>([]);
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

  // Sample book data - trolling BTC edition
  const sampleBooks: Book[] = [
    {
      id: '1',
      title: 'Why I Sold My Bitcoin for Tulips',
      author: 'Chad Maximalist',
      price: 12.99,
      originalPrice: 69.99,
      rating: 1.2,
      reviewCount: 2147,
      description: 'A former BTC maxi\'s journey to enlightenment. Discover why tulip bulbs have more utility than digital rocks. Includes 200 pages of cope and seethe.',
      category: 'comedy',
      publishedDate: '2024-12-01',
      pages: 420,
      format: 'ebook',
      coverUrl: 'https://images.unsplash.com/photo-1520637836862-4d197d17c72a?w=200&h=300&fit=crop&crop=center',  // Tulip field
      featured: true,
      bestseller: true,
      tags: ['btc', 'tulips', 'cope', 'reality-check']
    },
    {
      id: '2',
      title: 'Lightning Network: Still Coming Soon™',
      author: 'Anonymous Dev',
      price: 18.99,
      rating: 2.1,
      reviewCount: 1892,
      description: 'The definitive guide to a payment system that\'s been "18 months away" for the past 8 years. Perfect for anyone who enjoys waiting forever.',
      category: 'technical',
      publishedDate: '2016-01-01',
      pages: 5,
      format: 'paperback',
      coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=300&fit=crop&crop=center',  // Lightning
      featured: true,
      tags: ['lightning', 'vaporware', 'soon', 'technical-debt']
    },
    {
      id: '3',
      title: '$100k by End of Year (Every Year)',
      author: 'Hopium Dealer',
      price: 99.99,
      rating: 0.5,
      reviewCount: 5823,
      description: 'Learn the ancient art of moving goalposts and predicting BTC prices. Includes exclusive charts drawn in crayon and a complimentary hopium inhaler.',
      category: 'fantasy',
      publishedDate: '2021-01-01',
      pages: 100,
      format: 'hardcover',
      coverUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=200&h=300&fit=crop&crop=center',  // Money/charts
      bestseller: false,
      tags: ['hopium', 'predictions', 'delusion', 'copium']
    },
    {
      id: '4',
      title: 'Have Fun Staying Poor: A Guide to Alienating Friends',
      author: 'Toxic Maxi',
      price: 21.00,
      rating: 1.8,
      reviewCount: 678,
      description: 'Master the art of being insufferable at dinner parties. Learn 50 ways to tell people about Bitcoin without them asking. Ruin relationships today!',
      category: 'self-help',
      publishedDate: '2020-03-15',
      pages: 152,
      format: 'audiobook',
      coverUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop&crop=center',  // Sad/frustrated person
      tags: ['toxic', 'maxi', 'cringe', 'social-suicide']
    },
    {
      id: '5',
      title: 'The Energy FUD Chronicles',
      author: 'Dr. Shill Bitcoin',
      price: 15.99,
      rating: 2.4,
      reviewCount: 445,
      description: 'Everything is actually good for Bitcoin, including melting glaciers and rolling blackouts. Mental gymnastics at Olympic levels.',
      category: 'propaganda',
      publishedDate: '2022-05-19',
      pages: 368,
      format: 'paperback',
      coverUrl: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=200&h=300&fit=crop&crop=center',  // Power plant/energy
      bestseller: false,
      tags: ['environment', 'cope', 'mental-gymnastics', 'fud']
    },
    {
      id: '6',
      title: 'Orange Coin Bad: A Rational Analysis',
      author: 'Prof. No-Coiner',
      price: 8.99,
      originalPrice: 24.99,
      rating: 4.8,
      reviewCount: 356,
      description: 'Finally, someone with a brain explains why digital Beanie Babies aren\'t the future of money. Backed by actual economics and common sense.',
      category: 'economics',
      publishedDate: '2023-01-27',
      pages: 352,
      format: 'hardcover',
      coverUrl: 'https://images.unsplash.com/photo-1592659762303-90081d34b277?w=200&h=300&fit=crop&crop=center',  // Orange background
      featured: true,
      tags: ['reality', 'economics', 'sanity', 'no-coiner-wisdom']
    },
    {
      id: '7',
      title: 'My Journey from Ramen to Ramen',
      author: 'Broke Hodler',
      price: 3.50,
      rating: 3.3,
      reviewCount: 234,
      description: 'A heartwarming tale of buying high, selling low, and learning that diamond hands are just expensive handcuffs. Comes with food stamps.',
      category: 'autobiography',
      publishedDate: '2023-11-16',
      pages: 423,
      format: 'ebook',
      coverUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&h=300&fit=crop&crop=center',  // Ramen noodles
      tags: ['poverty', 'hodl', 'broke', 'diamond-hands']
    },
    {
      id: '8',
      title: 'Web3 is Going Just Great',
      author: 'Molly White',
      price: 25.99,
      rating: 4.9,
      reviewCount: 1187,
      description: 'A real book by a real author documenting the real disasters in crypto. Spoiler alert: It\'s not going great. Includes actual facts and research.',
      category: 'reality',
      publishedDate: '2024-07-12',
      pages: 425,
      format: 'hardcover',
      coverUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=200&h=300&fit=crop&crop=center',  // Computer/tech disaster
      featured: true,
      bestseller: true,
      tags: ['web3', 'reality', 'disasters', 'molly-white']
    },
    {
      id: '9',
      title: 'Cope and Seethe: Advanced Techniques',
      author: 'Maxi McBagHolder',
      price: 69.42,
      rating: 1.6,
      reviewCount: 156,
      description: 'When the number doesn\'t go up, this comprehensive guide teaches you 420 ways to blame everything except your investment choices. Now with more copium!',
      category: 'self-help',
      publishedDate: '2024-04-08',
      pages: 287,
      format: 'paperback',
      coverUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=300&fit=crop&crop=center',  // Crying/emotional
      tags: ['cope', 'seethe', 'bagholding', 'denial']
    },
    {
      id: '10',
      title: 'Central Bank Digital Currencies: The Real Digital Money',
      author: 'Jerome Powell',
      price: 23.99,
      originalPrice: 28.99,
      rating: 4.4,
      reviewCount: 298,
      description: 'Why governments will just create their own digital money instead of using speculative casino tokens. Includes chapters on "Why We Don\'t Need Proof of Waste".',
      category: 'economics',
      publishedDate: '2024-01-21',
      pages: 264,
      format: 'ebook',
      coverUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&h=300&fit=crop&crop=center',  // Digital/bank cards
      tags: ['cbdc', 'government', 'real-digital-money', 'fed']
    }
  ];

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
    setBooks(sampleBooks);
    setFilteredBooks(sampleBooks);
  }, []);

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
            <Book size={64} />
            <h3>No books found</h3>
            <p>Try adjusting your search or filters</p>
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