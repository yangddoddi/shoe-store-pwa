import React, { useState, useContext, lazy, Suspense } from "react";
import "./App.css";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import axios from "axios";

import {
  Navbar,
  Container,
  Offcanvas,
  Nav,
  Form,
  Button,
  NavDropdown,
  FormControl,
} from "react-bootstrap";
import CartPage from "./Cart.js";
import productData from "./data.js";
// import DetailPageItem from "./detailPageItems.js";
const Detail = lazy(() => import("./detailPageItems.js"));

const stockContext = React.createContext();

const recentlyViewedProduct = localStorage.getItem("data");
const recentlyViewedArr = JSON.parse(recentlyViewedProduct);

function App() {
  let history = useHistory();

  let [product, setProduct] = useState(productData);
  let [loading, setLoading] = useState(false);
  let [stock, setStock] = useState([3, 7, 2]);

  function loadItems() {
    setLoading(true);
    axios
      .get("https://codingapple1.github.io/shop/data2.json")
      .then((json) => {
        setProduct([...product, ...json.data]);
        setLoading(false);
      })
      .catch(() => {
        alert("서버 요청에 실패했습니다.");
      });
  }

  return (
    <div className="App">
      <NewNavbar />
      {recentlyViewedArr ? <Sidebar history={history} /> : null}
      <Switch>
        <Route exact path="/">
          <Jumbotron />
          <stockContext.Provider value={stock}>
            <ShopItemList product={product} history={history} />
          </stockContext.Provider>
          {loading ? <LoadingSpinner /> : null}
          <button className="btn btn-primary m-5" onClick={loadItems}>
            더보기
          </button>
        </Route>
        <Route path="/detail/:id">
          <Suspense fallback={<div>로딩중</div>}>
            <Detail product={product} stock={stock} setStock={setStock} />
          </Suspense>
        </Route>
        <Route path="/cart">
          <CartPage product={product} />
        </Route>
      </Switch>
    </div>
  );
}

function NewNavbar() {
  return (
    <Navbar bg="white" expand={false}>
      <Container fluid>
        <Navbar.Brand href="#">Shoe Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              Shoe Shop
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link as={Link} className="link" to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} className="link" to="../cart">
                Cart
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

function Jumbotron() {
  return (
    <div className="jumbotron">
      <h1 className="display-4">premium shoe market!</h1>
      <p className="lead">All the shoes you want are on our page</p>
      <hr className="my-4" />
      <p>
        Reasonable price <br />
        The highest quality
      </p>
      <p className="lead">
        <a className="btn btn-primary btn-lg" href="#" role="button">
          Buy now
        </a>
      </p>
    </div>
  );
}

function ShopItemList(props) {
  return (
    <div className="container">
      <div className="row shopItemList">
        {props.product.map((e, i) => {
          return (
            <ShopItems
              product={e}
              index={i}
              key={e.id}
              history={props.history}
            />
          );
        })}
      </div>
    </div>
  );
}

function ShopItems(props) {
  let stock = useContext(stockContext);

  return (
    <div
      className="col-md-4 shopItem"
      onClick={() => {
        props.history.push(`/detail/${props.product.id}`);
      }}
    >
      <img
        src={`https://codingapple1.github.io/shop/shoes${
          props.product.id + 1
        }.jpg`}
      />
      <h5>{props.product.title}</h5>
      <p>{props.product.content}</p>
      <p>{props.product.price}</p>
      <p>stock : {stock[props.product.id]}</p>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="spinner-border text-primary loading" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  );
}

const dragStartHandler = (e) => {
  console.log(e.target);
};

const dragOverHandler = (e) => {
  console.log(e);
};

const dragEndHandler = (e) => {
  console.log(e);
};

function Sidebar(props) {
  return (
    <aside
      className="sidebar"
      draggable
      onDragStart={dragStartHandler}
      ondrag={dragOverHandler}
      onDragEnd={dragEndHandler}
    >
      <p>최근 본 상품</p>
      {recentlyViewedArr.map((num) => {
        return (
          <img
            src={`https://codingapple1.github.io/shop/shoes${num + 1}.jpg`}
            onClick={() => {
              props.history.push(`/detail/${num}`);
            }}
          />
        );
      })}
    </aside>
  );
}

export default App;
