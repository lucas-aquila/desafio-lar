import { Component, OnInit, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';

import {
  MatDialog,
  MatDialogModule
} from '@angular/material/dialog';

import {
  MatSnackBar,
  MatSnackBarModule
} from '@angular/material/snack-bar';

import {
  MatPaginator,
  PageEvent
} from '@angular/material/paginator';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { PersonService } from '../../../services/person.service';
import { Person } from '../../../models/person';

import {
  ConfirmDialogComponent
} from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-person-list',
  imports: [
    RouterLink,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatPaginator,
    MatFormFieldModule,
    MatInputModule,
    DatePipe
  ],
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.scss',
})
export class PersonListComponent implements OnInit {

  private readonly personService = inject(PersonService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  person = new MatTableDataSource<Person>();

  displayedColumns = [
    'name',
    'cpf',
    'birthDate',
    'isActive',
    'actions'
  ];

  searchName = '';

  page = 1;

  pageSize = 10;

  totalItems = 0;

  ngOnInit(): void {
    this.loadPerson();
  }

  loadPerson(): void {

    this.personService.getAll(
      this.searchName,
      this.page,
      this.pageSize
    ).subscribe({

      next: result => {

        this.person.data = result.items;

        this.totalItems = result.totalItems;

      },

      error: error => {

        console.error(
          'Erro ao carregar pessoas:',
          error
        );

        this.snackBar.open(
          'Não foi possível carregar as pessoas.',
          'Fechar',
          {
            duration: 4000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['error-snackbar']
          }
        );
      }
    });
  }

  search(): void {

    this.page = 1;

    this.loadPerson();
  }

  clearSearch(): void {

    this.searchName = '';

    this.page = 1;

    this.loadPerson();
  }

  onPageChange(event: PageEvent): void {

    this.page = event.pageIndex + 1;

    this.pageSize = event.pageSize;

    this.loadPerson();
  }

  formatCpf(cpf: string): string {

    const value = cpf
      .replace(/\D/g, '')
      .substring(0, 11);

    if (value.length <= 3) {
      return value;
    }

    if (value.length <= 6) {
      return `${value.substring(0, 3)}.${value.substring(3)}`;
    }

    if (value.length <= 9) {
      return `${value.substring(0, 3)}.${value.substring(3, 6)}.${value.substring(6)}`;
    }

    return `${value.substring(0, 3)}.${value.substring(3, 6)}.${value.substring(6, 9)}-${value.substring(9)}`;
  }

  remove(person: Person): void {

    const dialogRef = this.dialog.open(
      ConfirmDialogComponent,
      {
        width: '400px',
        data: {
          title: 'Remover pessoa',
          message: `Tem certeza que deseja remover ${person.name}?`,
          confirmText: 'Remover',
          cancelText: 'Cancelar'
        }
      }
    );

    dialogRef.afterClosed().subscribe(confirmed => {

      if (!confirmed) {
        return;
      }

      this.deletePerson(person);
    });
  }

  private deletePerson(person: Person): void {

    this.personService.delete(person.id).subscribe({

      next: () => {

        this.snackBar.open(
          'Pessoa removida com sucesso!',
          'Fechar',
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['success-snackbar']
          }
        );

        this.loadPerson();
      },

      error: error => {

        console.error(
          'Erro ao remover pessoa:',
          error
        );

        const message =
          error?.error?.message ??
          'Não foi possível remover a pessoa.';

        this.snackBar.open(
          message,
          'Fechar',
          {
            duration: 4000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['error-snackbar']
          }
        );
      }
    });
  }
}