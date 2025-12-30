#!/usr/bin/env python3
#
# Usage: ./remove_links.py
# Removes links from index.html and adds page numbers in brackets instead (p. XX).

from pathlib import Path


MATCHES = {
    '<strong>For details about sort(), sorted(), min() and max() see <a href="#sortable">Sortable</a>.</strong>': '<strong>For details about functions sort(), sorted(), min() and max() see duck type sortable (p. 16).</strong>',
    '<strong>Module <a href="#operator">operator</a> has function itemgetter() that can replace listed <a href="#lambda">lambdas</a>.</strong>': '<strong>Listed lambda expressions can be replaced by the operator\'s itemgetter() function (p. 31).</strong>',
    '<strong>This text uses the term collection instead of <a href="#abstractbaseclasses">iterable</a>. For rationale see <a href="#collection">duck types</a>.</strong>': '<strong>This text uses the term <em>collection</em> instead of <em>iterable</em>. For rationale see duck types (p. 4, 18).</strong>',
    '<strong>Calling <code class="python hljs"><span class="hljs-string">\'iter(&lt;iter&gt;)\'</span></code> returns unmodified iterator. For details see <a href="#iterator-1">Iterator</a> duck type.</strong>': '<strong>Calling <code class="python hljs"><span class="hljs-string">\'iter(&lt;iter&gt;)\'</span></code> returns unmodified iterator. For details see duck types (p. 17).</strong>',
    '<strong>Adding <code class="python hljs"><span class="hljs-string">\'!r\'</span></code> to the expression first calls result\'s <a href="#class">repr()</a> method and only then format().</strong>': '<strong>Adding <code class="python hljs"><span class="hljs-string">\'!r\'</span></code> to the expression first calls result\'s repr() method and only then format().</strong>',
    '<strong>Use relative imports, i.e. <code class="python hljs"><span class="hljs-string">\'from .[…][&lt;pkg/mod&gt;[.…]] import &lt;obj&gt;\'</span></code>, if project has scattered entry points. Another option is to install the whole project by moving its code into \'src\' dir, adding <a href="https://packaging.python.org/en/latest/guides/writing-pyproject-toml/#basic-information">\'pyproject.toml\'</a> to its root, and running <code class="python hljs"><span class="hljs-string">\'$ pip3 install -e .\'</span></code>.</strong>': '<strong>Use relative imports, i.e. <code class="python hljs"><span class="hljs-string">\'from .[…][&lt;pkg/mod&gt;[.…]] import &lt;obj&gt;\'</span></code>, if project has scattered entry points. Another option is to install the whole project by moving its code into \'src\' dir, adding \'pyproject.toml\' to its root, and running <code class="python hljs"><span class="hljs-string">\'$ pip3 install -e .\'</span></code>.</strong>',
    '<strong>A decorator takes a function, adds some functionality and returns it. It can be any <a href="#callable">callable</a>, but is usually implemented as a function that returns a <a href="#closure">closure</a>.</strong>': '<strong>A decorator takes a function, adds some functionality and returns it. It can be any callable (p.&nbsp;17), but is usually implemented as a function that returns a closure (p. 12).</strong>',
    '<strong>Hints are used by type checkers like <a href="https://pypi.org/project/mypy/">mypy</a>, data validation libraries such as <a href="https://pypi.org/project/pydantic/">Pydantic</a> and lately also by <a href="https://pypi.org/project/Cython/">Cython</a> compiler. However, they are not enforced by CPython interpreter.</strong>': '<strong>Hints are used by type checkers like mypy, data validation libraries such as Pydantic and lately also by Cython compiler. However, they are not enforced by CPython interpreter.</strong>',
    '<strong>Objects can be made <a href="#sortable">sortable</a> with <code class="python hljs"><span class="hljs-string">\'order=True\'</span></code> and immutable with <code class="python hljs"><span class="hljs-string">\'frozen=True\'</span></code>.</strong>': '<strong>Objects can be made sortable with <code class="python hljs"><span class="hljs-string">\'order=True\'</span></code> and immutable with <code class="python hljs"><span class="hljs-string">\'frozen=True\'</span></code>.</strong>',
    '<strong>For object to be <a href="#hashable">hashable</a>, all attributes must be hashable and \'frozen\' must be True.</strong>': '<strong>For object to be hashable, all attributes must be hashable and \'frozen\' must be True.</strong>',
    '<strong>Function field() is needed because <code class="python hljs"><span class="hljs-string">\'&lt;attr_name&gt;: list = []\'</span></code> would make a list that is shared among all instances. Its \'default_factory\' argument accepts any <a href="#callable">callable</a> object.</strong>': '<strong>Function field() is needed because <code class="python hljs"><span class="hljs-string">\'&lt;attr_name&gt;: list = []\'</span></code> would make a list that is shared among all instances. Its \'default_factory\' argument accepts any callable object.</strong>',
    '<strong>Sequence iterators returned by the <a href="#iterator">iter()</a> function, such as list_iterator, etc.</strong>': '<strong>Sequence iterators returned by the iter() function, such as list_iterator and set_iterator.</strong>',
    '<strong>Objects returned by the <a href="#itertools">itertools</a> module, such as count, repeat and cycle.</strong>': '<strong>Objects returned by the itertools module, such as count, repeat, cycle and product (p. 3).</strong>',
    '<strong>Generators returned by the <a href="#generator">generator functions</a> and <a href="#comprehensions">generator expressions</a>.</strong>': '<strong>Generators returned by the generator functions (p. 4) and generator expressions (p. 11).</strong>',
    '<strong>File objects returned by the <a href="#open">open()</a> function, <a href="#sqlite">SQLite</a> cursor objects, etc.</strong>': '<strong>File objects returned by the open() function (p. 22), SQLite cursor objects (p. 27), etc.</strong>',
    '<strong>Use <code class="python hljs"><span class="hljs-string">\'logging.exception(&lt;str&gt;)\'</span></code> to log the passed message, followed by the full error message of the caught exception. For details about setting up the logger see <a href="#logging">Logging</a>.</strong>': '<strong>Use <code class="python hljs"><span class="hljs-string">\'logging.exception(&lt;str&gt;)\'</span></code> to log the passed message, followed by the full error message of the caught exception. For details about the logger setup see Logging (p. 31).</strong>',
    '<strong>Functions report OS related errors by raising OSError or one of its <a href="#exceptions-1">subclasses</a>.</strong>': '<strong>Functions report OS related errors by raising OSError or one of its subclasses (p. 23).</strong>',
    '<strong>Without the <code class="python hljs"><span class="hljs-string">\'newline=""\'</span></code> argument, every \'\\r\\n\' sequence that is embedded inside a quoted field will get converted to \'\\n\'! For details about the <em>newline</em> argument see <a href="#open">Open</a>.</strong>': '<strong>Without the <code class="python hljs"><span class="hljs-string">\'newline=""\'</span></code> argument, every \'\\r\\n\' sequence that is embedded inside a quoted field will get converted to \'\\n\'! For details about the newline arg. see Open (p. 22).</strong>',
    '<strong>To nicely print the spreadsheet to the console use either <a href="#table">Tabulate</a> or PrettyTable library.</strong>': '<strong>To print the spreadsheet to the console use either Tabulate or PrettyTable library (p. 34).</strong>',
    '<strong>For XML and binary Excel files (with extensions xlsx, xlsm and xlsb) use <a href="#fileformats">Pandas</a> library.</strong>': '<strong>For XML and binary Excel files (extensions xlsx, xlsm and xlsb) use Pandas library (p. 46).</strong>',
    '<strong>Library for interacting with various DB systems via SQL, <a href="https://docs.sqlalchemy.org/en/latest/tutorial/data_select.html#the-select-sql-expression-construct">method chaining</a> or <a href="https://docs.sqlalchemy.org/en/latest/orm/quickstart.html#simple-select">ORM</a>.</strong>': '<strong>Library for interacting with various DB systems via SQL, method chaining, or ORM.</strong>',
    '<strong>ProcessPoolExecutor provides true parallelism but: everything sent to and from workers must be <a href="#pickle">pickable</a>, queues must be sent using executor\'s \'initargs\' and \'initializer\' param­eters, and executor should only be reachable via <code class="python hljs"><span class="hljs-string">\'if __name__ == "__main__": ...\'</span></code>.</strong>': '<strong>ProcessPoolExecutor provides true parallelism but: everything sent to and from workers must be pickable, queues must be sent using executor\'s \'initargs\' and \'initializer\' param­eters, and executor should only be reachable via <code class="python hljs"><span class="hljs-string">\'if __name__ == "__main__": ...\'</span></code>.</strong>',
    '<strong>Install a WSGI server like <a href="https://flask.palletsprojects.com/en/latest/deploying/waitress/">Waitress</a> and a HTTP server such as <a href="https://flask.palletsprojects.com/en/latest/deploying/nginx/">Nginx</a> for better security.</strong>': '<strong>Install a WSGI server like Waitress and a HTTP server such as Nginx for better security.</strong>',
    '<strong>Data analysis library. For examples see <a href="#plotly">Plotly</a>.</strong>': '<strong>Data analysis library. For examples see Plotly (p. 47).</strong>',
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
