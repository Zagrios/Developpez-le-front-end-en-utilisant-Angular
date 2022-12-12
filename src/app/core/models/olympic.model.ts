import { Participation } from "./participation.model";

export interface Olympics {
    id: number;
    country: string,
    participations: Participation[]
}
