/** 
 *module responsible for managing all the application's routes
 * @param {} 
 * @return {html} jsx

*/


import {Routes,Route} from 'react-router-dom';
import { Manager } from '../views/Manager';
import { Dashboard } from '../widgets/Dashboard';
import { Login } from '../views/Login';
import { User } from '../widgets/User';
import {Car} from '../widgets/Car';
import {Transaction} from '../widgets/Transaction';
import { Support } from '../widgets/Support';
import { Parameter } from '../widgets/Parameter';
import { CarDetailsDocument } from '../widgets/CarDetailsDocument';
import { Comptability } from '../widgets/Comptability';
import {CommissionDetails} from '../widgets/CommissionDetails';
import { HistoriqueAccount } from '../widgets/HistoriqueAccount';
import { LitigesRecap } from '../widgets/LitigesRecap';



export function RoutesApp () {






  return(

      <>
      
      
      <Routes>

          <Route index element={<Login/>}/>

          <Route  path='/' element={<Login/>}/>


          <Route path='/manager' element={<Manager/>}>

            <Route path='/manager/dashboard' element={<Dashboard/>}/>

            <Route path='/manager/dashboard/user' element={<User/>}/>

            <Route path='/manager/dashboard/car' element={<Car/>}/>

            <Route path='/manager/dashboard/car/details' element={<CarDetailsDocument/>}/>

            <Route path='/manager/dashboard/transaction' element={<Transaction/>}/>

            <Route path='/manager/dashboard/litigesrecap' element={<LitigesRecap/>}/>

            <Route path='/manager/dashboard/support' element={<Support/>}/>

            <Route path='/manager/dashboard/comptability' element={<Comptability/>}/>

            <Route path='/manager/dashboard/comptability/commision/details' element={<CommissionDetails/>}/>

            <Route path='/manager/dashboard/comptability/account/details' element={<HistoriqueAccount/>}/>

            <Route path='/manager/dashboard/parametre' element={<Parameter/>}/>


          
          

          
          
          </Route>

          



      </Routes>
      
      
      
      
      
      
      
      
      
      
      
      </>


  )









 }