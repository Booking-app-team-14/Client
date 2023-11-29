import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export class TestimonialsComponent {
  owners = [
    {
      image: '/assets/BG.png',
      rating: '★★★★★',
      comment: 'A short comment about the experience...',
      name: 'Douwe Louis'
    },
    {
      image: '/assets/BG.jpg',
      rating: '★★★★★',
      comment: 'A short comment about the experience...',
      name: 'Jennie Louis'
    },
    {
      image: '/assets/BG.jpg',
      rating: '★★★★★',
      comment: 'A short comment about the experience...',
      name: 'Jennie Louis'
    },
    {
      image: '/assets/BG.png',
      rating: '★★★★★',
      comment: 'A short comment about the experience...',
      name: 'Douwe Louis'
    },
  ];
}
