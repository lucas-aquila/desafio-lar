import { Component, OnInit, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { PersonService } from '../../../services/person.service';
import { Person } from '../../../models/person';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-person-list',
  imports: [
    RouterLink,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
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

  ngOnInit(): void {
    this.loadPerson();
  }

  private loadPerson(): void {

    this.personService.getAll().subscribe({

      next: people => {
        this.person.data = people;
      },

      error: error => {
        console.error(
          'Erro ao carregar pessoas:',
          error
        );
      }
    });
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

        this.person.data = this.person.data.filter(
          item => item.id !== person.id
        );

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