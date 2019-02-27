import { Component } from "@angular/core";
import { AmazingTimePickerService } from "amazing-time-picker";
import { TrainingService } from "../../shared/training.service";
import { NotificationService } from "../../shared/notification.service";
import { RoomsService } from "../../shared/rooms.service";
@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.scss"]
})
export class NewTrainingComponent {
  constructor(
    public trainingService: TrainingService,
    private atp: AmazingTimePickerService,
    public roomservice: RoomsService,
    private notificationservice: NotificationService
  ) {}

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
        this.trainingService.insertEmployee(this.trainingService.form.value);
      } else {
        this.trainingService.updateEmployee(this.trainingService.form.value);
      }
      this.trainingService.form.reset();
      this.trainingService.initializeFormGroup();
      this.notificationservice.success(":: Submitted Successfully");
    }
  }
}
