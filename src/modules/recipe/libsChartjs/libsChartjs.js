import { LightningElement } from 'lwc';
import { Chart, registerables } from 'chart.js';

const generateRandomNumber = () => {
    return Math.round(Math.random() * 100);
};

Chart.register(...registerables);

export default class LibsChartjs extends LightningElement {
    chart;
    chartjsInitialized = false;

    config = {
        type: 'doughnut',
        data: {
            datasets: [
                {
                    data: [
                        generateRandomNumber(),
                        generateRandomNumber(),
                        generateRandomNumber(),
                        generateRandomNumber(),
                        generateRandomNumber()
                    ],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)'
                    ],
                    label: 'Dataset 1'
                }
            ],
            labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue']
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right'
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    };

    renderedCallback() {
        if (this.chartjsInitialized) {
            return;
        }
        this.chartjsInitialized = true;
        this.loadChartJs();
    }

    loadChartJs() {
        const ctx = this.template
            .querySelector('canvas.donut')
            .getContext('2d');
        this.chart = new Chart(ctx, this.config);
    }
}
