import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./shared/auth-guard.service";
import { ForgotpasswordComponent } from "./auth/forgotpassword/forgotpassword.component";
import { SigninComponent } from "./auth/signin/signin.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { CalenderComponent } from "./meeting/calender/calender.component";
import { DetailMeetingComponent } from "./meeting/detail-meeting/detail-meeting.component";
import { EditMeetingComponent } from "./meeting/edit-meeting/edit-meeting.component";
import { ListMeetingComponent } from "./meeting/list-meeting/list-meeting.component";
import { MeetingComponent } from "./meeting/meeting.component";
import { NewMeetingComponent } from "./meeting/new-meeting/new-meeting.component";
import { PagenotfoundComponent } from "./pagenotfound/pagenotfound.component";
import { DetailTrainingComponent } from "./training/detail-training/detail-training.component";
import { EditTrainingComponent } from "./training/edit-training/edit-training.component";
import { ListTrainingComponent } from "./training/list-training/list-training.component";

const routes: Routes = [
  { path: "", component: ListTrainingComponent },
  // { path: "", redirectTo: "/signin", pathMatch: "full" },

  {
    path: "list-training",
    component: ListTrainingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "new-training",
    loadChildren:
      "./training/new-training/new-training.module#NewTrainingModule",
    canActivate: [AuthGuard]
  },
  {
    path: "edit-training",
    component: EditTrainingComponent,
    canActivate: [AuthGuard]
  },
  { path: "detail-training", component: DetailTrainingComponent },
  {
    path: "meeting",
    component: MeetingComponent,
    children: [
      {
        path: "list-meeting",
        component: ListMeetingComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "new-meeting",
        component: NewMeetingComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "edit-meeting",
        component: EditMeetingComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "detail-meeting",
        component: DetailMeetingComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "calender",
        component: CalenderComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  { path: "signup", component: SignupComponent },
  { path: "signin", component: SigninComponent },
  { path: "forgotpassword", component: ForgotpasswordComponent },
  { path: "**", component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
