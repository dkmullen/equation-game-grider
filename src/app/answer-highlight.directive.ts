import { Directive, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { map, filter } from 'rxjs/operators';

@Directive({
  selector: '[appAnswerHighlight]'
})
export class AnswerHighlightDirective {

  constructor(private el: ElementRef, private controlName: NgControl) {
   }

   ngOnInit() {
    console.log(this.controlName.control.parent)
    this.controlName.control.parent.valueChanges.pipe(
      // map transforms the incoming value w/my logic, returns transformed value
       // divide variance of user's answer by correct answer (and use abs to get a positive value)
      map(({ a, b, answer }) => Math.abs((a + b - answer) / (a + b))

      )
    ).subscribe(value => {
      console.log(value)
      if (value < 0.2) {
        this.el.nativeElement.classList.add('close');
      } else {
        this.el.nativeElement.classList.remove('close');
      }
    })

   }
}
