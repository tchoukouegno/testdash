/** 
 * component that manages the view manager
* @param {} 
* @return {html} jsx

*/

import admin from '../assets/img/admin.png';
import notification from '../assets/img/notification.png';
import {  NavLink, useNavigate, Outlet, useLocation } from "react-router-dom";








export function CarDetailsDocument () {

    let navigate = useNavigate();



    const handleCar = ()=>{


        return  navigate('/manager/dashboard/car');

    }








    return(


        <div className="dashboard-container">

            <div className="dashboard-header">


               <div className='dashboard-items'>

                    <h1 onClick={handleCar} className='dashboard-title back-to-car'>Dashboard / Vehicules / Details</h1>

                    <div className='admin'>

                        <div className='admin-profil'>

                            <img src={admin} className='admin-icon'/>

                            <div>

                                <span>Damam</span>
                                <span className='admin-text'>Admin</span>

                            </div>


                        </div>

                        <div className='notification'>

                            <img src={notification} className='search-icon'/>

                        </div>

                    </div>

               </div>


            </div>

            <div className='car-details-container dashboard-body'>

                <div className='car-details-info'>


                    <div className="input-wrapper">

                        <label htmlFor="name" className='label-details-table'>Nom du proprietaire</label>
                        <input disabled type="text" className='input-login' id="name"  />
                                                
                    </div>

                    <div className="input-wrapper">

                        <label htmlFor="name" className='label-details-table'>Marque de la voiture</label>
                        <input disabled type="text" className='input-login' id="name"  />
                                                
                    </div>

                    <div className="input-wrapper">

                        <label htmlFor="name" className='label-details-table'>Numero de carte grise</label>
                        <input disabled type="text" className='input-login' id="name"  />
                                                
                    </div>

                     <div className="input-wrapper">

                        <label htmlFor="name" className='label-details-table'>Date de validité de l'Assurance</label>
                        <input disabled type="text" className='input-login' id="name"  />
                                                
                    </div>

                    <div className="input-wrapper">

                        <label htmlFor="name" className='label-details-table'>Date du dernier controle technique</label>
                        <input disabled type="text" className='input-login' id="name"  />
                                                
                    </div>

                    <div className="input-wrapper">

                        <label htmlFor="name" className='label-details-table'>Caracterisques</label>
                        <input disabled type="text" className='input-login' id="name"  />
                                                
                    </div>

                    <div className="input-wrapper">

                        <label htmlFor="name" className='label-details-table'>Type de carburage</label>
                        <input disabled type="text" className='input-login' id="name"  />
                                                
                    </div>


                    <div className="input-wrapper">

                        <label htmlFor="name" className='label-details-table'>Année</label>
                        <input disabled type="text" className='input-login' id="name"  />
                                                
                    </div>

                    <div className="input-wrapper">

                        <label htmlFor="name" className='label-details-table'>Description</label>
                        <input disabled type="text" className='input-login' id="name"  />
                                                
                    </div>

                    <div className="input-wrapper">

                        <label htmlFor="name" className='label-details-table'>Boite de vitesse</label>
                        <input disabled type="text" className='input-login' id="name"  />
                                                
                    </div>

                    <div className="input-wrapper">

                        <label htmlFor="name" className='label-details-table'>Nombre de porte</label>
                        <input disabled type="text" className='input-login' id="name"  />
                                                
                    </div>

                    <div className="input-wrapper">

                        <label htmlFor="name" className='label-details-table'>Nombre de seige</label>
                        <input disabled type="text" className='input-login' id="name"  />
                                                
                    </div>



                </div>

                <div className='car-details-photo'>

                    <div className='photo-item'>

                        <h5>Photo principal de la voiture</h5>

                        <div className='params-uploader-picture'>

                        </div>


                    </div>

                    <div className='photo-item'>

                        <h5>Photo arrière de la voiture</h5>

                        <div className='params-uploader-picture'>

                        </div>


                    </div>

                    <div className='photo-item'>

                        <h5>Photo latéral de la voiture</h5>

                        <div className='params-uploader-picture'>

                        </div>


                    </div>


                </div>

                 <div className='car-details-photo'>

                    <div className='photo-item'>

                        <h5>Photo Interieur de la voiture</h5>

                        <div className='params-uploader-picture'>

                        </div>


                    </div>

                    <div className='photo-item'>

                        <h5>Supplementaire</h5>

                        <div className='params-uploader-picture'>

                        </div>


                    </div>

                    <div className='photo-item'>

                        <h5>Photo carte grise</h5>

                        <div className='params-uploader-picture'>

                        </div>


                    </div>



                </div>

                 <div className='car-details-photo'>

                    <div className='photo-item'>

                        <h5>Photo carte grise (verso)</h5>

                        <div className='params-uploader-picture'>

                        </div>


                    </div>

                    <div className='photo-item'>

                        <h5>Certificat de vente</h5>

                        <div className='params-uploader-picture'>

                        </div>


                    </div>

                    <div className='photo-item'>

                        <h5>Assurance</h5>

                        <div className='params-uploader-picture'>

                        </div>


                    </div>


                </div>


                <div>


                    <div></div>




                </div>













            </div>





        </div>







    )




















}