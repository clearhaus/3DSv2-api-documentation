.. _specification_common:

######
Common
######

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

.. _format-validversion:

Valid Version
-------------

Valid 3-D Secure v2 versions:

- ``2.1.0``
- ``2.2.0``
