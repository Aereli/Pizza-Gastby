import { graphql } from 'gatsby'
import React from 'react'
import SEO from '../../components/SEO'
import Img from 'gatsby-image'
import formatMoney from '../../utils/formatMoney'
import calculatePizzaPrice from '../../utils/calculatePizzaPrice'
import useForm from '../../utils/useForm'
import OrderStyles from './orderStyles'
import MenuItemStyles from './menuItemStyles'
import usePizza from '../../utils/usePizza'
import PizzaOrder from '../../components/PizzaOrder'
import calculateOrderTotal from '../../utils/calculateOrderTotal'

const OrderPage = ({ data }) => {
  const pizzas = data.pizzas.nodes
  const { order, addToOrder, removeFromOrder } = usePizza({ pizzas, inputs: values})
  const { values, updateValue } = useForm({
    name: '',
    email: '',
  })

  return (
    <>
    <SEO title="order a pizza" />
      <OrderStyles >
        <fieldset>
          <legend>Your Info</legend>
          <label htmlFor="name">
            Name
            <input id="name" type="text" name="name" value={values.name} onChange={updateValue} />
          </label>

          <label htmlFor="email">
            Email
            <input id="email" type="text" name="email" value={values.email} onChange={updateValue} /> 
          </label>
        </fieldset>
        
        {/* menu section */}
        <fieldset className="menu">
          <legend>Menu</legend>
          {pizzas.map((pizza) => (
            <MenuItemStyles key={pizza.id}>
              <Img fluid={pizza.image.asset.fluid} alt={pizza.name} width="50" height="50" />
              <div>
                <h2>{pizza.name}</h2>
              </div>
              <div>
                {['S', 'M', 'L'].map(size => (
                  <button 
                    key={size}
                    type="button" 
                    onClick={() => addToOrder(
                      {id: pizza.id,
                      size,}
                  )}>
                    {size}{" "} 
                    {formatMoney(calculatePizzaPrice(pizza.price, size))}
                  </button>
                ))}
              </div>
            </MenuItemStyles>
          ))}
        </fieldset>

        {/* order Section */}
        <fieldset className="order">
          <legend>Order</legend>
          <PizzaOrder 
          order={order}
          removeFromOrder={removeFromOrder}
          pizzas={pizzas}
          />
        </fieldset>

        {/* total section */}
        <fieldset>
          <h3>Your total is {formatMoney(calculateOrderTotal(order, pizzas))}</h3>
          <button type="submit">Order now</button>
        </fieldset>
      </OrderStyles>
    </>
  )
}

export default OrderPage

export const query = graphql`
 query { 
   pizzas: allSanityPizza {
     nodes {
       name
       id
       slug { current }
       price
       image {
         asset {
           fluid(maxWidth: 100) {
             ...GatsbySanityImageFluid
           }
         }
       }
     }
   }
 }
`
