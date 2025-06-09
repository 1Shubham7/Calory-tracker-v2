import React, { useState } from "react";
import "./navbar.css";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";

export default function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="navbar">
      <div className="navbar-links">
        <div className="navbar-links_container">
          <div className="coding-buddy">
            <a href="#home">Mission Health</a>
          </div>
          <p>
            <a href="#facb" id="facb">
              Search mentor
            </a>
          </p>
          <p>
            <a href="#about">About</a>
          </p>
          <p>
            <a href="https://mission-health-blog-v1.netlify.app/" target="_blank">Blogs</a>
          </p>

          <p>
            <a href="https://github.com/1Shubham7/Mission-Health">GitHub</a>
          </p>
          <div className="navbar-sign">
            <button type="button" id="btn">
              Log In
            </button>
          </div>
        </div>
      </div>

      <div className="navbar-menu">
        {toggleMenu ? (
          <RiCloseLine
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className="navbar-menu_container scale-up-center">
            <div className="navbar-menu_container-links">
              <p>
                <a href="#home">Coding Buddy</a>
              </p>
              <p>
                <a href="#facb">Find a Coding Buddy</a>
              </p>
              <p>
                <a href="#about">About</a>
              </p>
              <p>
                <a href="https://mission-health-blog-v1.netlify.app/">Blogs</a>
              </p>
              <p>
                <a href="https://github.com/1Shubham7/code-buddy">GitHub</a>
              </p>
              <div className="navbar-menu_container-links-sign">
                <button type="button" id="btn">
                  Log In
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
