import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(
    private loadingCrtl: LoadingController,
    private toastCrtl: ToastController
  ) { }

  // Loading
  async presentLoading(message: string) {
    const loading = await this.loadingCrtl.create({
      message
    });
    await loading.present();
  }

  stopLoading() {
    this.loadingCrtl.dismiss();
  }

  // Toast
  async presentToast(message: string) {
    const toast = await this.toastCrtl.create({
      message,
      duration: 2000
    });
    toast.present();
  }
  
}
