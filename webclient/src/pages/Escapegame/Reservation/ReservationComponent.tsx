import GenericTabs, { TabItem } from "@/components/factory/GenericComponent/TabGénéric";
import { Box } from "@mui/material";
import { useRef, useState } from "react";
import { GetSessionReservedDto, reservationcolumns } from "@/interfaces/EscapeGameInterface/Reservation/getSessionReservedDto";
import GetReservation from "./GetReservation";
import GetReservationTable from './GetReservationTable';
import { useParams } from "react-router-dom";



const mockSessionReservedList: GetSessionReservedDto[] = [
    {
        id: 1,
        content: "Réservation pour la session de test",
        userId: "user-123",
        sessionGameId: 101,
        sessionGame: {
            id: 101,
            name: "Jeu de stratégie",
            date: "2025-03-01T14:00:00Z"
        },
        isCancel: false,
        cancelReason: "",
        isConfirmed: true,
        creationDate: "2025-02-20T10:00:00Z",
        updateDate: "2025-02-21T12:00:00Z"
    },
    {
        id: 2,
        content: "Réservation annulée par l'utilisateur",
        userId: "user-456",
        sessionGameId: 102,
        sessionGame: {
            id: 102,
            name: "Jeu d'aventure",
            date: "2025-03-02T16:00:00Z"
        },
        isCancel: true,
        cancelReason: "Problème d'agenda",
        isConfirmed: false,
        creationDate: "2025-02-22T09:30:00Z",
        updateDate: "2025-02-23T14:45:00Z"
    },
    {
        id: 3,
        content: "Réservation en attente de confirmation",
        userId: "user-789",
        sessionGameId: 103,
        sessionGame: null,
        isCancel: false,
        cancelReason: "",
        isConfirmed: false,
        creationDate: "2025-02-25T11:15:00Z",
        updateDate: "2025-02-25T11:15:00Z"
    }
];



const ReservationComponent = () => {
    const {id}=useParams();
    console.log(id);
    const tabsRef = useRef<{
        changeTab: (index: number) => void;
    } | null>(null);

    const [reservations, setReservations] = useState<GetSessionReservedDto[]>(mockSessionReservedList);
    const [selectedReservation, setSelectedReservation] = useState<GetSessionReservedDto | null>(mockSessionReservedList.findIndex(reservation => reservation.id === Number(id)) !== -1 ? mockSessionReservedList.find(reservation => reservation.id === Number(id)) : null);

    const goToTab = (index: number) => {
        if (tabsRef.current) {
            tabsRef.current.changeTab(index);
        }
    };

    const handleDetails = (reservation: GetSessionReservedDto) => {
        setSelectedReservation(reservation);
        goToTab(1);
    };

    const handleUpdate = (reservation: GetSessionReservedDto) => {
        setSelectedReservation(reservation);
        goToTab(2);
    };

    const columns = reservationcolumns;

    const tabs: TabItem[] = [
        {
            label: 'List',
            content: (
                <GetReservationTable
                    data={reservations}
                    columns={columns}
                    OnDetails={handleDetails}
                    OnUpdate={handleUpdate} />
            ),
        },
        {
            label: 'Details',
            content: selectedReservation ? (
                <GetReservation cols={columns} data={selectedReservation} />
            ) : null,
        },
        { label: 'Update', 
            content:(
                <>
                </>
            ) },
    ];

    return (
        <Box>
            <GenericTabs
                ref={tabsRef} 
                tabs={tabs}
                defaultTab={1}
                ChangeTab={goToTab}/>
        </Box>
    );
};

export default ReservationComponent;