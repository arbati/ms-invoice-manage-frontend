import { Component, OnInit } from '@angular/core';
import { colors } from '../colors';
import { InvoiceService } from '../../Invoice/invoice.service';
import { InvoiceMonthTotal } from '../../invoice/invoice';

@Component({
  selector: 'ngx-invoiceinfo',
  templateUrl: './invoiceinfo.component.html',
  styleUrls: ['./invoiceinfo.component.scss']
})
export class InvoiceinfoComponent implements OnInit {

  chart: any;
  xAxisData:Array<string>=[];
  yAxisData:Array<number>=[];
  primaryColor:any=colors.primary;
  accentColor:any=colors.accent;
  private chartInstance: any;
  map = new Map<number, number>();
  arrayMonthTotal:any;
  monthOfYear:Array<string>=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


  constructor(private invoiceService:InvoiceService ) { }

  ngOnInit(): void {
    
    this.invoiceService.getInvoicesByTotal().subscribe(map => {
      for (const key in map) {
        if (map.hasOwnProperty(key)) {
          this.xAxisData.push(this.monthOfYear[parseInt(key)-1]);
          this.yAxisData.push(map[key]);
        }}

        this.chartCobfig();
    });

    
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


}
