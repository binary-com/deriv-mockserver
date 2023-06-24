import { v4 as uuidv4 } from 'uuid';
import { GenericRequest, InterceptedAPIHandler } from '../types/base.type';

export const getSettings = ({ data, ws }: InterceptedAPIHandler) => {
    const { req_id } = data as GenericRequest;

    const response = {
        echo_req: {
            get_settings: 1,
            req_id,
        },
        get_settings: {
            account_opening_reason: 'Income Earning',
            address_city: 'Got Em',
            address_line_1: 'Deez',
            address_line_2: 'Nats',
            address_postcode: '3322211',
            address_state: 'BA',
            allow_copiers: 0,
            citizen: 'id',
            client_tnc_status: 'Version 4.2.0 2020-08-07',
            country: 'Indonesia',
            country_code: 'id',
            date_of_birth: 946944000,
            dxtrade_user_exception: 0,
            email: 'test@test.com',
            email_consent: 0,
            feature_flag: {
                wallet: 0,
            },
            first_name: 'Deez',
            has_secret_answer: 1,
            immutable_fields: ['place_of_birth', 'residence'],
            is_authenticated_payment_agent: 0,
            last_name: 'Nats',
            non_pep_declaration: 1,
            phone: '+62122211222',
            place_of_birth: 'id',
            preferred_language: 'EN',
            request_professional_status: 0,
            residence: 'Indonesia',
            salutation: '',
            tax_identification_number: '121292912920111',
            tax_residence: 'id',
            trading_hub: 1,
            user_hash: uuidv4(),
        },
        msg_type: 'get_settings',
        req_id,
    };

    return ws.send(JSON.stringify(response));
};
