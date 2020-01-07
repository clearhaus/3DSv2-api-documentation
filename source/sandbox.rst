.. _sandbox:

#################
Sandbox Testcases
#################

The sandbox contains a list of test cases meant to assist you in
implementation.

It is also the intension that you can use the sandbox for automatic integration
testing of your service. We will not modify individual test cases and will
deprecate them with a sufficient grace period, if need be.

The 3-D Secure server sandbox validates input according to the specification.

*************
Generic Tests
*************

Unrecognized BIN
""""""""""""""""

Test that your system handles account numbers that are not enrolled.

Procedure:
  1. Send :ref:`preauth input <preauth-input>` using an account number between
     ``9000100149672445`` and ``9000100158669649``.

Nominal response:
  A :ref:`not enrolled <not_enrolled>` response.

Success criteria:
  Your system handles the :ref:`not enrolled <not_enrolled>` response.

*************
Browser Tests
*************

These tests involve ``deviceChannel: 02``. This must be set in all
authentication requests.

3DS Method timeout
""""""""""""""""""

Test that your system handles 3DS Methods that time out.  Your system should
correctly set ``threeDSCompInd`` to ``N`` in the ``/auth`` call, after a timed
out 3DS Method call.

Procedure:
  Use an account number between ``9000100434274192`` and ``9000100458973304``.

  1. Perform the :ref:`preauth call <preauth-input>`.
  2. Execute the :ref:`3DS Method <3ds_method>`.
  3. Perform a regular :ref:`auth call <auth-usage>` using a nominal :ref:`auth input <auth-input>`.
     Use the same ``acctNumber`` as used in the ``preauth`` call.

     The ``threeDSCompInd`` must be set dynamically, otherwise the test is
     superfluous.

Nominal response:
  A :ref:`auth response <auth-response>` with ``transStatus: Y``.

Success criteria:
  The ``messageType`` is ``ARes`` and ``transStatus`` is ``Y``.

-----------------

Frictionless auth with 3DS Method
"""""""""""""""""""""""""""""""""

Test that your system correctly handles a 3DS Method call.  Your system should
correctly set ``threeDSCompInd`` to ``Y`` in the ``/auth`` call.

Procedure:
  Use an account number between ``9000100553679418`` and ``9000100595707805``.

  1. Perform the :ref:`preauth call <preauth-input>`.
  2. Execute the :ref:`3DS Method <3ds_method>`, handle the timeout correctly.
  3. Perform a regular :ref:`auth call <auth-usage>` using a nominal :ref:`auth input <auth-input>`.
     Use the same ``acctNumber`` as used in the ``preauth`` call.

     The ``threeDSCompInd`` must be set dynamically, otherwise the test is
     superfluous.

Nominal response:
  A :ref:`auth response <auth-response>` with ``transStatus: Y``.

Success criteria:
  The ``messageType`` is ``ARes`` and ``transStatus`` is ``Y``.

-----------------

Frictionless auth without 3DS Method
""""""""""""""""""""""""""""""""""""

Test that your system correctly handles an auth without a 3DS Method.  Your
system should correctly set ``threeDSCompInd`` to ``U`` in the ``/auth`` call.

Procedure:
  Use an account number between ``9000100659307466`` and ``9000100695973527``.

  1. Perform the :ref:`preauth call <preauth-input>`.
  2. Perform a regular :ref:`auth call <auth-usage>` using a nominal :ref:`auth input <auth-input>`.
     Use the same ``acctNumber`` as used in the ``preauth`` call.

     The ``threeDSCompInd`` must be set dynamically, otherwise the test is
     superfluous.

Nominal response:
  A :ref:`auth response <auth-response>` with ``transStatus: Y``.

Success criteria:
  The ``messageType`` is ``ARes`` and ``transStatus`` is ``Y``.

-----------------

Challenge auth with 3DS Method
""""""""""""""""""""""""""""""

Test that your system correctly handles a 3DS Method call.  Your system should
correctly set ``threeDSCompInd`` to ``Y`` in the ``/auth`` call.

