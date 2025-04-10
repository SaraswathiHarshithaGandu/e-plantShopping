import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const parseItemCostToInteger = (itemCost) => {
    return parseInt(itemCost.replace('$', ''), 10);
    };

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let totalCost = 0;

        cart.forEach((item) => {
            const itemCost = parseItemCostToInteger(item.cost);
            totalCost += itemCost * item.quantity;
        });
    return totalCost;
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };
  
  const handleIncrement = (item) => {
    const dispatch = useDispatch();
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    const dispatch = useDispatch();
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem({ name: item.name }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  // Example item data (replace with your actual data structure
  const items = [
  { id: 1, name: "Snake Plant", quantity: 1, cost: "$12.00" },
  { id: 2, name: "Peace Lily", quantity: 1, cost: "$18.00" },
  { id: 3, name: "Snake Plant", quantity: 1, cost: "$15.00" }
  ];
  
  // DOM elements (replace with your actual elements)
  const quantityInputs = document.querySelectorAll(".quantity-input");
  const subtotalElements = document.querySelectorAll(".subtotal");
  const totalCostElement = document.querySelector("#total-cost");
  const cartIconElement = document.querySelector("#cart-icon");
  
  // Event listeners for quantity changes
  quantityInputs.forEach(input => {
  input.addEventListener("change", updateItem);
  });
  
  // Calculate subtotal for a single item
  function calculateSubtotal(item) {
  const price = parseFloat(item.cost.substring(1));
  return item.quantity * price;
  }
  // Calculate total cost of all items
  function calculateTotalCost() {
    let total = 0;
    items.forEach(item => {
      total += calculateSubtotal(item);
    });
    return total;
  }
  
  // Update the UI after changes
  function updateItem(event) {
    const input = event.target;
    const itemId = parseInt(input.getAttribute("data-item-id"));
    const item = items.find(i => i.id === itemId);
    if (item) {
      item.quantity = parseInt(input.value) || 0;
      // Update subtotal for this item
      const subtotal = calculateSubtotal(item);
      const subtotalElement = document.querySelector(`.subtotal[data-item-id="${itemId}"]`);
      if (subtotalElement) {
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
      }
      
      // Update overall total cost
      const totalCost = calculateTotalCost();
      totalCostElement.textContent = `$${totalCost.toFixed(2)}`;
      
      // Update total number of items in the cart
      const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
      cartIconElement.textContent = `${totalItems}`;
    }
  }

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


