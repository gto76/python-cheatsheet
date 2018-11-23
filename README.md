Comprehensive Python Cheatsheet
===============================

![Monty Python](web/image_888.jpeg)

Main
----
```python
if __name__ == '__main__':
    main()
```


List
----
```python
<list>[from_inclusive : to_exclusive : step_size]
<list>.append(<el>)
<list>.extend(<list>)
<list>.sort()
<list>.reverse()
<list> = sorted(<list>)
<iter> = reversed(<list>)
```

```python
sum_of_elements  = sum(<list>)
elementwise_sum  = [sum(pair) for pair in zip(list_a, list_b)]
sorted_by_second = sorted(<list>, key=lambda el: el[1])
sorted_by_both   = sorted(<list>, key=lambda el: (el[1], el[0]))
flattened_list   = [item for sublist in <list> for item in sublist]
list_of_chars    = list(<str>)
```

```python
index = <list>.index(<el>)  # Returns first index of item. 
<list>.insert(index, <el>)  # Inserts item at index and moves the rest to the right.
<el> = <list>.pop([index])  # Removes and returns item at index or from the end.
<list>.remove(<el>)         # Removes first occurrence of item.
<list>.clear()              # Removes all items.   
```


Dictionary
----------
```python
<dict>.keys()
<dict>.values()
<dict>.items()
<dict>.get(key, default)
<dict>.setdefault(key, default)
<dict>.update(<dict>)
```

```python
collections.defaultdict(<type>)  # Creates a dictionary with default values of type.
collections.OrderedDict()        # Creates ordered dictionary.
dict(<list>)                     # Initiates a dict from list of key/value pairs.
dict(zip(keys, values))          # Initiates a dict from two lists.
{k: v for k, v in <dict>.items() if k in <list>}  # Filters a dict by keys.
```


### Counter
```python
>>> from collections import Counter
>>> z = ['blue', 'red', 'blue', 'yellow', 'blue', 'red']
>>> Counter(z)
Counter({'blue': 3, 'red': 2, 'yellow': 1})
```

Set
---
```python
<set> = set()
<set>.add(<el>)
<set>.update(<set>)
<set>.union(<set>)
<set>.intersection(<set>)
<set>.difference(<set>)
<set>.issubset(<set>)
<set>.issuperset(<set>)
```

### Frozenset
#### Is hashable and can be used as a key in dictionary:
```python
<frozenset> = frozenset()
```

Range
-----
```python
range(to_exclusive)
range(from_inclusive, to_exclusive)
range(from_inclusive, to_exclusive, step_size)
range(from_inclusive, to_exclusive, -step_size)
```

Enumerate
---------
```python
for i, <el> in enumerate(<collection> [, i_start])
```

Named Tuple
-----------
```python
>>> Point = collections.namedtuple('Point', ['x', 'y'])
>>> a = Point(1, y=2)
Point(x=1, y=2)
>>> a.x
1
>>> getattr(a, 'y')
2
>>> Point._fields
('x', 'y')
```

Iterator
--------
#### Skips first element:
```python
next(<iter>)
for element in <iter>:
    ...
```

#### Reads input until it reaches an empty line:
```python
for line in iter(input, ''):
    ...
```

#### Same, but prints a message every time:
```python
from functools import partial
for line in iter(partial(input, 'Please enter value'), ''):
    ...
```


Generator
---------
**Convenient way to implement the iterator protocol.**

```python
def step(start, step):
    while True:
        yield start
        start += step
```
```python
stepper = step(10, 2)
next(stepper)  # 10 (, 12, 14, ...)
```


Type
----
```python
type(<el>)  # <class 'int'> / <class 'str'> / ...
```
```python
import numbers
isinstance(<el>, numbers.Number)  # Integral, Real, Rational, Complex
callable(<el>)                    # Is element a function
```


