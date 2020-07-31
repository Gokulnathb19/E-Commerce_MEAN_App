import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Rating from '../components/Rating';


function HomeScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const category = props.match.params.id ? props.match.params.id : '';
  const productList = useSelector((state) => state.productList);
  const categoriesList = useSelector((state) => state.categoryList);
  const { products, loading, error } = productList;
  let categories;
  if(!category) {
    categories = [...categoriesList.categories];
    categories.shift();
  }
  else {
    categories = [category];
  }
  const dispatch = useDispatch();
  const productNameMaxLength = 65;
  useEffect(() => {
    dispatch(listProducts(category));

    return () => {
      //
    };
  }, [category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };
  const sortHandler = (e) => {
    const orderOfSort = e.target.value;
    setSortOrder(orderOfSort);
    dispatch(listProducts(category, searchKeyword, orderOfSort));
  };

  return (
    <>
      <ul style={{padding: "0.2rem"}} className="filter">
        <li>
          <form autoComplete="off" onSubmit={submitHandler}>
            <input
              name="searchKeyword"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button className="button primary" type="submit">Search</button>
          </form>
        </li>
        <li>
          Sort By{' '}
          <select name="sortOrder" value={sortOrder} onChange={sortHandler}>
            <option value="">New</option>
            <option value="lowest">Low - High</option>
            <option value="highest">High - Low</option>
          </select>
        </li>
      </ul>
      {categories.map((c, cIdx) => (
          <React.Fragment key={cIdx}>
            <h2 className="category-header">{c}</h2>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                
                <ul className="products">
                {products.map((product, pIdx) => (
                    <React.Fragment key={pIdx}>
                    {product.category === c && (
                        <li key={product._id}>
                        <div className="product">
                            <Link to={'/product/' + product._id}>
                            <img
                                className="product-image"
                                src={product.image}
                                alt="product"
                            />
                            </Link>
                            <div className="product-name">
                            <Link to={'/product/' + product._id}>{product.name.length > productNameMaxLength ? product.name.slice(0, productNameMaxLength-3) + '...' : product.name}</Link>
                            </div>
                            <div className="product-brand-price">
                            <div className="product-brand">{product.brand}</div>
                            <div className="product-price">${product.price}</div>
                            </div>
                            <div className="product-rating">
                            <Rating
                                value={product.rating}
                                text={'(' + product.numReviews + ')'}
                            />
                            </div>
                        </div>
                        </li>
                    )}
                    </React.Fragment>
                ))}
                </ul>
            )}
          </React.Fragment>
      )
      )}
    </>
  );
}
export default HomeScreen;
