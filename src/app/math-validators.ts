import { AbstractControl } from '@angular/forms';

export class MathValidators {
    /* static means these have access only to args passed in, not to 
       properties on the class, but also no need to declare new instance
       of the class */
    static addition(target: string, sourceOne: string, sourceTwo: string) {
        return (form: AbstractControl) => {
            const sum = form.value[target];
            const firstNumber = form.value[sourceOne];
            const secondNumber = form.value[sourceTwo];
            if (firstNumber + secondNumber === parseInt(sum)) {
              return null;
            }
            return { addition: true } // ie, there IS an error on the addition control
        }

    }

    static addition2(form: AbstractControl) {
        const { a, b, answer } = form.value; // Destructuring, replaces... 
        if (a + b === parseInt(answer)) { // if(form.value.a + form.value.b etc)
          return null;
        }
        return { addition: true } // ie, there IS an error on the addition control
    }
 
}

// MathValidators.addition();

