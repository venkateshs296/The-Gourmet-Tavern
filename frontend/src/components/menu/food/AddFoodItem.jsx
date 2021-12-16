import React, { useEffect, useState } from "react";
import { Alert, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getBase64 } from "../../../helpers_section/helperFunctions";
import { Add_Edit_Food_Page } from "../../../helpers_section/helperString";

const AddFoodItem = (props) => {
  const error = useSelector((state) => state.error);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [msgtype, setMsgType] = useState(null);
  const [msg, setMsg] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isDeleted, setDeleted] = useState(false);
  const [category, setCategory] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [preference, setPreference] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [imageData, setImageData] = useState("");

  const handleFileInput = (e) => {
    getBase64(e.target.files[0]).then((data) => {
      setImageData(data);
    });
  };

  const handleFoodAdd = () => {
    const food_item = {
      productName: name,
      productType: "food",
      description: description,
      category: category,
      price: price,
      quantity: stockQuantity,
      image: imageData,
      cuisine: cuisine,
      preference: preference,
    };
    props.add(food_item);
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
      <Form onSubmit={handleFoodAdd}>
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
        <Button variant="primary" onClick={() => handleFoodAdd()}>
          {Add_Edit_Food_Page.SUBMIT}
        </Button>
      </Form>
    </>
  );
};

export default AddFoodItem;
