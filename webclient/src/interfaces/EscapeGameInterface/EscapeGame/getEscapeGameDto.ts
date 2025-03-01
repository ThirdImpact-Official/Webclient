import FormUtils from "@/classes/FormUtils";
import { GetDifficultyLevelDto } from "../DifficultyLevel/getDifficultyLevelDto";
import { GetPriceDto } from "../Price/getPriceDto";
import EscapeGame from '../../../pages/app/Escapgame';

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
export const EscapeGameColumns: Array<{ label: string; accessor: keyof GetEscapeGameDto }> = [
    FormUtils.TableMapper("ID", "eSGId"),
    FormUtils.TableMapper("Nom", "eSGNom"),
    FormUtils.TableMapper("Créateur", "eSGCreator"),
    FormUtils.TableMapper("Titre", "eSGTitle"),
    FormUtils.TableMapper("Description", "eSGContent"),
    FormUtils.TableMapper("Image", "eSGImgResources"),
    FormUtils.TableMapper("Site Web", "eSGWebsite"),
    FormUtils.TableMapper("Téléphone", "eSGPhoneNumber"),
    FormUtils.TableMapper("Supprimé ?", "eSG_IsDeleting"),
    FormUtils.TableMapper("Pour Enfants ?", "eSG_IsForChildren"),
    FormUtils.TableMapper("ID Prix", "eSG_Price_Id"),
    FormUtils.TableMapper("ID Difficulté", "eSG_DILE_Id"),
    FormUtils.TableMapper("Prix", "price"),
    FormUtils.TableMapper("Niveau de difficulté", "difficultyLevel"),
    FormUtils.TableMapper("Date de création", "eSG_CreationDate"),
    FormUtils.TableMapper("Dernière mise à jour", "eSG_UpdateTime"),
];

