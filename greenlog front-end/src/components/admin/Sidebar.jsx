import React from 'react'
import { NavLink } from "react-router-dom";
import SidebarItem from "./SidebarItem";


const Sidebar = () => {
    const menus = [
        { name: "대시보드", path: "/user/admin" },
        { name: "사용자관리", path: "/user/admin/list.json" },
        { name: "신고접수", path: "/report/list.json" },
        { name: "포인트관리", path: "/user/admin/seed/list.json"},
        { name: "경매관리", path: "/auction/admin/list.json"},
        { name: "1:1/FAQ/Q&A", path: "/user/admin/question"}
      ];
  return (
    <div>
        {menus.map((menu, index)=>
            <NavLink
            exact
            style={{color: "gray", textDecoration: "none"}}
            to={menu.path}
            key={index}
            activeStyle={{color: "black"}}>
                <SidebarItem menu={menu}/> 
            </NavLink>
            
        )}
    </div>
  )
}

export default Sidebar