import React, { Component } from 'react';

import './reset.css';
import './App.css';

// my components
import Product from './components/Product/Product';
import Header from './components/Header/Header';
import CartTotalCalculator from './components/CartTotalCalculator/CartTotalCalculator';
import CartDetail from './components/CartDetail/CartDetail';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allProducts: [],
      currentProductSet: [],
      pagination: {
        currentPage: 1,
        productsPerPage: 6,
        totalPages: null,
        totalProducts: null
      },
      shoppingCartProducts: [],
      loadingData: true
    };
  }

  componentDidMount() {
    this.doApiCall();
  }

  doApiCall = async () => {
    try {
      const response = await fetch(
        'https://s3.amazonaws.com/joefresh-marketing-dev/developer-interview/full-list-bb.json'
      );
      const json = await response.json();
      this.setState({
        allProducts: json.results,
        pagination: {
          currentPage: 1,
          productsPerPage: 6,
          totalPages: Math.ceil(
            json.results.length / this.state.pagination.productsPerPage
          ),
          totalProducts: json.results.length
        }
      });
      this.calculatePagination();
      this.setState({ loadingData: false });
    } catch (err) {
      console.error(
        `There was a problem with your request. Error message: ${err}`
      );
      // handle error
    }
  };

  // cart functions

  addToCart(addId) {
    const addProduct = this.state.allProducts.filter(
      product => product.productId === addId
    );
    this.setState({
      shoppingCartProducts: this.state.shoppingCartProducts.concat(addProduct)
    });
  }

  removeFromCart = removeId => {
    const products = [...this.state.shoppingCartProducts];

    const lastIndex = products.reduce(
      (indexToDelete, currProduct, index) =>
        currProduct.productId === removeId
          ? (indexToDelete = index)
          : indexToDelete,
      0
    );

    this.setState({
      shoppingCartProducts: products.filter(
        (product, index) => index !== lastIndex
      )
    });
  };

  // paginate functions
  minPaginateId() {
    const { currentPage, productsPerPage } = this.state.pagination;
    return currentPage === 1 ? 0 : (currentPage - 1) * productsPerPage;
  }

  maxPaginateId() {
    const {
      currentPage,
      productsPerPage,
      totalProducts
    } = this.state.pagination;

    return currentPage * productsPerPage <= totalProducts
      ? currentPage * productsPerPage - 1
      : totalProducts;
  }

  goToPage(num) {
    this.setState(
      prevState => {
        return {
          pagination: {
            ...prevState.pagination,
            currentPage: num
          }
        };
      },
      () => this.calculatePagination()
    );
  }

  calculatePagination(num) {
    const renderItems = this.state.allProducts.filter(
      // Note: May not be performant with 1000s of records
      (product, index) =>
        index >= this.minPaginateId() && index <= this.maxPaginateId()
    );

    this.setState({ currentProductSet: renderItems });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="layoutContainer">
          <main>
            {this.state.loadingData ? (
              'Loading...'
            ) : (
              <div>
                <section>
                  <h2 className="uppercase popHeading">Product list</h2>
                  <ul className="prodList">
                    {this.state.currentProductSet.map(product => (
                      <li
                        key={product.productId}
                        onClick={() => this.addToCart(product.productId)}
                      >
                        <Product
                          key={product.productId}
                          prodImg={product.thumbnails.b2}
                          prodName={product.productName}
                          prodPrice={product.productPrice}
                          prodColor={product.productColor}
                          prodQuantity={product.quantity}
                        />
                      </li>
                    ))}
                  </ul>
                  <div className="paginationContainer">
                    <nav>
                      {Array(this.state.pagination.totalPages)
                        .fill(1)
                        .map((btn, i) => (
                          <button
                            className={
                              this.state.pagination.currentPage === i + 1
                                ? 'paginationBtn selected'
                                : 'paginationBtn'
                            }
                            onClick={() => this.goToPage(i + 1)}
                            key={i}
                          >
                            {i + 1}
                          </button>
                        ))}
                    </nav>
                    <p className="totalProducts  f3 bold">
                      Your search returned{' '}
                      <span className="brandColor1-color">
                        {' '}
                        {this.state.pagination.totalProducts}
                      </span>{' '}
                      products
                    </p>
                  </div>
                </section>
                <section>
                  <CartDetail
                    cartProducts={this.state.shoppingCartProducts}
                    removeFromCart={this.removeFromCart}
                  />
                </section>
              </div>
            )}
          </main>
          <aside>
            <CartTotalCalculator
              orderTotalPrice={this.state.shoppingCartProducts.reduce(
                (total, prod) => total + prod.productPrice,
                0
              )}
              orderTotalCount={this.state.shoppingCartProducts.length}
            />
          </aside>
        </div>
      </div>
    );
  }
}

export default App;
