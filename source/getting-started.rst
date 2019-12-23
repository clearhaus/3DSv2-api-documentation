.. _getting-started:

###############
Getting Started
###############

About this service
==================

Included in this service is a sandbox environment to ease integration. It is
provided as a service for continuous integration and for live tests.
This is our own implementation so there will be some discrepancies with the
production endpoint.

.. warning::
  Under *no* circumstances may real card numbers or other cardholder
  information be sent to the sandbox.

The production endpoint is to be used only for production requests.

Authentication scenarios
========================

Authentications can be split up broadly by two variables which are included in
every transaction, ``messageCategory`` and ``deviceChannel``.

The two possible *message categories* are:

Payment
  Used for the normal payment authentication flow.
  The message value is ``01``.

Non-Payment
  Used for e.g. cardholder account verification.
  The message value is ``02``.


The three *device channels* are:

APP
  Authentications initiated on a mobile device, utilizing a dedicated 3-D
  Secure SDK for the specific device.
  The message value is ``01``.

BRW
  Authentications performed using a browser, similar to 3-D Secure version 1.
  The message value is ``02``.

3RI
  Authentications performed wihtout cardholder involvement, used for e.g.
  getting 3-D Secure values for subsequent recurring transactions.
  The message value is ``03``.

URL Endpoints
=============

There are 3 API endpoints for this service, refer to :ref:`reference` for
parameter definition. Brief descriptions are:

/preauth
  This is used when performing transactions from a browser [1]_, where it will
  return an optional 3-D Secure Method URL, which is used for browser
  fingerprinting.  This can support risk-based analysis and assist in ensuring
  a flow where the cardholder is not challenged.

  While in the transition period between 3-D Secure v1 and v2, this endpoint
  can help determine if v1 should be used instead. This is documented in the
  :ref:`3ds_versioning` guide.

/auth
  A single call to receive all the data that is needed for authentication [2]_.
  Under certain circumstances, the authentication flow will end successfully
  here, this is called *frictionless* flow.

/postauth
  Used when the ``/auth`` did not result in a frictionless flow, this endpoint
  returns the result of the challenge the cardholder performed.  In this case
  the flow is called a *challenge* flow.

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
   fingerprint the browser. See the :ref:`3ds_method` guide.
4. The Requestor uses the :ref:`auth-endpoint` to send the information needed
   for 3dsecure.io to assemble a ``AReq`` message.
5. The Auth :ref:`auth-response` is an ``ARes``, as defined by the specification.

   This ``ARes`` contains either:

   - The authentication result (Called *frictionless* flow)
   - Information about how to proceed with the challenge (Called *challenge* flow)
   - Information stating why the challenge cannot continue

6. The cardholder completes the challenge on the cardholders device.  See the
   :ref:`3ds_challenge_flow` guide.
7. The ACS informs the Requestor about the challenge result through a callback.
   See the :ref:`3ds_callback` guide.
8. The :ref:`postauth-endpoint` is used the fetch the results of the
   authentication.
9. Nominally a ``RReq`` is returned to the Requestor. Parameters are detailed
   in the :ref:`postauth response <postauth-response>` section.

.. [1] as opposed to using an SDK.
.. [2] except for the 3-D Secure Method URL used for fingerprinting when
       performing an authentication through a browser.
