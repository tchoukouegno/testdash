/** 
   * component that manages the view manager
   * @param {} 
   * @return {html} jsx

 */
import { useEffect, useState} from 'react';
import {  NavLink, useNavigate, Outlet } from "react-router-dom";


import { SideBar } from "../widgets/SideBar";
import { Dashboard } from '../widgets/Dashboard';




export function Manager() {







    return(

        <div className='manager'>

            <SideBar/>

            <Outlet/>

        </div>




    )





}