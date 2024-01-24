import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
import "./Navbar.css";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [toggled, setToggled] = useState(false);

    // use the hook to check the screen size
    const isMobileScreen = useMediaQuery("(max-width: 480px)");

    React.useEffect(() => {
        if (isMobileScreen) {
            // set menuOpen and toggled to false if the screen is mobile screen
            setMenuOpen(false);            
            setToggled(false);
        }
    }, [isMobileScreen]); // update the effect when the screen size changes
    
    return (
        <nav>
            <span className="title">מפעל הפיס</span>
            <div 
                className="menu" 
                onClick={() => {
                    setMenuOpen(!menuOpen);
                    setToggled(true);
                }}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={`${menuOpen ? "open" : ""} ${toggled ? "toggled" : ""}`}>
                <li>
                    <NavLink 
                        to="/lotto"
                        className="lottoNav"
                        onClick={() => {
                            setMenuOpen(!menuOpen);
                        }}
                    >
                        לוטו
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/777"
                        className="sevenNav"
                        onClick={() => {
                            setMenuOpen(!menuOpen);
                        }}
                    >
                        777
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}