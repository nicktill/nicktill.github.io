#!/usr/bin/env python3
"""Static server for redesign/ that tells the browser never to cache."""
import functools
import http.server


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()


if __name__ == '__main__':
    handler = functools.partial(NoCacheHandler, directory='redesign')
    http.server.test(HandlerClass=handler, port=3000, bind='127.0.0.1')
