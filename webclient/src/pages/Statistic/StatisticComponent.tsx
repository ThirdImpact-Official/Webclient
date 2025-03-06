
import GenericTabs, { TabItem } from "@/components/factory/GenericComponent/TabGénéric";
import { Box } from "@mui/material"
import { useRef } from "react";


const statisticComponent = () => {
    const tabsRef = useRef<{ changeTab: (index: number) => void } | null>(null);
    const goToTab = (index: number) => {
        if (tabsRef.current) {
          tabsRef.current.changeTab(index);
        }
    };
    const tabs: TabItem[]=[
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