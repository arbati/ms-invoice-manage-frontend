import { Component, OnInit } from '@angular/core';
import { colors } from '../colors';

@Component({
  selector: 'ngx-customerinfo',
  templateUrl: './customerinfo.component.html',
  styleUrls: ['./customerinfo.component.scss']
})
export class customerinfoComponent implements OnInit {

  chart: any;
  xAxisData:Array<string>;
  yAxisData:Array<number>;
  primaryColor:any=colors.primary;
  accentColor:any=colors.accent;
  private chartInstance: any;


  constructor() { }


  ngOnInit(): void {
   
    this.xAxisData=["Rabat", "Casablanca", "Agadir", "Tanger", "Kenitra", "Essaouira", "Asfi", "Tetouan"];
    this.yAxisData=[1541,21541,4574,6325,2154,1215,9856,45874];

    this.chartCobfig();
  }


   chartCobfig(){

    this.chart = {

      xAxis: {
        type: 'category',
        data: this.xAxisData
      },
      yAxis: {
        axisLabel: {
          fontSize: 10,
          color: '#000'
        },
        type: 'value',

      },
      tooltip: {
        trigger: 'item',
        showDelay: 0,
        transitionDuration: 0.3,
        formatter: function (params) {
          return `<b">${params['name']}</b> : ${params['value']} Dhs`;
        }
      },
      series: [{
        data: this.yAxisData,
        type: 'bar',
        name: 'Profit',
        itemStyle: {
          color: colors.secondary
      }
      }]
    };
   }

   onChartInit(ec:any) {
    this.chartInstance = ec;
    }


    updateChart(){
      this.chart.xAxis.data=["2020","2021","2022","2023"];
      this.chart.series[0].data=[1541,21541,4574,6325];
      this.chartInstance.setOption(this.chart);
    }


}