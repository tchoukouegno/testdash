import React, { useState, useEffect } from "react";
import "../styles/index.css";
import { getLitiges } from "../modules/getLitiges";
import ArrowLineLeft from "../assets/icons/ArrowLineLeft.svg";
import ArrowLineRight from "../assets/icons/ArrowLineRight.svg";
import direction from "../assets/icons/direction.svg";
import search from "../assets/icons/search.png";

const LitigesRecapTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce for search
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

    getLitiges(
      `https://www.damam.zeta-messenger.com/api/user_litige${queryString}`,
      token
    )
      .then((response) => {
        const { current_page, data: transactionData, last_page } = response;

        setData(transactionData);
        setCurrentPage(current_page);
        setTotalPages(last_page || 1);
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

  return (
    <>
      <div className="search-bar-caontainer">
        <img src={direction} alt="filter direction" />
        <div className="filter-search">
          <div className="item-search search-dash search-bar">
            <img src={search} className="search-icon" alt="search-icon" />
            <input
              autoFocus
              className="search input-search"
              placeholder="Recherche"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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
                <th onClick={() => handleSort("tenant_name")}>
                  Locataire
                  {sortConfig.key === "tenant_name" &&
                    (sortConfig.direction === "asc" ? " ↓" : " ↑")}
                </th>
                <th onClick={() => handleSort("owner_name")}>
                  Propriétaire
                  {sortConfig.key === "owner_name" &&
                    (sortConfig.direction === "asc" ? " ↓" : " ↑")}
                </th>
                <th onClick={() => handleSort("state")}>
                  Statut
                  {sortConfig.key === "state" &&
                    (sortConfig.direction === "asc" ? " ↓" : " ↑")}
                </th>
                <th onClick={() => handleSort("montant")}>
                  Montant
                  {sortConfig.key === "montant" &&
                    (sortConfig.direction === "asc" ? " ↓" : " ↑")}
                </th>
                <th onClick={() => handleSort("created_at")}>
                  Date
                  {sortConfig.key === "created_at" &&
                    (sortConfig.direction === "asc" ? " ↓" : " ↑")}
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((transaction) => (
                  <tr
                    key={transaction.booking_id}
                    onClick={() => setSelectedTransaction(transaction)}
                    style={{ cursor: "pointer" }}
                  >
                    <td title={transaction.tenant_name || "---"}>
                      {truncateText(transaction.tenant_name || "---")}
                    </td>
                    <td title={transaction.owner_name || "---"}>
                      {truncateText(transaction.owner_name || "---")}
                    </td>
                    <td>{transaction.state || "---"}</td>
                    <td>{transaction.montant || "---"} XAF</td>
                    <td>
                      {transaction.created_at
                        ? new Date(transaction.created_at).toLocaleDateString()
                        : "---"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    Aucun résultat trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {renderPagination()}

        {selectedTransaction && (
          <div
            className="modal-overlay"
            onClick={() => setSelectedTransaction(null)}
          >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button
                className="close-btn"
                onClick={() => setSelectedTransaction(null)}
              >
                &times;
              </button>
              <h3>Détails du Litige</h3>
              <p>
                <strong>Locataire :</strong> {selectedTransaction.tenant_name}
              </p>
              <p>
                <strong>Propriétaire :</strong>{" "}
                {selectedTransaction.owner_name}
              </p>
              <p>
                <strong>Statut :</strong> {selectedTransaction.state}
              </p>
              <p>
                <strong>Montant :</strong> {selectedTransaction.montant || "---"} XAF
              </p>
              {/* <p>
                <strong>Description :</strong>{" "}
                {selectedTransaction.description || "---"}
              </p> */}

              <div className="input-wrapper">
                <label htmlFor="bio_personnel">Description du litiges</label>
                <textarea
                  id="bio_personnel"
                  value={selectedTransaction.description}
                  className="input-login textarea-readonly"
                  readOnly
                />
              </div>
               <div className='photo-item'>

                <h5>Photo de Signalement du litiges</h5>

                  <div className='params-uploader-picture'>

                  <img
                      src={selectedTransaction.piece_justificatifs}    
                      className='img-download'
                    />

                  </div>


              </div>
              <div className="input-wrapper">
                <label htmlFor="bio_personnel">Conclusion du litiges</label>
                <textarea
                  id="bio_personnel"
                  value={selectedTransaction.solution}
                  className="input-login textarea-readonly"
                  readOnly
                />
              </div>
              {/* <img
                src={selectedTransaction.piece_justificatifs}
                alt="Pièce justificative"
                style={{ maxWidth: "100%" }}
              /> */}
              <p>
                <strong>Date :</strong>{" "}
                {selectedTransaction.created_at
                  ? new Date(selectedTransaction.created_at).toLocaleString()
                  : "---"}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LitigesRecapTable;
