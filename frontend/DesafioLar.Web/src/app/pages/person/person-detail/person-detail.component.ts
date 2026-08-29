import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';

import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

import { DatePipe } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

import {
  MatDialog,
  MatDialogModule
} from '@angular/material/dialog';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import {
  MatSnackBar,
  MatSnackBarModule
} from '@angular/material/snack-bar';

import { PersonService } from '../../../services/person.service';
import {
  Person,
  PhoneType
} from '../../../models/person';

import {
  ConfirmDialogComponent
} from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-person-detail',
  imports: [
    DatePipe,
    RouterLink,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './person-detail.component.html',
  styleUrl: './person-detail.component.scss'
})
export class PersonDetailComponent implements OnInit {

  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly personService = inject(PersonService);

  readonly person = signal<Person | null>(null);
  readonly loading = signal(true);

  ngOnInit(): void {
    this.loadPerson();
  }

  private loadPerson(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (!id) {
      this.router.navigate(['/person']);
      return;
    }

    this.personService.getById(id).subscribe({

      next: person => {
        this.person.set(person);
        this.loading.set(false);
      },

      error: error => {

        console.error(
          'Erro ao carregar pessoa:',
          error
        );

        this.loading.set(false);

        this.snackBar.open(
          'Não foi possível carregar a pessoa.',
          'Fechar',
          {
            duration: 4000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['error-snackbar']
          }
        );

        this.router.navigate(['/person']);
      }
    });
  }

  remove(): void {

    const currentPerson = this.person();

    if (!currentPerson) {
      return;
    }

    const dialogRef = this.dialog.open(
      ConfirmDialogComponent,
      {
        width: '400px',
        data: {
          title: 'Remover pessoa',
          message: `Tem certeza que deseja remover ${currentPerson.name}?`,
          confirmText: 'Remover',
          cancelText: 'Cancelar'
        }
      }
    );

    dialogRef.afterClosed().subscribe(
      confirmed => {

        if (!confirmed) {
          return;
        }

        this.deletePerson(currentPerson.id);
      }
    );
  }

  private deletePerson(id: number): void {

    this.personService.delete(id).subscribe({

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

        this.router.navigate(['/person']);
      },

      error: error => {

        console.error(
          'Erro ao remover pessoa:',
          error
        );

        this.snackBar.open(
          'Não foi possível remover a pessoa.',
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

  getPhoneTypeLabel(type: PhoneType): string {

    switch (type) {

      case PhoneType.Mobile:
        return 'Celular';

      case PhoneType.Home:
        return 'Residencial';

      case PhoneType.Commercial:
        return 'Comercial';

      default:
        return 'Desconhecido';
    }
  }

  formatPhoneNumber(number: string): string {

    const value = number.replace(/\D/g, '');

    if (value.length === 11) {
      return `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`;
    }

    if (value.length === 10) {
      return `(${value.substring(0, 2)}) ${value.substring(2, 6)}-${value.substring(6)}`;
    }

    return number;
  }
}