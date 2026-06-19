import React, { useState, ReactNode, forwardRef, useImperativeHandle } from 'react';
import { Tabs, Tab, Box } from "@mui/material";

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tab-panel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export interface TabItem {
  label: string;
  content: ReactNode;
}

export interface GenericTabsProps {
  tabs: TabItem[];
  defaultTab?: number;
  ariaLabel?: string;
  ChangeTab?: (arg: number) => void;
}

const GenericTabs = forwardRef(({ tabs, defaultTab = 0, ariaLabel = "generic tabs", ChangeTab }: GenericTabsProps, ref) => {
  const [value, setValue] = useState(defaultTab);

  useImperativeHandle(ref, () => ({
    changeTab: (tabIndex: number) => {
      setValue((prev) => {
        if (tabIndex >= 0 && tabIndex < tabs.length && tabIndex !== prev) {
          ChangeTab?.(tabIndex);
          return tabIndex;
        }
        return prev;
      });
    },
    currentTab: () => value
  }));

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={(e, newValue) => setValue(newValue)}
        aria-label={ariaLabel}
        sx={{
          borderBottom: "1px solid #d0d7de",
          minHeight: "40px",

          "& .MuiTab-root": {
            textTransform: "none",
            fontWeight: 500,
            color: "#57606a",
            minHeight: "40px",
            paddingX: 2,
            "&:hover": {
              color: "#24292f",
              backgroundColor: "#f6f8fa",
            }
          },

          "& .Mui-selected": {
            color: "#24292f",
            fontWeight: 600,
          },

          "& .MuiTabs-indicator": {
            backgroundColor: "#0969da",
            height: "3px",
            borderRadius: "3px 3px 0 0",
          }
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            id={`tab-${index}`}
            aria-controls={`tab-panel-${index}`}
          />
        ))}
      </Tabs>

      {tabs.map((tab, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
          {tab.content}
        </CustomTabPanel>
      ))}
    </Box>
  );
});

export default GenericTabs;
