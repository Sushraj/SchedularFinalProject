import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AmazingTimePickerModule } from "amazing-time-picker";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { MaterialModule } from "../app/material/material.module";
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthInterceptor } from "./shared/auth.interceptor";
import { AuthService } from "./shared/auth.service";
import { ForgotpasswordComponent } from "./auth/forgotpassword/forgotpassword.component";
import { SigninComponent } from "./auth/signin/signin.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { HeaderComponent } from "./header/header.component";
import { CalenderComponent } from "./meeting/calender/calender.component";
import { DetailMeetingComponent } from "./meeting/detail-meeting/detail-meeting.component";
import { EditMeetingComponent } from "./meeting/edit-meeting/edit-meeting.component";
import { ListMeetingComponent } from "./meeting/list-meeting/list-meeting.component";
import { MeetingComponent } from "./meeting/meeting.component";
import { NewMeetingComponent } from "./meeting/new-meeting/new-meeting.component";
import { PagenotfoundComponent } from "./pagenotfound/pagenotfound.component";
import { MeetingroomsService } from "./shared/meetingrooms.service";
import { DetailTrainingComponent } from "./training/detail-training/detail-training.component";
import { EditTrainingComponent } from "./training/edit-training/edit-training.component";
import { ListTrainingComponent } from "./training/list-training/list-training.component";
import { TrainingComponent } from "./training/training.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TrainingComponent,
    ListTrainingComponent,
    EditTrainingComponent,
    MeetingComponent,
    ListMeetingComponent,
    NewMeetingComponent,
    DetailTrainingComponent,
    DetailMeetingComponent,
    EditMeetingComponent,
    SignupComponent,
    SigninComponent,
    PagenotfoundComponent,
    ForgotpasswordComponent,
    CalenderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    MatDialogModule,
    HttpClientModule,
    ReactiveFormsModule,
    AmazingTimePickerModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    MatToolbarModule,
    MaterialModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    MeetingroomsService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
