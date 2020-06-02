.. _3ds_method:

3DS Method invocation
=====================

.. note::
  Only used for browser authentication

The 3DS Method can be optionally used by issuers to gather browser fingerprints
using Javascript. This is done by loading a URL in a hidden iframe, before the
authentication. This iframe will then execute some fingerprinting javascript,
before POST'ing the a prespecified URL belonging to the requestor.  The 3DS
Method fingerprint result is tied to the authentication by the
``threeDSServerTransID``.

Note: *3DS Method is not optional for requestors*.

If `3DS Method URL`_ is included in the :ref:`preauth-usage` response, the
3DS method *must* be invoked as explained in this guide.

If ``threeDSMethodURL`` *is not* included in the ``/preauth`` response (ref.
:ref:`2.1.0 <preauth-response-210>`, :ref:`2.1.0 <preauth-response-220>`),
continue with the :ref:`auth-usage` and set `3DS Completion indicator
<reference.html#attr-AReq-threeDSCompInd>`_ to ``"U"``, to indicate that the
3DS Method was not available.

Initiating 3DS Method
---------------------

Create a JSON object containing ``threeDSServerTransID`` from the :ref:`preauth
<preauth-usage>` call and the callback URL you wish to receive the POST to in
``threeDSMethodNotificationURL``:

.. code-block:: json

  {
   "threeDSServerTransID": "d461f105-1792-407f-95ff-9a496fd918a9",
   "threeDSMethodNotificationURL": "<Requestor callback URL>"
  }

The procedure is as follows:

#. Render a hidden HTML iframe in the Cardholder browser

#. Create a form with an input field named ``threeDSMethodData``

#. This field must contain the above JSON message, Base64-URL encoded

#. Post the form to the ``threeDSMethodURL``, with the HTML iframe as a target

Example
*******

Add an iframe to the users browser, here using javascript

.. code-block:: javascript

   let displayBox = document.getElementById('displayBox');

   let iframe = document.createElement('iframe');
   iframe.classList.add('hidden');
   iframe.name = "threeDSMethodIframe";

   displayBox.appendChild(iframe);

Resulting in the following html

.. code-block:: html

   <iframe name="threeDSMethodIframe" class="hidden"/>

Create a HTML ``form``, that contains the input field:

.. code-block:: html

   <form class="" id="threeDSMethodForm">
     <input type="hidden" name="threeDSMethodData" id="threeDSMethodData"/>
   </form>

This form can be submitted using the following javascript:

.. code-block:: javascript
   :linenos:

   // Generate the data object with required input values
   let threeDSMethodData = {
     threeDSServerTransID: '<TRANS ID>',
     threeDSMethodNotificationURL: '<URL>'
   }

   // Get a reference to the form
   let form = document.getElementById('threeDSMethodForm');

   // 1. Serialize threeDSMethodData object into JSON
   // 2. Base64-URL encode it
   // 3. Store the value in the form input tag
   // Notice: You have to define base64url() yourself.
   document.getElementById('threeDSMethodData').value =
    base64url(JSON.stringify(threeDSMethodData));

   // Fill out the form information and submit.
   form.action = '<threeDSMethodURL>';
   form.target = 'threeDSMethodIframe'; // id of iframe
   form.method = 'post';
   form.submit();

Completion
----------

When the 3DS Method is finished, the hidden iframe will HTTP POST a form to the
``threeDSMethodNotificationURL``.

The POST body will contain the value ``threeDSMethodData``,  which can used to
identify the request.
An example ``application/x-www-form-urlencoded`` body:


.. code-block::


   threeDSMethodData=eyJ0aHJlZURTTWV0aG9kRGF0YSI6ICJkNDYxZjEwNS0xNzkyLTQwN2YtOTVmZi05YTQ5NmZkOTE4YTkifQ==

The value is Base64-URL encoded and decodes to:

.. code-block:: json

   {"threeDSServerTransID": "d461f105-1792-407f-95ff-9a496fd918a9"}

Continue the authentication with the :ref:`auth-usage`, setting
`3DS Completion indicator <reference.html#attr-AReq-threeDSCompInd>`_ to ``"Y"``.

3DS Method failure
******************

If the callback to ``threeDSMethodNotificationURL`` is not received within 10
seconds from the POST call, it has failed.  Close the iframe and continue the
authentication with the :ref:`auth-usage`, setting `3DS Completion indicator
<reference.html#attr-AReq-threeDSCompInd>`_ to ``"N"``.

.. _3DS Method URL: reference.html#attr-cardRangeData-threeDSMethodURL
