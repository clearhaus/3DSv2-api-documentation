.. _3ds_method:

3DS Method invocation
=====================

If the :ref:`preauth-usage` response includes a `threeDSMethodURL`, the 3DS Method *must* be
invoked.

If not, continue the :ref:`auth-usage` with ``"threeDSCompInd": "U"``, to
indicate that the 3DS Method was not available.

1. Create JSON object containing `threeDSServerTransID` from the `/preauth`
   call:

   .. code-block:: json

     {
       "threeDSServerTransID": "d461f105-1792-407f-95ff-9a496fd918a9",
       "threeDSMethodNotificationURL": "<Requestor callback URL>"
     }

2. Render a hidden HTML iframe in the Cardholder browser and send a form with a
   field name `threeDSMethodData` containing the above JSON Base64URL-encoded
   to the `threeDSMethodURL`.

   Below is a suggestion of what you can do:

   a. Add an iframe to the users browser, either statically or using javascript.

      .. code-block:: javascript
         :linenos:

         let displayBox = document.getElementById('displayBox');

         let iframe = document.createElement('iframe');
         iframe.classList.add('hidden');
         iframe.name = "threeDSMethodIframe";

         displayBox.appendChild(iframe);

     Resulting in something like the following html:

     .. code-block:: html

        <iframe name="threeDSMethodIframe" class="hidden"/>

   b. Create a HTML ``form``, likely using javascript, that contains the
      input data and submit that form.

      With this static html:

      .. code-block:: html
         :linenos:

         <form class="" id="threeDSMethodForm">
           <input type="hidden"
            name="threeDSMethodData"
            id="threeDSMethodData"/>
         </form>

      You can submit with something like the following:

      .. code-block:: javascript
         :linenos:

         // Generate the data object
         let threeDSMethodData = {
           threeDSServerTransID: '<TRANS ID>',
           threeDSMethodNotificationURL: '<URL>'
         }

         // Get a reference to the form
         let form = document.getElementById('threeDSMethodForm');

         // Set the form input value to the object,
         // base64url-encode the data.
         document.getElementById('threeDSMethodData').value =
          btoa(JSON.stringify(threeDSMethodData));

         // Fill out the form information and submit.
         form.action = '<threeDSMethodURL>';
         form.target = 'threeDSMethodIframe';
         form.method = 'post';
         form.submit();

3. When the 3D Method call is finished, the browser iframe will be redirected to
   ``threeDSMethodNotificationURL``.
   If the callback is not received in 10 seconds, proceed with step 4.

   The method will be ``POST`` and will contain a form with the value
   ``threeDSMethodData``, that can be used to identify the request.

   The ``application/x-www-form-urlencoded`` form body looks like:

   .. code-block::

      threeDSMethodData=eyJ0aHJlZURTTWV0aG9kRGF0YSI6ICJkNDYxZjEwNS0xNzkyLTQwN2YtOTVmZi05YTQ5NmZkOTE4YTkifQ==


   And the decoded value is like:

   .. code-block:: json

      {"threeDSServerTransID": "d461f105-1792-407f-95ff-9a496fd918a9"}

   Continue the authentication with the :ref:`auth-usage`, setting
   ``"threeDSCompInd": "Y"``

4. If waiting for the callback takes more than 10 seconds, close the iframe
   forcibly and continue the authentication with the :ref:`auth-usage`, setting
   ``"threeDSCompInd": "N"``