String
------
```python
<str>  = <str>.replace(old_str, new_str)
<list> = <str>.split(sep=None, maxsplit=-1)  # Splits on whitespaces.
<str>  = <str>.strip([chars])
<str>  = <str>.join(<list>)
<bool> = <str>.startswith(<str>)  # Pass tuple of strings for multiple options.
<bool> = <str>.endswith(<str>)    # Pass tuple of strings for multiple options.
<bool> = <str>.isnumeric()        # True if str contains only numeric characters.
<int>  = <str>.index(<sub_str>)   # Returns first index of substring.
```

### Print
```python
print(<el> [, <el>, end='', sep='', file=<file>])  # Use 'file=sys.stderr' for err.
```


### Regex
```python
import re
<str>   = re.sub(<regex>, new, text, count=0)  # Substitutes all occurrences.
<list>  = re.findall(<regex>, text)
<list>  = re.split(<regex>, text, maxsplit=0)  # Use brackets in regex to keep the matches.
<Match> = re.search(<regex>, text)             # Searches for first occurrence of pattern.
<Match> = re.match(<regex>, text)              # Searches only at the beginning of the string.
<Match_iter> = re.finditer(<regex>, text)      # Searches for all occurences of pattern.
```

* **Parameter 'flags=re.IGNORECASE' can be used with all functions. Parameter 'flags=re.DOTALL' makes dot also accept newline.**  
* **Use '\\\\1' or r'\1' for backreference.**  
* **Use ? to make operators non-greedy.**   

#### Match object:
```python
<str> = <Match>.group()   # Whole match.
<str> = <Match>.group(1)  # Part in first bracket.
<int> = <Match>.start()   # Start index of a match.
<int> = <Match>.end()     # Exclusive end index of a match.
```

#### Special sequences:
```python
# Use capital letter for negation.
'\d' == '[0-9]'          # Digit
'\s' == '[ \t\n\r\f\v]'  # Whitespace
'\w' == '[a-zA-Z0-9_]'   # Alphanumeric
```

### Format
```python
'{}'.format(<el> [, <el>, ...])
```

```python
{:min_width}   # '<el>    '
{:>min_width}  # '    <el>'
{:^min_width}  # '  <el>  '
{:_<min_width} # '<el>____'
{:.max_width}  # '<e>'
{:max_width.min_width}        # '    <e>'
{:max_width.no_of_decimalsf}  # '   3.14'
```

```python
>>> person = {'name': 'Jean-Luc', 'height': 187.1}
>>> '{p[height]:.0f}'.format(p=person)
'187'
>>> f"{person['height']:.0f}"
'187'
```

#### Binary, at least 10 spaces wide, filled with zeros:
```python
>>> f'{123:010b}'
'0001111011'
```

#### Integer presentation types:
* `b` - Binary
* `c` - Character
* `o` - Octal
* `x` - Hex
* `X` - HEX


### Text Wrap
```python
import textwrap
textwrap.wrap(text, width)
```

Numbers
-------

### Basic Functions
```python
round(<num>[, ndigits])
abs(<num>)
math.pow(x, y)  # == x**y
```

### Constants
```python
from math import e, pi
```

### Trigonometry
```python
from math import cos, acos, sin, asin, tan, atan, degrees, radians
```

### Logarithm
```python
from math import log, log10, log2
log(x[, base])  # Base e, if not specified.
log10(x)        # Base 10
log2(x)         # Base 2
```

### Infinity, nan
```python
float('inf')
float('nan')
from math import inf, nan, isfinite, isinf, isnan
```

### Random
```python
import random
random.random()
random.randint(from_inclusive, to_inclusive)
random.shuffle(<list>)
random.choice(<list>)
```

Datetime
--------
```python
import datetime
now = datetime.datetime.now()
now.month                      # 3
now.strftime('%Y%m%d')         # '20180315'
now.strftime('%Y%m%d%H%M%S')   # '20180315002834'
```

Arguments
---------
**"*" is the splat operator, that takes a list as input, and expands it into actual positional arguments in the function call:**
```python
args = (1, 2)
kwargs = {'x': 3, 'y': 4, 'z': 5}
func(*args, **kwargs)  
```

