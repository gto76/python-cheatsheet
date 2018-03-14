Comprehensive Python Cheatsheet
===============================

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
<list>.extend(<list>)
<list>.sort()
<list>.reverse()
```

```python
sum(<list>)
sorted_by_second = sorted(<list>, key=lambda tup: tup[1])
[item for sublist in <list> for item in sublist]  # Flattens List.
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
dict(zip(keys, values))  # Initiates a dict from two lists.
{k: v for k, v in <dict>.iteritems() if k in <list>}  # Filters a dict by keys.
```

#### Counter
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
<frozenset>  # Is hashable and can be used as key in dictionary.
```

Range
-----
```python
range(to_exclusive)
range(from_inclusive, to_exclusive)
range(from_inclusive, to_exclusive, step_size)  # Negative step_size for backward
```

Enumerate
---------
```python
for i, <el> in enumerate(<collection> [, i_start])
```

Named Tuple
-----------
```python
>>> TestResults = collections.namedtuple('TestResults', ['filed', 'attempted'])
>>> TestResults(1, 2)
TestResults(filed=1, attempted=2)
```

Iterator
--------
#### Reads input until it reaches empty line
```python
for line in iter(input, ''):
    pass
```
Use _partial_ from functools if function needs arguments.

#### Skips first element
```python
next(<iter>)
for element in <iter>:
    pass
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
type(<el>)  # int/str/set/list/...
```
```python
import numbers
isinstance(<el>, numbers.Number)
```


String
------
```python
str.replace(text, old, new)
<str>.isnumeric()
<str>.split()
<str>.strip()
<str>.join(<list>)
```

### Print
```python
print(<el> [, <el>, end='', sep='', file=<file>])
```

### Regex
```python
import re
re.sub(<regex>, new, text)
re.search(<regex>, text)
```

### Format
```python
'{}'.format(<el> [, <el>, ...])
```

```python
{:min_width}   # '<el>    '
{:>min_width}  # '    <el>'
{:^min_width}  # '  <el>  '
{:_min_width}  # '<el>____'
{:.max_width}  # '<e>'
{:max_widht.min_width}        # '    <e>'
{:max_width.no_of_decimalsf}  # '   3.14'
```

```python
>>> person = {'name': 'Jean-Luc', 'height': 187.1}
>>> '{p[height]:.0f}'.format(p=person)
'187'
```

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
```

Infinity
--------
```python
float("inf")
```

Datetime
--------
```python
import datetime
now = datetime.datetime.now()
now.strftime('%Y%m%d')
now.strftime('%Y%m%d%H%M%S')
```

Arguments
---------
```python
args = (1, 2)
kwargs = {'x': 3, 'y': 4, 'z': 5}
func(*args, **kwargs)  
```
##### Is same as
```python
func(1, 2, x=3, y=4, z=5)
```

#### "*" is the splat operator, that takes a list as input, and expands it into actual positional arguments in the function call.


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
(x+5 for x in range(0, 10))    # (5, 6, ..., 14)
```
##### Last one creates a generator.

```python
[i+j for i in range(10) for j in range(10)]
```
##### Is same as
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
functools.reduce(combining_function, list_of_inputs)
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

#### or
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

#### Debugger example
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
    <name1> = <value1>  # Or "= enum.auto()" for automatic indexing.
    <name2> = <value2>
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
list(<enum_name>)  # == [<enum1>, <enum2>, ...]
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
with open(file_name, encoding='utf-8') as file:
    return file.readlines()
```
```python
def get_file_contents(file_name):
    with open(file_name, encoding='utf-8') as file:
        return file.readlines()
```

### Write to File
```python
with open(file_name, 'w', enconding='utf-8') as file:
    file.write(text)
```

### Execute Command
```python
import os
os.popen(<command>).read()
```

### Input
```python
file_name = input('Enter a file name: ')
```

### Print lines until EOF
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

### Read File
```python
with open(file_name, encoding='utf-8') as file:
    return json.load(file)
```

### Write to File
```python
with open(file_name, 'w', enconding='utf-8') as file:
    file.write(json.dumps(<object>))
