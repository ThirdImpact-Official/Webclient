import { GetDifficultyLevelDto } from "../DifficultyLevel/getDifficultyLevelDto";
import { GetPriceDto } from "../Price/getPriceDto";

export interface GetEscapeGameDto {
    eSGId: number;
    eSGNom: string;
    eSGCreator: string;
    eSGTitle: string;
    eSGContent: string;
    eSGImgResources: string;
    eSGWebsite: string;
    eSGPhoneNumber: string;
    eSG_IsDeleting: boolean;
    eSG_IsForChildren: boolean;
    eSG_Price_Id: number;
    eSG_DILE_Id: number;
    price: GetPriceDto | null;
    difficultyLevel: GetDifficultyLevelDto | null;
    eSG_CreationDate: string;
    eSG_UpdateTime: string;
}