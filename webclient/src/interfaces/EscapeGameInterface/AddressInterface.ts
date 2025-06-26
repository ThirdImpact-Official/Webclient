export interface AddAddressDto{
    street: string;
    postalCode: string;
    city: string;
    country: string;
    escapeGameId: number | null;
    organisationId: number | null;
    activityPlaceId: number | null;
}export interface GetAddressDto {
    adressId: number;
    street: string;
    postalCode: string;
    city: string;
    country: string;
    latitude: number;
    longitude: number;
    escapeGameId: number | null;
    organisationId: number | null;
    activityPlaceId: number | null;
}