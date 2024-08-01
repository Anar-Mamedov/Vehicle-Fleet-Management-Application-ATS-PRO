import { Controller, useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import 'dayjs/locale/tr'
import tr_TR from 'antd/lib/locale/tr_TR'
import { ConfigProvider, DatePicker } from 'antd'

dayjs.locale('tr')

const ReadonlyDateForCheck = ({ name, checked }) => {
    const { control } = useFormContext()
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <ConfigProvider locale={tr_TR}>
                    <DatePicker {...field} placeholder="" locale={dayjs.locale("tr")} format="DD.MM.YYYY" disabled={checked} />
                </ConfigProvider>
            )}
        />
    )
}

ReadonlyDateForCheck.propTypes = {
    name: PropTypes.string,
    checked: PropTypes.bool,
}

export default ReadonlyDateForCheck
