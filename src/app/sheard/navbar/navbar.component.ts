import { Component } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  currentUser: any;
  userName = localStorage.getItem('userName') ? localStorage.getItem('userName') : 'Guest'
  constructor(private _HelperService: HelperService) {
    _HelperService.getCurrentUser().subscribe({
      next: (res) => {
        console.log(res);
        this.currentUser = res
      }
    })
  }

}
