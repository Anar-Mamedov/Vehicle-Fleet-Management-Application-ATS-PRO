import { Alert } from 'antd'

const SuccessAlert = () => {
    return (
        <Alert
            message="Success Tips"
            description="Detailed description and advice about successful copywriting."
            type="success"
            showIcon
            closable
            style={{position: "fixed", top: "20px", right: "20px", zIndex: "2000"}}
        />
    )
}

export default SuccessAlert
