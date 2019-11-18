.. _getting-started:

###############
Getting Started
###############

.. contents::

About this service
==================

There are two hostnames associated with this service:

+--------------+-------------------------------------+
| Sandbox      | https://service.sandbox.3dsecure.io |
+--------------+-------------------------------------+
| Production   | https://service.3dsecure.io         |
+--------------+-------------------------------------+

The sandbox environment is used for integration and provided for continuous
integration purposes. This system is suitable for live tests. This is our own
implementation so there will be some discrepancies with the production
endpoint.  The production endpoint is used for production requests.


There are 3 API endpoints for this service:

/preauth
  This is used when performing transactions from a browser, where it will return an optional
  3-D Secure Method URL, which is used for browser fingerprinting.
  This can support risk-based analysis and assist in ensuring a flow where the cardholder is
  not challenged.

  While in the transition period between 3-D Secure v1 and v2, this endpoint
  can help determine if v1 should be used instead.

/auth
  A single call to receive all the data that is needed for authentication [1]_.
  Under certain circumstances, the authentication flow will end successfully here,
  this is called _frictionless_ flow.

/postauth
  Used when the ``/auth`` did not result in a frictionless flow, this endpoint returns
  the result of the challenge the cardholder performed.
  In this case the flow is called a _challenge_ flow.

Overview of Authentication Flow
===============================

This figure illustrates the simplified authentication flow from a requestor
point of view:

.. image:: authentication.svg
    :align: center
    :alt: Authentication

The following describes the individual points in the diagram:

1. A call to the :ref:`preauth-endpoint` is performed if the
   request originator is a cardholder using a browser, as opposed to using a
   SDK or the authentication being Requestor initiated.
2. The :ref:`preauth-response` contains:

   * Information that might be usable in determining whether to fall back to
     3-D Secure v1.

   * An optional `threeDSMethodURL` that is invoked in the user browser.

3. The cardholder browser invokes the `threeDSMethodURL`, to allow the ACS to
   fingerprint the browser.
4. The Requestor uses the :ref:`auth-endpoint` to send the information needed
   for 3dsecure.io to assemble a ``AReq`` message.
5. An ``ARes`` is nominally returned to the Requestor.

   This ``ARes`` contains either:
   - The authentication result (Called *frictionless* flow)
   - Information about how to proceed with the challenge
   - Information stating why the challenge cannot continue (Called *challenge* flow)

6. The cardholder [completes the challenge](#performing-the-challenge) on the
   cardholders device.
7. The ACS informs the Requestor about the challenge result through a callback.
8. The :ref:`postauth-endpoint` is used the fetch the results of the
   authentication.
9. Nominally a ``RReq`` is returned to the Requestor.

Where to go next
================

Performing an authentication
----------------------------

1. Use the :ref:`preauth-endpoint` call to determine 3-D Secure version.
2. Perform an authentication using the :ref:`auth-endpoint` call.
3. If ``transStatus`` is ``C``, perform a :ref:`challenge-flow` on the cardholder device.
4. Retrieve values from :ref:`postauth-endpoint` endpoint after
   challenge flow has completed.

.. [1] Except for the 3-D Secure Method URL used for fingerprinting.
