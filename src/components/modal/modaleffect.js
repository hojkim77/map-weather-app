import React, { useEffect } from 'react';
import Snowfall from 'react-snowfall';
import Clouds from './Clouds';
import Sunshine from './Sunshine';
import Rainy from './Rainy'
const Modalef = (main) => {
    
    return (
    <div>
        {main.main === "Snow" ? <Snowfall /> : 
         main.main === "Clouds"? <Clouds /> :
         main.main === "Rain" ? <Rainy />:
         main.main === "Clear" ? <Sunshine />:
         null}
    </div>
    );
};

export default Modalef;