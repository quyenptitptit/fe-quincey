import React from "react";
import './Footer.css'

function Footer() {
  return (
    <div className="footer">
      <div>
        <i class="fab fa-facebook-f icon"></i>
        <i class="fab fa-twitter icon"></i>
        <i class="fab fa-google icon"></i>
        <i class="fab fa-instagram icon"></i>
        <i class="fab fa-linkedin-in icon"></i>
        <i class="fab fa-github icon"></i>
      </div>
      <div className="footer-copyright">
        <i class="fas fa-copyright"></i> 2023 QuyenQuyen
      </div>
    </div>
  );
}

export default Footer;
