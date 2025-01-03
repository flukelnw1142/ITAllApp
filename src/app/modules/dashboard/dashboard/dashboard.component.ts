import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  appList = [
    { name: 'Team Calendar', icon: 'Calendar icon.png', Url:'http://10.10.0.28:8012/'},
    { name: 'Meeting Room Reservation System', icon: 'Meeting Room icon.png', Url:'http://10.10.0.28:4200/' },
    { name: 'Employee Evaluation', icon: 'Evaluation icon.png', Url:'http://eva.oneeclick.co:8001'},
    { name: 'Employee AD', icon: 'AD icon.png',Url:'https://10.10.0.28:5003/' },
    { name: 'One Portal', icon: 'One Portal icon.png',Url:'http://10.10.0.28:8085/auth' },
    { name: 'Freshservice', icon: 'Freshservice icon.png',Url:'https://itsm-oneeclick.freshservice.com/' }
  ];
}
