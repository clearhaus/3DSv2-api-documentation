.. _getting-started:

###############
Getting Started
###############

.. contents::

Overview of Authentication Flow
===============================

An authentication in 3-D Secure is the process of verifying cardholder
involvement in e.g. a purchase. An authentication results from and
*authentication flow* and proof of authentication is an *authentication value*.

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
