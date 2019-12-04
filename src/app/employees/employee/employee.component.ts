import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../shared/employee.service';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService,
    private firebase: AngularFirestore,
   public toastr: ToastrManager) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(templateForm?: NgForm) {
    if (templateForm != null)
      templateForm.reset();
    this.employeeService.formData = {
      id: null,
      fullName: '',
      empCode: '',
      position: '',
      mobile: '',
      email: ''
    }
  }

  onSubmitForm(templateForm: NgForm) {
    debugger
    let data = Object.assign({}, templateForm.value);
    delete data.id;
    if (templateForm.value.id == null) {
      this.firebase.collection('employees').add(data);
      this.toastr.successToastr('Message insert successfully!', 'Employee Registration!');
    } else {
      this.firebase.doc('employees/' + templateForm.value.id).update(data);
      this.toastr.successToastr('Message insert successfully!', 'Employee Registration!');
    }
    this.resetForm(templateForm);
  }

  showToast(position: any = 'top-left') {
    this.toastr.infoToastr('This is a toast.', 'Toast', {
      position: position
    });
  }

}
