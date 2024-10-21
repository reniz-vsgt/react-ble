import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const GaugeChart = ({ riskScore, maxScore }: { riskScore: number, maxScore: number }) => {
    const valueLabels = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36]
    const data = {
        labels: ['Good', 'Average', 'Poor', 'Derranged'],
        datasets: [
            {
                data: [36, 19, 14, 31],
                backgroundColor: ['#00ff00', '#ffff00', '#ff9900', '#ff0000'],
                borderWidth: 0,
                hoverOffset: 5,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        rotation: -90, // Start from the top
        circumference: 180, // Half circle
        cutout: '80%', // To create the gauge effect
        plugins: {
            tooltip: {
                enabled: false, // Disable tooltips
            },
        },
    };

    const gaugeContainerStyle: React.CSSProperties = {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%', // Full width container
        height: 'auto',
        maxWidth: '400px', // Adjust the max width based on your design
    };

    const needleStyle = (containerSize: number): React.CSSProperties => ({
        position: 'absolute',
        top: '42%',
        left: '50%',
        transform: `rotate(${(riskScore / maxScore) * 180 - 90}deg)`,
        transformOrigin: 'bottom',
        width: `${containerSize * 0.02}px`, // Increased width (from 0.02)
        height: `${containerSize * 0.45}px`, // Increased height (from 0.35)
        backgroundColor: 'black',
        zIndex: 1,
        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', // Arrow shape
    });


    const gaugeSize = Math.min(window.innerWidth * 0.8, 300); // Dynamically adjust based on screen size

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
                    fontSize: `${gaugeSize * 0.1}px`, // Dynamically adjust font size
                }}>
                </div>
            </div>
        </div>
    );
}

export default GaugeChart;