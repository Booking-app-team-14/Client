import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SlickCarouselComponent} from "ngx-slick-carousel";

interface  carouselImage{
  imageSrc: string;
  imageAlt: string
}
@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrl: './image-slider.component.css'
})

export class ImageSliderComponent implements OnInit {
  ngOnInit(): void {
  }

  @Input() images: carouselImage[] = [
    // {img:'assets/mainPagePicture.jpg'},
    // {img:'assets/mainPagePicture.jpg'},
    // {img:'assets/mainPagePicture.jpg'},
    // {img:'assets/mainPagePicture.jpg'},
    // {img:'assets/mainPagePicture.jpg'}
  ]
  @Input() indicators = true;
  @Input() controls = true;
  @Input() autoSlide = false;
  @Input() slideInterval = 3000;
  selectedIndex = 0;
  selectImage(index: number) {
    this.selectedIndex = index
  }

  onPrevClick() {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.images.length - 1;
    } else {
      this.selectedIndex--;
    }
  }

  onNextClick() {
    if (this.selectedIndex === this.images.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }

}
