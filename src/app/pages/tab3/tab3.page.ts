import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActionSheetController } from "@ionic/angular";
import { Store } from "@ngrx/store";
import { Entry } from "src/app/models/entry.model";
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import { UiService } from 'src/app/services/ui.service';
import { AppState } from "src/app/store/app.reducers";
import { SubSink } from "subsink";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page implements OnInit, OnDestroy {
  public entries: Entry[];
  private subs = new SubSink();

  constructor(
    private store: Store<AppState>,
    private actionSheetCrtl: ActionSheetController,
    private ingresoEgresoService:IngresoEgresoService,
    private uiService:UiService
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.store
        .select("entries")
        .subscribe(({ entries }) => (this.entries = entries))
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  async optionsActionSheet(uid: string, name: string) {
    const actionSheet = await this.actionSheetCrtl.create({
      header: name,
      buttons: [
        {
          text: "Eliminar",
          role: "destructive",
          icon: "trash",
          handler: async () => {
            console.log("Delete clicked", uid);
            await this.uiService.presentLoading('Eliminando..');
            await this.ingresoEgresoService.borrarEgresoIngreso(uid); 
            this.uiService.stopLoading();
            this.uiService.presentToast('Registro Eliminado')
          },
        },
        {
          text: "Cancel",
          icon: "close",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          },
        },
      ],
    });
    await actionSheet.present();
  }
}
