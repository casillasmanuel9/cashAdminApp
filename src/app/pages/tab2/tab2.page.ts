import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page implements OnDestroy, OnInit {
  formIngresosEgresos: FormGroup;
  typeSubs: Subscription;

  textType = "Ingreso";

  constructor(private formBuider: FormBuilder, private ui: UiService) {
    this.formIngresosEgresos = this.formBuider.group({
      name: ["", Validators.required],
      quantity: ["", Validators.required],
      type: [false],
      category: ["", Validators.required], 
      date: ['', Validators.required]
    });

    this.typeSubs = this.formIngresosEgresos
      .get("type")
      .valueChanges.subscribe((type) => this.textType = (type ?"Egreso" : "Ingreso"));
  }

  ngOnInit(): void {
    this.selectDate();
  }

  selectDate() {
    const date = new Date();
    const dateFormat = this.formatDate(date);
    this.formIngresosEgresos.get('date').setValue(dateFormat);
  }

  ngOnDestroy(): void {
    this.typeSubs.unsubscribe();
  }

  async save() {
    await this.ui.presentLoading('Guardando');
    setTimeout(() => {
      console.log(this.formIngresosEgresos.value);
      this.ui.stopLoading()
      this.ui.presentToast('Guardado con éxito');
      this.formIngresosEgresos.reset();
      this.selectDate();
    }, 2000);
  }

  formatDate(date: Date) {
    const now = new Date();
    const day = ("0" + now.getDate()).slice(-2);
    const month = ("0" + (now.getMonth() + 1)).slice(-2);
    const today = now.getFullYear()+"-"+(month)+"-"+(day) ;
    return today;
  }
}
