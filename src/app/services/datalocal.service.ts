import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../pages/interfaces/interfaces';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class DatalocalService {

  noticias: Article[] = []
  constructor(private storage: Storage,
              public toastController: ToastController) { 
    this.cargarNoticias();
  }

  async presentToast(mensaje:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500
    });
    toast.present();
  }

  guardarNoticia(noticia:Article){
    const existe = this.noticias.find(f => f.title === noticia.title);
    if(existe) return 
    this.noticias.unshift(noticia);

    this.storage.set('favoritos',this.noticias);
    this.presentToast('Agregado a favorito')
  }

  async cargarNoticias(){
    const favoritos = await this.storage.get('favoritos')
    console.log(favoritos);
    if(favoritos) this.noticias = favoritos;
  }

  borrarNoticia(noticiaR:Article){
    this.noticias = this.noticias.filter(f => f.title !== noticiaR.title );    

    this.storage.set('favoritos',this.noticias);
    this.presentToast('Borrado de favorito')
  }
}
