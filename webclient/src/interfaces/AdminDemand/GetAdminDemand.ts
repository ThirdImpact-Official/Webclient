import { DemandStatus } from "./DemandStatut";

export interface GetAdminDemandDto {
    id: number;
    title: string;
    content: string;
    contactNumber: string;
    statut: DemandStatus;
    creationDate: string;
    updateDate: string;
    motifRefus: string;
    commentairesAdmin: string;
    traiteeParAdminId: number | null;
    userId: number;
    organisationId: number | null;
}