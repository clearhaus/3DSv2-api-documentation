.. _preauth-usage:

#################
/preauth endpoint
#################

The ``/preauth`` endpoint is used for two things:

- Determine if card number is enrolled for 3-D Secure v2.
  This can be used to decide if you should fall back to using 3-D Secure v1.0.2
- 3DSMethod invocation information

************
Request flow
************

This near-pseudocode describes the flow your code should perform.

 .. TODO: Add a link to 3dsmethod invocation

1. Generate the input as described in the reference (:ref:`2.1.0
   <preauth-input-210>`, :ref:`2.2.0 <preauth-input-220>`, :ref:`2.3.1 <preauth-input-2311>`).
   A request might look like:

   .. code-block:: json
       :caption: /preauth example input, same for all versions

       {
         "acctNumber": "4111111111111111",
         "ds": "visa",
         "maxMessageVersion": "2.3.1", // Optional: defaults to 2.2.0
       }

2. Send the request to the 3-D Secure Server. Consult the :ref:`requests guide
   <requests>` for information about how to make requests.
   A simple request performed using cURL:

   .. code-block:: bash
       :caption: /preauth request example using cURL

       APIKEY=********-****-****-****-************
       PAN=9171598723598723
       curl -H "APIKey: $APIKEY" \
            -H 'Content-Type: application/json; charset=utf-8' \
            -d "{\"acctNumber\": \"$PAN\"}" \
               https://service.sandbox.3dsecure.io/preauth

3. If the returned JSON has ``"messageType": "Erro"`` or the HTTP response code
   is not ``200``, then the request failed.
   Look e.g. at the :ref:`not_enrolled` section. You should terminate the
   authentication.

   Note that JSON is returned even if the HTTP status code is not ``200``, in
   all but the rarest cases.

.. TODO:

   There should likely be a section about how to properly terminate an
   authentication, as well as how to handle retries.

4. If the authentication is done from a cardholder browser:

   1. If ``threeDSMethodURL`` is included in the response, invoke the
      :ref:`3DS Method <3ds_method>`.

   2. Use the ``threeDSServerTransID`` in the ``/auth`` request.


*************
Response Data
*************

Successful requests will have HTTP response code 200.

.. _preauth-success:

Success
=======

If the card number is enrolled for 3-D Secure v2, the response might look
something like:

.. code-block:: json
  :caption: /preauth 2.2.0 example response
  :linenos:

    {
      "acsStartProtocolVersion": "2.1.0",
      "acsEndProtocolVersion": "2.2.0",
      "dsStartProtocolVersion": "2.1.0",
      "dsEndProtocolVersion": "2.2.0",
      "threeDSServerTransID": "d461f105-1792-407f-95ff-9a496fd918a9",
      "threeDSMethodURL": "https://acs.tld/3dsmethod"
    }

If ``maxMessageVersion`` is ``2.3.1``, the response will look like this:

.. code-block:: json
  :caption: /preauth 2.3.1 example response
  :linenos:

    {
      "dsProtocolVersions": [
        "2.2.0",
        "2.3.1"
      ],
      "acsProtocolVersions": [
        {
          "version": "2.2.0",
          "acsInfoInd": [
            "01",
            "02"
          ],
          "threeDSMethodURL": "https://www.acs.com/script1",
          "supportedMsgExt": [
            {
              "id": "A000000802-001",
              "version": "2.0"
            },
            {
              "id": "A000000802-004",
              "version": "1.0"
            }
          ]
        },
        {
          "version": "2.3.1",
          "acsInfoInd": [
            "01",
            "02",
            "03",
            "04",
            "81"
          ],
          "threeDSMethodURL": "https://www.acs.com/script3"
        }
      ]
    }

.. note::

  When using ``"deviceChannel": "02"`` (BRW) you **must** use the same
  ``threeDSServerTransID`` returned above for the ``/auth`` call.

  The ``threeDSServerTransID`` expires after 80 seconds.

.. _not_enrolled:

BIN not enrolled error
======================

When the card number is not enrolled by a known card scheme, the response will
look like:

.. code-block:: json
  :linenos:

  {
    "messageType": "Erro",
    "errorCode": "305",
    "errorComponent": "S",
    "errorDescription": "Unknown BIN",
    "errorDetail": "No CRD found, card with BIN ****** is not enrolled with any known DS",
    "messageVersion": "2.2.0"
  }

As this is the only time this combination is returned from this endpoint, you
can reliably catch this by checking that:

a. ``messageType`` is ``Erro``
b. ``errorCode`` is ``305``

.. note::

  This error would mean you can/should retry with 3-D Secure version 1.

Other errors
============

Any others errors are caught by checking if ``messageType`` is ``Erro``.

.. TODO

   Add section about errors.

****************************
General endpoint information
****************************

1. This endpoint relies on cached data and should respond "instantly".
2. The cached data is refreshed every few hours and should always be up to date.
3. This endpoint does not incur any fees.
