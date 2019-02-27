import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import * as _ from "lodash";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class TrainingService {
  constructor(
    private firebase: AngularFireDatabase,
    private authService: AuthService
  ) {}

  employeeList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    topic: new FormControl("", Validators.required),
    trainer: new FormControl("", Validators.required),
    description: new FormControl("", [
      Validators.required,
      Validators.minLength(10)
    ]),
    date: new FormControl(""),
    starTime: new FormControl("", Validators.required),
    endTime: new FormControl("", Validators.required),
    selectRooms: new FormControl("")
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      topic: "",
      trainer: "",
      description: "",
      date: "",
      starTime: "",
      endTime: "",
      selectRooms: "0"
    });
  }
  /**
   * @description This function created for getting upcomming training list
   *@returns All Trainning data
   */
  getEmployee() {
    this.employeeList = this.firebase.list("employees");
    return this.employeeList.snapshotChanges();
  }

  /**
   * @description function create for insert Training to the Database
   * @param  {} employee
   */
  insertEmployee(employee) {
    this.employeeList.push({
      topic: employee.topic,
      trainer: employee.trainer,
      description: employee.description,
      date: employee.date.toString(),
      starTime: employee.starTime,
      endTime: employee.endTime,
      selectRooms: employee.selectRooms
    });
  }
  /**
   * @description this function create for edit Training purpose
   * @param  {} employee
   */
  updateEmployee(employee) {
    this.employeeList.update(employee.$key, {
      topic: employee.topic,
      trainer: employee.trainer,
      description: employee.description,
      date: employee.date,
      starTime: employee.starTime,
      endTime: employee.endTime,
      selectRooms: employee.selectRooms
    });
  }
  /**
   * @description function created for delete schedule training
   * @param  {string} $key
   */
  deleteEmployee($key: string) {
    this.employeeList.remove($key);
  }

  populateForm(employee) {
    this.form.setValue(_.omit(employee, "employee.selectRooms"));
  }
  /**
   * @description this function return Form
   * @returns form
   */
  returnFormEditDetails() {
    return this.form;
  }
}
