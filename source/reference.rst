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

3-diti ISO 3166-1 country code string, for Denmark e.g.

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
