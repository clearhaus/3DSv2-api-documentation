##################
Server information
##################

Connecting to the server
========================

+--------------+-------------------------------------+
| Environment  | URL                                 |
+==============+=====================================+
| Sandbox      | https://service.sandbox.3dsecure.io |
+--------------+-------------------------------------+
| Production   | https://service.3dsecure.io         |
+--------------+-------------------------------------+

Supported card schemes
======================

+------------------+--------------------------------------------------------------+
| Card Scheme      | Program name                                                 |
+==================+==============================================================+
| Mastercard       | Mastercard Identity Check (previously Mastercard SecureCode) |
+------------------+--------------------------------------------------------------+
| Visa             | Visa Secure (previously Verified by Visa)                    |
+------------------+--------------------------------------------------------------+
| Discover/Diners  | ProtectBuy                                                   |
+------------------+--------------------------------------------------------------+
| American Express | SafeKey                                                      |
+------------------+--------------------------------------------------------------+
| JCB              | J/Secure 2.0                                                 |
+------------------+--------------------------------------------------------------+
| Dankort/FBF      | Secured By Nets, EMV SBN                                     |
+------------------+--------------------------------------------------------------+
| UPI              | UnionPay 3-D Secure                                          |
+------------------+--------------------------------------------------------------+

Versions supported
================================

- 2.1.0
- 2.2.0
- 2.3.1

.. _requests:

Making requests to the 3-D Secure Server
========================================

Request methods
  All requests to the 3-D Secure Server are HTTP POST requests.

Request headers
  For all requests, the content type header must be
  ::

    Content-Type: application/json; charset=utf-8

Allowed characters
  Despite the charset being ``utf-8``, only ASCII characters are allowed in
  ``cardholderName``.

  Currently the ``2.1.0`` and ``2.2.0`` specifications only support ASCII
  characters.
  The ``2.3.1`` specification has removed any character requirements for
  ``cardholderName``, indicating that all ``utf-8`` characters are allowed.
  It remains unclear if card schemes will allow ``utf-8`` characters.

Authenticating requests
  Access to the service is granted by an API key. The API key is used on each
  request using the ``APIKey`` HTTP header:
  ::

    APIKey: <YOUR UUID API KEY>

  A failed authentication done through ``cURL`` looks like:
  ::

    $ curl -iH 'APIKey: 1bde2d3e-7f44-46df-adfd-1db8f3f75783' https://service.3dsecure.io/auth
    HTTP/2 401
    date: Tue, 29 Oct 2019 12:42:06 GMT
    content-type: text/plain; charset=utf-8
    content-length: 15

    Invalid API Key

.. rubric:: FootNotes
