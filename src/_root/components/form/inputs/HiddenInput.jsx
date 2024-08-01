import { Controller, useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'
import { Input } from 'antd'

const HiddenInput = ({ name }) => {
    const { control } = useFormContext()

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Input
                    {...field}  hidden
                  
                />
            )}
        />
    )
}

HiddenInput.propTypes = {
    name: PropTypes.string,
}

export default HiddenInput
