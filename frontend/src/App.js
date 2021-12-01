import {Suspense} from 'react'
import { Container,  } from 'react-bootstrap'
import { HashRouter as Router, Route } from 'react-router-dom'


import i18n from'./i18n'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import PaymentScreen from './screens/PaymentScreen'
import ShippingScreen from './screens/ShippingScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import UserListScreen from './screens/UserListScreen'
import OrderListScreen from './screens/OrderListScreen'
import ProductListScreen from './screens/ProductListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import Wts from './components/Wts'


function App() {
  return (
      <Suspense fallback="loading...">
    <Router>
      <Header/>
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeScreen} exact />
            <Route path='/' component={Wts} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />

          <Route path='/admin/productlist' component={ProductListScreen} />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />

          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />

          <Route path='/admin/orderlist' component={OrderListScreen} />
        </Container>

      </main>
      <Footer/>
    </Router>
      </Suspense>
  );
}

export default App;