#### Is the same as:
```python
func(1, 2, x=3, y=4, z=5)
```

#### Splat operator can also be used in function declarations:
```python
>>> def add(*a):
...     return sum(a)
>>> add(1, 2, 3)
6
```

#### And in some other places:
```python
>>> a = (1, 2, 3)
>>> [*a]
[1, 2, 3]
```

```python
>>> head, *body, tail = [1, 2, 3, 4]
>>> body
[2, 3]
```

Inline
------
### Lambda
```python
lambda: <return_value>
lambda <argument_1>, <argument_2>: <return_value>
```

### Comprehension
```python
[i+1 for i in range(10)]       # [1, 2, ..., 10]
[i for i in range(10) if i>5]  # [6, 7, ..., 9]
{i: i*2 for i in range(10)}    # {0: 0, 1: 2, ..., 9: 18}
(x+5 for x in range(0, 10))    # (5, 6, ..., 14) -> Generator
```

```python
[i+j for i in range(10) for j in range(10)]
```
#### Is the same as:
```python
out = []
for i in range(10):
    for j in range(10):
        out.append(i+j)
```

### Map, Filter, Reduce
```python
map(lambda x: x+1, range(10))     # [1, 2, ..., 10]
filter(lambda x: x>5, range(10))  # [6, 7, ..., 9]
functools.reduce(lambda sum, x: sum+x, range(10))  # 45
```

### Any, All
```python
any(el[1] for el in <collection>)
```

### If - Else
```python
<expression_if_true> if <condition> else <expression_if_false>
```

```python
>>> [a if a else 2 for a in [0, 1, 0, 3]]
[2, 1, 2, 3]
```

### Namedtuple, Enum, Class
```python
from collections import namedtuple
Point = namedtuple('Point', 'x y')

from enum import Enum
Direction = Enum('Direction', 'n e s w')
Cutlery = Enum('Cutlery', {'knife': 1, 'fork': 2, 'spoon': 3})

Creature = type('Creature', (), {'position': Point(0, 0), 'direction': Direction.n})
```


Closure
-------
```python
def multiply_closure(x):
    def wrapped(y):
        return x * y
    return wrapped 

multiply_by_3 = multiply_closure(3)
```

#### Or:
```python
from functools import partial
partial(<function>, <arg_1> [, <arg_2>, ...])
```

Decorator
---------
```python
@closure_name
def function_that_gets_passed_to_closure():
    pass
```

#### Debugger example:
```python
from functools import wraps

def debug(func):
    @wraps(func)  # Needed for metadata copying (func name, ...).
    def wrapper(*args, **kwargs):
        print(func.__name__)
        return func(*args, **kwargs)
    return wrapper

@debug
def add(x, y):
    return x + y
```


Class
-----
```python
class <name>:
    def __init__(self, a):
        self.a = a
    def __repr__(self):
        return str({'a': self.a})
        # Use f'{s.__dict__}' for all members.
    def __str__(self):
        return str(self.a)

    @classmethod
    def get_class_name(cls):
        return cls.__name__
```

### Enum
```python
from enum import Enum, auto
class <enum_name>(Enum):
    <name_1> = <value1>  
    <name_2> = <value2>, <value2_b>
    <name_3> = auto()   # Can be used for automatic indexing.
    ...

   @classmethod
   def get_names(cls):
      return [a.name for a in cls.__members__.values()]

   @classmethod
   def get_values(cls):
      return [a.value for a in cls.__members__.values()]
```

```python
<enum>  = <enum_name>.<name>
<enum>  = <enum_name>['<name>']
<enum>  = <enum_name>(value)
<name>  = <enum>.name
<value> = <enum>.value
```

```python
Cutlery = Enum('Cutlery', 'knife', 'fork', 'spoon'])
Cutlery = Enum('Cutlery', 'knife fork spoon')
Cutlery = Enum('Cutlery', {'knife': 1, 'fork': 2, 'spoon': 3})
list(<enum_name>)                 # == [<enum1>, <enum2>, ...]
random.choice(list(<enum_name>))  # == random <enum>
```

