import React, { useEffect, useState } from "react";
import { cart_list_create } from "../../helpers_section/helperFunctions";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../../store/actions/cartActions";
import { Alert } from "react-bootstrap";

const MyCartPage = () => {
  const error = useSelector((state) => state.error);
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();
  const cart_items_state = useSelector((state) =>
    state.cart.length !== 0 ? state.cart.items : []
  );
  const cart_bill = useSelector((state) =>
    state.cart.length !== 0 ? state.cart.totalBill : []
  );
  const [msg, setMsg] = useState(null);
  const [msgtype, setMsgType] = useState(null);
  let cartList = cart_items_state;
  const loop_items = (items) => {
    const cart_items = cart_list_create(items, cart_bill);
    return cart_items;
  };

  useEffect(() => {
    dispatch(getCartItems(token));
  }, [token]);

  return (
    <>
      {msgtype !== null && (
        <Alert color="danger" variant={"danger"}>
          {msg}
        </Alert>
      )}
      {loop_items(cartList)}
    </>
  );
};

export default MyCartPage;
