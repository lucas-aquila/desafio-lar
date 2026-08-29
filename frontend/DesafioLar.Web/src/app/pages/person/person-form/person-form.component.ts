import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';

import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import {
  MatSnackBar,
  MatSnackBarModule
} from '@angular/material/snack-bar';

import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { PersonService } from '../../../services/person.service';
import { PhoneType } from '../../../models/person';

import {
  RequestPerson,
  RequestPhone
} from '../../../models/request-person';

type PhoneForm = FormGroup<{
  type: FormControl<PhoneType>;
  number: FormControl<string>;
}>;

@Component({
  selector: 'app-person-form',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatIconModule,
    MatSelectModule
  ],
  templateUrl: './person-form.component.html',
  styleUrl: './person-form.component.scss'
})
export class PersonFormComponent implements OnInit {

  private readonly formBuilder = inject(FormBuilder);
  private readonly personService = inject(PersonService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly route = inject(ActivatedRoute);

  readonly isEditMode = signal(false);
  readonly personId = signal<number | null>(null);

  readonly phoneTypes = [
    {
      value: PhoneType.Mobile,
      label: 'Celular'
    },
    {
      value: PhoneType.Home,
      label: 'Residencial'
    },
    {
      value: PhoneType.Commercial,
      label: 'Comercial'
    }
  ];

  readonly minBirthDate = '1900-01-01';
  readonly maxBirthDate = this.getToday();

  readonly form = this.formBuilder.nonNullable.group({

    name: [
      '',
      [
        Validators.required,
        Validators.maxLength(150)
      ]
    ],

    cpf: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
        )
      ]
    ],

    birthDate: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^\d{4}-\d{2}-\d{2}$/
        )
      ]
    ],

    phones: this.formBuilder.array<PhoneForm>([])
  });

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      const personId = Number(id);

      this.isEditMode.set(true);
      this.personId.set(personId);

      this.loadPerson(personId);

    } else {

      this.addPhone();
    }
  }

  get phones(): FormArray<PhoneForm> {
    return this.form.controls.phones;
  }

  private createPhone(
    type: PhoneType = PhoneType.Mobile,
    number: string = ''
  ): PhoneForm {

    return this.formBuilder.nonNullable.group({

      type: [
        type,
        Validators.required
      ],

      number: [
        number,
        [
          Validators.required,
          Validators.pattern(
            /^\(\d{2}\) \d{4,5}-\d{4}$/
          )
        ]
      ]
    });
  }

  private loadPerson(id: number): void {

    this.personService.getById(id).subscribe({

      next: person => {

        this.form.patchValue({

          name: person.name,

          cpf: this.formatCpf(
            person.cpf
          ),

          birthDate: person.birthDate
        });

        this.phones.clear();

        person.phones.forEach(phone => {

          this.phones.push(
            this.createPhone(
              phone.type,
              this.formatPhone(
                phone.number
              )
            )
          );

        });
      },

      error: error => {

        console.error(
          'Erro ao carregar pessoa:',
          error
        );

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

  addPhone(): void {

    this.phones.push(
      this.createPhone()
    );
  }

  removePhone(index: number): void {

    this.phones.removeAt(index);
  }

  formatCpfInput(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    const formattedCpf =
      this.formatCpf(input.value);

    input.value = formattedCpf;

    this.form.controls.cpf.setValue(
      formattedCpf
    );
  }

  private formatCpf(cpf: string): string {

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

  formatPhoneInput(
    event: Event,
    index: number
  ): void {

    const input =
      event.target as HTMLInputElement;

    const formattedPhone =
      this.formatPhone(input.value);

    input.value = formattedPhone;

    this.phones
      .at(index)
      .controls
      .number
      .setValue(formattedPhone);
  }

  private formatPhone(phone: string): string {

    const value = phone
      .replace(/\D/g, '')
      .substring(0, 11);

    if (value.length <= 2) {
      return value;
    }

    if (value.length <= 6) {

      return `(${value.substring(0, 2)}) ${value.substring(2)}`;
    }

    if (value.length <= 10) {

      return `(${value.substring(0, 2)}) ${value.substring(2, 6)}-${value.substring(6)}`;
    }

    return `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`;
  }

  private getToday(): string {

    const today = new Date();

    const year =
      today.getFullYear();

    const month =
      String(
        today.getMonth() + 1
      ).padStart(2, '0');

    const day =
      String(
        today.getDate()
      ).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  save(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }

    const formValue =
      this.form.getRawValue();

    const data: RequestPerson = {

      name: formValue.name,

      cpf: formValue.cpf.replace(
        /\D/g,
        ''
      ),

      birthDate: formValue.birthDate,

      phones: formValue.phones.map(
        (phone): RequestPhone => ({

          type: phone.type,

          number: phone.number.replace(
            /\D/g,
            ''
          )
        })
      )
    };

    if (this.isEditMode()) {

      this.update(data);

      return;
    }

    this.create(data);
  }

  private create(
    data: RequestPerson
  ): void {

    this.personService
      .create(data)
      .subscribe({

        next: () => {

          this.snackBar.open(
            'Pessoa cadastrada com sucesso!',
            'Fechar',
            {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: ['success-snackbar']
            }
          );

          this.router.navigate([
            '/person'
          ]);
        },

        error: error => {

          console.error(
            'Erro ao cadastrar pessoa:',
            error
          );

          this.showError(
            this.getErrorMessage(
              error,
              'Não foi possível cadastrar a pessoa.'
            )
          );
        }
      });
  }

  private update(
    data: RequestPerson
  ): void {

    const id = this.personId();

    if (!id) {
      return;
    }

    this.personService
      .update(id, data)
      .subscribe({

        next: () => {

          this.snackBar.open(
            'Pessoa atualizada com sucesso!',
            'Fechar',
            {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: ['success-snackbar']
            }
          );

          this.router.navigate([
            '/person',
            id
          ]);
        },

        error: error => {

          console.error(
            'Erro ao atualizar pessoa:',
            error
          );

          this.showError(
            this.getErrorMessage(
              error,
              'Não foi possível atualizar a pessoa.'
            )
          );
        }
      });
  }

  private getErrorMessage(
    error: any,
    defaultMessage: string
  ): string {

    if (error?.error?.message) {

      return error.error.message;
    }

    if (error?.error?.errors) {

      const errors =
        error.error.errors;

      const messages =
        Object.values(errors)
          .flat()
          .filter(
            message =>
              typeof message === 'string'
          );

      if (messages.length > 0) {

        return messages[0] as string;
      }
    }

    return defaultMessage;
  }

  private showError(
    message: string
  ): void {

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
}