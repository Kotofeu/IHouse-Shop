import {
    FC,
    memo,
    HTMLInputTypeAttribute,
    FormEvent
} from 'react'

import classes from './Form.module.scss'

interface IForm {
    className?: string,

    inputValue: string,
    inputTitle?: string,
    inputType?: HTMLInputTypeAttribute,
    placeholder?: string,
    inputAutoComplete?: string,
    inputOnChange: (event: FormEvent<HTMLInputElement>) => void,

    buttonTitle: string,
    buttonImage?: string,

    onFormSubmit: (event: FormEvent<HTMLFormElement>) => void,
}
const Form: FC<IForm> = memo((props) => {
    const {
        className,

        inputTitle,
        inputType = 'text',
        inputValue,
        placeholder,
        inputAutoComplete = 'off',
        inputOnChange,

        buttonTitle,
        buttonImage,

        onFormSubmit,
    } = props
    return (
        <form
            className={
                [classes.form, className ? className : '']
                    .join(' ')
            }
            onSubmit={onFormSubmit}
        >
            <input
                className={classes.form_input}
                type={inputType}
                autoComplete={inputAutoComplete}
                title={inputTitle}
                value={inputValue}
                onChange={inputOnChange}
                placeholder={placeholder}
            />
            <button
                className={classes.form_button}
                type='submit'
                title={buttonTitle}
            >
                {
                    buttonImage
                        ? <img className={classes.form_buttonImage} src={buttonImage} alt={buttonTitle} />
                        : <div className={classes.form_buttonText}>
                            <span>
                                {buttonTitle}
                            </span>
                        </div>

                }
            </button>
        </form>
    )
})

export default Form