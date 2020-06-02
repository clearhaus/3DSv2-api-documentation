.. _specification_220:

############################
Message Specifications 2.2.0
############################

The *scenario selector* below can be used to narrow down the required fields
for a selected authentication scenario. Please note the following:

1. When ``All`` is selected in both dropdowns, no type filters are applied.
   I.e. both ``sdkTransID`` and ``browserUserAgent`` is marked as required,
   even though they will never appear in the same message.
2. When a Message Category or a Device Channel is selected, messages will be
   filtered if they are not relevant for the selection. The inclusion might
   change from e.g. required to optional

.. include:: _static/scenario_selector.html

.. _preauth-endpoint-220:

``/preauth`` endpoint
=====================

For usage, refer to :ref:`preauth-usage`.

.. _preauth-input-220:

Input
-----

.. raw:: html
  :file: _static/preauth.html

.. _preauth-response-220:

Output
------

.. raw:: html
  :file: _static/cardrangedata.html

.. _auth-endpoint-220:

``/auth`` endpoint
==================

For usage, refer to :ref:`auth-usage`.

.. _auth-input-220:

Input
-----

.. raw:: html
  :file: _static/areq_220.html

.. _auth-response-220:

Output
------

.. raw:: html
  :file: _static/ares_220.html

.. _challenge-flow-messages-220:

Challenge flow
==============

For usage, refer to :ref:`3ds_challenge_flow`.

.. _creq-format-220:

Challenge request (CReq)
------------------------

.. raw:: html
  :file: _static/creq.html

.. _final-cres-220:

Challenge response (CRes)
-------------------------

.. raw:: html
  :file: _static/cres_220.html

.. _postauth-endpoint-220:

``/postauth`` endpoint
======================

For usage, refer to :ref:`postauth-usage`.

.. _postauth-input-220:

Input
-----

.. raw:: html
  :file: _static/postauth.html

.. _postauth-response-220:

Output
------

.. raw:: html
  :file: _static/rreq_220.html


Error object
============

.. _error-object-220:

.. raw:: html
  :file: _static/erro_220.html

Nested objects
==============

.. raw:: html
  :file: _static/threedsrequestorauthenticationinfo_220.html
