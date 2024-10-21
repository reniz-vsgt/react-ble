import { Segmented } from 'antd';
import './WeekView.css'
import moment from 'moment';
import { getTimestamp } from '../utils/utils';

const WeekView = ({ week, callback, value }: { week: number, callback: Function, value:string }) => {

    const startOfWeek = moment().add(week, 'weeks').startOf('isoWeek')
    const endOfWeek = moment().add(week, 'weeks').endOf('isoWeek')

    var days = [];
    var day = startOfWeek;

    while (day <= endOfWeek) {
        const dayArray = (String(day.toDate())).split(" ")
        days.push({
            label: (
                <>
                    <div className='card'>
                        <p className='day' style={{ margin: '0px' }}>{dayArray[0]}</p>
                        <p className='date' style={{ margin: '0px' }}>{dayArray[2]}</p>
                    </div>
                </>
            ),
            value: getTimestamp(day.toDate())
        });
        day = day.clone().add(1, 'd');
    }

    return (
        <>
            <div className='weekViewContainer'>
                <Segmented
                    size='small'
                    className='segment'
                    options={days}
                    onChange={(value) => {
                        callback(value);
                    }}
                    value={value}
                />
            </div>
        </>

    );
};

export default WeekView;