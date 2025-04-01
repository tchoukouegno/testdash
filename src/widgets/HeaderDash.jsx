/** 
 * component that manages the view manager
* @param {} 
* @return {html} jsx

*/

import admin from '../assets/img/admin.png';
import notification from '../assets/img/notification.png';




export function HeaderDash({dashboardTitle}) {







 return(

    
        <div className="dashboard-header">


               <div className='dashboard-items'>

                    <h1 className='dashboard-title'>{dashboardTitle}</h1>

                    <div className='admin'>

                        <div className='admin-profil'>

                            <img src={admin} className='admin-icon'/>

                            {/* <div>

                                <span>Damam</span>
                                <span className='admin-text'>Admin</span>

                            </div> */}


                        </div>

                        {/* <div className='notification'>

                            <img src={notification} className='search-icon'/>

                        </div> */}

                    </div>

               </div>


            </div>


 )





}