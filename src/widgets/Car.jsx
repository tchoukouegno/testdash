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

import  CarManagerTable  from './CarManagerTable';
import { CarDocumentTable } from './CarDocumentTable';
import { CarLocationTable } from './CarLocationTable';








export function Car() {

    const location = useLocation();

    const [nextForm, setNextForm] = useState(true);

    const [selectedItem, setSelectedItem] = useState(null);

    // console.log(localStorage.getItem('selectedButton') || false)

    // console.log(localStorage.getItem('selectedButton2') || false)

    // console.log(localStorage.getItem('selectedButton3') || false)

    const [isClicked, setIsClicked] = useState(localStorage.getItem('car') || false);

    const [isClicked2, setIsClicked2] = useState(localStorage.getItem('doc') || false);

    const [isClicked3, setIsClicked3] = useState(localStorage.getItem('location') || false);


  
    useEffect(() => {

       
        
       
      }, []);

    




  

    const handleGestionaire = ()=>{

        localStorage.removeItem("car");

        localStorage.removeItem("doc");

        localStorage.removeItem("location");

        return  setIsClicked(false),setIsClicked2(false), setIsClicked3(false);

    }

    const handleDocument = ()=>{

        localStorage.setItem('car', true)
        localStorage.setItem('doc', true)
        localStorage.removeItem("location");

        return setIsClicked(true),setIsClicked2(true),setIsClicked3(false);

    }

    const handleLocation = ()=>{

        localStorage.setItem('car', true)
        localStorage.removeItem("doc")
        localStorage.setItem('location', true)

        return  setIsClicked(true), setIsClicked2(false), setIsClicked3(true);

    }

    const handleClick = (item) => {

       return setSelectedItem(item);
       
      };





    const handleNext = ()=>{

        return setNextForm(!nextForm);

    }

   
       
    return(

        <div className="dashboard-container">


            <HeaderDash dashboardTitle={"Dashboard / Vehicules"}/>

           

            <div className='dashboard-body'>

                {/* <div className='tags-container'>

                    <div className={ isClicked == false ?'tag': 'tag tag-no-actif' }onClick={handleGestionaire}><span className={ isClicked == false ?'tag-active': 'tag-active tag-no-actif-sp' } >Gestionnaire de vehicule</span></div>

                    <div className={ isClicked2 == false ?'tag tag-no-actif': 'tag' }  onClick={handleDocument}><span className={ isClicked2 == false ?'tag-active tag-no-actif-sp': 'tag-active' }>Verification des documents</span></div>

                    <div className={ isClicked3 == false ?'tag tag-no-actif': 'tag' } onClick={handleLocation}><span className={ isClicked3 == false ?'tag-active tag-no-actif-sp': 'tag-active' } >Prevention de la sous-location</span></div>

                </div> */}

                <CarManagerTable/>

                {/* {isClicked == false ? : null} */}

                {/* {isClicked2 == false ? null : <CarDocumentTable/>}

                {isClicked3 === false ? null : <CarLocationTable/>} */}

            </div>


          


        </div>

       
     

    )









}