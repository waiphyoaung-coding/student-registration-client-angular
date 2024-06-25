import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Student } from './models/student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http:HttpClient) { }

  post(url:any,obj:Student):Observable<any>{
    return this.http.post(`${environment.apiurl}${url}`, obj, {
      headers: { "Content-type": "application/json" }
    });
  }

  get(url:any):Observable<any>{
    return this.http.get(`${environment.apiurl}${url}`,{
      headers:{ "Content-type": "application/json" }
    })
  }

  put(url:any,obj:Student):Observable<any>{
    return this.http.put(`${environment.apiurl}${url}`,obj,{
      headers:{ "Content-type": "application/json" }
    })
  }

  delete(url:any):Observable<any>{
    return this.http.delete(`${environment.apiurl}${url}`,{
      headers:{ "Content-type": "application/json" }
    })
  }

  getStudentsExcel(url:any):Observable<any>{
    return this.http.get(`${environment.apiurl}${url}`,{
      responseType : 'blob'
    })
  }

  import(url:any,formData:FormData):Observable<HttpResponse<any>>{
    return this.http.post<any>(`${environment.apiurl}${url}`,formData)
  }

  uploadImage(url:any,FormData:FormData):Observable<any>{
    return this.http.post(`Http://localhost:8080/api/image${url}`,FormData)
  }

  getImage(url:any):Observable<any>{
    return this.http.get(`Http://localhost:8080/api/image${url}`)
  }

  getPdf(url:any):Observable<any>{
    return this.http.get(`${environment.apiurl}${url}`,{
      responseType: 'blob'
    })
  }
}
