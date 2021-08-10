import React, {useState, useEffect} from 'react'
import Products from './components/products/Products'
import Navbar from './components/Navbar/Navbar'
import { commerce } from './lib/Commerce'
import Cart from './components/Cart/Cart'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Checkout from './components/Checkoutform/Checkout/Checkout'

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})
  const [order, setOrder] = useState({})
  const [errorMessage, setErrorMessage] = useState('')

  const fetchproducts = async ()=>{
    try{
      const { data } = await commerce.products.list()
      setProducts(data)
    }catch(err){} 
  }

  const fetchCart = async()=>{
    try{
      setCart(await commerce.cart.retrieve())
    }catch(err){}
  }

  const handleAddtoCart = async (productId, quantity)=>{
    try{
      const { cart } = await commerce.cart.add(productId, quantity)
      setCart(cart)
    }catch(err){}
  }

  const handleUpdateCartQty = async (productId, quantity) =>{
    try{
      const { cart } = await commerce.cart.update(productId, { quantity })
      setCart(cart)
    }catch(err){}
  }

  const handleRemoveFromCart = async (productId) =>{
    try{
      const { cart } = await commerce.cart.remove(productId)
      setCart(cart)
    }catch(err){}
    
  }

  const handleEmptyCart = async () =>{
    try{
      const { cart } = await commerce.cart.empty()
      setCart(cart)
    }catch(err){}  
  }

  const refreshCart = async ()=>{
    const newCart = await commerce.cart.refresh()
    
    setCart(newCart)
  }

  const handleCaptureCheckout = async (checkoutTokenId, newOrder)=>{
    try{
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)
      setOrder(incomingOrder)
      refreshCart()
    }catch(error){
        setErrorMessage(error.data.error.message)
    }
  }
  

  useEffect(() => {
    fetchproducts()
    fetchCart()
  }, [])

  console.log(cart)
  return (
    <Router>
      <div className="App">
          <Navbar totalItems={cart.total_items}/>      
            <Switch>
              <Route exact path="/">
                <Products products={products} onAddCart={handleAddtoCart}/>
              </Route>
              <Route path="/cart">
                <Cart cart={cart}
                handleUpdateCartQty={handleUpdateCartQty}
                handleRemoveFromCart={handleRemoveFromCart}
                handleEmptyCart={handleEmptyCart}
                />
              </Route>
              <Route path="/checkout">
                <Checkout cart={cart}
                    order={order}
                    error={errorMessage}
                    onCaptureCheckout={handleCaptureCheckout}
                />
              </Route>
            </Switch>       
      </div>
    </Router>
  );
}

export default App;
