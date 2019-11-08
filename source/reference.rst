.. _reference:

#########
Reference
#########

.. _preauth-endpoint:

``/preauth`` endpoint
=====================

Input is a JSON object, with the following parameters:

+----------------+----------------------+------------+
| Key            | Regexp/Format        | Required?  |
+================+======================+============+
| ``acctNumber`` | ``^[1-9]\d{12,18}$`` | Yes        |
+----------------+----------------------+------------+

Example input:

.. code-block:: json
    :linenos:

    {
      "acctNumber": "4111111111111111"
    }

POST the body to ``/preauth``.

.. _preauth-response:

``/preauth`` response:
----------------------

+---------------------------+----------------+------------+
| Key                       | Regexp/Format  | Required?  |
+===========================+================+============+
| `acsStartProtocolVersion` | messageVersion | Yes        |
+---------------------------+----------------+------------+
| `acsEndProtocolVersion`   | messageVersion | Yes        |
+---------------------------+----------------+------------+
| `threeDSServerTransID`    | UUID           | Yes        |
+---------------------------+----------------+------------+
| `dsStartProtocolVersion`  | messageVersion | No         |
+---------------------------+----------------+------------+
| `dsEndProtocolVersion`    | messageVersion | No         |
+---------------------------+----------------+------------+
| `acsInfoInd`              | ACSInfo        | No         |
+---------------------------+----------------+------------+
| `threeDSMethodURL`        | URL            | No         |
+---------------------------+----------------+------------+

Example response:

.. code-block:: json
  :linenos:

    {
      "acsStartProtocolVersion": "2.1.0",
      "acsEndProtocolVersion": "2.2.0",
      "threeDSServerTransID": "d461f105-1792-407f-95ff-9a496fd918a9"
    }

_Note:_ This _must_ be followed up with a [3DS method
invocation](#3ds-method-invocation) if `threeDSMethodURL` is included.

3DS Method Invocation
=====================

If the `/preauth` call includes a `threeDSMethodURL`, the 3DS Method _must_ be
invoked.

1. Create JSON object containing `threeDSServerTransID` from the `/preauth` call:

   .. code-block:: json

     {
       "threeDSServerTransID": "d461f105-1792-407f-95ff-9a496fd918a9",
       "threeDSMethodNotificationURL": "<Requestor callback URL>"
     }

1. _(Requirement 261)_
   Render a hidden HTML iframe in the Cardholder browser and send a form
   with a field name `threeDSMethodData` containing the above JSON to the
   `threeDSMethodURL`.

.. _auth-endpoint:

``/auth`` endpoint
================

1. POST a authentication JSON message (`AReq`) to `/auth` endpoint.
2. If `transStatus` is `C`, perform a challenge flow.

.. _postauth-endpoint:

``/postauth`` endpoint
======================

1. Post a JSON object to the `/postauth` endpoint:

   .. code-block:: json

      {
        "threeDSServerTransID": "d461f105-1792-407f-95ff-9a496fd918a9"
      }

.. _challenge-flow:

Challenge Flow
==============

TODO: Add information about how requestor should perform the challenge.
