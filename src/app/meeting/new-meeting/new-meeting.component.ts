import { Component, OnInit } from "@angular/core";
import { AmazingTimePickerService } from "amazing-time-picker";
import { RoomsService } from "src/app/shared/rooms.service";
import { NotificationService } from "src/app/shared/notification.service";
import { MeetingService } from "src/app/shared/meeting.service";

@Component({
  selector: "app-new-meeting",
  templateUrl: "./new-meeting.component.html"
})
export class NewMeetingComponent implements OnInit {
  constructor(
    public roomService: RoomsService,
    private atp: AmazingTimePickerService,
    public meetingService: MeetingService,
    private notificationservice: NotificationService
  ) {}

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

  onSubmitMeeting() {
    if (this.meetingService.form.valid) {
      this.meetingService.insertMeeting(this.meetingService.form.value);
      this.meetingService.form.reset();
      this.meetingService.initializeFormGroup();
      this.notificationservice.success(":: Submitted Successfully");
    }
  }
}
