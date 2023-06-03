import { memo, FC, ChangeEvent } from 'react'
import Input from '../../UI/Input/Input';

import classes from './Counter.module.scss'

export enum CounterButtonType {
    arrow = classes.counter_button___arrow,
    char = classes.counter_button___char,

}
type useStateParam = ((prev: number) => number) | number
interface ICounter {
    className?: string;
    count: number;
    step?: number;
    minCount?: number;
    maxCount?: number;
    counterButtonType?: CounterButtonType;
    setCount?: (prevState: useStateParam) => void
}
const Counter: FC<ICounter> = memo((props) => {

    const {
        className = '',
        count,
        step = 1,
        minCount = 0,
        maxCount,
        counterButtonType = CounterButtonType.char,
        setCount
    } = props;
    if (!setCount) {
        return (
            <div className={[classes.fixedCounter, className].join(' ')}>
                <span>{count}шт.</span>
            </div>
        )
    }
    const buttonClass = [classes.counter_button, counterButtonType].join(' ')
    const handleDecrement = () => {
        setCount((prev) => validateValue(prev - step));
    }
    const handleIncrement = () => {
        setCount((prev) => validateValue(prev + step));
    }
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = (event.target.value ? parseInt(event.target.value) : 0);
        setCount(validateValue(value));
    }
    const validateValue = (value: number) => {
        if (value < minCount) {
            value = minCount;
        }
        if (maxCount && value > maxCount) {
            value = maxCount;
        }
        return value;
    }
    return (
        <div className={[classes.counter, className].join(' ')}>
            <button
                className={[
                    buttonClass,
                    classes.counter_button___decrement
                ].join(' ')}
                onClick={handleDecrement}
                type='button'
                title='Уменьшить'
            />
            <Input
                value={count.toString()}
                onChange={handleChange}
                className={classes.counter_input}
                type="number"
            />
            <button
                className={[
                    buttonClass,
                    classes.counter_button___increment
                ].join(' ')}
                onClick={handleIncrement}
                type='button'
                title='Увеличить'
            />
        </div>)
})

export default Counter