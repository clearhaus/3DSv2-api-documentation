.. _postauth-usage:

##################
/postauth endpoint
##################

The ``/postauth`` endpoint is used to fetch the results of a challenge flow.

************
Request flow
************

This near-pseudocode describes the flow your code should perform.

1. Generate the input as described in the reference (:ref:`2.1.0
   <postauth-input-210>`, :ref:`2.2.0 <postauth-input-220>`).

   .. code-block:: json
      :caption: Example /postauth input body

      {
        "threeDSServerTransID": "51d84cdf-73d9-4610-8b4c-7c6395fee0f0"
      }


2. Send the request to the 3-D Secure Server. Consult the :ref:`requests guide
   <requests>` for information about how to make requests.
   A simple request performed using cURL:

   .. code-block:: bash
       :caption: /postauth request example using cURL

       APIKEY=********-****-****-****-************
       curl -H "APIKey: $APIKEY" \
            -H 'Content-Type: application/json; charset=utf-8' \
            -d @input.json \
               https://service.sandbox.3dsecure.io/postauth

3. If the returned JSON has ``"messageType": "Erro"`` or the HTTP response code
   is not ``200``, then the request failed.

   Note that JSON is returned even if the HTTP status code is not ``200``, in
   all but the rarest cases.

See the reference (:ref:`2.1.0 <postauth-response-210>`, :ref:`2.2.0
<postauth-response-220>`, :ref:`2.3.1 <postauth-response-231>`) for the values returned.

.. note::
  The 3-D Secure Server keeps the result for 20 minutes after it receives it,
  and for 5 minutes after each ``/postauth`` call that returns it.

  Until the result has been received, the endpoint returns HTTP status ``200``
  with the error below. Call it again later.

  .. code-block:: json
     :caption: Result not received yet.

     {
       "errorCode": "305",
       "errorComponent": "S",
       "errorDescription": "No RReq has been received",
       "errorDetail": "No response from directory server yet",
       "messageType": "Erro",
       "messageVersion": "2.2.0",
       "threeDSServerTransID": "4593b54f-692d-4d83-86ce-b74c4c23072c"
     }

  If no result arrives, the transaction expires 20 minutes after the
  ``/auth`` call for message version ``2.1.0``. For ``2.2.0`` and ``2.3.1`` it
  expires after ``threeDSRequestorDecMaxTime`` plus 60 minutes, or after 60
  minutes if that is not set.

  Once the result or the transaction has expired, or for an unknown
  ``threeDSServerTransID``, the endpoint returns HTTP status ``404`` with the
  error below.

  .. code-block:: json
     :caption: Authentication response after timeout.

     {
       "errorCode": "203",
       "errorComponent": "S",
       "errorDescription": "Unknown threeDSServerTransID",
       "errorDetail": "RReq has expired, was never received or invalid threeDSServerTransID",
       "messageType": "Erro",
       "messageVersion": "2.2.0",
       "threeDSServerTransID": "33eaca9c-5aff-41d9-ad75-a2cde347be2a"
     }

  On a temporary system error the endpoint returns HTTP status ``500`` with
  ``errorCode`` ``403`` and a ``Retry-After`` header in seconds. Retry after
  that.
