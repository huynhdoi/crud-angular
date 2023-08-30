import { Injectable } from '@angular/core';
import { DemoCRUD } from './demo-crud.service';
import { CoreService } from '../../@core/services/service';

@Injectable({
    providedIn: 'root'
})
export class PMCService {
    demoCRUD: DemoCRUD;

    constructor(private http: CoreService) {
        this.demoCRUD = new DemoCRUD(http);
    }
}