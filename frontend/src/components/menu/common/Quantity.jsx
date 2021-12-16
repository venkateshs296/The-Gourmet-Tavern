import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { Cart_Quantity } from "../../../helpers_section/helperString";

const Quantity = (props) => {
  const { items } = props;

  const [quantity, setQuantity] = useState(0);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setQuantity(items.stockQuantity);
  };
  const handleQuantity = (value) => {
    if (items.stockQuantity - value < 0) {
      setShow(true);
    }
    setQuantity(value);
  };
  const handleChange = (change) => {
    let temp = quantity;
    if (change === Cart_Quantity.ADD) {
      temp++;
      if (items.stockQuantity - temp <= 0) {
        setShow(true);
      }
    } else {
      temp--;
      if (temp < 0) {
        temp = 0;
      }
    }
    setQuantity(temp);
  };

  return (
    <>
      <div className="search_reset">
        <Modal centered={true} show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{Cart_Quantity.QUANTITIY_ERROR_HEADING}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              <Alert color="danger" variant={"danger"}>
                {Cart_Quantity.MAX_QUANTITIY_ERROR_MSG}
              </Alert>
            }
          </Modal.Body>
        </Modal>
        <Button
          onClick={() => handleChange(Cart_Quantity.SUBTRACT)}
          disabled={quantity === 0}
          variant="danger"
        >
          {Cart_Quantity.SUBTRACT}
        </Button>
        <Form.Control
          type="number"
          className="quantity"
          value={quantity}
          defaultValue={quantity}
          onChange={(e) => handleQuantity(e.target.value)}
        />
        <Button
          onClick={() => handleChange(Cart_Quantity.ADD)}
          variant="success"
        >
          {Cart_Quantity.ADD}
        </Button>
        <Button
          onClick={() => props.add(quantity)}
          className="quantity"
          disabled={quantity === 0}
        >
          {Cart_Quantity.ADD_STRING}
        </Button>
        <Button onClick={() => props.close()} className="quantity">
          {Cart_Quantity.CLOSE}
        </Button>
      </div>
    </>
  );
};

export default Quantity;
