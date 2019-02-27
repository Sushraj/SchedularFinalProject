import { Component, OnInit } from "@angular/core";
import { MeetingService } from "src/app/shared/meeting.service";
import { AmazingTimePickerService } from "amazing-time-picker";
import { RoomsService } from "src/app/shared/rooms.service";
import { NotificationService } from "src/app/shared/notification.service";

@Component({
  selector: "app-detail-meeting",
  templateUrl: "./detail-meeting.component.html"
})
export class DetailMeetingComponent implements OnInit {
  detail;
  constructor(
    private meetingService: MeetingService,
    private atp: AmazingTimePickerService,
    private roomservice: RoomsService,
    private notificationservice: NotificationService
  ) {
    this.detail = this.meetingService.returnFormEditDetails().value;
    console.log(this.detail);
  }
  ngOnInit() {
    this.meetingService.getMeeting();
  }

  open() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(timer => {
      console.log(timer);
    });
  }

  onClear() {
    this.meetingService.form.reset();
    this.meetingService.initializeFormGroup();
  }

  onSubmit() {
    if (this.meetingService.form.valid) {
      if (!this.meetingService.form.get("$key").value) {
        this.meetingService.updateMeeting(this.meetingService.form.value);
      }
      this.meetingService.insertMeeting(this.meetingService.form.value);
      this.meetingService.form.reset();
      this.meetingService.initializeFormGroup();
      this.notificationservice.success(":: Submitted Successfully");
    }
  }
}
