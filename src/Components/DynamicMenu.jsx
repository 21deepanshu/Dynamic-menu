import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import axios from "axios";
import Loader from "./Loader";

const { SubMenu } = Menu;

const DynamicMenu = () => {
  const [menuData, setMenuData] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      try {
        const loginResponse = await axios.post(
          "http://appnox-tm.it/api/login",
          {
            user: "AdminPro",
            password: "Mnop@1234",
          }
        );
        const { data } = loginResponse;
        const accessToken = data?.result?.key;
        const menuTreeResponse = await axios.get(
          "http://appnox-tm.it/api/v1/menu",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const { result: menuTreeData } = menuTreeResponse?.data;
        setMenuData(menuTreeData?.data);
        setLoader(false);
      } catch (error) {
       alert("Error fetching menu data:", error);
       setLoader(false)
       setMenuData([])
      }
    };

    fetchData();
  }, []);
  const renderMenuItems = (items) => {
    return items?.length > 0 ? (
      items?.map((item) => {
        return <Menu.Item key={item.menuId}>{item.item}</Menu.Item>;
      })
    ) : (
      <p style={{textAlign:"center", fontSize:"40px"}}>No Menu Found</p>
    );
  };
  return (
    <>
      {loader && <Loader />}
      <Menu mode="vertical">{renderMenuItems(menuData)}</Menu>
    </>
  );
};

export default DynamicMenu;
