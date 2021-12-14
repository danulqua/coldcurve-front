const ProductItem = ({
  ean,
  title,
  store,
  url,
  img,
  description,
  price,
  discount,
  volume,
  weight,
}) => {
  // Clarify if the product is a liquid or not
  const weightValue = volume ? `${volume} ml` : weight ? `${weight} mg` : null;

  return (
    <div className='col-sm-6 col-md-4 col-lg-3'>
      <div className='product-item'>
        <div className='product-img'>
          <img src={img} alt={title} />
          <div className='store-name'>{store}</div>
        </div>
        {discount ? <div className='discount-value'>-{discount.value}%</div> : null}
        <div className='product-details'>
          <h2 className='product-title'>{title}</h2>
          <div className='product-weight'>{weightValue}</div>
          <div className='product-price'>
            {discount ? (
              <>
                <span className='discount-price'>{price} UAH</span>
                <span className='old-price'>{discount.oldPrice} UAH</span>
              </>
            ) : (
              <span className='normal-price'>{price} UAH</span>
            )}
          </div>
          <a className='store-link' href={url} target='_blank' rel='noreferrer'>
            Visit store
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
