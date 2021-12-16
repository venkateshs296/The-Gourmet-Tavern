import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { order_list_create } from "../../helpers_section/helperFunctions";
import { getOrders } from "../../store/actions/orderActions";

const MyOrdersPage = () => {

  const error = useSelector(state => state.error)
  const token = localStorage.getItem('token');

  const dispatch = useDispatch();
  const order_items = useSelector((state) => state.order.length!==0?state.order:[])
  let orderList = order_items;

  const [msg, setMsg] = useState(null);
  const [msgtype, setMsgType] = useState(null);

  const loop_items = (items) => {
    const cart_items = order_list_create(items);
    return cart_items;
  };

  useEffect(() => {
    if(error.status !== null){
      if(error.id === 'GET_ORDER_FAILURE') {
        setMsg(error.msg.msg);
        setMsgType(error.msg.type)
      }
      else {
        dispatch({
          type : 'CLEAR_ERROR'
      });
      }
    }
    else {
      dispatch({
        type : 'CLEAR_ERROR'
    });
    dispatch(getOrders(token))

    }
    dispatch(getOrders(token))
  },[dispatch,token])

  return <>{msgtype !== null && (
    <Alert color="danger" variant={"danger"}>
      {msg}
    </Alert>
  )}{loop_items(orderList)}</>;
};

export default MyOrdersPage;
