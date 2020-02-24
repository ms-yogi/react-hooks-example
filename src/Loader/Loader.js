import React from 'react';
import './loader.css';

const Loader = () => {
    return ( 
        <div className='loaderStyle'>
            <span className='circle'></span>
            <h4 className='loading'>Loading...</h4>
        </div>
    );
}
 
export default Loader;