Procedure:
  Use an account number between ``9000100820989135`` and ``9000100886343862``.

  1. Perform the :ref:`preauth call <preauth-input>`.
  2. Execute the :ref:`3DS Method <3ds_method>`.
  3. Perform a regular :ref:`auth call <auth-usage>` using a nominal :ref:`auth input <auth-input>`.
     Use the same ``acctNumber`` as used in the ``preauth`` call.

     The ``threeDSCompInd`` must be set dynamically, otherwise the test is
     superfluous.
  4. Handle the challenge in a browser.
  5. Fetch the challenge result using the :ref:`postauth endpoint <postauth-usage>`.

Nominal response:
  A :ref:`postauth response <postauth-response>` with ``transStatus`` either ``Y`` or ``N``.

Success criteria:
  The ``messageType`` is ``RReq`` and ``transStatus`` is ``Y`` or ``N``,
  depending on how the challenge was handled.

-----------------

======================
Frictionless Testcases
======================

Frictionless transaction status ``N``
"""""""""""""""""""""""""""""""""""""

Test a transaction that is rejected with ``transStatus: N``.

Procedure:
  Use an account number between ``9000105010482916`` and ``9000105038106791``.

  1. Perform the :ref:`preauth call <preauth-input>`.
  2. Perform a regular :ref:`auth call <auth-usage>` using a nominal :ref:`auth input <auth-input>`.
     Use the same ``acctNumber`` as used in the ``preauth`` call.

Nominal response:
  A :ref:`auth response <auth-response>` with ``transStatus: N``.

Success criteria:
  The ``messageType`` is ``ARes`` and ``transStatus`` is ``N``.

-----------------

Frictionless transaction status ``U``
"""""""""""""""""""""""""""""""""""""

Test a transaction that is rejected with ``transStatus: U``.

Procedure:
  Use an account number between ``9000105038106791`` and ``9000105065730666``.

  1. Perform the :ref:`preauth call <preauth-input>`.
  2. Perform a regular :ref:`auth call <auth-usage>` using a nominal :ref:`auth input <auth-input>`.
     Use the same ``acctNumber`` as used in the ``preauth`` call.

Nominal response:
  A :ref:`auth response <auth-response>` with ``transStatus: U``.

Success criteria:
  The ``messageType`` is ``ARes`` and ``transStatus`` is ``U``.

-----------------

Frictionless transaction status ``R``
"""""""""""""""""""""""""""""""""""""

Test a transaction that is rejected with ``transStatus: R``.

Procedure:
  Use an account number between ``9000105065730666`` and ``9000105093354541``.

  1. Perform the :ref:`preauth call <preauth-input>`.
  2. Perform a regular :ref:`auth call <auth-usage>` using a nominal :ref:`auth input <auth-input>`.
     Use the same ``acctNumber`` as used in the ``preauth`` call.

Nominal response:
  A :ref:`auth response <auth-response>` with ``transStatus: R``.

Success criteria:
  The ``messageType`` is ``ARes`` and ``transStatus`` is ``R``.

-----------------

Rejected frictionless transaction with ``cardholderInfo``
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""

Test a transaction that is rejected with ``transStatus: N`` and contains ``cardholderInfo``

Procedure:
  Use an account number between ``9000105113106175`` and ``9000105172916775``.

  1. Perform the :ref:`preauth call <preauth-input>`.
  2. Perform a regular :ref:`auth call <auth-usage>` using a nominal :ref:`auth input <auth-input>`.
     Use the same ``acctNumber`` as used in the ``preauth`` call.

Nominal response:
  A :ref:`auth response <auth-response>` with ``transStatus: N`` and ``cardholderInfo``.

Success criteria:
  Your system correctly displays ``cardholderInfo`` to the cardholder.

-----------------

DS Timeout
""""""""""

Transactions times out at DS

Procedure:
  Use an account number between ``9000105342632400`` and ``9000105380304639``.

  1. Perform the :ref:`preauth call <preauth-input>`.
  2. Perform a regular :ref:`auth call <auth-usage>` using a nominal :ref:`auth input <auth-input>`.
     Use the same ``acctNumber`` as used in the ``preauth`` call.
  3. Handle timeout correctly.

Nominal response:
  An :ref:`error object <error-object>`  with ``errorCode: 405``.

Success criteria:
  Your system gracefully handles timeouts and returned errors.

-----------------

Successful frictionless
"""""""""""""""""""""""

Handle a successful frictionless transaction.

