import React, { useState, useEffect } from "react";
import "../styles/index.css";
import iconAccount from "../assets/icons/iconAccount.png";
import exchange from "../assets/icons/exchange.png";
import { getAccounts } from "../modules/getAccounts";
import { exChangeMoney } from "../modules/exChangeMoney";
import info from "../assets/icons/info.svg";
import { snackbar } from "../widgets/snackbar";
import { withdraw } from "../modules/withdraw";
import { useNavigate } from "react-router-dom";


const SubAccounts = ({updateAccount}) => {
  const [accounts, setAccounts] = useState([]);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [transferData, setTransferData] = useState({
    sender: "",
    receiver: "",
    amount: "",
  });
  const [withdrawData, setWithdrawData] = useState({
    account_id: "",
    payment_method: "",
    amount: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

    getAccounts(token).then((response) => {
      console.log(response);
      setAccounts(response);
    });
  }, []);

  const handleTransferChange = (e) => {
    const { name, value } = e.target;
    setTransferData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleWithdrawChange = (e) => {
    const { name, value } = e.target;
    setWithdrawData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTransferSubmit = (e) => {
    e.preventDefault();
    const dataToSend = {
      sender_account_id: transferData.sender,
      receiver_account_id: transferData.receiver,
      amount: transferData.amount,
    };

    const token = JSON.parse(localStorage.getItem("token"));

    exChangeMoney(dataToSend, token).then((response) => {
      console.log(response);

      if (response.status === 201) {
        setAccounts(response.data);
        snackbar(
          document.querySelector("#root"),
          info,
          "Transfert effectué avec succès",
          4000
        );
        return;
      }

      if (response.message === "Vous ne pouvez pas transférer dans le même compte") {
        snackbar(
          document.querySelector("#root"),
          info,
          "Le compte expéditeur et le compte destinataire ne doivent pas être identiques",
          4000
        );
        return;
      }

      if (response.status === 400) {
        snackbar(
          document.querySelector("#root"),
          info,
          "Solde insuffisant dans le compte expéditeur",
          4000
        );
        return;
      }
    });

    setShowTransferModal(false);
  };

  const handleWithdrawSubmit = (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("token"));

    console.log(withdrawData)
   

    withdraw(withdrawData,token).then((response)=>{

      // setAccounts(response.data)

      if(response.status === 400) {

        snackbar(
          document.querySelector("#root"),
          info,
          "Solde insuffisant",
          4000
        );
    
        setShowWithdrawModal(false);

        
      }

      snackbar(
        document.querySelector("#root"),
        info,
        "Retrait effectuer avec succés",
        4000
      );

      setAccounts(response.data)

      updateAccount(response.walletDetail)
  
      setShowWithdrawModal(false);

      console.log(response)


      console.log("Données de retrait :", response);

    })

    
  };

  const handleAccountDetail = (accountId)=>{


    return  navigate("/manager/dashboard/comptability/account/details", { state:accountId });


  }

  return (
    <div className="accounts-container">
      <div className="accounts-header">
        <h1 className="accounts-title">Mes Comptes de Gestion</h1>
        <div className="button-group">
          <button
            className="transfer-button"
            onClick={() => setShowTransferModal(true)}
          >
            <img src={exchange} alt="exchange" /> Transfert Compte à Compte
          </button>
          <button
            className="withdraw-button"
            onClick={() => setShowWithdrawModal(true)}
            style={{ backgroundColor: "#E94E1B", color: "#fff" }}
          >
            Retrait Compte
          </button>
        </div>
      </div>

      <div className="accounts-grid">
        {accounts.map((account) => (
          <div key={account.id} className="account-card" onClick={()=>handleAccountDetail(account.id)}>
            <div className="account-icon">
              <img src={iconAccount} alt="Account Icon" />
            </div>
            <h4 className="account-label">{account.name}</h4>
            <div className="account-info">
              <span className="account-status">• SOLDE</span>
              <span className="account-balance">{account.balance} XAF</span>
            </div>
            <p className="account-percentage">Pourcentage : {account.percent}%</p>
          </div>
        ))}
      </div>

      {/* Modal de transfert */}
      {showTransferModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="modal-close" onClick={() => setShowTransferModal(false)}>
              &times;
            </button>
            <form onSubmit={handleTransferSubmit}>
              <div className="form-group">
                <label htmlFor="sender">Compte Expéditeur</label>
                <select
                  name="sender"
                  id="sender"
                  value={transferData.sender}
                  onChange={handleTransferChange}
                  required
                >
                  <option value="">Sélectionner un compte</option>
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="receiver">Compte Destinataire</label>
                <select
                  name="receiver"
                  id="receiver"
                  value={transferData.receiver}
                  onChange={handleTransferChange}
                  required
                >
                  <option value="">Sélectionner un compte</option>
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="amount">Montant</label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  value={transferData.amount}
                  onChange={handleTransferChange}
                  placeholder="5000 XAF"
                  required
                />
              </div>

              <button type="submit" className="transfer-modal-button">
                Transférer
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal de retrait */}
      {showWithdrawModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button
              className="modal-close"
              onClick={() => setShowWithdrawModal(false)}
            >
              &times;
            </button>
            <form onSubmit={handleWithdrawSubmit}>
              <div className="form-group">
                <label htmlFor="payment_method">Compte de Retrait</label>
                <select
                  name="payment_method"
                  id="payment_method"
                  value={withdrawData.payment_method}
                  onChange={handleWithdrawChange}
                  required
                >
                  <option value="">Sélectionner un compte</option>
                  <option value="OM">OM</option>
                  <option value="MOMO">MOMO</option>
                  <option value="PAYPAL">PAYPAL</option>
                  <option value="CART">CART</option>
                 
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="account_id">Compte de Gestion</label>
                <select
                  name="account_id"
                  id="account_id"
                  value={withdrawData.account_id}
                  onChange={handleWithdrawChange}
                  required
                >
                  <option value="">Sélectionner un compte</option>
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="amount">Montant</label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  value={withdrawData.amount}
                  onChange={handleWithdrawChange}
                  placeholder="5000 XAF"
                  required
                />
              </div>

              <button type="submit" className="withdraw-modal-button" style={{ backgroundColor: "#E94E1B", color: "#fff" }}>
                Retrait
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubAccounts;
