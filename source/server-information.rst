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

.. note::
  The sandbox environment is not live yet.

Supported card schemes
======================

+-----------------+--------------------------------------------------------------+
| Card Scheme     | Program name                                                 |
+=================+==============================================================+
| Mastercard      | Mastercard Identity Check (previously Mastercard SecureCode) |
+-----------------+--------------------------------------------------------------+
| Visa            | Visa Secure (previously Verified by Visa)                    |
+-----------------+--------------------------------------------------------------+

Versions supported
================================

- 2.1.0
- 2.2.0

.. _requests:

Making requests to 3dsecure.io
==============================

Request methods
  All requests to 3dsecure.io are HTTP POST requests.

Request headers
  For all requests, the content type header must be
  ::

    Content-Type: application/json; charset=utf-8

Authenticating requests
  Access to the service is granted by an API key. The API key is used on each
  request using the ``APIKey`` HTTP header as such:
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
