import React, { useState, useRef } from 'react';
import { DateRangePicker } from 'react-date-range';
import { format, subDays, startOfMonth, endOfMonth } from 'date-fns';
import { enIN } from 'date-fns/locale';
import ReactDOM from 'react-dom';
import '../styles/DateRange.css';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import calenderIcon from '../assets/calendar.png';

const DateRangeFilter = ({ align = "left" }) => {
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const [showPicker, setShowPicker] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });

    const buttonRef = useRef(null);

    const predefinedRanges = [
        { label: 'Today', range: () => ({ startDate: new Date(), endDate: new Date() }) },
        { label: 'Yesterday', range: () => ({ startDate: subDays(new Date(), 1), endDate: subDays(new Date(), 1) }) },
        { label: 'Last 7 Days', range: () => ({ startDate: subDays(new Date(), 6), endDate: new Date() }) },
        { label: 'Last 30 Days', range: () => ({ startDate: subDays(new Date(), 29), endDate: new Date() }) },
        { label: 'This Month', range: () => ({ startDate: startOfMonth(new Date()), endDate: endOfMonth(new Date()) }) },
        {
            label: 'Last Month',
            range: () => {
                const start = startOfMonth(subDays(new Date(), 30));
                const end = endOfMonth(subDays(new Date(), 30));
                return { startDate: start, endDate: end };
            }
        }
    ];

    const handleToggle = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            let leftPos = rect.left + window.scrollX;

            if (align === "right") {
                leftPos = rect.right + window.scrollX - 400;
            }
            else if (align === "left") {
                leftPos = rect.right + window.scrollX - 225;
            }

            setPosition({
                top: rect.bottom + window.scrollY + 5,
                left: leftPos
            });
        }
        setShowPicker(!showPicker);
    };

    return (
        <div>
            <button ref={buttonRef} onClick={handleToggle} className='date_picker_toggle'>
                <img src={calenderIcon} alt='calender' className='calendericon' />
                {format(state[0].startDate, 'dd/MM/yyyy')} - {format(state[0].endDate, 'dd/MM/yyyy')}
            </button>

            {showPicker &&
                ReactDOM.createPortal(
                    <div
                        className='date_picker_wrapper'
                        style={{
                            position: 'absolute',
                            top: position.top,
                            left: position.left,
                            zIndex: 9999
                        }}
                    >
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
                    </div>,
                    document.body
                )}
        </div>
    );
};

export default DateRangeFilter;
