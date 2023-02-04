import { Component, OnInit } from '@angular/core';
import { Product } from '../../products/products';
import { ProductsService } from '../../products/products.service';
import { colors } from '../colors';

@Component({
  selector: 'ngx-productinfo',
  templateUrl: './productinfo.component.html',
  styleUrls: ['./productinfo.component.scss']
})
export class ProductinfoComponent implements OnInit {
  products:Product[]=[];
  availableProducts:number=0;
  unAvailableProducts:number=0;
  pieChart:any;
  chart: any;
  primaryColor:any=colors.primary;
  accentColor:any=colors.accent;
  private pieChartInstance: any;
  private chartInstance: any;
  constructor(private productService:ProductsService) { }
  ngOnInit(): void {
    this.availableProductsCount();
    this.unavailableProductsCount();
    this.getAllProducts();
    this.pieChart = {
      color: [this.primaryColor, this.accentColor],
      series: [
          {
              name: 'Pie',
              type: 'pie',
              data: [
                  {value: this.availableProducts},
                  {value: this.unAvailableProducts},
              ],
              labelLine: {
                show: false
              }
          }
      ]
    };
    this.chart = {

      xAxis: {
        type: 'category',
        data: this.products.map(p => p.designation)
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
        data: this.products.map(p=>p.price),
        type: 'line',
        name: 'Expiration Date',
        itemStyle: {
          color: this.accentColor
      }
      }]
    };
  }

  // Method To get available Products Count
  availableProductsCount(){
      this.productService.availableProducts().subscribe(
        res=>{
          this.availableProducts=res;
          this.updatePieChart();
        }
      )
  }
  // Method To get unavailable Products Count
    unavailableProductsCount(){
      this.productService.unavailableProducts().subscribe(
        res=>{
          this.unAvailableProducts=res;
          this.updatePieChart();
        }
      )
  }
    // Method To get All Products 
    getAllProducts(){
      this.productService.getAll().subscribe(
        res=>{
          this.products=res;
          this.updateChart();
        }
      )
  }

  // Method to Init the pie 
  onPieChartInit(ec) {
    this.pieChartInstance = ec;
  }
  // Method to update pie 
  updatePieChart(){
    this.pieChart.series[0].data[0].value=this.availableProducts;
    this.pieChart.series[0].data[1].value=this.unAvailableProducts;
    this.pieChartInstance.setOption(this.pieChart);
  }
  // Method to Init the pie 
  onChartInit(ec:any) {
  this.chartInstance = ec;
  }
  // Method to Init the pie 
  updateChart(){
    this.chart.xAxis.data=this.products.map(p=>p.designation);
    this.chart.series[0].data=this.products.map(p=>p.price);
    this.chartInstance.setOption(this.chart);
  }
}

