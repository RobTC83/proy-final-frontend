import { Doughnut } from "react-chartjs-2";
import { chartColors } from "../colors.js";

import "../App.css";




export default function Graficas() {
    
  

    const options = {
        legend: {
          display: true,
          position: "right"
        },
        elements: {
          arc: {
            borderWidth: 0
          }
        }
      };
      
      
      const data = {
        maintainAspectRatio: false,
        responsive: false,
        labels: ["Renta", "Despensa", "Transporte", "Ahorro"],
        datasets: [
          {
            data: [90, 700, 250, 100],
            backgroundColor: chartColors,
            hoverBackgroundColor: chartColors
          }
        ]
      };
      
      
    
      const styles = {
        pieContainer: {
          width: "40%",
          height: "40%",
          top: "50%",
          left: "50%",
          position: "absolute",
          transform: "translate(-50%, -50%)"
        },
        relative: {
          position: "relative"
        }
      };
    
    return (
        <div>
                <div className="App">
      <h1 className="py-3 font-bold">Tus gastos en gráficas</h1>
      <div style={styles.relative} className="canvas-container">
        <Doughnut data={data} options={options} />
        <div style={styles.pieContainer}>
          
        </div>
        <div id="legend" />
      </div>
    </div>
        </div>
    )
}
