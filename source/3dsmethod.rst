.. _3ds_method:

3DS Method invocation
=====================

.. note::
  Only used for browser authentications.

If the :ref:`preauth-usage` response includes a ``threeDSMethodURL``,
the 3DS method *must* be invoked.

If ``threeDSMethodURL`` *is not* included in the ``/preauth`` response, continue
with the :ref:`auth-usage` and set ``"threeDSCompInd": "U"``, to indicate that
the 3DS Method was not available.

Initiating 3DS Method
---------------------

Create a JSON object containing `threeDSServerTransID` from the `/preauth`
call:

.. code-block:: json

  {
   "threeDSServerTransID": "d461f105-1792-407f-95ff-9a496fd918a9",
   "threeDSMethodNotificationURL": "<Requestor callback URL>"
  }

The procedure is as follows:

#. Render a hidden HTML iframe in the Cardholder browser

#. Create a form with an input field named ``threeDSMethodData``

#. This field must contain the above JSON message, Base64URL-encoded

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

Create a HTML ``form``, that contains the input data. This:

.. code-block:: html

   <form class="" id="threeDSMethodForm">
     <input type="hidden" name="threeDSMethodData" id="threeDSMethodData"/>
   </form>

Can be submitted with:

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
   // 2. Base64url-encode it
   // 3. Store the value in the form input tag
   document.getElementById('threeDSMethodData').value =
    btoa(JSON.stringify(threeDSMethodData));

   // Fill out the form information and submit.
   form.action = '<threeDSMethodURL>';
   form.target = 'threeDSMethodIframe'; // id of iframe
   form.method = 'post';
   form.submit();

Completion
----------

When the 3DS Method is finished, the hidden iframe will HTTP POST a form with
the value ``threeDSMethodData`` to the ``threeDSMethodNotificationURL``.
This body can be used to identify the request.

The ``application/x-www-form-urlencoded`` form body looks like:

.. code-block::

   threeDSMethodData=eyJ0aHJlZURTTWV0aG9kRGF0YSI6ICJkNDYxZjEwNS0xNzkyLTQwN2YtOTVmZi05YTQ5NmZkOTE4YTkifQ==

The value is Base64-URL encoded and decodes to:

.. code-block:: json

   {"threeDSServerTransID": "d461f105-1792-407f-95ff-9a496fd918a9"}

Continue the authentication with the :ref:`auth-usage`, setting
``"threeDSCompInd": "Y"``

3DS Method failure
******************

If the callback is not received within 10 seconds, close the iframe and
continue the authentication with the :ref:`auth-usage`, setting
``"threeDSCompInd": "N"``