### Copy
```python
import copy
copy.copy(<object>)
copy.deepcopy(<object>)
```


System
------

### Arguments
```python
import sys
script_name = sys.argv[0]
arguments = sys.argv[1:]
```

### Read File
```python
def read_file(filename):
    with open(filename, encoding='utf-8') as file:
        return file.readlines()
```

### Write to File
```python
def write_to_file(filename, text):
    with open(filename, 'w', encoding='utf-8') as file:
        file.write(text)
```

### Path
```python
import os
os.path.exists(<path>)
os.path.isfile(<path>)
os.path.isdir(<path>)
os.listdir(<path>)
```

### Execute Command
```python
import os
os.popen(<command>).read()
```

#### Or:
```python
>>> import subprocess
>>> a = subprocess.run(['ls', '-a'], stdout=subprocess.PIPE)
>>> a.stdout
b'.\n..\nfile1.txt\nfile2.txt\n'
>>> a.returncode
0
```


### Input
```python
filename = input('Enter a file name: ')
```

#### Prints lines until EOF:
```python
while True:
    try:
        print(input())
    except EOFError:
        break
```

JSON
----
```python
import json
```

### Serialization
```python
<str> = json.dumps(<object>, ensure_ascii=True, indent=None)
<dict> = json.loads(<str>)
```

#### To preserve order:
```python
from collections import OrderedDict
<dict> = json.loads(<str>, object_pairs_hook=OrderedDict)
```

### Read File
```python
def read_json_file(filename):
    with open(filename, encoding='utf-8') as file:
        return json.load(file)
```

### Write to File
```python
def write_to_json_file(filename, an_object):
    with open(filename, 'w', encoding='utf-8') as file:
        json.dump(an_object, file, ensure_ascii=False, indent=2)
```

SQLite
------
```python
import sqlite3
db = sqlite3.connect(<filename>)
```

### Read
```python
cursor = db.execute(<query>)
if cursor:
    cursor.fetchall()  # Or cursor.fetchone()
db.close()
```

### Write
```python
db.execute(<query>)
db.commit()
```

Exceptions
----------
```python
while True:
    try:
        x = int(input('Please enter a number: '))
    except ValueError:
        print('Oops!  That was no valid number.  Try again...')
    else:
        print('Thank you.')
        break
```

#### Raise exception
```python
raise IOError("input/output error")
```

Bytes
-----
**Bytes objects are immutable sequences of single bytes.**

### Encode
```python
<Bytes> = b'<str>'
<Bytes> = <str>.encode(encoding='utf-8')
<Bytes> = <int>.to_bytes(<length>, byteorder='big|little', signed=False)
<Bytes> = bytes.fromhex(<hex>)
```

### Decode
```python
<str> = <Bytes>.decode('utf-8') 
<int> = int.from_bytes(<Bytes>, byteorder='big|little', signed=False)
<hex> = <Bytes>.hex()
```

### Read Bytes from File
```python
def read_bytes(filename):
    with open(filename, 'rb') as file:
        return file.read()
```

### Write Bytes to File
```python
def write_bytes(filename, bytes):
    with open(filename, 'wb') as file:
        file.write(bytes)
```

```python
<Bytes> = b''.join(<list_of_Bytes>)
```

Struct
------
**This module performs conversions between Python values and C structs represented as Python bytes objects:**
```python
<Bytes> = struct.pack('<format>', <value_1> [, <value_2>, ...])
<tuple> = struct.unpack('<format>', <Bytes>)
```

### Example
```python
>>> from struct import pack, unpack, calcsize
>>> pack('hhl', 1, 2, 3)
b'\x00\x01\x00\x02\x00\x00\x00\x03'
>>> unpack('hhl', b'\x00\x01\x00\x02\x00\x00\x00\x03')
(1, 2, 3)
>>> calcsize('hhl')
8
```

