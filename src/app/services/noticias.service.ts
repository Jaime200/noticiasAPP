import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../pages/interfaces/interfaces';
import { environment } from '../../environments/environment';
const apiKey = environment.apiKey
const apiUrl = environment.apiUrl
const headers = new HttpHeaders({
  'X-Api-key':apiKey
})
@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  headlinesPage = 0
  categoriaActual = ''
  categoriaPage = 0
  constructor( private http:HttpClient) { }

  private ejecutarQuery<T>(query:string){
    console.log(`${apiUrl}${query}`)
    return this.http.get<T>(`${apiUrl}${query}`,{
      headers
    })
  }
  getTopHeadLines(){
    this.headlinesPage ++;
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${this.headlinesPage}`)
    // return this.http.get<RespuestaTopHeadlines>(`${apiUrl}/top-headlines?country=us&category=business&apiKey=${apiKey}`);
  }

  getTopHeadLinesCategorias(categoria:string){
    if (this.categoriaActual === categoria) {
      this.categoriaPage ++
    }else{
      this.categoriaPage = 1
      this.categoriaActual = categoria
    }
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${categoria}&page=${this.categoriaPage}`)
    //return this.http.get<RespuestaTopHeadlines>(`${apiUrl}/top-headlines?country=us&category=${categoria}&apiKey=${apiKey}`);
    
  }
}
