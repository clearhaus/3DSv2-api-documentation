#!/usr/bin/env python

from livereload import Server, shell
server = Server()
server.watch('build/html/*.html')
server.serve(root="build/html", open_url_delay=4)