### Format
**Use capital leters for unsigned type.** 
* `x` - pad byte
* `c` - char
* `h` - short
* `i` - int
* `l` - long
* `q` - long long
* `f` - float
* `d` - double

Hashlib
-------
```python
>>> hashlib.md5(b'<str>').hexdigest()
'33d0eba106da4d3ebca17fcd3f4c3d77'
```

Threading
---------
```python
import threading
```

### Thread
```python
thread = threading.Thread(target=<function>, args=(<first_arg>, ))
thread.start()
thread.join()
```

### Lock
```python
lock = threading.Rlock()
lock.acquire()
lock.release()
```

Itertools
---------
**Every function returns a generator and can accept any collection. If you want to print an output of generator, as in examples, you need to pass it to the list() function.**

```python
from itertools import *
```

### Math

```python
>>> combinations('abc', 2)
[('a', 'b'), ('a', 'c'), ('b', 'c')]

>>> ombinations_with_replacement('abc', 2)
[('a', 'a'), ('a', 'b'), ('a', 'c'), ('b', 'b'), ('b', 'c'), ('c', 'c')]

>>> permutations('abc', 2)
[('a', 'b'), ('a', 'c'), ('b', 'a'), ('b', 'c'), ('c', 'a'), ('c', 'b')]
```

>>> product('ab', [1, 2])
[('a', 1), ('a', 2), ('b', 1), ('b', 2)]
```

### Util

#### Chain
```python
>>> chain([1, 2], range(3, 5))
[1, 2, 3, 4]
```

#### Compress
```python
>>> compress('abc', [True, 0, 23])
['a', 'c']
```

### Count
```python
>>> i = count(5, 2)
>>> next(i), next(i)
(5, 7)
```

#### Cycle
```python
>>> a = cycle('abc')
>>> [next(a) for _ in range(10)]
['a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a']
```

#### Groupby
```python
>>> a = [{'id': 1, 'name': 'bob'}, 
         {'id': 2, 'name': 'bob'}, 
         {'id': 3, 'name': 'peter'}]
>>> {k: list(v) for k, v in groupby(a, key=lambda x: x['name'])}
{'bob': [{'id': 1, 'name': 'bob'}, 
         {'id': 2, 'name': 'bob'}], 
 'peter': [{'id': 3, 'name': 'peter'}]}
```

#### Islice
```python
islice([1, 2, 3], 1, None)
[2, 3]
```

### Ifilter, imap and izip
#### Filter, map and zip functions that return generators instead of iterators.


Introspection and Metaprograming
--------------------------------
**Inspecting code at runtime and code that generates code. You can:**
* **Look at the attributes**
* **Set new attributes**
* **Create functions dynamically**
* **Traverse the parent classes**
* **Change values in the class**

### Variables
```python
<list> = dir()      # In scope variables.
<dict> = globals()  # Global variables.
<dict> = locals()   # Local variables.
```

### Attributes
```python
>>> class Z:
...     def __init__(self):
...             self.a = 'abcde'
...             self.b = 12345
>>> z = Z()
```

```python
>>> getattr(z, 'a')  # Same as Z.__getattribute__(z, 'a')
'abcde'

>>> hasattr(z, 'c')
False

>>> setattr(z, 'c', 10)
```

### Parameters
```python
>>> from inspect import signature
>>> sig = signature(bla)
>>> len(sig.parameters)
3
```

### Type
**Type is the root class. If only passed the object it returns it's type. Otherwise it creates a new class (and not the instance!):**
```python
type(class_name, parents<tuple>, attributes<dict>)
```

```python
>>> Z = type('Z', (), {'a': 'abcde', 'b': 12345})
>>> z = Z()
```


### MetaClass
#### Class that creates class:
```python
def my_meta_class(name, parents, attrs):
    ...
    return type(name, parents, attrs)
