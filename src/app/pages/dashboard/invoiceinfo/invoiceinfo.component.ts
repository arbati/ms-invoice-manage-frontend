import { Component, OnInit } from '@angular/core';
import { colors } from '../colors';

@Component({
  selector: 'ngx-invoiceinfo',
  templateUrl: './invoiceinfo.component.html',
  styleUrls: ['./invoiceinfo.component.scss']
})
export class InvoiceinfoComponent implements OnInit {

  chart: any;
  xAxisData:Array<string>;
  yAxisData:Array<number>;
  primaryColor:any=colors.primary;
  accentColor:any=colors.accent;
  private chartInstance: any;


  constructor() { }


  ngOnInit(): void {
   
    this.xAxisData=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.yAxisData=[1541,21541,4574,6325,2154,1215,9856,45874,1452,30251,1547,14854];

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
          color: this.accentColor
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
