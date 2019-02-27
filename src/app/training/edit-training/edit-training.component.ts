import { Component, OnInit } from "@angular/core";

import { AmazingTimePickerService } from "amazing-time-picker";
import { RoomsService } from "../../shared/rooms.service";
import { NotificationService } from "../../shared/notification.service";
import { TrainingService } from "src/app/shared/training.service";

@Component({
  selector: "app-edit-training",
  templateUrl: "./edit-training.component.html"
})
export class EditTrainingComponent implements OnInit {
  constructor(
    public trainingService: TrainingService,
    private atp: AmazingTimePickerService,
    public roomservice: RoomsService,
    private notificationservice: NotificationService
  ) {
    console.log(this.trainingService.returnFormEditDetails());
  }
  ngOnInit() {
    this.trainingService.getEmployee();
  }

  open() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(timer => {
      console.log(timer);
    });
  }

  onClear() {
    this.trainingService.form.reset();
    this.trainingService.initializeFormGroup();
  }

  onSubmit() {
    if (!this.trainingService.form.get("$key").value) {
      this.trainingService.insertEmployee(this.trainingService.form.value);
    } else {
      this.trainingService.updateEmployee(this.trainingService.form.value);
    }
    this.trainingService.form.reset();
    this.trainingService.initializeFormGroup();
    this.notificationservice.success(":: Submitted Successfully");
  }
}
