import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components";
import "./Detail.scss";
import { CSSTransition } from "react-transition-group";
import { Nav } from "react-bootstrap";
import { connect } from "react-redux";
import { Result, Button, Modal } from "antd";
import "antd/dist/antd.css";

let 박스 = styled.div`
  padding-top: 30px;
`;
let 제목 = styled.h4`
  font-size: 25px;
  color: ${(props) => props.color};
`;

const { Modal } = antd;
const { CheckOutlined } = icons;
const { confirm } = Modal;

const recentlyViewedProduct = new Set([]);

function DetailPageItem(props) {
  let { id } = useParams();
  let newProduct = props.product.find(function (e) {
    return e.id == id;
  });
  let [tab, setTab] = useState(0);
  let [animation, setAnimation] = useState(false);

  recentlyViewedProduct.add(newProduct.id);
  localStorage.setItem(
    "data",
    JSON.stringify(Array.from(recentlyViewedProduct))
  );

  return (
    <div className="container">
      <박스>
        <제목 color="black">Detail</제목>
      </박스>
      <ProductInfo newProduct={newProduct} dispatch={props.dispatch} />
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

function ProductInfo(props) {
  return (
    <div className="row">
      <div className="col-md-6">
        <img
          src={`https://codingapple1.github.io/shop/shoes${
            props.newProduct.id + 1
          }.jpg`}
          width="100%"
        />
      </div>
      <div className="col-md-6 mt-4">
        <h4 className="pt-5">{props.newProduct.title}</h4>
        <p>{props.newProduct.content}</p>
        <p>{props.newProduct.price}</p>
        <button
          className="btn btn-danger"
          onClick={() => {
            detailModal();
            props.dispatch({
              type: "order",
              payload: {
                id: props.newProduct.id,
                name: props.newProduct.title,
                quantity: 1,
                price: props.newProduct.price,
              },
            });
          }}
        >
          장바구니에 담기
        </button>
      </div>
    </div>
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
      <div className="detail_shipping">
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
          <li>
            상품 불량 또는 오배송으로 인한 교환/반품 시 배송비는 판매자
            부담입니다
          </li>
          <li>고객님의 변심으로 인한 교환/반품 시 배송비는 고객 부담입니다</li>
          <li>
            제주도 및 기타 도서 산간지역에서 발생하는 추가 배송비는 고객
            부담입니다
          </li>
        </ul>
      </div>
    );
  } else if (props.tab === 2) {
    return (
      <div className="detail_AS">
        <h1>세탁 방법 및 취급 시 주의사항</h1>
        <ul>
          <li>
            신발의 에어백은 신발 본체와 일체형으로 제작, 교체나 때움 등의 수리가
            불가능하여 외력에 의해 에어가 손상된 경우는 보상 처리되지 않습니다.
          </li>
          <li>신발에 기름이 접촉하지 않도록 신경 써주시기 바랍니다.</li>
          <li>
            천연 가죽이나 천은 물기 및 마찰에 의해 색깔이 변할 가능성이
            있습니다.
          </li>
          <li>젖은 노면 혹은 미끄러지기 쉬운 장소에서는 주의 바랍니다.</li>
          <li>염분(바닷물)이 있는 곳에서 착용하시면 제품이 쉽게 부식됩니다.</li>
          <li>고온 다습한 장소에서 장시간 방치를 삼가 바랍니다.</li>
          <li>
            천연 가죽 신발은 신발 고정대나 신문지 등으로 형태를 고정하여 보관할
            것을 권합니다.
          </li>
          <li>불이나 난방기구 근처에는 보관하지 말아주시기 바랍니다.</li>
          <li>
            신발 뒤꿈치를 꺾어 신지 마시고, 신발끈은 꽉 조여 주시기 바랍니다.
          </li>
          <li>
            성인, 청소년이 아동용 제품을 착용하면 부상을 입을 수 있습니다.
          </li>
          <li>
            착화 전 발톱이 길거나 짧으면 운동 및 보행 시 부상의 위험이 있으니
            주의하시기 바랍니다.
          </li>
          <li>
            세탁이 가능한 제품에 한하여 단독 세탁하시고, 세탁 가능 여부는 상품
            택을 참조하십시오.
          </li>
          <li>세탁 시 연성세제 및 상온수 (15~25도)를 사용하시기 바랍니다.</li>
          <li>세척 시 세탁기에 절대 넣지 마시기 바랍니다.</li>
        </ul>
      </div>
    );
  }
}

function detailModal() {
  confirm({
    title: "장바구니로 이동하시겠습니까?",
    icon: <CheckOutlined />,
    content: "",
    onOk() {
      console.log("OK");
    },
    onCancel() {
      console.log("Cancel");
    },
  });
}

function 함수명(state) {
  return { state: state.reducer };
}

export default connect(함수명)(DetailPageItem);
