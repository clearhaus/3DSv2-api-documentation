.. _sandbox:

#################
Sandbox Testcases
#################

The sandbox contains a list of test cases meant to assist you in
implementation.

It is also the intension that you can use the sandbox for automatic integration
testing of your service. We will not modify individual test cases. If need be,
we can deprecate them with a sufficient grace period.

The fixed ``9000…`` trigger PANs are deprecated and still accepted. See
:ref:`Deprecated test PANs <deprecated_test_pans>`.

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

.. note::

   The last-4-digit encoding is shared across channels: the same rules apply to
   3RI (``deviceChannel: 03``), which is frictionless only — see
   :ref:`3RI Tests <3ri_sandbox>`.

.. list-table:: Browser testcases
    :header-rows: 1

    * - First digit
      - PAN last 4
      - Description

    * - 0
      - 0xxx
      - Range `messageVersion` `2.1`, `2.2` and `2.3.1`

    * - 1
      - 1xxx
      - `messageVersion` `2.1`

    * - 2
      - 2xxx
      - `messageVersion` `2.2`

    * - 3
      - 3xxx
      - `messageVersion` `2.3.1`

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

    * - 0
      - x0xx
      - With 3DS method included

    * - 1
      - x1xx
      - With 3DS method missing

    * - 2
      - x2xx
      - With 3DS method timeout


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

.. _3ri_sandbox:

*********
3RI Tests
*********

These tests involve ``deviceChannel: 03``. This must be set in all
authentication requests, together with ``messageCategory: 02`` and a valid
``threeRIInd``.

For all these tests:
  1. Perform the :ref:`preauth call <preauth-usage>`.
  2. Perform a regular :ref:`auth request <auth-usage>`.
     Use the same ``acctNumber`` as used in the ``preauth`` call.

The ``/auth`` :ref:`3RI example input <threeri_example>` is usable for all
cases.

3RI uses the **same last-4 PAN encoding as the** `Browser Tests`_: the first
digit selects the :ref:`message version <3ds_versioning>` and the third and
fourth digits select the ARes outcome. You can therefore use any scheme test
PAN (e.g. a Mastercard or Visa BIN) and vary the last four digits.

Because 3RI has no challenge flow (``transStatus C`` is rejected for
``deviceChannel: 03``), only the frictionless outcomes are available. The
``3DS Method`` digit (second of the last 4) has no effect for 3RI.

Message version — first digit of the last 4:

.. list-table:: 3RI message version
    :header-rows: 1

    * - First digit
      - PAN last 4
      - Description

    * - 0
      - 0xxx
      - Range `messageVersion` `2.1`, `2.2` and `2.3.1`
    * - 1
      - 1xxx
      - `messageVersion` `2.1`
    * - 2
      - 2xxx
      - `messageVersion` `2.2`
    * - 3
      - 3xxx
      - `messageVersion` `2.3.1`

ARes outcome — third and fourth digits of the last 4:

.. list-table:: 3RI ARes outcome
    :header-rows: 1

    * - Third digit
      - PAN last 4
      - Description

    * - 0
      - xx03
      - Frictionless `transStatus` `Y` (authenticated)
    * - 1
      - xx13
      - Frictionless `transStatus` `N` (not authenticated)
    * - 2
      - xx23
      - Frictionless `transStatus` `A` (attempted)
    * - 3
      - xx33
      - Frictionless `transStatus` `R` (rejected)
    * - 5
      - xx53
      - Frictionless `transStatus` `U` (unavailable)
    * - 6
      - xx63
      - DS timeout

For example, a Mastercard test PAN ending in ``3003`` returns
``messageVersion 2.3.1`` with a frictionless ``transStatus Y``.

.. note::

   3RI does not support the challenge flow, decoupled authentication, or
   information-only requests. Those last-4 combinations (e.g. the browser
   challenge ``xx7x``) are rejected for ``deviceChannel: 03``.

.. _deprecated_test_pans:

********************
Deprecated test PANs
********************

These PANs still work. The first eight digits select the test: any PAN from
``<prefix>00000000`` to ``<prefix>99999999`` matches.
``9000`` is message version ``2.1.0``; ``9001`` is the same test at ``2.2.0``.

New tests should use the last-four-digit encoding in `Browser Tests`_ and `3RI Tests`_.

.. list-table:: Browser (``deviceChannel: 02``)
    :header-rows: 1

    * - PAN prefix
      - Example
      - Response

    * - ``90001004`` / ``90011004``
      - ``9000100411111111``
      - ``ARes`` ``transStatus Y`` after 3DS Method timeout

    * - ``90001005`` / ``90011005``
      - ``9000100511111111``
      - ``ARes`` ``transStatus Y`` with 3DS Method

    * - ``90001006`` / ``90011006``
      - ``9000100611111111``
      - ``ARes`` ``transStatus Y`` without 3DS Method

    * - ``90001008`` / ``90011008``
      - ``9000100811111111``
      - ``ARes`` ``transStatus C``, then ``RReq`` ``Y`` or ``N``. With 3DS Method

    * - ``90001009`` / ``90011009``
      - ``9000100911111111``
      - ``ARes`` ``transStatus C``, then ``RReq`` ``Y``. With 3DS Method

    * - ``90001010`` / ``90011010``
      - ``9000101011111111``
      - ``ARes`` ``transStatus C``, then ``RReq`` ``N``. With 3DS Method

    * - ``90001011`` / ``90011011``
      - ``9000101111111111``
      - ``ARes`` ``transStatus C``, then ``RReq`` ``Y``. Without 3DS Method

    * - ``90001012`` / ``90011012``
      - ``9000101211111111``
      - ``ARes`` ``transStatus C``, then ``RReq`` ``Y`` or ``N``. Without 3DS Method

    * - ``90001050`` / ``90011050``, last 8 ``00000000``–``38106791``
      - ``9000105000000000``
      - ``ARes`` ``transStatus N``

    * - ``90001050`` / ``90011050``, last 8 ``38106792``–``65730666``
      - ``9000105040000000``
      - ``ARes`` ``transStatus U``

    * - ``90001050`` / ``90011050``, last 8 ``65730667``–``99999999``
      - ``9000105070000000``
      - ``ARes`` ``transStatus R``

    * - ``90001051`` / ``90011051``
      - ``9000105111111111``
      - ``ARes`` ``transStatus N`` with ``cardholderInfo``

    * - ``90001053`` / ``90011053``
      - ``9000105311111111``
      - ``Erro`` ``errorCode 405``

    * - ``90001055`` / ``90011055``
      - ``9000105511111111``
      - ``ARes`` ``transStatus Y``

    * - ``90001056`` / ``90011056``
      - ``9000105611111111``
      - ``ARes`` ``transStatus A``

.. list-table:: 3RI (``deviceChannel: 03``)
    :header-rows: 1

    * - PAN prefix
      - Example
      - Response

    * - ``90001105`` / ``90011105``
      - ``9000110511111111``
      - ``ARes`` ``transStatus Y``

    * - ``90001106`` / ``90011106``
      - ``9000110611111111``
      - ``ARes`` ``transStatus A``

    * - ``90001107`` / ``90011107``
      - ``9000110711111111``
      - ``ARes`` ``transStatus U``

    * - ``90001108`` / ``90011108``
      - ``9000110811111111``
      - ``ARes`` ``transStatus R``
