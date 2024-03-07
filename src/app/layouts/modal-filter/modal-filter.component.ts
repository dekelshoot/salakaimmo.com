import { Component, OnInit, ViewChild, Renderer2, EventEmitter } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ArraysService } from '../../services/arrays.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-filter',
  templateUrl: './modal-filter.component.html',
  styleUrls: ['./modal-filter.component.scss']
})
export class ModalFilterComponent implements OnInit {
  @ViewChild('modal') modal!: ElementRef<HTMLInputElement>;
  category!: string[];
  quartier!: string[];
  prix!: string[];
  date!: string[];
  chambre!: string[];
  filterForm!: FormGroup;
  constructor(private arraysService: ArraysService, private renderer: Renderer2, private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.category = this.arraysService.category
    this.quartier = this.arraysService.lieu
    this.prix = this.arraysService.prix
    this.date = this.arraysService.date
    this.chambre = this.arraysService.chambre
    this.initForm();
  }

  initForm() {
    this.filterForm = this.formBuilder.group({
      date: [''],
      prix: [''],
      category: [''],
      chambre: [''],
      quartier: [''],
    })
  }

  apply() {
    this.renderer.setStyle(this.modal.nativeElement, "pointer-events", "none")
    console.log(this.modal)
    const prix = this.filterForm.get('prix')?.value;
    const category = this.filterForm.get('category')?.value;
    const chambre = this.filterForm.get('chambre')?.value;
    const quartier = this.filterForm.get('quartier')?.value;
    const date = this.filterForm.get('date')?.value;
  }

}
