import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../service/dashboard.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-dashboard-v2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-v2.component.html',
  styleUrl: './dashboard-v2.component.scss'
})
export class DashboardV2Component implements OnInit {
  appList: any[] = [];

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.dashboardService.getDataNew().subscribe({
      next: (response: any) => {
        this.appList = response.map((app: any) => ({
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
        }));
      },
      error: (error) => {
        console.error("API error:", error);
      }
    });
  }
}