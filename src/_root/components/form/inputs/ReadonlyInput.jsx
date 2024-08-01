import { Controller, useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'
import { Input } from 'antd'

const ReadonlyInput = ({ name, checked }) => {
    const { control } = useFormContext()

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Input
                    {...field}
                    readOnly={checked}
                />
            )}
        />
    )
}

ReadonlyInput.propTypes = {
    name: PropTypes.string,
    checked: PropTypes.bool,
}

export default ReadonlyInput
