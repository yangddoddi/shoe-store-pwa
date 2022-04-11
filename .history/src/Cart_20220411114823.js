import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Cart() {
  let state = useSelector((state) => state);
  let dispatch = useDispatch();

  return (
    <CartTable
      product={state.reducer}
      setAlert={state.reducer2}
      dispatch={dispatch}
    />
  );
}

function CartTable(props) {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>금액</th>
          </tr>
        </thead>
        <tbody>
          {props.product.map((e, i) => {
            return (
              <tr>
                <td>{e.id}</td>
                <td>{e.name}</td>
                <td>{e.quantity}</td>
                <td>{e.price * e.quantity}$</td>
                <td>
                  <button
                    onClick={() => {
                      props.dispatch({
                        type: "increase",
                        payload: { id: e.id },
                      });
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      props.dispatch({
                        type: "decrease",
                        payload: { id: e.id },
                      });
                    }}
                  >
                    -
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button className="btn btn-primary m-5" href="/">
        메인 페이지
      </Button>
    </>
  );
}

export default Cart;
