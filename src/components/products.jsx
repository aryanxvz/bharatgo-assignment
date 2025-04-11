import { useEffect, useState } from "react"
import { HiPlus, HiCheck, HiChevronDown } from "react-icons/hi"
import { ProductDetail } from "./product-details"
import { useLocation } from "react-router-dom"
import { motion } from "framer-motion"

export const Products = ({ currentPath, addToCart, setIsCartOpen, cartItems }) => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [addedItems, setAddedItems] = useState({})
  const [isSortOpen, setIsSortOpen] = useState(false)
  const [sortOption, setSortOption] = useState("default")
  const location = useLocation()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/products")
        const data = await res.json()
        setProducts(data)
        setFilteredProducts(data)
      } catch (error) {
        console.error("error fetching the products:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    const cartItemMap = {};
    cartItems.forEach(item => {
      cartItemMap[item.id] = true;
    });
    
    setAddedItems(cartItemMap);
  }, [cartItems]);

  useEffect(() => {
    if (products.length === 0) return
    
    const categoryMap = {
      '/clothes': 'Clothes',
      '/electronics': 'Electronics',
      '/furnitures': 'Furniture',
      '/toys': 'Toys'
    }
    
    let filtered = [...products]
    
    if (currentPath !== '/' && categoryMap[currentPath]) {
      filtered = filtered.filter(product => 
        product.category.name.toLowerCase().includes(categoryMap[currentPath].toLowerCase())
      )
    }
    
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply sorting
    if (sortOption === "priceLowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHighToLow") {
      filtered.sort((a, b) => b.price - a.price);
    }
    
    setFilteredProducts(filtered)
  }, [currentPath, products, searchQuery, sortOption])

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleProductClick = (product) => {
    setSelectedProduct(product)
  }

  const handleCloseDetail = () => {
    setSelectedProduct(null)
  }
  
  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
    setIsCartOpen(true);
  }

  const handleSortOptionClick = (option) => {
    setSortOption(option);
    setIsSortOpen(false);
  }

  useEffect(() => {
    setSelectedProduct(null)
  }, [location.pathname])

  if (loading) {
    return (
      <section className="flex flex-col items-center">
        <div className="flex flex-col justify-center items-center mt-20">
          <span>Home</span>
          <div className="w-80 h-14 rounded-lg p-4 my-4 border border-black bg-gray-100 animate-pulse"></div>
        </div>

        <div className="grid w-full max-w-screen-lg justify-center sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 sm:gap-2 md:gap-3 xl:gap-4 place-items-center">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="w-56 h-60 mb-4">
              <div className="w-full h-4/5 mb-2 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="flex justify-between">
                <div className="w-28 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-12 h-6 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (filteredProducts.length === 0) {
    return <div className="text-center py-40">Nothing related &#58;&#40;</div>
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }

  return (
    <section className="flex flex-col items-center">
      <div className="w-full max-w-screen-lg px-4 mt-20">
        <div className="flex justify-between items-center mb-4">
          <div className="flex-1 text-center">
            <span className="pl-16">Home</span>
          </div>
          <div className="relative">
            <button onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center cursor-pointer">
              Sort by
              <HiChevronDown className={`transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
            </button>
            {isSortOpen && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="absolute top-full right-0 mt-1 w-48 bg-white border border-black rounded-lg shadow-lg z-10">
                <button onClick={() => handleSortOptionClick("default")}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${sortOption === "default" ? 'bg-gray-100' : ''}`}>
                  Default
                </button>
                <button onClick={() => handleSortOptionClick("priceLowToHigh")}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${sortOption === "priceLowToHigh" ? 'bg-gray-100' : ''}`}>
                  Price: Low to High
                </button>
                <button onClick={() => handleSortOptionClick("priceHighToLow")}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${sortOption === "priceHighToLow" ? 'bg-gray-100' : ''}`}>
                  Price: High to Low
                </button>
              </motion.div>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <input 
            placeholder="Search a product" 
            value={searchQuery} 
            onChange={handleSearchChange} 
            className="w-80 rounded-lg p-4 mb-4 border border-black" 
          />
        </div>
      </div>

      <motion.div 
        className="grid w-full max-w-screen-lg justify-center sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 sm:gap-2 md:gap-3 xl:gap-4 place-items-center"
        variants={containerVariants}
        initial="hidden" animate="visible">
        {filteredProducts.map((product) => (
          <motion.div 
            key={product.id} 
            onClick={() => handleProductClick(product)} 
            className="relative rounded-xl hover:cursor-pointer w-56 h-60 transition ease duration-75"
            variants={itemVariants}
            whileTap={{ scale: 0.97 }}>
            <div className="relative w-full h-4/5 mb-2">
              <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover rounded-lg" />
              <div className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-sm m-1 px-2">{product.category.name}</div>
              <motion.button 
                onClick={(e) => handleAddToCart(e, product)}
                className={`absolute top-2 right-2 cursor-pointer ${addedItems[product.id] ? 'bg-black' : 'bg-white'} rounded-full p-1 shadow`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}>
                {addedItems[product.id] ? (
                  <HiCheck className="text-white w-4 h-4" />
                ) : (
                  <HiPlus className="text-black w-4 h-4" />
                )}
              </motion.button>
            </div>
            <div className="flex justify-between">
              <h2 className="text-sm font-light">{product.title}</h2>
              <p className="text-lg font-medium">{product.price}$</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct}
          onClose={handleCloseDetail}
          addToCart={() => {
            addToCart(selectedProduct);
            setIsCartOpen(true);
          }}
        />
      )}
    </section>
  )
}