import { Controller, useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'
import { InputNumber } from 'antd'

const NumberInput = ({ name, checked, required }) => {
    const { control, setValue } = useFormContext()

    return (
        <Controller
            name={name}
            control={control}
            rules={{ required: required ? "Bu alan boş bırakılamaz!" : false }}
            render={({ field, fieldState }) => (
                <>
                    <InputNumber
                        {...field}
                        className={fieldState.error ? 'input-error w-full' : 'w-full'}
                        readOnly={checked}
                        onChange={(e) => {
                            field.onChange(e)
                            if (e === null) {
                                setValue(name, 0)
                            }
                        }}
                    />
                    {fieldState.error && <span style={{ color: 'red' }}>{fieldState.error.message}</span>}
                </>
            )}
        />
    )
}

NumberInput.propTypes = {
    name: PropTypes.string,
    checked: PropTypes.bool,
    required: PropTypes.bool,
}

export default NumberInput
