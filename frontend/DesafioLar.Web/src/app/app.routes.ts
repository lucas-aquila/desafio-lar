import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'person',
    pathMatch: 'full'
  },
  {
    path: 'person',
    loadComponent: () =>
      import('./pages/person/person-list/person-list.component')
        .then(m => m.PersonListComponent)
  },
  {
    path: 'person/new',
    loadComponent: () =>
      import('./pages/person/person-form/person-form.component')
        .then(m => m.PersonFormComponent)
  },
  {
    path: 'person/:id/edit',
    loadComponent: () =>
      import('./pages/person/person-form/person-form.component')
        .then(m => m.PersonFormComponent)
  },
  {
    path: 'person/:id',
    loadComponent: () =>
      import('./pages/person/person-detail/person-detail.component')
        .then(m => m.PersonDetailComponent)
  },
];