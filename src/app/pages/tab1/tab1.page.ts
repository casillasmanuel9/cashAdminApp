import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';
import { Entry } from 'src/app/models/entry.model';
import { AppState } from 'src/app/store/app.reducers';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy{

  ingresos = 0;
  egresos = 0;

  totalIngresos = 0;
  totalEgresos = 0;

  public entries: Entry[];
  private subs = new SubSink();

  public chartLabels: Label[] = ['Ingresos', 'Egresos'];
  public chartData: MultiDataSet = [];
  public chartType: ChartType = 'doughnut';
  public chartColors = [
    {
      backgroundColor: ['rgba(0,255,0,0.4)','rgba(255,0,0,0.4)'],
    },
  ];
  
  constructor(private store: Store<AppState>) {}
  
  ngOnInit(): void {
    this.subs.add(
      this.store.select('entries').subscribe(({entries})=> this.generarEstadistica(entries))
    )
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  generarEstadistica(items: Entry[]) {
    this.ingresos = 0;
    this.egresos = 0;

    this.totalIngresos = 0;
    this.totalEgresos = 0;
    for (const item of items) {
      if (item.type === "ingreso") {
        this.totalIngresos += item.quantity;
        this.ingresos ++;
      } else {
        this.totalEgresos += item.quantity
        this.egresos++;
      }
    }

    this.chartData = [[this.totalIngresos, this.totalEgresos]];
  }
  
}
