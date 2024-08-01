import { Alert } from 'antd'

const ErrorAlert = () => {
    return (
        <Alert
            message="Error"
            description="This is an error message about copywriting."
            type="error"
            showIcon
            closable
            style={{ position: "fixed", top: "20px", right: "20px", zIndex: "2000" }}
        />
    )
}

export default ErrorAlert
