# Clearhaus 3-D Secure v2 API Documentation

This is the documentation for the 3dsecure.io 3-D Secure Server.

## Status

The service and sandbox are production ready and live.

The documentation is subject to changes because of

1. The practicality of authentications differ from scheme to scheme
2. The minutiae of a complex specification

## About

This documentation is meant to stand alone, so it is not necessary to refer to the specification.

Comments, pull requests and general feedback is welcome from anyone.

## Specification

The 3-D Secure v2 specification is defined by EMVCo, their list of 3-D Secure v2
documentation can be found [on their documentation
page](https://www.emvco.com/specifications/?tax%5Bspecifications_categories%5D%5B32%5D%5B%5D=84&tax%5Bspecifications_categories%5D%5B33%5D%5B%5D=447).

Specifically, the primary documentation can be found in named "EMV® 3-D Secure
Protocol and Core Functions Specification".

The spec is currently at version 2.2.0.

## Generate documentation locally

The documentation is currently generated by Sphinx. It can be generated locally with:

	docker run --rm -v $PWD:/opt -w /opt -e USER_ID=$UID ddidier/sphinx-doc:7.1.2-1 sphinx-build -b html source build

The generated documentation is then rooted in `build/index.html`.