```
#### Or:
```python
class MyMetaClass(type):
    def __new__(klass, name, parents, attrs):
        ...
        return type.__new__(klass, name, parents, attrs)
```

### Metaclass Attribute
**When class is created it checks if it has metaclass defined. If not, it recursively checks if any of his parents has it defined, and eventually comes to type:**
```python
class BlaBla:
    __metaclass__ = Bla
```


Eval
----
### Basic
```python
>>> import ast
>>> ast.literal_eval('1 + 1')
2
>>> ast.literal_eval('[1, 2, 3]')
[1, 2, 3]
```

### Detailed
```python
import ast
import operator as op

# Supported operators
operators = {ast.Add: op.add, ast.Sub: op.sub, ast.Mult: op.mul,
             ast.Div: op.truediv, ast.Pow: op.pow, ast.BitXor: op.xor,
             ast.USub: op.neg}

def eval_expr(expr):
    return eval_(ast.parse(expr, mode='eval').body)

def eval_(node):
    if isinstance(node, ast.Num):  # <number>
        return node.n
    elif isinstance(node, ast.BinOp):  # <left> <operator> <right>
        return operators[type(node.op)](eval_(node.left), eval_(node.right))
    elif isinstance(node, ast.UnaryOp):  # <operator> <operand> e.g., -1
        return operators[type(node.op)](eval_(node.operand))
    else:
        raise TypeError(node)
```

```python
>>> eval_expr('2^6')
4
>>> eval_expr('2**6')
64
>>> eval_expr('1 + 2*3**(4^5) / (6 + -7)')
-5.0
```

Coroutine
---------
* **Similar to Generator, but Generator pulls data through the pipe with iteration, while Coroutine pushes data into the pipeline with send().**  
* **Coroutines provide more powerful data routing possibilities than iterators.**  
* **If you built a collection of simple data processing components, you can glue them together into complex arrangements of pipes, branches, merging, etc.**  

### Helper Decorator
* **All coroutines must be "primed" by first calling .next()**  
* **Remembering to call .next() is easy to forget.**  
* **Solved by wrapping coroutines with a decorator:**  

```python
def coroutine(func):
    def start(*args, **kwargs):
        cr = func(*args, **kwargs)
        next(cr)
        return cr
    return start
```

### Pipeline Example
```python
def reader(target):
    for i in range(10):
        target.send(i)
    target.close()

@coroutine
def adder(target):
    while True:
        item = (yield)
        target.send(item + 100)

@coroutine
def printer():
    while True:
        item = (yield)
        print(item)

reader(adder(printer()))
```

<br><br>

Libraries
=========

Plot
----
```python
# $ pip3 install matplotlib
from matplotlib import pyplot
pyplot.plot(<data> [, <data>])
pyplot.show()
pyplot.savefig(<filename>, transparent=True)
```

Table
-----
#### Prints CSV file as ASCII table:
```python
# $ pip3 install tabulate
import csv
from tabulate import tabulate
with open(<filename>, newline='') as csv_file:
    reader = csv.reader(csv_file, delimiter=';')
    headers = [a.title() for a in next(reader)]
    print(tabulate(reader, headers))
```

UrlLib
------
### Translate special characters 
```python
import urllib.parse
<str> = urllib.parse.quote_plus(<str>)
```

Web
---
```python
# $ pip3 install bottle
import bottle
import urllib
```

### Run
```python
bottle.run(host='localhost', port=8080)
bottle.run(host='0.0.0.0', port=80, server='cherrypy')
```

### Static request
```python
@route('/img/<image>')
def send_image(image):
    return static_file(image, 'images/', mimetype='image/png')
```

### Dynamic request
```python
@route('/<sport>')
def send_page(sport):
    sport = urllib.parse.unquote(sport).lower()
    page = read_file(sport)
    return template(page)
