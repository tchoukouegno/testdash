import '../styles/index.css';
import damamLogo from '../assets/logo/damamLogo.png';
import search from '../assets/icons/search.png';
import home from '../assets/icons/home.png';
import person from '../assets/icons/person.png';
import car from '../assets/icons/car.png';
import move from '../assets/icons/move.png';
import phone from '../assets/icons/phone.png';
import lock from '../assets/icons/lock.png';
import setting from '../assets/icons/setting.png';
import out from '../assets/icons/out.png';
import { useEffect, useState} from 'react';
import {  NavLink, useNavigate, Outlet, useLocation } from "react-router-dom";
import { deconnexion } from '../modules/deconnexion';
import { snackbar } from '../widgets/snackbar';
import info from '../assets/icons/info.svg';
import arrowUpDown from '../assets/icons/arrowUpDown.svg';














export function SideBar() {

    const location = useLocation();

    let navigate = useNavigate();

    const [isClicked, setIsClicked] = useState(false);

    const [isClicked2, setIsClicked2] = useState(false);

    const [isClicked3, setIsClicked3] = useState(false);

    const [isClicked4, setIsClicked4] = useState(false);

    const [isClicked5, setIsClicked5] = useState(false);

    const [isClicked6, setIsClicked6] = useState(false);

    const [isClicked7, setIsClicked7] = useState(false);

    const [isClicked8, setIsClicked8] = useState(false);

    // const userRole = location.state?.userRole;

    // console.log(userRole)

    const [userRole, setUserRole] = useState(null)

    
    

    // localStorage.setItem('tokens',JSON.stringify(userRole)),

  


    useEffect(() => {

        
        const token = JSON.parse(localStorage.getItem("token"));
        const role= JSON.parse(localStorage.getItem("role"));

        if(token === null) {
    
            return navigate('/');
    
        }

        //  if(role !== "SUPER_ADMIN" || role !== "ADMIN") {

        //     return navigate('/');

        //  }


        

        // if(role === "SUPER_ADMIN") {

            setUserRole(role);

        // }


        if(location.pathname === "/manager/dashboard") {return  setIsClicked(false),setIsClicked2(false), setIsClicked3(false), setIsClicked4(false), setIsClicked5(false), setIsClicked6(false),setIsClicked7(false),setIsClicked8(false);}


        if(location.pathname === "/manager/dashboard/user") {return setIsClicked(true),setIsClicked2(true),setIsClicked3(false),setIsClicked4(false),setIsClicked5(false),setIsClicked6(false),setIsClicked7(false),setIsClicked8(false);}

        
        if(location.pathname === "/manager/dashboard/car") {

           
            setIsClicked(true);
            setIsClicked2(false);
            setIsClicked3(true);
            setIsClicked4(false);
            setIsClicked5(false);
            setIsClicked6(false);
            setIsClicked7(false);
            setIsClicked8(false);
    
                
        }

        if(location.pathname === "/manager/dashboard/transaction") {
            
            
            setIsClicked(true);
            setIsClicked2(false);
            setIsClicked3(false);
            setIsClicked4(true);
            setIsClicked5(false);
            setIsClicked6(false);
            setIsClicked7(false);
            setIsClicked8(false);
                          
        }

        if(location.pathname === "/manager/dashboard/support") {
            
            
            setIsClicked(true);
            setIsClicked2(false);
            setIsClicked3(false);
            setIsClicked4(false);
            setIsClicked5(true);
            setIsClicked6(false);
            setIsClicked7(false);
            setIsClicked8(false);
                          
        }

        if(location.pathname === "/manager/dashboard/parametre") {
            
            
            setIsClicked(true);
            setIsClicked2(false);
            setIsClicked3(false);
            setIsClicked4(false);
            setIsClicked5(false);
            setIsClicked6(true);
            setIsClicked7(false);
            setIsClicked8(false);
                          
        }

        if(location.pathname === "/manager/dashboard/comptability") {
            
            
            setIsClicked(true);
            setIsClicked2(false);
            setIsClicked3(false);
            setIsClicked4(false);
            setIsClicked5(false);
            setIsClicked6(false);
            setIsClicked7(true);
            setIsClicked8(false);
                          
        }

        if(location.pathname === "/manager/dashboard/litigesrecap") {
            
            
            setIsClicked(true);
            setIsClicked2(false);
            setIsClicked3(false);
            setIsClicked4(false);
            setIsClicked5(false);
            setIsClicked6(false);
            setIsClicked7(false);
            setIsClicked8(true);
                          
        }
        
        
      }, [location]);

     

    

    const handleDashboard = ()=>{

        return navigate('/manager/dashboard');

    }


    const handleUser = ()=>{

        return navigate('/manager/dashboard/user');

    }

   
    const handleCar = ()=>{  

        return navigate('/manager/dashboard/car');
        
    }

    const handleTransaction = ()=>{

        return navigate('/manager/dashboard/transaction');

    }

    const handleSupport = ()=>{

        return navigate('/manager/dashboard/support');


    }

    const handleLitigeRecap = ()=>{

        return navigate('/manager/dashboard/litigesrecap');


    }

    const handleCompta = ()=>{

        return navigate('/manager/dashboard/comptability');



    }

    const handleParameter = ()=>{

        return navigate('/manager/dashboard/parametre');

    }

    const handleDeconnexion = ()=>{

        const token = JSON.parse(localStorage.getItem('token'));

        return deconnexion(token).then((response)=>{

         if(response.message === "logout") {

            return localStorage.clear(), snackbar(document.querySelector("#root"),info, 'Deconnexion... ', 3000), setTimeout(()=>{return navigate('/')},4000)

         };

       });

    }


    
        return(


            <div className='side-container'>


                <img src={damamLogo} className='damamLogo'/>

                <div className='items-side'>


                    {/* <div className='item-search search-dash'>


                        <img src={search} className='search-icon'/>

                        <div className='search'>Recherche</div>


                    </div> */}

                    

                    <div className={ isClicked === false ?'item-search item-click ': 'item-search item-backgrd' } onClick={handleDashboard}>


                        <img src={home} className='search-icon'/>

                        <div className='search' >Dashboard</div>


                    </div>

                   

                    

                    <div className={ isClicked2 === false ?'item-search item-backgrd ': 'item-search item-click' } onClick={handleUser}>


                        <img src={person} className='search-icon'/>

                        <div  className='search'>Utilisateurs</div>


                    </div>

                    

                    <div className={ isClicked3 === false ?'item-search item-backgrd ': 'item-search item-click' } onClick={handleCar}>


                        <img src={car} className='search-icon'/>

                        <div className='search' >Véhicules</div>


                    </div>

                    {userRole === "SUPER_ADMIN" && (

                    <div className={ isClicked4 === false ?'item-search item-backgrd ': 'item-search item-click' } onClick={handleTransaction}>


                        <img src={move} className='search-icon'/>

                        <div className='search'>Transactions</div>


                    </div>

                    )}

                    

                    <div  className={ isClicked5 === false ?'item-search item-backgrd ': 'item-search item-click' }  onClick={handleSupport}>


                        <img src={phone} className='search-icon'/>

                        <div className='search'> Support</div>


                    </div>

                    <div  className={ isClicked8 === false ?'item-search item-backgrd ': 'item-search item-click' }  onClick={handleLitigeRecap}>


                        <img src={phone} className='search-icon'/>

                        <div className='search'>Litiges</div>


                    </div>

                    {/* <div className='item-search item-backgrd'>


                        <img src={lock} className='search-icon'/>

                        <div className='search'>Sécurité</div>


                    </div> */}

                    {userRole === "SUPER_ADMIN" && (

                    <div  className={ isClicked7 === false ?'item-search item-backgrd ': 'item-search item-click' }  onClick={handleCompta}>


                        <img src={arrowUpDown} className='search-icon'/>

                        <div className='search'>Comptabilité</div>


                    </div>

                    )}

                    {userRole === "SUPER_ADMIN" && (

                    <div  className={ isClicked6 === false ?'item-search item-backgrd ': 'item-search item-click' }   onClick={handleParameter}>


                        <img src={setting} className='search-icon'/>

                        <div className='search'>Paramètres</div>


                    </div>

                    )}

                    <div onClick={handleDeconnexion} className='item-search item-backgrd logout'>


                        <img src={out} className='search-icon'/>

                        <div className='search'>Logout</div>


                    </div>












                </div>







            </div>


        )





}