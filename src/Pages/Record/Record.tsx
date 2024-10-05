import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import BLE from '../BLE/BLE';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        label: 'Metabolic',
        key: 'Metabolic',
        icon: <img alt='Metabolic' style={{ width: '24px', height: '24px' }} src={"/metabolic.png"}></img>,
    },
    {
        label: 'Vitals',
        key: 'Vitals',
        icon: <img alt='Vitals' style={{ width: '22px', height: '22px' }} src={"/vitals.png"}></img>,
    }
];



const Record: React.FC = () => {
    const [current, setCurrent] = useState('Metabolic');
    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };

    return (
        <>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
            <BLE sampleType={current}/>
        </>
    )
}

export default Record;