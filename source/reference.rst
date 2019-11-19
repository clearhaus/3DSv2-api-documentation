.. _reference:

#########
Reference
#########

.. include:: _static/scenario_selector.html

.. _preauth-endpoint:

``/preauth`` endpoint
=====================

Input
-----

.. list-table::
  :widths: 1 1 1 30
  :header-rows: 1

  * - Key
    - Format
    - Required
    - Comments
  * - acctNumber
    - ``^[1-9]\d{12,18}$``
    - Yes
    - The cardholders account number or e.g. a tokenized PAN.

.. _preauth-response:

Output
------

.. list-table::
  :widths: 1 1 1 30
  :header-rows: 1

  * - Key
    - Format
    - Required
    - Comments
  * - acsStartProtocolVersion
    - messageVersion
    - Yes
    - 
  * - acsEndProtocolVersion
    - messageVersion
    - Yes
    - 
  * - threeDSServerTransID
    - UUID
    - Yes
    - 
  * - dsStartProtocolVersion
    - messageVersion
    - No
    - 
  * - acsInfoInd
    - ACSInfo
    - No
    - 
  * - threeDSMethodURL
    - URL
    - No
    - 

.. _auth-endpoint:

``/auth`` endpoint
==================

Input
-----

.. raw:: html
  :file: _static/areq_210.html

.. _auth-response:

Output
------

.. raw:: html
  :file: _static/ares_210.html

.. _postauth-endpoint:

``/postauth`` endpoint
======================

Input
-----

.. list-table::
  :widths: 1 1 1
  :header-rows: 1

  * - Key
    - Format
    - Required
  * - threeDSServerTransID
    - UUID
    - Yes

.. _postauth-response:

Output
------

.. raw:: html
  :file: _static/rreq_210.html

Nested objects
==============

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

MerchantRiskIndicator
---------------------

.. raw:: html
  :file: _static/merchantriskindicator.html

MessageExtensionList
--------------------

ThreeDSRequestorAuthenticationInfo
----------------------------------

.. raw:: html
  :file: _static/threedsrequestorauthenticationinfo.html

ThreeDSRequestorPriorAuthenticationInfo
---------------------------------------

.. raw:: html
  :file: _static/threedsrequestorpriorauthenticationinfo.html

ACSRenderingType
----------------

.. raw:: html
  :file: _static/acsrenderingtype.html
