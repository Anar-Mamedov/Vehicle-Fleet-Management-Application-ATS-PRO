import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { CodeControlByIdService } from '../../../../api/services/code/services';

const CodeControl = ({ name, codeName, id, checked, required }) => {
    const [data, setData] = useState([]);
    const { setValue, watch, control } = useFormContext();

    const handleClick = () => {
        CodeControlByIdService(id).then(res => {
            setData(res.data);
        });
    };

    return (
        <Controller
            name={codeName}
            control={control}
            rules={{ required: required ? "Bu alan boş bırakılamaz!" : false }}
            render={({ field, fieldState }) => (
                <>
                    <Select
                        {...field}
                        showSearch
                        allowClear
                        optionFilterProp="children"
                        disabled={checked}
                        className={fieldState.error ? 'input-error' : ''}
                        filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label.toLowerCase() ?? '').localeCompare((optionB?.label.toLowerCase() ?? ''))
                        }
                        options={data.map((item) => ({
                            label: item.codeText,
                            value: item.siraNo,
                        }))}
                        value={watch(name)}
                        onClick={handleClick}
                        onChange={e => {
                            field.onChange(e);
                            if (e === undefined) {
                                const selectedOption = data.find(option => option.siraNo === e);
                                if (!selectedOption) {
                                    setValue(name, '');
                                }
                            } else {
                                const selectedOption = data.find(option => option.siraNo === e);
                                if (selectedOption) {
                                    setValue(name, selectedOption.codeText);
                                }
                            }
                        }}
                    />
                    {fieldState.error && <span style={{ color: 'red' }}>{fieldState.error.message}</span>}
                </>
            )}
        />
    );
};

CodeControl.propTypes = {
    name: PropTypes.string,
    codeName: PropTypes.string,
    id: PropTypes.number,
    checked: PropTypes.bool,
    required: PropTypes.bool,
};

export default CodeControl;
