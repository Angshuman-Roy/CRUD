import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PDF Reader';
  selectedFileName = '';
  pdfUrl: SafeResourceUrl | null = null;
  errorMessage = '';

  constructor(private sanitizer: DomSanitizer) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    this.errorMessage = '';
    this.pdfUrl = null;
    this.selectedFileName = '';

    if (!file) {
      return;
    }

    if (file.type !== 'application/pdf') {
      this.errorMessage = 'Please upload a valid PDF file.';
      return;
    }

    const blobUrl = URL.createObjectURL(file);
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
    this.selectedFileName = file.name;
  }
}
