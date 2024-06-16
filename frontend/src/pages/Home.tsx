import React, { useEffect, useState } from 'react';
import api from '../api';
import Header from '../components/Header';
import Product from '../components/Product';

function Home() {
  const [products, setProducts] = useState([]);
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    getProduct();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const getProduct = () => {
    api
      .get('/api/products/')
      .then((res) => res.data)
      .then((data) => {
        setProducts(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteProduct = (id) => {
    console.log(`Deleting product with id: ${id}`);
    if (!id) {
      alert('Product ID is not defined');
      return;
    }
    api
      .delete(`/api/products/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          alert('Deleted');
        } else {
          alert('Some problem');
        }
        getProduct();
      })
      .catch((error) => alert(error));
  };

  const createProduct = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('image', image);

    api
      .post('/api/products/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        if (res.status === 201) {
          alert('Product created successfully');
        } else {
          alert('Some problem occurred');
        }
        getProduct();
      })
      .catch((err) => alert(err));
  };

  interface Product {
    id: number;
    description: string;
    name: string;
    price: number;
    image: string;
  }

  return (
    <>
      <Header></Header>
      <div>
        <div>
          <h2>Products</h2>
          {products.map((product: Product) => (
            <Product key={product.id} product={product} onDelete={deleteProduct} />
          ))}
        </div>
        <h2>Create product</h2>
        <form onSubmit={createProduct} encType="multipart/form-data">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <label htmlFor="description">DESC:</label>
          <textarea
            name="description"
            id="description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}></textarea>
          <label htmlFor="name">Name:</label>
          <input
            type="number"
            id="price"
            name="price"
            required
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            accept="image/*"
            id="image"
            name="image"
            required
            onChange={handleImageUpload}
          />

          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
}

export default Home;
