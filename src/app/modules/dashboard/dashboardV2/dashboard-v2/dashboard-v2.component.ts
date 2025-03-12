import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../service/dashboard.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-dashboard-v2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-v2.component.html',
  styleUrl: './dashboard-v2.component.scss'
})
export class DashboardV2Component implements OnInit {
  appList: any[] = [];
  backgroundColor = environment.background;
  Theme: any;
  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.getData();
    this.getThemeSettings();
  }

  getData(): void {
    this.dashboardService.getDataNew().subscribe({
      next: (response: any) => {
        console.log("🔹 API Response:", response);

        this.appList = response.map((app: any) => {
          const transformedApp = {
            ApplicationId: app.ApplicationId ?? 0,
            ApplicationName: app.ApplicationName ?? "Unknown",
            Description: app.Description ?? "No description available",
            Category: app.Category ?? "General",
            BackgroundColor: app.BackgroundColor,
            BorderColor: app.BorderColor,
            TextColor: app.TextColor,
            Icon: `${app.Icon}`,
            Url: app.Url ?? "#",
            OrderIndex: app.OrderIndex ?? 999,
            IsActive: app.IsActive ?? false,
            CreatedDate: app.CreatedDate ?? null,
            ModifiedDate: app.ModifiedDate ?? null
          };

          console.log("✅ Transformed App Data:", transformedApp);

          return transformedApp;
        });

        console.log("📌 Final appList:", this.appList);
      },
      error: (error) => {
        console.error("❌ API error:", error);
      }
    });
  }

  getThemeSettings() {
    this.dashboardService.getThemeSettings().subscribe({
      next: (response: any) => {
        this.Theme = response
      },
      error: (error) => {
        console.error("API error:", error);
      }
    });
  }
}