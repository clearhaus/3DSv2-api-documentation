.. _specification_210:

############################
Message Specifications 2.1.0
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

.. _preauth-endpoint-210:

``/preauth`` endpoint
=====================

For usage, refer to :ref:`preauth-usage`.

.. _preauth-input-210:

Input
-----

.. raw:: html
  :file: _static/preauth.html

.. _preauth-response-210:

Output
------

.. raw:: html
  :file: _static/cardrangedata.html

.. _auth-endpoint-210:

``/auth`` endpoint
==================

For usage, refer to :ref:`auth-usage`.

.. _auth-input-210:

Input
-----

.. raw:: html
  :file: _static/areq_210.html

.. _auth-response-210:

Output
------

.. raw:: html
  :file: _static/ares_210.html

.. _challenge-flow-messages-210:

Challenge flow
==============

For usage, refer to :ref:`3ds_challenge_flow`.

.. _creq-format-210:

Challenge request (CReq)
------------------------

.. raw:: html
  :file: _static/creq.html

.. _final-cres-210:

Challenge response (CRes)
-------------------------

.. raw:: html
  :file: _static/cres_210.html

.. _postauth-endpoint-210:

``/postauth`` endpoint
======================

For usage, refer to :ref:`postauth-usage`.

.. _postauth-input-210:

Input
-----

.. raw:: html
  :file: _static/postauth.html

.. _postauth-response-210:

Output
------

.. raw:: html
  :file: _static/rreq_210.html


Error object
============

.. _error-object-210:

.. raw:: html
  :file: _static/erro_210.html


Nested objects
==============

ThreeDSRequestorAuthenticationInfo
----------------------------------

.. raw:: html
  :file: _static/threedsrequestorauthenticationinfo_210.html
