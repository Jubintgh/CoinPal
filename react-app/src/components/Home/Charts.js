import React from 'react';
import {Line} from 'react-chartjs-2';


const Charts = ({coinData, coinDataColor}) => {
    let acc = 30;
    const timeLabels = coinData.map(time => {
      return `${acc -= 1 } days ago`;
    },)

    const state = {
      labels: timeLabels,
      datasets: [
        {
          label: 'Price',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(1,1,1,1)',
          borderColor: coinDataColor,
          borderWidth: 2,
          devicePixelRatio:-21,
          data: coinData
        }
      ],
      
    options: {
        responsive: true,
        maintainAspectRatio: true,
        layout: {
            padding: {
              top: 80,
              left: 80,
              right: 80,
              bottom: 80
            }
        }
    }
    }

    return (
      <div>
        <Line
          data={state}
          options={{
            title:{
              display:true,
              text:'Past month',
              fontSize:100
            },
            legend:{
              display:true,
              position:'left'
            }
          }}
        />
      </div>
    );
}

export default Charts