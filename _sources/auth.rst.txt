.. _auth-usage:

##############
/auth endpoint
##############

The ``/auth`` endpoint is used to provide the issuer with data for performing
an authentication. The resulting Authentication Response (``ARes``) can either
be the final message due to a frictionless flow or lead to a challenge flow.

Please note that only ASCII characters are allowed, as described in
:ref:`requests`.

************
Request flow
************

This near-pseudocode describes the flow your code should perform.

.. TODO

   Add compliance information for Mastercard/Visa requests.

1. Generate the input as described in the reference (:ref:`2.1.0
   <auth-input-210>`, :ref:`2.2.0 <auth-input-220>`).

2. Send the request to the 3-D Secure Server. Consult the :ref:`requests guide
   <requests>` for information about how to make requests.
   A simple request performed using cURL:

   .. code-block:: bash
       :caption: /auth request example using cURL

       # First, add request json to file 'input.json'
       APIKEY=********-****-****-****-************
       curl -H "APIKey: $APIKEY" \
            -H 'Content-Type: application/json; charset=utf-8' \
            -d @input.json \
               https://service.sandbox.3dsecure.io/auth

3. If the returned JSON has ``"messageType": "Erro"`` or the HTTP response code
   is not ``200``, then the request failed.

   Note that JSON is returned even if the HTTP status code is not ``200``, in
   all but the rarest cases.

4. If ``transStatus`` is ``C``, :ref:`perform a challenge <3ds_challenge_flow>`
   on the cardholder device.

   Otherwise, the authentication has been completed.

*************
Response Data
*************

Success
=======

A successful authentication request contains data as described in the reference
(:ref:`2.1.0 <auth-response-210>`, :ref:`2.2.0 <auth-response-220>`).
The transaction status is contained in the ``transStatus`` and
``transStatusReason`` values.

This is an example of a successful (frictionless) authentication:

.. code-block:: json
   :caption: Example of an Authentication frictionless response (ARes)
   :linenos:

   {
     "acsOperatorID": "3dsecure.io-standin-acs",
     "acsReferenceNumber": "3dsecure.io-standin-acs",
     "acsTransID": "43163cd0-c849-4924-82c1-7bec32b94881",
     "authenticationValue": "mK225wGt2bLnnLB0UlRky0oHLnU=",
     "dsReferenceNumber": "3dsecure.io-standin-ds",
     "dsTransID": "1cf815e5-cc85-436f-8e13-9f5e5aea731f",
     "eci": "05",
     "messageType": "ARes",
     "messageVersion": "2.1.0",
     "threeDSServerTransID": "3f1ed47a-2edc-4b0e-a4cf-bdb0f65d48c6",
     "transStatus": "Y"
   }

.. code-block:: json
   :caption: Example of an Authentication challenge response (ARes)
   :linenos:

   {
     "acsChallengeMandated": "N",
     "acsOperatorID": "3dsecureio-standin-acs",
     "acsReferenceNumber": "3dsecureio-standin-acs",
     "acsTransID": "b85d3eb5-d2d2-45af-bc1b-6188021ae602",
     "acsURL": "https://acs.sandbox.3dsecure.io/browser/challenge/manual",
     "authenticationType": "01",
     "dsReferenceNumber": "3dsecureio-standin-ds",
     "dsTransID": "496af67a-56ed-4fd3-bbcf-690b0df93c3d",
     "messageType": "ARes",
     "messageVersion": "2.1.0",
     "threeDSServerTransID": "218565e2-0cae-4236-868e-09168275c8c6",
     "transStatus": "C"
   }


To check if a transaction was successful:

1. Parse as JSON
2. Check that ``messageType`` is ``ARes``

Note that a 3-D Secure Server transaction is considered successful even if
``transStatus`` is ``N``. There is a difference between an *authentication
failure* and a *transaction failure*. A failed authentication ``transStatus:
N`` is a successful 3-D Secure transaction.

If ``messageType`` is ``ARes`` and ``transStatus`` is ``C``, perform a
:ref:`challenge flow <3ds_challenge_flow>`.


Errors
======

In all but the rarest cases an ``Erro`` message is returned on an error.

****************************
General endpoint information
****************************

1. We expect an average upstream request time of about 2 seconds, so should
   you.
2. The request will time out after 10 seconds, after which integrators will
   receive an error. The error returned will be

   .. code-block:: json
      :caption: Directory Server timeout response
      :linenos:

      {
        "errorCode": "405",
        "errorComponent": "S",
        "errorDescription": "Unable to contact Directory Server",
        "errorDetail": "Connection timeout",
        "errorMessageType": "AReq",
        "messageType": "Erro",
        "messageVersion": "2.1.0",
        "threeDSServerTransID": "2401433d-68be-4820-b1e7-5aa3b44dfa5a"
      }
