import { Component, OnInit } from "@angular/core";
import { AmazingTimePickerService } from "amazing-time-picker";
import { TrainingService } from "src/app/shared/training.service";
import { NotificationService } from "src/app/shared/notification.service";
import { RoomsService } from "src/app/shared/rooms.service";

@Component({
  selector: "app-detail-training",
  templateUrl: "./detail-training.component.html"
})
export class DetailTrainingComponent implements OnInit {
  detail;
  constructor(
    private trainingService: TrainingService,
    private atp: AmazingTimePickerService,
    private roomservice: RoomsService,
    private notificationservice: NotificationService
  ) {
    this.detail = this.trainingService.returnFormEditDetails().value;
    console.log(this.detail);
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
    if (this.trainingService.form.valid) {
      if (!this.trainingService.form.get("$key").value) {
        this.trainingService.updateEmployee(this.trainingService.form.value);
      }
      this.trainingService.insertEmployee(this.trainingService.form.value);
      this.trainingService.form.reset();
      this.trainingService.initializeFormGroup();
      this.notificationservice.success(":: Submitted Successfully");
    }
  }
}
