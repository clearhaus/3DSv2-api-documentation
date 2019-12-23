.. _sandbox:

#######
Sandbox
#######

..
  ===================
  3DSMethod Testcases
  ===================

  -----------------

  Invalid BIN
  """""""""""

  Test that your system handles account numbers that are not enrolled.

  Endpoint under test
    ``https://service.sandbox.3dsecure.io/preauth``

  Input
    Normal :ref:`/preauth <preauth-input>`, using an account number between
    ``9000100149672445`` and ``9000100158669649``.

  Expected Outcome
    Your system should be able to handle the :ref:`not enrolled <not_enrolled>` response.

  -----------------

  Valid BIN, no 3DS Method
    Test that your system handles account numbers that are enrolled, but with no
    3DS Method URL.

  Endpoint under test
    ``https://service.sandbox.3dsecure.io/preauth``

  Input
    Normal :ref:`/preauth <preauth-input>`, using an account number between
    ``9000100200700419`` and ``9000100201840411``.

  Expected Outcome
    Your system should be able to handle the :ref:`preauth success
    <preauth-success>` response, without a included 3DS Method URL.

  -----------------

  Valid BIN, 3DS Method
    Test that your system handles account numbers that are enrolled and contains
    a 3DS Method URL.

  Endpoint under test
    ``https://service.sandbox.3dsecure.io/preauth``

  Input
    Normal :ref:`/preauth <preauth-input>`, using an account number between
    ``9000100338788232`` and ``9000100364594002``.

  Expected Outcome
    Your system should be able to handle the :ref:`preauth success
    <preauth-success>` response, without a included 3DS Method URL.

  -----------------

  3DSMethod timeout
    Test that your system handles threeDSMethods that time out correctly, by
    setting ``threeDSCompInd`` to ``N`` in the ``/auth`` call, after a timed out
    3DSMethod call.

  Endpoint under test
    - ``threeDSMethodURL``
    - ``https://service.sandbox.3dsecure.io/auth``

  Input
    Normal :ref:`/preauth <preauth-input>`, using an account number between
    ``9000100434274192`` and ``9000100458973304``.

    For the ``/auth``, use a nominal ``auth`` input with the same ``acctNumber``
    as used in the preauth call.

    The ``threeDSCompInd`` must be set dynamically, otherwise the test is
    superfluous.

  Expected Outcome
    Your system correctly sets the ``threeDSCompInd`` in the ``/auth`` call.

  -----------------

  Successful frictionless auth with 3DS Method
    Test a successful frictionless auth with a 3DS Method invocation.

  Endpoint under test
    - ``threeDSMethodURL``
    - ``https://service.sandbox.3dsecure.io/auth``

  Input
    Normal :ref:`/preauth <preauth-input>`, using an account number between
    ``9000100553679418`` and ``9000100595707805``.

    The ``threeDSCompInd`` must be set dynamically, otherwise the test is
    superfluous.

  Expected Outcome
    A received ``AReq`` value with ``"threeDSCompInd": "Y"``.

  -----------------

  Successful frictionless auth without 3DS Method
    Test a successful frictionless auth without a 3DS Method invocation.

  Endpoint under test
    - ``https://service.sandbox.3dsecure.io/auth``

  Input
    Normal :ref:`/preauth <preauth-input>`, using an account number between
    ``9000100659307466`` and ``9000100695973527``.

    The ``threeDSCompInd`` must be set dynamically, otherwise the test is
    superfluous.

  Expected Outcome
    A received ``AReq`` value with ``"threeDSCompInd": "U"``.

  -----------------

======================
Frictionless Testcases
======================

Rejected frictionless transaction 1
  Test a transaction that is rejected with ``transStatus: N``.

Endpoint under test
  - ``https://service.sandbox.3dsecure.io/auth``

Input
  Normal card flow using an account number between
  ``9000105010482916`` and ``9000105038106791``.

Expected Outcome
  Your system handles an :ref:`authentication response <auth-response>` with
  ``transStatus: N``.

-----------------

Rejected frictionless transaction 2
  Test a transaction that is rejected with ``transStatus: U``.

Endpoint under test
  - ``https://service.sandbox.3dsecure.io/auth``

Input
  Normal card flow using an account number between
  ``9000105038106791`` and ``9000105065730666``.

Expected Outcome
  Your system handles an :ref:`authentication response <auth-response>` with
  ``transStatus: U``.

-----------------

Rejected frictionless transaction 3
  Test a transaction that is rejected with ``transStatus: R``.

Endpoint under test
  - ``https://service.sandbox.3dsecure.io/auth``

Input
  Normal card flow using an account number between
  ``9000105065730666`` and ``9000105093354541``.

Expected Outcome
  Your system handles an :ref:`authentication response <auth-response>` with
  ``transStatus: R``.

-----------------

Rejected frictionless transaction with ``cardholderInfo``
  Test a transaction that is rejected with ``transStatus: N`` and contains ``cardholderInfo``

Endpoint under test
  - ``https://service.sandbox.3dsecure.io/auth``

Input
  Normal card flow using an account number between
  ``9000105113106175`` and ``9000105172916775``.

Expected Outcome
  Your system handles an :ref:`authentication response <auth-response>` with
  ``transStatus: N`` and show the ``cardholderInfo`` to the Card Holder.

-----------------

DS Timeout
  Transactions times out at DS

Endpoint under test
  - ``https://service.sandbox.3dsecure.io/auth``

Input
  Normal card flow using an account number between
  ``9000105342632400`` and ``9000105380304639``.

Expected Outcome
  Your system handles a timeout at the DS.

-----------------

Successfull frictionless
  A successfull frictionless transaction.

Endpoint under test
  - ``https://service.sandbox.3dsecure.io/auth``

Input
  Normal card flow using an account number between
  ``9000105531598636`` and ``9000105572570541``.

Expected Outcome
  Handle frictionless flow with transStatus ``Y``.

-----------------

Successfull frictionless attempt
  A successfull frictionless transaction.

Endpoint under test
  - ``https://service.sandbox.3dsecure.io/auth``

Input
  Normal card flow using an account number between
  ``9000105627843508`` and ``9000105688494389``.

Expected Outcome
  Handle frictionless flow with transStatus ``A``.

-----------------

..
  ===================
  Challenge Testcases
  ===================

  - Successfull frictionless
    - [x] transStatus [Y, A]
      - [ ] AuthenticationType [01, 02, 03]

  - Failed frictionless
    - [x] transStatus [N, U, R]
      - [ ] transStatusReason
    - [x] Filled/Empty cardholderInfo

  - Successfull challenge
    - [ ] transStatus [C]
    - [ ] acsChallengeMandated [Y, N]

  - Failed challenge
    - [ ] transStatus[N]


  Timeouts:
  - Challenge timeout
