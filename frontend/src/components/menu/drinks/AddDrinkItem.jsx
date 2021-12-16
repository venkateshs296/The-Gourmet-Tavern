import React, { useEffect, useState } from "react";
import { Alert, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getBase64 } from "../../../helpers_section/helperFunctions";
import { Add_Edit_Drink_Page } from "../../../helpers_section/helperString";
import { setError } from "../../../store/actions/commonActions";

const AddDrinkItem = (props) => {
  const error = useSelector((state) => state.error);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [msgtype, setMsgType] = useState(null);
  const [msg, setMsg] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isDeleted, setDeleted] = useState(false);
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [imageData, setImageData] = useState("");

  const dispatch = useDispatch();
  const handleFileInput = (e) => {
    getBase64(e.target.files[0]).then((data) => {
      setImageData(data);
    });
  };

  const form_validation = () => {
    const drink_item = {
      productName: name,
      productType: "drink",
      description: description,
      price: price,
      isDeleted: isDeleted,
      category: category,
      level: level,
      quantity: stockQuantity,
      imageData: imageData,
    };

    if (
      name.trim().length === 0 ||
      description.trim().length === 0 ||
      price.trim().length === 0 ||
      category.trim().length === 0 ||
      level.trim().length === 0 ||
      stockQuantity.trim().length === 0 ||
      imageData.trim().length === 0
    ) {
      setError(
        dispatch,
        { msg: "All Fields are Required", type: "All" },
        400,
        "ADD_FORM_FAILURE"
      );
    }

    //check if phone number meets all requirements
    else if (price.trim() < 0) {
      setError(
        dispatch,
        { msg: "Please enter a Positive Price", type: "Price" },
        400,
        "ADD_FORM_FAILURE"
      );
    } else if (description.length > 200) {
      setError(
        dispatch,
        {
          msg: `Description Length is too High. Current length: ${description.length}. Character Limit: 200`,
          type: "Address",
        },
        400,
        "ADD_FORM_FAILURE"
      );
    }

    //check if password meets all requirements
    else if (stockQuantity.trim() < 0) {
      const message = "Please Enter a Positive Stock Quantity";
      setError(
        dispatch,
        { msg: message, type: "Stock" },
        400,
        "ADD_FORM_FAILURE"
      );
    } else if (level.trim() < 0) {
      setError(
        dispatch,
        {
          msg: "Please Enter a Positive Level. Minimum value is 0",
          type: "Level",
        },
        400,
        "ADD_FORM_FAILURE"
      );
    }

    //if all fields are valid
    else {
      props.add(drink_item);
    }
  };

  const handleDrinkAdd = () => {
    form_validation();
  };

  useEffect(() => {
    if (error.id === "ADD_FORM_FAILURE") {
      setMsg(error.msg.msg);
      setMsgType(error.msg.type);
    }
    if (error.id === "ADD_FAILURE") {
      setMsg(error.msg);
      setMsgType("API");
    }
  }, [error, isAuthenticated]);

  return (
    <>
      {msgtype !== null && (
        <Alert color="danger" variant={"danger"}>
          {msg}
        </Alert>
      )}
      <Form onSubmit={() => handleDrinkAdd()}>
        <Form.Group className="mb-3">
          <Form.Label>{Add_Edit_Drink_Page.NAME}</Form.Label>
          <Form.Control
            type="name"
            placeholder={Add_Edit_Drink_Page.PLACEHOLDER_DRINK_NAME}
            value={name}
            onChange={(e) => setName(e.target.value)}
            isInvalid={
              msgtype === "All" ? name.length === 0 : msgtype === "Name"
            }
          />
          <Form.Control.Feedback type="invalid">{msg}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>{Add_Edit_Drink_Page.DRINK_IMAGE}</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => handleFileInput(e)}
            isInvalid={
              msgtype === "All"
                ? imageData.length === 0
                : msgtype === "FileInput"
            }
          />
          <Form.Control.Feedback type="invalid">{msg}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>{Add_Edit_Drink_Page.DESCRIPTION}</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder={Add_Edit_Drink_Page.PLACEHOLDER_DRINK_DESCRIPTION}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            isInvalid={
              msgtype === "All"
                ? description.length === 0
                : msgtype === "Description"
            }
          />
          <Form.Control.Feedback type="invalid">{msg}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>{Add_Edit_Drink_Page.PRICE}</Form.Label>
          <Form.Control
            type="number"
            placeholder={Add_Edit_Drink_Page.PLACEHOLDER_DRINK_PRICE}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            isInvalid={
              msgtype === "All" ? price.length === 0 : msgtype === "Price"
            }
          />
          <Form.Control.Feedback type="invalid">{msg}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>{Add_Edit_Drink_Page.CATEGORY}</Form.Label>
          <Form.Control
            type="text"
            placeholder={Add_Edit_Drink_Page.PLACEHOLDER_DRINK_CATEGORY}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            isInvalid={
              msgtype === "All" ? category.length === 0 : msgtype === "Category"
            }
          />
          <Form.Control.Feedback type="invalid">{msg}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>{Add_Edit_Drink_Page.LEVEL}</Form.Label>
          <Form.Control
            type="text"
            placeholder={
              Add_Edit_Drink_Page.PLACEHOLDER_DRINK_ALCOHOL_PERCENTAGE
            }
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            isInvalid={
              msgtype === "All" ? level.length === 0 : msgtype === "Level"
            }
          />
          <Form.Control.Feedback type="invalid">{msg}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>{Add_Edit_Drink_Page.STOCK_QUANTITY}</Form.Label>
          <Form.Control
            type="number"
            placeholder={Add_Edit_Drink_Page.PLACEHOLDER_DRINK_STOCK_QUANTITY}
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
            isInvalid={
              msgtype === "All"
                ? stockQuantity.length === 0
                : msgtype === "Stock"
            }
          />
          <Form.Control.Feedback type="invalid">{msg}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <div key={`default-checkbox`} className="mb-3">
            <Form.Check
              type="checkbox"
              id={`default-checkbox`}
              label={Add_Edit_Drink_Page.PLACEHOLDER_DRINK_DELETED}
              value={isDeleted}
              onChange={(e) => setDeleted(!isDeleted)}
            />
          </div>
        </Form.Group>
        <Button variant="secondary" onClick={() => props.close()}>
          {Add_Edit_Drink_Page.CANCEL}
        </Button>
        <Button variant="primary" onClick={() => handleDrinkAdd()}>
          {Add_Edit_Drink_Page.SUBMIT}
        </Button>
      </Form>
    </>
  );
};

export default AddDrinkItem;
