import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }
  noMiguel(control:FormControl):{[s:string]:boolean}{
    console.log(control);
    if(control.value?.toLowerCase() === 'miguel'){
      return {
        noMiguel:true
      }
    }
    return null;
  }
  passwordIguales(pass1:string, pass2:string){
    return (formGroup:FormGroup) => {
      
    }
  }
}
