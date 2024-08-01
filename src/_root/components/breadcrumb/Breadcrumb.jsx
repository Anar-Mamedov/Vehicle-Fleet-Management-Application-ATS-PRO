import PropTypes from 'prop-types'
import { Breadcrumb } from 'antd'

const BreadcrumbComp = ({ items }) => {
    return (
        <Breadcrumb
            items={items}
        />
    )
}

BreadcrumbComp.propTypes ={
    items: PropTypes.array
}

export default BreadcrumbComp
