import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, NgForm, Validators, AbstractControl, FormArray, UntypedFormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { CRUD } from 'src/app/@share/_model/crud.model';
import { PMCService } from 'src/app/@share/_services/_pmc.service';
import { promotionDetail, promotionObj } from 'src/app/@share/_model/crudPromotion.model';

@Component({
  selector: 'pmc-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})

export class DetailComponent implements OnInit, OnDestroy {
  private readonly unsubscribe = new Subject<void>();
  public form!: FormGroup;
  public promotionTable!: FormArray;
  public formTable!: FormGroup;
  public promotionDetail!: FormArray;
  public id = this.route.snapshot.params['id']; // When edit mode
  public listCategoryFood = ["Fruit", "Vegetable", "Meat", "Cake", "Drink"];
  console = console

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    public readonly location: Location,
    private readonly service: PMCService,
  ) {
    if (this.id) {
      this.service.demoCRUD.findById(this.id).pipe(takeUntil(this.unsubscribe)).subscribe((resp: CRUD) => {
        this.initialForm(resp);
        this.form.markAsPristine();
      })
    }
  }

  ngOnInit(): void {
    this.initialForm();
  }

  initialForm(crud: CRUD = new CRUD()) {
    this.form = this.fb.group({
      id: [crud.id],
      foodCategory: [crud.foodCategory, [Validators.required]],
      foodName: new FormControl(crud.foodName, [Validators.required, Validators.maxLength(16)]),
      amount: [crud.amount, [Validators.required]],//Number check
      madeIn: new FormControl(crud.madeIn, [Validators.required, Validators.maxLength(16)]),
      promotionTable: this.fb.array((crud.promotionTable || [this.promotionTableForm()]).map(item => this.promotionTableForm(item)))
    });
  }

  promotionTableForm(data: promotionObj = new promotionObj()): FormGroup {
    return this.fb.group({
      voucher: this.fb.array((data.voucher || [this.promotionDetailForm()]).map(item => this.promotionDetailForm(item))),
      percent: [data.percent, [Validators.required]],
    })
  }

  promotionDetailForm(data: promotionDetail = new promotionDetail()): FormGroup {
    return this.fb.group({
      code: [data.code, [Validators.required]],
      company: [data.company, [Validators.required]],
    })
  }

  //View, add, delete row of promotionTableForm
  promotionTableControl() {
    return (this.form.get('promotionTable') as UntypedFormArray);
  }

  createItem() {
    return this.fb.group({
      voucher: this.fb.array([this.fb.group({
        code: ['', Validators.required],
        company: ['', Validators.required],
      })], Validators.required),
      percent: ['', Validators.required],
    });
  }

  addItem(): void {
    this.promotionTable = this.form.get('promotionTable') as FormArray;
    this.promotionTable.push(this.createItem());
  }

  removeRow(index: number) {
    console.log(index);
    this.form.markAsDirty();
    (<FormArray>this.form.get('promotionTable')).removeAt(index);
  }

  //View, add, delete row of promotionDetailForm
  promotionDetailControl(item: any) {
    return (item.get('voucher') as UntypedFormArray);
  }

  createPromotionDetailItem() {
    return this.fb.group({
      code: ['', Validators.required],
      company: ['', Validators.required],
    });
  }

  addPromotionDetailItem(item: any): void {
    this.promotionDetail = item.get('voucher') as FormArray;
    this.promotionDetail.push(this.createPromotionDetailItem());
  }

  removePromotionDetailRow(index: number, item: any) {
    console.log(index);
    this.form.markAsDirty();
    (<FormArray>item.get('voucher') as FormArray).removeAt(index);
  }

  // Create or update crud
  onFormSubmit() {
    if (this.form.invalid) {
      this.markFormGroupTouched(this.form);
      return;
    }
    const body = new CRUD(this.form.getRawValue(), false).convertToReqBodyCRUD();
    console.log("Test body result", body);

    if (!this.id) {
      // create crud
      this.service.demoCRUD.create(body).pipe(takeUntil(this.unsubscribe)).subscribe(crud => {
        console.log(crud);
        console.log("Test table result", this.form.getRawValue());
        this.location.back();
      }, (error) => {
        console.log(error);
      });
    } else {
      // update crud
      this.service.demoCRUD.update(this.id, body).pipe(takeUntil(this.unsubscribe)).subscribe(crud => {
        console.log(crud);
        console.log("Test table result", this.form.getRawValue());
        this.location.back();
      }, (error) => {
        console.log(error);
      });
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control: AbstractControl) => {
      control.markAsTouched();
      if ((control as FormGroup).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
