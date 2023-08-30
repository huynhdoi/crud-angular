import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { CRUD } from 'src/app/@share/_model/crud.model';
import { PMCService } from 'src/app/@share/_services/_pmc.service';

@Component({
  selector: 'pmc-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit, OnDestroy {
  private readonly unsubscribe = new Subject<void>();
  public crudList!: CRUD[];
  constructor(
    private readonly service: PMCService,
  ) {

  }
  
  ngOnInit(): void {
   this.getListTable();
  }
  
  deleteItem(id: number) {
    this.service.demoCRUD.deleteById(id).pipe(takeUntil(this.unsubscribe)).subscribe(resp => {
      this.getListTable();
      console.log(resp);
    }, (error) => {
      console.log(error);
    })
  }

  getListTable() {
    this.service.demoCRUD.find().pipe(takeUntil(this.unsubscribe)).subscribe(resp => {
      this.crudList = resp;
      console.log(resp);
    }, (error) => {
      console.log(error);
    })
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
