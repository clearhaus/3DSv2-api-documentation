#!/usr/bin/env python

from livereload import Server, shell
server = Server()
server.watch('build/*.html')
server.serve(root="build", open_url_delay=4)
