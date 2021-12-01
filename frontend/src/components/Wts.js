import React from 'react'
import WhatsAppWidget from 'react-whatsapp-widget'
import 'react-whatsapp-widget/dist/index.css'
import{ useTranslation } from 'react-i18next'

function Wts() {

    const {t, i18n} = useTranslation() 

    return (
          <div id="wtsw">
              <WhatsAppWidget 
                textReplyTime={t('wtsResponse')} 
                message={t('wtsMessage')}
                companyName={t('wtsSupport')}
                sendButton={t('wtsSend')}
                phoneNumber='905550071262' 
                /> 
        </div>
    )
}

export default Wts
