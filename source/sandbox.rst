.. _sandbox:

#################
Sandbox Testcases
#################

The sandbox contains a list of test cases meant to assist you in
implementation.

It is also the intension that you can use the sandbox for automatic integration
testing of your service. We will not modify individual test cases. If need be,
we can deprecate them with a sufficient grace period.

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
cases. Just change the last four digit in ``acctNumber`` where needed.


Message version
---------------

This section determines the outcome of the :ref:`preauth <preauth-usage>`. The response is with
``acsEndProtocolVersion: 2.1.0``, ``acsEndProtocolVersion: 2.2.0`` and/or ``acsEndProtocolVersion: 2.3.1``.
This means your system should automatically be able to determine ``messageVersion``.
Sending a wrong ``messageVersion`` will result in an error.

Read :ref:`3-D Secure Version Determination <3ds_versioning>`.


.. list-table:: Browser testcases
    :header-rows: 1

    * - First digit
      - PAN last 4
      - Description
      - Requirements

    * - 0
      - 0xxx
      - Range `messageVersion` `2.1` and `2.2`
      - n/a

    * - 1
      - 1xxx
      - `messageVersion` `2.1`
      - n/a

    * - 2
      - 2xxx
      - `messageVersion` `2.2`
      - n/a

    * - 3
      - 3xxx
      - `messageVersion` `2.3`
      - n/a

3DS Method
-----------

If 3DS Method URL is included in the :ref:`preauth <preauth-usage>` endpoint response, the 3DS method must be invoked as explained in this guide
:ref:`3DS Method Invocation <3ds_method>`.

Read :ref:`3DS Method failure <3DS Method failure>` if the 3DS method has a timeout.

.. list-table:: Browser testcases
    :header-rows: 1

    * - Second digit
      - PAN last 4
      - Description
      - Requirements

    * - 0
      - x0xx
      - With 3DS method included
      - n/a

    * - 1
      - x1xx
      - With 3DS method missing
      - n/a

    * - 2
      - x2xx
      - With 3DS method timeout
      - n/a


ARes outcome
-------------

This section determines the outcome of the ARes.

Read :ref:`Auth usage <auth-usage>` to understand the flow.

.. list-table:: Browser testcases
    :header-rows: 1

    * - Third digit
      - PAN last 4
      - Description
      - Requirements

    * - 0
      - xx03
      - Frictionless `transStatus` `Y`
      - n/a

    * - 1
      - xx13
      - Frictionless `transStatus` `N`
      - n/a

    * - 2
      - xx23
      - Frictionless `transStatus` `A`
      - n/a

    * - 3
      - xx33
      - Frictionless `transStatus` `R`
      - n/a

    * - 4
      - xx43
      - Frictionless `transStatus` `I`
      - only supported with `messageVersion 2.2` or greater

    * - 5
      - xx53
      - Frictionless `transStatus` `U`
      - n/a

    * - 6
      - xx63
      - DS timeout
      - n/a

    * - 7
      - xx7x
      - `transStatus` `C`
      - Complete the `Challenge flow`_



Challenge flow
---------------

This section determines the outcome of the challenge flow.

The challenge flow must be invoked as explained in this guide :ref:`Challenge flow guide <3ds_challenge_flow>`.
After the challenge flow invoke ``/postauth`` to fetch the challenge result.

Read :ref:`postauth usage <postauth-usage>` for understanding how to fetch challenge result.

.. list-table:: Browser testcases
    :header-rows: 1
    :widths: 20, 15, 25, 40

    * - Fourth digit
      - PAN last 4
      - Description
      - Requirements

    * - 0
      - xx70
      - Challenge flow automatically passes `transStatus` `Y`
      - `transStatus` `C` in `ARes` see `ARes outcome`_

    * - 1
      - xx71
      - Challenge flow automatically fails  `transStatus` `N`
      - `transStatus` `C` in `ARes` see `ARes outcome`_

    * - 2
      - xx72
      - Manual challenge with `transStatus` `Y` or `N`
      - `transStatus` `C` in `ARes` see `ARes outcome`_

*****
Error
*****

If the last four digits do not match any of the given test cases above, an error will be given.

****************
Browser Examples
****************

.. list-table:: Browser testcases
    :header-rows: 1
    :widths: 20, 15, 15, 25, 40

    * - Testname
      - PAN example
      - PAN last 4
      - Success criteria
      - What's being tested in your system

    * - 3DS Method timeout ``messageVersion 2.1 - 2.2``
      - ``5000100411110203``
      - ``0203``
      - ``ARes`` with ``transStatus: Y``
      - The ``threeDSCompInd`` being set correctly


    * - Frictionless 3DS Method ``messageVersion 2.2``
      - ``4000100511112003``
      - ``2003``
      - ``ARes`` with ``transStatus: Y``
      - Frictionless authentication with 3DS Method

    * - Frictionless no 3DS Method ``messageVersion 2.1``
      - ``6000100611111103``
      - ``1103``
      - ``ARes`` with ``transStatus: Y``
      - Frictionless authentication without 3DS Method

    * - Manual challenge ``messageVersion 2.1``
      - ``3000100811111072``
      - ``1072``
      - ``RReq`` with ``transStatus: Y`` or ``N``
      - Challenge authentication with 3DS method

    * - Automatic Challenge pass ``messageVersion 2.2``
      - ``7000100911112070``
      - ``2070``
      - ``RReq`` with ``transStatus: Y``
      - Successful challenge authentication with 3DS method

        The challenge will auto-submit using JavaScript

    * - Automatic Challenge fail ``messageVersion 2.1``
      - ``3000101011111071``
      - ``1071``
      - ``RReq`` with ``transStatus: N``
      - Failed challenge authentication with 3DS Method

        The challenge will auto-submit using JavaScript
