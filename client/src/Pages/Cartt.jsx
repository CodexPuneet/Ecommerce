import React from 'react'

const Cartt = () => {
  return (
    <div>
<Header />
    </div>
  )
}

function Header() {
    return (
      <header w='90%'>
        <h1>Shopping Cart</h1>
  
        <ul className="breadcrumb">
          <li>Home</li>
          <li>Shopping Cart</li>
        </ul>
  
        <span className="count">4 items in the bag</span>
      </header>
    );
  }
export default Cartt