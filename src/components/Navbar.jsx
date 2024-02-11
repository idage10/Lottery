import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
import "./Navbar.css";

export const Navbar = (props) => {
    const { isClickOnMobileMainPage, setClickOnMobileMainPage, navBarTitleData, navBarMenuButtonsData } = props;
    // open/close the menu on mobile resolution
    const [menuOpen, setMenuOpen] = useState(false);
    // hide the menu buttons on first time the app is in mobile resolution, to prevent watching the close menu animation
    const [isShowMenuAnimation, setShowMenuAnimation] = useState(false);

    // use the hook to check the screen size
    const isMobileScreen = useMediaQuery("(max-width: 480px)");

    React.useEffect(() => {
        if (isMobileScreen) {
            // set menuOpen and isShowMenuAnimation to false if the screen is mobile screen
            setMenuOpen(false);          
            setShowMenuAnimation(false);
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
    
    const onClickMenuIcon = () => {
        setMenuOpen(!menuOpen);
        setShowMenuAnimation(true);
    }

    const onClickNavLink = () => {
        if (isMobileScreen) {
            setMenuOpen(!menuOpen);
        }
    }

    return (
        <nav>
            <span className="navigationTitle">
                <img className={navBarTitleData?.className} src={navBarTitleData?.src} alt={navBarTitleData?.alt}></img>
                {navBarTitleData?.titleName}
            </span>
            <div 
                className={`menu ${menuOpen ? "closeMenuIcon" : "defaultMenuIcon"}`}
                onClick={onClickMenuIcon}
            >
            </div>
            <ul className={`navMenuButtons ${menuOpen ? "open" : ""} ${isShowMenuAnimation ? "showMenuAnimation" : ""}`}>
                {
                    navBarMenuButtonsData.map((buttonData, index) => (
                        <li key={index}>
                            <NavLink 
                                to={buttonData?.navLinkTo}
                                className={buttonData?.navLinkClassName}
                                onClick={onClickNavLink}
                            >
                                <img className={buttonData?.imgClassName} src={buttonData?.imgSrc} alt={buttonData?.imgAlt}></img>
                            </NavLink>
                        </li>
                    ))
                }
            </ul>
        </nav>
    );
}