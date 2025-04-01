import { useEffect, useState} from 'react';
import search from '../assets/icons/search.png';
import arrowsRight from '../assets/icons/arrowsRight.svg';

import Icon from '../assets/icons/Icon.svg';
import profil from '../assets/img/profil.png';
import eye from '../assets/icons/eye.svg';
import ArrowLineLeft from '../assets/icons/ArrowLineLeft.svg';
import ArrowLineRight from '../assets/icons/ArrowLineRight.svg';
import { HeaderDash } from './HeaderDash';
import { LitigeManagerTable } from './LitigeManagerTable';
import { ChatMediation } from './ChatMediation';












export function Support () {


    const [isClicked, setIsClicked] = useState(localStorage.getItem('litige') || false);

    const [isClicked2, setIsClicked2] = useState(localStorage.getItem('mediation') || false);

    const handleLitige = ()=>{

        localStorage.removeItem("litige");

        localStorage.removeItem("mediation");

        return  setIsClicked(false),setIsClicked2(false);

    }

    const handleMediation = ()=>{

        localStorage.setItem('litige', true)
        localStorage.setItem('mediation', true)

        return setIsClicked(true),setIsClicked2(true);

    }












    return(


        <div className="dashboard-container">

             <HeaderDash dashboardTitle={"Dashboard / Litiges et mediation"}/>

              <div className='dashboard-body-message'>

                {/* <div className='tags-container'>

                    <div className={ isClicked == false ?'tag': 'tag tag-no-actif' }onClick={handleLitige}><span className={ isClicked == false ?'tag-active': 'tag-active tag-no-actif-sp' } >Litiges</span></div>

                    <div className={ isClicked2 == false ?'tag tag-no-actif': 'tag' }  onClick={handleMediation}><span className={ isClicked2 == false ?'tag-active tag-no-actif-sp': 'tag-active' }>Mediation</span></div>

                   

                </div> */}

                {/* {isClicked == false ? <LitigeManagerTable/>: null} */}

                {/* {isClicked2 == false ? null : } */}
                <ChatMediation/>

              

            </div>













        </div>



    )








}