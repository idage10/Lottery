import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
    return (
        <nav>
            <Link to="/lotto" className="title">מפעל הפיס</Link>
            <ul>
                <li>
                    <Link to="/lotto">לוטו</Link>
                </li>
                <li>
                    <Link to="/777">777</Link>
                </li>
            </ul>
        </nav>
    );
}