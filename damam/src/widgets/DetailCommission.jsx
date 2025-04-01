import React, { useState, useEffect } from "react";
import "../styles/index.css";
import ArrowLineLeft from "../assets/icons/ArrowLineLeft.svg";
import ArrowLineRight from "../assets/icons/ArrowLineRight.svg";
import direction from "../assets/icons/direction.svg";
import search from "../assets/icons/search.png";
import { walletDetail } from "../modules/walletDetail";

const DetailCommission = ({ paymentMethod }) => {
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
      payment_method: paymentMethod,
    };

    walletDetail(
      `https://www.damam.zeta-messenger.com/api/walletDetail${queryString}`,
      token,
      requestData // Adding the payment method as a payload
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
  }, [currentPage, sortConfig, debouncedQuery, paymentMethod]);

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
                <th onClick={() => handleSort("owner_name")}>
                  Propriétaire
                  {sortConfig.key === "owner_name" &&
                    (sortConfig.direction === "asc" ? " ↓" : " ↑")}
                </th>
                <th onClick={() => handleSort("booker_name")}>
                  Payeur
                  {sortConfig.key === "booker_name" &&
                    (sortConfig.direction === "asc" ? " ↓" : " ↑")}
                </th>

                <th onClick={() => handleSort("numero")}>
                  Numero
                  {sortConfig.key === "numero" &&
                    (sortConfig.direction === "asc" ? " ↓" : " ↑")}
                </th>
                <th onClick={() => handleSort("balance")}>
                  Commission
                  {sortConfig.key === "balance" &&
                    (sortConfig.direction === "asc" ? " ↓" : " ↑")}
                </th>
                <th onClick={() => handleSort("created_at")}>
                  Date
                  {sortConfig.key === "created_at" &&
                    (sortConfig.direction === "asc" ? " ↓" : " ↑")}
                </th>
                <th onClick={() => handleSort("solde")}>
                  Solde
                  {sortConfig.key === "solde" &&
                    (sortConfig.direction === "asc" ? " ↓" : " ↑")}
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((transaction) => (
                  <tr
                    key={transaction.wallet_id}
                    onClick={() => setSelectedTransaction(transaction)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{truncateText(transaction.owner_name || "N/A")}</td>
                    <td>{truncateText(transaction.booker_name || "N/A")}</td>
                    <td>{truncateText(transaction.numero || "N/A")}</td>
                    <td>{transaction.balance || "N/A"} XAF</td>
                    <td>
                      {transaction.created_at
                        ? new Date(transaction.created_at).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>{transaction.solde || "N/A"} XAF</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
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
                <strong>Propriétaire :</strong>{" "}
                {selectedTransaction.owner_name || "N/A"}
              </p>
              <p>
                <strong>Payeur :</strong>{" "}
                {selectedTransaction.booker_name || "N/A"}
              </p>
              <p>
                <strong>Montant :</strong>{" "}
                {selectedTransaction.balance || "N/A"} XAF
              </p>
              <p>
                <strong>Date :</strong>{" "}
                {selectedTransaction.created_at
                  ? new Date(
                      selectedTransaction.created_at
                    ).toLocaleDateString()
                  : "N/A"}
              </p>
              <p>
                <strong>Heure :</strong>{" "}
                {selectedTransaction.created_at
                  ? new Date(
                      selectedTransaction.created_at
                    ).toLocaleTimeString()
                  : "N/A"}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DetailCommission;
