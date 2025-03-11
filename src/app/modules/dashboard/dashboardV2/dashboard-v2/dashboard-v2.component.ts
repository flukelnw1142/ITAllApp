import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../service/dashboard.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
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
    private dashboardService: DashboardService,
    private sanitizer: DomSanitizer
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
          BackgroundColor: this.sanitizeColor(app.BackgroundColor ?? "#FFFFFF"),
          BorderColor: this.sanitizeColor(app.BorderColor ?? "#000000"),
          TextColor: this.sanitizeColor(app.TextColor ?? "#000000"),
          Icon: `${app.Icon}`, // สร้าง URL สำหรับรูปภาพ
          Url: app.Url ?? "#",
          OrderIndex: app.OrderIndex ?? 999,
          IsActive: app.IsActive ?? false,
          CreatedDate: app.CreatedDate ?? null,
          ModifiedDate: app.ModifiedDate ?? null
        }));
        console.log(this.appList);
      },
      error: (error) => {
        console.error("API error:", error);
      }
    });
  }

  sanitizeColor(color: string): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(color);
  }
}