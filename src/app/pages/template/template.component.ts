import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisesService } from 'src/app/services/paises.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  usuario = {
    nombre:"Miguel",
    apellido:"Tenorio",
    correo:"mart@gmail.com",
    pais:""
  }
  paises:any[] = [];
  constructor(private servicesPais:PaisesService) { }

  ngOnInit(): void {
    this.servicesPais.getPaises().subscribe(paises => {this.paises = paises;this.paises.unshift({nombre:"Seleccione un pais",codigo:""})});
  }
  guardar(forma:NgForm){
    // console.log(forma);
    if(forma.invalid){
      Object.values(forma.controls).forEach(control =>{
        control.markAllAsTouched();
      })
      return;
    }
    console.log(forma.value);
  }
}
