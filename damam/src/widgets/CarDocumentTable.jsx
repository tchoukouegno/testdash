import { useEffect, useState} from 'react';
import search from '../assets/icons/search.png';
import arrowsRight from '../assets/icons/arrowsRight.svg';
import direction from '../assets/icons/direction.svg';
import Icons from '../assets/icons/Icons.svg';
import profil from '../assets/img/profil.png';
import trash from '../assets/icons/trash.svg';
import ArrowLineLeft from '../assets/icons/ArrowLineLeft.svg';
import ArrowLineRight from '../assets/icons/ArrowLineRight.svg';
import eye from '../assets/icons/eye.svg';
import { HeaderDash } from './HeaderDash';
import {  NavLink, useNavigate, Outlet, useLocation } from "react-router-dom";
import calendar from '../assets/icons/calendar.svg';






export function  CarDocumentTable () {

    let navigate = useNavigate();


    const thData = [

        { id: 1, th: "Oder ID", },
        {id:2, th:"Proprietaires"},
        {id:3, th:"Marques"},
        {id:4, th:"N°carte grise"},
        {id:5, th:"Validité de l'Assurance"},
        {id:6, th:"Date du dernier controle"},
        // {id:7, th:"Année d'experience"},
        {id:8, th:"pieces jointes"},
        {id:9, th:""},


    ]

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

    const handleClick = (item) => {

        return setSelectedItem(item);
        
       };


       const handleCarDetails = ()=>{

        return navigate('/manager/dashboard/car/details');


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

                            

                            </div>


                        </div>

                        
                        <div className='dashboard-sub-container'>

                            <div className='table-container-user'>

                                <table className='tb'>

                                    <thead className='tb-thead'>

                                        <tr >

                                            {thData.map((item) => (

                                                <th title={item.th} key={item.id}>{item.th}</th>
                                                                                        
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
                                                <td>{item.adresse}</td>
                                                 <td>

                                                    <img className='profil' src={calendar}  alt='profil user'/>
                                                    <span className='profil-name calendar-icon'>{item.del}</span>

                                                </td>
                                                <td>

                                                    <img className='profil' src={calendar}  alt='profil user'/>
                                                    <span className='profil-name calendar-icon'>{item.del}</span>

                                                </td>
                                                {/* <td className='profil-experience'>{item.experience}</td> */}
                                                <td>

                                                        {/* <div className='document-container document-container-user '>

                                                            <div className='icon-document icon-document-user'>

                                                                <img  src={Icons} />

                                                            </div>

                                                            <div className='document-name document-name-user'>

                                                                <span className='document-attachment'>Attachment</span>
                                                                <span className='document-weight document-weight-user'>42.52mb</span>

                                                            </div>

                                                    
                                                        </div> */}

                                                         <img className='profil' src={calendar}  alt='profil user'/>
                                                        <span className='profil-name calendar-icon'>{item.del}</span>
                                                    {/* {item.del} */}
                                                    
                                                    
                                                    
                                                    
                                                
                                                </td>

                                                {/* <td className='eye'><img  src={trash}  alt='detail profil'/></td> */}
                                                <td className='eye'><img  src={eye} onClick={handleCarDetails}  alt='detail profil'/></td>

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


                </>








    )
















}