import { Button } from 'antd';
import i18n from '../../../utils/i18n';

const LanguageSelector = () => {
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('i18nextLng', lng)
        window.location.reload()
    }

    return (
        <>
            <Button onClick={() => changeLanguage('en')}>en</Button>
            <Button onClick={() => changeLanguage('tr')}>tr</Button>
            <Button onClick={() => changeLanguage('ru')}>ru</Button>
            <Button onClick={() => changeLanguage('az')}>az</Button>
        </>
    );
};

export default LanguageSelector