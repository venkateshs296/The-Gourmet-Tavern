import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Add_Edit_Food_Page } from "../../../helpers_section/helperString";
import { getBase64 } from "../../../helpers_section/helperFunctions";
import { setError } from "../../../store/actions/commonActions";
import { useDispatch } from "react-redux";

const EditFoodItem = (props) => {
  const { item } = props;

  const dispatch = useDispatch();

  const [msgtype, setMsgType] = useState(null);
  const [msg, setMsg] = useState(null);
  const [name, setName] = useState(item.productName);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price);
  const [isDeleted, setDeleted] = useState(item.isDeleted);
  const [category, setCategory] = useState(item.category);
  const [cuisine, setCuisine] = useState(item.cuisine);
  const [preference, setPreference] = useState(item.preference);
  const [stockQuantity, setStockQuantity] = useState(item.quantity);
  const [imageData, setImageData] = useState(item.image);

  const handleFileInput = (e) => {
    setImageData(getBase64(e.target.files[0]));
  };

  const form_validation = () => {
    const food_item = {
      productName: name,
      productType: "food",
      description: description,
      price: price,
      isDeleted: isDeleted,
      category: category,
      cuisine: cuisine,
      preference: preference,
      quantity: stockQuantity,
      imageData: imageData,
    };

    if (
      name.trim().length === 0 ||
      description.trim().length === 0 ||
      String(price).trim().length === 0 ||
      category.trim().length === 0 ||
      cuisine.trim().length === 0 ||
      preference.trim().length === 0 ||
      String(stockQuantity).trim().length === 0 ||
      imageData.trim().length === 0
    ) {
      setError(
        dispatch,
        { msg: "All Fields are Required", type: "All" },
        400,
        "EDIT_FORM_FAILURE"
      );
    }

    //check if phone number meets all requirements
    else if (price < 0) {
      setError(
        dispatch,
        { msg: "Please enter a Positive Price", type: "Price" },
        400,
        "EDIT_FORM_FAILURE"
      );
    } else if (description.length > 200) {
      setError(
        dispatch,
        {
          msg: `Description Length is too High. Current length: ${description.length}. Character Limit: 200`,
          type: "Address",
        },
        400,
        "EDIT_FORM_FAILURE"
      );
    }

    //check if password meets all requirements
    else if (stockQuantity <= 0) {
      const message = "Please Enter a Positive Stock Quantity";
      setError(
        dispatch,
        { msg: message, type: "Stock" },
        400,
        "EDIT_FORM_FAILURE"
      );
    }

    //if all fields are valid
    else {
      props.edit(food_item);
    }
  };

  const handleSubmit = () => {
    form_validation();
  };

  return (
    <>
      {msgtype !== null && (
        <Alert color="danger" variant={"danger"}>
          {msg}
        </Alert>
      )}
      <Form onSubmit={() => handleSubmit()}>
        <Form.Group className="mb-3">
          <Form.Label>{Add_Edit_Food_Page.NAME}</Form.Label>
          <Form.Control
            type="name"
            placeholder={Add_Edit_Food_Page.PLACEHOLDER_FOOD_NAME}
            value={name}
            onChange={(e) => setName(e.target.value)}
            isInvalid={
              msgtype === "All" ? name.length === 0 : msgtype === "Name"
            }
          />
          <Form.Control.Feedback type="invalid">{msg}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>{Add_Edit_Food_Page.FOOD_IMAGE}</Form.Label>
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
          <Form.Label>{Add_Edit_Food_Page.DESCRIPTION}</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder={Add_Edit_Food_Page.PLACEHOLDER_FOOD_DESCRIPTION}
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
          <Form.Label>{Add_Edit_Food_Page.PRICE}</Form.Label>
          <Form.Control
            type="number"
            placeholder={Add_Edit_Food_Page.PLACEHOLDER_FOOD_PRICE}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            isInvalid={
              msgtype === "All" ? price.length === 0 : msgtype === "Price"
            }
          />
          <Form.Control.Feedback type="invalid">{msg}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>{Add_Edit_Food_Page.CATEGORY}</Form.Label>
          <Form.Control
            type="text"
            placeholder={Add_Edit_Food_Page.PLACEHOLDER_FOOD_CATEGORY}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            isInvalid={
              msgtype === "All" ? category.length === 0 : msgtype === "Category"
            }
          />
          <Form.Control.Feedback type="invalid">{msg}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>{Add_Edit_Food_Page.CUISINE}</Form.Label>
          <Form.Control
            type="text"
            placeholder={Add_Edit_Food_Page.PLACEHOLDER_FOOD_CUISINE}
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            isInvalid={
              msgtype === "All" ? cuisine.length === 0 : msgtype === "Cuisine"
            }
          />
          <Form.Control.Feedback type="invalid">{msg}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>{Add_Edit_Food_Page.PREFERENCE}</Form.Label>
          <Form.Control
            type="text"
            placeholder={Add_Edit_Food_Page.PLACEHOLDER_FOOD_PREFERENCE}
            value={preference}
            onChange={(e) => setPreference(e.target.value)}
            isInvalid={
              msgtype === "All"
                ? preference.length === 0
                : msgtype === "Preference"
            }
          />
          <Form.Control.Feedback type="invalid">{msg}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>{Add_Edit_Food_Page.STOCK_QUANTITY}</Form.Label>
          <Form.Control
            type="number"
            placeholder={Add_Edit_Food_Page.PLACEHOLDER_FOOD_STOCK_QUANTITY}
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
              label={Add_Edit_Food_Page.PLACEHOLDER_FOOD_DELETED}
              value={isDeleted}
              onChange={(e) => setDeleted(!isDeleted)}
            />
          </div>
        </Form.Group>
        <Button variant="secondary" onClick={() => props.close()}>
          {Add_Edit_Food_Page.CANCEL}
        </Button>
        <Button variant="primary" onClick={() => handleSubmit()}>
          {Add_Edit_Food_Page.SUBMIT_EDIT}
        </Button>
        <Button variant="primary" onClick={() => props.delete()}>
          {Add_Edit_Food_Page.DELETE}
        </Button>
      </Form>
    </>
  );
};

export default EditFoodItem;
