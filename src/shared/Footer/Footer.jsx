import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={3}>
            <div className="footer__logo">
              <img src="https://img.freepik.com/free-vector/font-design-word-art-craft-with-colorful-crayons_1308-44267.jpg?size=626&ext=jpg&ga=GA1.2.116927386.1683121921&semt=ais" alt="Website Logo" />
              <h6>Art And Craft</h6>
            </div>
          </Col>
          <Col md={3}>
            <h5>Quick Links</h5>
            <ul className="footer__menu">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/toys">Instructor</Link>
              </li>
              <li>
                <Link to="/mytoys">Classes</Link>
              </li>
              <li>
                <Link to="/addtoy">Dashboard</Link>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Contact Us</h5>
            <p>Dhaka,Uttora</p>
            <p>Phone: 01793534981</p>
            <p>Email: jabedhasan231@gmail.com</p>
          </Col>
          <Col md={3}>
            <h5>Follow Us</h5>
            <ul className="social-icons">
              <li>
                <a href="https://facebook.com/artAndCraft">
                  <FaFacebook></FaFacebook>
                </a>
              </li>
              <li>
                <a href="https://twitter.com/artAndCraft">
                  <FaTwitter></FaTwitter>
                </a>
              </li>
              <li>
                <a href="https://instagram.com/artAndCraft">
                  <FaInstagram></FaInstagram>
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
      <div className="footer__bottom">
        <Container>
          <Row>
            <Col>
              <p>&copy; {new Date().getFullYear()} Art and Craft School. All rights reserved.</p>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;