.. _usage:

API Usage
=========

.. TODO:

   - Insert link to 3dservice 1.0.2 MPI documentation.

Authentication through browser (BRW device channel)
  1. Use the :ref:`/preauth <preauth-usage>` API call to determine 3-D Secure
     version.

     This should be used when performing the request from the Browser or
     if this is a merchant initiated request. This can help you decide
     if you should fall back to 3-D Secure version 1.0.2

  2. Perform :ref:`3DS Method <3ds_method>` if ``threeDSMethodURL`` was
     included in the ``/preauth`` response.

  3. Perform an authentication using the :ref:`auth-usage` call.

     - You **must** include the ``threeDSServerTransID`` from the ``/preauth``
       request in your message.
     - You **must** set the ``threeDSCompInd`` to ``Y`` if the 3DS Method call
       was successfull, otherwise ``N``.

  4. If ``transStatus`` is ``C``, perform a :ref:`challenge flow <3ds_challenge_flow>` on the cardholder device.
  5. Retrieve values from :ref:`postauth-endpoint` endpoint after
     challenge flow has completed.

.. toctree::
   :maxdepth: 2
   :caption: Contents:
   :name: mastertoc
   :hidden:

   preauth
   auth
   postauth
