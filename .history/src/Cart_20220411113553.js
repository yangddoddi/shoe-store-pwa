import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

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

      {props.setAlert && (
        <div className="myAlert">
          <p>almost out of stock</p>
          <button
            onClick={() => {
              props.dispatch({ type: "exitAlert" });
            }}
          >
            닫기
          </button>{" "}
        </div>
      )}
    </>
  );
}

// function 함수명(state) {
//   return {
//     state: state.reducer,
//     setAlert: state.reducer2,
//   };
// }

// export default connect(함수명)(Cart);
export default Cart;
