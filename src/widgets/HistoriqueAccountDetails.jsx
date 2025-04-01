import React, { useState, useEffect } from "react";
import "../styles/index.css";
import ArrowLineLeft from "../assets/icons/ArrowLineLeft.svg";
import ArrowLineRight from "../assets/icons/ArrowLineRight.svg";
import direction from "../assets/icons/direction.svg";
import search from "../assets/icons/search.png";
import { historiqueAccount } from "../modules/historiqueAccount";

const HistoriqueAccountDetails = ({ accountId }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce for search input
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

    const requestData = {
        accountId : accountId,
    };

    historiqueAccount(
      `https://www.damam.zeta-messenger.com/api/historique_account${queryString}`,
      token,
      requestData
    )
      .then((response) => {

        console.log(response)
        const { current_page, data: transactionData, last_page } = response;

        setData(transactionData);
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
  }, [currentPage, sortConfig, debouncedQuery, accountId]);

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

  const translateTransactionType = (type) => {
    switch (type) {
      case "TRANSFER":
        return "Transfert";
      case "WITHDRAWAL":
        return "Retrait";
      case "DEPOSIT":
        return "Depot";
      default:
        return "---";
    }
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
            <img src={search} className="search-icon" alt="search icon" />
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
                <th onClick={() => handleSort("envoyeur_name")}>
                  Envoyeur
                  {sortConfig.key === "envoyeur_name" &&
                    (sortConfig.direction === "asc" ? " ↓" : " ↑")}
                </th>
                <th onClick={() => handleSort("recepteur_name")}>
                  Destinataire
                  {sortConfig.key === "recepteur_name" &&
                    (sortConfig.direction === "asc" ? " ↓" : " ↑")}
                </th>
                {/* <th onClick={() => handleSort("payment_method")}>
                  Mode de Paiement
                  {sortConfig.key === "payment_method" &&
                    (sortConfig.direction === "asc" ? " ↓" : " ↑")}
                </th> */}
                <th onClick={() => handleSort("amount")}>
                  Montant
                  {sortConfig.key === "amount" &&
                    (sortConfig.direction === "asc" ? " ↓" : " ↑")}
                </th>
                <th onClick={() => handleSort("transaction_type")}>
                  Type de Transaction
                  {sortConfig.key === "transaction_type" &&
                    (sortConfig.direction === "asc" ? " ↓" : " ↑")}
                </th>
                <th onClick={() => handleSort("percentage")}>
                  Pourcentage
                  {sortConfig.key === "percentage" &&
                    (sortConfig.direction === "asc" ? " ↓" : " ↑")}
                </th>
                <th onClick={() => handleSort("date")}>
                  Date
                  {sortConfig.key === "date" &&
                    (sortConfig.direction === "asc" ? " ↓" : " ↑")}
                </th>
                <th onClick={() => handleSort("date")}>
                  Solde
                  {sortConfig.key === "solde" &&
                    (sortConfig.direction === "asc" ? " ↓" : " ↑")}
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.length > 0 ? (
                data?.map((transaction) => (
                  
                  <tr
                    key={transaction.id}
                    onClick={() => setSelectedTransaction(transaction)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>
                      {transaction?.envoyeur_name ? transaction?.envoyeur_name : "---"}
                    </td>
                    <td>
                      {transaction?.recepteur_name ? transaction?.recepteur_name : "---"}
                    </td>
                    {/* <td>
                      {transaction.payment_method === "UNDEFINED"
                        ? "---"
                        : transaction.payment_method || "---"}
                    </td> */}
                    <td>{transaction?.amount || "---"} XAF</td>
                    <td>{translateTransactionType(transaction?.transaction_type)}</td>
                    <td>{transaction.percentage || "---"}%</td>
                    <td>
                      {transaction?.date
                        ? new Date(transaction?.date).toLocaleDateString()
                        : "---"}
                    </td>
                    <td>{transaction?.solde || "---"} XAF</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
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
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="close-btn"
                onClick={() => setSelectedTransaction(null)}
              >
                &times;
              </button>
              <h3>Détails de la Transaction</h3>
              <p>
                <strong>Envoyeur :</strong>{" "}
                {selectedTransaction?.envoyeur_name || "---"}
              </p>
              <p>
                <strong>Destinataire :</strong>{" "}
                {selectedTransaction?.recepteur_name || "---"}
              </p>
              <p>
                <strong>Mode de Paiement :</strong>{" "}
                {selectedTransaction?.payment_method === "UNDEFINED"
                  ? "---"
                  : selectedTransaction?.payment_method || "---"}
              </p>
              <p>
                <strong>Montant :</strong>{" "}
                {selectedTransaction?.amount || "---"} XAF
              </p>
              <p>
                <strong>Type de Transaction :</strong>{" "}
                {translateTransactionType(selectedTransaction?.transaction_type)}
              </p>
              <p>
                <strong>Pourcentage :</strong>{" "}
                {selectedTransaction?.percentage || "---"}%
              </p>
              <p>
                <strong>Date :</strong>{" "}
                {selectedTransaction?.date
                  ? new Date(selectedTransaction?.date).toLocaleDateString()
                  : "---"}
              </p>
              {/* <p>
                <strong>Heure :</strong>{" "}
                {selectedTransaction?.date
                  ? new Date(selectedTransaction?.date).toLocaleTimeString()
                  : "---"}
              </p> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HistoriqueAccountDetails;
