import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { Entry } from "src/app/models/entry.model";
import { IngresoEgresoService } from "src/app/services/ingreso-egreso.service";
import { UiService } from "src/app/services/ui.service";
import * as moment from 'moment'
@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page implements OnDestroy, OnInit {
  formIngresosEgresos: FormGroup;
  typeSubs: Subscription;

  public categoryEgreso: string[] = [
    "​Alimentación",
    "Vivienda​",
    "Transporte​",
    "Coche",
    "Impuesto",
    "Salud y autocuidado",
    "Entretenimiento y diversión",
    "​Vestuario​",
    "Educación​",
    "Teléfono",
    "Deporte",
    "Bebé",
    "Belleza",
    "Regalo",
    "Otros",
  ];

  public categoryIngreso: string[] = [
    "Salario",
    "Premios",
    "Subsidios",
    "Venta",
    "Alquiler",
    "Reenbolsos",
    "Cupones",
    "Loptería",
    "Inversiones",
    "Otros"
  ];

  constructor(
    private formBuider: FormBuilder,
    private ui: UiService,
    private ingresoEgreso: IngresoEgresoService
  ) {
    this.formIngresosEgresos = this.formBuider.group({
      name: ["", Validators.required],
      quantity: [null, [Validators.required, Validators.min(1)]],
      type: ["ingreso"],
      category: ["", Validators.required],
      date: ["", Validators.required],
    });

    this.typeSubs = this.formIngresosEgresos
      .get("type")
      .valueChanges.subscribe(() =>
        this.formIngresosEgresos.get("category").setValue("")
      );
  }

  ngOnInit(): void {
    this.selectDate();
  }

  selectDate() {
    this.formIngresosEgresos.get("date").setValue(moment().format('DD/MM/YYYY'));
  }

  ngOnDestroy(): void {
    this.typeSubs.unsubscribe();
  }

  async save() {
    await this.ui.presentLoading("Guardando"); 
    const entry: Entry = { ...this.formIngresosEgresos.value };
    await this.ingresoEgreso.crearIngresoEgreso(entry);
    this.ui.stopLoading();
    this.ui.presentToast("Guardado con éxito");
    this.formIngresosEgresos.reset();
    this.selectDate();
    this.formIngresosEgresos.patchValue({ type: "ingreso" });
  }

}
