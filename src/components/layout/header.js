import React, { useState } from 'react';
import styles from "./header.module.css";

const Header = () => {
    return ( 
        <div>
            <div className={styles.navbar}>
                <div className={styles.home}>
                    map-weather-app
                </div>
            </div>
        </div>
    );
};

export default Header;