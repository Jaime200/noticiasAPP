import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

   @ViewChild(IonSegment,{ static:true}) segment:IonSegment;
    categorias = [
      'business', 'entertainment', 'general', 'health', 
      'science', 'sports', 'technology',
    ]
  noticias:Article[]= []
  constructor( private NoticiasService:NoticiasService) {

  }

  ngOnInit(){
    this.segment.value= this.categorias[0];
    this.getTopHeadLinesCategorias(this.categorias[0])
  }

  cambioCategoria( event ){
    this.noticias = [];
    this.getTopHeadLinesCategorias(event.detail.value)
  }

  private getTopHeadLinesCategorias(categoria:string, event ? ){
    this.NoticiasService
    .getTopHeadLinesCategorias(categoria)
    .subscribe(
      resp =>{      
          if(resp.articles.length === 0){
            event.target.disabled = true;
            event.target.complete();
            return;
          } 
        this.noticias.push(...resp.articles);
        if(event){ 
          event.target.complete();
        }
      }
    )
  }

  loadData( event ){
    this.getTopHeadLinesCategorias( this.segment.value,event );
  }


}
