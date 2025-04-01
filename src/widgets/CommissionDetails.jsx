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
import TransactionTable from '../widgets/TransactionTable';
import DetailCommission from './DetailCommission';










export function CommissionDetails() {

    const location = useLocation();

    const paymentMethod = location.state || {}; // Les données transmises



    const [nextForm, setNextForm] = useState(true);

    const [selectedItem, setSelectedItem] = useState(null);

    const data = [

        { id: 1, OderID: '#0001', NomComplet:'Tchouks', sexe: 'Toyota', permis:'14-02-2024/16-04-2025', del:"14-02-2024/16-04-2025", pieces:'doc', adresse:"N°123456" },
        { id: 2,  OderID: '#0001', NomComplet:'Tchouks', sexe: 'Toyota', permis:'14-02-2024/16-04-2025', del:"14-02-2024/16-04-2025", pieces:'doc', adresse:"N°123456" },
        { id: 3,  OderID: '#0001', NomComplet:'Tchouks', sexe: 'Nissan', permis:'14-02-2024/16-04-2025', del:"14-02-2024/16-04-2025", pieces:'doc', adresse:"N°123456" },
        { id: 4,  OderID: '#0001', NomComplet:'Tchouks', sexe: 'Toyota', permis:'14-02-2024/16-04-2025', del:"14-02-2024/16-04-2025", pieces:'doc', adresse:"N°123456" },
        { id: 5,  OderID: '#0001', NomComplet:'Tchouks', sexe: 'Nissan', permis:'14-02-2024/16-04-2025', del:"14-02-2024/16-04-2025", pieces:'doc', adresse:"N°123456" },
        { id: 6,  OderID: '#0001', NomComplet:'Tchouks', sexe: 'Nissan', permis:'14-02-2024/16-04-2025', del:"14-02-2024/16-04-2025", pieces:'doc', adresse:"N°123456" },
        { id: 7,  OderID: '#0001', NomComplet:'Tchouks', sexe: 'Nissan', permis:'14-02-2024/16-04-2025', del:"14-02-2024/16-04-2025", pieces:'doc', adresse:"N°123456" },
        { id: 8,  OderID: '#0001', NomComplet:'Tchouks', sexe: 'Nissan', permis:'14-02-2024/16-04-2025', del:"14-02-2024/16-04-2025", pieces:'doc', adresse:"N°123456" },
        { id: 9,  OderID: '#0001', NomComplet:'Tchouks', sexe: 'Toyota', permis:'14-02-2024/16-04-2025', del:"14-02-2024/16-04-2025", pieces:'doc', adresse:"N°123456" },
        { id: 10,  OderID: '#0001', NomComplet:'Tchouks', sexe: 'Toyota', permis:'14-02-2024/16-04-2025', del:"14-02-2024/16-04-2025", pieces:'doc', adresse:"N°123456" },
        { id: 11,  OderID: '#0001', NomComplet:'Tchouks', sexe: 'Nissan', permis:'14-02-2024/16-04-2025', del:"14-02-2024/16-04-2025", pieces:'doc', adresse:"N°123456" },
        



    ]


    const thData = [

        { id: 1, th: "N° Transaction", },
        {id:2, th:"Nom du locataire"},
        {id:3, th:"Debut/ fin location"},
        {id:4, th:"Montant"},
        {id:5, th:"Ville"},
        {id:6, th:"Modéle de véhicules"},
        // {id:7, th:"Année d'experience"},
        {id:8, th:"Generation"},
        {id:9, th:""},


    ]
    const handleClick = (item) => {

       return setSelectedItem(item);
       
      };





    const handleNext = ()=>{

        return setNextForm(!nextForm);

    }



    useEffect(() => {

        const token = JSON.parse(localStorage.getItem("token"));


        // getTransaction('https://www.damam.zeta-messenger.com/api/transactions',token).then((response)=>{



        //     console.log(response)

        // })
     
      }, []);

    return(

        <div className="dashboard-container">


            <HeaderDash dashboardTitle={"Dashboard / Comptabilité / Commission / Details"}/>

          

             <div className='dashboard-body'>

                <h3>Transactions Recente</h3>

                <DetailCommission  paymentMethod = {paymentMethod} />

               

                
                {/* <TransactionTable/> */}




            </div>

            


           


          


        </div>

       
     

    )









}