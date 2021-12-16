import React from "react";
import { Col, Row } from "react-bootstrap";
import CardItem from "../components/menu/common/CardItem";
import CartList from "../components/cart/CartList";
import OrderList from "../components/orders/OrderList";
import { helper_function_code } from "./helperString";

export const dropdown_populate = (items, type) => {
  let cat = new Set();
  items.forEach((element) => {
    var sep = element[type].split(";");
    sep.forEach((ele) => {
      cat.add(ele.trim());
    });
  });
  let cat_array = [...cat];
  let options;

  options = cat_array.map((element, idx) => {
    return (
      <option value={element} key={idx}>
        {element}
      </option>
    );
  });
  return options;
};

export const grid_create = (
  items,
  item_blank,
  isAdmin,
  isAuthenticated,
  type
) => {
  let content;
  if (items.length !== 0) {
    let i = 0;
    let limit = 3;
    const rows = [...Array(Math.ceil(items.length / limit))];
    let productRows = rows.map((row, idx) =>
      items.slice(idx * limit, idx * limit + limit)
    );
    let temp_rows = productRows;
    temp_rows.map((row, idx) => {
      if (row.length !== limit) {
        for (i = 0; i <= limit - (row.length - 1); i++) {
          productRows[idx].push(item_blank);
        }
      }
      return productRows;
    });
    content = productRows.map((row, idx_row) => (
      <Row className="card_align" key={idx_row}>
        {row.map((product, idx) => (
          <Col lg={true} key={idx}>
            {isAdmin === true
              ? product.name !== "" && (
                  <CardItem
                    item={product}
                    key={idx}
                    isAdmin={isAdmin}
                    isAuthenticated={isAuthenticated}
                  />
                )
              : !product.isDeleted && (
                  <CardItem
                    item={product}
                    key={idx}
                    isAdmin={isAdmin}
                    isAuthenticated={isAuthenticated}
                  />
                )}
          </Col>
        ))}
      </Row>
    ));

    return content;
  } else {
    content = (
      <h1>
        {type === helper_function_code.CONDITION
          ? helper_function_code.BAR
          : helper_function_code.RESTAURANT}
      </h1>
    );
    return content;
  }
};

export const order_list_create = (item) => {
  let productRows = item;
  let content;
  if (productRows.length === 0) {
    content = (
      <>
        <h1>{helper_function_code.ORDERS}</h1>
      </>
    );
  } else {
    content = productRows.map((order,idx) => {
      return <OrderList item={order.items} bill={order.totalBill} orderType={order.orderType} order_no={idx+1}/>
    })
  }

  return content;
};

export const cart_list_create = (items, bill) => {
  let productRows = items;
  let content;
  if (productRows.length === 0) {
    content = (
      <>
        <h1>{helper_function_code.CART}</h1>
      </>
    );
  } else {
    content = <CartList item={items} bill={bill} />;
  }

  return content;
};

export const item_sort = (item_list) => {
  item_list.sort(function (x, y) {
    return x.isDeleted - y.isDeleted;
  });
};

export const item_filter = (items, page_number, page_size) => {
  item_sort(items);
  if (items.length < page_size) {
    page_number = 1;
  }
  let filtered = items.slice(
    (page_number - 1) * page_size,
    page_number * page_size
  );
  return filtered;
};

export const itemPerPage = (items) => {
  let i = 3;
  let itemPerPage_array = [];

  while (i <= items.length) {
    itemPerPage_array.push(i);
    i += 3;
  }

  return itemPerPage_array;
};

export const getBase64 = (file) => {
  return new Promise((resolve) => {
    let baseURL = "";

    let reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = (e) => {
      baseURL = e.target.result;
      resolve(baseURL);
    };
    return baseURL;
  });
};
