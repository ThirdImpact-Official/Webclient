import FormUtils from "@/classes/FormUtils";

export interface GetSessionGameDto {
    segId: number;
    escapeGameId: number;
    date: Date;
    price: number;
    placeavailable: number;
    pLacemaximum: number;
}

// Définition correcte des colonnes
export const Sessioncolumns: Array<{ label: string; accessor: keyof GetSessionGameDto }> = [
    FormUtils.TableMapper("ID", "segId"),
    FormUtils.TableMapper("Escape Game ID", "escapeGameId"),
    FormUtils.TableMapper("Date", "date"),
    FormUtils.TableMapper("Price", "price"),
    FormUtils.TableMapper("Places Available", "placeavailable"),
    FormUtils.TableMapper("Max Places", "pLacemaximum"),
];
