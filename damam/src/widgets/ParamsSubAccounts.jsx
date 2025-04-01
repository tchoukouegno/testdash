import React, { useState, useEffect } from "react";
import "../styles/index.css";
import { createAccount } from "../modules/createAccount";
import info from "../assets/icons/info.svg";
import { snackbar } from "../widgets/snackbar";
import { getAccounts } from "../modules/getAccounts";
import { deletedAccounts } from "../modules/deletedAccounts";
import { updateAccount } from "../modules/updateAccount";

const ParamsSubAccounts = () => {
  const [accounts, setAccounts] = useState([]); // Liste des comptes récupérés du backend
  const [newAccount, setNewAccount] = useState({
    label: "",
    percentage: "",
  }); // Données pour un nouveau compte
  const [editingAccount, setEditingAccount] = useState(null); // Compte en cours de modification
  const [showModal, setShowModal] = useState(false); // État pour afficher/masquer la modal
  const [accountToDelete, setAccountToDelete] = useState(null); // Compte à supprimer
  const [showEditModal, setShowEditModal] = useState(false); // État pour afficher/masquer la modal de modification

  // Charger les comptes depuis le backend
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    getAccounts(token).then((response) => {
      setAccounts(response);
    });
  }, []);

  // Gérer les changements dans les champs d'entrée
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingAccount) {
      setEditingAccount((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setNewAccount((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Ajouter un nouveau compte
  const handleCreateAccount = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("token"));
    const data = {
      name: newAccount.label,
      percent: newAccount.percentage,
    };

    createAccount(data, token).then((response) => {
      if (response.message === "vous avez atteint le pourcentage de 100%") {
        snackbar(
          document.querySelector("#root"),
          info,
          "Vous ne pouvez pas dépasser le seuil de 100%",
          4000
        );
        return;
      }

      if (response.status === 201) {
        setAccounts((prevAccounts) => [...prevAccounts, response.data]);
        setNewAccount({ label: "", percentage: "" });
        snackbar(document.querySelector("#root"), info, "Création réussie", 4000);
      }
    });
  };

  // Modifier un compte existant via la modal
  const handleEditAccount = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("token"));
    const data = {
        id: editingAccount.id,
        name: editingAccount.name,
        percent: editingAccount.percent,
    };
console.log(data)
    updateAccount(data,token).then((response)=>{

        console.log(response)

        if (response.message === "vous avez atteint le pourcentage de 100%") {
            snackbar(
              document.querySelector("#root"),
              info,
              "Vous ne pouvez pas dépasser le seuil de 100%",
              4000
            );
            return;
          }
    

       

              // Appeler l'API pour sauvegarder les modifications (à implémenter)
    setAccounts((prevAccounts) =>
        prevAccounts.map((account) =>
          account.id === editingAccount.id ? editingAccount : account
        )
      );

      return snackbar(document.querySelector("#root"), info, "Modifier avec succès", 4000);


    })

   
  
    setEditingAccount(null);
    setShowEditModal(false);
  };

  // Gérer la suppression d'un compte
  const handleDeleteAccount = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const data = { id: accountToDelete.id };

    deletedAccounts(data, token).then((response) => {

      if(response.status === 400) {

        snackbar(
          document.querySelector("#root"),
          info,
          "Vous ne pouvez pas supprimer un compte fournie",
          4000
        );
        return;



      }

      console.log("Réponse suppression:", response);
    });

    setAccounts((prevAccounts) =>
      prevAccounts.filter((account) => account.id !== accountToDelete.id)
    );
    setAccountToDelete(null);
    setShowModal(false);
  };

  // Gérer l'ouverture de la modal de suppression
  const confirmDeleteAccount = (account) => {
    setAccountToDelete(account);
    setShowModal(true);
  };

  // Ouvrir la modal de modification
  const openEditModal = (account) => {
    setEditingAccount(account);
    setShowEditModal(true);
  };

  return (
    <div className="params-container">
      <h2 className="params-title">Créer vos  comptes de gestion</h2>

      {/* Formulaire pour créer un nouveau compte */}
      <form className="params-form" onSubmit={handleCreateAccount}>
        <div className="form-group">
          <label htmlFor="label">Libellé du compte</label>
          <input
            type="text"
            id="label"
            name="label"
            value={newAccount.label}
            onChange={handleInputChange}
            placeholder="Entrez le libellé"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="percentage">Pourcentage</label>
          <input
            type="number"
            id="percentage"
            name="percentage"
            value={newAccount.percentage}
            onChange={handleInputChange}
            placeholder="Entrez le pourcentage"
            required
          />
        </div>
        <button type="submit" className="create-button">
          Créer
        </button>
      </form>

      {/* Liste des comptes */}
      <div className="accounts-list">
        {accounts?.map((account) => (
          <div key={account.id} className="account-item">
            <div>
              <p className="account-label">
                Libellé : <strong>{account.name}</strong>
              </p>
              <p className="account-percentage">
                Pourcentage : <strong>{account.percent}%</strong>
              </p>
            </div>
            <div className="account-actions">
              <button
                className="edit-button"
                onClick={() => openEditModal(account)}
              >
                Modifier
              </button>
              <button
                className="delete-button"
                onClick={() => confirmDeleteAccount(account)}
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de modification */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Modifier le compte</h3>
            <form onSubmit={handleEditAccount}>
              <div className="form-group">
                <label htmlFor="edit-label">Libellé du compte</label>
                <input
                  type="text"
                  id="edit-label"
                  name="name"
                  value={editingAccount.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-percentage">Pourcentage</label>
                <input
                  type="number"
                  id="edit-percentage"
                  name="percent"
                  value={editingAccount.percent}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="butt-container">
              <button type="submit" className="confirm-button">
                Enregistrer
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={() => setShowEditModal(false)}
              >
                Annuler
              </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de confirmation de suppression */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Êtes-vous sûr de vouloir supprimer ce compte ?</p>
            <div className="modal-actions">
              <button
                className="cancel-button"
                onClick={() => setShowModal(false)}
              >
                Annuler
              </button>
              <button className="confirm-button" onClick={handleDeleteAccount}>
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParamsSubAccounts;
