import React from "react";
import PropTypes from "prop-types";
import "../styles/index.css";
import IconSet from "../assets/icons/IconSet.png";
import ArrowFall from "../assets/icons/ArrowFall.png";

const StatCard = ({ title, value, trend, percentage }) => {
  const isPositive = trend === "up";
  const displayValue = title === "Revenus" ? `${value} XAF` : value; // Ajouter "XAF" seulement pour les revenus

  return (
    <div
      className={`stat-card ${isPositive ? "positive" : "negative"}`}
      style={{
        backgroundColor: isPositive ? (title === "Litiges" ? "#E94E1B" : "#312783") : "#E94E1B",
        color: "#fff",
      }}
    >
      <div className="stat-flex">
        <div>
          <h4>{title}</h4>
          <h2>{displayValue}</h2>
        </div>
        <div className="percent-container">
          <span
            className="percentage"
            style={{ color: isPositive ? "#4CAF50" : "#FFFFFF" }}
          >
            {isPositive ? "+" : ""}
            {percentage}%
          </span>
          <span className="trend">
            {isPositive ? (
              <img src={IconSet} className="trendUp" alt="Up Trend" />
            ) : (
              <img src={ArrowFall} className="trendUp" alt="Down Trend" />
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  trend: PropTypes.oneOf(["up", "down"]).isRequired,
  percentage: PropTypes.string.isRequired,
};

const StatData = ({
  usersCount,
  evolutionPercentageUser,
  trendUser,
  bookingCount,
  evolutionPercentageBooking,
  trendBooking,
  litigeCount,
  evolutionPercentageLitige,
  trendLitige,
  walletCount,
  evolutionPercentageWallet,
  trendWallet,
}) => {
  const data = [
    {
      title: "Inscriptions",
      value: usersCount,
      trend: trendUser,
      percentage: evolutionPercentageUser,
    },
    {
      title: "Location",
      value: bookingCount,
      trend: trendBooking,
      percentage: evolutionPercentageBooking,
    },
    {
      title: "Revenus",
      value: walletCount,
      trend: trendWallet,
      percentage: evolutionPercentageWallet,
    },
    {
      title: "Litiges",
      value: litigeCount,
      trend: trendLitige,
      percentage: evolutionPercentageLitige,
    },
  ];

  return (
    <div className="dashboard">
      {data.map((item, index) => (
        <StatCard
          key={index}
          title={item.title}
          value={item.value}
          trend={item.trend}
          percentage={item.percentage}
        />
      ))}
    </div>
  );
};

StatData.propTypes = {
  usersCount: PropTypes.string.isRequired,
  evolutionPercentageUser: PropTypes.string.isRequired,
  trendUser: PropTypes.oneOf(["up", "down"]).isRequired,
  bookingCount: PropTypes.string.isRequired,
  evolutionPercentageBooking: PropTypes.string.isRequired,
  trendBooking: PropTypes.oneOf(["up", "down"]).isRequired,
  litigeCount: PropTypes.string.isRequired,
  evolutionPercentageLitige: PropTypes.string.isRequired,
  trendLitige: PropTypes.oneOf(["up", "down"]).isRequired,
  walletCount: PropTypes.string.isRequired,
  evolutionPercentageWallet: PropTypes.string.isRequired,
  trendWallet: PropTypes.oneOf(["up", "down"]).isRequired,
};

export default StatData;

// // Exemple d'utilisation
// export const App = () => (
//   <StatData
//     usersCount="721K"
//     evolutionPercentageUser="11.02"
//     trendUser="up"
//     bookingCount="367K"
//     evolutionPercentageBooking="-0.03"
//     trendBooking="down"
//     walletCount="1,156"
//     evolutionPercentageWallet="15.03"
//     trendWallet="up"
//     litigeCount="20"
//     evolutionPercentageLitige="6.08"
//     trendLitige="up"
//   />
// );
