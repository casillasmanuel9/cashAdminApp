import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Entry } from 'src/app/models/entry.model';
import { AppState } from 'src/app/store/app.reducers';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit, OnDestroy{

  public entries: Entry[];
  private subs = new SubSink();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.subs.add(
      this.store.select('entries').subscribe(({entries})=> this.entries = entries)
    )
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
