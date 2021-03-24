import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { promise } from 'selenium-webdriver';

interface ErrorValidate{
  [s:string]:boolean  
}

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }
  noMiguel(control:FormControl):ErrorValidate{
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
  existeUsuario(control:FormControl): Promise<ErrorValidate> | Observable<ErrorValidate>{
    if(!control.value){ //para que no se ejecute al cargar el formulario ya que es una validacion asincrona
      return Promise.resolve(null)
    }
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        if(control.value === "strider"){
          resolve({existe:true})
        }else{
          resolve(null)
        }
      },3500)
    });
  }
}
