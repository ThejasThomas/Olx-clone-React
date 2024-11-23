import React,{useContext} from 'react';
import './Header.css';
import { AuthContext, FirebaseContext } from '../../store/fireBaseContext';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

function Header() {

  const {user} = useContext(AuthContext);
  const {auth,db} = useContext(FirebaseContext);
  const navigate = useNavigate();

  const handleLogout = async ()=>{
     try{
      await signOut(auth);
      navigate('/login')
     }catch(err){
      console.error("Error signing out:", err.message)
     }
  }
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName" onClick={()=>navigate('/')}>
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <select className="language-select">
          <option>ENGLISH</option>
          <option>हिंदी</option>
        </select>
        <div className="loginPage">
          {user ? `Welcome ${user.displayName}` : (<span onClick={()=>navigate("/login")}>Login</span>) }
          <hr />

        </div>
         { user && <span onClick={handleLogout} className='logout-text'>Logout</span>}
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span onClick={()=>navigate('/create')}>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
