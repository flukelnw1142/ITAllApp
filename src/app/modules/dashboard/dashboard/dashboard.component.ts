import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { DashboardService } from '../service/dashboard.service';
import { IApp } from '../../interface/dashboard.interface';
import { environment } from '../../../../environments/environment.dev';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  appListfix = [
    { name: 'Team Calendar', icon: 'Calendar icon.png', Url:'http://10.10.0.28:8012/'},
    { name: 'Meeting Room Reservation System', icon: 'Meeting Room icon.png', Url:'http://10.10.0.28:4200/' },
    { name: 'Employee Evaluation', icon: 'Evaluation icon.png', Url:'http://eva.oneeclick.co:8001'},
    { name: 'Employee AD', icon: 'AD icon.png',Url:'https://10.10.0.28:5003/' },
    { name: 'One Portal', icon: 'One Portal icon.png',Url:'http://10.10.0.28:8085/auth' },
    { name: 'Freshservice', icon: 'Freshservice icon.png',Url:'https://itsm-oneeclick.freshservice.com/' }
  ];
  appList: IApp[] = [];
  test = environment.name
  private _cdr = inject(ChangeDetectorRef);
  constructor(private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getData();
  }
  
  getData(): void {
    this.dashboardService.getData().subscribe({
      next: (response: any) => {
        this.appList = response.map((app: any) => ({
          ...app,
          Icon: `data:image/png;base64,${app.Icon}`,
        }));
      },
      error: (error) => {
        console.error("API error:", error);
      }
    });
  }

  goToMannage(): void {
    this.router.navigate(['/manage/manage-app']);
  }
}