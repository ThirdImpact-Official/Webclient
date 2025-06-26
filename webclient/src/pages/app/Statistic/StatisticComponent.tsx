
import LineChartState from "@/components/factory/GenericComponent/StatisticModule";
import GenericTabs, { TabItem } from "@/components/factory/GenericComponent/TabGénéric";
import { Box } from "@mui/material"
import { useRef, useState } from "react";
import { Typography,Card,CardContent } from "@mui/material";
import { UnitofAction } from "@/actions/UnitofAction";
import { StatisticDataDto } from "@/actions/statisticAction";
import EscapeGameStatistic from "./EscapegameStatistic";
import { OrganisationStatistic } from "./Organisationstation";
const statisticComponent = () => {
    const tabsRef = useRef<{ changeTab: (index: number) => void } | null>(null);
    const goToTab = (index: number) => {
        if (tabsRef.current) {
          tabsRef.current.changeTab(index);
        }
    };
    const [data,setData]= useState<number[]>([]);
    const generaterandomdata = () => {
        const Data= Array.from({ length: 10 },()=> Math.floor(Math.random() * 100));
        setData(Data);
    }

    const action = new UnitofAction();
    const [getdata,setdata]= useState<StatisticDataDto | null>(null)
    
    const tabs: TabItem[]=[
        {
            label:"tab1",
            content:<>
                <EscapeGameStatistic />
            </>
        },
       
        {
            
            label:"organisation",
            content:<>
              <OrganisationStatistic />
            </>
        },
        {
            
            label:"+",
            content:<>
                <Typography>More to comme </Typography>
            </>
        }

    ]
    return(
    <Box className="flex items-center justify-center">
        <Box>
            <Card>
                <CardContent>
                    <Typography>vos statisitic bientot a portée de main </Typography>
                </CardContent>    
            </Card>
        </Box>
        <Box>
            <GenericTabs ref={tabsRef} tabs={tabs} defaultTab={0}  ChangeTab={goToTab}  />
        </Box>
    </Box>
    )
}

export default statisticComponent