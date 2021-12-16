import React, { useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  Add_Edit_Drink_Page,
  Add_Edit_Food_Page,
  Card_Item_Page,
} from "../../../helpers_section/helperString";
import { addToCart } from "../../../store/actions/cartActions";
import {
  deleteProduct,
  editProduct,
} from "../../../store/actions/productActions";
import EditDrinkItem from "../drinks/EditDrinkItem";
import EditFoodItem from "../food/EditFoodItem";
import Quantity from "./Quantity";

const CardItem = (props) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const [showButton, setShowButton] = useState(true);

  const [showEdit, setEdit] = useState(false);
  const [showEditDrink, setEditDrink] = useState(false);
  const [showEditFood, setEditFood] = useState(false);

  const { item } = props;

  const handleAdd = (e) => {
    const item_to_cart = {
      product: {
        id: item._id,
        name: item.productName,
        quantity: e,
        price: item.price,
      },
    };
    dispatch(addToCart(item_to_cart, token));
    setShowButton(!showButton);
  };

  const handleClick = () => {
    setShowButton(!showButton);
  };

  const handleEditOpen = () => {
    setEdit(true);
    if (item.level === undefined) {
      setEditFood(true);
      setEditDrink(false);
    } else {
      setEditFood(false);
      setEditDrink(true);
    }
  };

  const handleEditClose = () => {
    setEdit(false);
    setEditDrink(false);
    setEditFood(false);
  };

  const handleEditDrinkCall = (value, id) => {
    dispatch(editProduct(id, value, token));
    handleEditClose();
  };

  const handleEditFoodCall = (value, id) => {
    dispatch(editProduct(id, value, token));
    handleEditClose();
  };

  const handleDeleteDrinkCall = (id) => {
    dispatch(deleteProduct(id, token));
    handleEditClose();
  };

  const handleDeleteFoodCall = (id) => {
    dispatch(deleteProduct(id, token));
    handleEditClose();
  };
  return (
    <>
      <Card className="design">
        <Card.Img variant="top" src={item.image} height="420px" width="420px" />
        <Card.Body>
          <Card.Title className="TextSize_Title">{item.productName}</Card.Title>
          <Card.Text className="description_height">
            {item.description}
          </Card.Text>
          {props.isAdmin ? (
            item.isDeleted ? (
              <Card.Text>{Card_Item_Page.ADMIN_MESSAGE}</Card.Text>
            ) : null
          ) : null}
          <div className="price">
            <div className="edit">
              <Card.Text className="TextSize">
                {Card_Item_Page.ITEM_PRICE}
                {item.price}
              </Card.Text>
              {props.isAdmin && (
                <Button
                  variant="outline-dark"
                  className="edit_button"
                  onClick={() => handleEditOpen(item)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pencil-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                  </svg>
                </Button>
              )}
            </div>
            {showButton && (
              <Button
                variant="primary"
                onClick={() => handleClick()}
                disabled={!props.isAuthenticated}
              >
                {!props.isAuthenticated
                  ? Card_Item_Page.AUTHENTICATE
                  : Card_Item_Page.ADD}
              </Button>
            )}
            {!showButton && (
              <Quantity
                items={item}
                close={() => handleClick()}
                add={(val) => handleAdd(val)}
              />
            )}
          </div>
        </Card.Body>
      </Card>
      <Modal
        show={showEdit}
        onHide={() => handleEditClose()}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {showEditDrink
              ? Add_Edit_Drink_Page.EDIT_DRINK
              : Add_Edit_Food_Page.EDIT_FOOD}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showEditDrink && (
            <EditDrinkItem
              delete={() => handleDeleteDrinkCall(item._id)}
              close={() => handleEditClose()}
              edit={(val) => handleEditDrinkCall(val, item._id)}
              item={item}
            />
          )}
          {showEditFood && (
            <EditFoodItem
              delete={() => handleDeleteFoodCall(item._id)}
              close={() => handleEditClose()}
              edit={(val) => handleEditFoodCall(val, item._id)}
              item={item}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CardItem;
