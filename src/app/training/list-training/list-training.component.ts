import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatTableDataSource } from "@angular/material";
import { Router } from "@angular/router";
import { TrainingService } from "src/app/shared/training.service";
import { NotificationService } from "src/app/shared/notification.service";
import { RoomsService } from "../../shared/rooms.service";

@Component({
  selector: "app-list-training",
  templateUrl: "./list-training.component.html"
})
export class ListTrainingComponent implements OnInit {
  closeResult: string;
  registerForm: FormGroup;
  submitted = false;
  previewPhoto = false;
  searchKey: string;

  constructor(
    private roomService: RoomsService,
    private trainingService: TrainingService,
    private router: Router,
    private notificationservice: NotificationService
  ) {}

  listData: MatTableDataSource<any>;
  displayColumns: string[] = [
    "topic",
    "trainer",
    "description",
    "date",
    "starTime",
    "endTime",
    "selectRooms",
    "actions"
  ];

  ngOnInit() {
    this.trainingService.getEmployee().subscribe(list => {
      const array = list.map(item => {
        const selectRooms = this.roomService.getRoomName(
          item.payload.val()["selectRooms"]
        );
        return {
          $key: item.key,
          selectRooms,
          ...item.payload.val()
        };
      });
      this.listData = new MatTableDataSource(array);
    });
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onEditTraining(row) {
    this.trainingService.populateForm(row);
    this.router.navigate(["edit-training"]);
  }

  onDelete($key) {
    if (confirm("Are You Sure To Delete This Record ?")) {
      this.trainingService.deleteEmployee($key);
      this.notificationservice.warn("! Deleted Successfully");
    }
  }
  onDetailTraining(row) {
    this.trainingService.populateForm(row);
    this.router.navigate(["detail-training"]);
  }
}
