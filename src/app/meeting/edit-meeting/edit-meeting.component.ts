import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AmazingTimePickerService } from "amazing-time-picker";
import { MeetingService } from "src/app/shared/meeting.service";
import { NotificationService } from "src/app/shared/notification.service";
import { RoomsService } from "src/app/shared/rooms.service";

@Component({
  selector: "app-edit-meeting",
  templateUrl: "./edit-meeting.component.html"
})
export class EditMeetingComponent implements OnInit {
  constructor(
    public meetingService: MeetingService,
    private atp: AmazingTimePickerService,
    public roomService: RoomsService,
    private notificationservice: NotificationService,
    private router: Router
  ) {
    console.log(this.meetingService.returnFormEditDetails());
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

  onSubmitMeeting() {
    if (!this.meetingService.form.get("$key").value) {
      this.meetingService.insertMeeting(this.meetingService.form.value);
    } else {
      this.meetingService.updateMeeting(this.meetingService.form.value);
    }
    this.meetingService.form.reset();
    this.meetingService.initializeFormGroup();
    this.notificationservice.success(":: Submitted Successfully");
  }
}
