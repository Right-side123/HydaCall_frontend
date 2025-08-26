import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import { format, subDays, startOfMonth, endOfMonth } from 'date-fns';
import { enIN } from 'date-fns/locale';
import '../styles/DateRange.css';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import calenderIcon from '../assets/calendar.png';

const DateRangeFilter = () => {
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const [showPicker, setShowPicker] = useState(false);

    const predefinedRanges = [
        {
            label: 'Today',
            range: () => ({
                startDate: new Date(),
                endDate: new Date()
            })
        },
        {
            label: 'Yesterday',
            range: () => ({
                startDate: subDays(new Date(), 1),
                endDate: subDays(new Date(), 1)
            })
        },
        {
            label: 'Last 7 Days',
            range: () => ({
                startDate: subDays(new Date(), 6),
                endDate: new Date()
            })
        },
        {
            label: 'Last 30 Days',
            range: () => ({
                startDate: subDays(new Date(), 29),
                endDate: new Date()
            })
        },
        {
            label: 'This Month',
            range: () => ({
                startDate: startOfMonth(new Date()),
                endDate: endOfMonth(new Date())
            })
        },
        {
            label: 'Last Month',
            range: () => {
                const start = startOfMonth(subDays(new Date(), 30));
                const end = endOfMonth(subDays(new Date(), 30));
                return { startDate: start, endDate: end };
            }
        }
    ];

    return (
        <div style={{ position: 'relative' }}>
            <button onClick={() => setShowPicker(!showPicker)} className='date_picker_toggle'>
                <img src={calenderIcon} alt='calender' className='calendericon' />
                {format(state[0].startDate, 'dd/MM/yyyy')} - {format(state[0].endDate, 'dd/MM/yyyy')}
            </button>

            {showPicker && (
                <div className='date_picker_wrapper'>
                    <DateRangePicker
                        onChange={item => setState([item.selection])}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={1}
                        ranges={state}
                        direction="horizontal"
                        staticRanges={predefinedRanges.map(item => ({
                            label: item.label,
                            range: item.range,
                            isSelected() {
                                return false;
                            }
                        }))}
                        inputRanges={[]}
                        locale={enIN}
                    />
                    <div className="daterange_btns">
                        <button className='date_picker_toggle'>
                            {format(state[0].startDate, 'dd/MM/yyyy')} - {format(state[0].endDate, 'dd/MM/yyyy')}
                        </button>
                        <div className='daterange_btns_can_sub'>
                            <button onClick={() => setShowPicker(false)} style={{ backgroundColor: '#db243a' }}>
                                Cancel
                            </button>
                            <button onClick={() => setShowPicker(false)} style={{ backgroundColor: '#140049' }}>
                                Select
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DateRangeFilter;
