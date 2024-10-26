import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const GaugeChart = ({ riskScore, maxScore }: { riskScore: number, maxScore: number }) => {
    const data = {
        labels: ['Good', 'Average', 'Poor', 'Derranged'],
        datasets: [
            {
                data: [40, 20, 20, 20],
                backgroundColor: ['#00ff00', '#ffff00', '#ff9900', '#ff0000'],
                borderWidth: 0,
                hoverOffset: 5,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        rotation: -90,
        circumference: 180,
        cutout: '80%',
        plugins: {
            tooltip: {
                enabled: false,
            },
        },
    };

    const gaugeContainerStyle: React.CSSProperties = {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 'auto',
        maxWidth: '400px',
    };

    const needleStyle = (containerSize: number): React.CSSProperties => ({
        position: 'absolute',
        top: '42%',
        left: '50%',
        transform: `rotate(${(riskScore / maxScore) * 180 - 90}deg)`,
        transformOrigin: 'bottom',
        width: `${containerSize * 0.02}px`, 
        height: `${containerSize * 0.45}px`,
        backgroundColor: 'black',
        zIndex: 1,
        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', 
    });


    const gaugeSize = Math.min(window.innerWidth * 0.8, 300);

    return (
        <div style={{ width: '100%', height: 'auto', display: 'flex', justifyContent: 'center' }}>
            <div style={{ ...gaugeContainerStyle, height: gaugeSize }}>
                <div style={needleStyle(gaugeSize)}></div>
                <Doughnut data={data} options={options} />
                <div style={{
                    position: 'absolute',
                    top: '40%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: `${gaugeSize * 0.1}px`,
                }}>
                </div>
            </div>
        </div>
    );
}

export default GaugeChart;