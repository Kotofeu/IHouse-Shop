import {
    FC,
    memo,
    useCallback,
    useState,
    HTMLInputTypeAttribute,
    FormEvent
} from 'react'

import classes from './HeaderSearchForm.module.scss'

interface IHeaderSearchForm {
    inputTitle?: string,
    buttonTitle: string,
    inputType?: HTMLInputTypeAttribute,
    className?: string,

}
const HeaderSearchForm: FC<IHeaderSearchForm> = memo((props) => {
    const { inputTitle, buttonTitle, inputType, className } = props
    const [searchValue, setSearchValue] = useState<string>('');

    const searchFormSubmit = useCallback(
        (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            //Отправка на сервер
        }, []
    )
    const searchFormChange = (event: FormEvent<HTMLInputElement>) => {
        setSearchValue(event.currentTarget.value)
    }
    return (
        <form
            className={
                [classes.searchForm, className ? className : '']
                    .join(' ')
            }
            onSubmit={searchFormSubmit}
        >
            <input
                className={classes.searchForm_input}
                type={inputType}
                autoComplete="off"
                title={inputTitle}
                value={searchValue}
                onChange={searchFormChange}
            />
            <button
                className={classes.searchForm_button}
                type='submit'
                title={buttonTitle}
            >
                {buttonTitle}
            </button>
        </form>)
})

export default HeaderSearchForm