import React, { useState, useEffect } from 'react';
import cloud1 from './modalimg/cloud1.png';
import cloud2 from './modalimg/cloud2.png';
import cloud3 from './modalimg/cloud3.png';
import cloud4 from './modalimg/cloud4.png';
import cloud5 from './modalimg/cloud5.png';
import styles from "./Clouds.module.css";

const clouds = [cloud1, cloud2, cloud3, cloud4, cloud5];
const {innerWidth, innerHeight} = window; //화면 크기 구하기

function Cloudflake(props){

    const r = Math.floor(Math.random() * 5);
    const rw = Math.random() * (300 - 200) + 200;
    const rh = Math.random() * (300 - 200) + 200;
    return(
        <div style={{ position:'absolute', 
            left:Math.random() * (innerWidth - 100) + 'px',
            top:Math.random() * (innerHeight - 100) + 'px',
            zIndex:100}}>
            <img src={clouds[r]} className={`${ // 구름 이미지의 id값 마다 다른 styles적용
                0 <= props.id && props.id < 4 ? styles.cloud1 :
                4 <= props.id && props.id < 7 ?  styles.cloud2 :
                styles.cloud3}`}
            />
        </div>
    )
}

function Clouds(){
    const arr = Array.from('0123456789'); //구름의 갯수 = 배열의 길이 (만약 배열을 모두 1로 하면 key중복으로 에러 뜸)

    return(
        <div>
            {
                arr.map((i) =>{
                    return(<Cloudflake key ={i} id={i}/>) //id구별하여 위에서 구름마다의 styles다르게 적용하기 위함
                })
            } 
        </div>
    )
}

export default Clouds;