import { memo, FC, useState, useCallback, ChangeEvent, useEffect } from 'react'
import { motion } from 'framer-motion'

import showPassImage from '../../../../assets/icons/show-password.svg'

import Modal from '../../../../components/Modal/Modal'
import Input from '../../../../UI/Input/Input';
import ToggleButton from '../../../../UI/ToggleButton/ToggleButton';

import classes from './AuthModal.module.scss'
import Title from '../../../../UI/Title/Title';
import { login, registration } from '../../../../http/userAPI';
import { userStore } from '../../../../store';
import { observer } from 'mobx-react-lite';

interface IAuthModal {
    isOpen: boolean;
    closeModal: () => void
}
interface IFields {
    email: string;
    password: string;
    confirmPassword: string;
}
const AuthModal: FC<IAuthModal> = observer((props) => {
    const { isOpen, closeModal } = props
    const [fields, setFields] = useState<IFields>({
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [isShowPass, setIsShowPass] = useState<boolean>(false);
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [reqData, setReqData] = useState<any>(null);
    useEffect(() => {
        if (reqData?.id) {
            if (reqData.role) {
              userStore.setIsAdmin(reqData.role)
            }
            userStore.setUser(
              {
                id: reqData.id,
                users_authorization: { role: reqData.role, email: reqData.email },
                image: reqData.image
              })
          }
    }, [reqData])
    const onChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setFields(prev => ({ ...prev, [event.target.name]: event.target.value }))
    }, []);

    const showPass = () => {
        setIsShowPass(prev => !prev)
    }
    const handleAction = async () => {
        try {
            if (isLogin) {
                await login(fields.email, fields.password).then(data => setReqData(data))
            }
            else {
                if (!isShowPass && fields.password === fields.confirmPassword) {
                    await registration(fields.email, fields.password).then(data => setReqData(data))
                }
                else {
                    alert("Пароли не совпадает")
                }
            }
        }
        catch (e: any) {
            alert(e.response.data.message)
        }
    }

    return (
        <Modal selectedId={isOpen} closeModal={closeModal}>
            <motion.div className={
                [
                    classes.authModal,
                    isLogin ? classes.authModal___isLogin : ''
                ].join(' ')}>
                <div className={
                    [
                        classes.authModal_inner,
                        isLogin ? classes.authModal_inner___isLogin : ''
                    ].join(' ')}>
                    <div className={classes.authModal_tabs}>
                        <button className={
                            [
                                classes.authModal_tabButton,
                                isLogin ? classes.authModal_tabButton___active : ''
                            ].join(' ')} onClick={() => setIsLogin(true)}>
                            Авторизация
                        </button>
                        <button className={
                            [
                                classes.authModal_tabButton,
                                !isLogin ? classes.authModal_tabButton___active : ''
                            ].join(' ')} onClick={() => setIsLogin(false)}>                            Регистрация
                        </button>
                    </div>

                    <div className={classes.authModal_fields}>
                        <Input
                            className={[classes.authModal_input].join(' ')}
                            value={fields.email}
                            onChange={onChangeHandler}
                            name='email'
                            placeholder='E-mail'

                        />
                        <div className={classes.authModal_passwordBox}>
                            <Input
                                className={
                                    [
                                        classes.authModal_input,
                                        classes.authModal_input___pass
                                    ].join(' ')}
                                value={fields.password}
                                onChange={onChangeHandler}
                                name='password'
                                type={isShowPass ? 'text' : 'password'}
                                placeholder='Пароль'
                            />
                            <ToggleButton
                                className={
                                    [
                                        classes.authModal_showPassBtn,
                                        !isShowPass ? classes.authModal_showPassBtn___active : ''
                                    ]
                                        .join(' ')}
                                buttonImage={showPassImage}
                                onClick={showPass}
                                title={!isShowPass ? 'Показать пароль' : 'Скрыть пароль'}
                            />
                        </div>
                        {
                            !isShowPass && !isLogin
                                ? <Input
                                    className={
                                        [
                                            classes.authModal_input,
                                            classes.authModal_input___pass
                                        ].join(' ')}
                                    value={fields.confirmPassword}
                                    onChange={onChangeHandler}
                                    name='confirmPassword'
                                    type={'password'}
                                    placeholder='Подтвердить пароль'
                                />
                                : null
                        }
                    </div>
                    <div className={classes.authModal_action}>
                        <button className={
                            [
                                classes.authModal_actionButton,
                            ].join(' ')} onClick={handleAction}>
                            {isLogin ? 'Войти' : 'Создать'}

                        </button>
                        <button className={
                            [
                                classes.authModal_actionButton,
                                classes.authModal_actionButton___exite,
                            ].join(' ')} onClick={closeModal}>
                            Отмена
                        </button>
                    </div>
                </div>
            </motion.div>
        </Modal>
    )
})

export default AuthModal