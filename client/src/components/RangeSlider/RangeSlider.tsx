import { memo, useEffect, useState, FC, ChangeEvent, Dispatch } from 'react'

import classes from './RangeSlider.module.scss'
interface IValue {
    min: number;
    max: number;
}
interface IRangeSlider{
    min: number;
    max: number;
    value: IValue;
    step?: number;
    onChange: Dispatch<React.SetStateAction<IValue>>
}
export const RangeSlider: FC<IRangeSlider> = memo((props) => {
    const {min, max, value, step = 1, onChange} = props
    const [minValue, setMinValue] = useState<number>(value ? value.min : min);
    const [maxValue, setMaxValue] = useState<number>(value ? value.max : max);

    useEffect(() => {
        if (value) {
            setMinValue(value.min);
            setMaxValue(value.max);
        }
    }, [value]);

    const handleMinChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const newMinVal = Math.min(+event.target.value, maxValue - step);
        if (!value) setMinValue(newMinVal);
        onChange({ min: newMinVal, max: maxValue });
    };

    const handleMaxChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const newMaxVal = Math.max(+event.target.value, minValue + step);
        if (!value) setMaxValue(newMaxVal);
        onChange({ min: minValue, max: newMaxVal });
    };

    const minPos = ((minValue - min) / (max - min)) * 100;
    const maxPos = ((maxValue - min) / (max - min)) * 100;

    return (
        <div className={classes.wrapper}>
            <div className={classes.inputWrapper}>
                <input
                    className={classes.input}
                    type="range"
                    value={minValue}
                    min={min}
                    max={max}
                    step={step}
                    onChange={handleMinChange}
                />
                <input
                    className={classes.input}
                    type="range"
                    value={maxValue}
                    min={min}
                    max={max}
                    step={step}
                    onChange={handleMaxChange}
                />
            </div>

            <div className={classes.controlWrapper}>
                <div className={classes.control} style={{ left: `${minPos}%` }} />
                <div className={classes.rail}>
                    <div
                        className={classes.innerRail}
                        style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
                    />
                </div>
                <div className={classes.control} style={{ left: `${maxPos}%` }} />
            </div>
        </div>
    );
})