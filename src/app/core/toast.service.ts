import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private _duration: number = 3
  private _cssClass: string = 'success'



  constructor(
    private _snackBar: MatSnackBar
  ) { }

  /**
   * Set the duration of the toast message.
   * @param val The duration value in seconds.
   */
  set duration(val: number) {
    this._duration = val
  }


  /**
  * Set the CSS class for the toast message.
  * @param val The CSS class name.
  */
  set cssClass(val: string) {
    this._cssClass = val
  }


  /**
 * Show a toast message.
 * @param message The message to display.
 * @param action The action text for the toast.
 */
  public show(message: string, action?: string): void {
    const _snackConfig: MatSnackBarConfig = {
      duration: this._duration * 1000,
      panelClass: this._cssClass
    }

    this._snackBar.open(
      message,
      action,
      _snackConfig
    )
    // Reset the CSS class to default after showing the toast.
    this._cssClass = 'success'
  }
}
