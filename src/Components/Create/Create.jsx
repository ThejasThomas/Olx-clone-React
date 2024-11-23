import React, { Fragment, useContext, useState, useEffect } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import { AuthContext, FirebaseContext } from '../../store/fireBaseContext';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; 
import { addDoc, collection } from "firebase/firestore"; 
import { storage } from '../../firebase/config';
const Create = () => {
  const { db } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setLoading(false);
    }
  }, [user]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (image) {
        const imageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(imageRef, image);
        const url = await getDownloadURL(imageRef);

        await addDoc(collection(db, "products"), {
          name,
          category,
          price,
          imageUrl: url,
          userId: user.uid,
          createdAt: new Date()
        });
        alert("Product added successfully");
        navigate('/');
        setLoading(false);
      }
    } catch (err) {
      console.error('Error uploading image and saving product:', err);
      setLoading(false);
    }
  };

  if (!user) {
    // Render a message box if the user is not logged in
    return (
      <Fragment>
        <Header />
        <div className="loginPrompt">
          <div className="loginMessageBox">
            <h2>Please Log In</h2>
            <p>You must be logged in to create a product listing.</p>
            <button onClick={() => navigate('/login')} className="loginButton">
              Go to Login
            </button>
          </div>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="wrapper">
          <div className="centerDiv">
            <label htmlFor="name">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="name"
              name="Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <br />
            <label htmlFor="category">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <br />
            <label htmlFor="price">Price</label>
            <br />
            <input
              className="input"
              type="number"
              id="price"
              name="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <br />
            <br />
            {image && (
              <img alt="Preview" width="200px" height="200px" src={URL.createObjectURL(image)} />
            )}
            <br />
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <br />
            <button onClick={handleSubmit} className="uploadBtn" disabled={loading}>
              {loading ? 'Uploading...' : 'Upload and Submit'}
            </button>
          </div>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;