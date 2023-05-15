import {
    memo,
    useCallback,
    useState,
    FormEvent
} from 'react'
import  Form  from '../../../../components/Form/From'
import image from '../../../../assets/testIam.jpg'

import classes from './HeaderSearchForm.module.scss'

const HeaderSearchForm = memo(() => {
    const [searchValue, setSearchValue] = useState<string>('');

    const searchFormSubmit = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            //Отправка на сервер
        }, []
    )
    const searchFormChange = (event: FormEvent<HTMLInputElement>) => {
        setSearchValue(event.currentTarget.value)
    }
    return (
        <Form
            className={classes.header_searchForm}
            onFormSubmit={searchFormSubmit}
            inputValue={searchValue}
            inputType='text'
            inputTitle='Поле поиска'
            inputAutoComplete='off'
            placeholder='Поиск по сайту'
            inputOnChange={searchFormChange}
            buttonTitle='Поиск'
        />
    )
})

export default HeaderSearchForm