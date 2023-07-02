import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  
  public gifsList:Gif [] = [];
  
  private _tagsHistory: string[] = [];
  private apiKey:    string = 'Your api key';
  private serviceUrl:string = 'https://api.giphy.com/v1/gifs';

  constructor(private http:HttpClient) { 
    this.loadLocalStorage();
  }

  // Los arrays pasan por referencia.
  // Utilizamos el operador spread para hacer una copia.
  get tagsHistory() {
    return [...this._tagsHistory]; 
  }

  private organizeHistory (tag: string) {
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory =this._tagsHistory.filter ( (oldTag) => oldTag !== tag)
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory =this._tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }

  private saveLocalStorage():void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory)); 
  }

  private loadLocalStorage():void {
    
    if (!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse (localStorage.getItem ('history')!);;
    if (this._tagsHistory.length===0) {
      return;
    }
    this.searchTags(this._tagsHistory[0]);
  }
  
  searchTags(tag: string): void {
    
    if (tag.length === 0) {
      return;
    }
    this.organizeHistory(tag);

    const params = new HttpParams()
    .set('apiKey', this.apiKey)
    .set ('limit', '12')
    .set ('q', tag)
    
    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params})
    .subscribe(resp => {
      this.gifsList=resp.data;
    })
  }
}
