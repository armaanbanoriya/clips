import { Directive,HostListener } from '@angular/core';

@Directive({
  selector: '[app-event-blocker]'
})
export class EventBlockerDirective {

  /**
   * handleEvent
   */
  @HostListener('drop',['$event'])
  @HostListener('dragover',['$event'])
  public handleEvent(event: Event) {
    event.preventDefault()

  }

}