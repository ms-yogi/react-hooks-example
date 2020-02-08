import React from 'react';

const Loader = () => {
    return ( 
        <div style={{padding: '1rem', boxShadow: 'rgba(0, 0, 0, 0.2) 0px 10px 18px 0px', borderRadius: '3px', background: '#dcdcdc', width: '10%', margin: '5rem auto', textAlign: 'center'}}>
            <h4 style={{color: '#2a2a2a', margin: 0}}>Loading...</h4>
        </div>
    );
}
 
export default Loader;