```

SQLite
------
```python
import sqlite3
db = sqlite3.connect(file_name)
```

### Read
```python
cursor = db.execute(<query>)
if cursor:
    cursor.fetchall()  # Or "cursor.fetchone()"
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
        break
    except ValueError:
        print("Oops!  That was no valid number.  Try again...")
```

Threading
---------
```python
import threading
```

### Thread
```python
thread = threading.Thread(target=<function>, args=(<first arg>, ))
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
Every function returns a generator and can accept any collection. If you want to print an output of generator, as in examples, you need to pass it to list() 
function.

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
>>> {k: list(v) for k, v in groupby("aabbbc")}
{'a': ['a', 'a'], 'b': ['b', 'b', 'b'], 'c': ['c']}
```

```python
>>> a = [{"id": 1, "name": "bob"}, {"id": 2, "name": "bob"}, {"id": 3, "name": "peter"}]
>>> {k: list(v) for k, v in groupby(a, key=lambda x: x["name"])}
{'bob': [{'id': 1, 'name': 'bob'}, {'id': 2, 'name': 'bob'}], 'peter': [{'id': 3, 'name': 'peter'}]}
```

### Islice
```python
islice([1, 2, 3], 1, None)
[2, 3]
```

### Ifilter/imap/izip
##### Filter, map and zip functions that return generators instead of iterators


Introspection and Metaprograming
--------------------------------
#### Inspecting code at runtime and code that generates code. You can:
* Look at the attributes
* Set new attributes
* Create functions dynamically
* Traverse the parent classes
* Change values in the class


```python
>>> class B:
...     def __init__(self):
...             self.a= 'sdfsd'
...             self.b = 123324
>>> b = B()
```

#### Getattr
```python
>>> getattr(b, 'a')
'sdfsd'
```

##### Is the same as

```python
B.__getattribute__(b, 'a')
```

#### Hasattr
```python
>>> hasattr(b, 'c')
False
```

#### Setattr
```python
>>> setattr(b, 'c', 10)
```

### Type
Type is the root class. If only passed the object it returns it's type.
Otherwise it creates new class (and not the instance!).
```python
type(class_name, parents<tuple>, attributes<dict>)
```

```python
>>> BB = type('B', (), {'a': 'sdfsd', 'b': 123324}
>>> b = BB()
```

### MetaClass
#### Classes that create classes.
```python
def my_meta_class(name, parents, attrs):
    # do stuff
    return type(name, parents, attrs)
```
##### or
```python
class MyMetaClass(type):
    def __new__(klass, name, parents, attrs):
        # do stuff
        return type.__new__(klass, name, parents, attrs)
```

### Metaclass Attr
When class is created it checks if it has metaclass defined. If not, it recursively checks if any of his parents has it defined, and eventually comes to type.
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
import matplotlib
matplotlib.pyplot.plot(<data> [, <data>])
matplotlib.pyplot.show()
matplotlib.pyplot.savefig(filename)
```

Web
---
```python
import bottle
```

### Run
```python
bottle.run(host='localhost', port=8080)
bottle.run(host='0.0.0.0', port=80, server='cherypy')
```

### Static request

### Dynamic request

### REST request


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
```

##### Gets char from int
```python
chr(<int>)
```

Profile
-------
```python
import timeit
timeit.timeit('"-".join(str(n) for n in range(100))', number=10000)
```
#### Generates a PNG image of call graph and highlights the bottlenecks.
```python
import pycallgraph
graph = pycallgraph.output.GraphvizOutput()
graph.output_file = get_file_name()
with pycallgraph.PyCallGraph(output=graph):
    <code_to_be_profiled>
```
##### Utility code for unique PNG filenames
```python
def get_file_name():
    return "{}-{}.png".format("profile", get_current_datetime_string())

def get_current_datetime_string():
    now = datetime.datetime.now()
    return get_datetime_string(now)

def get_datetime_string(a_datetime):
    return a_datetime.strftime('%Y%m%d%H%M%S')
```

Audio
-----
#### Saves list of floats of size 0 to 1 to a WAV file
```python
import wave, struct
frames = [struct.pack("%dh"%(1), int((a-0.5)*60000)) for a in <list>]
wf = wave.open(file_name, 'wb')
wf.setnchannels(1)
wf.setsampwidth(4)
wf.setframerate(44100)
wf.writeframes(b''.join(frames))
wf.close()
```







