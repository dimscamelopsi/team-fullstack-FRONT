import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: 'toggle'
})
export class ToggleDirective implements OnInit {
  private _nativeElement;
  private _span: any

  @Input() public selectedStatus : boolean = false
  @Output() public onToggle: EventEmitter<boolean> = new EventEmitter()

  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer2
  ) {
    this._nativeElement = _elementRef.nativeElement
  }

  ngOnInit(): void {
    this._span = this._renderer.createElement('span')
    this._span.textContent = '>'
    this._renderer.setAttribute(this._span, 'title', `${this.selectedStatus ? 'Hide' : 'Show'}}`)

    // Add some classes to span
    this._renderer.addClass(this._span, 'icon-list')
    this._renderer.addClass(this._span, 'up')

    this._renderer.appendChild(this._nativeElement,
      this._span
    )
  }

  @HostListener('click')
  onClick(): void {
    this.selectedStatus = !this.selectedStatus
    if (this.selectedStatus) {
      this._renderer.removeClass(this._span, 'up')
      this._renderer.addClass(this._span, 'down')
    } else {
      this._renderer.removeClass(this._span, 'down')
      this._renderer.addClass(this._span, 'up')
    }
    this.onToggle.emit(this.selectedStatus)
  }
}
