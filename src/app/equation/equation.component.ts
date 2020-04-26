import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { delay, filter, scan } from 'rxjs/operators';
import { MathValidators } from '../math-validators';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.scss']
})
export class EquationComponent implements OnInit {
  secondsPerSolution = 0;
  mathForm = new FormGroup({
    a: new FormControl(this.randomNumber()),
    b: new FormControl(this.randomNumber()),
    answer: new FormControl(''),
  }, 
  [MathValidators.addition('answer', 'a', 'b')]
  );

  constructor() { }

  /* Getter method runs everytime someone accesses a property on our class
     In the template, {{ a }} will run this */
  get a() {
    return this.mathForm.value.a;
  }

  get b() {
    return this.mathForm.value.b;
  }

  ngOnInit() {
    const startTime = new Date();
    let numberSolved = 0;
    
    this.mathForm.statusChanges
      // .pipe(
      //   filter(value => value === 'VALID'), // continue only if value ==='VALID'
      //   delay(100),
      // )
      // .subscribe(() => {
      //   numberSolved++;
      //     this.secondsPerSolution = ( // on each formChange, calc the avg time of problem solving
      //       new Date().getTime() - startTime.getTime()
      //     ) / numberSolved / 1000;
          
      //     this.mathForm.setValue({ // can use 'setValue' when updating the entire form or
      //     a: this.randomNumber(), // 'patchValue if only updating a part
      //     b: this.randomNumber(), 
      //     answer: ''
      //   })
      // })

      // same as above, but using scan w/ an accumulator
      .pipe (
        filter(value => value === 'VALID'), // continue only if value ==='VALID'
        delay(100),
        scan((acc) => {
          return {
            numberSolved: acc.numberSolved + 1,
            startTime: acc.startTime
          }
        }, { numberSolved: 0, startTime: new Date() })
      )
      .subscribe(({ numberSolved, startTime }) => {
      // if (status === 'INVALID') { // filter replaces the need for this
      //   return;
      // }
        this.secondsPerSolution = ( // on each formChange, calc the avg time of problem solving
          new Date().getTime() - startTime.getTime()
        ) / numberSolved / 1000;

      // this.mathForm.controls.a.setValue(this.randomNumber());   // The long way
      // this.mathForm.controls.b.setValue(this.randomNumber());
      // this.mathForm.controls.answer.setValue('');

      // The short way, much better
      this.mathForm.setValue({ // can use 'setValue' when updating the entire form or
        a: this.randomNumber(), // 'patchValue if only updating a part
        b: this.randomNumber(), 
        answer: ''
      })
    })
  }

  randomNumber() {
    return Math.floor(Math.random() * 10);
  }

}
