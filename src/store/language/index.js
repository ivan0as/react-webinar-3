import { ru, eng } from "../../language";
import StoreModule from "../module";

class Language extends StoreModule {

    initState() {
        return {
            language: {
                language: 'ru',
                text: {
                    ...ru
                }
            }
        }
    };

    languageSwitcher() {
        let newLanguage = this.getState().language

        if (this.getState().language.language === 'ru') {
            this.setState({
            ...this.getState(),
            language: {
                language: 'eng',
                text: {
                    ...eng
                }
            }
            }, 'Подгрузка языка');
        } else {
            this.setState({
            ...this.getState(),
            language: {
                language: 'ru',
                text: {
                    ...ru
                }
            }
            }, 'Подгрузка языка');
        }
    };
}

export default Language;