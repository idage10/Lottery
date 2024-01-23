import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    
    return (
        <nav>
            <Link to="/lotto" className="title">מפעל הפיס</Link>
            <div 
                className="menu" 
                onClick={() => {
                    setMenuOpen(!menuOpen);
                }}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={menuOpen ? "open" : ""}>
                <li>
                    <NavLink to="/lotto">לוטו</NavLink>
                </li>
                <li>
                    <NavLink to="/777">777</NavLink>
                </li>
            </ul>
        </nav>
    );
}