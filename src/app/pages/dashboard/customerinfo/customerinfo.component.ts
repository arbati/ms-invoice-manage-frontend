import { Component, OnInit } from '@angular/core';
import { colors } from '../colors';
import { CustomersService } from '../../customers/customers.service';

@Component({
  selector: 'ngx-customerinfo',
  templateUrl: './customerinfo.component.html',
  styleUrls: ['./customerinfo.component.scss']
})
export class customerinfoComponent implements OnInit {

  chart: any;
  xAxisData:Array<string>=[];
  yAxisData:Array<number>=[];
  primaryColor:any=colors.primary;
  accentColor:any=colors.accent;
  private chartInstance: any;
  cityMap = new Map<string, number>();


  constructor(private service:CustomersService) { }


  ngOnInit(): void {
   
    this.mappingCityNameAndCount();
     this.chartCobfig();
  }

   mappingCityNameAndCount(){
    this.service.getAll().subscribe({
      next: data=>{
        let map = this.cityCount(data);
        for (const key in map) {
          this.xAxisData.push(key);
          this.yAxisData.push(map[key]);
        }
      },
      error: error=>{}
    });
   }


  cityCount(customers:any):Map<string, number> {
    return customers.reduce((cityMap, customer) => {
      if (!cityMap[customer.city]) {
        cityMap[customer.city] = 1;
      } else {
        cityMap[customer.city]++;
      }
      return cityMap;
    }, {});
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
          return `<b">${params['name']}</b> : ${params['value']}`;
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


}