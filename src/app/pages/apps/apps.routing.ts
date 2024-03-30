import { Routes } from '@angular/router';

import { AppChatComponent } from './chat/chat.component';
import { AppNotesComponent } from './notes/notes.component';
import { AppTodoComponent } from './todo/todo.component';
import { AppPermissionComponent } from './permission/permission.component';
import { AppEmailComponent } from './email/email.component';
import { DetailComponent } from './email/detail/detail.component';
import { AppTaskboardComponent } from './taskboard/taskboard.component';
import { AppFullcalendarComponent } from './fullcalendar/fullcalendar.component';
import { AppTicketlistComponent } from './ticketlist/ticketlist.component';
import { AppContactComponent } from './contact/contact.component';
import { AppCoursesComponent } from './courses/courses.component';
import { AppCourseDetailComponent } from './courses/course-detail/course-detail.component';
import { AppEmployeeComponent } from './employee/employee.component';
import { AppPlayerComponent } from './player/player.component';
import { AppInvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
import { AppAddInvoiceComponent } from './invoice/add-invoice/add-invoice.component';
import { AppInvoiceViewComponent } from './invoice/invoice-view/invoice-view.component';
import { AppEditInvoiceComponent } from './invoice/edit-invoice/edit-invoice.component';
import { AppBlogsComponent } from './blogs/blogs.component';
import { AppBlogDetailsComponent } from './blogs/details/details.component';
import { AppContractPlayerComponent } from './contractplayer/contractplayer.component';
import { AppAchievementPlayerComponent } from './achievementplayer/achievementplayer.component';
import { AppUserComponent } from './user/user.component';
import { AppCompitencePlayerComponent } from './compitenceplayer/contractplayer.component';
import { AppTeamComponent } from './team/team.component';
import { AppAchievementTeamComponent } from './achievementteam/achievementteam.component';
import { AppManagerComponent } from './manager/manager.component';
import { AppCoachComponent } from './coach/coach.component';
import { AppClubComponent } from './club/clubs.component';
import { AppDefiComponent } from './defi/defi.component';
import { AppTournamentComponent } from './Tournament/tournament.component';
import { AppScrimsComponent } from './Scrims/scrims.component';
import { AppSessionTrainingComponent } from './SessionTraining/SessionTraining.component';
import { RoleComponent } from './role/role.component';


export const AppsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'chat',
        component: AppChatComponent,
        data: {
          title: 'Chat',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Chat' },
          ],
        },
      },
      {
        path: 'calendar',
        component: AppFullcalendarComponent,
        data: {
          title: 'Calendar',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Calendar' },
          ],
        },
      },
      {
        path: 'notes',
        component: AppNotesComponent,
        data: {
          title: 'Notes',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Notes' },
          ],
        },
      },
      { path: 'email', redirectTo: 'email/inbox', pathMatch: 'full' },
      {
        path: 'email/:type',
        component: AppEmailComponent,
        data: {
          title: 'Email',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Email' },
          ],
        },
        children: [
          {
            path: ':id',
            component: DetailComponent,
            data: {
              title: 'Email Detail',
              urls: [
                { title: 'Dashboard', url: '/dashboards/dashboard1' },
                { title: 'Email Detail' },
              ],
            },
          },
        ],
      },
      {
        path: 'permission',
        component: AppPermissionComponent,
        data: {
          title: 'Roll Base Access',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Roll Base Access' },
          ],
        },
      },
      {
        path: 'todo',
        component: AppTodoComponent,
        data: {
          title: 'Todo App',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Todo App' },
          ],
        },
      },
      {
        path: 'taskboard',
        component: AppTaskboardComponent,
        data: {
          title: 'Taskboard',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Taskboard' },
          ],
        },
      },
      {
        path: 'tickets',
        component: AppTicketlistComponent,
        data: {
          title: 'Tickets',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Tickets' },
          ],
        },
      },
      {
        path: 'contacts',
        component: AppContactComponent,
        data: {
          title: 'Contacts',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Contacts' },
          ],
        },
      },
      {
        path: 'courses',
        component: AppCoursesComponent,
        data: {
          title: 'Courses',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Courses' },
          ],
        },
      },
      {
        path: 'courses/coursesdetail/:id',
        component: AppCourseDetailComponent,
        data: {
          title: 'Course Detail',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Course Detail' },
          ],
        },
      },
      {
        path: 'blog/post',
        component: AppBlogsComponent,
        data: {
          title: 'Posts',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Posts' },
          ],
        },
      },
      {
        path: 'blog/detail/:id',
        component: AppBlogDetailsComponent,
        data: {
          title: 'Blog Detail',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Blog Detail' },
          ],
        },
      },
      {
        path: 'employee',
        component: AppEmployeeComponent,
        data: {
          title: 'Employee',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Employee' },
          ],
        },
      },
      {
        path: 'player',
        component: AppPlayerComponent,
        data: {
          title: 'Player',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Player' },
          ],
        },
      },
      {
        path: 'achievementplayer',
        component: AppAchievementPlayerComponent,
        data: {
          title: 'AchievementPlayer',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'AchievementPlayer' },
          ],
        },
      },
      {
        path: 'compitenceplayer',
        component: AppCompitencePlayerComponent,
        data: {
          title: 'CompitencePlayer',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'CompitencePlayer' },
          ],
        },
      },
      {
        path: 'team',
        component: AppTeamComponent,
        data: {
          title: 'Team',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Team' },
          ],
        },
      },
      {
        path: 'achievementteam',
        component: AppAchievementTeamComponent,
        data: {
          title: 'AchivmentTeam',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'AchivmentTeam' },
          ],
        },
      },
      {
        path: 'manager',
        component: AppManagerComponent,
        data: {
          title: 'Manager',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Manager' },
          ],
        },
      },
      {
        path: 'coach',
        component: AppCoachComponent,
        data: {
          title: 'Coach',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Coach' },
          ],
        },
      },
      {
        path: 'club',
        component: AppClubComponent,
        data: {
          title: 'Club',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Club' },
          ],
        },
      },
      {
        path: 'defi',
        component: AppDefiComponent,
        data: {
          title: 'Defi',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Defi' },
          ],
        },
      },
      {
        path: 'user',
        component: AppUserComponent,
        data: {
          title: 'Users',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Users' },
          ],
        },
      },
      {
        path: 'role',
        component: RoleComponent,
        
      },
      
      {
        path: 'tournament',
        component: AppTournamentComponent,
        data: {
          title: 'Tournament',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Tournament' },
          ],
        },
      },
      {
        path: 'Scrims',
        component: AppScrimsComponent,
        data: {
          title: 'Scrims',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Scrims' },
          ],
        },
      },
      {
        path: 'SessionTraining',
        component: AppSessionTrainingComponent,
        data: {
          title: 'SessionTraining',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'SessionTraining' },
          ],
        },
      },
      {
        path: 'contractplayer',
        component: AppContractPlayerComponent,
        data: {
          title: 'ContractPlayer',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'ContractPlayer' },
          ],
        },
      },
      {
        path: 'invoice',
        component: AppInvoiceListComponent,
        data: {
          title: 'Invoice',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Invoice' },
          ],
        },
      },
      {
        path: 'addInvoice',
        component: AppAddInvoiceComponent,
        data: {
          title: 'Add Invoice',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Add Invoice' },
          ],
        },
      },
      {
        path: 'viewInvoice/:id',
        component: AppInvoiceViewComponent,
        data: {
          title: 'View Invoice',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'View Invoice' },
          ],
        },
      },
      {
        path: 'editinvoice/:id',
        component: AppEditInvoiceComponent,
        data: {
          title: 'Edit Invoice',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Edit Invoice' },
          ],
        },
      },
    ],
  },
];
