.. _3ds_decoupled_authentication:

Decoupled Authentication
=========================

There are four different authentication flows in the 3-D Secure protocol. The decoupled authentication
flow is one of them. The decoupled authentication flow is an asynchronous process.

The ACS can determine decoupled authentication fallback for an authentication transaction.
If a fallback is determined, `threeDSRequestorPriorAuthenticationInfo` is required.

The requestor can set the TTL for the transaction by setting the `threeDSRequestorDecMaxTime`.
The `threeDSRequestorDecMaxTime` accepts numeric values between `00001` and `10080` (7 days) which
determines the TTL in minutes.

The requestor shall use the `threeDSServerTransID` to retrieve the authentication value
by making a request towards the `/postauth` endpoint.
Once we receive the authentication value from the ACS, we will only store it for 20 minutes.
We therefore suggest that the requestor should poll the `/postauth` endpoint at least every 20 minutes.
The authentication value is deleted when the TTL has passed.

If the 3-D Secure Server has not received the RReq message the following response will be returned:

.. code-block:: json
   :linenos:
   :caption: Example RReq not received

   {
        "errorCode": "305",
        "errorComponent": "S",
        "errorDescription": "No RReq has been received",
        "errorDetail": "No response from directory server yet",
        "messageType": "Erro",
        "messageVersion": "2.2.0",
        "threeDSServerTransID": "8700f0ef-0e96-471c-b107-1d2534f3f5a5"
   }   


Decoupled authentication flow example
**************************************

The following examples show AReq and ARes messages for a decoupled authentication flow.

.. code-block:: json
   :linenos:
   :caption: Example AReq, valid for 2.2.0.

   {
        "acctNumber": "3000100811112083",
        "cardExpiryDate": "2410",
        "acquirerBIN": "868491",
        "acquirerMerchantID": "mGm6AJZ1YotkJJmOk0fx",
        "mcc": "5411",
        "merchantCountryCode": "840",
        "merchantName": "Dummy Merchant",
        "threeDSRequestorDecReqInd": "Y",
        "threeDSRequestorDecMaxTime": "00001",
        "messageType": "AReq",
        "messageVersion": "2.2.0",
        "messageCategory": "01",
        "deviceChannel": "02",
        "transType": "01",
        "threeDSRequestorAuthenticationInd": "01",
        "threeDSRequestorID": "az0123456789",
        "threeDSRequestorName": "Example Requestor name",
        "threeDSRequestorURL": "https://threedsrequestor.adomainname.net",
        "purchaseAmount": "101",
        "purchaseCurrency": "840",
        "purchaseExponent": "2",
        "cardholderName": "Cardholder Name",
        "email": "example@example.com",
        "mobilePhone": {
          "cc": "123",
          "subscriber": "123456789"
        },
        "billAddrCity": "Bill City Name",
        "billAddrCountry": "840",
        "billAddrLine1": "Bill Address Line 1",
        "billAddrPostCode": "Bill Post Code",
        "billAddrState": "CO",
        "shipAddrCity": "Ship City Name",
        "shipAddrCountry": "840",
        "shipAddrLine1": "Ship Address Line 1",
        "shipAddrPostCode": "Ship Post Code",
        "shipAddrState": "CO"
    }


.. code-block:: json
   :linenos:
   :caption: Example ARes, valid for 2.2.0.

   {
        "acsChallengeMandated": "Y",
        "acsDecConInd": "Y",
        "acsOperatorID": "3dsecureio-standin-acs",
        "acsReferenceNumber": "3dsecureio-standin-acs",
        "acsTransID": "fb95703f-92e7-4278-a20c-62b9a9200e84",
        "authenticationType": "04",
        "cardholderInfo": "01",
        "dsReferenceNumber": "3dsecureio-standin-ds",
        "dsTransID": "87cbe14f-5960-4a01-a0bb-ae2c9871804a",
        "messageType": "ARes",
        "messageVersion": "2.2.0",
        "threeDSServerTransID": "5a8007b9-6d26-49cf-a371-3f722bba4ffc",
        "transStatus": "D"
    }

.. code-block:: json
   :linenos:
   :caption: Example RReq, valid for 2.2.0.

   {
        "acsTransID": "fb95703f-92e7-4278-a20c-62b9a9200e84",
        "authenticationType": "04",
        "authenticationValue": "s3xYIbbZVSakGpUEaAtOfIt2Ohs=",
        "dsTransID": "87cbe14f-5960-4a01-a0bb-ae2c9871804a",
        "eci": "05",
        "interactionCounter": "00",
        "messageCategory": "01",
        "messageType": "RReq",
        "messageVersion": "2.2.0",
        "threeDSServerTransID": "5a8007b9-6d26-49cf-a371-3f722bba4ffc",
        "transStatus": "Y"
   }
