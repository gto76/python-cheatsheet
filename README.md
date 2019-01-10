Comprehensive Python Cheatsheet
===============================
<sup>[Download text file](https://raw.githubusercontent.com/gto76/python-cheatsheet/master/README.md)
or [Fork me on GitHub](https://github.com/gto76/python-cheatsheet).
</sup>

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
<list> = <list>[from_inclusive : to_exclusive : step_size]
<list>.append(<el>)
<list>.extend(<collection>)
<list> += [<el>]
<list> += <collection>
```

```python
<list>.sort()
<list>.reverse()
<list> = sorted(<collection>)
<iter> = reversed(<list>)
```

```python
sum_of_elements  = sum(<collection>)
elementwise_sum  = [sum(pair) for pair in zip(list_a, list_b)]
sorted_by_second = sorted(<collection>, key=lambda el: el[1])
sorted_by_both   = sorted(<collection>, key=lambda el: (el[1], el[0]))
flattened_list   = list(itertools.chain.from_iterable(<list>))
list_of_chars    = list(<str>)
product_of_elems = functools.reduce(lambda out, x: out * x, <collection>)
no_duplicates    = list(dict.fromkeys(<list>))
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
<view> = <dict>.keys()
<view> = <dict>.values()
<view> = <dict>.items()
```

```python
value  = <dict>.get(key, default)            # Returns default if key does not exist.
value  = <dict>.setdefault(key, default)     # Same, but also adds default to dict.
<dict> = collections.defaultdict(<type>)     # Creates a dictionary with default value of type.
<dict> = collections.defaultdict(lambda: 1)  # Creates a dictionary with default value 1.
```

```python
<dict>.update(<dict>)                        # Or: dict_a = {**dict_a, **dict_b}.
<dict> = dict(<list>)                        # Initiates a dict from list of key-value pairs.
<dict> = dict(zip(keys, values))             # Initiates a dict from two lists.
<dict> = dict.fromkeys(keys [, value])       # Initiates a dict from list of keys.
```

```python
value = <dict>.pop(key)                         # Removes item from dictionary.
{k: v for k, v in <dict>.items() if k in keys}  # Filters dictionary by keys.
```

### Counter
```python
>>> from collections import Counter
>>> colors = ['blue', 'red', 'blue', 'yellow', 'blue', 'red']
>>> Counter(colors)
Counter({'blue': 3, 'red': 2, 'yellow': 1})
>>> <counter>.most_common()[0][0]
'blue'
```


Set
---
```python
<set> = set()
<set>.add(<el>)
<set>.update(<collection>)
<set> |= {<el>}
<set> |= <set>
```

```python
<set>  = <set>.union(<col>)                 # Or: <set> | <set>
<set>  = <set>.intersection(<col>)          # Or: <set> & <set>
<set>  = <set>.difference(<col>)            # Or: <set> - <set>
<set>  = <set>.symmetric_difference(<col>)  # Or: <set> ^ <set>
<bool> = <set>.issubset(<col>)              # Or: <set> < <set>
<bool> = <set>.issuperset(<col>)            # Or: <set> > <set>
```

### Frozenset
#### Is hashable and can be used as a key in dictionary.
```python
<frozenset> = frozenset(<collection>)
```


Range
-----
```python
range(to_exclusive)
range(from_inclusive, to_exclusive)
range(from_inclusive, to_exclusive, step_size)
range(from_inclusive, to_exclusive, -step_size)
```

```python
from_inclusive = <range>.start
to_exclusive   = <range>.stop
```


Enumerate
---------
```python
for i, <el> in enumerate(<collection> [, i_start]):
    ...
```


Named Tuple
-----------
```python
>>> Point = collections.namedtuple('Point', 'x y')
>>> p = Point(1, y=2)
Point(x=1, y=2)
>>> p[0]
1
>>> p.x
1
>>> getattr(p, 'y')
2
>>> p._fields  # Or: Point._fields
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
for line in iter(partial(input, 'Please enter value: '), ''):
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
>>> stepper = step(10, 2)
>>> next(stepper), next(stepper), next(stepper)
(10, 12, 14)
```


Type
----
```python
<type> = type(<el>)  # <class 'int'> / <class 'str'> / ...
```

```python
from numbers import Number, Integral, Real, Rational, Complex
is_number   = isinstance(<el>, Number)
is_function = callable(<el>)
```


String
------
```python
<str> = <str>.strip()           # Strips all whitespace characters.
<str> = <str>.strip('<chars>')  # Strips all passed characters.
```

```python
<list> = <str>.split()                       # Splits on any whitespace character.
<list> = <str>.split(sep=None, maxsplit=-1)  # Splits on 'sep' at most 'maxsplit' times.
<str>  = <str>.join(<list>)                  # Joins elements using string as separator.
```

```python
<str>  = <str>.replace(old_str, new_str)
<bool> = <str>.startswith(<sub_str>)      # Pass tuple of strings for multiple options.
<bool> = <str>.endswith(<sub_str>)        # Pass tuple of strings for multiple options.
<int>  = <str>.index(<sub_str>)           # Returns first index of a substring.
<bool> = <str>.isnumeric()                # True if str contains only numeric characters.
<list> = textwrap.wrap(<str>, width)      # Nicely breaks string into lines.
```

### Char
```python
<str> = chr(<int>)  # Converts int to unicode char.
<int> = ord(<str>)  # Converts unicode char to int.
```

```python
>>> ord('0'), ord('9')
(48, 57)
>>> ord('A'), ord('Z')
(65, 90)
>>> ord('a'), ord('z')
(97, 122)
```

### Print
```python
print(<el_1> [, <el_2>, end='', sep='', file=<file>])  # Use 'file=sys.stderr' for errors.
```

```python
>>> from pprint import pprint
>>> pprint(locals())
{'__doc__': None,
 '__name__': '__main__',
 '__package__': None, ...}
```


Regex
-----
```python
import re
<str>   = re.sub(<regex>, new, text, count=0)  # Substitutes all occurrences.
<list>  = re.findall(<regex>, text)
<list>  = re.split(<regex>, text, maxsplit=0)  # Use brackets in regex to keep the matches.
<Match> = re.search(<regex>, text)             # Searches for first occurrence of pattern.
<Match> = re.match(<regex>, text)              # Searches only at the beginning of the text.
<Match_iter> = re.finditer(<regex>, text)      # Searches for all occurrences of pattern.
```

* **Parameter `'flags=re.IGNORECASE'` can be used with all functions.**
* **Parameter `'flags=re.DOTALL'` makes dot also accept newline.**  
* **Use `r'\1'` or `'\\\\1'` for backreference.**  
* **Use `'?'` to make operators non-greedy.**   

### Match Object
```python
<str> = <Match>.group()   # Whole match.
<str> = <Match>.group(1)  # Part in first bracket.
<int> = <Match>.start()   # Start index of a match.
<int> = <Match>.end()     # Exclusive end index of a match.
```

### Special Sequences
**Use capital letter for negation.**
```python
'\d' == '[0-9]'          # Digit
'\s' == '[ \t\n\r\f\v]'  # Whitespace
'\w' == '[a-zA-Z0-9_]'   # Alphanumeric
```


Format
------
```python
<str> = f'{<el_1>}, {<el_2>}'
<str> = '{}, {}'.format(<el_1>, <el_2>)
```

```python
>>> Person = namedtuple('Person', 'name height')
>>> person = Person('Jean-Luc', 187)
>>> f'{person.height:10}'
'       187'
>>> '{p.height:10}'.format(p=person)
'       187'
```

### General Options
```python
{<el>:<10}   # '<el>      '
{<el>:>10}   # '      <el>'
{<el>:^10}   # '   <el>   '
{<el>:->10}  # '------<el>'
{<el>:>0}    # '<el>'
```

### String Options
**"!r" uses object's repr() method, instead of format(), to get a string:** 
```python
{'abcde'!r}      # "'abcde'"
```

```python
{'abcde':.3}     # 'abc'
{'abcde':10.3}   # 'abc       '
```

### Number Options
```python
{1.23456:.3f}    # '1.235'
{1.23456:10.3f}  # '     1.235'
```

```python
{123456:10,}     # '   123,456'
{123456:10_}     # '   123_456'
{123456:+10}     # '   +123456'
{-123456:=10}    # '-   123456'
{123456: }       # ' 123456'
{-123456: }      # '-123456'
```

```python
{65:c}           # 'A'
{3:08b}          # '00000011' -> Binary with leading zeros.
{3:0<8b}         # '11000000' -> Binary with trailing zeros.
```

#### Float presentation types:
* `'f'` - Fixed point: `.<precision>f`
* `'%'` - Percent: `.<precision>%`
* `'e'` - Exponent

#### Integer presentation types:
* `'c'` - Character
* `'b'` - Binary
* `'x'` - Hex
* `'X'` - HEX


Numbers
-------
### Basic Functions
```python
pow(x, y)   # Or: x ** y
abs(<num>)
round(<num> [, ndigits])
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
log(x [, base])  # Base e, if not specified.
log10(x)         # Base 10.
log2(x)          # Base 2.
```

### Infinity, nan
```python
from math import inf, nan, isinf, isnan
```

#### Or:
```python
float('inf'), float('nan')
```

### Random
```python
from random import random, randint, choice, shuffle
<float> = random()
<int>   = randint(from_inclusive, to_inclusive)
<el>    = choice(<list>)
shuffle(<list>)
```


Datetime
--------
```python
from datetime import datetime, strptime
now = datetime.now()
now.month                      # 3
now.strftime('%Y%m%d')         # '20180315'
now.strftime('%Y%m%d%H%M%S')   # '20180315002834'
<datetime> = strptime('2015-05-12 00:39', '%Y-%m-%d %H:%M')
```


Arguments
---------
**"*" is the splat operator, that takes a list as input, and expands it into actual positional arguments in the function call.**
```python
args   = (1, 2)
kwargs = {'x': 3, 'y': 4, 'z': 5}
func(*args, **kwargs)  
```

#### Is the same as:
```python
func(1, 2, x=3, y=4, z=5)
```

#### Splat operator can also be used in function declarations:
```python
def add(*a):
    return sum(a)
```

```python
>>> add(1, 2, 3)
6
```

#### And in few other places:
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
<list> = [i+1 for i in range(10)]         # [1, 2, ..., 10]
<set>  = {i for i in range(10) if i > 5}  # {6, 7, ..., 9}
<dict> = {i: i*2 for i in range(10)}      # {0: 0, 1: 2, ..., 9: 18}
<iter> = (i+5 for i in range(10))         # (5, 6, ..., 14)
```

```python
out = [i+j for i in range(10) for j in range(10)]
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
from functools import reduce
<iter>     = map(lambda x: x + 1, range(10))            # (1, 2, ..., 10)
<iter>     = filter(lambda x: x > 5, range(10))         # (6, 7, ..., 9)
<any_type> = reduce(lambda out, x: out + x, range(10))  # 45
```

### Any, All
```python
<bool> = any(el[1] for el in <collection>)
```

### If - Else
```python
<expression_if_true> if <condition> else <expression_if_false>
```

```python
>>> [a if a else 'zero' for a in (0, 1, 0, 3)]
['zero', 1, 'zero', 3]
```

### Namedtuple, Enum, Class
```python
from collections import namedtuple
Point = namedtuple('Point', 'x y')

from enum import Enum
Direction = Enum('Direction', 'n e s w')
Cutlery   = Enum('Cutlery', {'knife': 1, 'fork': 2, 'spoon': 3})

# Warning: Objects will share the objects that are initialized in the dictionary!
Creature = type('Creature', (), {'p': Point(0, 0), 'd': Direction.n})
creature = Creature()
```


Closure
-------
```python
def get_multiplier(a):
    def out(b):
        return a * b
    return out
```

```python
>>> multiply_by_3 = get_multiplier(3)
>>> multiply_by_3(10)
30
```

#### Or:
```python
from functools import partial
<function> = partial(<function>, <argument_1> [, <argument_2>, ...])
```

```python
>>> multiply_by_3 = partial(operator.mul, 3)
>>> multiply_by_3(10)
30
```


Decorator
---------
```python
@closure_name
def function_that_gets_passed_to_closure():
    ...
```

#### Debugger example:
```python
from functools import wraps

def debug(func):
    @wraps(func)  # Needed for metadata copying (func name, ...).
    def out(*args, **kwargs):
        print(func.__name__)
        return func(*args, **kwargs)
    return out

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
    def __str__(self):
        return str(self.a)
    def __repr__(self):
        return str({'a': self.a})  # Or: return f'{self.__dict__}'

    @classmethod
    def get_class_name(cls):
        return cls.__name__
```

### Constructor Overloading
```python
class <name>:
    def __init__(self, a=None):
        self.a = a
```

### Inheritance
```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age  = age

class Employee(Person):
    def __init__(self, name, age, staff_num):
        super().__init__(name, age)
        self.staff_num = staff_num
```

### Copy
```python
from copy import copy, deepcopy
<object> = copy(<object>)
<object> = deepcopy(<object>)
```


Enum
----
```python
from enum import Enum, auto
class <enum_name>(Enum):
    <member_name_1> = <value_1>  
    <member_name_2> = <value_2_a>, <value_2_b>
    <member_name_3> = auto()  # Can be used for automatic indexing.

    @classmethod
    def get_member_names(cls):
        return [a.name for a in cls.__members__.values()]
```

```python
<member>  = <enum>.<member_name>
<member>  = <enum>['<member_name>']
<member>  = <enum>(<value>)
<name>    = <member>.name
<value>   = <member>.value
```

```python
list_of_members = list(<enum>)
member_names    = [a.name for a in <enum>]
member_values   = [a.value for a in <enum>]
random_member   = random.choice(list(<enum>))
```

### Inline
```python
Cutlery = Enum('Cutlery', ['knife', 'fork', 'spoon'])
Cutlery = Enum('Cutlery', 'knife fork spoon')
Cutlery = Enum('Cutlery', {'knife': 1, 'fork': 2, 'spoon': 3})

# Functions can not be values, so they must be enclosed in tuple:
LogicOp = Enum('LogicOp', {'AND': (lambda l, r: l and r, ),
                           'OR' : (lambda l, r: l or r, )})

# But 'list(<enum>)' will only work if there is another value in the tuple:
LogicOp = Enum('LogicOp', {'AND': (auto(), lambda l, r: l and r),
                           'OR' : (auto(), lambda l, r: l or r)})
```


System
------
### Arguments
```python
import sys
script_name = sys.argv[0]
arguments   = sys.argv[1:]
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
from os import path, listdir
<bool> = path.exists(<path>)
<bool> = path.isfile(<path>)
<bool> = path.isdir(<path>)
<list> = listdir(<path>)
```

```python
>>> from glob import glob
>>> glob('../*.gif')
['1.gif', 'card.gif']
```

### Execute Command
```python
import os
<str> = os.popen(<command>).read()
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

### Recursion Limit
```python
>>> sys.getrecursionlimit()
1000
>>> sys.setrecursionlimit(10000)
```

JSON
----
```python
import json
```

### Serialization
```python
<str>  = json.dumps(<object>, ensure_ascii=True, indent=None)
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
    <tuple> = cursor.fetchone()  # First row.
    <list>  = cursor.fetchall()  # Remaining rows.
db.close()
```

### Write
```python
db.execute(<query>)
db.commit()
```


Pickle
------
```python
>>> import pickle
>>> favorite_color = {'lion': 'yellow', 'kitty': 'red'}
>>> pickle.dump(favorite_color, open('data.p', 'wb'))
>>> pickle.load(open('data.p', 'rb'))
{'lion': 'yellow', 'kitty': 'red'}
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

#### Raising exception:
```python
raise ValueError('A very specific message!')
```

### Finally
```python
>>> try:
...     raise KeyboardInterrupt
... finally:
...     print('Goodbye, world!')
Goodbye, world!
Traceback (most recent call last):
  File "<stdin>", line 2, in <module>
KeyboardInterrupt
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
**This module performs conversions between Python values and C struct represented as Python Bytes object.**
```python
from struct import pack, unpack
<Bytes> = pack('<format>', <value_1> [, <value_2>, ...])
<tuple> = unpack('<format>', <Bytes>)
```

### Example
```python
>>> pack('hhl', 1, 2, 3)
b'\x00\x01\x00\x02\x00\x00\x00\x03'
>>> unpack('hhl', b'\x00\x01\x00\x02\x00\x00\x00\x03')
(1, 2, 3)
>>> calcsize('hhl')
8
```

### Format
**Use capital leters for unsigned type.** 
* `'x'` - pad byte
* `'c'` - char
* `'h'` - short
* `'i'` - int
* `'l'` - long
* `'q'` - long long
* `'f'` - float
* `'d'` - double


Hashlib
-------
```python
>>> hashlib.md5(<str>.encode()).hexdigest()
'33d0eba106da4d3ebca17fcd3f4c3d77'
```


Threading
---------
```python
from threading import Thread, RLock
```

### Thread
```python
thread = Thread(target=<function>, args=(<first_arg>, ))
thread.start()
...
thread.join()
```

### Lock
```python
lock = Rlock()
lock.acquire()
...
lock.release()
```


Itertools
---------
**Every function returns an iterator and can accept any collection and/or iterator. If you want to print the iterator, you need to pass it to the list() function.**

```python
from itertools import *
```

### Combinatoric iterators
```python
>>> combinations('abc', 2)
[('a', 'b'), ('a', 'c'), ('b', 'c')]

>>> combinations_with_replacement('abc', 2)
[('a', 'a'), ('a', 'b'), ('a', 'c'), 
 ('b', 'b'), ('b', 'c'), 
 ('c', 'c')]

>>> permutations('abc', 2)
[('a', 'b'), ('a', 'c'), 
 ('b', 'a'), ('b', 'c'), 
 ('c', 'a'), ('c', 'b')]

>>> product('ab', [1, 2])
[('a', 1), ('a', 2), 
 ('b', 1), ('b', 2)]

>>> product([0, 1], repeat=3)
[(0, 0, 0), (0, 0, 1), (0, 1, 0), (0, 1, 1), 
 (1, 0, 0), (1, 0, 1), (1, 1, 0), (1, 1, 1)]
```

### Infinite iterators
```python
>>> i = count(5, 2)
>>> next(i), next(i), next(i)
(5, 7, 9)

>>> a = cycle('abc')
>>> [next(a) for _ in range(10)]
['a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a']

>>> repeat(10, 3)
[10, 10, 10]
```

### Iterators
```python
>>> chain([1, 2], range(3, 5))
[1, 2, 3, 4]

>>> compress('abc', [True, 0, 1])
['a', 'c']

>>> islice([1, 2, 3], 1, None)  # islice(<seq>, from_inclusive, to_exclusive) 
[2, 3]

>>> people = [{'id': 1, 'name': 'Bob'}, 
              {'id': 2, 'name': 'Bob'}, 
              {'id': 3, 'name': 'Peter'}]
>>> groups = groupby(people, key=lambda a: a['name'])
>>> {name: list(group) for name, group in groups}
{'Bob':   [{'id': 1, 'name': 'Bob'}, 
           {'id': 2, 'name': 'Bob'}], 
 'Peter': [{'id': 3, 'name': 'Peter'}]}
```


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
<list> = dir()      # In-scope variables.
<dict> = locals()   # Local variables.
<dict> = globals()  # Global variables.
```

### Attributes
```python
>>> class Z:
...     def __init__(self):
...         self.a = 'abcde'
...         self.b = 12345
>>> z = Z()
```

```python
>>> vars(z)
{'a': 'abcde', 'b': 12345}

>>> getattr(z, 'a')
'abcde'

>>> hasattr(z, 'c')
False

>>> setattr(z, 'c', 10)
```

### Parameters
#### Getting the number of parameters of a function:
```python
from inspect import signature
sig          = signature(<function>)
no_of_params = len(sig.parameters)
```

### Type
**Type is the root class. If only passed the object it returns it's type. Otherwise it creates a new class (and not the instance!):**
```python
type(<class_name>, <parents_tuple>, <attributes_dict>)
```

```python
>>> Z = type('Z', (), {'a': 'abcde', 'b': 12345})
>>> z = Z()
```

### Meta Class
#### Class that creates class.
```python
def my_meta_class(name, parents, attrs):
    attrs['a'] = 1
    return type(name, parents, attrs)
```

#### Or:
```python
class MyMetaClass(type):
    def __new__(klass, name, parents, attrs):
        attrs['a'] = 1
        return type.__new__(klass, name, parents, attrs)
```

### Metaclass Attribute
**When class is created it checks if it has metaclass defined. If not, it recursively checks if any of his parents has it defined and eventually comes to type.**
```python
class MyClass(metaclass=MyMetaClass):
    def __init__(self):
        self.b = 2
```


Operator
--------
```python
from operator import add, sub, mul, truediv, floordiv, mod, pow, neg, abs, \
                     eq, ne, lt, le, gt, ge, \
                     not_, and_, or_, \
                     itemgetter
```

```python
import operator as op
product_of_elems = functools.reduce(op.mul, <list>)
sorted_by_second = sorted(<list>, key=op.itemgetter(1))
sorted_by_both   = sorted(<list>, key=op.itemgetter(1, 0))
LogicOp          = enum.Enum('LogicOp', {'AND': op.and_,
                                         'OR' : op.or_})
```


Eval
----
### Basic
```python
>>> from ast import literal_eval
>>> literal_eval('1 + 2')
3
>>> literal_eval('[1, 2, 3]')
[1, 2, 3]
>>> ast.literal_eval('abs(-1)')
ValueError: malformed node or string
```

### Using Abstract Syntax Trees
```python
import ast
from ast import Num, BinOp, UnaryOp
import operator as op

legal_operators = {ast.Add:    op.add, 
                   ast.Sub:    op.sub, 
                   ast.Mult:   op.mul,
                   ast.Div:    op.truediv, 
                   ast.Pow:    op.pow, 
                   ast.BitXor: op.xor,
                   ast.USub:   op.neg}

def evaluate(expression):
    root = ast.parse(expression, mode='eval')
    return eval_node(root.body)

def eval_node(node):
    node_type = type(node)
    if node_type == Num:
        return node.n
    if node_type not in [BinOp, UnaryOp]:
        raise TypeError(node)
    operator_type = type(node.op)
    if operator_type not in legal_operators:
        raise TypeError(f'Illegal operator {node.op}')
    operator = legal_operators[operator_type]
    if node_type == BinOp:
        left, right = eval_node(node.left), eval_node(node.right)
        return operator(left, right)
    elif node_type == UnaryOp:
        operand = eval_node(node.operand)
        return operator(operand)
```

```python
>>> evaluate('2 ^ 6')
4
>>> evaluate('2 ** 6')
64
>>> evaluate('1 + 2 * 3 ** (4 ^ 5) / (6 + -7)')
-5.0
```


Coroutine
---------
* **Similar to Generator, but Generator pulls data through the pipe with iteration, while Coroutine pushes data into the pipeline with send().**  
* **Coroutines provide more powerful data routing possibilities than iterators.**  
* **If you built a collection of simple data processing components, you can glue them together into complex arrangements of pipes, branches, merging, etc.**  

### Helper Decorator
* **All coroutines must be "primed" by first calling next().**  
* **Remembering to call next() is easy to forget.**  
* **Solved by wrapping coroutines with a decorator:**  

```python
def coroutine(func):
    def out(*args, **kwargs):
        cr = func(*args, **kwargs)
        next(cr)
        return cr
    return out
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

reader(adder(printer()))  # 100, 101, ..., 109
```

<br><br>

Libraries
=========

Plot
----
```python
# $ pip3 install matplotlib
from matplotlib import pyplot
pyplot.plot(<data_1> [, <data_2>, ...])
pyplot.savefig(<filename>, transparent=True)
pyplot.show()
```


Progress Bar
------------
```python
# $ pip3 install tqdm
from tqdm import tqdm
from time import sleep
for i in tqdm(range(100)):
    sleep(0.02)
for i in tqdm([1, 2, 3]):
    sleep(0.2)
```


Table
-----
#### Prints CSV file as ASCII table:
```python
# $ pip3 install tabulate
from csv import reader
from tabulate import tabulate
with open(<filename>, newline='') as csv_file:
    reader = reader(csv_file, delimiter=';')
    headers = [a.title() for a in next(reader)]
    print(tabulate(reader, headers))
```


Curses
------
```python
# $ pip3 install curses
from curses import wrapper

def main():
    wrapper(draw)

def draw(screen):
    screen.clear()
    screen.addstr(0, 0, 'Press ESC to quit.')
    while screen.getch() != 27:
        pass

def get_border(screen):
    from collections import namedtuple
    P = namedtuple('P', 'x y')
    height, width = screen.getmaxyx()
    return P(width - 1, height - 1)
```


Image
-----
#### Creates PNG image of greyscale gradient:
```python
# $ pip3 install pillow
from PIL import Image
width, height = 100, 100
img = Image.new('L', (width, height), 'white')
img.putdata([255*a/(width*height) for a in range(width*height)])
img.save('out.png')
```

### Modes
* `'1'` - 1-bit pixels, black and white, stored with one pixel per byte.
* `'L'` - 8-bit pixels, greyscale.
* `'RGB'` - 3x8-bit pixels, true color.
* `'RGBA'` - 4x8-bit pixels, true color with transparency mask.
* `'HSV'` - 3x8-bit pixels, Hue, Saturation, Value color space.


Audio
-----
#### Saves a list of floats with values between 0 and 1 to a WAV file:
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


Url
---
```python
from urllib.parse import quote, quote_plus, unquote, unquote_plus
```

### Encode
```python
>>> quote("Can't be in URL!")
'Can%27t%20be%20in%20URL%21'
>>> quote_plus("Can't be in URL!")
'Can%27t+be+in+URL%21'
```

### Decode
```python
>>> unquote('Can%27t+be+in+URL%21')
"Can't+be+in+URL!"'
>>> unquote_plus('Can%27t+be+in+URL%21')
"Can't be in URL!"
```


Scraping
--------
```python
# $ pip3 install requests beautifulsoup4
>>> import requests
>>> from bs4 import BeautifulSoup
>>> url      = 'https://en.wikipedia.org/wiki/Python_(programming_language)'
>>> page     = requests.get(url)
>>> document = BeautifulSoup(page.text, 'html.parser')
>>> table    = document.find('table', class_='infobox vevent')
>>> rows     = table.find_all('tr')
>>> website  = rows[11].find('a')['href']
'https://www.python.org/'
>>> latest_v = rows[6].find('div').text.split()[0]
'3.7.2'
```


Web
---
```python
# $ pip3 install bottle
import bottle
from urllib.parse import unquote
```

### Run
```python
bottle.run(host='localhost', port=8080)
bottle.run(host='0.0.0.0', port=80, server='cherrypy')
```

### Static Request
```python
@route('/img/<image>')
def send_image(image):
    return static_file(image, 'images/', mimetype='image/png')
```

### Dynamic Request
```python
@route('/<sport>')
def send_page(sport):
    sport = unquote(sport).lower()
    page = read_file(sport)
    return template(page)
```

### REST Request
```python
@post('/odds/<sport>')
def odds_handler(sport):
    team = bottle.request.forms.get('team')
    team = unquote(team).lower()

    db = sqlite3.connect(<db_path>)
    home_odds, away_odds = get_odds(db, sport, team)
    db.close()

    response.headers['Content-Type'] = 'application/json'
    response.headers['Cache-Control'] = 'no-cache'
    return json.dumps([home_odds, away_odds])
```


Profile
-------
### Basic
```python
from time import time
start_time = time()
...
duration = time() - start_time
```

### Timing a Snippet
```python
from timeit import timeit
timeit('"-".join(str(a) for a in range(100))', 
       number=10000, globals=globals(), setup='pass')
```

### Line Profiler
```python
# $ pip3 install line_profiler
@profile
def main():
    a = [*range(10000)]
    b = {*range(10000)}
main()
```

```
$ kernprof -lv test.py
Line #      Hits         Time  Per Hit   % Time  Line Contents
==============================================================
     1                                           @profile
     2                                           def main():
     3         1       1128.0   1128.0     27.4      a = [*range(10000)]
     4         1       2994.0   2994.0     72.6      b = {*range(10000)}
```

### Call Graph
#### Generates a PNG image of call graph with highlighted bottlenecks.
```python
# $ pip3 install pycallgraph
from pycallgraph import output, PyCallGraph
from datetime import datetime
graph = output.GraphvizOutput()
time_str = datetime.now().strftime('%Y%m%d%H%M%S')
graph.output_file = f'profile-{time_str}.png'
with PyCallGraph(output=graph):
    <code_to_be_profiled>
```


NumPy
-----
**Array manipulation mini language. Can run up to 100 times faster than equivalent Python code.**
```python
# $ pip3 install numpy
import numpy as np
```

```python
<array> = np.array(<list>)
<array> = np.arange(from_inclusive, to_exclusive, step)
<array> = np.ones(<shape>)
<array> = np.random.randint(from_inclusive, to_exclusive, <shape>)
```

```python
value = <array>.min([axis])
index = <array>.argmin([axis])
```

```python
<view>  = <array>.reshape(<shape>)
<view>  = np.broadcast_to(<array>, <shape>)
<array> = <array>[filter_expression]
```

### Broadcasting
**Broadcasting is a set of rules by which NumPy functions operate on arrays of different sizes and/or dimensions:**
```python
left  = [[0.1], [0.6], [0.8]]   # Shape: (3, 1)
right = [ 0.1 ,  0.6 ,  0.8 ]   # Shape: (3)
```
**1. If array shapes differ, left-pad the smaller shape with ones.**
```python
left  = [[0.1], [0.6], [0.8]]   # Shape: (3, 1)
right = [[0.1 ,  0.6 ,  0.8]]   # Shape: (1, 3) <- !
```
**2. If any dimensions differ in size, expand the ones that have size 1 by duplicating their elements.**
```python
left  = [[0.1, 0.1, 0.1], [0.6, 0.6, 0.6], [0.8, 0.8, 0.8]]  # Shape: (3, 3) <- !
right = [[0.1, 0.6, 0.8], [0.1, 0.6, 0.8], [0.1, 0.6, 0.8]]  # Shape: (3, 3) <- !
```
**3. If neither non-matching dimension has size 1, rise an error.**

### Example
**For each point returns index of its nearest point: `[0.1, 0.6, 0.8] => [1, 2, 1]`.**
```python
>>> points = np.array([0.1, 0.6, 0.8])
array([ 0.1,  0.6,  0.8])
>>> wrapped_points = points.reshape(3, 1)
array([[ 0.1],
       [ 0.6],
       [ 0.8]])
>>> distances = wrapped_points - points
array([[ 0. , -0.5, -0.7],
       [ 0.5,  0. , -0.2],
       [ 0.7,  0.2,  0. ]])
>>> distances = np.abs(distances)
array([[ 0. ,  0.5,  0.7],
       [ 0.5,  0. ,  0.2],
       [ 0.7,  0.2,  0. ]])
>>> i = np.arange(3)
array([0, 1, 2])
>>> distances[i, i] = np.inf
array([[ inf,  0.5,  0.7],
       [ 0.5,  inf,  0.2],
       [ 0.7,  0.2,  inf]])
>>> distances.argmin(1)
array([1, 2, 1])
```


Basic Script Template
---------------------
```python
#!/usr/bin/env python3
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
