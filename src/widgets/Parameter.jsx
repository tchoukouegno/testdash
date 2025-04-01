import { useEffect, useState } from "react";
import { HeaderDash } from "./HeaderDash";
import ParamsSubAccounts from "./ParamsSubAccounts";
import { getPercent } from "../modules/getPercent";
import { updatePercent } from "../modules/updatePercent";
import { getUser } from "../modules/getUser";
import { updateAdminData } from "../modules/updateAdminData"; // Créez cette fonction pour l'appel API
import info from "../assets/icons/info.svg";
import { snackbar } from "../widgets/snackbar";
import {checkChangePassword} from "../modules/checkChangePassword";





export function Parameter() {
  const [percentData, setPercentData] = useState({});
  const [adminData, setAdminData] = useState({
    email: "",
    oldPassword:"",
    newPassword:"",
  });
  const [updatedPercent, setUpdatedPercent] = useState({
    percent_tenant: "",
    percent_owner: "",
  });

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

    getPercent(token).then((response) => {
      console.log(response);
      setPercentData(response);

      setUpdatedPercent({
        percent_tenant: response.percent_tenant || "",
        percent_owner: response.percent_owner || "",
      });
    });

    getUser(token).then((response) => {
      console.log(response);
      setAdminData({
        email: response.email || "",
        password: "", // Le mot de passe n'est jamais récupéré pour des raisons de sécurité
      });
    });
  }, []);

  const handlePercentChange = (e) => {
    const { id, value } = e.target;
    setUpdatedPercent((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleAdminChange = (e) => {
    const { id, value } = e.target;
 
    setAdminData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmitPercent = () => {
    const token = JSON.parse(localStorage.getItem("token"));

    updatePercent(updatedPercent, token)
      .then((response) => {

        if(response.status === 200) {

          setPercentData(updatedPercent);

          snackbar(
              document.querySelector("#root"),
              info,
              "Taxe mis à jour",
              4000
            );
            return;
    


      }
        console.log("Mise à jour des taxes réussie :", response);
       
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour des taxes :", error);
      });
  };

  const handleSubmitAdmin = () => {
    const token = JSON.parse(localStorage.getItem("token"));

    // const data = {
    //   email: adminData.email,
    //   password: adminData.password,
    // };

    const dataModify = {email:adminData.email, oldPassword:adminData.oldPassword, newPassword:adminData.newPassword}

    checkChangePassword(dataModify, token)
      .then((response) => {

        console.log(dataModify)

        console.log(response)

          if(response.message === "veuillez remplire les champs") {
        
        
            return snackbar(document.querySelector("#root"),info, response.message, 3000);
               
          };

           if(response.message === "Mot de passe invalide") {
          
                   
              return snackbar(document.querySelector("#root"),info, response.message, 3000);
                 
            };
        
            if(response.message === "Entrez un nouveau mot de passe") {
          
                   
              return snackbar(document.querySelector("#root"),info, response.message, 3000);
                 
            };

            if(response.message === "mot de passe change") {
          
                   
              return setAdminData({
                email: "",
                oldPassword:"",
                newPassword:"",
              }) ,snackbar(document.querySelector("#root"),info, "Mot de passe changer avec succes.", 3000);
                 
            };

            if(response.message === "Pas Autorise") {
          
                   
              return snackbar(document.querySelector("#root"),info, "Vous n'avez pas d'autorisation.", 3000);
                 
            };

        // if(response.statut === 200) {

        //     snackbar(
        //         document.querySelector("#root"),
        //         info,
        //         "Vos Informations ont été mis à jour",
        //         4000
        //       );
        //       return;
      


        // }
       
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour des informations admin :", error);
        
      });
  };

  return (
    <div className="dashboard-container">
      <HeaderDash dashboardTitle={"Dashboard / Paramètres"} />

      <div className="dashboard-body">
        <div className="params-containers">
          <div className="params-info">
            <span className="params-title">Information personnelle de l'admin</span>

            <div className="params-taxe">
              <div className="input-wrapper params-identifiant">
                <label htmlFor="email" className="label-details-table">
                  Adresse Email
                </label>
                <input
                  type="text"
                  className="input-login"
                  id="email"
                  value={adminData.email}
                  onChange={handleAdminChange}
                  disabled
                />
              </div>

              <div className="input-wrapper params-identifiant">
                <label htmlFor="password" className="label-details-table">
                 Ancien Mot de passe
                </label>
                <input
                  type="password"
                  className="input-login"
                  id="oldPassword"
                  value={adminData.oldPassword}
                  onChange={handleAdminChange}
                  
                />
              </div>
              <div className="input-wrapper params-identifiant">
                <label htmlFor="password" className="label-details-table">
                 Nouveau Mot de passe
                </label>
                <input
                  type="password"
                  className="input-login"
                  id="newPassword"
                  value={adminData.newPassword}
                  onChange={handleAdminChange}
                  
                />
              </div>
            </div>

            <div className="button-taxe">
              <button
                type="button"
                className="create-button btt-taxe"
                onClick={handleSubmitAdmin}
              >
                Modifier
              </button>
            </div>
          </div>
        </div>

        <div className="params-containers">
          <div className="params-info">
            <span className="params-title">Définissez vos Taxes sur les transactions</span>

            <div className="params-taxe">
              <div className="input-wrapper params-identifiant">
                <label htmlFor="percent_tenant" className="label-details-table">
                  Taxe sur le Locataire %
                </label>
                <input
                  type="number"
                  className="input-login"
                  id="percent_tenant"
                  value={updatedPercent.percent_tenant}
                  onChange={handlePercentChange}
                />
              </div>

              <div className="input-wrapper params-identifiant">
                <label htmlFor="percent_owner" className="label-details-table">
                  Taxe sur le Propriétaire %
                </label>
                <input
                  type="number"
                  className="input-login"
                  id="percent_owner"
                  value={updatedPercent.percent_owner}
                  onChange={handlePercentChange}
                />
              </div>
            </div>

            <div className="button-taxe-taxe">
              <button
                type="button"
                className="create-button btt-taxe"
                onClick={handleSubmitPercent}
              >
                Modifier
              </button>
            </div>
          </div>
        </div>

        <ParamsSubAccounts />
      </div>
    </div>
  );
}
