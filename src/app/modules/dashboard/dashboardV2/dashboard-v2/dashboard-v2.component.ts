import { Component } from '@angular/core';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: 'app-dashboard-v2',
  imports: [],
  templateUrl: './dashboard-v2.component.html',
  styleUrl: './dashboard-v2.component.scss'
})
export class DashboardV2Component {
appList: any;
constructor(
    private dashboardService: DashboardService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.dashboardService.getDataNew().subscribe({
      next: (response: any) => {
        this.appList = response.map((app: any) => ({
          ...app,
          Icon: `data:image/png;base64,${app.Icon}`,
        }));
        console.log(this.appList);
      },
      error: (error) => {
        console.error("API error:", error);
      }
    });
  }
}