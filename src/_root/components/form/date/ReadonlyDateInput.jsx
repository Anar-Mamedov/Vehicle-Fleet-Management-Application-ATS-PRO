import { Controller, useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import 'dayjs/locale/tr'
import tr_TR from 'antd/lib/locale/tr_TR'
import { ConfigProvider, DatePicker } from 'antd'


dayjs.locale('tr')

const ReadonlyDateInput = ({ name }) => {
    const { control } = useFormContext()
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <ConfigProvider locale={tr_TR}>
                    <DatePicker {...field} placeholder="" locale={dayjs.locale("tr")} format="DD.MM.YYYY" readOnly />
                </ConfigProvider>
            )}
        />
    )
}

ReadonlyDateInput.propTypes = {
    name: PropTypes.string,
}

export default ReadonlyDateInput
