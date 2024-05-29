import { Injectable } from "@angular/core";
import { RootService } from "./root.service";
import { Observable } from "rxjs";
import { Image } from "src/app/shared/models/image.model";

@Injectable({
  providedIn: "root",
})
export class ProjectService extends RootService {
  uploadImage(file: File, filename: string): Observable<Image> {
    const imageFormData = new FormData();
    imageFormData.append("image", file, filename);
    const url = `${this.url + "/image/upload"}`;
    return this.http.post<Image>(url, imageFormData);
  }

  uploadFile(file: File, filename: string, idProd: number): Observable<File> {
    const imageFormData = new FormData();
    imageFormData.append("file", file, filename);
    const url = `${this.url + "/file/uplaodFilesProd/" + `${idProd}`}`;
    return this.http.post<File>(url, imageFormData);
  }
}
