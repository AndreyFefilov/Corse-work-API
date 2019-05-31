import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Cluster } from '../shared/models/cluster.model';

@Injectable({
    providedIn: 'root'
})
export class ClusterService {

    constructor(private http: HttpClient) { }

    getAllClusters(): Observable<Cluster[]> {
        return this.http.get('http://localhost:5000/api/Clusters/get-clusters')
            .pipe(
                map((clusters: ICluster[]) => clusters
                    .map(cluster => new Cluster(
                        cluster.id, cluster.studyFlow, cluster.group, cluster.subGroup))
                )
            );
    }
}

interface ICluster {
    id: number;
    studyFlow: string;
    group: string;
    subGroup: string;
}
