
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [updatedProduct, setUpdatedProduct] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const productsPerPage = 10; // Number of products per page, adjust as needed
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [updatedProduct, currentPage, sortField, sortDirection]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/products', {
        params: {
          page: currentPage,
          limit: productsPerPage,
          sortField,
          sortDirection
        }
      });
      setProducts(response.data.products);
      setTotalProducts(response.data.totalProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Failed to fetch products');
    }
  };

  const deleteProduct = async (productId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3001/products/${productId}`);
        setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
        alert('Product deleted successfully!');
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
      }
    }
  };

  const handleEditProduct = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const sortProducts = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedProducts = () => {
    let sorted = [...products];
    if (sortField === 'name') {
      sorted.sort((a, b) =>
        sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      );
    } else if (sortField === 'category') {
      sorted.sort((a, b) =>
        sortDirection === 'asc' ? a.category.localeCompare(b.category) : b.category.localeCompare(a.category)
      );
    } else if (sortField === 'price') {
      sorted.sort((a, b) =>
        sortDirection === 'asc' ? a.price - b.price : b.price - a.price
      );
    }
    return sorted;
  };

  return (
    <div className="flex">
      <aside className="top-0 pb-3 px-4 w-50 flex flex-col justify-between h-screen border-r bg-white transition duration-300 w-40">
        <div>
          <ul className="space-y-2 tracking-wide mt-6">
            <li>
              <a href='/manage-products' aria-label="dashboard" className="relative px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-sky-600 to-cyan-400">
                <span className="-mr-1 font-medium">Manage Products</span>
              </a>
            </li>
            <li>
              <a href="/add-products" className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-700 group">
                <span className="group-hover:text-gray-700">Add Products</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
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

      <div className="flex-1 p-8">
        <div className="flex justify-end mb-4">
          <div className="flex items-center">
            <label className="mr-2">Sort By:</label>
            <select
              className="px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              value={sortField}
              onChange={(e) => sortProducts(e.target.value)}
            >
              <option value="">-- Select --</option>
              <option value="name">Name</option>
              <option value="category">Category</option>
              <option value="price">Price</option>
            </select>
            <select
              className="px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ml-2"
              value={sortDirection}
              onChange={(e) => setSortDirection(e.target.value)}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        <div className="rounded-lg border border-gray-300 pt-4 px-5 bg-white">
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead className="ltr:ml-3 rtl:mr-3">
              <tr>
                <th className="px-4 py-2 font-medium text-gray-900 cursor-pointer" onClick={() => sortProducts('name')}>
                  Name {sortField === 'name' && (
                    <span className="ml-1">{sortDirection === 'asc' ? '▲' : '▼'}</span>
                  )}
                </th>
                <th className="px-4 py-2 font-medium text-gray-900 cursor-pointer" onClick={() => sortProducts('category')}>
                  Category {sortField === 'category' && (
                    <span className="ml-1">{sortDirection === 'asc' ? '▲' : '▼'}</span>
                  )}
                </th>
                <th className="px-4 py-2 font-medium text-gray-900 cursor-pointer" onClick={() => sortProducts('price')}>
                  Price {sortField === 'price' && (
                    <span className="ml-1">{sortDirection === 'asc' ? '▲' : '▼'}</span>
                  )}
                </th>
                <th className="px-4 py-2 font-medium text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedProducts().map(product => (
                <tr className="text-gray-700" key={product._id}>
                  <td className="px-4 py-2 font-medium text-gray-900">{product.name}</td>
                  <td className="px-4 py-2 text-gray-700">{product.category}</td>
                  <td className="px-4 py-2 text-gray-700">${product.price.toFixed(2)}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    <button
                      className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                      onClick={() => handleEditProduct(product._id)}
                    >Edit</button>
                    <button
                      className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                      onClick={() => deleteProduct(product._id)}
                    >Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-4">
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={totalProducts}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
        </div>
    </div>
);
};

export default ManageProducts;

