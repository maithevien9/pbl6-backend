/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/no-use-before-define */
import https from 'https';
import { uuid } from 'uuidv4';
import crypto from 'crypto';
import { Bill } from '../models';

import configs from '../configs';

const {
  MOMO_PATH,
  MOMO_PARTNER_CODE,
  MOMO_ACCESS_KEY,
  MOMO_SECRET_KEY,
  MOMO_RETURN_URL,
  MOMO_REQUEST_TYPE,
  MOMO_HOST_NAME,
  MOMO_NOTIFY_URL,
  MOMO_PORT,
} = configs;

const handlePayMoMo = (id: string): Promise<unknown> => {
  const partnerCode = MOMO_PARTNER_CODE;
  const accessKey = MOMO_ACCESS_KEY;
  const serectkey = MOMO_SECRET_KEY;
  const returnUrl = MOMO_RETURN_URL;
  const notifyurl = MOMO_NOTIFY_URL;
  const requestType = MOMO_REQUEST_TYPE;
  const orderId = uuid();
  const requestId = uuid();
  const orderInfo = 'Pay with MoMo';
  const amount = '1000';
  const extraData = 'merchantName=;merchantId=';

  const rawSignature =
    'partnerCode=' +
    partnerCode +
    '&accessKey=' +
    accessKey +
    '&requestId=' +
    requestId +
    '&amount=' +
    amount +
    '&orderId=' +
    orderId +
    '&orderInfo=' +
    orderInfo +
    '&returnUrl=' +
    returnUrl +
    '&notifyUrl=' +
    notifyurl +
    '&extraData=' +
    extraData;

  const signature = crypto
    .createHmac('sha256', serectkey)
    .update(rawSignature)
    .digest('hex');

  const body = JSON.stringify({
    partnerCode: partnerCode,
    accessKey: accessKey,
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    returnUrl: returnUrl,
    notifyUrl: notifyurl,
    extraData: extraData,
    requestType: requestType,
    signature: signature,
  });

  const options = {
    hostname: MOMO_HOST_NAME,
    path: MOMO_PATH,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
    },
  };

  return new Promise((resolve) => {
    const requestMoMoServer = (res: any) => {
      res.setEncoding('utf8');
      res.on('data', onData);
    };

    const onData = async (body: string) => {
      const payUrl = JSON.parse(body).payUrl;
      await Bill.create({ requestId, amount, orderId, order: id });
      resolve(payUrl);
    };

    const req = https.request(options, requestMoMoServer);
    req.write(body);
    req.end();
  });
};

export default handlePayMoMo;
