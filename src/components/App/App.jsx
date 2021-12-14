import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import ProductList from '../ProductList/ProductList';
import SearchForm from '../SearchForm/SearchForm';

import service from '../../services/stores.service';
import Spinner from '../Spinner/Spinner';

const App = () => {
  const [products, setProducts] = useState([]);
  const [text, setText] = useState('');
  const [firstSearch, setFirstSearch] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(null);

  // If users searches new products - fetch them
  useEffect(() => {
    if (loading) {
      fetchProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  // Handle 'search bar' changes
  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  // Handle 'search form' submit
  const handleFormSubmit = async (e, filters, isValid) => {
    e.preventDefault();

    // If form is invalid - do nothing
    if (!isValid) return;

    filters.maxPrice = +filters.maxPrice;
    setFilters(filters);

    setText((text) => text.trim()); // Remove useless spaces
    // If search bar isn't empty - search
    if (text) {
      setLoading(true);
    }
  };

  // Search products
  const fetchProducts = async () => {
    const data = await service.getProducts(text, filters);
    setProducts(data);
    setLoading(false);
    setFirstSearch(false);
  };

  // If loading - show spinner, otherwise show product list
  const content = loading ? (
    <Spinner />
  ) : (
    <ProductList products={products} firstSearch={firstSearch} />
  );

  return (
    <div className='App'>
      <Header />
      <div className='container'>
        <SearchForm
          text={text}
          handleInputChange={handleInputChange}
          handleFormSubmit={handleFormSubmit}
        />
        {content}
      </div>
    </div>
  );
};

export default App;
