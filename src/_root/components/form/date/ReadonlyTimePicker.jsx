import { Controller, useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'
import { TimePicker } from 'antd'

const ReadonlyTimePicker = ({ name }) => {
    const { control } = useFormContext()

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <TimePicker {...field} placeholder="" format="HH:mm:ss" readOnly/>
            )}
        />
    )
}

ReadonlyTimePicker.propTypes = {
    name: PropTypes.string,
}

export default ReadonlyTimePicker
