import {
    memo,
    useCallback,
    useState,
    FormEvent,
    ChangeEvent
} from 'react'
import Form from '../../../../components/Form/From'

import classes from './HeaderSearchForm.module.scss'

const HeaderSearchForm = memo(() => {
    const [searchValue, setSearchValue] = useState<string>('');

    const searchFormSubmit = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            //Отправка на сервер
        }, []
    )
    const searchFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
    }
    return (
        <Form
            className={classes.header_searchForm}
            onFormSubmit={searchFormSubmit}
            inputProps={{
                onChange: searchFormChange,
                value: searchValue,
                type: 'text',
                title: 'Поле поиска',
                autoComplete: 'off',
                placeholder: 'Поиск по сайту'
            }}
            buttonProps={{
                buttonTitle: "Поиск"
            }}
        />
    )
})

export default HeaderSearchForm