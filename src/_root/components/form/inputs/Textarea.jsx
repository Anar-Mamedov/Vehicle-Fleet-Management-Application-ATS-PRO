import { Controller, useFormContext } from "react-hook-form"
import PropTypes from 'prop-types'
import TextArea from "antd/es/input/TextArea"


const Textarea = ({ name, checked }) => {
    const { control } = useFormContext()

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <TextArea {...field} readOnly={checked} onChange={(e => field.onChange(e.target.value))} />
            )}
        />
    )
}

Textarea.propTypes = {
    name: PropTypes.string,
    checked: PropTypes.bool,
}

export default Textarea
