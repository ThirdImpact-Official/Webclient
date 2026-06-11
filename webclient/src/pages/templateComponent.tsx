
import { useRef } from 'react';
import { TabItem } from '../components/factory/GenericComponent/TabGénéric';
import GenericTabs from '@/components/factory/GenericComponent/TabGénéric';

const TemplateComponent = () => {   
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
        }
    ]
    return(
        <>
            <GenericTabs ref={tabsRef} tabs={tabs} defaultTab={0}  ChangeTab={goToTab}  />
        </>
    )
}
export default TemplateComponent;

