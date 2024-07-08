import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { number } from "echarts";
import { Observable } from "rxjs";
import { Image } from "src/app/shared/models/image.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class RootService {
  constructor(protected http: HttpClient) {}

  url: string = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
    }),
  };

  all<T>(next: string): Observable<T> {
    return this.http.get<T>(this.url + `/${next}`);
  }

  add<T>(next: string, data: any): Observable<T> {
    return this.http.post<T>(this.url + `/${next}`, data);
  }
  update<T, U>(next: string, data: U): Observable<T> {
    return this.http.post<T>(this.url + `/${next}`, data);
  }

  getById<T>(id: number, next: string) {
    return this.http.get<T>(this.url + `/${next}/${id}`);
  }

  delete<T>(id: number, next: string): Observable<T> {
    return this.http.delete<T>(
      this.url + `/${next}` + `/${id}`,
      this.httpOptions
    );
  }
  uploadImage(file: File, filename: string): Observable<Image> {
    const imageFormData = new FormData();
    imageFormData.append("image", file, filename);
    const url = `${this.url + "/image/upload"}`;
    return this.http.post<Image>(url, imageFormData);
  }

  updateImage(file: File, filename: string, id: number): Observable<Image> {
    const imageFormData = new FormData();
    imageFormData.append("image", file, filename);
    const url = this.url +"/image/update/"+`${id}`;
    return this.http.put<Image>(url, imageFormData);
  }
}
