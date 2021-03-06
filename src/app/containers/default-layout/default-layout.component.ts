import { Component, OnDestroy } from '@angular/core';
import { navItems } from './../../_nav';
import { AuthService } from '../../utils/services/auth/auth.service';
import { Router } from '@angular/router';
import { MessagingService } from '../../utils/services/messaging.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy {
  // ngxs statemanagment c daikhna a k konsa user logged in a
  // ta k uska relevant sidebar (navItems) display hojain
  public navItems = null;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  public user: any;
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private msgService: MessagingService
  ) {
    this.changes = new MutationObserver(mutations => {
      this.sidebarMinimized = document.body.classList.contains(
        'sidebar-minimized'
      );
    });

    this._auth.user.subscribe(user => {
      console.log(user);
      this.user = user;
      this.navItems = navItems[user ? user.userType : 'originalNav'];
    });

    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  logOut() {
    console.log('LOGOUT');
    // this._auth.user.subscribe(async user => {
    //   await this.msgService.deleteMyToken(user);
    // });
    this.msgService.deleteMyToken(this.user);
    this._auth.signOut();
    // this._router.navigate(['/dashboard']);
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }
}
