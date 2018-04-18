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
<list> = reversed(<list>)
```

```python
sum_of_elements  = sum(<list>)
sorted_by_second = sorted(<list>, key=lambda el: el[1])
flattened_list   = [item for sublist in <list> for item in sublist]
list_of_chars    = list(<str>)
```


Dictionary
----------
```python
<dict>.items()
<dict>.get(key, default)
<dict>.setdefault(key, default)
<dict>.update(<dict>)
```

```python
collections.defaultdict(<type>)  # Creates a dictionary with default values.
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
```


String
------
```python
str.replace(text, old, new)
<str>.split(sep=None, maxsplit=-1)
<str>.strip()
<str>.join(<list>)
<str>.startswith(<str>)
<str>.isnumeric()
```

### Print
```python
print(<el> [, <el>, end='', sep='', file=<file>])
```

### Regex
```python
import re
re.sub(<regex>, new, text, count=0)
re.search(<regex>, text)  # Searches for first occurrence of pattern.
re.match(<regex>, text)   # Searches only at the beginning of the string.
re.findall(<regex>, text)
re.split(<regex>, text, maxsplit=0)  # Use brackets in regex to keep the matches.
```

**'Search' and 'match' functions return a 'Match' object. Use '.group()' method on it to get the whole match, or '.group(1)' to get the part in first bracket.**  
**Parameter 'flags=re.IGNORECASE' can be used with all functions. Parameter 'flags=re.DOTALL' makes dot also accept newline.**  
**Use '\\\\1' or r'\1' for backreference.**  

#### Special Sequences:
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

```python
>>> f'{123:020b}'
'00000000000001111011'
```

#### Integer presentation types:
* 'b' - Binary
* 'c' - Character
* 'o' - Octal
* 'x' - Hex
* 'X' - HEX


### Text Wrap
```python
import textwrap
textwrap.wrap(text, width)
```


Random
------
```python
import random
random.random()
random.randint(from_inclusive, to_inclusive)
random.shuffle(<list>)
random.choice(<list>)
```

Infinity
--------
```python
float('inf')
```

Datetime
--------
```python
import datetime
now = datetime.datetime.now()
now.month                      # 3
now.strftime('%Y%m%d')         # 20180315
now.strftime('%Y%m%d%H%M%S')   # 20180315002834
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


Inline
------
### Lambda
```python
lambda: <return_value>
lambda <argument1>, <argument2>: <return_value>
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
partial(<function>, <argument>)
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
    def __str__(self):
        return str(self.a)
```

### Enum
```python
import enum
class <enum_name>(enum.Enum):
    <name1> = <value1>  
    <name2> = <value2>
    <name3> = enum.auto()  # Can be used for automatic indexing.
    ...
```

```python
<enum_name>.<name>  # == <enum>
<enum_name>(value)  # == <enum>
<enum>.name         # == <name>
<enum>.value        # == <value>
```

```python
Cutlery = Enum('Cutlery', ['knife', 'fork', 'spoon'])
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
sys.argv
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
<object> = json.loads(<str>)
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
db = sqlite3.connect(filename)
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
        x = int(input("Please enter a number: "))
    except ValueError:
        print("Oops!  That was no valid number.  Try again...")
    else:
        print("Thank you.")
        break
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

### Chain
```python
>>> chain([1, 2], range(3, 5))
[1, 2, 3, 4]
```

### Combinations
```python
>>> combinations("abc", 2)
[('a', 'b'), ('a', 'c'), ('b', 'c')]
```

### Permutations
```python
>>> permutations("abc", 2)
[('a', 'b'), ('a', 'c'), ('b', 'a'), ('b', 'c'), ('c', 'a'), ('c', 'b')]
```

### Product
```python
>>> list(product('ab', [1, 2]))
[('a', 1), ('a', 2), ('b', 1), ('b', 2)]
```

### Compress
```python
>>> compress("abc", [True, 0, 23])
['a', 'c']
```

### Count
```python
>>> a = count(5, 2)
>>> next(a), next(a)
(5, 7)
```

### Cycle
```python
>>> a = cycle("abc")
>>> [next(a) for _ in range(10)]
['a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a']
```

### Groupby
```python
>>> a = [{"id": 1, "name": "bob"}, 
         {"id": 2, "name": "bob"}, 
         {"id": 3, "name": "peter"}]
>>> {k: list(v) for k, v in groupby(a, key=lambda x: x["name"])}
{'bob': [{'id': 1, 'name': 'bob'}, 
         {'id': 2, 'name': 'bob'}], 
 'peter': [{'id': 3, 'name': 'peter'}]}
```

### Islice
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


```python
>>> class Z:
...     def __init__(self):
...             self.a = 'abcde'
...             self.b = 12345
>>> z = Z()
```

### Getattr, Hasattr, Setattr
```python
>>> getattr(z, 'a')  # Same as Z.__getattribute__(z, 'a')
'abcde'

>>> hasattr(z, 'c')
False

>>> setattr(z, 'c', 10)
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

### Metaclass Attr
**When class is created it checks if it has metaclass defined. If not, it recursively checks if any of his parents has it defined, and eventually comes to type:**
```python
class BlaBla:
    __metaclass__ = Bla
```


Eval
----
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


Libraries
=========

Plot
----
```python
from matplotlib import pyplot
pyplot.plot(<data> [, <data>])
pyplot.show()
pyplot.savefig(filename)
```

Web
---
```python
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
import curses

def main():
    curses.wrapper(draw)

def draw(screen):
    screen.clear()
    screen.addstr(0, 0, "Press ESC to quit.")
    while screen.getch() != 27:
        pass

def get_border(screen):
    Coords = collections.namedtuple('Coords', ['x', 'y'])
    height, width = screen.getmaxyx()
    return Coords(width - 1, height - 1)
```

#### Gets char from int:
```python
chr(<int>)
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
timeit('"-".join(str(n) for n in range(100))', number=10000)
```

#### Generates a PNG image of call graph and highlights the bottlenecks:
```python
import pycallgraph
graph = pycallgraph.output.GraphvizOutput()
graph.output_file = get_filename()
with pycallgraph.PyCallGraph(output=graph):
    <code_to_be_profiled>
```

#### Utility code for unique PNG filenames:
```python
def get_filename():
    return "{}-{}.png".format("profile", get_current_datetime_string())

def get_current_datetime_string():
    now = datetime.datetime.now()
    return get_datetime_string(now)

def get_datetime_string(a_datetime):
    return a_datetime.strftime('%Y%m%d%H%M%S')
```

Audio
-----
#### Saves list of floats of size 0 to 1 to a WAV file:
```python
import wave, struct
frames = [struct.pack("%dh"%(1), int((a-0.5)*60000)) for a in <list>]
wf = wave.open(filename, 'wb')
wf.setnchannels(1)
wf.setsampwidth(4)
wf.setframerate(44100)
wf.writeframes(b''.join(frames))
wf.close()
```

Progress Bar
------------
#### Basic:
```python
class Progressbar():
    def __init__(self, steps, width=40):
        self.steps = steps
        self.width = width
        self.filled = 0
        self.counter = 0
        self.treshold = self.filled * self.steps / self.width
        sys.stdout.write(f"[{' ' * width}]")
        sys.stdout.flush()
        sys.stdout.write('\b' * (width + 1))
    def tick(self):
        self.counter += 1
        while self.counter > self.treshold:
            self.filled += 1
            self.treshold = self.filled * self.steps / self.width
            sys.stdout.write("-")
            sys.stdout.flush()
        if self.counter == self.steps:
            sys.stdout.write("\n")
```






