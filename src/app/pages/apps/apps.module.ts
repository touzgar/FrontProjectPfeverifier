import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { NgxPermissionsModule } from 'ngx-permissions';

import { NgxPaginationModule } from 'ngx-pagination';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgScrollbarModule } from 'ngx-scrollbar';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

//Chat
import { AppChatComponent } from './chat/chat.component';
//Contact
import { AppContactDialogContentComponent } from './contact/contact.component';
import { AppContactComponent } from './contact/contact.component';
//Courses
import { AppCoursesComponent } from './courses/courses.component';
import { AppCourseDetailComponent } from './courses/course-detail/course-detail.component';

//Notes
import { AppNotesComponent } from './notes/notes.component';
//Todo
import { AppTodoComponent } from './todo/todo.component';
// Permission
import { AppPermissionComponent } from './permission/permission.component';
//Mailbox
import {
  ListingComponent,
  ListingDialogDataExampleDialogComponent,
} from './email/listing/listing.component';
import { DetailComponent } from './email/detail/detail.component';
import { AppEmailComponent } from './email/email.component';

//Taskboard
import { AppTaskboardComponent } from './taskboard/taskboard.component';
import { TaskDialogComponent } from './taskboard/task-dialog.component';
import { OkAppTaskComponent } from './taskboard/ok-task/ok-task.component';
import { DeleteAppTaskComponent } from './taskboard/delete-task/delete-task.component';

//Calendar
import { AppFullcalendarComponent } from './fullcalendar/fullcalendar.component';
import { CalendarDialogComponent } from './fullcalendar/fullcalendar.component';
import { CalendarFormDialogComponent } from './fullcalendar/calendar-form-dialog/calendar-form-dialog.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { AppEmployeeComponent } from './employee/employee.component';
import { AppEmployeeDialogContentComponent } from './employee/employee.component';
import { AppAddEmployeeComponent } from './employee/add/add.component';

import { AppsRoutes } from './apps.routing';
import { MatNativeDateModule } from '@angular/material/core';
import {
  AppTicketlistComponent,
  AppTicketDialogContentComponent,
} from './ticketlist/ticketlist.component';

