import React, { useState, useEffect } from 'react';
import styles from './Sunshine.module.css'

function Sunshine(){
    const {innerWidth, innerHeight} = window; //화면 크기 구하기

    return(
        <div >
            <div >
                <div className={styles.shinning}>
                </div>
            </div>
        </div>
    )
}

export default Sunshine