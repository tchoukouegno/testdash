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
import chevronDownSolid from '../assets/icons/chevronDownSolid.svg';
import eye from '../assets/icons/eye.svg';
import calendar from '../assets/icons/calendar.svg';
import Alarm from '../assets/icons/Alarm.svg';
import Icon from '../assets/icons/Icon.svg';




export function  CarLocationTable () {

    const [nextForm, setNextForm] = useState(true);

    const [selectedItem, setSelectedItem] = useState(null);

    const [isSelected, setIsSelected] = useState('Locataire');

    const [isOpen, setIsOpen] = useState(false);

    const thData = [

        { id: 1, th: "Oder ID", },
        {id:2, th:"Nom complet"},
        {id:3, th:"Ville"},
        {id:4, th:"Heure"},
        {id:5, th:"Date de remise"},
        {id:6, th:"Date de recupération"},
        // {id:7, th:"Année d'experience"},
        // {id:8, th:"Date"},
        {id:9, th:""},


    ]


   

    const data = [

        { id: 1, OderID: '#0001', NomComplet:'Tchouks', sexe: 'Yaounde', permis:'14-02-2024/16-04-2025', del:"14-02-2024/16-04-2025", pieces:'doc', adresse:"14h30min" },
        { id: 2,  OderID: '#0001', NomComplet:'Tchouks', sexe: 'Yaounde', permis:'14-02-2024/16-04-2025', del:"14-02-2024/16-04-2025", pieces:'doc', adresse:"14h30min" },
        { id: 3,  OderID: '#0001', NomComplet:'Tchouks', sexe: 'Douala', permis:'14-02-2024/16-04-2025', del:"14-02-2024/16-04-2025", pieces:'doc', adresse:"14h30min" },
        { id: 4,  OderID: '#0001', NomComplet:'Tchouks', sexe: 'Yaounde', permis:'14-02-2024/16-04-2025', del:"14-02-2024/16-04-2025", pieces:'doc', adresse:"14h30min" },
        { id: 5,  OderID: '#0001', NomComplet:'Tchouks', sexe: 'Douala', permis:'14-02-2024/16-04-2025', del:"14-02-2024/16-04-2025", pieces:'doc', adresse:"14h30min" },
        { id: 6,  OderID: '#0001', NomComplet:'Tchouks', sexe: 'Douala', permis:'14-02-2024/16-04-2025', del:"14-02-2024/16-04-2025", pieces:'doc', adresse:"14h30min" },
        { id: 7,  OderID: '#0001', NomComplet:'Tchouks', sexe: 'Douala', permis:'14-02-2024/16-04-2025', del:"14-02-2024/16-04-2025", pieces:'doc', adresse:"14h30min" },
        { id: 8,  OderID: '#0001', NomComplet:'Tchouks', sexe: 'Douala', permis:'14-02-2024/16-04-2025', del:"14-02-2024/16-04-2025", pieces:'doc', adresse:"14h30min" },
        { id: 9,  OderID: '#0001', NomComplet:'Tchouks', sexe: 'Yaounde', permis:'14-02-2024/16-04-2025', del:"14-02-2024/16-04-2025", pieces:'doc', adresse:"14h30min" },
        { id: 10,  OderID: '#0001', NomComplet:'Tchouks', sexe: 'Yaounde', permis:'14-02-2024/16-04-2025', del:"14-02-2024/16-04-2025", pieces:'doc', adresse:"14h30min" },
        { id: 11,  OderID: '#0001', NomComplet:'Tchouks', sexe: 'Douala', permis:'14-02-2024/16-04-2025', del:"14-02-2024/16-04-2025", pieces:'doc', adresse:"14h30min" },
    

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

            <>

                <div className='search-bar-caontainer'>

                    <img  src={direction}  alt='filter direction'/>

                    <div className='filter-search'>

                        <div className='item-search search-dash search-bar'>


                            <img src={search} className='search-icon'/>

                            <input autoFocus className='search input-search' placeholder='Recherche'/>           


                        </div>

                        <div className='dropDown'>

                            <div onClick={handleOpen} >

                                <span>{isSelected}</span>
                                <img  src={chevronDownSolid} alt='chevronDown' className='chevronDown' />

                            </div>

                             {isOpen === true ?

                                        <div className='optionDropdown'>
                                   
                                            {dataSelect?.map((item,index)=>(

                                                <span onClick={()=>handleSelected(item.item)} key={index}>{item.item}</span>

                                            ))}
                                
                                        </div>

                                    : null}
            
                            
                        </div>

                    </div>


                </div>

                    <div className='location-conatainer'>

                        
                        <div className='dashboard-sub-container table-container-location'>

                            <div className='table-container-user '>

                                <table className='tb'>

                                    <thead className='tb-thead'>

                                        <tr >

                                            {thData.map((item) => (

                                                <th key={item.id}>{item.th}</th>
                                                                                        
                                            ))}

                                        </tr>

                                    </thead>

                                    <tbody className='tb-tbody'>

                                    

                                        {data.map((item) => (

                                            <tr  className='user-car' key={item.id} onClick={() => handleClick(item)}>
                                                

                                                <td>{item.OderID}</td>
                                                <td > 

                                                    <img className='profil' src={profil}  alt='profil user'/>
                                                    <span className='profil-name'>{item.NomComplet}</span>

                                                </td>
                                                <td className=''>{item.sexe}</td>
                                                <td>
                                                    
                                                    <img className='profil' src={Alarm}  alt='profil user'/>
                                                    <span className='profil-name calendar-icon'>{item.adresse}</span>

                                                </td>
                                                <td>

                                                    <img className='profil' src={calendar}  alt='profil user'/>
                                                    <span className='profil-name calendar-icon'>{item.del}</span>



                                                </td>
                                                <td>

                                                    <img className='profil' src={calendar}  alt='profil user'/>
                                                    <span className='profil-name calendar-icon'>{item.del}</span>



                                                </td>
                                                {/* <td className='profil-experience'>{item.experience}</td> */}
                                                {/* <td>

                                                    {item.pieces}
                
                                                </td> */}

                                                <td className='eye'><img  src={eye}  alt='detail profil'/></td>

                                            </tr>
                                        ))}
                                    
                                                                
                                    
                                    </tbody>

                                </table>
                                

                                <div className='pagination-items paginations-items-user'>

                                    <img  src={ArrowLineLeft} className='arrow' alt='arrow-left' />
                                    <span>1</span>
                                    <span>2</span>
                                    <span>3</span>
                                    <span>4</span>
                                    <span>5</span>
                                    <img  src={ArrowLineRight} className='arrow' alt='arrow-right' />


                                </div>


                            </div>                   



                        </div>

                        <div className='details-table details-table-location'>

                            {nextForm ?
                            
                            <span>Voir les details</span> :

                            <div className='back-container'>

                                <img  onClick={handleNext}   src={arrowsRight} className='arrowsRight'/>
                                <span>Voir les details</span>

                            </div>
                        
                            }

                            
                            <div className='form-details-table'>

                                {nextForm ? 
                                
                                    <>

                                        <div className="input-wrapper">

                                            <label htmlFor="name" className='label-details-table'>Nom complet</label>
                                            <input disabled type="text" className='input-login' id="name"  />
                                                
                                        </div>

                                        <div className="input-wrapper">

                                            <label htmlFor="name" className='label-details-table'>sexe</label>
                                            <input disabled type="text" className='input-login' id="name"  />
                                                
                                        </div>

                                        <div className="input-wrapper">

                                            <label htmlFor="name" className='label-details-table'>Adresse</label>
                                            <input disabled type="text" className='input-login' id="name"  />
                                                
                                        </div>

                                        <div className="input-wrapper">

                                            <label htmlFor="name" className='label-details-table'>Numero de Telephone</label>
                                            <input disabled type="text" className='input-login' id="name"  />
                                                
                                        </div>

                                        <div className="input-wrapper">

                                            <label htmlFor="name" className='label-details-table'>Numero du permis</label>
                                            <input disabled type="text" className='input-login' id="name"  />
                                                
                                        </div>

                                        <div className="input-wrapper">

                                            <label htmlFor="name" className='label-details-table'>Année d'experience</label>
                                            <input disabled  type="text" className='input-login' id="name"  />
                                                
                                        </div>

                                        <div className='button-next'>


                                            <button onClick={handleNext} className='login-button next-button'>Suivant</button>

                                        </div>
                                            
                                    
                                    </>                               
                                
                                
                                : 
                                
                                
                                <>

                                    
                                        <div className="input-wrapper">

                                            <label htmlFor="name" className='label-details-table'>Date delivrance/ expiration</label>
                                            <input disabled type="text" className='input-login' id="name"  />
                                                
                                        </div>

                                        <div>

                                            <span>Voir les pieces jointes</span>

                                            <div className='document-profil'>

                                                <div className='document-container'>

                                                    <div className='icon-document'>

                                                        <img  src={Icon} />

                                                    </div>

                                                    <div className='document-name'>

                                                        <span>Attachment</span>
                                                        <span className='document-weight'>42.52mb</span>

                                                    </div>

                                                    
                                                </div>

                                                <div className='document-container'>

                                                    <div className='icon-document'>

                                                        <img  src={Icon} />

                                                    </div>

                                                    <div className='document-name'>

                                                        <span>Attachment</span>
                                                        <span className='document-weight'>42.52mb</span>

                                                    </div>

                                                    
                                                </div>





                                            </div>

                                            <div className="input-wrapper">

                                                <label htmlFor="name" className='label-details-table'>Motif d'annulation</label>
                                                <input  type="text" className='input-login' id="name"  />
                                                    
                                            </div>

                                            <div className='button-container'>

                                                <button className='login-button reject-button  '>Rejeter</button>
                                                <button className='login-button confirm-button '>Confirmer</button>



                                            </div>
                                        
                                        
                                        
                                        </div>                                                       
                        
                                
                                </>
                                
                                
                                
                                
                                
                                
                                
                                }




                            </div>
                            
                        </div>

                    </div>



                </>








    )
















}