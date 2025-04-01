import { useEffect, useState} from 'react';
import search from '../assets/icons/search.png';
import arrowsRight from '../assets/icons/arrowsRight.svg';

import Icons from '../assets/icons/Icons.svg';
import direction from '../assets/icons/direction.svg';
import profil from '../assets/img/profil.png';
import trash from '../assets/icons/trash.svg';
import ArrowLineLeft from '../assets/icons/ArrowLineLeft.svg';
import ArrowLineRight from '../assets/icons/ArrowLineRight.svg';
import { HeaderDash } from './HeaderDash';
import {  NavLink, useNavigate, Outlet } from "react-router-dom";
import chevronDownSolid from '../assets/icons/chevronDownSolid.svg';
import UserTable from './UserTable';
import UserTableDetails from './UserTableDetails';








export function User() {

   

    const [nextForm, setNextForm] = useState(true);

    const [selectedItem, setSelectedItem] = useState(null);

    const [isSelected, setIsSelected] = useState('Locataire');

    const [isOpen, setIsOpen] = useState(false);

    const data = [

        { id: 1, OderID: '#0001', NomComplet:'Tchouks', sexe: 'Masculin', permis:'N°123456', del:"14-02-2024/16-04-2025", experience:"5", pieces:'doc', adresse:"omnisport" },
        { id: 2,  OderID: '#0001', NomComplet:'Tchouks', sexe: 'Masculin', permis:'N°123456', del:"14-02-2024/16-04-2025", experience:"5", pieces:'doc', adresse:"omnisport" },
        { id: 3,  OderID: '#0001', NomComplet:'Tchouks', sexe: 'Feminin', permis:'N°123456', del:"14-02-2024/16-04-2025", experience:"5", pieces:'doc', adresse:"omnisport" },
        { id: 4,  OderID: '#0001', NomComplet:'Tchouks', sexe: 'Masculin', permis:'N°123456', del:"14-02-2024/16-04-2025", experience:"5", pieces:'doc', adresse:"omnisport" },
        { id: 5,  OderID: '#0001', NomComplet:'Tchouks', sexe: 'Feminin', permis:'N°123456', del:"14-02-2024/16-04-2025", experience:"5", pieces:'doc', adresse:"omnisport" },
        { id: 6,  OderID: '#0001', NomComplet:'Tchouks', sexe: 'Feminin', permis:'N°123456', del:"14-02-2024/16-04-2025", experience:"5", pieces:'doc', adresse:"omnisport" },
        { id: 7,  OderID: '#0001', NomComplet:'Tchouks', sexe: 'Feminin', permis:'N°123456', del:"14-02-2024/16-04-2025", experience:"5", pieces:'doc', adresse:"omnisport" },
        { id: 8,  OderID: '#0001', NomComplet:'Tchouks', sexe: 'Feminin', permis:'N°123456', del:"14-02-2024/16-04-2025", experience:"5", pieces:'doc', adresse:"omnisport" },
        { id: 9,  OderID: '#0001', NomComplet:'Tchouks', sexe: 'Masculin', permis:'N°123456', del:"14-02-2024/16-04-2025", experience:"5", pieces:'doc', adresse:"omnisport" },
        { id: 10,  OderID: '#0001', NomComplet:'Tchouks', sexe: 'Masculin', permis:'N°123456', del:"14-02-2024/16-04-2025", experience:"5", pieces:'doc', adresse:"omnisport" },
        { id: 11,  OderID: '#0001', NomComplet:'Tchouks', sexe: 'Feminin', permis:'N°123456', del:"14-02-2024/16-04-2025", experience:"5", pieces:'doc', adresse:"omnisport" },
        



    ]


    const thData = [

        { id: 1, th: "Oder ID", },
        {id:2, th:"Nom complet"},
        {id:3, th:"sexe"},
        {id:4, th:"Adresse"},
        {id:5, th:"N° permis"},
        {id:6, th:"Delivrance / expiration"},
        {id:7, th:"Année d'experience"},
        {id:8, th:"pieces jointes"},
        {id:9, th:""},


    ]

    const dataSelect = [{id:1, item:"Locataire"}, {id:2, item:"Proprietaire"}]

    const handleClick = (item) => {

       return setSelectedItem(item);
       
      };

      const handleOpen = ()=> {

  
        return  setIsOpen(!isOpen); 
        
      };

      const handleSelected = (itemSelected)=>{

        setIsOpen(!isOpen); 

    
        return  setIsSelected(itemSelected);


      }





    const handleNext = ()=>{

        return setNextForm(!nextForm);

    }

    



   

    return(

        <div className="dashboard-container">


            <HeaderDash dashboardTitle={"Dashboard / utilisateurs"}/>

            <div className='dashboard-body'>

                
               <UserTableDetails/>


            </div>


          


        </div>

       
     

    )









}