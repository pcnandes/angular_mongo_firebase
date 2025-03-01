import { Component, OnInit } from '@angular/core';
import { Department } from '../department';
import { DepartmentService } from '../department.service';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  depName: string = '';
  departments: Department[] = [];
  depEdit: Department = null;
  private unsubscribe$: Subject<any> = new Subject();

  constructor(
    private departmentService: DepartmentService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.departmentService.get()
      // será dado unsubscribe quando o this.unsubscribe$ morrer. Ele morre no ngOndestroy
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (deps) => {
          this.departments = deps;
        },
        (err) => {
          console.error(err);
        });
  }

  save() {
    if (this.depEdit) {
      this.departmentService.update({name: this.depName, _id: this.depEdit._id})
        .subscribe(
          (dep) => {
            this.notify('Updated');
          },
          (err) => {
            console.error(err);
            this.notify('Error');
          }
        );
    } else {
      this.departmentService.add({name: this.depName})
        .subscribe(
          (dep) => {
            console.log(dep);
            this.clearFields();
            this.notify('Inserted');
          },
          (err) => {
            console.error(err);
            this.notify('ERROR');
          }
        );
    }
  }

  clearFields() {
    this.depName = '';
    this.depEdit = null;
  }

  cancel(dep: Department) {
    this.clearFields()
  }

  edit(dep: Department) {
    this.depName = dep.name;
    this.depEdit = dep;
  }

  delete(dep: Department) {
    this.departmentService.del(dep)
        .subscribe(
          () => {
            this.notify('Removed');
          },
          (err) => {
            console.error(err);
            this.notify('ERROR');
          }
        );
  }

  notify(msg: string) {
    this.snackBar.open(msg, 'OK', {duration: 3000});
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }
}
