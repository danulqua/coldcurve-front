import { useState, useEffect } from 'react';
import validator from 'validator';
import service from '../../services/stores.service.js';

const SearchForm = ({ text, handleInputChange, handleFormSubmit }) => {
  const [stores, setStores] = useState([]);
  const [filters, setFilters] = useState({ storeId: null, maxPrice: '', discountsOnly: false });
  const [valid, setValid] = useState(true);

  // Fetch store names in order to fill in the select input
  useEffect(() => {
    service.getStores().then((stores) => setStores(stores));
  }, []);

  // Handle select input changes
  const handleSelectChange = (e) => {
    const value = e.target.value || null;
    setFilters((filters) => ({ ...filters, storeId: value }));
  };

  // Handle 'discount only' input changes
  const handleDiscountsChange = (e) => {
    setFilters((filters) => ({ ...filters, discountsOnly: e.target.checked }));
  };

  // Handle 'Max price' input changes
  const handleMaxPriceChange = (e) => {
    const value = e.target.value;

    // price validation
    let valid = !value.length || validator.isDecimal(value);
    valid = valid ? (+value >= 0 ? true : false) : false;
    setValid(valid);

    setFilters((filters) => ({ ...filters, maxPrice: value }));
  };

  return (
    <form className='search-form'>
      <div className='search-wrapper'>
        <input
          type='text'
          placeholder='Product title...'
          name='name'
          id='name'
          className='search-bar'
          value={text}
          onChange={handleInputChange}
        />
        <button className='btn-search' onClick={(e) => handleFormSubmit(e, filters, valid)}>
          Search
        </button>
      </div>
      <div className='filters-wrapper'>
        <select
          className='select-store'
          name='store'
          id='store'
          placeholder='Store filter'
          defaultValue=''
          onChange={handleSelectChange}
        >
          <option value='' disabled>
            Store filter
          </option>
          <option value=''>All stores</option>
          {stores.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <div className={valid ? 'input-price' : 'input-price error'}>
          <input
            type='text'
            name='maxPrice'
            id='max-price'
            placeholder='Max price'
            onChange={handleMaxPriceChange}
            value={filters.maxPrice}
          />
        </div>
        <label className='input-discount' htmlFor='discounts-only'>
          <input
            type='checkbox'
            name='discountsOnly'
            id='discounts-only'
            onChange={handleDiscountsChange}
            value={filters.discountsOnly}
          />
          Discounts only
        </label>
      </div>
    </form>
  );
};

export default SearchForm;
