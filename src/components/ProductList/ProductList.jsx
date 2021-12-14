import ProductItem from '../ProductItem/ProductItem';

const ProductList = ({ products, firstSearch }) => {
  // If it's the very first search - show nothing
  const content = !firstSearch ? (
    <>
      <div className='products-count'>Matches found: {products.length}</div>
      <div className='row g-3'>
        {products
          .sort((a, b) => a.price - b.price)
          .map((item, idx) => {
            const { ean, title, store, url, img, description, price, discount, volume, weight } =
              item;
            return (
              <ProductItem
                key={idx}
                ean={ean}
                title={title}
                store={store}
                url={url}
                img={img}
                description={description}
                price={price}
                discount={discount}
                volume={volume}
                weight={weight}
              />
            );
          })}
      </div>
    </>
  ) : null;

  return <div className='product-list'>{content}</div>;
};

export default ProductList;
