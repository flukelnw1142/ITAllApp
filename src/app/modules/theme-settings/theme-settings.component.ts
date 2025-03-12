import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeSettingsService } from './service/theme-settings.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-theme-settings',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './theme-settings/theme-settings.component.html',
  styleUrl: './theme-settings/theme-settings.component.scss'
})
export class ThemeSettingsComponent implements OnInit {
  themeId: number = 1;
  backgroundColor: string = '#3A3A3A';
  containerBackgroundColor: string = '#444444';

  constructor(
    private renderer: Renderer2,
    private themeService: ThemeSettingsService
  ) {}

  ngOnInit(): void {
    this.loadThemeSettings();
  }

  loadThemeSettings() {
    this.themeService.getThemeSettings().subscribe(theme => {
      console.log("Theme Data from API:", theme);
      if (theme) {
        this.themeId = theme.Id || this.themeId;
        this.backgroundColor = theme.BackgroundColor || this.backgroundColor;
        this.containerBackgroundColor = theme.ContainerBackgroundColor || this.containerBackgroundColor;
        this.applyTheme();
      }
    });
  }

  applyTheme() {
    this.renderer.setStyle(document.documentElement, '--theme-bg-color', this.backgroundColor);
    this.renderer.setStyle(document.documentElement, '--theme-container-bg', this.containerBackgroundColor);
  }

  saveThemeSettings() {
    const updatedTheme = {
      BackgroundColor: this.backgroundColor,
      ContainerBackgroundColor: this.containerBackgroundColor
    };

    this.themeService.updateThemeSettings(this.themeId, updatedTheme).subscribe(response => {
      console.log("Theme updated successfully:", response);
      
      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Theme settings updated successfully.',
        confirmButtonColor: '#3085d6',
      }).then(() => {
        this.loadThemeSettings();
      });

    }, error => {
      console.error("Error updating theme:", error);

      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'Failed to update theme settings. Please try again.',
        confirmButtonColor: '#d33',
      });
    });
  }
}