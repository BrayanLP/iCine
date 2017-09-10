import { FormControl } from '@angular/forms';

export class LetrasValidator {

  static isValid(control: FormControl){
    const re = /^[a-zA-Z\_\- ]*$/.test(control.value);
    
    if (re){
      return null;
    }

    return {
      "invalidName": true
    };

  }
}