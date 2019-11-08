.. _examples:

########
Examples
########

******************
Card Verification:
******************

.. code-block:: bash

    APIKEY=********-****-****-****-************
    PAN=****************
    curl -H 'APIKey: $APIKEY' -d "{\"acctNumber\": \"$PAN\"}" \
         https://service.staging.3dsecure.io/preauth
