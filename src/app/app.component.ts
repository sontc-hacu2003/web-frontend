import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/** Root component — just the router outlet. Storefront vs Admin chrome
 * is provided by their respective layout components. */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {}
