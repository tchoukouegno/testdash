import { useEffect, useState} from 'react';
import search from '../assets/icons/search.png';
import arrowsRight from '../assets/icons/arrowsRight.svg';

import Icon from '../assets/icons/Icon.svg';
import profil from '../assets/img/profil.png';
import eye from '../assets/icons/eye.svg';
import ArrowLineLeft from '../assets/icons/ArrowLineLeft.svg';
import ArrowLineRight from '../assets/icons/ArrowLineRight.svg';
import { HeaderDash } from './HeaderDash';
import StatData from "./StatData";
import MonthlyTransactionChart from './MonthlyTransactionChart';
import UserTable from './UserTable';
import { getStats } from '../modules/getStats';









export function Dashboard() {

    const [nextForm, setNextForm] = useState(true);

    const [selectedItem, setSelectedItem] = useState(null);

    const data = [

        { id: 1, email: 'tchoukouegnoevrard@gmail.com', path:'../assets/img/profil.png', profil: 'locataire', status:'nouveau' },
        { id: 2, email: 'tchoukouegnoevrard@gmail.com', path:'../assets/img/profil.png', profil: 'locataire', status:'confirmer' },
        { id: 3, email: 'tchoukouegnoevrard@gmail.com', path:'../assets/img/profil.png', profil: 'Proprietaire', status:'nouveau' },
        { id: 4, email: 'tchoukouegnoevrard@gmail.com', path:'../assets/img/profil.png', profil: 'locataire', status:'nouveau' },
        { id: 5, email: 'tchoukouegnoevrard@gmail.com', path:'../assets/img/profil.png', profil: 'Proprietaire', status:'nouveau' },
        { id: 6, email: 'tchoukouegnoevrard@gmail.com', path:'../assets/img/profil.png', profil: 'Proprietaire', status:'rejeter' },
        { id: 7, email: 'tchoukouegnoevrard@gmail.com', path:'../assets/img/profil.png', profil: 'Proprietaire', status:'confirmer' },
        { id: 8, email: 'tchoukouegnoevrard@gmail.com', path:'../assets/img/profil.png', profil: 'Proprietaire', status:'rejeter' },
        { id: 9, email: 'tchoukouegnoevrard@gmail.com', path:'../assets/img/profil.png', profil: 'locataire', status:'nouveau' },
        { id: 10, email: 'tchoukouegnoevrard@gmail.com', path:'../assets/img/profil.png', profil: 'locataire', status:'confirmer' },
        { id: 11, email: 'tchoukouegnoevrard@gmail.com', path:'../assets/img/profil.png', profil: 'Proprietaire', status:'rejeter' },
        

    ]

    const [transactionData, setTransactionData] = useState([])

    const [statNumber, setStatNumber] = useState([])

    useEffect(() => {

        const token = JSON.parse(localStorage.getItem("token"));

        getStats(token).then((response)=>{

            console.log(response)


            setStatNumber(response)
            setTransactionData(response.graph)




        })

       
      }, []);

      const { usersCount, evolutionPercentageUser,trendUser,bookingCount,evolutionPercentageBooking
        ,trendBooking
        ,walletCount
        ,evolutionPercentageWallet
        ,trendWallet
        ,litigeCount
        ,evolutionPercentageLitige
        ,trendLitige} = statNumber

  


      
      

      
    const handleClick = (item) => {

       return setSelectedItem(item);
       
      };





    const handleNext = ()=>{

        return setNextForm(!nextForm);

    }



   

    return(

        <div className="dashboard-container">


            <HeaderDash dashboardTitle={"Dashboard"}/>

            <div className='dashboard-body'>

                <h3>Statistiques</h3>

                <StatData
    usersCount={usersCount}
    evolutionPercentageUser={Math.round(evolutionPercentageUser) }
    trendUser={trendUser}
    bookingCount={bookingCount}
    evolutionPercentageBooking={Math.round(evolutionPercentageBooking)}
    trendBooking={trendBooking}
    walletCount={walletCount}
    evolutionPercentageWallet={Math.round(evolutionPercentageWallet)}
    trendWallet={trendWallet}
    litigeCount={litigeCount}
    evolutionPercentageLitige={Math.round(evolutionPercentageLitige)}
    trendLitige={trendLitige}
  />

                <h3 className='transactionTitle'>
        Statistiques mensuelles des transactions
      </h3>

                <div className='diagramme-container'>

                    <MonthlyTransactionChart data={transactionData} />

                </div>

                <UserTable/>

               

                {/* <div className='stats-container'>

                    <div className='stats'>

                        <h4>Inscriptions</h4>

                        <span>721K</span>


                    </div>

                    <div className='stats stats-color'>

                        <h4>Location</h4>

                        <span>367K</span>



                    </div>

                    <div className='stats'>

                        <h4>Revenus</h4>

                        <span>1,156 XAF</span>


                    </div>

                    <div className='stats stats-color'>

                        <h4>Litiges</h4>

                        <span>20</span>


                    </div>




                </div> */}



                {/* <div className='dashboard-sub-container'>

                    <div className='table-container'>

                        <table className='tb'>

                            <thead className='tb-thead'>

                                <tr>
                                    <th>Email</th>
                                    <th>Profil</th>
                                    <th>type de profil</th>
                                    <th>Status</th>
                                    <th>Details</th>

                                </tr>

                            </thead>

                            <tbody className='tb-tbody'>

                                {data.map((item) => (
                                    <tr key={item.id} onClick={() => handleClick(item)}>

                                        <td>{item.email}</td>
                                        <td> <img className='profil' src={profil}  alt='profil user'/></td>
                                        <td className='new-profil'>.{item.profil}</td>
                                        <td>{item.status}</td>
                                        <td className='eye'><img  src={eye}  alt='detail profil'/></td>

                                    </tr>
                                ))}
                            
                                                         
                            
                            </tbody>

                        </table>
                        


                        <div className='pagination-items'>

                            <img  src={ArrowLineLeft} className='arrow' alt='arrow-left' />
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                            <span>5</span>
                            <img  src={ArrowLineRight} className='arrow' alt='arrow-right' />





                        </div>



                    </div>


                <div className='details-table'>

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

 */}


            </div>


          


        </div>

       
     

    )









}