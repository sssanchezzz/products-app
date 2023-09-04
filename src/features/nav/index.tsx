import { Tab, Tabs } from '@mui/material';
import React, { FC } from 'react';

const Nav: FC = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Tabs value={value} onChange={handleChange} centered>
            <Tab label='Item One' />
            <Tab label='Item Two' />
            <Tab label='Item Three' />
        </Tabs>
    );
};
export default Nav;
