Python and Libraries Cheatsheet
===============================

Main
----
```
if __name__ == '__main__':
    main()
```


List
----
```
<list>[<inclusive from>:<exclusive to>:<step size>]
<list>.extend(<list>)
<list>.sort()
<list>.reverse()
sum(<list>)
sorted_by_second = sorted(<list>, key=lambda tup: tup[1])
```

Dictionary
----------
<dict>.items()
<dict>.get(<key>, <default>)
<dict>.setdefault(<key>, <default>)
<dict>.update(<dict>)
```

Set
---
```
<set> = set()
<set>.add(<el>)
<set>.update(<set>)
<set>.union(<set>)
<set>.intersection(<set>)
<set>.difference(<set>)
```

Range
-----
```
range(<to exclusive>)
range(<from inclusive>, <to exclusive>)
range(<from inclusive>, <to exclusive>, <step size>)  # Negative step for backward
```

Enumerate
---------
```
for i, <el> in enumerate(<list>)
```


Type
----
```
type(<el>) is int/str/set/list
```
```
import numbers
isinstance(<el>, numbers.Number)
```


String
------
```
str.replace(<text>, <old>, <new>)
<str>.isnumeric()
<str>.split()
<str>.strip()
'<str>'.join(<list>)
```

### Print
```
print(<el1>, <el2>, end='', sep='', file=<file>)
```

### Regex
```
import re
re.sub(<regex>, <new>, <text>)
re.search(<regex>, <text>)
```

### Format
```
'{}'.format(<el>)
```

```
{:<min width>}  -> '<el>    '
{:><min width>} -> '    <el>'
{:^<min width>} -> '  <el>  '
{:_<min width>}  -> '<el>____'
{:.<max width>} -> '<e>'
{:<max widht>.<min width>} -> '    <e>'
{:<max width>.<no of decimals>f} -> '  3.14'
```

### Text Wrap
```
import textwrap
textwrap.wrap(<text>, <width>)
```


Random
------
```
import random
random.random()
random.randint(<from inclusive>, <to inclusive>)
random.shuffle(<list>)
```

Infinity
--------
```
float("inf")
```

Datetime
--------
```
import datetime
now = datetime.datetime.now()
now.strftime('%Y%m%d')
now.strftime('%Y%m%d%H%M%S')
```


Inline
------
### Lambda
```
lambda <arg1>, <arg2>: <return value>
lambda: <return value>
```

### Comprehension
```
[i+1 for i in range(10)]
[i for i in range(10) if i>5]
[i+j for i in range(10) for j in range(10)]
{i: i*2 for i in range(10)}
(x+5 for x in range(0, 10)) - generator!
```

### Map, Filter, Reduce
```
A. map(lambda x: x+1, range(10))
B. filter(lambda x: x>5, range(10))
functools.reduce(combining_function, list_of_inputs)
```


Closure
-------
```
def mult_clos(x):
    def wrapped(y):
            return x * y
    return wrapped

mul_by_3 = mult_clos(3)
```


Decorator
---------
```
@closure_name
def function_that_gets_passed_to_closure():
    ...
```


Generator
---------
```
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
```
class <name>:
    def __init__(self, <arg>):
        self.a = <arg>
    def __repr__(self):
        return str({'a': self.a})
    def __str__(self):
        return str(self.a)
```

### Enum
----
```
import enum
class <name>(enum.Enum):
    <value> = <index>
```

### Copy
```
import copy
copy.copy(<object>)
copy.deepcopy(<object>)
```


System
------

### Arguments
```
import sys
sys.argv
```

### Read File
```
with open(<filename>, encoding='utf-8') as file:
    return file.readlines()
```

### Write to File
```
with open(<filename>, 'w', enconding='utf-8') as file:
    file.write(<text>)
```

### Execute Command
```
import os
os.popen(<command>).read()
```

### Input
```
filename = input('Enter a file name: ')
```


JSON
----
```
import json
```

### Read File
```
with open(<filename>, encoding='utf-8') as file:
    return json.load(file)
```

### Write to File
```
with open(<filename>, 'w', enconding='utf-8') as file:
    file.write(json.dumps(<object>))
```



SQLite
------
```
import sqlite3
db = sqlite3.connect(<filename>)
```

### Read
```
cursor = db.execute(<query>)
if cursor:
    cursor.<fetchone/fetchall>()
db.close()
```

### Write
```
db.execute(<query>)
db.commit()
```


Threading
---------
```
import threading
```

### Thread
```
thread = threading.Thread(target=<function>, args=(<first arg>, ))
thread.start()
thread.join()
```

### Lock
```
lock = threading.Rlock()
lock.acquire()
lock.release()
```


Itertools
---------
Every function returns an generator and can accept any collection.
All examples should be passed to list() to get the output.

```
from itertools import *
```

### Chain
```
>>> chain([1,2], range(3,5))
[1, 2, 3, 4]
```

### Combinations
```
>>> combinations("abc", 2)
[('a', 'b'), ('a', 'c'), ('b', 'c')]
```

### Permutations
```
>>> permutations("abc", 2)
[('a', 'b'), ('a', 'c'), ('b', 'a'), ('b', 'c'), ('c', 'a'), ('c', 'b')]
```

### Compress
```
>>> compress("abc", [True, 0, 23])
['a', 'c']
```

### Count
```
>>> a = count(5, 2)
>>> next(a), next(a)
(5, 7)
```

### Cycle
```
>>> a = cycle("abc")
>>> [next(a) for _ in range(10)]
['a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a']
```

### Groupby
```
>>> {k: list(v) for k, v in groupby("aabbbc")}
{'a': ['a', 'a'], 'b': ['b', 'b', 'b'], 'c': ['c']}
```

```
>>> a = [{"id": 1, "name": "bob"}, {"id": 2, "name": "bob"}, {"id": 3, "name": "peter"}]
>>> {k: list(v) for k, v in groupby(a, key=lambda x: x["name"])}
{'bob': [{'id': 1, 'name': 'bob'}, {'id': 2, 'name': 'bob'}], 'peter': [{'id': 3, 'name': 'peter'}]}
```

### Product
```
>>> list(product('ab', [1,2]))
[('a', 1), ('a', 2), ('b', 1), ('b', 2)]
```

### ifilter/imap/izip
Filter, map and zip functions that return generators instead of iterators


Introspection and Metaprograming
--------------------------------
Inspecting code at runetime and code that generates code.

```
>>> class B:
...     def __init__(self):
...             self.a= 'sdfsd'
...             self.b = 123324
>>> b = B()
```

### Getattr
```
>>> getattr(b, 'a')
'sdfsd'
```

### Hasattr
```
>>> hasattr(b, 'c')
False
```

### Setattr
```
>>> setattr(b, 'c', 10)
```

Type
----
Type is the root class. If only passed the object it returns it's type.
Otherwise it creates new class (and not the instance!).
```
type(class_name, parents[tuple], attributes[dict])
```

```
BB = type('B', (), {'a': 'sdfsd', 'b': 123324}
b = BB()
```

MetaClass
---------
Classes that creates classes.
```
def my_meta_class(name, parents, attrs):
    ... do stuff
    return type(name, parents, attrs)
```
or
```
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
```
class BlaBla:
    __metaclass__ = Bla
```















