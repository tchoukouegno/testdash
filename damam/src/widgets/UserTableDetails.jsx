import React, { useState, useEffect } from "react";
import "../styles/index.css";
import { getUsers } from "../modules/getUsers";
import ArrowLineLeft from '../assets/icons/ArrowLineLeft.svg';
import ArrowLineRight from '../assets/icons/ArrowLineRight.svg';
import {statusUser} from '../modules/statusUser';
import info from "../assets/icons/info.svg";
import { snackbar } from "../widgets/snackbar";
import direction from "../assets/icons/direction.svg";
import search from "../assets/icons/search.png";

const UserTableDetails = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [paginationLinks, setPaginationLinks] = useState({
    next: null,
    previous: null,
  });

    // Debounce for search
    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedQuery(searchQuery);
      }, 3000);
  
      return () => clearTimeout(timer);
    }, [searchQuery]);

  const fetchDataFromBackend = (url) => {
    setIsLoading(true);
    const token = JSON.parse(localStorage.getItem("token"));

    const queryParams = [];
    if (sortConfig.key) {
      queryParams.push(`order_by=${sortConfig.key}`);
      queryParams.push(`order_direction=${sortConfig.direction}`);
    }
    if (debouncedQuery) {
      queryParams.push(`search=${debouncedQuery}`);
    }
    queryParams.push(`page=${currentPage}`);

    const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";

   

    getUsers(
     `https://www.damam.zeta-messenger.com/api/users${queryString}`,
      token
    )
      .then((response) => {

        console.log(response)
        const {
          current_page,
          data: userData,
          last_page,
          
        } = response;


console.log(response)
        

        setData(userData);
        setCurrentPage(current_page);
        setTotalPages(last_page);
    
      
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des données :", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchDataFromBackend();
  }, [currentPage, sortConfig, debouncedQuery]);



  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };


 
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const truncateText = (text, maxLength = 20) => {
    return text && text.length > maxLength
      ? `${text.slice(0, maxLength)}...`
      : text;
  };


 
  
  const renderPagination = () => {
    const pages = [];
    const displayRange = 2;
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - displayRange && i <= currentPage + displayRange)
      ) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={currentPage === i ? "active" : ""}
          >
            {i}
          </button>
        );
      } else if (
        i === currentPage - displayRange - 1 ||
        i === currentPage + displayRange + 1
      ) {
        pages.push(<span key={`ellipsis-${i}`}>...</span>);
      }
    }

    return (
      <div className="pagination">
        <img
          onClick={handlePrevious}
          disabled={currentPage === 1}
          src={ArrowLineLeft}
          className="arrow"
          alt="arrow-left"
        />
        {pages}
        <img
          onClick={handleNext}
          disabled={currentPage === totalPages}
          src={ArrowLineRight}
          className="arrow"
          alt="arrow-right"
        />
      </div>
    );
  };


  const handleStatusConfirm = (userID)=>{

    const token = JSON.parse(localStorage.getItem("token"));

    const data = {
      status: "ACTIF",
      id: userID
    }

    statusUser(data, token).then((response)=>{

      console.log(response)


      if (response.message === "Le modification effectuer") {
        snackbar(
          document.querySelector("#root"),
          info,
          "Profil utilisateur activé avec succès",
          4000
        );
        return setData(response.user.data), setSelectedUser(null)
      }


    })

  }

  const handleStatusReject = (userID)=>{

    const token = JSON.parse(localStorage.getItem("token"));

    const data = {
      status: "REFUSED",
      id: userID
    }

    statusUser(data, token).then((response)=>{

      console.log(response)

      if (response.message === "Le modification effectuer") {
        snackbar(
          document.querySelector("#root"),
          info,
          "Profil utilisateur désactivé avec succès",
          4000
        );
        return setData(response.user.data), setSelectedUser(null);
      }


    })

  }

  const handleRowClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <>

<div className='search-bar-caontainer'>

<img  src={direction}  alt='filter direction'/>

<div className='filter-search'>

    <div className='item-search search-dash search-bar'>


        <img src={search} className='search-icon'/>

        <input
              autoFocus
              className="search input-search"
              placeholder="Recherche"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

        {/* <input autoFocus className='search input-search' placeholder='Recherche'/>            */}


    </div>

   

