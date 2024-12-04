import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatOptionModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';


const MaterialComponents = [
	MatButtonModule,
	MatCardModule,
	MatMenuModule,
	MatIconModule,
	MatListModule,
	MatToolbarModule,
	MatInputModule,
	MatFormFieldModule,
	MatTooltipModule,
	MatSelectModule,
	MatOptionModule,
	MatTableModule,
	MatSortModule,
	MatDatepickerModule,
	MatNativeDateModule,
	MatExpansionModule,
    MatPaginatorModule
];

@NgModule({
	declarations: [],
	providers: [
		{
			provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
			useValue: { appearence: 'fill' }
		}
	],
	imports: [
		CommonModule, ...MaterialComponents
	],
	exports: [
		...MaterialComponents
	]
})
export class MatComponentsModule { }
