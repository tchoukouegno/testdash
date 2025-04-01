import { useEffect, useState} from 'react';
import search from '../assets/icons/search.png';
import arrowsRight from '../assets/icons/arrowsRight.svg';
import direction from '../assets/icons/direction.svg';
import Icons from '../assets/icons/Icons.svg';
import profil from '../assets/img/profil.png';
import trash from '../assets/icons/trash.svg';
import ArrowLineLeft from '../assets/icons/ArrowLineLeft.svg';
import ArrowLineRight from '../assets/icons/ArrowLineRight.svg';
import { HeaderDash } from './HeaderDash';
import {  NavLink, useNavigate, Outlet, useLocation } from "react-router-dom";
import { getTransaction } from '../modules/getTransaction';
import RevenueChart from './RevenueChart';
import Commission from './Commission'
import SubAccounts from './SubAccounts';
import { getCommission } from "../modules/getCommission";









export function Comptability() {

    const location = useLocation();

    const [nextForm, setNextForm] = useState(true);

    const [selectedItem, setSelectedItem] = useState(null);

    const [total, setTotal] = useState(0);
    const [data, setData] = useState({
        orangeMoney: 0,
        momo: 0,
        paypal: 0,
      });
      // Simuler une requête au backend pour récupérer les montants
  useEffect(() => {

    const token = JSON.parse(localStorage.getItem("token"));

    console.log(token)

    getCommission(token).then((response)=>{

        console.log(response)

        setData(response);


    })

    // const fetchData = async () => {
    //   const response = {
    //     orangeMoney: 204000.69,
    //     momo: 150000.0,
    //     paypal: 300000.0,
    //   };
    //   setData(response);
    //   setTotal(response.orangeMoney + response.momo + response.paypal);
    // };

    // fetchData();
  }, []);


    return(

        <div className="dashboard-container">


            <HeaderDash dashboardTitle={"Dashboard / Comptabilité"}/>

            <RevenueChart/>

            <Commission data = {data}/>

            <SubAccounts updateAccount = {setData}/>





           


          


        </div>

       
     

    )









}