</div>
</div>
    <div className="user-table">
      {isLoading ? (
        <div className="loader">Chargement...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("name")}>
                Nom complet
                <span className="sort-icon">
                  {sortConfig.key === "name" &&
                    (sortConfig.direction === "asc" ? " ↓" : " ↑")}
                </span>
              </th>
              <th onClick={() => handleSort("gender")}>
                Sexe
                <span className="sort-icon">
                  {sortConfig.key === "gender" &&
                    (sortConfig.direction === "asc" ? " ↓" : " ↑")}
                </span>
              </th>
              <th onClick={() => handleSort("adresse")}>
                Adresse
                <span className="sort-icon">
                  {sortConfig.key === "adresse" &&
                    (sortConfig.direction === "asc" ? " ↓" : " ↑")}
                </span>
              </th>
              <th onClick={() => handleSort("experienceYear")}>
                Année d'expérience
                <span className="sort-icon">
                  {sortConfig.key === "experienceYear" &&
                    (sortConfig.direction === "asc" ? " ↓" : " ↑")}
                </span>
              </th>
              <th onClick={() => handleSort("numero_permis")}>
                Numéro de permis
                <span className="sort-icon">
                  {sortConfig.key === "numero_permis" &&
                    (sortConfig.direction === "asc" ? " ↓" : " ↑")}
                </span>
              </th>
              <th onClick={() => handleSort("date_delivrance")}>
                Date de délivrance
                <span className="sort-icon">
                  {sortConfig.key === "date_delivrance" &&
                    (sortConfig.direction === "asc" ? " ↓" : " ↑")}
                </span>
              </th>
              <th onClick={() => handleSort("date_expiration")}>
                Date d'expiration
                <span className="sort-icon">
                  {sortConfig.key === "date_expiration" &&
                    (sortConfig.direction === "asc" ? " ↓" : " ↑")}
                </span>
              </th>
              <th onClick={() => handleSort("status")}>
                Statut
                <span className="sort-icon">
                  {sortConfig.key === "status" &&
                    (sortConfig.direction === "asc" ? " ↓" : " ↑")}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ?(
            
            data.map((user) => (
              <tr
                key={user.id}
                onClick={() => handleRowClick(user)}
                style={{ cursor: "pointer" }}
                title={`Cliquez pour voir les détails de ${user.name}`}
              >
                <td className="truncate-text" title={user.name}>
                  <div className="user-name">
                    <img
                      src={user.photo || "https://via.placeholder.com/40"}
                      alt={user.name}
                      className="user-photo"
                    />
                     {truncateText(user.name)}
                  </div>
                </td>
                <td>{user.gender}</td>
                <td className="truncate-text" title={user.adresse}>
                  {truncateText(user.adresse)}
                </td>
                <td>{user.annees_experience || "N/A"}</td>
                <td>{user.numero_permis || "N/A"}</td>
                <td>{user.date_delivrance || "N/A"}</td>
                <td>{user.date_expiration || "N/A"}</td>
                <td>
                  <span
                    className={`status-badge ${
                      user.status === "ACTIF" ? "confirmed" : "rejected"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (<tr>
            <td colSpan="9" style={{ textAlign: "center" }}>
              Aucun résultat trouvé
            </td>
          </tr>) }
          </tbody>
        </table>
      )}

      {renderPagination()}

      {selectedUser && (
        <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedUser(null)}>
              &times;
            </button>

            <div className="profil-user-container">

            <img
                src={selectedUser.photo}
                alt="user"
                className="user-photo-detail"
              />


            </div>
           

            

              <div className="input-wrapper">
                  <label htmlFor="name">Nom complet</label>
                  <input  type="text"  value={selectedUser.name} className='input-login' readOnly  />
                                    
              </div>

              <div className="input-wrapper">
                  <label htmlFor="name">Sexe</label>
                  <input  type="text"  value={selectedUser.gender} className='input-login' readOnly  />
                                    
              </div>

              <div className="input-wrapper">
                  <label htmlFor="name">Adresse</label>
                  <input  type="text"  value={selectedUser.adresse} className='input-login' readOnly  />
                                    
              </div>

              <div className="input-wrapper">
                  <label htmlFor="name">Telephone</label>
                  <input  type="text"  value={selectedUser.phone} className='input-login' readOnly  />
                                    
              </div>

              <div className="input-wrapper">
                  <label htmlFor="name">Type de profil</label>
                  <input  type="text"  value={selectedUser.role} className='input-login' readOnly  />
                                    
              </div>

             <div className="input-wrapper">
                <label htmlFor="bio_personnel">Biographie personnel</label>
                <textarea
                  id="bio_personnel"
                  value={selectedUser.bio_personnel}
                  className="input-login textarea-readonly"
                  readOnly
                />
              </div>

              <div className='photo-item'>

                <h5>Photo CNI (verso)</h5>

                  <div className='params-uploader-picture'>

                  <img
                      src={selectedUser.img_cni_recto}    
                      className='img-download'
                    />

                  </div>


              </div>

               <div className='photo-item'>

                <h5>Photo CNI (verso)</h5>

                  <div className='params-uploader-picture'>

                  <img
                      src={selectedUser.img_cni_verso}    
                      className='img-download'
                    />

                  </div>


              </div>

              <div className="input-wrapper">
                  <label htmlFor="name">Année d'expérience</label>
                  <input  type="text"  value={selectedUser.annees_experience} className='input-login' readOnly  />
                                    
              </div>

              <div className="input-wrapper">
                  <label htmlFor="name">Numéro permis de conduire</label>
                  <input  type="text"  value={selectedUser.numero_permis} className='input-login' readOnly  />
                                    
              </div>

              <div className="input-wrapper">
                  <label htmlFor="name">Date de délivrance</label>
                  <input  type="text"  value={selectedUser.date_delivrance} className='input-login' readOnly  />
                                    
              </div>

              <div className="input-wrapper">
                  <label htmlFor="name">Date d'expiration</label>
                  <input  type="text"  value={selectedUser.date_expiration} className='input-login' readOnly  />
                                    
              </div>

             

               <div className='photo-item'>

                <h5>Photo du permis de conduire (recto)</h5>

                  <div className='params-uploader-picture'>

                  <img
                      src={selectedUser.img_permis_recto}    
                      className='img-download'
                    />

                  </div>


              </div>

               <div className='photo-item'>

                <h5>Photo du permis de conduire (verso)</h5>

                  <div className='params-uploader-picture'>

                  <img
                      src={selectedUser.img_permis_verso}    
                      className='img-download'
                    />

                  </div>


              </div>

               

              


          
           
           
          
            {/* <div>
              <h4>Photos :</h4>
              <img
                src={selectedUser.photo}
                alt="user"
                className="user-photo"
              />
            </div> */}
            <div className="modal-actions">
              <button className="confirm-btn" onClick={()=>handleStatusConfirm(selectedUser.id)}>Confirmer</button>
              <button className="reject-btn" onClick={()=>handleStatusReject(selectedUser.id)}>Rejeter</button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default UserTableDetails;
