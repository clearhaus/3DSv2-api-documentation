.. _reference:

#########
Reference
#########

The *scenario selector* below can be used to narrow down the required fields
for a selected authentication scenario. Please note these things:

1. When ``All`` is selected in both dropdowns, no type filters are applied.
   I.e. both ``sdkTransID`` and ``browserUserAgent`` is marked as required,
   even though they will never appear in the same message.
2. When a Message Category or a Device Channel is selected, messages will be
   filtered if they are not relevant for the selection. The inclusion might
   change from e.g. required to optional

.. include:: _static/scenario_selector.html

.. _preauth-endpoint:

``/preauth`` endpoint
=====================

.. _preauth-input:

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

.. _auth-input:

Input
-----

.. raw:: html
  :file: _static/areq_210.html

.. _auth-response:

Output
------

.. raw:: html
  :file: _static/ares_210.html

.. _challenge-flow-messages:

Challenge flow
==============

Challenge request (CReq)
------------------------

.. _creq-format:

.. raw:: html
  :file: _static/creq.html

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

MessageExtension
----------------

.. raw:: html
  :file: _static/messageextension.html

ThreeDSRequestorAuthenticationInfo
----------------------------------

.. raw:: html
  :file: _static/threedsrequestorauthenticationinfo_210.html

ThreeDSRequestorPriorAuthenticationInfo
---------------------------------------

.. raw:: html
  :file: _static/threedsrequestorpriorauthenticationinfo.html

ACSRenderingType
----------------

.. raw:: html
  :file: _static/acsrenderingtype.html

Formats
=======

.. _format-uuid:

uuid
----

UUID version 4.

.. _format-ip:

ip
--

IPv4 or IPv6 address.

.. _format-yymm:

yymm
----

2-digit year and month.

.. _format-yyyymmdd:

yyyymmdd
--------

4-digit year, 2-digit month and day-of-month.

.. _format-yyyymmddhhmm:

yyyymmddhhmm
------------

4-digit year, 2-digit month, day-of-month, hour and minute.

.. _format-yyyymmddhhmmss:

yyyymmddhhmmss
--------------

4-digit year, 2-digit month, day-of-month, hour, minute and second.

.. _format-email:

email
-----

Email Address

.. _format-url:

url
---

Fully qualified URL

.. _format-country:

country
-------

3-digit ISO 3166-1 country code string, for Denmark e.g.

.. code:: json

  {
    "billAddrCountry": "208"
  }

for France e.g.

.. code:: json

  {
    "billAddrCountry": "250"
  }

Country codes ``901`` -- ``999`` are not valid.

.. _format-currency:

currency
--------

3-digit ISO 4217 currency code string, for DKK e.g.

.. code:: json

    {
      "purchaseCurrency": "208"
    }

or EUR

.. code:: json

    {
      "purchaseCurrency": "978"
    }

The following codes cannot be used:

- 955
- 956
- 957
- 958
- 959
- 960
- 961
- 962
- 963
- 964
- 999
