import React from "react";
import { Card, Table } from "react-bootstrap";
import { Order_List_Page } from "../../helpers_section/helperString";

const OrderList = (props) => {
  const { item, bill, orderType, order_no } = props;

  return (
    <>
      <Card className="list-align">
        <Card.Title variant="top">
          {Order_List_Page.TITLE}
          {order_no}
        </Card.Title>
        <Card.Body>
          <Table borderless={true}>
            <thead>
              <tr>
                <th>
                  <h4>{Order_List_Page.NAME}</h4>
                </th>
                <th>
                  <h4>{Order_List_Page.PRICE}</h4>
                </th>
                <th>
                  <h4>{Order_List_Page.ORDER_QUANTITIY}</h4>
                </th>
              </tr>
            </thead>
            {item.map((ele) => {
              return (
                <tbody>
                  <tr>
                    <td>{ele.name}</td>
                    <td>
                      {"$"}
                      {ele.price}
                    </td>
                    <td>{ele.quantity}</td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
          <Card.Title>
            {Order_List_Page.TOTAL_PRICE}
            {bill}
          </Card.Title>
          <Card.Title>
            {Order_List_Page.ORDER_TYPE}
            {orderType}
          </Card.Title>
        </Card.Body>
      </Card>
    </>
  );
};

export default OrderList;
