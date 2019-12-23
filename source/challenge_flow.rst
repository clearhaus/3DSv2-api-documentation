.. _3ds_challenge_flow:

Challenge flow
==============

Browser Challenge
-----------------

Create a CReq :ref:`as decribed <creq-format>`, using the transaction ID's
received in the :ref:`authentication response <auth-response>`.

Add an iframe to the users browser, either statically or using javascript.

.. code-block:: javascript
   :linenos:

   let displayBox = document.getElementById('displayBox');

   let iframe = document.createElement('iframe');
   iframe.name = "challengeIframe";

   displayBox.appendChild(iframe);

Add a form containing the appropriate input elements:

.. code-block:: html
   :linenos:

   <form class="" id="challengeForm">
     <input type="hidden"
      name="creq"
      id="creq"/>

     <!-- This input can carry up to 1024 Base64URL encoded characters -->
     <input type="hidden"
      name="threeDSSessionData"
      id="threeDSSessionData"/>
   </form>

Fill out the form inputs and submit them to the ACS URL in the iframe.

.. code-block:: javascript
   :linenos:

   // Generate the data object
   let creq = JSON.stringify({
     // Browser will be redirected
     notificationURL: "http://localhost:8270/missing",
     threeDSServerTransID: "ce2809be-b5ee-425b-9382-76a72a4f495b",
     acsTransID: "7b26d24f-4275-4044-97ee-4564c1b88fde",
     dsTransID: "aacbd4f9-2e1e-4052-b9d8-412618c13285",
     messageVersion: "2.1.0",
     messageType: "CReq",
     challengeWindowSize: "01"
   });

   // Get a reference to the form
   let form = document.getElementById('challengeForm');

   // Set the form input value to the object,
   // base64url-encode the data.
   document.getElementById('creq').value =
    btoa(creq);

   // Fill out the form information and submit.
   form.action = '<acsURL>'; // The acsURL from the ARes.
   form.target = 'challengeIframe';
   form.method = 'post';
   form.submit();

.. TODO: Describe the callback.

After the challenge has finished, the browser will be redirected to the
``notificationURL``, where it will POST two values, the ``threeDSSessionData``
that was supplied before, as well as a "final" challenge result ``CRes`` value.
The final CRes looks something like this:


.. code-block:: json
   :linenos:

   {
     "acsTransID": "5af5e779-4d44-4201-a2bf-4890eb9e0ba7",
     "challengeCompletionIndicator": "Y",
     "messageType": "CRes",
     "messageVersion": "2.1.0",
     "threeDSServerTransID": "c1110574-2c6a-4ab8-a937-ef8d5a10ec39",
     "transStatus": "Y"
   }

Here ``transStatus`` will be either ``Y`` or ``N``, if the value is ``Y`` you
can use the :ref:`postauth-usage` to fetch the results of the challenge.

SDK Challenge
-------------

The challenge should be handled by the SDK, please refer to the SDK
documentation.
