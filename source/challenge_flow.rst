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

Create a challenge request (CReq: :ref:`2.1.0 <creq-format-210>`, :ref:`2.2.0
<creq-format-220>`), using the transaction ID's received in the ``/auth``
response (ref. :ref:`2.1.0 <auth-response-210>`, :ref:`2.1.0
<auth-response-220>`).

Add an iframe to the users browser, either statically or using JavaScript.

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
   // Warning: The Base64-URL value must not be padded with '='
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

An example :ref:`challenge response <final-cres-210>` is:

.. code-block:: json
   :linenos:
   :caption: Example CRes, valid for 2.1.0.

   {
      "acsTransID": "87791cee-2514-436c-bed8-a63a87bbdf01",
      "challengeCompletionInd": "Y",
      "messageType": "CRes",
      "messageVersion": "2.1.0",
      "threeDSServerTransID": "d41f6200-0435-49ee-aa11-f366f0661c6f",
      "transStatus": "Y"
    }

The POST body containing the ``CRes``` for this example is

.. code-block::

   cres=eyJhY3NUcmFuc0lEIjoiODc3OTFjZWUtMjUxNC00MzZjLWJlZDgtYTYzYTg3YmJkZjAxIiwiY2hhbGxlbmdlQ29tcGxldGlvbkluZCI6IlkiLCJtZXNzYWdlVHlwZSI6IkNSZXMiLCJtZXNzYWdlVmVyc2lvbiI6IjIuMS4wIiwidGhyZWVEU1NlcnZlclRyYW5zSUQiOiJkNDFmNjIwMC0wNDM1LTQ5ZWUtYWExMS1mMzY2ZjA2NjFjNmYiLCJ0cmFuc1N0YXR1cyI6IlkifQ

Your code must be able to handle that the Base64-URL encoded ``cres`` POST
value can include padding.

Here ``transStatus`` will be either ``Y`` or ``N``. You can use the
:ref:`postauth-usage` to fetch the result of the challenge (ref. :ref:`2.1.0
<postauth-response-210>`, :ref:`2.2.0 <postauth-response-220>`).

Handling timeouts
*****************

1. You have 30 seconds from receiving the :ref:`authentication response
   <auth-usage>` to initiate the challenge.
2. Each interaction in the challenge window has a 10 minute timeout. So the
   cardholder can take at least 10 minutes to complete the challenge.

SDK Challenge
-------------

The challenge should be handled by the SDK, please refer to the SDK
specification for further information.

.. _notification URL: reference.html#attr-AReq-notificationURL
