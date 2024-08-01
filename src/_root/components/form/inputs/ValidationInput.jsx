import { Controller, useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'
import { Input } from 'antd'

const ValidationInput = ({ name, style }) => {
    const { control } = useFormContext()

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Input
                    {...field}
                    style={style}
                    onChange={(e) => {
                        field.onChange(e.target.value)
                    }}
                />
            )}
        />
    )
}

ValidationInput.propTypes = {
    name: PropTypes.string,
    style: PropTypes.object,
}

export default ValidationInput
