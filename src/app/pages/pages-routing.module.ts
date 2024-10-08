import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CalendarComponent } from "./calendar/calendar.component";
import { ChatComponent } from "./chat/chat.component";
import { DefaultComponent } from "./dashboards/default/default.component";
import { FilemanagerComponent } from "./filemanager/filemanager.component";
import { PersonnePhysiqueComponent } from "./personne-physique/personne-physique.component";
import { AjoutPersonnePhysiqueComponent } from "./personne-physique/ajout/ajout.component";
import { TesterComponent } from "./tester/tester.component";
import { JuristAppComponent } from "./jurist-app/jurist-app.component";
import { RoleComponent } from "./parametrages/role/role.component";
import { FonctionUtilisateurComponent } from "./parametrages/fonction-utilisateur/fonction-utilisateur.component";
import { CategoryComponent } from "@ctrl/ngx-emoji-mart";
import { CategorieUtilisateurComponent } from "./parametrages/categorie-utilisateur/categorie-utilisateur.component";
import { UtilisateurComponent } from "./parametrages/utilisateur/utilisateur.component";
import { GestionDossierComponent } from "./parametrages/dossier/gestion-dossier/gestion-dossier.component";
import { CategorieDossierComponent } from "./parametrages/dossier/categorie-dossier/categorie-dossier.component";

const routes: Routes = [
  // { path: '', redirectTo: 'dashboard' },
  {
    path: "",
    component: DefaultComponent,
  },
  { path: "dashboard", component: DefaultComponent },
  { path: "calendar", component: CalendarComponent },
  { path: "chat", component: ChatComponent },
  { path: "filemanager", component: FilemanagerComponent },
  {
    path: "dashboards",
    loadChildren: () =>
      import("./dashboards/dashboards.module").then((m) => m.DashboardsModule),
  },
  {
    path: "ecommerce",
    loadChildren: () =>
      import("./ecommerce/ecommerce.module").then((m) => m.EcommerceModule),
  },
  {
    path: "crypto",
    loadChildren: () =>
      import("./crypto/crypto.module").then((m) => m.CryptoModule),
  },
  {
    path: "email",
    loadChildren: () =>
      import("./email/email.module").then((m) => m.EmailModule),
  },
  {
    path: "invoices",
    loadChildren: () =>
      import("./invoices/invoices.module").then((m) => m.InvoicesModule),
  },
  {
    path: "projects",
    loadChildren: () =>
      import("./projects/projects.module").then((m) => m.ProjectsModule),
  },
  {
    path: "tasks",
    loadChildren: () =>
      import("./tasks/tasks.module").then((m) => m.TasksModule),
  },
  {
    path: "contacts",
    loadChildren: () =>
      import("./contacts/contacts.module").then((m) => m.ContactsModule),
  },
  {
    path: "blog",
    loadChildren: () => import("./blog/blog.module").then((m) => m.BlogModule),
  },
  {
    path: "pages",
    loadChildren: () =>
      import("./utility/utility.module").then((m) => m.UtilityModule),
  },
  {
    path: "ui",
    loadChildren: () => import("./ui/ui.module").then((m) => m.UiModule),
  },
  {
    path: "form",
    loadChildren: () => import("./form/form.module").then((m) => m.FormModule),
  },
  {
    path: "tables",
    loadChildren: () =>
      import("./tables/tables.module").then((m) => m.TablesModule),
  },
  {
    path: "icons",
    loadChildren: () =>
      import("./icons/icons.module").then((m) => m.IconsModule),
  },
  {
    path: "charts",
    loadChildren: () =>
      import("./chart/chart.module").then((m) => m.ChartModule),
  },
  {
    path: "maps",
    loadChildren: () => import("./maps/maps.module").then((m) => m.MapsModule),
  },
  {
    path: "jobs",
    loadChildren: () => import("./jobs/jobs.module").then((m) => m.JobsModule),
  },
  {
    path: "maitrouvrages",
    loadChildren: () =>
      import("./maitrouvrages/maitrouvrages.module").then(
        (m) => m.MaitrouvragesModule
      ),
  },
  {
    path: "pap",
    loadChildren: () =>
      import("./pap/pap-routing.module").then((m) => m.PapRoutingModule),
  },

  {
    path: "pip",
    loadChildren: () =>
      import("./pip/pip-routing.module").then((m) => m.PipRoutingModule),
  },

  {
    path: "consultant",
    loadChildren: () =>
      import("./consultant/consulant-routing.module").then(
        (m) => m.ConsultantRoutingModule
      ),
  },

  {
    path: "plainte",
    loadChildren: () =>
      import("./plainte/plainte-routing.module").then(
        (m) => m.PlainteRoutingModule
      ),
  },
  {
    path: "ententeCompensation",
    loadChildren: () =>
      import("./entente-compensation/entente-compensation-routing.module").then(
        (m) => m.EntenteCompensationRoutingModule
      ),
  },

  { path: "tester", component: TesterComponent },

  { path: "juristApp", component: JuristAppComponent },

  { path: "fonctions", component: FonctionUtilisateurComponent },
  { path: "roles", component: RoleComponent },
  { path: "categories", component: CategorieUtilisateurComponent },

  { path: "utilisateurs", component: UtilisateurComponent },

  { path: "dossiers", component: GestionDossierComponent },
  { path: "catégorie-dossier", component: CategorieDossierComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
