import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { t } from 'i18next'
import { Button, Input, Spin } from 'antd'
import { LoginUserService } from '../api/service'
import { setItemWithExpiration } from '../utils/expireToken'
import SuccessAlert from '../components/alerts/SuccessAlert'
import ErrorAlert from '../components/alerts/ErrorAlert'

const AuthLayout = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isError, setIsError] = useState(false)

    const navigate = useNavigate()

    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            username: "",
            password: ""
        }
    })

    const onSubmit = async (data) => {
        setIsLoading(true)
        const body = {
            KULLANICIKOD: data.username,
            SIFRE: data.password,
        }

        try {
            const response = await LoginUserService(body)
            if (response?.data.accessToken) {
                setIsSuccess(true)
                setItemWithExpiration("token", response?.data.accessToken, 24, response?.data.siraNo)
                navigate("/")
            }
        } catch (error) {
            setIsError(true)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="login">
            {/* alert messages */}
            {isSuccess && <SuccessAlert />}
            {isError && <ErrorAlert />}

            <div className="grid h-full">
                <div className="col-span-5 login-card">
                    <img src="/images/ats_pro_logo.png" alt="ats logo" className='login-logo-img self-center' />
                    <div>
                        <div className='mt-30'>
                            <Controller
                                name='username'
                                control={control}
                                rules={{ required: t("usernameValidationErrorMessage") }}
                                render={({ field }) => <Input {...field} placeholder={t("username")} className={errors.username ? 'border-red-500' : null} />}
                            />
                            {errors.username && <span className='error-message'>{errors.username.message}</span>}
                        </div>
                        <div className='mt-30 mb-20'>
                            <Controller
                                name='password'
                                control={control}
                                rules={{ required: t("passwordValidationErrorMessage") }}
                                render={({ field }) => <Input {...field} placeholder={t("password")} type='password' className={errors.username ? 'border-red-500' : null} />}
                            />
                            {errors.password && <span className='error-message'>{errors.password.message}</span>}
                        </div>
                        <div className='flex justify-end mb-20'>
                            <Link to={''} className='login-forget-link'>{t("forgotPassword")}</Link>
                        </div>
                        <Button type="submit" onClick={handleSubmit(onSubmit)} className='login-btn btn mt-6'>{isLoading ? <Spin className='text-white' /> : t("login")}</Button>
                    </div>
                </div>
                <div className='login-bg-image col-span-7'>
                    <div className="bg-overlay"></div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;


// password pattern --> pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
// username pattern --> pattern: /^[a-zA-Z0-9_]+$/