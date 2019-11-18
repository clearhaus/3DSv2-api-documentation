.. _examples:

########
Examples
########

Performing an authentication
----------------------------

1. Use the :ref:`preauth-endpoint` call to determine 3-D Secure version.
2. Perform an authentication using the :ref:`auth-endpoint` call.
3. If ``transStatus`` is ``C``, perform a :ref:`3ds_challenge_flow` on the cardholder device.
4. Retrieve values from :ref:`postauth-endpoint` endpoint after
   challenge flow has completed.

/preauth input
==============

Example input:

.. code-block:: json
    :linenos:

    {
      "acctNumber": "4111111111111111"
    }

Example output:

.. code-block:: json
  :linenos:

    {
      "acsStartProtocolVersion": "2.1.0",
      "acsEndProtocolVersion": "2.2.0",
      "threeDSServerTransID": "d461f105-1792-407f-95ff-9a496fd918a9"
    }

******************
Card Verification:
******************

.. code-block:: bash

    APIKEY=********-****-****-****-************
    PAN=****************
    curl -H 'APIKey: $APIKEY' -d "{\"acctNumber\": \"$PAN\"}" \
         https://service.staging.3dsecure.io/preauth
