import React, { useState, useEffect } from "react";
import { LineChart, Line, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { getRevenuChart } from "../modules/getRevenuChart";

const RevenueChart = () => {
  const [data, setData] = useState([
    { date: "2022-01-01", revenue: 300, total: 300300 },
    { date: "2022-01-02", revenue: 400, total: 300700 },
    { date: "2022-01-03", revenue: 1050, total: 300850 },
    { date: "2022-01-04", revenue: 500, total: 3350 },
    { date: "2022-01-05", revenue: 200, total: 301550 },
    { date: "2022-01-06", revenue: 10000, total: 301850 },
    { date: "2022-01-07", revenue: 400, total: 302250 },
    { date: "2022-01-08", revenue: 250, total: 302500 },
    { date: "2022-01-09", revenue: 150, total: 302650 },
    { date: "2022-01-10", revenue: 500050, total: 303100 },
    { date: "2022-01-11", revenue: 0, total: 303200 },
    { date: "2022-01-12", revenue: 350, total: 303550 },
    { date: "2022-01-13", revenue: 20, total: 303750 },
    { date: "2022-01-14", revenue: 0, total: 304250 },
    { date: "2022-01-15", revenue: 600000, total: 304550 },
    { date: "2022-01-16", revenue: 400, total: 304950 },
    { date: "2022-01-17", revenue: 150, total: 305100 },
    { date: "2022-01-18", revenue: 2, total: 305300 },
    { date: "2022-01-19", revenue: 90000, total: 305800 },
    { date: "2022-01-20", revenue: 300, total: 306100 },
  ]);

  const [mainAccount, setMainAccount] = useState(null)

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

    getRevenuChart(token)
      .then((response) => {
        console.log(response);
        setMainAccount(response.total_balance)
        if (response && response.daily_summaries) {
          setData(response.daily_summaries); // Assurez-vous que la clé "data" contient un tableau
        }
      })
      .catch((error) => console.error("Erreur de chargement des données:", error));
  }, []);

  // Tooltip personnalisé
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const pointData = payload[0].payload;
      // Conversion de la date au format français
      const formattedDate = new Date(pointData.date).toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      return (
        <div
          style={{
            background: "#ffffff",
            borderRadius: "12px",
            padding: "10px 15px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            fontSize: "14px",
            color: "#111827",
          }}
        >
          <p
            style={{
              margin: 0,
              fontWeight: "bold",
              fontSize: "12px",
              color: "#6B7280",
            }}
          >
            {formattedDate}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "5px",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: "#3981F7",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            ></div>
            <span style={{ fontWeight: "bold", fontSize: "14px", color: "#111827" }}>
              Revenue {pointData.daily_revenue} XAF
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      style={{
        textAlign: "center",
        fontFamily: "'Arial', sans-serif",
        padding: "20px",
        background: "#ffffff",
        borderRadius: "12px",
        width: "100%",
        margin: "auto",
      }}
    >
      <h3 style={{ marginBottom: "30px", fontSize: "24px" }}>Compte Principale</h3>
      <h1 style={{ fontWeight: "bold", marginTop: 0, marginBottom: "20px" }}>
        {mainAccount} XAF
      </h1>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 100, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3981F7" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#F3F7FF" stopOpacity={1} />
            </linearGradient>
          </defs>
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="basis"
            dataKey="daily_revenue"
            stroke="#3981F7"
            strokeWidth={2}
            fill="url(#colorUv)"
            dot={{
              stroke: "#ffffff",
              strokeWidth: 2,
              fill: "#3981F7",
              r: 0, // Points invisibles par défaut
            }}
            activeDot={{
              r: 6, // Points visibles au survol
              fill: "#3981F7",
              stroke: "white",
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