Procedure:
  Use an account number between ``9000105531598636`` and ``9000105572570541``.

  1. Perform the :ref:`preauth call <preauth-input>`.
  2. Perform a regular :ref:`auth call <auth-usage>` using a nominal :ref:`auth input <auth-input>`.
     Use the same ``acctNumber`` as used in the ``preauth`` call.

Nominal response:
  A :ref:`auth response <auth-response>` with ``transStatus: Y``.

Success criteria:
  The ``messageType`` is ``ARes`` and ``transStatus`` is ``Y``.

-----------------

Successful frictionless attempt
"""""""""""""""""""""""""""""""

Handle a successful frictionless transaction attempt.

Endpoint under test
  - ``https://service.sandbox.3dsecure.io/auth``

Procedure:
  Use an account number between ``9000105627843508`` and ``9000105688494389``.

  1. Perform the :ref:`preauth call <preauth-input>`.
  2. Perform a regular :ref:`auth call <auth-usage>` using a nominal :ref:`auth input <auth-input>`.
     Use the same ``acctNumber`` as used in the ``preauth`` call.

Nominal response:
  A :ref:`auth response <auth-response>` with ``transStatus: A``.

Success criteria:
  The ``messageType`` is ``ARes`` and ``transStatus`` is ``A``.

-----------------

*********
3RI Tests
*********

These tests involve ``deviceChannel: 03``. This must be set in all
authentication requests.

Transaction status ``Y``
""""""""""""""""""""""""

Test a transaction that is rejected with ``transStatus: Y``.

Procedure:
  Use an account number between ``9000110500000000`` and ``9000110599999999``.

  1. Perform a regular :ref:`auth call <auth-usage>` using a nominal :ref:`auth input <auth-input>`.
     Use the same ``acctNumber`` as used in the ``preauth`` call.

Nominal response:
  A :ref:`auth response <auth-response>` with ``transStatus: Y``.

Success criteria:
  The ``messageType`` is ``ARes`` and ``transStatus`` is ``Y``.

-----------------

Transaction status ``A``
""""""""""""""""""""""""

Test a transaction that is rejected with ``transStatus: A``.

Procedure:
  Use an account number between ``9000110600000000`` and ``9000110699999999``.

  1. Perform a regular :ref:`auth call <auth-usage>` using a nominal :ref:`auth input <auth-input>`.
     Use the same ``acctNumber`` as used in the ``preauth`` call.

Nominal response:
  A :ref:`auth response <auth-response>` with ``transStatus: A``.

Success criteria:
  The ``messageType`` is ``ARes`` and ``transStatus`` is ``A``.

-----------------

Transaction status ``U``
""""""""""""""""""""""""

Test a transaction that is rejected with ``transStatus: U``.

Procedure:
  Use an account number between ``9000110700000000`` and ``9000110799999999``.

  1. Perform a regular :ref:`auth call <auth-usage>` using a nominal :ref:`auth input <auth-input>`.
     Use the same ``acctNumber`` as used in the ``preauth`` call.

Nominal response:
  A :ref:`auth response <auth-response>` with ``transStatus: U``.

Success criteria:
  The ``messageType`` is ``ARes`` and ``transStatus`` is ``U``.

-----------------

Transaction status ``R``
""""""""""""""""""""""""

Test a transaction that is rejected with ``transStatus: R``.

Procedure:
  Use an account number between ``9000110800000000`` and ``9000110899999999``.

  1. Perform a regular :ref:`auth call <auth-usage>` using a nominal :ref:`auth input <auth-input>`.
     Use the same ``acctNumber`` as used in the ``preauth`` call.

Nominal response:
  A :ref:`auth response <auth-response>` with ``transStatus: R``.

Success criteria:
  The ``messageType`` is ``ARes`` and ``transStatus`` is ``R``.

-----------------

..
  ===================
  Challenge Testcases
  ===================

  - Successful frictionless
    - [x] transStatus [Y, A]
      - [ ] AuthenticationType [01, 02, 03]

  - Failed frictionless
    - [x] transStatus [N, U, R]
      - [ ] transStatusReason
    - [x] Filled/Empty cardholderInfo

  - Successful challenge
    - [ ] transStatus [C]
    - [ ] acsChallengeMandated [Y, N]

  - Failed challenge
    - [ ] transStatus[N]


  Timeouts:
  - Challenge timeout
