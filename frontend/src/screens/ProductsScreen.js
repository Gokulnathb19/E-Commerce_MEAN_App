import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  saveProduct,
  listProducts,
  deleteProdcut,
} from '../actions/productActions';
import Modal from '../components/Modal';

function ProductsScreen(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  const { priceUnit } = useSelector((state) => state.appDetails);

  const categories = products.map(product => {
      return product.category
  }).filter((value, index, self) => { 
      return self.indexOf(value) === index;
  });

  const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if(!userInfo)
      props.history.replace("/signin?redirect=products");
  }, [userInfo])

  useEffect(() => {
    if (successSave) {
      setIsModalVisible(false);
    }
    dispatch(listProducts());
    return () => {
      //
    };
  }, [successSave, successDelete]);

  const openModal = (product) => {
    setIsModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
  };

  const modalCloseHandler = () => {
    setIsModalVisible(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };
  const deleteHandler = (product) => {
    dispatch(deleteProdcut(product._id));
  };
  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setUploading(true);
    axios
      .post('/api/uploads/s3', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setImage(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };
  return (
    <>
      {userInfo ? userInfo.isAdmin ? (
        <div className="content content-margined">
        <div className="product-header">
          <h3>Products</h3>
          <button className="button primary" onClick={() => openModal({})}>
            Create Product
          </button>
        </div>
        {isModalVisible && (
          <Modal closeHandler={modalCloseHandler}>
            <div className="form">
              <form onSubmit={submitHandler}>
                <ul className="form-container">
                  <li>
                    <center><h2>Product Details</h2></center>
                  </li>
                  <li>
                    {loadingSave && <div>Loading...</div>}
                    {errorSave && <div>{errorSave}</div>}
                  </li>

                  <li>
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      id="name"
                      onChange={(e) => setName(e.target.value)}
                    ></input>
                  </li>
                  <li>
                    <label htmlFor="price">Price({priceUnit})</label>
                    <input
                      type="text"
                      name="price"
                      value={price}
                      id="price"
                      onChange={(e) => setPrice(e.target.value)}
                    ></input>
                  </li>
                  <li>
                    <label htmlFor="image">Image</label>
                    <input
                      type="hidden"
                      name="image"
                      value={image}
                      id="image"
                      onChange={(e) => setImage(e.target.value)}
                    ></input>
                    {image ? <span style={{color: "green"}}>Image uploaded successfully</span> : ""}
                    <input type="file" onChange={uploadFileHandler}></input>
                    {uploading && <div>Uploading...</div>}
                  </li>
                  <li>
                    <label htmlFor="brand">Brand</label>
                    <input
                      type="text"
                      name="brand"
                      value={brand}
                      id="brand"
                      onChange={(e) => setBrand(e.target.value)}
                    ></input>
                  </li>
                  <li>
                    <label htmlFor="countInStock">CountInStock</label>
                    <input
                      type="text"
                      name="countInStock"
                      value={countInStock}
                      id="countInStock"
                      onChange={(e) => setCountInStock(e.target.value)}
                    ></input>
                  </li>
                  <li>
                    <label htmlFor="name">Category</label>
                    <input
                      list="categories"
                      type="text"
                      name="category"
                      value={category}
                      id="category"
                      onChange={(e) => setCategory(e.target.value)}
                    ></input>
                    <datalist id="categories">
                      {
                        categories.map((category, idx) => {
                          return <option key={idx} value={category}>{category}</option>
                        })
                      }
                    </datalist>
                  </li>
                  <li>
                    <label htmlFor="description">Description</label>
                    <textarea
                      name="description"
                      value={description}
                      id="description"
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </li>
                  <li>
                    <button type="submit" className="button primary">
                      {id ? 'Update' : 'Create'}
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => setIsModalVisible(false)}
                      className="button secondary"
                    >
                      Back
                    </button>
                  </li>
                </ul>
              </form>
            </div>
          </Modal>
        )}

        <div className="product-list table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{priceUnit}{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <button 
                      style={{backgroundColor: "limegreen", color: "white"}}
                      className="button"
                      onClick={() => openModal(product)}>
                      Edit
                    </button>{' '}
                    <button
                      style={{backgroundColor: "crimson", color: "white"}}
                      className="button"
                      onClick={() => deleteHandler(product)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      ) : <h1 style={{color: "red"}}>403 Unauthorized</h1> : "" }
    </>
  );
}
export default ProductsScreen;
