.. _sandbox:

#################
Sandbox Testcases
#################

The sandbox contains a list of test cases meant to assist you in
implementation.
More testcases can be added on demand.

It is also the intension that you can use the sandbox for automatic integration
testing of your service. We will not modify individual test cases and will
deprecate them with a sufficient grace period, if need be.

The 3-D Secure server sandbox validates input according to the specification.

*************
Generic Tests
*************

==================== ==================== ======
Test                 Trigger PAN          What's being tested in your system
==================== ==================== ======
Card not enrolled    ``9000100111111111`` Handling :ref:`not enrolled <not_enrolled>` response.
                                          This test only involves the :ref:`preauth call <preauth-usage>`.
==================== ==================== ======

*************
Browser Tests
*************

These tests involve ``deviceChannel: 02``. This must be set in all
authentication requests.

For all these tests:
  1. Perform the :ref:`preauth call <preauth-usage>`.
  2. Execute the :ref:`3DS Method <3ds_method>` if available.
  3. Perform a regular :ref:`auth request <auth-usage>`.
     Use the same ``acctNumber`` as used in the ``preauth`` call.
  4. Fetch the challenge result using the :ref:`postauth endpoint <postauth-usage>` if relevant.

The ``/auth`` :ref:`browser example input <browser_example>` is usable for all
cases. Just change the ``acctNumber`` or ``purchaseAmount`` where needed.

Message Version ``2.1.0``
-------------------------

These tests have a :ref:`preauth <preauth-usage>` response with
``acsEndProtocolVersion: 2.1.0``.  This means your system should automatically
fall back to using verson ``2.1.0``.

Sending ``messageVersion: 2.2.0`` with these PANs will result in an error.

.. list-table:: Browser testcases
   :header-rows: 1
   :widths: 20, 10, 25, 45

   * - Testname
     - Trigger PAN
     - Success criteria
     - What's being tested in your system

   * - 3DS Method timeout
     - ``9000100411111111``
     - ``ARes`` with ``transStatus: Y``
     - The ``threeDSCompInd`` being set correctly

   * - Frictionless 3DS Method
     - ``9000100511111111``
     - ``ARes`` with ``transStatus: Y``
     - Frictionless authentication with 3DS Method

   * - Frictionless no 3DS Method
     - ``9000100611111111``
     - ``ARes`` with ``transStatus: Y``
     - Frictionless authentication without 3DS Method

   * - Manual challenge
     - ``9000100811111111``
     - ``RReq`` with ``transStatus: Y`` or ``N``
     - Challenge authentication with 3DS method

   * - Automatic Challenge pass
     - ``9000100911111111``
     - ``RReq`` with ``transStatus: Y``
     - Successful challenge authentication with 3DS method

       The challenge will auto-submit using JavaScript

   * - Automatic Challenge fail
     - ``9000101011111111``
     - ``RReq`` with ``transStatus: N``
     - Failed challenge authentication with 3DS Method

       The challenge will auto-submit using JavaScript

   * - Automatic Challenge pass
     - ``9000101111111111``
     - ``RReq`` with ``transStatus: Y``
     - Successful challenge authentication without 3DS method

       The challenge will auto-submit using JavaScript

   * - Frictionless ``N``
     - ``9000105001111111``
     - ``ARes`` with ``transStatus: N``
     - Frictionless authentication failure

   * - Frictionless ``U``
     - ``9000105041111111``
     - ``ARes`` with ``transStatus: U``
     - Frictionless authentication failure

   * - Frictionless ``R``
     - ``9000105071111111``
     - ``ARes`` with ``transStatus: R``
     - Frictionless authentication failure

   * - Frictionless ``A``
     - ``9000105611111111``
     - ``ARes`` with ``transStatus: A``
     - Frictionless authentication attempt

   * - Frictionless ``cardholderInfo``
     - ``9000105111111111``
     - ``ARes`` with ``transStatus: N``
     - Correctly displaying ``cardholderInfo`` to the cardholder

   * - DS Timeout
     - ``9000105311111111``
     - ``Erro`` with ``errorCode: 405``
     - Correct handling of DS timeout

Message Version ``2.2.0``
-------------------------

These tests have a :ref:`preauth <preauth-usage>` response with
``acsEndProtocolVersion: 2.2.0``.  If your system supports version ``2.2.0``,
you can use these testcases to verify that your system automatically upgrades
to version ``2.2.0``.

Sending ``messageVersion: 2.1.0`` with these PANs will result in an error.

