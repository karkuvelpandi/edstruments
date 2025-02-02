import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';

export default function TabsSegmentedControls() {
  return (
    <Tabs aria-label="tabs" defaultValue={0} sx={{ bgcolor: 'transparent' }}>
      <TabList
        disableUnderline
        sx={{
          p: 0.1,
          gap: 0.5,
          borderRadius: 'xl',
          bgcolor: '#d5d6d8',
          [`& .${tabClasses.root}[aria-selected="true"]`]: {
            boxShadow: 'sm',
            bgcolor: 'blue',
            color: 'white',
          },
        }}
      >
        <Tab disableIndicator>$</Tab>
        <Tab disableIndicator>%</Tab>
      </TabList>
    </Tabs>
  );
}