import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { DashboardService } from './modules/dashboard/service/dashboard.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  isCollapsed = false;

  constructor(private dashboardService: DashboardService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.dashboardService.getThemeSettings().subscribe(theme => {
      console.log("Theme Data from API:", JSON.stringify(theme));
      
      if (theme && theme.BackgroundColor && theme.ContainerBackgroundColor) {
        console.log("Setting CSS Variables...");
  
        this.renderer.setStyle(document.documentElement, '--theme-bg-color', theme.BackgroundColor.trim());
        this.renderer.setStyle(document.documentElement, '--theme-container-bg', theme.ContainerBackgroundColor.trim());
  
        setTimeout(() => {
          console.log("Updated --theme-bg-color:", getComputedStyle(document.documentElement).getPropertyValue('--theme-bg-color'));
          console.log("Updated --theme-container-bg:", getComputedStyle(document.documentElement).getPropertyValue('--theme-container-bg'));
        }, 500);
      } else {
        console.warn("Invalid theme data received:", theme);
      }
    });
  }  
}