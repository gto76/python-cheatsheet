#!/usr/bin/env python3
#
# Usage: ./remove_links.py
# Removes links from index.html and adds page numbers in brackets instead (p. XX).

from pathlib import Path


MATCHES = {
    '<strong>Module <a href="#operator">operator</a> provides functions itemgetter() and mul() that offer the same functionality as <a href="#lambda">lambda</a> expressions above.</strong>': '<strong>Module operator (p. 31) provides functions itemgetter() and mul() that offer the same functionality as lambda expressions (p. 11) above.</strong>',
    '<strong><code class="python hljs"><span class="hljs-string">\'!r\'</span></code> calls object\'s <a href="#class">repr()</a> method, instead of <a href="#class">str()</a>, to get a string.</strong>': '<strong><code class="python hljs"><span class="hljs-string">\'!r\'</span></code> calls object\'s repr() method, instead of str(), to get a string (p. 14).</strong>',
    '<strong>Default_factory can be any <a href="#callable">callable</a>.</strong>': '<strong>Default_factory can be any callable (p. 17).</strong>',
    '<strong>Iterators returned by the <a href="#iterator">iter()</a> function, such as list_iterator and set_iterator.</strong>': '<strong>Iterators returned by the iter() function, such as list_iterator and set_iterator (p. 3).</strong>',
    '<strong>Objects returned by the <a href="#itertools">itertools</a> module, such as count, repeat and cycle.</strong>': '<strong>Objects returned by the itertools module, such as count, repeat and cycle (p. 3).</strong>',
    '<strong>Generators returned by the <a href="#generator">generator functions</a> and <a href="#comprehensions">generator expressions</a>.</strong>': '<strong>Generators returned by the generator functions (p. 4) and generator expressions (p. 11).</strong>',
    '<strong>File objects returned by the <a href="#open">open()</a> function, etc.</strong>': '<strong>File objects returned by the open() function (p. 22), etc.</strong>',
    '<strong>Another solution in this particular case is to use built-in functions and_() and or_() from the module <a href="#operator">operator</a>.</strong>': '<strong>Another solution in this particular case is to use built-in functions and_() and or_() from the module operator (p. 31).</strong>',
    '<strong>Functions report OS related errors by raising either OSError or one of its <a href="#exceptions-1">subclasses</a>.</strong>': '<strong>Functions report OS related errors by raising OSError or one of its subclasses (p. 23).</strong>',
    '<strong>Bools will be stored and returned as ints and dates as <a href="#encode">ISO formatted strings</a>.</strong>': '<strong>Bools will be stored and returned as ints and dates as ISO formatted strings (p. 9).</strong>',
    '<strong>Asyncio module also provides its own <a href="#queue">Queue</a>, <a href="#semaphoreeventbarrier">Event</a>, <a href="#lock">Lock</a> and <a href="#semaphore-event-barrier">Semaphore</a> classes.</strong>': '<strong>Asyncio module also provides its own Queue, Event, Lock and Semaphore classes (p. 30).</strong>',
}


def main():
    index_path = Path('..', 'index.html')
    lines = read_file(index_path)
    out = ''.join(lines)
    for from_, to_ in MATCHES.items():
        out = out.replace(from_, to_, 1)
    write_to_file(index_path, out)


###
##  UTIL
#

def read_file(filename):
    p = Path(__file__).resolve().parent / filename
    with open(p, encoding='utf-8') as file:
        return file.readlines()


def write_to_file(filename, text):
    p = Path(__file__).resolve().parent / filename
    with open(p, 'w', encoding='utf-8') as file:
        file.write(text)


if __name__ == '__main__':
    main()
