.. _usage:

API Usage
=========

.. TODO:

   - Insert link to 3dservice 1.0.2 MPI documentation.

**Browser Authentication (BRW device channel)**

1. Use the :ref:`/preauth <preauth-usage>` API call to:

   - Determine if card is enrolled in 3-D Secure v2
   - Determine 3-D Secure v2 protocol version (``v2.1.0`` or ``v2.2.0``)
   - Receive ``threeDSMethodURL`` to determine if the 3DS Method is required

2. Perform :ref:`3DS Method <3ds_method>` if ``threeDSMethodURL`` was
   included in the ``/preauth`` response.

3. Perform an authentication using the :ref:`auth-usage` call.

   - You **must** include the ``threeDSServerTransID`` from the ``/preauth``
     request in your message.
   - You **must** set the ``threeDSCompInd`` to ``Y`` if the 3DS Method call
     was successfull, otherwise ``N``.

4. If ``transStatus`` is ``C``, perform a :ref:`challenge flow <3ds_challenge_flow>`
   on the cardholder device.

5. Retrieve values from the ``/postauth`` endpoint (ref. :ref:`2.1.0
   <postauth-endpoint-210>`, :ref:`2.2.0 <postauth-endpoint-220>`) endpoint
   after challenge flow has completed.

**Mobile APP Authentication (SDK device channel)**

.. Note::
  The specifics of how a flow is performed depends on the SDK.  Please get in
  touch if you have issues with your SDK and we can assist.

1. Use the :ref:`/preauth <preauth-usage>` API call to:

   - Determine if card is enrolled in 3-D Secure v2. This is not required, but
     will determine if authentication should proceed outside the SDK.
   - Determine 3-D Secure v2 protocol version (``v2.1.0`` or ``v2.2.0``)

2. Perform an authentication using the :ref:`auth-usage` call.

3. If ``transStatus`` is ``C``, perform a :ref:`challenge flow <3ds_challenge_flow>`
   on the cardholder device.

4. Retrieve values from the ``/postauth`` endpoint (ref. :ref:`2.1.0
   <postauth-endpoint-210>`, :ref:`2.2.0 <postauth-endpoint-220>`) endpoint
   after challenge flow has completed.

**3DS Requestor Initiated Authentication (3RI device channel)**

.. note::
  We have yet to determine and document use-cases for 3RI transactions.

1. Use the :ref:`/preauth <preauth-usage>` API call to:

   - Determine if card is enrolled in 3-D Secure v2
   - Determine 3-D Secure v2 protocol version (``v2.1.0`` or ``v2.2.0``)

2. Perform :ref:`3DS Method <3ds_method>` if ``threeDSMethodURL`` was
   included in the ``/preauth`` response.

3. Perform an authentication using the :ref:`auth-usage` call.

.. toctree::
   :maxdepth: 2
   :caption: Contents:
   :name: mastertoc
   :hidden:

   preauth
   auth
   postauth
