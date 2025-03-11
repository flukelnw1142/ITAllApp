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
      this.renderer.setStyle(document.documentElement, '--theme-bg-color', theme.BackgroundColor);
      this.renderer.setStyle(document.documentElement, '--theme-container-bg', theme.ContainerBackgroundColor);
    });
  }
}