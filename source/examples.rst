.. _authentication_examples:

#######################
Authentication Examples
#######################

The 3DSv2 spec allows for a lot of flexibility. A complication of the interface
is that, the specification marks elements as required while card schemes have
their own rules.

On this page we will provide JSON examples with the minimum key set required by
all card schemes with dummy values.

To get more information on individual fields, consult the reference.

Basic Authentication Example
============================

.. code-block:: json
   :caption: Basic simple AReq example
   :linenos:

   {
     "acctNumber": "9244988785642183",
     "notificationURL": "https://3ds_callback.example.org/challenge/end",
     "threeDSCompInd": "Y",
     "threeDSRequestorURL": "https://threedsrequestor.example.org",
     "acquirerBIN": "438309",
     "acquirerMerchantID": "00002000000",
     "cardExpiryDate": "1910",
     "billAddrCity": "Bill City Name",
     "billAddrCountry": "840",
     "billAddrLine1": "Bill Address Line 1",
     "billAddrPostCode": "Bill Post Code",
     "billAddrState": "CO",
     "email": "example@example.com",
     "threeDSRequestorAuthenticationInd": "01",
     "cardholderName": "Cardholder Name",
     "deviceChannel": "02",
     "browserJavascriptEnabled": true,
     "browserAcceptHeader": "text/html,application/xhtml+xml,application/xml; q=0.9,*/*;q=0.8",
     "browserIP": "192.168.1.11",
     "browserJavaEnabled": true,
     "browserLanguage": "en",
     "browserColorDepth": "48",
     "browserScreenHeight": "400",
     "browserScreenWidth": "600",
     "browserTZ": "0",
     "browserUserAgent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0",
     "mcc": "5411",
     "merchantCountryCode": "840",
     "merchantName": "Dummy Merchant",
     "messageCategory": "01",
     "messageType": "AReq",
     "messageVersion": "2.1.0",
     "purchaseAmount": "101",
     "purchaseCurrency": "840",
     "purchaseExponent": "2",
     "purchaseDate": "20170316141312";
     "transType": "01"
   }
