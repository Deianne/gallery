import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ImageGalleryComponent {
  images: { src: string, aspectRatioClass?: string, comments?: string[] }[] = [];
  selectedImageIndex: number | null = null;
  newComment: string = '';

  onFileSelected(event: any): void {
    const files = event.target.files;
    for (const file of files) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = new Image();
        img.onload = () => {
          const aspectRatioClass = this.getAspectRatioClass(img.width, img.height);
          this.images.push({ src: e.target.result, aspectRatioClass, comments: [] });
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  getAspectRatioClass(width: number, height: number): string {
    const aspectRatio = width / height;

    if (aspectRatio < 0.67) {
      return 'tall';
    } else if (aspectRatio > 0.8 && aspectRatio < 1) {
      return 'slightly-wide-portrait'; 
    } else if (Math.abs(aspectRatio - 1) < 0.2) {
      return 'nearly-square';
    } else {
      return '';
    }
  }

  openImage(index: number): void {
    this.selectedImageIndex = index;
  }

  closeImage(): void {
    this.selectedImageIndex = null;
    this.newComment = '';
  }

  prevImage(): void {
    if (this.selectedImageIndex !== null && this.selectedImageIndex > 0) {
      this.selectedImageIndex--;
    }
  }

  nextImage(): void {
    if (this.selectedImageIndex !== null && this.selectedImageIndex < this.images.length - 1) {
      this.selectedImageIndex++;
    }
  }

  get selectedImageSrc(): string | null {
    return this.selectedImageIndex !== null ? this.images[this.selectedImageIndex].src : null;
  }

  addComment(): void {
    if (this.selectedImageIndex !== null && this.newComment.trim()) {
      this.images[this.selectedImageIndex].comments?.push(this.newComment.trim());
      this.newComment = '';
    }
  }
}
