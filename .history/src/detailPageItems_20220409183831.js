import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import styled from "styled-components";
import "./Detail.scss";
import { CSSTransition } from "react-transition-group";
import { Nav } from "react-bootstrap";
import { connect } from "react-redux";

let 박스 = styled.div`
  padding-top: 30px;
`;
let 제목 = styled.h4`
  font-size: 25px;
  color: ${(props) => props.color};
`;

const recentlyViewedProduct = new Set([]);
const

function DetailPageItem(props) {
  let { id } = useParams();
  let history = useHistory();
  let newProduct = props.product.find(function (e) {
    return e.id == id;
  });
  let [alert, setAlert] = useState(true);
  let [inputVal, setInputVal] = useState("");
  let [tab, setTab] = useState("");
  let [animation, setAnimation] = useState(false);

  recentlyViewedProduct.add(newProduct.id);
  console.log(recentlyViewedProduct);
  localStorage.setItem("data", JSON.stringify(recentlyViewedProduct));


  useEffect(() => {
    let timer = setTimeout(() => {
      setAlert(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
      setAlert(true);
    };
  }, []);

  return (
    <div className="container">
      <박스>
        <제목 color="black">Detail</제목>
      </박스>
      {inputVal}
      <input
        onChange={(e) => {
          setInputVal(e.target.value);
        }}
      />
      {alert ? <div className="myAlert">almost out of stock</div> : null}
      <div className="row">
        <div className="col-md-6">
          <img
            src={`https://codingapple1.github.io/shop/shoes${
              newProduct.id + 1
            }.jpg`}
            width="100%"
          />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{newProduct.title}</h4>
          <p>{newProduct.content}</p>
          <p>{newProduct.price}</p>
          <StackInfo stock={props.stock[newProduct.id]} />
          <button
            className="btn btn-danger"
            onClick={() => {
              let stock = props.stock.map((e) => {
                return e - 1;
              });
              props.setStock(stock);
              props.dispatch({
                type: "order",
                payload: {
                  id: newProduct.id,
                  name: newProduct.title,
                  quantity: 1,
                  price: newProduct.price,
                },
              });
            }}
          >
            주문하기
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              history.goBack();
            }}
          >
            뒤로가기
          </button>
        </div>
      </div>

      <Tab setTab={setTab} setAnimation={setAnimation} />
      <CSSTransition in={animation} classNames="tabAnimation" timeout={500}>
        <TabContent
          tab={tab}
          setAnimation={setAnimation}
          animation={animation}
        />
      </CSSTransition>
    </div>
  );
}

function Tab(props) {
  return (
    <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
      <Nav.Item>
        <Nav.Link
          eventKey="link-0"
          to="detail/1"
          onClick={() => {
            props.setTab(0);
            props.setAnimation(false);
          }}
        >
          1
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          eventKey="link-1"
          to="detail/2"
          onClick={() => {
            props.setTab(1);
            props.setAnimation(false);
          }}
        >
          2
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          eventKey="link-2"
          to="detail/3"
          onClick={() => {
            props.setTab(2);
            props.setAnimation(false);
          }}
        >
          3
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

function TabContent(props) {
  useEffect(() => {
    props.setAnimation(true);
  });
  if (props.tab === 0) {
    return <div>0번째 내용입니다</div>;
  } else if (props.tab === 1) {
    return <div>1번째 내용입니다</div>;
  } else if (props.tab === 2) {
    return <div>2번째 내용입니다</div>;
  }
}

function StackInfo(props) {
  return <p>재고 : {props.stock}</p>;
}

function 함수명(state) {
  return { state: state.reducer };
}

export default connect(함수명)(DetailPageItem);