```

### REST request
```python
@post('/p/<sport>')
def p_handler(sport):
    team = request.forms.get('team')
    team = urllib.parse.unquote(team).lower()

    db = sqlite3.connect(conf.DB_PATH)
    p_h, p_a = get_p(db, sport, team)
    db.close()

    response.headers['Content-Type'] = 'application/json'
    response.headers['Cache-Control'] = 'no-cache'
    return json.dumps([p_h, p_a])
```


Curses
------
```python
# $ pip3 install curses
import curses

def main():
    curses.wrapper(draw)

def draw(screen):
    screen.clear()
    screen.addstr(0, 0, 'Press ESC to quit.')
    while screen.getch() != 27:
        pass

def get_border(screen):
    Coords = collections.namedtuple('Coords', ['x', 'y'])
    height, width = screen.getmaxyx()
    return Coords(width - 1, height - 1)
```

#### Gets char from int:
```python
<ch> = chr(<int>)
<int> = ord(<ch>)
```

Profile
-------
#### Basic:
```python
from time import time
start_time = time()
<code>
duration = time() - start_time
```

#### Times execution of the passed code:
```python
from timeit import timeit
timeit('"-".join(str(n) for n in range(100))', number=1000000, , globals=globals())
```

#### Generates a PNG image of call graph and highlights the bottlenecks:
```python
# $ pip3 install pycallgraph
import pycallgraph
graph = pycallgraph.output.GraphvizOutput()
graph.output_file = get_filename()
with pycallgraph.PyCallGraph(output=graph):
    <code_to_be_profiled>
```

#### Utility code for unique PNG filenames:
```python
def get_filename():
    time_str = get_current_datetime_string()
    return f'profile-{time_str}.png'

def get_current_datetime_string():
    now = datetime.datetime.now()
    return get_datetime_string(now)

def get_datetime_string(a_datetime):
    return a_datetime.strftime('%Y%m%d%H%M%S')
```

Audio
-----
#### Saves list of floats with values between 0 and 1 to a WAV file:
```python
import wave, struct
frames = [struct.pack('h', int((a-0.5)*60000)) for a in <list>]
wf = wave.open(<filename>, 'wb')
wf.setnchannels(1)
wf.setsampwidth(4)
wf.setframerate(44100)
wf.writeframes(b''.join(frames))
wf.close()
```

Progress Bar
------------
### Basic:
```python
import sys

class Bar():
    @staticmethod
    def range(*args):
        bar = Bar(len(list(range(*args))))
        for i in range(*args):
            yield i 
            bar.tick()
    @staticmethod
    def foreach(elements):
        bar = Bar(len(elements))
        for el in elements:
            yield el
            bar.tick()
    def __init__(s, steps, width=40):
        s.st, s.wi, s.fl, s.i = steps, width, 0, 0
        s.th = s.fl * s.st / s.wi
        s.p(f"[{' ' * s.wi}]")
        s.p('\b' * (s.wi + 1))
    def tick(s):
        s.i += 1
        while s.i > s.th:
            s.fl += 1
            s.th = s.fl * s.st / s.wi
            s.p('-')
        if s.i == s.st:
            s.p('\n')
    def p(s, t):
        sys.stdout.write(t)
        sys.stdout.flush()
```

#### Usage:
```python
from time import sleep
# Range:
for i in Bar.range(100):
    sleep(0.02)
# Foreach:
for el in Bar.foreach(['a', 'b', 'c']):
    sleep(0.02)
```

### Progress:
```python
# $ pip3 install progress
from progress.bar import Bar
from time import sleep
STEPS = 100
bar = Bar('Processing', max=STEPS)
for i in range(STEPS):
    sleep(0.02)
    bar.next()
bar.finish()
```

Basic Script Template
---------------------
```python
# Linux:
#!/usr/bin/env python3
# Mac:
#!/usr/local/bin/python3
#
# Usage: .py 
# 

from collections import namedtuple
from enum import Enum
import re
import sys


def main():
    pass
    

###
##  UTIL
#

def read_file(filename):
    with open(filename, encoding='utf-8') as file:
        return file.readlines()


if __name__ == '__main__':
    main()
```



