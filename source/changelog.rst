.. _changelog:

#########
Changelog
#########

The source for this documentation is publicly hosted on `Github
<https://github.com/clearhaus/3DSv2-api-documentation>`_. The full changes can
be found in the revision history.
Select changes are added here.

Pull requests and issues are welcome.

November 11th, 2020
*******************

#. Update list of supported card schemes
#. Clarify that ``cardholderName`` must be ASCII
#. Mention that ``browserColorDepth`` is not always valid by specifiction, provide solution
#. Update :ref:`preauth <preauth-success>` timeout that has been changed from 30, to 80 seconds.
#. Improve text in ``threeDSRequestorChallengeInd`` description in reference.

September 17th, 2020
********************

1. Fixed error in sandbox, field ``challengeCompletionInd`` was incorrectly
   ``challengeCompletionIndicator``.

August 21st, 2020
*****************

1. Add proper support for ``2.2.0`` tests in the sandbox
2. Ensure that automatic version determination works with sandbox tests
3. Removed ``startRange``, ``endRange`` from ``preauth`` response.
4. Add missing ``2.2.0`` transStatusReason descriptions
5. Fix ``2.2.0`` ``acsRenderingType`` difference mention. The change is in ``RReq``, not in ``ARes``.

August 12th, 2020
*****************

1. Add ``messageType: CRD`` to ``/preauth`` response

June 29th, 2020
***************

1. Clarify that only ASCII characters are allowed.

June 25th, 2020
***************

1. Reformat testcase descriptions to be more concise.
2. Add :ref:`3RI example input <threeri_example>`.
3. Add `scheme <specification_210.html#attr-cardRangeData-scheme>`_ to ``/preauth`` output.

June 24th, 2020
***************

1. Reference for 3-D Secure version 2.2.0 was added (:ref:`link <specification_220>`).
   This required moving pages around and updating miscellaneous links.
2. Removed versioning section specifically about Mastercard.
3. Added :ref:`new220` page.
