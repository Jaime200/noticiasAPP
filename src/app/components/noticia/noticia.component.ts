import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../pages/interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DatalocalService } from '../../services/datalocal.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() index:number = 0;
  @Input() enFavoritos : boolean 
  constructor(private iab: InAppBrowser,
    private actionSheetController: ActionSheetController,
    private socialSharing: SocialSharing,
    private DatalocalService:DatalocalService,
    ) { }

  ngOnInit() {}

  abrirNoticia(){
  const browser = this.iab.create(this.noticia.url,'_system');
  }

  async lanzarMenu(){
    let guardarBorrarBtn
    if(this.enFavoritos){
      guardarBorrarBtn = {
        text: 'Borrar Favorito',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Borrar de favorito');
          this.DatalocalService.borrarNoticia(this.noticia);
        }
      }
    }else{
      guardarBorrarBtn = {
        text: 'Favoritos',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorito');
          this.DatalocalService.guardarNoticia(this.noticia);
        }
      }
    }
    const actionSheet = await this.actionSheetController.create({
     
      buttons: [ {
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          this.socialSharing.share(
            this.noticia.title,this.noticia.source.name,'', this.noticia.url
          );
          console.log('Share clicked');
        }
      },guardarBorrarBtn , {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
