import React from 'react'
import calculatePizzaPrice from './calculatePizzaPrice'

function calculateOrderTotal(order, pizzas){
  
  const total = order.reduce((acc, singleOrder) => {
    const pizza = pizzas.find(item => item.id === singleOrder.id)
    return acc + calculatePizzaPrice(pizza.price, singleOrder.size)
    
  }, 0)
  return total
}

export default calculateOrderTotal