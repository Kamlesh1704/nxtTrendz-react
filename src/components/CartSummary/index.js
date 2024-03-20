import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const noOfItem = cartList.length
      let totalPrice = 0
      const totalItem = () => {
        cartList.forEach(each => {
          totalPrice += each.price * each.quantity
        })
        return totalPrice
      }

      return (
        <div className="summaryCart">
          <h1 className="order">
            Order Total: <span className="total">Rs {totalItem()}</span>
          </h1>
          <p className="items">{noOfItem} Items in cart</p>
          <button className="checkout" type="button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
