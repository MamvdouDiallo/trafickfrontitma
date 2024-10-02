import { Component } from '@angular/core';

@Component({
  selector: 'app-mise-en-oeuvre',
  templateUrl: './mise-en-oeuvre.component.html',
  styleUrl: './mise-en-oeuvre.component.css'
})
export class MiseEnOeuvreComponent {

  papCategories: number = 100;  // Remplacer par une valeur dynamique si nécessaire
  papDeplacement: number = 50;
  papVulnerables: number = 20;

  // Statut des dossiers individuel
  dossiersIncomplets: number = 10;
  dossiersComplets: number = 90;
  ententesCompensation: number = 70;
  dossiersTransmis: number = 80;
  papPayees: number = 65;

  // Données des catégories PAP
  pieChart = {
    series: [40, 30, 20, 10],  // Effectif des catégories PAP : [opérateurs économiques, agricoles, transports, autres]
    chart: {
      type: 'pie',
      width: 380
    },
    labels: ['Opérateurs économiques', 'Agricoles', 'Transports', 'Autres'],
    colors: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1'],
    legend: {
      position: 'bottom'
    }
  };


   // Données des PAP vulnérables et non vulnérables
   vulnerableChart = {
    series: [60, 40],  // Effectif vulnérables vs non vulnérables (par exemple)
    chart: {
      type: 'pie',
      width: 380
    },
    labels: ['Vulnérables', 'Non vulnérables'],
    colors: ['#FF5733', '#33FF57'],
    legend: {
      position: 'bottom'
    }
  };




 // Données des catégories PAP
 categories = ['Opérateurs économiques', 'Agricoles', 'Transports', 'Autres'];

 // Graphique en barres empilées (effectif féminin et masculin)
 barChart = {
   series: [
     {
       name: 'Effectif féminin',
       data: [20, 15, 10, 25]
     },
     {
       name: 'Effectif masculin',
       data: [30, 35, 40, 25]
     }
   ],
   chart: {
     type: 'bar',
     height: 350,
     stacked: true
   },
   xaxis: {
     categories: this.categories
   },
   colors: ['#FF5733', '#33FF57'],
   legend: {
     position: 'top'
   },
   plotOptions: {
     bar: {
       horizontal: false
     }
   }
 };

 // Graphique en colonnes (compensations totales)
 compensationChart = {
   series: [
     {
       name: 'Total des compensations',
       data: [100000, 80000, 60000, 90000]
     }
   ],
   chart: {
     type: 'bar',
     height: 350
   },
   xaxis: {
     categories: this.categories
   },
   colors: ['#008FFB'],
   dataLabels: {
     enabled: true,
     formatter: function (val) {
       return val + " €";
     }
   }
 };









}