.. list-table:: Browser testcases
   :header-rows: 1
   :widths: 20, 10, 25, 45

   * - Testname
     - Trigger PAN
     - Success criteria
     - What's being tested in your system

   * - 3DS Method timeout
     - ``9001100411111111``
     - ``ARes`` with ``transStatus: Y``
     - The ``threeDSCompInd`` being set correctly

   * - Frictionless 3DS Method
     - ``9001100511111111``
     - ``ARes`` with ``transStatus: Y``
     - Frictionless authentication with 3DS Method

   * - Frictionless no 3DS Method
     - ``9001100611111111``
     - ``ARes`` with ``transStatus: Y``
     - Frictionless authentication without 3DS Method

   * - Manual challenge
     - ``9001100811111111``
     - ``RReq`` with ``transStatus: Y`` or ``N``
     - Challenge authentication with 3DS method

   * - Automatic Challenge pass
     - ``9001100911111111``
     - ``RReq`` with ``transStatus: Y``
     - Successful challenge authentication with 3DS method

       The challenge will auto-submit using JavaScript

   * - Automatic Challenge fail
     - ``9001101011111111``
     - ``RReq`` with ``transStatus: N``
     - Failed challenge authentication with 3DS Method

       The challenge will auto-submit using JavaScript

   * - Automatic Challenge pass
     - ``9001101111111111``
     - ``RReq`` with ``transStatus: Y``
     - Successful challenge authentication without 3DS method

       The challenge will auto-submit using JavaScript

   * - Frictionless ``N``
     - ``9001105001111111``
     - ``ARes`` with ``transStatus: N``
     - Frictionless authentication failure

   * - Frictionless ``U``
     - ``9001105041111111``
     - ``ARes`` with ``transStatus: U``
     - Frictionless authentication failure

   * - Frictionless ``R``
     - ``9001105071111111``
     - ``ARes`` with ``transStatus: R``
     - Frictionless authentication failure

   * - Frictionless ``A``
     - ``9001105611111111``
     - ``ARes`` with ``transStatus: A``
     - Frictionless authentication attempt

   * - Frictionless ``cardholderInfo``
     - ``9001105111111111``
     - ``ARes`` with ``transStatus: N``
     - Correctly displaying ``cardholderInfo`` to the cardholder

   * - DS Timeout
     - ``9001105311111111``
     - ``Erro`` with ``errorCode: 405``
     - Correct handling of DS timeout

Scheme test PANs
----------------

To allow for integration testing with your authorization system, three
different PANs exist in the sandbox.

These cards support versions ``2.1.0`` and ``2.2.0``, you need to force
``2.1.0`` if your system automatically upgrades to ``2.2.0``.

.. list-table:: Scheme PAN testcases
   :header-rows: 1
   :widths: 20, 20, 20, 40

   * - Testname
     - Trigger PAN
     - Trigger Amount
     - Success criteria

   * - Manual Challenge
     - ``2221000000000009``

       ``4111111111111111``

       ``5500000000000004``
     - ``20000``
     - ``RReq`` with ``transStatus``  ``Y`` or ``N``

   * - Frictionless ``Y``
     - ``2221000000000009``

       ``4111111111111111``

       ``5500000000000004``
     - ``20001``
     - ``ARes`` with ``transStatus``  ``Y``

   * - Frictionless ``N``
     - ``2221000000000009``

       ``4111111111111111``

       ``5500000000000004``
     - ``20002``
     - ``ARes`` with ``transStatus``  ``N``

   * - Frictionless ``A``
     - ``2221000000000009``

       ``4111111111111111``

       ``5500000000000004``
     - ``20003``
     - ``ARes`` with ``transStatus``  ``A``

   * - Automatic challenge pass
     - ``2221000000000009``

       ``4111111111111111``

       ``5500000000000004``
     - ``20004``
     - ``RReq`` with ``transStatus``  ``Y``

   * - Automatic challenge fail
     - ``2221000000000009``

       ``4111111111111111``

       ``5500000000000004``
     - ``20005``
     - ``RReq`` with ``transStatus`` ``N``

*********
3RI Tests
*********

These tests involve ``deviceChannel: 03``. This must be set in all
authentication requests.
The ``/auth`` :ref:`3RI example input <threeri_example>` is usable for all
cases. Just change the ``acctNumber`` where needed.

For all these tests: Perform a regular :ref:`auth request <auth-usage>`.
The ``/preauth`` call is optional. Any ``threeDSServerTransID`` received from
it will not be used in a final 3DS Requestor Initiated transaction.

Message Version ``2.1.0``
-------------------------

Sending ``messageVersion: 2.2.0`` with these PANs will result in an error.

.. list-table:: Browser testcases
   :header-rows: 1
   :widths: 20, 10, 25, 45

   * - Testname
     - Trigger PAN
     - Success criteria
     - What's being tested in your system

   * - Frictionless ``Y``
     - ``9000110511111111``
     - ``ARes`` with ``transStatus: Y``
     - Correctly sending a 3RI request

   * - Frictionless ``A``
     - ``9000110611111111``
     - ``ARes`` with ``transStatus: A``
     - Correctly sending a 3RI request

   * - Frictionless ``U``
     - ``9000110711111111``
     - ``ARes`` with ``transStatus: U``
     - Correctly sending a 3RI request

   * - Frictionless ``R``
     - ``9000110811111111``
     - ``ARes`` with ``transStatus: R``
     - Correctly sending a 3RI request

Message Version ``2.2.0``
-------------------------

Sending ``messageVersion: 2.1.0`` with these PANs will result in an error.

.. list-table:: Browser testcases
   :header-rows: 1
   :widths: 20, 10, 25, 45

   * - Testname
     - Trigger PAN
     - Success criteria
     - What's being tested in your system

   * - Frictionless ``Y``
     - ``9001110511111111``
     - ``ARes`` with ``transStatus: Y``
     - Correctly sending a 3RI request

   * - Frictionless ``A``
     - ``9001110611111111``
     - ``ARes`` with ``transStatus: A``
     - Correctly sending a 3RI request

   * - Frictionless ``U``
     - ``9001110711111111``
     - ``ARes`` with ``transStatus: U``
     - Correctly sending a 3RI request

   * - Frictionless ``R``
     - ``9001110811111111``
     - ``ARes`` with ``transStatus: R``
     - Correctly sending a 3RI request
