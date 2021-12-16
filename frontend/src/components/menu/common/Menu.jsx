import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { itemPerPage, item_filter } from "../../../helpers_section/helperFunctions";
import { getProducts_Drink, getProducts_Food } from "../../../store/actions/productActions";
import DrinksMenuList from "../drinks/DrinksMenuList";
import FoodMenuList from "../food/FoodMenuList";

const Menu = (props) => {
  console.log(props);

  const isUser = useSelector(state => state.auth.user===undefined?null:state.auth.user);

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  let isAdmin;
  isUser === null? isAdmin = false : isAdmin = isUser.isAdmin

  const dispatch = useDispatch();
  const menu_items = useSelector((state) => state.product)
  console.log(menu_items);
  let food_menu = props.type === "food" ? true : false;

  const [msg, setMsg] = useState(null);
  const [msgtype, setMsgType] = useState(null);
  const [page, setPage] = useState(1);
  const [pageItemLimit, setPageItemList] = useState(6);
  const [search, setSearch] = useState(false);
  const [food, setFood] = useState(false);
  const [drink, setDrink] = useState(false);

  const [foodSearch, setFoodSearch] = useState("")
  const [foodCategory, setFoodCategory] = useState("")
  const [foodCuisine, setFoodCuisine] = useState("")
  const [foodPreference, setFoodPreference] = useState("")

  const [drinkSearch, setDrinkSearch] = useState("")
  const [drinkCategory, setDrinkCategory] = useState("")
  const [drinkLevel, setDrinkLevel] = useState("")

  let items = item_filter(menu_items, page, pageItemLimit);

  useEffect(() => {

    search? food? dispatch(getProducts_Food("food",0,50,foodSearch,foodCategory,foodCuisine,foodPreference)): 
    dispatch(getProducts_Drink("drink",0,50,drinkSearch,drinkCategory,drinkLevel)): 
  food_menu?
    dispatch(getProducts_Food("food",0,50,"","","","")):
    dispatch(getProducts_Drink("drink",0,50,"","","",""))  
    
  },[search,food,foodSearch,foodCategory,foodCuisine,foodPreference,drinkSearch,drinkCategory,drinkLevel])

  let pageItemLimitArray = itemPerPage(menu_items);

  const handlePage = (ele) => {
    setPage(ele);
    items = item_filter(menu_items, ele, pageItemLimit);
  };

  const handleItemPerPage = (ele) => {
    setPage(1)
    setPageItemList(ele);
    items = item_filter(menu_items, page, ele);
  };

  const handleSearch_Food = (val) => {
    setSearch(true)
    setFood(true)
    setFoodSearch(val.search)
    setFoodCategory(val.category)
    setFoodCuisine(val.cuisine)
    setFoodPreference(val.preference)

  }

  const handleSearch_Drink = (val) => {
    setSearch(true)
    setFood(false)
    setDrink(true)
    setDrinkSearch(val.search)
    setDrinkCategory(val.category)
    setDrinkLevel(val.level)
  }


  return (
    <>
    {msgtype !== null && (
        <Alert color="danger" variant={"danger"}>
          {msg}
        </Alert>
      )}
      {food_menu ? (
        <FoodMenuList
          isAdmin={isAdmin}
          isAuthenticated={isAuthenticated}
          items={items}
          full_item_list={menu_items}
          handlePage = {(val)=>handlePage(val)}
          handleItemPerPage = {(val) => handleItemPerPage(val)}
          page = {page}
          pageItemLimit = {pageItemLimit}
          pageItemLimitArray = {pageItemLimitArray}
          search={(val)=>handleSearch_Food(val)}
        />
      ) : (
        <DrinksMenuList
          isAdmin={isAdmin}
          isAuthenticated={isAuthenticated}
          items={items}
          full_item_list={menu_items}
          handlePage = {(val)=>handlePage(val)}
          handleItemPerPage = {(val) => handleItemPerPage(val)}
          page = {page}
          pageItemLimit = {pageItemLimit}
          pageItemLimitArray = {pageItemLimitArray}
          search={(val)=>handleSearch_Drink(val)}
        />
      )}
    </>
  );
};

export default Menu;
