import React, { useEffect, useState, useContext } from 'react';
import Heart from '../../assets/Heart';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { FirebaseContext } from '../../store/fireBaseContext';
import { PostContext } from "../../store/postContext";
import './Post.css';
import { format } from "date-fns";
import { useNavigate } from 'react-router-dom';

function Posts() {
  const { db } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  const { setPostDetails } = useContext(PostContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const allProducts = snapshot.docs.map((product) => {
          return {
            ...product.data(),
            id: product.id,
          };
        });
        setProducts(allProducts);
      } catch (err) {
        console.error("Error fetching products: ", err);
      }
    };
    fetchProducts();
  }, [db]);

  const handleClick = (product) => {
    setPostDetails(product);
    navigate("/view");
  };

  const formatDate = (createdAt) => {
    // Check if createdAt exists and is a valid Firestore Timestamp
    if (createdAt && createdAt.seconds) {
      try {
        return format(new Date(createdAt.seconds * 1000), "dd/MM/yyyy");
      } catch (error) {
        console.error("Error formatting date: ", error);
        return "Invalid date";
      }
    }
    return "Date not available";
  };

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product) => {
            return (
              <div className="card" onClick={() => handleClick(product)} key={product.id}>
                <div className="favorite">
                  <Heart />
                </div>
                <div className="image">
                  <img src={product.imageUrl} alt={product.name} />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.category}</span>
                  <p className="name">{product.name}</p>
                </div>
                <div className="date">
                  <span>{formatDate(product.createdAt)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart />
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name">YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
