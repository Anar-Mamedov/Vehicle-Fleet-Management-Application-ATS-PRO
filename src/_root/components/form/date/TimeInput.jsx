import { Controller, useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'
import { TimePicker } from 'antd'

const TimeInput = ({ name, readonly }) => {
    const { control } = useFormContext()

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <TimePicker {...field} placeholder="" format="HH:mm:ss" disabled={readonly}/>
            )}
        />
    )
}

TimeInput.propTypes = {
    name: PropTypes.string,
    readonly: PropTypes.bool,
}

export default TimeInput
