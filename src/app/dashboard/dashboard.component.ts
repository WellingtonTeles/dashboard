import { Component } from '@angular/core';
import { DadosService } from './dados.service';


declare var google: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  dados: any = [];
  constructor(private dadosService: DadosService) { }

  ngOnInit() {
    this.dadosService.obterDados().subscribe(
      dados => {
        this.dados = dados;
        this.init();
      }
    )
  }

  init() {
    if (typeof (google) !== 'undefined') {
      google.charts.load('current', { 'packages': ['corechart'] });
      setTimeout(() => {
        this.exibirGraficos(this.obterDataTable(), this.obterOpcoes());
      }, 1000)
    }
  }

  exibirGraficos(dados: unknown, opcoes: unknown) {
    google.charts.setOnLoadCallback(this.exibirColumnChart(dados, opcoes));
    google.charts.setOnLoadCallback(this.exibir3dPieChart(dados, opcoes));
    google.charts.setOnLoadCallback(this.exibirBarChart(dados, opcoes));
    google.charts.setOnLoadCallback(this.exibirDonutChart(dados, opcoes));
    google.charts.setOnLoadCallback(this.exibirLineChart(dados, opcoes));
    google.charts.setOnLoadCallback(this.exibirPieChart(dados, opcoes));

  }
  exibirPieChart(dados: unknown, opcoes: unknown){
    google.charts.load('current', { 'packages': ['corechart'] });
    var chart = new google.visualization.PieChart(document.getElementById('pie_chart'));
    chart.draw(dados, opcoes);
  }
  exibir3dPieChart(dados: unknown, opcoes: any): void {
    google.charts.load('current', { 'packages': ['corechart'] });
    var chart = new google.visualization.PieChart(document.getElementById('3d_pie_chart'));
    opcoes['is3D'] = true;
    chart.draw(dados, opcoes);
  }
  exibirDonutChart(dados: unknown, opcoes: any){
    google.charts.load('current', { 'packages': ['corechart'] });
    var chart = new google.visualization.PieChart(document.getElementById('donut_chart'));
    opcoes['is3D'] = false;
    opcoes['pieHole'] = 0.4;
    chart.draw(dados, opcoes);
  }
  exibirBarChart(dados: unknown, opcoes: unknown){
    google.charts.load('current', { 'packages': ['corechart'] });
    var chart = new google.visualization.BarChart(document.getElementById('bar_chart'));
    chart.draw(dados, opcoes);
  }
  exibirLineChart(dados: unknown, opcoes: unknown){
    google.charts.load('current', { 'packages': ['corechart'] });
    var chart = new google.visualization.LineChart(document.getElementById('line_chart'));
    chart.draw(dados, opcoes);
  }

  exibirColumnChart(dados: unknown, opcoes: unknown) {
    google.charts.load('current', { 'packages': ['corechart'] });
    var chart = new google.visualization.ColumnChart(document.getElementById('column_chart'));
    chart.draw(dados, opcoes);
  }

  obterDataTable(): any {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Mês');
    data.addColumn('number', 'Quantidade');
    data.addRows(this.dados);
    return data;
  }
  obterOpcoes(): any {
    return {
      'title': 'Quantidade de cadastro primeiro semestre',
      'width': 400,
      'height': 300
    };
  }


}
