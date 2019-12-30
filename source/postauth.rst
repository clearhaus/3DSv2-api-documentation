.. _postauth-usage:

##################
/postauth endpoint
##################

The ``/postauth`` is used to fetch the results of a challenge flow.

************
Request flow
************

This near-pseudocode describes the flow your code should perform.

1. Generate the input as described in :ref:`the reference <postauth-input>`.

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

See :ref:`the reference <postauth-input>` for the values returned.

.. note::
  The authentication cache expires 300 seconds after the 3-D Secure Server receives it
  from the card scheme, it must be fetched before expiry.