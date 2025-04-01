import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";

const MonthlyTransactionChart = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: "#fff",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <p style={{ fontWeight: "bold", marginBottom: "5px" }}>{label}</p>
          {payload.map((entry, index) => (
            <p
              key={`item-${index}`}
              style={{
                color: entry.color,
                margin: 0,
                fontWeight: "bold",
              }}
            >
              {entry.name}: {entry.value || "Non disponible"}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const legendFormatter = (value) => {
    const colorMap = {
      Productif: "#4CAF50",
      Moyen: "#3f51b5",
      Faible: "#E94E1B",
    };
    return (
      <span
        style={{
          fontSize: "12px",
          fontWeight: "bold",
          marginRight: "70px",
          marginTop:"100px",
          color: colorMap[value] || "#000",
        }}
      >
        {value}
      </span>
    );
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
     
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          barCategoryGap="30%"
        >
          <XAxis
            dataKey="mois"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0, 0, 0, 0.05)" }} />
          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            
            formatter={legendFormatter}
            payload={[
              { value: "Productif", type: "circle", color: "#4CAF50" },
              { value: "Moyen", type: "circle", color: "#3f51b5" },
              { value: "Faible", type: "circle", color: "#E94E1B" },
            ]}
          />
          {/* Bar for "du_1_au_15" */}
          {data.some((entry) => entry.du_1_au_15 !== undefined) && (
            <Bar dataKey="du_1_au_15" name="1er au 15" barSize={20}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-du_1_au_15-${index}`}
                  fill={
                    entry.du_1_au_15_status === "Productif"
                      ? "#4CAF50"
                      : entry.du_1_au_15_status === "Moyen"
                      ? "#3f51b5"
                      : entry.du_1_au_15_status === "Faible"
                      ? "#E94E1B"
                      : "#CCCCCC" // Default color if status is missing
                  }
                />
              ))}
            </Bar>
          )}
          {/* Bar for "du_16_a_fin" */}
          {data.some((entry) => entry.du_16_a_fin !== undefined) && (
            <Bar dataKey="du_16_a_fin" name="16 à fin" barSize={20}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-du_16_a_fin-${index}`}
                  fill={
                    entry.du_16_a_fin_status === "Productif"
                      ? "#4CAF50"
                      : entry.du_16_a_fin_status === "Moyen"
                      ? "#3f51b5"
                      : entry.du_16_a_fin_status === "Faible"
                      ? "#E94E1B"
                      : "#CCCCCC" // Default color if status is missing
                  }
                />
              ))}
            </Bar>
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyTransactionChart;
