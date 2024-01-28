import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
import "./Navbar.css";

export const Navbar = (props) => {
    const { isClickOnMobileMainPage, setClickOnMobileMainPage } = props;
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

    React.useEffect(() => {
        if (isMobileScreen && menuOpen && isClickOnMobileMainPage) {
            // close the nav menu when clicking the main page on mobile resolution
            setMenuOpen(false);
        }
        // set isClickOnMobileMainPage to false after clicking on the main page
        setClickOnMobileMainPage(false);
    }, [isMobileScreen, menuOpen, isClickOnMobileMainPage, setClickOnMobileMainPage]); // update the effect when a varible changes
    
    return (
        <nav>
            <span className="navigationTitle">
                <img className="paisLogo" src={`${process.env.PUBLIC_URL}/images/pais-logo.png`} alt="לוגו מפעל הפיס"></img>
                מפעל הפיס
            </span>
            <div 
                className={`menu ${menuOpen ? "closeMenuIcon" : "defaultMenuIcon"}`}
                onClick={() => {
                    setMenuOpen(!menuOpen);
                    setToggled(true);
                }}
            >
            </div>
            <ul className={`navMenuButtons ${menuOpen ? "open" : ""} ${toggled ? "toggled" : ""}`}>
                <li>
                    <NavLink 
                        to="/lotto"
                        className="lottoNav"
                        onClick={() => {
                            if (isMobileScreen)
                            {
                                setMenuOpen(!menuOpen);
                            }
                        }}
                    >
                        <img className="navLoggoLotto" src={`${process.env.PUBLIC_URL}/images/lotto-logo.png`} alt="לוגו לוטו"></img>
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/777"
                        className="sevenNav"
                        onClick={() => {
                            if (isMobileScreen)
                            {
                                setMenuOpen(!menuOpen);
                            }
                        }}
                    >
                        <img className="navLoggo777" src={`${process.env.PUBLIC_URL}/images/777-logo.png`} alt="לוגו 777"></img>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}