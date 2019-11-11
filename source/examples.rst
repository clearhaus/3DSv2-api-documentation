.. _examples:

########
Examples
########

/preauth input
--------------

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

_Note:_ This _must_ be followed up with a [3DS method
invocation](#3ds-method-invocation) if `threeDSMethodURL` is included.

******************
Card Verification:
******************

.. code-block:: bash

    APIKEY=********-****-****-****-************
    PAN=****************
    curl -H 'APIKey: $APIKEY' -d "{\"acctNumber\": \"$PAN\"}" \
         https://service.staging.3dsecure.io/preauth
