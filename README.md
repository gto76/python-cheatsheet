Python and Libraries Cheatsheet
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
<list>[<inclusive from>:<exclusive to>:<step size>]
<list>.extend(<list>)
<list>.sort()
<list>.reverse()
sum(<list>)
sorted_by_second = sorted(<list>, key=lambda tup: tup[1])
```

Dictionary
----------
```python
<dict>.items()
<dict>.get(<key>, <default>)
<dict>.setdefault(<key>, <default>)
<dict>.update(<dict>)
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
```

Range
-----
```python
range(<to exclusive>)
range(<from inclusive>, <to exclusive>)
range(<from inclusive>, <to exclusive>, <step size>)  # Negative step for backward
```

Enumerate
---------
```python
for i, <el> in enumerate(<list>)
```


Type
----
```python
type(<el>) is int/str/set/list
```
```python
import numbers
isinstance(<el>, numbers.Number)
```


String
------
```python
str.replace(<text>, <old>, <new>)
<str>.isnumeric()
<str>.split()
<str>.strip()
'<str>'.join(<list>)
```

### Print
```python
print(<el1>, <el2>, end='', sep='', file=<file>)
```

### Regex
```python
import re
re.sub(<regex>, <new>, <text>)
re.search(<regex>, <text>)
```

### Format
```python
'{}'.format(<el>)
```

```python
{:<min width>}  -> '<el>    '
{:><min width>} -> '    <el>'
{:^<min width>} -> '  <el>  '
{:_<min width>}  -> '<el>____'
{:.<max width>} -> '<e>'
{:<max widht>.<min width>} -> '    <e>'
{:<max width>.<no of decimals>f} -> '  3.14'
```

### Text Wrap
```python
import textwrap
textwrap.wrap(<text>, <width>)
```


Random
------
```python
import random
random.random()
random.randint(<from inclusive>, <to inclusive>)
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


Inline
------
### Lambda
```python
lambda <arg1>, <arg2>: <return value>
lambda: <return value>
```

### Comprehension
```python
[i+1 for i in range(10)]
[i for i in range(10) if i>5]
[i+j for i in range(10) for j in range(10)]
{i: i*2 for i in range(10)}
(x+5 for x in range(0, 10)) - generator!
```

### Map, Filter, Reduce
```python
A. map(lambda x: x+1, range(10))
B. filter(lambda x: x>5, range(10))
functools.reduce(combining_function, list_of_inputs)
```


Closure
-------
```python
def mult_clos(x):
    def wrapped(y):
            return x * y
    return wrapped

mul_by_3 = mult_clos(3)
```


Decorator
---------
```python
@closure_name
def function_that_gets_passed_to_closure():
    ...
```


Generator
---------
```python
def step(start, step):
    while True:
        yield start
        start += step

stepper = step(10, 2)
next(stepper)
```


Class
-----
### Class
```python
class <name>:
    def __init__(self, <arg>):
        self.a = <arg>
    def __repr__(self):
        return str({'a': self.a})
    def __str__(self):
        return str(self.a)
```

### Enum
```python
import enum
class <name>(enum.Enum):
    <value> = <index>
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
with open(<filename>, encoding='utf-8') as file:
    return file.readlines()
```

### Write to File
```python
with open(<filename>, 'w', enconding='utf-8') as file:
    file.write(<text>)
```

### Execute Command
```python
import os
os.popen(<command>).read()
```

### Input
```python
filename = input('Enter a file name: ')
```


JSON
----
```python
import json
```

### Read File
```python
with open(<filename>, encoding='utf-8') as file:
    return json.load(file)
```

### Write to File
```python
with open(<filename>, 'w', enconding='utf-8') as file:
    file.write(json.dumps(<object>))
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
    cursor.<fetchone/fetchall>()
db.close()
```

### Write
```python
db.execute(<query>)
db.commit()
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
Every function returns an generator and can accept any collection.
All examples should be passed to list() to get the output.

```python
from itertools import *
```

### Chain
```python
>>> chain([1,2], range(3,5))
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

### Product
```python
>>> list(product('ab', [1,2]))
[('a', 1), ('a', 2), ('b', 1), ('b', 2)]
```

### ifilter/imap/izip
Filter, map and zip functions that return generators instead of iterators


Introspection and Metaprograming
--------------------------------
Inspecting code at runetime and code that generates code.

```python
>>> class B:
...     def __init__(self):
...             self.a= 'sdfsd'
...             self.b = 123324
>>> b = B()
```

### Getattr
```python
>>> getattr(b, 'a')
'sdfsd'
```

### Hasattr
```python
>>> hasattr(b, 'c')
False
```

### Setattr
```python
>>> setattr(b, 'c', 10)
```

Type
----
Type is the root class. If only passed the object it returns it's type.
Otherwise it creates new class (and not the instance!).
```python
type(class_name, parents[tuple], attributes[dict])
```

```python
BB = type('B', (), {'a': 'sdfsd', 'b': 123324}
b = BB()
```

MetaClass
---------
Classes that creates classes.
```python
def my_meta_class(name, parents, attrs):
    ... do stuff
    return type(name, parents, attrs)
```
or
```python
class MyMetaClass(type):
    def __new__(klass, name, parents, attrs):
        ... do stuff
        return type.__new__(klass, name, parents, attrs)
```

Do Stuff
--------
* Look at the attributes
* Set new attributes
* Create functions dynamically
* Traverse the parent classes
* Change values in the class

Metaclass Attr
--------------
When class is created it checks if it has metaclass defined. If not, it recursively checks if any of his parents has it defined, and eventually comes to type.
```python
class BlaBla:
    __metaclass__ = Bla
```















