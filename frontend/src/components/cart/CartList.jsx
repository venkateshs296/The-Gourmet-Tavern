import React, { useState } from "react";
import { Card, Table, Button, Modal, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Cart_Items } from "../../helpers_section/helperString";
import { deleteFromCart, updateCart } from "../../store/actions/cartActions";
import { addOrders } from "../../store/actions/orderActions";
import CartQuantity from "./CartQuantity";
import { useHistory } from "react-router";

const CartList = (props) => {
  const { item } = props;
  const { bill } = props;

  const token = localStorage.getItem("token");

  const dispatch = useDispatch();
  const history = useHistory();

  const [showQuantity, setShowQuantity] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dine, setDine] = useState(true);

  // const handleRemoveItem = (item_to_remove) => {
  //   const product = {
  //     id: item_to_remove.productID,
  //   }
  //   dispatch(deleteFromCart(product,token))
  //   setShowQuantity(false)
  //   setShowRemove(false)
  //   setShowModal(false)

  // };
  const handleClick = (e) => {
    setShowQuantity(!showQuantity);
  };

  const openOrderType = () => {
    setShowModal(true);
  };

  const handleSubmit = () => {
    const order_type = {
      orderType: !dine ? Cart_Items.DELIVERY : Cart_Items.DINE_IN,
    };
    console.log(order_type,dine);
    dispatch(addOrders(order_type, token, history));
    setShowModal(false);
    history.push("/myCart");
  };

  const handleAdd = (quantity_modified, item) => {
    item.quantity = quantity_modified;
    const product = {
      id: item.productID,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    };
    dispatch(updateCart(product, token));
    handleClick();
  };
  const handleRemoveItem = (item_to_remove) => {
    const product = {
      id: item_to_remove.productID,
    };
    dispatch(deleteFromCart(product, token));
    setShowQuantity(false);
    setShowRemove(false);
    setShowModal(false);
  };
  const handleRadio = () => {
    setDine(!dine);
    console.log(dine);
  };
  const changeButton = (type) => {
    if (!(showQuantity || showRemove)) {
      if (type === "Quantity") {
        setShowQuantity(true);
      } else {
        setShowRemove(true);
      }
    } else {
      setShowQuantity(!showQuantity);
      setShowRemove(!showRemove);
    }
  };

  return (
    <>
      <Card className="cart-align">
        <Card.Title variant="top">
          <h1>{Cart_Items.TITLE}</h1>
        </Card.Title>
        <Card.Body>
          <Table borderless={true}>
            <thead>
              <tr>
                <th>
                  <h4>{Cart_Items.NAME}</h4>
                </th>
                <th>
                  <h4>{Cart_Items.PRICE}</h4>
                </th>
                <th>
                  <h4>{Cart_Items.QUANTITIY}</h4>
                </th>
                {
                  <th>
                    <h4>
                      {(showQuantity || showRemove) && Cart_Items.EDIT_COLUMN}
                    </h4>
                  </th>
                }
              </tr>
            </thead>
            <tbody>
              {item.map((item_detail, idx) => {
                return (
                  <tr>
                    <td>{item_detail.name}</td>
                    <td>
                      {"$"}
                      {item_detail.price}
                    </td>
                    <td>{item_detail.quantity}</td>
                    <td>
                      {showQuantity && (
                        <CartQuantity
                          items={item_detail}
                          close={() => handleClick()}
                          add={(quantity) => handleAdd(quantity, item_detail)}
                        />
                      )}
                      {showRemove && (
                        <Button onClick={() => handleRemoveItem(item_detail)}>
                          {Cart_Items.REMOVE}
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      {
        <Modal
          centered={true}
          show={showModal}
          onHide={() => setShowModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>{Cart_Items.ORDER_TYPE_HEADING}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Check
              // disabled
              defaultChecked={true}
              onChange={() => handleRadio()}
              value={dine}
              type={"radio"}
              label={Cart_Items.DINE_IN}
              name="group1"
              id={Cart_Items.DINE_IN}
            />
            <Form.Check
              onChange={() => handleRadio()}
              // disabled
              value={!dine}
              type={"radio"}
              name="group1"
              label={Cart_Items.DELIVERY}
              id={Cart_Items.DELIVERY}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => handleSubmit()}>
              {Cart_Items.PLACE_ORDER}
            </Button>
          </Modal.Footer>
        </Modal>
      }
      <div className="cart_button_align">
        <h2>
          {Cart_Items.TOTAL_PRICE}
          {bill}
        </h2>
      </div>
      <div className="cart_button_align">
        {!showQuantity && (
          <Button onClick={() => changeButton(Cart_Items.QUANTITIY_STRING)}>
            {Cart_Items.UPDATE_QUANTITY}
          </Button>
        )}
        {!showRemove && (
          <Button onClick={() => changeButton(Cart_Items.REMOVE)}>
            {Cart_Items.REMOVE_ITEMS}
          </Button>
        )}
        <Button onClick={() => openOrderType()}>{Cart_Items.ORDER_TYPE}</Button>
      </div>
    </>
  );
};

export default CartList;
