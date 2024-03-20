import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(each => each.id !== id),
    }))
  }

  addCartItem = product => {
    const {cartList} = this.state
    const isPresent = cartList.some(each => each.id === product.id)
    if (isPresent) {
      const item = cartList.filter(eachItem => eachItem.id === product.id)
      item[0].quantity = item[0].quantity + product.quantity
      this.setState(prevState => ({
        cartList: [...prevState.cartList],
      }))
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, product],
      }))
    }
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const item = cartList.filter(eachItem => eachItem.id === id)
    item[0].quantity = item[0].quantity + 1
    this.setState(prevState => ({
      cartList: [...prevState.cartList],
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const item = cartList.filter(eachItem => eachItem.id === id)
    if (item[0].quantity > 1) {
      item[0].quantity = item[0].quantity - 1
      this.setState(prevState => ({
        cartList: [...prevState.cartList],
      }))
    } else {
      this.setState(prevState => ({
        cartList: prevState.cartList.filter(each => each.id !== id),
      }))
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
