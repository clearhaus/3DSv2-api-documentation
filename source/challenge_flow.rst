.. _3ds_challenge_flow:

Challenge flow
==============

The point of the 3-D Secure flow is to verify that the true cardholder is a
part of the authorization. The challenge flow is used to present a way of
authenticating the cardholder using e.g. OTP or a federated identification
method.

Browser Challenge
-----------------

A challenge in the browser is performed either in an iframe or using the entire
browser window.

Initiate the challenge
**********************

Create a CReq :ref:`as described <creq-format>`, using the transaction ID's
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

     <!-- This input can carry up to 1024 Base64-URL encoded characters -->
     <input type="hidden"
      name="threeDSSessionData"
      id="threeDSSessionData"/>
   </form>

Fill out the form inputs and submit them to the ACS URL in the iframe.

.. code-block:: javascript
   :linenos:

   // Generate the data object
   let creq = JSON.stringify({
     threeDSServerTransID: "ce2809be-b5ee-425b-9382-76a72a4f495b",
     acsTransID: "7b26d24f-4275-4044-97ee-4564c1b88fde",
     messageVersion: "2.1.0",
     messageType: "CReq",
     challengeWindowSize: "01"
   });

   // Get a reference to the form
   let form = document.getElementById('challengeForm');

   // Set the form input value to the object,
   // base64url-encode the data.
   // Notice: You have to define base64url() yourself.
   document.getElementById('creq').value =
    base64url(creq);

   // Fill out the form information and submit.
   form.action = '<acsURL>'; // The acsURL from the ARes.
   form.target = 'challengeIframe';
   form.method = 'post';
   form.submit();


Receiving challenge results
***************************

After the challenge has finished, the iframe will POST to the `notification
URL`_. The body will contain ``threeDSSessionData`` as supplied in the
``CReq``, and the challenge result in the ``CRes``.

An example :ref:`challenge response <final_cres_210>` is:

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

Here ``transStatus`` will be either ``Y`` or ``N``. You can use the
:ref:`postauth-usage` to fetch the :ref:`results of the challenge <postauth-response>`.

Handling timeouts
*****************

1. You have 30 seconds from receiving the :ref:`authentication response <auth-response>` to start
   the challenge.
2. Each interaction in the challenge window has a 10 minute timeout. So the
   cardholder can take at least 10 minutes to complete the challenge.

SDK Challenge
-------------

The challenge should be handled by the SDK, please refer to the SDK
specification for further information.

.. _notification URL: reference.html#attr-AReq-notificationURL
