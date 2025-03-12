import GenericTable from '@/components/factory/GenericComponent/GenericTable';
import { AddActivityPlaceDto } from '@/interfaces/EscapeGameInterface/ActivityPlace/addActivityPlaceDto';
import { GetActivityPlaceDto } from '../../../interfaces/EscapeGameInterface/ActivityPlace/getActivityPlaceDto';
import { Typography } from '@mui/material';

interface ActivityProps {
    data: any;
    columns: {label:string ; accessor: keyof GetActivityPlaceDto}[];
    onDetails: (org:GetActivityPlaceDto ) => void;
    onUpdate: (org: GetActivityPlaceDto) => void;
}

const ActivityPlaceTable: React.FC<ActivityProps>  = ({data, columns, onUpdate, onDetails}) => {

    const handleDetails = (activityPlace: GetActivityPlaceDto) => {
        onDetails(activityPlace);
    }
    const handleUpdate = (activityPlace: GetActivityPlaceDto) => {
        onUpdate(activityPlace);
    }

    return (
            <div>
                <Typography>ActivityPlaceTable</Typography>
                <GenericTable data={data} columns={columns} OnDetails={handleDetails} OnUpdate={handleUpdate} />
            </div>
        );
};

export default ActivityPlaceTable;