.. _3ds_method:

3DS Method invocation
=====================

If the `/preauth` call includes a `threeDSMethodURL`, the 3DS Method _must_ be
invoked.

1. Create JSON object containing `threeDSServerTransID` from the `/preauth`
   call:

   .. code-block:: json

     {
       "threeDSServerTransID": "d461f105-1792-407f-95ff-9a496fd918a9",
       "threeDSMethodNotificationURL": "<Requestor callback URL>"
     }

1. _(Requirement 261)_
   Render a hidden HTML iframe in the Cardholder browser and send a form
   with a field name `threeDSMethodData` containing the above JSON to the
   `threeDSMethodURL`.
