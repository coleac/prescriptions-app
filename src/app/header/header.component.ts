import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { NavigationCancel,
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../core/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit{
  
  isLoggedIn: Observable<boolean>;

  constructor(private _authService: AuthService, private _progress: NgProgress, private _router: Router) {
    this._router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }

  ngOnInit() {
    this.isLoggedIn = this._authService.isLoggedIn;
  }

  onLogout() {
    this._authService.doLogout();
  }

  logout(){
    this._authService.doLogout()
    .then((res) => {
      this._router.navigateByUrl('/login');
    }, (error) => {
      console.log("Logout error", error);
    });
  }

  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this._progress.start();
    }
    if (event instanceof NavigationEnd) {
      this._progress.complete();
    }
    if (event instanceof NavigationCancel) {
      this._progress.destroy();
    }
    if (event instanceof NavigationError) {
      this._progress.destroy();
    }
  }
}



