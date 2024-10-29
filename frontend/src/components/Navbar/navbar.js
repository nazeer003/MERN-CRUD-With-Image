import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header/header";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "./navbar.css";

function Navbar() {
  return (
    <>
      <Header />
      <div className="navbar-header">
        <div className="nav-cont">
          <img src="../images/logo.jpeg" alt="Logo" />

          <p className="logo-para">Chaperone</p>
        </div>
        <div className="nav-links">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/plans">Plan & Plots</Link>
            </li>
            <li>
              <Link to="/tools">Tools</Link>
            </li>
            <li>
              <Link to="/services">Our Services</Link>
            </li>
            <li>
              <Link to="/productform">Insert</Link>
            </li>
            <li>
              <Link to="/Update">Update</Link>
            </li>
            <li>
              <Link to="/faqs">FAQs</Link>
            </li>
          </ul>
        </div>
        <div className="user-profile">
          <div className="user-cont">
            <i className="fa fa-regular fa-user"></i>
            <p className="user-para">My Profile</p>
          </div>
          <div className="user-cont">
            <i className="fa fa-solid fa-cart-shopping"></i>
            <p className="user-para">Cart</p>
          </div>
        </div>
      </div>
      <div className="search-cont">
        <input type="text" placeholder="Search Plant" />
        <i className="fa fa-solid fa-search"></i>
      </div>
      <div className="box-cont">
        <div className="btn-box">
          <button type="button" className="btn btn-green">
            Plants
          </button>
          <button type="button" className="btn btn-green">
            Plots
          </button>
        </div>
        <p className="cont-para">
          Lorem ipsum dolor sit amet. Aut ipsam illum et nostrum quidem aut
          necessitatibus enim ut internos accusantium a numquam autem ab rerum
          omnis. Non molestiae ratione et laborum doloribus aut molestiae
          voluptates ut porro excepturi sit molestiae obcaecati qui quis beatae
          est voluptatem eius. Et architecto nihil id labore omnis hic iste
          deleniti et porro aspernatur.
        </p>
      </div>
    </>
  );
}

export default Navbar;
