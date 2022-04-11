import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import styled from "styled-components";
import "./Detail.scss";
import { CSSTransition } from "react-transition-group";
import { Nav } from "react-bootstrap";
import { connect } from "react-redux";
import { Result, Button } from "antd";

let 박스 = styled.div`
  padding-top: 30px;
`;
let 제목 = styled.h4`
  font-size: 25px;
  color: ${(props) => props.color};
`;

const recentlyViewedProduct = new Set([]);

function DetailPageItem(props) {
  let { id } = useParams();
  let history = useHistory();
  let newProduct = props.product.find(function (e) {
    return e.id == id;
  });
  let [alert, setAlert] = useState(true);
  let [inputVal, setInputVal] = useState("");
  let [tab, setTab] = useState(0);
  let [animation, setAnimation] = useState(false);

  recentlyViewedProduct.add(newProduct.id);
  console.log(recentlyViewedProduct);
  localStorage.setItem(
    "data",
    JSON.stringify(Array.from(recentlyViewedProduct))
  );

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
    <Nav
      className="mt-5"
      variant="tabs"
      defaultActiveKey="link-0"
      className="tabItem"
    >
      <Nav.Item>
        <Nav.Link
          eventKey="link-0"
          to="detail/1"
          onClick={() => {
            props.setTab(0);
            props.setAnimation(false);
          }}
        >
          상세정보
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
          배송 및 교환반품
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
          세탁 및 손질방법
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
    return (
      <Result
        title="페이지를 불러오지 못했습니다."
        extra={
          <Button type="primary" key="console" href="/">
            메인 페이지
          </Button>
        }
      />
    );
  } else if (props.tab === 1) {
    return (
      <div>
        <h1>배송 안내</h1>
        <p>1. 구매 금액 관계 없이 전상품 무료 배송입니다.</p>
        <p>
          2. 결제일 기준 공휴일 및 주말 제외 5 영업일 이내에 제품이 발송됩니다.
        </p>
        <p>3. 배송은 우체국 택배를 통해 진행됩니다.</p>

        <h1>교환 및 반품 유의 사항</h1>
        <p>
          1. 상품 수령일로부터 7일 이내에 교환/반품 신청을 해주시기 바랍니다.
        </p>
        <p>2. 다음과 같은 경우 교환 및 반품 처리가 불가합니다.</p>
        <ul className="detail_grey">
          <li>상품을 이미 사용한 경우</li>
          <li>상품 수령일로부터 7일이 경과한 경우</li>
          <li>
            상품과 상품 액세서리(신발 박스, 가격 택, 라벨 등)를 분실 혹은 훼손한
            경우
          </li>
          <li>
            이벤트 등으로 제공된 사은품을 사용하였거나 분실 또는 훼손한 경우
          </li>
          <li>
            기타 '전자상거래 등에서의 소비자 보호에 관한 법률'이 정하는 소비자
            청약철회 제한에 해당하는 경우
          </li>
        </ul>

        <p>3. 교환 및 반품 배송비 정책</p>
        <ul className="detail_grey">
          <li>택배비 입금 계좌 : 대구은행/503213222192 양또띠</li>
          <li>상품 불량 또는 오배송으로 인한 교환/반품 시 배송비는 판매자 부담입니다</li>
          <li>고객님의 변심으로 인한 교환/반품 시 배송비는 고객 부담입니다</li>
          <li>제주도 및 기타 도서 산간지역에서 발생하는 추가 배송비는 고객 부담입니다</li>
      </div>
    );
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
