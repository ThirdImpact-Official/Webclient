export interface AddSessionGameDto  {
    escapeGameId: number;
    date: Date;
    price: number;
    placeAvailable: number;
    placeMaximum: number;
}
interface SessionDuplicationDto {
  sessionGameId: number;
  intervalTime: number;
  startTime: string; // ISO date string
  endTime: string;   // ISO date string
  dayNumber: number;
}

interface AddGameSessionDto {
  escapeGameId: number;
  gameDate: string; // ISO date string
  price: number;
  placeAvailable: number;
  placeMaximum: number;
  isRecurrent: boolean;
  sessionDuplicationDto: SessionDuplicationDto;
}