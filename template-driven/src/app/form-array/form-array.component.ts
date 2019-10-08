import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.css']
})
export class FormArrayComponent implements OnInit {

  clientForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
    }),
    // se eu ja quiser iniciar com dois telefones this.fb.array([''], [''])
    phones: this.fb.array(['']),
    /* children: this.fb.group({
      name: [''],
      age: [''],
    }) */

    // atenção que não é passado ''
    children: this.fb.array([]),
  });

  // coloco pra fora os phones ja convertendo em FormArray
  // aqui ele cria uma referencia de memória
  phones = this.clientForm.get('phones') as FormArray;
  children = this.clientForm.get('children') as FormArray;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

  submit() {
    console.log(this.clientForm.value);
  }

  addPhone() {
    this.phones.push(this.fb.control(''));
  }

  addChild() {
    // aqui diciono um grupo
    this.children.push(
      this.fb.group({
        name: this.fb.control(''),
        age: this.fb.control(''),
      })
    );
  }
}
