
import LineChartState from "@/components/factory/GenericComponent/StatisticModule";
import GenericTabs, { TabItem } from "@/components/factory/GenericComponent/TabGénéric";
import { Box } from "@mui/material"
import { useRef, useState } from "react";
import { data } from 'react-router-dom';


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
    const tabs: TabItem[]=[
        {
            label:"tab1",
            content:<>
                <LineChartState 
                    data={data}
                    title={"title"}
                    labels={[]}
                 />
            </>
        },
        {
            
            label:"tab1",
            content:<></>
        },
        {
            
            label:"tab1",
            content:<></>
        },
        {
            
            label:"tab1",
            content:<></>
        }

    ]
    return(
    <Box className="flex items-center justify-center">
       
        <Box>
            <GenericTabs ref={tabsRef} tabs={tabs} defaultTab={0}  ChangeTab={goToTab}  />
        </Box>
    </Box>
    )
}

export default statisticComponent