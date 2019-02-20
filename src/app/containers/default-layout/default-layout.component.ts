import { Component, OnDestroy } from '@angular/core';
import { navItems } from './../../_nav';
import { AuthService } from '../../utils/services/auth/auth.service';
import { Router } from '@angular/router';

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
  constructor(private _auth: AuthService, private _router: Router) {
    this.changes = new MutationObserver(mutations => {
      this.sidebarMinimized = document.body.classList.contains(
        'sidebar-minimized'
      );
    });

    this._auth.user.subscribe(user => {
      console.log(user);
      this.navItems = navItems[user ? user.userType : 'originalNav'];
      // switch (user.usertype) {
      //   case 'teacher': {
      //     this.navitems = navitems.teachernav;
      //     break;
      //   }
      //   case 'academyadmin': {
      //     this.navitems = navitems.academyadminnav;
      //     break;
      //   }
      //   case 'student': {
      //     this.navitems = navitems.studentnav;
      //     break;
      //   }

      //   default: {
      //     break;
      //   }
      // }
    });

    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  async logOut() {
    await this._auth.signOut();
    this._router.navigate(['/dashboard']);
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }
}
