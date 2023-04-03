import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, ViewContainerRef } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Directive({
  selector: 'toggle'
})
export class ToggleDirective implements OnInit {
  private _nativeElement;
  private _span: any
  private _icon: string = '>'
  private _nativeIcon: any
  private _nativeIconContent: string = 'chevron_right'
  private _iconStatus: boolean = true
  private _selectedStatus: boolean = false

  @Input() public set selectedStatus(status: boolean) {
    this._selectedStatus = status
    console.log(`Status changed to : ${this._selectedStatus ? 'true' : 'false'}` )
    if (this.useIcon) {
      this._nativeIcon.textContent = status ? 'expand_more' : 'chevron_right'
    }
  }

  @Input() public set isExpandable(status: boolean) {
    this._iconStatus = status
    if (!status) {
      this._icon = '-'
      this._nativeIconContent = 'remove'
    } else {
      this._icon = '>'
      this._nativeIconContent = 'chevron_right'
    }
  }

  @Input() public useIcon: boolean = false

  @Output() public onToggle: EventEmitter<boolean> = new EventEmitter()

  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer2,
    private _viewContainerRef: ViewContainerRef,
  ) {
    this._nativeElement = _elementRef.nativeElement
  }

  ngOnInit(): void {
    this._span = this._renderer.createElement('span')

    if (this.useIcon) {
      // @todo : Check if MatIcon is registered before to
      const icon = this._viewContainerRef.createComponent(MatIcon)
      this._nativeIcon = icon.instance._elementRef.nativeElement
      this._nativeIcon.textContent = this._nativeIconContent
      this._renderer.appendChild(this._span, this._nativeIcon)
    } else {
      this._span.textContent = this._icon
      // Add some classes to span
      this._renderer.addClass(this._span, 'icon-list')
      this._renderer.addClass(this._span, 'up')
      this._renderer.setAttribute(this._span, 'title', `${this.selectedStatus ? 'Hide' : 'Show'}}`)
    }
    this._renderer.appendChild(this._nativeElement,
      this._span
    )
  }

  @HostListener('click')
  onClick(): void {
    if (this._iconStatus) {
      this._selectedStatus = !this._selectedStatus
      this.onToggle.emit(this._selectedStatus)

      if (!this.useIcon) {
        if (this._selectedStatus) {
          this._renderer.removeClass(this._span, 'up')
          this._renderer.addClass(this._span, 'down')
        } else {
          this._renderer.removeClass(this._span, 'down')
          this._renderer.addClass(this._span, 'up')
        }
      } else {
        if (this._selectedStatus) {
          this._nativeIcon.textContent = 'expand_more'
        } else {
          this._nativeIcon.textContent = 'chevron_right'
        }

      }
    }
  }
}
