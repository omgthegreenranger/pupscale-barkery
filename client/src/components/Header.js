import React from 'react';

export default function Header(props) {
    return (
        <header className='header'>
            <div className="businessName">
                <h1>Theo's Pet Supply</h1>
            </div>
                 {props.children}
        </header>
   )
}