import { Component, OnInit } from '@angular/core';
import { DatalocalService } from '../../services/datalocal.service';
import { Article } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  //public noticias:Article[] = []
  public sliderOpts = {
    allowSlidePrev : false,
    allowSlideNext : false
  }
  constructor(public DatalocalService:DatalocalService) {
    //console.log(DatalocalService.noticias)
    
  }
 async ngOnInit(){
  //await this.DatalocalService.cargarNoticias();
  //this.noticias = this.DatalocalService.noticias;
  //console.log(this.noticias)
 }  

}
