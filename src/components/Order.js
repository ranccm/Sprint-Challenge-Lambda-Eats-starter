import React from 'react'

function Order({ details }) {

  return (
    <div className='order-container'>
      <h2>{details.name}</h2>
      <p>size: {details.size}</p>
      <p>sauce: {details.sauce}</p>

      {
        !!details.toppings && !!details.toppings.length &&
        <div>
          toppings:
          <ul>
            {
              details.toppings.map((topping, idx) => <li key={idx}>{topping}</li>)
            }
          </ul>
        </div>
      }
    </div>
  )
}

export default Order
