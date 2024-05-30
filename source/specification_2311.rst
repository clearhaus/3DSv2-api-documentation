.. _specification_2311:

###################
Specification 2.3.1.1
###################

The *scenario selector* below can be used to narrow down the required fields
for a selected authentication scenario. Please note the following:

1. When ``All`` is selected in both dropdowns, no type filters are applied.
   I.e. both ``sdkTransID`` and ``browserUserAgent`` is marked as required,
   even though they will never appear in the same message.
2. When a Message Category or a Device Channel is selected, messages will be
   filtered if they are not relevant for the selection. The inclusion might
   change from e.g. required to optional.

.. raw:: html
  :file: _static/scenario_selector.html

.. _preauth-endpoint-2311:

``/preauth`` endpoint
=====================

For usage, refer to :ref:`preauth-usage`.

.. _preauth-input-2311:

Input
-----

.. raw:: html
  :file: _static/preauth.html

.. _preauth-response-2311:

Output (CRD)
------------

.. raw:: html
  :file: _static/crd.html

.. _auth-endpoint-2311:

``/auth`` endpoint
==================

For usage, refer to :ref:`auth-usage`.

.. _auth-input-2311:

Input (AReq)
------------

.. raw:: html
  :file: _static/areq_231.html

.. _auth-response-2311:

Output (ARes)
-------------

.. raw:: html
  :file: _static/ares_231.html

.. _challenge-flow-messages-2311:

Challenge flow
==============

For usage, refer to :ref:`3ds_challenge_flow`.

.. _creq-format-231:

Challenge request (CReq)
------------------------

.. raw:: html
  :file: _static/creq.html

.. _final-cres-2311:

Challenge response (CRes)
-------------------------

.. raw:: html
  :file: _static/cres_231.html

.. _postauth-endpoint-2311:

``/postauth`` endpoint
======================

For usage, refer to :ref:`postauth-usage`.

.. _postauth-input-2311:

Input
-----

.. raw:: html
  :file: _static/postauth.html

.. _postauth-response-2311:

Output (RReq)
-------------

.. raw:: html
  :file: _static/rreq_231.html


Error object
============

.. _error-object-2311:

.. raw:: html
  :file: _static/erro_231.html

Nested objects
==============

ThreeDSRequestorAuthenticationInfo
----------------------------------

.. raw:: html
  :file: _static/threedsrequestorauthenticationinfo_231.html

DeviceRenderOptions
-------------------

.. raw:: html
  :file: _static/devicerenderoptions.html

AcctInfo
--------

.. raw:: html
  :file: _static/acctinfo.html

PhoneNumber
-----------

.. raw:: html
  :file: _static/phonenumber.html

MerchantRiskIndicator
---------------------

.. raw:: html
  :file: _static/merchantriskindicator.html

MessageExtension
----------------

.. raw:: html
  :file: _static/messageextension.html


ThreeDSRequestorPriorAuthenticationInfo
---------------------------------------

.. raw:: html
  :file: _static/threedsrequestorpriorauthenticationinfo.html

ACSRenderingType
----------------

.. raw:: html
  :file: _static/acsrenderingtype.html
