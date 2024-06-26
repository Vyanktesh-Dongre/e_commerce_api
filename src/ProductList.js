
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchByCategory, setSearchByCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const productsPerPage = 12;
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/products', {
        params: {
          page: currentPage,
          limit: productsPerPage
        }
      });
      setProducts(response.data.products);
      setTotalProducts(response.data.totalProducts);
      setFilteredProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const CardProduct = ({ product }) => {
    return (
      <div className="bg-white py-6 shadow-lg p-4 rounded-md">
        <h3 className="text-xl font-semibold">{product.name}</h3>
        <p className="text-gray-600 mb-2">Category: {product.category}</p>
        <p className="text-gray-700 font-semibold">${product.price}</p>
      </div>
    );
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filterProducts = () => {
    let filtered = [...products];

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (searchByCategory) {
      filtered = filtered.filter(product =>
        product.category.toLowerCase().includes(searchByCategory.toLowerCase())
      );
    }

    if (minPrice || maxPrice) {
      filtered = filtered.filter(product => {
        const price = product.price;
        const min = minPrice ? parseFloat(minPrice) : 0;
        const max = maxPrice ? parseFloat(maxPrice) : Infinity;
        return price >= min && price <= max;
      });
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Top Bar */}
      <div className="bg-blue-900 text-white py-3 px-6 border-b flex justify-between items-center w-full space-x-2">
        <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold">MarketPlace</span>
          <button className="px-4 py-1 border border-transparent hover:border-black rounded text-sm">
            Location
          </button>
        </div>
        <div className="flex items-center space-x-2 flex-1 justify-center">
          <input
            type="text"
            placeholder="Search by Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-black"
          />
          <input
            type="text"
            placeholder="Search by Category"
            value={searchByCategory}
            onChange={(e) => setSearchByCategory(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-black"
          />
          <input
            type="number"
            name="minPrice"
            value={minPrice}
            placeholder="Min Price"
            onChange={(e) => setMinPrice(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-black"
          />
          <input
            type="number"
            name="maxPrice"
            value={maxPrice}
            placeholder="Max Price"
            onChange={(e) => setMaxPrice(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-black"
          />
          <button
            onClick={filterProducts}
            className="px-4 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700"
          >
            Apply Filters
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-1 border border-transparent hover:border-black rounded text-sm">
            Returns & Orders
          </button>
          <button className="px-4 py-1 border border-transparent hover:border-black rounded text-sm">
            Account
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Side Menu */}
        <aside className="bg-[#f5f5f5] pb-3 w-40 flex-none border-r bg-white transition duration-300">
          <div className="mt-6">
            <ul className="space-y-2 tracking-wide">
              <li>
                <a href='/manage-products' aria-label="dashboard" className="relative px-4 py-3  flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-sky-600 to-cyan-400">
                  <span className="-mr-1 font-medium">Details</span>
                </a>
              </li>
              <li>
                <a href="/manage" className="px-4 py-4 flex space-x-2 border border-transparent hover:border-black rounded text-md">
                  <span className="group-hover:text-gray-700 text-bold">Manage products</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="mt-auto">
            <button onClick={() => navigate('/adminlogin')} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-700 group">
              <svg className="h-6 w-6 text-gray-700" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                <path d="M20 12h-13l3 -3m0 6l-3 -3" />
              </svg>
              <span className="group-hover:text-gray-700">Logout</span>
            </button>
          </div>
        </aside>

        {/* Product List */}
        <main className="flex-1 p-4 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <CardProduct key={product._id} product={product} />
              ))
            ) : (
              <p className="text-center">No products found</p>
            )}
          </div>
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={totalProducts}
            paginate={paginate}
            currentPage={currentPage}
            className="mt-4"
          />
        </main>
      </div>
    </div>
  );
};

export default ProductList;
