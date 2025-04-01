import React, { useState, useEffect } from "react";
import "../styles/index.css";
import { getCars } from "../modules/getCars";
import { validateCar } from "../modules/validateCar";
import info from "../assets/icons/info.svg";
import { snackbar } from "../widgets/snackbar";
import ArrowLineLeft from "../assets/icons/ArrowLineLeft.svg";
import ArrowLineRight from "../assets/icons/ArrowLineRight.svg";
import direction from "../assets/icons/direction.svg";
import search from "../assets/icons/search.png";

const CarManagerTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Gestion du debounce (3 secondes)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 3000);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchDataFromBackend = () => {
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

    getCars(
      `https://www.damam.zeta-messenger.com/api/carsDashboard${queryString}`,
      token
    )
      .then((response) => {
        const { current_page, data: carData, last_page } = response;
        console.log(response)
        setData(carData);
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

  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleValidate = (carID) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const data = { id: carID };

    validateCar(data, token).then((response) => {
      console.log(response);

      if(response.status === 200) {

        snackbar(
          document.querySelector("#root"),
          info,
          "Voiture validée avec succès",
          4000
        );

        setData(response.data.original.data)

        setSelectedCar(null)


      }

     
      

      if(response.status === 400) {

        snackbar(
          document.querySelector("#root"),
          info,
          "Merci d'activer le profil de cette utilisateur",
          5000
        );

        setSelectedCar(null)

      }
     
    });
  };

  const handleRject = (carID) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const data = { id: carID };

    validateCar(data, token).then((response) => {
      console.log(response);

      setSelectedCar(null)
      snackbar(
        document.querySelector("#root"),
        info,
        "Voiture désactivé avec succès",
        4000
      );
      setData(response.data.original.data)

    });
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
                <th onClick={() => sortData("user_name")}>
                  Nom complet
                  {sortConfig.key === "user_name" &&
                    (sortConfig.direction === "asc" ? " ↓" : " ↑")}
                </th>
                <th onClick={() => sortData("marque")}>
                  Marque
                  {sortConfig.key === "marque" &&
                    (sortConfig.direction === "asc" ? " ↓" : " ↑")}
                </th>
                <th onClick={() => sortData("carte_grise_number")}>
                  Numéro carte grise
                  {sortConfig.key === "carte_grise_number" &&
                    (sortConfig.direction === "asc" ? " ↓" : " ↑")}
                </th>
                <th onClick={() => sortData("validite_assurance")}>
                  Validité de l'assurance
                  {sortConfig.key === "validite_assurance" &&
                    (sortConfig.direction === "asc" ? " ↓" : " ↑")}
                </th>
                <th onClick={() => sortData("dernier_visite_technique")}>
                  Date du dernier contrôle
                  {sortConfig.key === "dernier_visite_technique" &&
                    (sortConfig.direction === "asc" ? " ↓" : " ↑")}
                </th>
                <th onClick={() => sortData("etat")}>
                  État
                  {sortConfig.key === "etat" &&
                    (sortConfig.direction === "asc" ? " ↓" : " ↑")}
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((car) => (
                  <tr
                    key={car.id}
                    onClick={() => setSelectedCar(car)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>
                      <div className="user-name">
                        <img
                          src={car.user_photo || "https://via.placeholder.com/40"}
                          alt={car.user_name}
                          className="user-photo"
                        />
                        {car.user_name || "N/A"}
                      </div>
                    </td>
                    <td>{car.marque || "N/A"}</td>
                    <td>{car.carte_grise_number || "N/A"}</td>
                    <td>{car.validite_assurance || "N/A"}</td>
                    <td>{car.dernier_visite_technique || "N/A"}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          car.etat === "ACTIF" ? "confirmed" : "rejected"
                        }`}
                      >
                        {car.etat}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    Aucun résultat trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {renderPagination()}

        {selectedCar && (
    <div className="modal-overlay" onClick={() => setSelectedCar(null)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={() => setSelectedCar(null)}>
          &times;
        </button>
      
       
        <div className="input-wrapper">
              <label htmlFor="name">Nom Proprietaire</label>
              <input  type="text"  value={selectedCar.name_proprietaire} className='input-login' readOnly  />
                                
          </div>
       

        <div className="input-wrapper">
              <label htmlFor="name">Marque</label>
              <input  type="text"  value={selectedCar.marque} className='input-login' readOnly  />
                                
          </div>

          <div className="input-wrapper">
              <label htmlFor="name">Modèle</label>
              <input  type="text"  value={selectedCar.model} className='input-login' readOnly  />
                                
          </div>

          <div className="input-wrapper">
              <label htmlFor="name">Année</label>
              <input  type="text"  value={selectedCar.year} className='input-login' readOnly  />
                                
          </div>

          <div className="input-wrapper">
              <label htmlFor="name">Type de carburage</label>
              <input  type="text"  value={selectedCar.type_carburage} className='input-login' readOnly  />
                                
          </div>

          <div className="input-wrapper">
              <label htmlFor="name">Caution</label>
              <input  type="number"  value={selectedCar.montant_caution} className='input-login' readOnly  />
                                
          </div>

          <div className="input-wrapper">
            <label htmlFor="bio_personnel">Condition de location</label>
            <textarea
              id="bio_personnel"
              value={selectedCar.condition_location}
              className="input-login textarea-readonly"
              readOnly
            />
          </div>

          {selectedCar.nom_chauffeur !== null && <>

          <div className="input-wrapper">
              <label htmlFor="name">Nom du chauffeur</label>
              <input  type="text"  value={selectedCar.nom_chauffeur} className='input-login' readOnly  />
                                
          </div>

          <div className="input-wrapper">
              <label htmlFor="name">Adresse du chauffeur</label>
              <input  type="text"  value={selectedCar.adresse_chauffeur} className='input-login' readOnly  />
                                
          </div>

          <div className="input-wrapper">
              <label htmlFor="name">Date de delivrance du permis</label>
              <input  type="text"  value={selectedCar.date_delivrance_permis_chauffeur} className='input-login' readOnly  />
                                
          </div>

          
          <div className="input-wrapper">
              <label htmlFor="name">Numero du permis du chauffeur</label>
              <input  type="text"  value={selectedCar.numero_permis_chauffeur} className='input-login' readOnly  />
                                
          </div>

          <div className="input-wrapper">
              <label htmlFor="name">Numero du téléphone chauffeur</label>
              <input  type="text"  value={selectedCar.phone_chauffeur} className='input-login' readOnly  />
                                
          </div> </>}

          

         

          <div className="input-wrapper">
              <label htmlFor="name">Numéro d'immatriculation</label>
              <input  type="text"  value={selectedCar.registration_numbe} className='input-login' readOnly  />
                                
          </div>
        
 
        <div className="input-wrapper">
              <label htmlFor="name">Numéro carte grise </label>
              <input  type="text"  value={selectedCar.carte_grise_number} className='input-login' readOnly  />
                                
          </div>
        

        <div className="input-wrapper">
              <label htmlFor="name">Validité de l'assurance </label>
              <input  type="text"  value={selectedCar.validite_assurance} className='input-login' readOnly  />
                                
          </div>
        

        <div className="input-wrapper">
              <label htmlFor="name">Date du dernier contrôle</label>
              <input  type="text"  value={selectedCar.dernier_visite_technique} className='input-login' readOnly  />
                                
          </div>

        {/* <p>
          <strong>État :</strong>{" "}
          {selectedCar.etat === "ACTIF" ? "ACTIF" : "INACTIF"}
        </p> */}
        <div className='photo-item'>

            <h5>Photo Assurance (recto)</h5>

              <div className='params-uploader-picture'>

              <img
                  src={selectedCar.img_assurance_recto}    
                  className='img-download'
                />

              </div>

        </div>

        <div className='photo-item'>

            <h5>Photo Assurance (verso)</h5>

              <div className='params-uploader-picture'>

              <img
                  src={selectedCar.img_assurance_verso}    
                  className='img-download'
                />

              </div>

        </div>

        <div className='photo-item'>

            <h5>Photo carte grise(recto)</h5>

              <div className='params-uploader-picture'>

              <img
                  src={selectedCar.img_carte_grise_recto}    
                  className='img-download'
                />

              </div>

        </div>

         <div className='photo-item'>

            <h5>Photo carte grise(verso)</h5>

              <div className='params-uploader-picture'>

              <img
                  src={selectedCar.img_carte_grise_verso}    
                  className='img-download'
                />

              </div>

        </div>

        <div className='photo-item'>

            <h5>Photo principal</h5>

              <div className='params-uploader-picture'>

              <img
                  src={selectedCar.photo}    
                  className='img-download'
                />

              </div>

        </div>

        <div className='photo-item'>

            <h5>Photo Lateral</h5>

              <div className='params-uploader-picture'>

              <img
                  src={selectedCar.img_laterale}    
                  className='img-download'
                />

              </div>

        </div>

        <div className='photo-item'>

            <h5>Photo Arrière</h5>

              <div className='params-uploader-picture'>

              <img
                  src={selectedCar.img_arriere}    
                  className='img-download'
                />

              </div>

        </div>

        <div className='photo-item'>

            <h5>Photo Interieur</h5>

              <div className='params-uploader-picture'>

              <img
                  src={selectedCar.img_interieur}    
                  className='img-download'
                />

              </div>

        </div>

        <div className='photo-item'>

            <h5>Photo Supplementaire</h5>

              <div className='params-uploader-picture'>

              <img
                  src={selectedCar.img_supplement}    
                  className='img-download'
                />

              </div>

        </div>

        

        
        <div className="modal-actions">
          <button className="confirm-btn" onClick={()=>handleValidate(selectedCar.id)}>Confirmer</button>
          <button className="reject-btn" onClick={()=>handleRject(selectedCar.id)}>Rejeter</button>
        </div>
      </div>
    </div>
  )}

      </div>
    </>
  );
};

export default CarManagerTable;