//Invoice
import { AppInvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
import { AppInvoiceViewComponent } from './invoice/invoice-view/invoice-view.component';
import { AppAddInvoiceComponent } from './invoice/add-invoice/add-invoice.component';
import { AppEditInvoiceComponent } from './invoice/edit-invoice/edit-invoice.component';
import { OkDialogComponent } from './invoice/edit-invoice/ok-dialog/ok-dialog.component';
import { AddedDialogComponent } from './invoice/add-invoice/added-dialog/added-dialog.component';

// blog
import { AppBlogsComponent } from './blogs/blogs.component';
import { AppBlogDetailsComponent } from './blogs/details/details.component';
import { AppPlayerComponent, AppPlayerDialogContentComponent } from './player/player.component';
import { AppAddPlayerComponent } from './player/add/add.component';
import { AppContractPlayerComponent, AppContractPlayerDialogContentComponent } from './contractplayer/contractplayer.component';
import { AppAddContractPlayerComponent } from './contractplayer/add/add.component';
import { AppAchievementPlayerComponent, AppAchievementPlayerDialogContentComponent } from './achievementplayer/achievementplayer.component';
import { AppAddAchievementPlayerComponent } from './achievementplayer/add/add.component';
import { AppUserComponent, AppUserDialogContentComponent } from './user/user.component';
import { AppAddUserComponent } from './user/add/add.component';
import { AppCompitencePlayerComponent, AppCompitencePlayerDialogContentComponent } from './compitenceplayer/contractplayer.component';
import { AppAddCompitencePlayerComponent } from './compitenceplayer/add/add.component';
import { AppTeamComponent, AppTeamDialogContentComponent } from './team/team.component';
import { AppAddTeamComponent } from './team/add/add.component';
import { AppAchievementTeamComponent, AppAchievementTeamDialogContentComponent } from './achievementteam/achievementteam.component';
import { AppAddAchievementTeamComponent } from './achievementteam/add/add.component';
import { AppManagerComponent, AppManagerDialogContentComponent } from './manager/manager.component';
import { AppAddManagerComponent } from './manager/add/add.component';
import { AppCoachComponent, AppCoachDialogContentComponent } from './coach/coach.component';
import { AppAddCoachComponent } from './coach/add/add.component';
import { AppClubComponent, AppClubDialogContentComponent } from './club/clubs.component';
import { AppAddClubComponent } from './club/add/add.component';
import { AppDefiComponent, AppDefiDialogContentComponent } from './defi/defi.component';
import { AppAddDefiComponent } from './defi/add/add.component';
import { AppTournamentComponent, AppTournamentDialogContentComponent } from './Tournament/tournament.component';
import { AppAddTournamentComponent } from './Tournament/add/add.component';
import { AppScrimsComponent, AppScrimsDialogContentComponent } from './Scrims/scrims.component';
import { AppAddScrimsComponent } from './Scrims/add/add.component';
import { AppSessionTrainingComponent, AppSessionTrainingDialogContentComponent } from './SessionTraining/SessionTraining.component';
import { AppAddSessionTrainingComponent } from './SessionTraining/add/add.component';
import { AddCoachToTeamDialogComponent } from './team/add-coach-to-team-dialog/add-coach-to-team-dialog.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RemoveCoachFromTeamDialogComponent } from './team/remove-coach-from-team-dialog/remove-coach-from-team-dialog.component';
import { AddPlayersToTeamDialogComponent } from './team/add-players-to-team-dialog/add-players-to-team-dialog.component';
import { RemovePlayersFromTeamDialogComponent } from './team/remove-players-from-team-dialog/remove-players-from-team-dialog.component';
import { TournamentService } from './employee/tournament.service';
import { AddTeamsToTournamentComponent } from './employee/add-teams-to-tournament/add-teams-to-tournament.component';
import { RemoveTeamsToTournamentComponent } from './employee/remove-teams-to-tournament/remove-teams-to-tournament.component';



@NgModule({
  imports: [
    
    CommonModule,
    RouterModule.forChild(AppsRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPermissionsModule.forRoot(),
    NgApexchartsModule,
    TablerIconsModule.pick(TablerIcons),
    DragDropModule,
    NgxPaginationModule,
    HttpClientModule,
    AngularEditorModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    MatNativeDateModule,
    NgScrollbarModule,
  ],
  exports: [TablerIconsModule],
  declarations: [
    AppChatComponent,
    AppPermissionComponent,
    AppNotesComponent,
    AppTodoComponent,
    AppTaskboardComponent,
    TaskDialogComponent,
    OkAppTaskComponent,
    DeleteAppTaskComponent,
    ListingDialogDataExampleDialogComponent,
    ListingComponent,
    DetailComponent,
    AppEmailComponent,
    AppFullcalendarComponent,
    CalendarDialogComponent,
    CalendarFormDialogComponent,
    AppTicketlistComponent,
    AppTicketDialogContentComponent,
    AppContactComponent,
    AppContactDialogContentComponent,
    AppClubComponent,
    AppAddClubComponent,
    AppClubDialogContentComponent,
    AppCoursesComponent,
    AppCourseDetailComponent,
    AppEmployeeComponent,
    AppEmployeeDialogContentComponent,
    AppAddEmployeeComponent,
    AppPlayerComponent,
    AppAddPlayerComponent,
    AppPlayerDialogContentComponent,
    AppDefiComponent,
    AppAddDefiComponent,
    AppDefiDialogContentComponent,
  AppContractPlayerComponent,
  AppContractPlayerDialogContentComponent,
  AppAddContractPlayerComponent,
  AppTournamentComponent,
  AppAddTournamentComponent,
  AppTournamentDialogContentComponent,
AppUserComponent,
AppAddUserComponent,
AppUserDialogContentComponent,
AppManagerComponent,
AppAddManagerComponent,
AppManagerDialogContentComponent,
  AppAddAchievementPlayerComponent,
  AppAchievementPlayerComponent,
  AppAchievementPlayerDialogContentComponent,
  AppScrimsComponent,
  AppAddScrimsComponent,
  AppScrimsDialogContentComponent,
  AppSessionTrainingComponent,
  AppAddSessionTrainingComponent,
  AppSessionTrainingDialogContentComponent,
AppTeamComponent,
AppTeamDialogContentComponent,
AppAddTeamComponent,
AppCompitencePlayerComponent,
AppAddCompitencePlayerComponent,
AppCompitencePlayerDialogContentComponent,
AppAchievementTeamComponent,
AppAchievementTeamDialogContentComponent,
AppAddAchievementTeamComponent,
AppCoachComponent,
AppAddCoachComponent,
AppCoachDialogContentComponent,
    AppInvoiceListComponent,
    AppInvoiceViewComponent,
    AppAddInvoiceComponent,
    AppEditInvoiceComponent,
    AddedDialogComponent,
    OkDialogComponent,
    AppBlogsComponent,
    AppBlogDetailsComponent,
    AddCoachToTeamDialogComponent,
    RemoveCoachFromTeamDialogComponent,
    AddPlayersToTeamDialogComponent,
    RemovePlayersFromTeamDialogComponent,
    AddTeamsToTournamentComponent,
    RemoveTeamsToTournamentComponent
     ],
  providers: [DatePipe],

})
export class AppsModule {}
