import { Material } from './../shared/models/material.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
  export class MaterialService {

    baseUrl = 'http://localhost:5000/api/courseMaterials/';
    materials: Material[] = [];

    selectedId: number;
    selectedName: string;
    selectedLink: string;

    constructor(private http: HttpClient) { }

    getCourseMaterials(courseId: number): Observable<Material[]> {
        return this.http.get(this.baseUrl + 'get-materials/' + courseId)
                .pipe(
                    map((materials: IMaterial[]) => materials
                        .map(m => new Material(
                            m.id, m.name, m.link, m.courseId))
                        )
                    );
    }

    createMaterial(model: any): Observable<Material> {
        return this.http.post(this.baseUrl + 'create-material', model)
            .pipe(
                map((m: IMaterial) => {
                    const newMaterial = new Material(
                        m.id, m.name, m.link, m.courseId
                    );
                    this.materials.push(newMaterial);
                    return newMaterial;
                    }
                )
            );
        }

    updateMaterial(id: number, model: any): Observable<Material> {
        return this.http.put(this.baseUrl + `update-material/${id}`, model)
            .pipe(
                map((m: IMaterial) => {
                    const newMaterial = new Material(
                        m.id, m.name, m.link, m.courseId
                    );
                    return newMaterial;
                    }
                )
            );
        }

    deleteMaterial(id: number) {
        return this.http.delete(this.baseUrl + `delete-material/${id}`);
        }

  }

interface IMaterial {
    id: number;
    name: string;
    link: string;
    courseId: number;
}
