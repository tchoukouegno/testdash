import React, { useState, useEffect } from "react";
import '../styles/index.css';
import { getCommission } from "../modules/getCommission";
import { walletDetail } from "../modules/walletDetail";
import { useNavigate } from "react-router-dom";

const Commission = ({data}) => {
 



  const navigate = useNavigate();



  const handleAccountDetailsOM = ()=>{

        return  navigate("/manager/dashboard/comptability/commision/details", { state:"OM" });

  }

  const handleAccountDetailsMOMO = ()=>{
  

        return  navigate("/manager/dashboard/comptability/commision/details", { state:"MOMO" });

  }

  const handleAccountDetailsPAYPAL = ()=>{


        return  navigate("/manager/dashboard/comptability/commision/details", { state:"PAYPAL" });


  }

  return (
    <div className="commission-container">
      {/* Titre */}
      <h1 className="commission-title">Compte de commission</h1>

      {/* Afficher les trois blocs */}
      <div className="commission-blocs">
        {/* Orange Money */}
        <div className="commission-bloc" onClick={handleAccountDetailsOM}>
          <h4 className="commission-header orange">Orange Money</h4>
          {/* <p className="commission-date">From 1-31 March, 2022</p> */}
          <div className="commission-balance">
            <div className="commission-bar orange"></div>
            <div>
              <p className="commission-label">Solde</p>
              <h2 className="commission-amount">
                {data.dataOm} XAF
              </h2>
            </div>
          </div>
        </div>

        {/* MOMO */}
        <div className="commission-bloc" onClick={handleAccountDetailsMOMO}>
          <h4 className="commission-header momo">MOMO</h4>
          {/* <p className="commission-date">From 1-31 March, 2022</p> */}
          <div className="commission-balance">
            <div className="commission-bar momo"></div>
            <div>
              <p className="commission-label">Solde</p>
              <h2 className="commission-amount">
                {data.dataMomo} XAF
              </h2>
            </div>
          </div>
        </div>

        {/* PayPal */}
        <div className="commission-bloc" onClick={handleAccountDetailsPAYPAL}>
          <h4 className="commission-header paypal">PayPal</h4>
          {/* <p className="commission-date">From 1-31 March, 2022</p> */}
          <div className="commission-balance">
            <div className="commission-bar paypal"></div>
            <div>
              <p className="commission-label">Solde</p>
              <h2 className="commission-amount">
                {data.dataPaypal} XAF
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Total */}
      <h3 className="commission-total">
        Total : {data.total} XAF
      </h3>
    </div>
  );
};

export default Commission;
