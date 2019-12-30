.. _auth-usage:

##############
/auth endpoint
##############

The ``/auth`` call is used to initiate a 3-D Secure v2 authentication.

************
Request flow
************

This near-pseudocode describes the flow your code should perform.

.. TODO

   Add compliance information for Mastercard/Visa requests.

1. Generate the input as described in :ref:`the reference <auth-input>`.

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

A successful authentication request contains data as described in :ref:`the
reference <auth-response>`.
The transaction status is contained in the ``transStatus`` and
``transStatusReason`` values.

This is an example of a successful (frictionless) authentication:

.. code-block:: json
  :caption: Examples Authentication Response (ARes)
  :linenos:

  {
    "acsOperatorID": "3dsecure.io-standin-acs",
    "acsReferenceNumber": "3dsecure.io-standin-acs",
    "acsTransID": "43163cd0-c849-4924-82c1-7bec32b94881",
    "authenticationValue": "1qjyGT2+HSxGuPg9YrCLSXc/J0s",
    "dsReferenceNumber": "3dsecure.io-standin-ds",
    "dsTransID": "1cf815e5-cc85-436f-8e13-9f5e5aea731f",
    "eci": "05",
    "messageType": "ARes",
    "messageVersion": "2.1.0",
    "threeDSServerTransID": "3f1ed47a-2edc-4b0e-a4cf-bdb0f65d48c6",
    "transStatus": "Y"
  }


To check if a transaction was successful:

1. Parse as JSON
2. Check that ``messageType`` is ``ARes``

Please note that a 3-D Secure Server transaction is considered successful even if
``transStatus`` is ``N``. There is a difference between an *authentication
failure* and a *transaction failure*.

Failure
=======

In all but the rarest cases an ``Erro`` message is returned on an error.

****************************
General endpoint information
****************************

1. We expect an average upstream request time of about 2 seconds, so should
   you.
2. The request will time out after 10 seconds, after which integrators will
   receive an error.
