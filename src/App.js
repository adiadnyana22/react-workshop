import React, { Component } from 'react';
import Navbar from './Navbar';
import Product from './Product';
import ShoppingChart from './ShoppingChart';

class App extends Component {
  state = {
    cartItems: [],
    products: []
  };

  handleAddItemToCart = product => {
    let cartItems = this.state.cartItems;

    const alreadyExists = this.state.cartItems.some(
      cartItems => cartItems.product.id === product.id
    );

    if (alreadyExists){
      cartItems = cartItems.map(cartItems =>{
        if(cartItems.product.id === product.id){
          cartItems.quantity = cartItems.quantity + 1;
        }
        return cartItems;
      });
    }
    else{
      cartItems.push({
        product: product,
        quantity: 1
      })
    }

    this.setState({ cartItems: cartItems });
  };

  handleRemoveItemFromChart = product => {
    const cartItemsState = this.state.cartItems;

    const selectedItemIndex = cartItemsState.findIndex(cartItem => {
      return cartItem.product.id === product.id;
    });

    const selectedItem = cartItemsState[selectedItemIndex];

    if (selectedItem.quantity > 1) {
      selectedItem.quantity--;
    }
    else {
      cartItemsState.splice(selectedItemIndex, 1);
    }

    this.setState({ cartItems: cartItemsState});
  };

  componentDidMount(){
    fetch("https://product-list.glitch.me/")
      .then(response => response.json())
      .then(products => {
        this.setState({ products: products });
      });
  }
  render() {
    return (
        <div className="container">
        <Navbar />
          <div className="columns">
            <div className="column is-two-thirds">
              <div>
                <h3 className="title">Our Products</h3>
                <div className="columns">
                {this.state.products.map(product => (
                  <Product
                    key={product.id}
                    product={product}
                    onAddItemsToChart={this.handleAddItemToCart}
                  />
                ))}
                </div>
              </div>
            </div>
            <ShoppingChart
              cartItems={this.state.cartItems} 
              onRemoveItemFromChart={this.handleRemoveItemFromChart}
            />
          </div>
        </div>
    );
  }
}

export default App;
