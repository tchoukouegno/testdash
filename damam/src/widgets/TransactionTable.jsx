import React, { useState, useEffect } from "react";
import "../styles/index.css";
import { getTransaction } from "../modules/getTransaction";
import ArrowLineLeft from "../assets/icons/ArrowLineLeft.svg";
import ArrowLineRight from "../assets/icons/ArrowLineRight.svg";
import direction from "../assets/icons/direction.svg";
import search from "../assets/icons/search.png";

const TransactionTable = () => {
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
console.log(queryString)
    getTransaction(
      `https://www.damam.zeta-messenger.com/api/transactions${queryString}`,
      token
    )
      .then((response) => {

        console.log(response)
        const {
          current_page,
          data: transactionData,
          last_page,
        } = response;

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
                <th onClick={() => handleSort("sender")}>
                  Envoyeur
                  {sortConfig.key === "sender" &&
                    (sortConfig.direction === "asc" ? " ↓" : " ↑")}
                </th>
                <th onClick={() => handleSort("receiver")}>
                  Receveur
                  {sortConfig.key === "receiver" &&
                    (sortConfig.direction === "asc" ? " ↓" : " ↑")}
                </th>
                <th onClick={() => handleSort("amount")}>
                  Montant
                  {sortConfig.key === "amount" &&
                    (sortConfig.direction === "asc" ? " ↓" : " ↑")}
                </th>
                <th onClick={() => handleSort("frais_owner")}>
                  Frais Propriétaire
                  {sortConfig.key === "frais_owner" &&
                    (sortConfig.direction === "asc" ? " ↓" : " ↑")}
                </th>
                <th onClick={() => handleSort("frais_tenant")}>
                  Frais Locataire
                  {sortConfig.key === "frais_tenant" &&
                    (sortConfig.direction === "asc" ? " ↓" : " ↑")}
                </th>
                <th onClick={() => handleSort("numero")}>
                  Numero
                  {sortConfig.key === "marque" &&
                    (sortConfig.direction === "asc" ? " ↓" : " ↑")}
                </th>
                <th onClick={() => handleSort("payment_method")}>
                  Mode de Paiement
                  {sortConfig.key === "payment_method" &&
                    (sortConfig.direction === "asc" ? " ↓" : " ↑")}
                </th>
                <th onClick={() => handleSort("status")}>
                  Statut
                  {sortConfig.key === "status" &&
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
                    key={transaction.id}
                    onClick={() => setSelectedTransaction(transaction)}
                    style={{ cursor: "pointer" }}
                  >
                    <td title={transaction.sender?.name || "N/A"}>
                      {truncateText(transaction.sender?.name || "N/A")}
                    </td>
                    <td title={transaction.receiver?.name || "N/A"}>
                      {truncateText(transaction.receiver?.name || "N/A")}
                    </td>
                    <td>{transaction.amount || "N/A"} XAF</td>
                    <td>{transaction.frais_owner || "N/A"} XAF</td>
                    <td>{transaction.frais_tenant || "N/A"} XAF</td>
                    <td title={transaction.numero || "N/A"}>
                      {truncateText(transaction.numero || "N/A")}
                    </td>
                    <td title={transaction.payment_method || "N/A"}>
                      {truncateText(transaction.payment_method || "N/A")}
                    </td>
                    <td>{transaction.status || "N/A"}</td>
                    <td>
                      {transaction.created_at
                        ? new Date(transaction.created_at).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" style={{ textAlign: "center" }}>
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
              <h3>Détails de la Transaction</h3>
              <p>
                <strong>Envoyeur :</strong>{" "}
                {selectedTransaction.sender?.name || "N/A"}
              </p>
              <p>
                <strong>Receveur :</strong>{" "}
                {selectedTransaction.receiver?.name || "N/A"}
              </p>
              <p>
                <strong>Montant :</strong>{" "}
                {selectedTransaction.amount || "N/A"} XAF
              </p>
              <p>
                <strong>Frais Propriétaire :</strong>{" "}
                {selectedTransaction.frais_owner || "N/A"} XAF
              </p>
              <p>
                <strong>Frais Locataire :</strong>{" "}
                {selectedTransaction.frais_tenant || "N/A"} XAF
              </p>
              <p>
                <strong>Marque :</strong>{" "}
                {selectedTransaction.marque || "N/A"}
              </p>
              <p>
                <strong>Mode de Paiement :</strong>{" "}
                {selectedTransaction.payment_method || "N/A"}
              </p>
              <p>
                <strong>Statut :</strong>{" "}
                {selectedTransaction.status || "N/A"}
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

export default TransactionTable;
