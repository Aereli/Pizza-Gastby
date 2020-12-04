import { useState, useContext } from 'react'
import OrderContext from '../components/OrderContext'
import calculateOrderTotal from './calculateOrderTotal'
import formatMoney from './formatMoney'
import attachNamesAndPrices from './attachNamesAndPrices'

export default function usePizza({ pizzas, values }) {
  const [order, setOrder] = useContext(OrderContext)
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza])
  }

  function removeFromOrder(index) {
    setOrder([...order.slice(0, index), ...order.slice(index + 1)])
  }

  // this is the function that is run when someone submits the form
  async function submitOrder(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    // setMessage('Pizza being sent...');

    // gather all the data
    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatMoney(calculateOrderTotal(order, pizzas)),
      name: values.name,
      email: values.email,
      shoe: values.shoe,
    }
    // Send this data the a serevrless function when they check out
    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    )
    const text = JSON.parse(await res.text())

    // check if everything worked
    if (res.status >= 400 && res.status < 600) {
      setLoading(false)
      setError(text.message)
    } else {
      // it worked!
      setLoading(false)
      setMessage('Success! Come on down for your pizza')
    }
  }

  return {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  }
}
