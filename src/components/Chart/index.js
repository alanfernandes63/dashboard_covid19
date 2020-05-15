import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Card from '@material-ui/core/Card';

function Chart(props){

    const options = {
        colors: ['#2b908f', '#f45b5b', '#90ee7e'],
        chart: {
          type: props.type,
          zoomType: 'x',
          backgroundColor:{ stops: [[0, '#2a2a2b'], [1, '#3e3e40']] },
        },
        title: {
          text: props.title,
          style:{
            color:'white'
          }
        },
        xAxis: {
          type: 'datetime',
        },
        yAxis:{
          title:{
            text:`Nº ${props['seriesOne']['name']} e ${props['seriesTwo']['name']}`
          }
        },
        plotOptions: {
          series: {
              label: {
                  connectorAllowed: false
              },
          },
      },
      legend: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        itemStyle: {
            color: '#E0E0E3'
        },
        itemHoverStyle: {
            color: '#FFF'
        },
        itemHiddenStyle: {
            color: '#606063'
        },
        title: {
            style: {
                color: '#C0C0C0'
            }
        }
    },
        series:[props['seriesOne'],  props['seriesTwo']]
      };

    return(
      <Card>
          <HighchartsReact  highcharts={Highcharts} options={options} />
      </Card>
    );
}

export default Chart;