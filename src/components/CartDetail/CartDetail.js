import React from 'react';
import './CartDetail.css';

class CartDetail extends React.Component {
  componentDidUpdate() {
    this.combineLikeProducts();
  }

  combineLikeProducts() {
    const parsedArray = this.props.cartProducts
      .map(product => ({
        ...product,
        localQuantity: 1
      }))
      .reduce((all, product) => {
        const doesHaveDuplicate = all.filter(
          item => item.productId === product.productId
        ).length;

        return Boolean(doesHaveDuplicate)
          ? all.map(
              item =>
                item.productId === product.productId
                  ? { ...item, localQuantity: (item.localQuantity += 1) }
                  : item
            )
          : [...all, product];
      }, []);
    return parsedArray;
  }

  render() {
    return (
      <div className="cartDetail">
        <h2>Your cart ({this.props.cartProducts.length} items)</h2>
        {this.props.cartProducts.length === 0 ? (
          <p>There are currently no items in your cart!</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Product name</th>
                <th />
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {this.combineLikeProducts().map(product => (
                <tr key={product.productId}>
                  <td>{product.productName} </td>
                  <td>
                    {' '}
                    <button
                      onClick={() =>
                        this.props.removeFromCart(product.productId)
                      }
                    >
                      Remove
                    </button>
                  </td>
                  <td>{product.localQuantity}</td>
                  <td>${product.productPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}
export default CartDetail;
