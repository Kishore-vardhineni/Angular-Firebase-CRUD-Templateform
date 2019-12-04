import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../shared/employee.service';
import { Employee } from '../../shared/employee.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  list: Employee[];
  constructor(private employeeService: EmployeeService, 
    private fireStore: AngularFirestore,
    private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.spinnerService.show();
    this.employeeService.getEmployees().subscribe(actionArray => {
      this.list = actionArray.map(item => {
         return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
         } as Employee
      })
      this.spinnerService.hide();
    })
  }
  
  onEdit(emp: Employee) {
     this.employeeService.formData = Object.assign({}, emp); 
  }

  onDelete(id: string){
    if(confirm("Are you sure delete this record?")){
       this.fireStore.doc('employees/'+id).delete();
    }
  }
}
