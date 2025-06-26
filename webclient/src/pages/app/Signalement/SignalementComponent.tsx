import { GetEscapeGameDto } from '@/interfaces/EscapeGameInterface/EscapeGame/getEscapeGameDto';
import { useParams} from 'react-router-dom';
import { UnitofAction } from '@/actions/UnitofAction';
import { useEffect } from 'react';
import { GetRatingDto } from '@/interfaces/EscapeGameInterface/Rating/Rating';
import { useState,useRef } from 'react';
import {Box,Stack} from '@mui/material'
import GenericTabs, { TabItem } from '@/components/factory/GenericComponent/TabGénéric';
import { GetSignalementForumDto } from '@/interfaces/Moderation/getSignalementDto';
import {GetSignalementType} from '@/interfaces/Moderation/getSignalementType';
import SignalementTable from './SignalementTable';
import SignalementDetails from './SignalementDetails';
const SignalementComponent = () => {
    const{esgId} =useParams();
    const action = new UnitofAction();
    const [isloading,setloading ]=useState<boolean>(false);
    const [tabEscape,setEscape]=useState<GetEscapeGameDto>();
    const [getRating,setRatig]=useState<GetSignalementDto|null>(null);
     const tabsRef = useRef<{ changeTab: (index: number) => void } | null>(null);

    useEffect(() => {
       
    }, []);
    /**
     * Navigates to the specified tab index.
     * Utilizes the tabsRef to change the current tab.
     * @param index The index of the tab to navigate to.
     */
    const goToTab = (index: number) => {
        if (tabsRef.current !== null) {
        tabsRef.current.changeTab(index);
        }
    };
    const tab:TabItem[]=[
        {
            label:'Signalement',
            content: (
                <SignalementTable />
            )
        },
        {
            label:'Signalement',
            content: (
                <SignalementDetails />
            )
        }
    ]
    return (
        <Stack
         sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gridTemplateRows: 'repeat(5, 1fr)',
            columnGap: 0,
            rowGap: 0,
            height: '100vh',
            p: 2,
            }}
        >
            <Box>

            </Box>
            <Box>
                  <GenericTabs ref={tabsRef} tabs={tab} defaultTab={0} ChangeTab={goToTab} ariaLabel="generic tabs"/>
            </Box>
        </Stack>
    )
}
export default SignalementComponent;