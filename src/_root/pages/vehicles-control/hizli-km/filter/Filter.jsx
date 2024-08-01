import { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { t } from "i18next";
import { SearchOutlined, CarryOutOutlined } from '@ant-design/icons'
import { IoIosRefresh, IoIosMore } from 'react-icons/io'
import { Button, Popconfirm, Popover, Select, TreeSelect } from 'antd'
import { CodeControlByIdService, CodeControlByUrlService } from '../../../../../api/services/code/services';

const convertToFormat = (data, parentId = 0) => {
  const result = []

  data.forEach(item => {
    if (item.anaLokasyonId === parentId) {
      const newItem = {
        value: item.lokasyonId,
        id: item.lokasyonId,
        title: item.lokasyonTanim,
        icon: <CarryOutOutlined />,
        children: convertToFormat(data, item.lokasyonId)
      };
      result.push(newItem);
    }
  });

  return result;
}

const Filter = ({ content, addKm, errorRows, validatedRows, setFilter, filter, getData, clear }) => {
  const [plaka, setPlaka] = useState([])
  const [location, setLocation] = useState([])
  const [code, setCode] = useState([])
  const [open, setOpen] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  }

  const handleClickPlaka = () => {
    CodeControlByUrlService("Vehicle/GetVehiclePlates").then(res => {
      setPlaka(res.data)
    })
  }
  const handleClickLocation = () => {
    CodeControlByUrlService("Location/GetLocationList").then(res => setLocation(res.data))
  }
  const handleClickCode = (id) => {
    setCode([])
    CodeControlByIdService(id).then(res => {
      setCode(res.data)
    })
  }

  useEffect(() => {
    if (errorRows.length > 0 || validatedRows.length === 0) {
      setIsDisabled(true)
    } else if (validatedRows.length > 0 && errorRows.length === 0) {
      setIsDisabled(false)
    }
  }, [errorRows, validatedRows])

  return (
    <div className='flex flex-col gap-1'>
      <div className="grid gap-1 align-center">
        <div className="col-span-2">
          <Select
            showSearch
            allowClear
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
            filterSort={(optionA, optionB) =>
              (optionA?.label.toLowerCase() ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={plaka.map((item) => ({
              label: item.plaka,
              value: item.aracId,
            }))}
            onClick={handleClickPlaka}
            onChange={e => {
              const selectedOption = plaka.find(item => item.aracId === e);
              const selectedLabel = selectedOption ? selectedOption.plaka : '';
              setFilter({ ...filter, plaka: selectedLabel });
            }}
            placeholder={t("plaka")}
            className='w-full'
          />
        </div>
        <div className="col-span-2">
          <Select
            showSearch
            allowClear
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
            filterSort={(optionA, optionB) =>
              (optionA?.label.toLowerCase() ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={code.map((item) => ({
              label: item.codeText,
              value: item.codeText,
            }))}
            onClick={() => handleClickCode("100")}
            onChange={e => {
              setFilter({ ...filter, aracTip: e })
            }}
            placeholder={t("aracTip")}
            className='w-full'
          />
        </div>
        <div className="col-span-2">
          <TreeSelect
            showSearch
            allowClear
            placeholder={t("lokasyon")}
            dropdownStyle={{
              maxHeight: 400,
              overflow: 'auto',
            }}
            className='w-full'
            treeLine={true}
            treeData={convertToFormat(location)}
            onClick={handleClickLocation}
            onChange={e => {
              const selectedOption = location.find(item => item.lokasyonId === e);
              const selectedLabel = selectedOption ? selectedOption.lokasyonTanim : '';
              setFilter({ ...filter, lokasyon: selectedLabel });
            }}
          />
        </div>
        <div className="col-span-2">
          <Select
            showSearch
            allowClear
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
            filterSort={(optionA, optionB) =>
              (optionA?.label.toLowerCase() ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={code.map((item) => ({
              label: item.codeText,
              value: item.codeText,
            }))}
            onClick={() => handleClickCode("200")}
            onChange={e => {
              setFilter({ ...filter, departman: e })
            }}
            placeholder={t("departman")}
            className='w-full'
          />
        </div>
        <div className="col-span-2 flex gap-1">
          <Button className="btn primary-btn" onClick={getData}>
            <SearchOutlined />
          </Button>
          <Button className="btn cancel-btn" onClick={clear}>
            <IoIosRefresh />
          </Button>
        </div>
        <div className="col-span-2 flex justify-self gap-1">
          <Popover
            placement="bottom"
            content={content}
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
          >
            <Button><IoIosMore /></Button>
          </Popover>

          <Popconfirm
            title={t("guncelle")}
            description={t("hizliKmGuncellemeSoru")}
            onConfirm={addKm}
            okText={t("ok")}
            cancelText={t("cancel")}
          >
            <Button className="btn primary-btn km-update" disabled={isDisabled}>{t("guncelle")}</Button>
          </Popconfirm>
        </div>
      </div>
    </div>
  )
}

Filter.propTypes = {
  content: PropTypes.node,
  addKm: PropTypes.func,
  errorRows: PropTypes.array,
  validatedRows: PropTypes.array,
  setFilter: PropTypes.func,
  filter: PropTypes.object,
  getData: PropTypes.func,
  clear: PropTypes.func
};

export default Filter
