import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import * as _ from "lodash";

@Injectable({
  providedIn: "root"
})
export class MeetingService {
  constructor(private firebase: AngularFireDatabase) {}
  meetingList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    meetingName: new FormControl("", Validators.required),
    organizerName: new FormControl("", Validators.required),
    agenda: new FormControl("", [
      Validators.required,
      Validators.minLength(10)
    ]),
    attendeeList: new FormControl("", [
      Validators.required,
      Validators.minLength(10)
    ]),
    date: new FormControl("", Validators.required),
    starTime: new FormControl("", Validators.required),
    endTime: new FormControl("", Validators.required),
    selectRooms: new FormControl("")
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      meetingName: "",
      organizerName: "",
      agenda: "",
      attendeeList: "",
      date: "",
      starTime: "",
      endTime: "",
      selectRooms: "0"
    });
  }
  /**
   * @description get upcomming meeting list
   * @returns return whole upcomming list
   */
  getMeeting() {
    this.meetingList = this.firebase.list("meetings");
    return this.meetingList.snapshotChanges();
  }
  /**
   * @description insert new meeting in database using this function
   * @param  {} meeting
   */
  insertMeeting(meeting) {
    this.meetingList.push({
      meetingName: meeting.meetingName,
      organizerName: meeting.organizerName,
      agenda: meeting.agenda,
      attendeeList: meeting.attendeeList,
      date: meeting.date.toString(),
      starTime: meeting.starTime,
      endTime: meeting.endTime,
      selectRooms: meeting.selectRooms
    });
  }
  /**
   * @description update meeting using this function
   * @param  {} meeting
   */
  updateMeeting(meeting) {
    this.meetingList.update(meeting.$key, {
      meetingName: meeting.meetingName,
      organizerName: meeting.organizerName,
      agenda: meeting.agenda,
      attendeeList: meeting.attendeeList,
      date: meeting.date,
      starTime: meeting.starTime,
      endTime: meeting.endTime,
      selectRooms: meeting.selectRooms
    });
  }
  /**
   * @description delete schedule meeting using this function
   * @param  {string} $key
   */
  deleteMeeting($key: string) {
    this.meetingList.remove($key);
  }
  /**
   * @description this is inbuilt function use for edit populated form
   * @param  {} meeting
   */
  populateForm(meeting) {
    this.form.setValue(_.omit(meeting, "meeting.selectRooms"));
  }
  /**
   * @description return form detail use for meeting detail
   * @returns meeting form
   */
  returnFormEditDetails() {
    return this.form;
  }
}
