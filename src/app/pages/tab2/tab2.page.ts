import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { Entry } from "src/app/models/entry.model";
import { IngresoEgresoService } from "src/app/services/ingreso-egreso.service";
import { UiService } from "src/app/services/ui.service";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page implements OnDestroy, OnInit {
  formIngresosEgresos: FormGroup;
  typeSubs: Subscription;

  public categoryEgreso : string [] = [
    '​Alimentación',
    'Vivienda​',
    'Transporte​',
    'Salud y autocuidado',
    'Entretenimiento y diversión',
    '​Vestuario​',
    'Educación​',
    'Comunicaciones',
    'Otros gastos'
  ];

  public categoryIngreso : string [] = [
    'Nómina'
  ];


  constructor(
    private formBuider: FormBuilder,
    private ui: UiService,
    private ingresoEgreso: IngresoEgresoService
  ) {
    this.formIngresosEgresos = this.formBuider.group({
      name: ["", Validators.required],
      quantity: [null, [Validators.required, Validators.min(1)]],
      type: ['ingreso'],
      category: ["", Validators.required],
      date: ["", Validators.required],
    });

    this.typeSubs = this.formIngresosEgresos
      .get("type")
      .valueChanges.subscribe(
        () => this.formIngresosEgresos.get('category').setValue('')
      );
  }

  ngOnInit(): void {
    this.selectDate();
  }

  selectDate() {
    const dateFormat = this.formatDate();
    this.formIngresosEgresos.get("date").setValue(dateFormat);
  }

  ngOnDestroy(): void {
    this.typeSubs.unsubscribe();
  }

  async save() {
    await this.ui.presentLoading("Guardando");
    const entry: Entry = { ...this.formIngresosEgresos.value };
    this.ingresoEgreso
      .crearIngresoEgreso(entry)
      .then(console.log)
      .catch(console.error);
    this.ui.stopLoading();
    this.ui.presentToast("Guardado con éxito");
    this.formIngresosEgresos.reset();
    this.selectDate();
    this.formIngresosEgresos.patchValue({type:'ingreso'});
  }

  formatDate() {
    const now = new Date();
    const day = ("0" + now.getDate()).slice(-2);
    const month = ("0" + (now.getMonth() + 1)).slice(-2);
    const today = now.getFullYear() + "-" + month + "-" + day;
    return today;
  }
}
