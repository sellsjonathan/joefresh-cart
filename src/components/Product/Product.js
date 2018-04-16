import React from 'react';
import './Product.css';

class Product extends React.Component {
  render() {
    return (
      <div className="prodContainer">
        <img
          src={this.props.prodImg}
          className="prodImg"
          alt={`${this.props.prodName} \u2013 ${this.props.prodColor}`}
        />
        <h4>{this.props.prodName}</h4>
        <div className="prodPrice">{`$${this.props.prodPrice}`}</div>
        <div className="prodColor">
          Product color: <span className="bold">{this.props.prodColor}</span>
        </div>
        <div className="prodQuantity">
          Quantity available:{' '}
          <span className="bold">{this.props.prodQuantity}</span>
        </div>
      </div>
    );
  }
}

export default Product;
