import { map, Observable } from "rxjs";
import { ConvertToReqBodyCRUD, CRUD } from "../_model/crud.model";
import { CoreService } from "../../@core/services/service";

export class DemoCRUD {
  constructor(private http: CoreService) {

  }

  findById(id: number): Observable<CRUD> {
    return this.http.get(`/api/crud/${id}`)
      .pipe(map((item => new CRUD(item))));
  }

  find(): Observable<CRUD[]> {
    return this.http.get('/api/crud')
      .pipe(map((item => item.map((item2: any) => new CRUD(item2)))));
  }

  create(crud: ConvertToReqBodyCRUD): Observable<any> {
    return this.http.post('/api/crud', crud);
  }

  update(id: string, crud: ConvertToReqBodyCRUD): Observable<any> {
    return this.http.put(`/api/crud/${id}`, crud);
  }

  deleteById(crudId: number): Observable<any> {
    return this.http.delete('/api/crud' + `/${crudId}`);
  }
}