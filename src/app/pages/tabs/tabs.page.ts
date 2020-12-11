import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { filter } from "rxjs/operators";
import { IngresoEgresoService } from "src/app/services/ingreso-egreso.service";
import { loadEntriesSuccess } from "src/app/store/actions";
import { AppState } from "src/app/store/app.reducers";
import { SubSink } from "subsink";

@Component({
  selector: "app-tabs",
  templateUrl: "tabs.page.html",
  styleUrls: ["tabs.page.scss"],
})
export class TabsPage implements OnInit, OnDestroy {
  private subs = new SubSink();

  constructor(
    private store: Store<AppState>,
    private ingresosEgresosService: IngresoEgresoService
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.store
        .select("usuario")
        .pipe(filter((auth) => auth.user !== null))
        .subscribe(({ user }) => {
          this.subs.add(
            this.ingresosEgresosService
              .initIngresosEgresosListener(user.uid)
              .subscribe((entries) => {
                console.log(entries);
                this.store.dispatch(loadEntriesSuccess({ entries }));
              })
          );
        })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
