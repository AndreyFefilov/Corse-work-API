export class Cluster {
    constructor(clusterId: number, flow: string, group: string, subGroup: string) {
        this.id = clusterId;
        this.flow = flow;
        this.group = group;
        this.subGroup = subGroup;
    }

    id: number;
    flow: string;
    group: string;
    subGroup: string;
}
