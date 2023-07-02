import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent {
  
  @ViewChild('tagInput')
  public tagInput!:ElementRef <HTMLInputElement>;

  constructor(private gifsService: GifsService) {
    
  }
  
  searchTag() {
    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.searchTags (newTag);
    this.tagInput.nativeElement.value = '';
  }
}