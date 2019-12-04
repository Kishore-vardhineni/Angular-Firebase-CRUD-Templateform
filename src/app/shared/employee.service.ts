import { Injectable } from '@angular/core';
import { Employee } from '../shared/employee.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class EmployeeService {

  formData: Employee;
  
  constructor(private fireStore: AngularFirestore) { }

  getEmployees(){
    return this.fireStore.collection('employees').snapshotChanges();
  }

}
