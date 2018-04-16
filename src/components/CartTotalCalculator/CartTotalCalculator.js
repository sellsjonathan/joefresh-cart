import React from 'react';
import './CartTotalCalculator.css';

class CartTotalCalculator extends React.Component {
  convertToCurrency(cost) {
    return `$${cost.toFixed(2)}`;
  }

  render() {
    return (
      <div className="cartTotalCalculator">
        <h2>Cart-at-a-glance</h2>
        {this.props.orderTotalCount === 0 ? (
          <p className="f3 greyColor">
            There are currently no items in your cart!
          </p>
        ) : (
          <div>
            <p className="flex">
              <span className="align-flex-start">Items in cart:</span>{' '}
              <span className="align-flex-end">
                {this.props.orderTotalCount}
              </span>
            </p>
            <p className="flex">
              <span className="align-flex-start">Subtotal:</span>{' '}
              <span className="align-flex-end">
                {this.convertToCurrency(this.props.orderTotalPrice)}
              </span>
            </p>
            <p className="flex">
              <span className="align-flex-start">GST (5%):</span>{' '}
              <span className="align-flex-end">
                {this.convertToCurrency(this.props.orderTotalPrice * 0.05)}
              </span>
            </p>

            <span className="total">
              <span className="align-flex-start">Order Total:</span>{' '}
              <span className="align-flex-end">
                {this.convertToCurrency(this.props.orderTotalPrice * 1.05)}
              </span>
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default CartTotalCalculator;
