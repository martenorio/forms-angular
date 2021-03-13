import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {
  form:FormGroup;
  constructor( private fb: FormBuilder, private validadores:ValidadoresService) {
    this.crearFormulario();
    this.cargarDataAlFormulario();
   }

  ngOnInit(): void {
  }

  get pasatiempos(){
    return this.form.get('pasatiempos') as FormArray
  }
  get nombreNoValido(){
    return this.form.get('nombre').invalid && this.form.get('nombre').touched;
  }
  get apellidoNoValido(){
    return this.form.get('apellido').invalid && this.form.get('apellido').touched;
  }
  get apellidoNoPermitido(){
    return this.form.get('apellido').errors?.noMiguel;
  }
  get correoNoValido(){
    return this.form.get('correo').invalid && this.form.get('correo').touched;
  }
  get password1NoValido(){
    return this.form.get('password1').invalid && this.form.get('password1').touched;
  }
  get password2NoValido(){
    const pass1 = this.form.get('password1').value; 
    const pass2 = this.form.get('password2').value; 
    return (pass1 === pass2) ? false : true;
  }
  get distritoNoValido(){
    return this.form.get('direccion.distrito').invalid && this.form.get('direccion.distrito').touched;
  }
  get ciudadNoValido(){
    return this.form.get('direccion.ciudad').invalid && this.form.get('direccion.ciudad').touched;
  }

  crearFormulario(){
    this.form = this.fb.group({
      nombre: ['', [Validators.required,Validators.minLength(5)]],
      apellido:['',[Validators.required,this.validadores.noMiguel]],
      correo:['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password1:['',Validators.required],
      password2:['',Validators.required],
      direccion:this.fb.group({
        distrito:['',Validators.required],
        ciudad:['',Validators.required]
      }),
      pasatiempos: this.fb.array([])
    },{
      validators:this.validadores.passwordIguales('password1','password2')
    });
  }
  guardar(){
    if(this.form.invalid){
      return Object.values(this.form.controls).forEach(control =>{
        if(control instanceof FormGroup){
          Object.values(control.controls).forEach(control => control.markAsTouched)
        }else{
          control.markAllAsTouched(); 
        }
      })
    }
    console.log(this.form);
    this.form.reset();
  }
  agregarPasatiempo(){
    this.pasatiempos.push(this.fb.control('',Validators.required))
  }
  borrarPasatiempo(index:number){
    this.pasatiempos.removeAt(index);
  }
  cargarDataAlFormulario(){
    // se puede utilizar el "reset" para cargar información
    // inicial sin que te pida todos los campos requeridos como el "setValue"
    this.form.reset({
      nombre:'Miguel',
      apellido:'Tenorio',
      correo:'mart@gmail.com',
      direccion:{
        distrito:'19-b',
        ciudad:'Hammer'
      }
    });
    ['comer','dormir'].forEach( valor => this.pasatiempos.push(this.fb.control(valor))) //cargar info
  }
}
