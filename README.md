Comprehensive Python Cheatsheet
===============================
<sup>[Download text file](https://raw.githubusercontent.com/gto76/python-cheatsheet/main/README.md), [Fork me on GitHub](https://github.com/gto76/python-cheatsheet) or [Check out FAQ](https://github.com/gto76/python-cheatsheet/wiki/Frequently-Asked-Questions).
</sup>

![Monty Python](web/image_888.jpeg)


Contents
--------
**&nbsp;&nbsp;&nbsp;** **1. Collections:** **&nbsp;** **[`List`](#list)**__,__ **[`Dictionary`](#dictionary)**__,__ **[`Set`](#set)**__,__ **[`Tuple`](#tuple)**__,__ **[`Range`](#range)**__,__ **[`Enumerate`](#enumerate)**__,__ **[`Iterator`](#iterator)**__,__ **[`Generator`](#generator)**__.__  
**&nbsp;&nbsp;&nbsp;** **2. Types:** **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**  **[`Type`](#type)**__,__ **[`String`](#string)**__,__ **[`Regular_Exp`](#regex)**__,__ **[`Format`](#format)**__,__ **[`Numbers`](#numbers-1)**__,__ **[`Combinatorics`](#combinatorics)**__,__ **[`Datetime`](#datetime)**__.__  
**&nbsp;&nbsp;&nbsp;** **3. Syntax:** **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**  **[`Function`](#function)**__,__ **[`Inline`](#inline)**__,__ **[`Import`](#imports)**__,__ **[`Decorator`](#decorator)**__,__ **[`Class`](#class)**__,__ **[`Duck_Type`](#duck-types)**__,__ **[`Enum`](#enum)**__,__ **[`Except`](#exceptions)**__.__  
**&nbsp;&nbsp;&nbsp;** **4. System:** **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**  **[`Exit`](#exit)**__,__ **[`Print`](#print)**__,__ **[`Input`](#input)**__,__ **[`Command_Line_Arguments`](#command-line-arguments)**__,__ **[`Open`](#open)**__,__ **[`Path`](#paths)**__,__ **[`OS_Commands`](#os-commands)**__.__  
**&nbsp;&nbsp;&nbsp;** **5. Data:** **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**  **[`JSON`](#json)**__,__ **[`Pickle`](#pickle)**__,__ **[`CSV`](#csv)**__,__ **[`SQLite`](#sqlite)**__,__ **[`Bytes`](#bytes)**__,__ **[`Struct`](#struct)**__,__ **[`Array`](#array)**__,__ **[`Memory_View`](#memory-view)**__,__ **[`Deque`](#deque)**__.__  
**&nbsp;&nbsp;&nbsp;** **6. Advanced:** **&nbsp;&nbsp;&nbsp;**  **[`Operator`](#operator)**__,__ **[`Match_Stmt`](#match-statement)**__,__ **[`Logging`](#logging)**__,__ **[`Introspection`](#introspection)**__,__ **[`Threading`](#threading)**__,__ **[`Coroutines`](#coroutines)**__.__  
**&nbsp;&nbsp;&nbsp;** **7. Libraries:** **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**  **[`Progress_Bar`](#progress-bar)**__,__ **[`Plot`](#plot)**__,__ **[`Table`](#table)**__,__ **[`Console_App`](#console-app)**__,__ **[`GUI`](#gui-app)**__,__ **[`Scraping`](#scraping)**__,__ **[`Web`](#web-app)**__,__ **[`Profile`](#profiling)**__.__  
**&nbsp;&nbsp;&nbsp;** **8. Multimedia:** **&nbsp;&nbsp;**  **[`NumPy`](#numpy)**__,__ **[`Image`](#image)**__,__ **[`Animation`](#animation)**__,__ **[`Audio`](#audio)**__,__ **[`Synthesizer`](#synthesizer)**__,__ **[`Pygame`](#pygame)**__,__ **[`Pandas`](#pandas)**__,__ **[`Plotly`](#plotly)**__.__


Main
----
```python
if __name__ == '__main__':      # Skips indented lines of code if file was imported.
    main()                      # Executes user-defined `def main(): ...` function.
```


List
----
```python
<list> = [<el_1>, <el_2>, ...]  # Creates new list object. E.g. `list_a = [1, 2, 3]`.
```

```python
<el>   = <list>[index]          # First index is 0, last -1. Also `<list>[i] = <el>`.
<list> = <list>[<slice>]        # Also <list>[from_inclusive : to_exclusive : ±step].
```

```python
<list>.append(<el>)             # Appends element to the end. Also `<list> += [<el>]`.
<list>.extend(<collection>)     # Appends multiple elements. Also `<list> += <coll>`.
```

```python
<list>.sort(reverse=False)      # Sorts the elements of the list in ascending order.
<list>.reverse()                # Reverses the order of elements. Takes linear time.
<list> = sorted(<collection>)   # Returns a new sorted list. Accepts `reverse=True`.
<iter> = reversed(<list>)       # Returns reversed iterator. Also list(<iterator>).
```

```python
<el>  = max(<collection>)       # Returns the largest element. Also min(<el_1>, ...).
<num> = sum(<collection>)       # Returns a sum of elements. Also math.prod(<coll>).
```

```python
elementwise_sum  = [sum(pair) for pair in zip(list_a, list_b)]
sorted_by_second = sorted(<collection>, key=lambda el: el[1])
sorted_by_both   = sorted(<collection>, key=lambda el: (el[1], el[0]))
flatter_list     = list(itertools.chain.from_iterable(<list>))
```
* **For details about sort(), sorted(), min() and max() see [Sortable](#sortable).**
* **Module [operator](#operator) has function itemgetter() that can replace listed [lambdas](#lambda).**
* **This text uses the term collection instead of [iterable](#abstract-base-classes). For rationale see [duck types](#collection).**

```python
<int> = len(<list/dict/set/…>)  # Returns number of items. Doesn't accept iterators.
<int> = <list>.count(<el>)      # Counts occurrences. Also `if <el> in <coll>: ...`.
<int> = <list>.index(<el>)      # Returns index of first occ. or raises ValueError.
<el>  = <list>.pop()            # Removes item from the end (or at index if passed).
<list>.insert(<int>, <el>)      # Inserts item at index and shifts remaining items.
<list>.remove(<el>)             # Removes the first occurrence or raises ValueError.
<list>.clear()                  # Removes all items. Also provided by dict and set.
```


Dictionary
----------
```python
<dict> = {key_1: val_1, key_2: val_2, ...}      # Use `<dict>[key]` to get or assign the value.
```

```python
<view> = <dict>.keys()                          # A collection of keys that reflects changes.
<view> = <dict>.values()                        # A collection of values that reflects changes.
<view> = <dict>.items()                         # Coll. of key-value tuples that reflects chgs.
```

```python
value  = <dict>.get(key, default=None)          # Returns argument default if key is missing.
value  = <dict>.setdefault(key, default=None)   # Returns and writes default if key is missing.
<dict> = collections.defaultdict(<type>)        # Dict with automatic default value `<type>()`.
<dict> = collections.defaultdict(lambda: 1)     # Dictionary with automatic default value `1`.
```

```python
<dict> = dict(<collection>)                     # Creates a dict from coll. of key-value pairs.
<dict> = dict(zip(keys, values))                # Creates key-value pairs from two collections.
<dict> = dict.fromkeys(keys [, value])          # Items get value None if only keys are passed.
```

```python
<dict>.update(<dict>)                           # Adds items. Replaces ones with matching keys.
value = <dict>.pop(key)                         # Removes item or raises KeyError if missing.
{k for k, v in <dict>.items() if v == value}    # Returns set of keys that point to the value.
{k: v for k, v in <dict>.items() if k in keys}  # Returns a dict of items with specified keys.
```

### Counter
```python
>>> from collections import Counter
>>> counter = Counter(['blue', 'blue', 'blue', 'red', 'red'])
>>> counter['yellow'] += 1
>>> print(counter.most_common())
[('blue', 3), ('red', 2), ('yellow', 1)]
```


Set
---
```python
<set> = {<el_1>, <el_2>, ...}                # Coll. of unique items. Also set(), set(<coll>).
```

```python
<set>.add(<el>)                              # Adds item to the set. Same as `<set> |= {<el>}`.
<set>.update(<collection> [, ...])           # Adds items to the set. Same as `<set> |= <set>`.
```

```python
<set>  = <set>.union(<coll>)                 # Returns a set of all items. Also <set> | <set>.
<set>  = <set>.intersection(<coll>)          # Returns all shared items. Also <set> & <set>.
<set>  = <set>.difference(<coll>)            # Returns set's unique items. Also <set> - <set>.
<set>  = <set>.symmetric_difference(<coll>)  # Returns non-shared items. Also <set> ^ <set>.
<bool> = <set>.issuperset(<coll>)            # Returns False if collection has unique items.
<bool> = <set>.issubset(<coll>)              # Is collection a superset? Also <set> <= <set>.
```

```python
<el> = <set>.pop()                           # Removes and returns an item or raises KeyError.
<set>.remove(<el>)                           # Removes the item or raises KeyError if missing.
<set>.discard(<el>)                          # Same as remove() but it doesn't raise an error.
```

### Frozen Set
* **Frozenset is immutable and hashable version of the normal set.**
* **That means it can be used as a key in a dictionary or as an item in a set.**
```python
<frozenset> = frozenset(<collection>)
```


Tuple
-----
**Tuple is an immutable and hashable list.**
```python
<tuple> = ()                        # Returns an empty tuple. Also tuple(), tuple(<coll>).
<tuple> = (<el>,)                   # Returns a tuple with single element. Same as `<el>,`.
<tuple> = (<el_1>, <el_2> [, ...])  # Returns a tuple. Same as `<el_1>, <el_2> [, ...]`.
```

### Named Tuple
**Tuple's subclass with named elements.**
```python
>>> from collections import namedtuple
>>> Point = namedtuple('Point', 'x y')
>>> p = Point(1, y=2)
>>> print(p)
Point(x=1, y=2)
>>> p.x, p[1]
(1, 2)
```


Range
-----
**A sequence of evenly spaced integers.**
```python
<range> = range(stop)                # I.e. range(to_exclusive). Integers from 0 to `stop-1`.
<range> = range(start, stop)         # I.e. range(from_inc, to_exc). From start to `stop-1`.
<range> = range(start, stop, ±step)  # I.e. range(from_inclusive, to_exclusive, ±step_size).
```

```python
>>> [i for i in range(3)]
[0, 1, 2]
```


Enumerate
---------
```python
for i, el in enumerate(<coll>, start=0):   # Returns next element and its index on each pass.
    ...
```


Iterator
--------
**Potentially endless stream of elements.**

```python
<iter> = iter(<collection>)                # Iterator that returns passed elements one by one.
<iter> = iter(<func>, to_exc)              # Calls `<func>()` until it returns 'to_exc' value.
<iter> = (<expr> for <name> in <coll>)     # E.g. `(i+1 for i in range(3))`. Evaluates lazily.
<el>   = next(<iter> [, default])          # Raises StopIteration or returns 'default' on end.
<list> = list(<iter>)                      # Returns a list of iterator's remaining elements.
```
* **For loops call `'iter(<collection>)'` at the start and `'next(<iter>)'` on each pass.**
* **Calling `'iter(<iter>)'` returns unmodified iterator. For details see [Iterator](#iterator-1) duck type.**

```python
import itertools as it
```

```python
<iter> = it.count(start=0, step=1)         # Returns updated 'start' endlessly. Accepts floats.
<iter> = it.repeat(<el> [, times])         # Returns passed element endlessly or 'times' times.
<iter> = it.cycle(<collection>)            # Repeats the sequence endlessly. Accepts iterators.
```

```python
<iter> = it.chain(<coll>, <coll> [, ...])  # Returns each element of each collection in order.
<iter> = it.chain.from_iterable(<coll>)    # Accepts collection (i.e. iterable) of collections.
<iter> = it.islice(<coll>, [start,] stop)  # Also accepts `+step`. Start and stop can be None.
<iter> = it.product(<coll>, ...)           # Same as `((a, b) for a in arg_1 for b in arg_2)`.
```


Generator
---------
* **Any function that contains a yield statement returns a generator.**
* **Generators and iterators are interchangeable.**

```python
def count(start, step):
    while True:
        yield start
        start += step
```

```python
>>> counter = count(10, 2)
>>> next(counter), next(counter), next(counter)
(10, 12, 14)
```


Type
----
* **Everything in Python is an object.**
* **Every object has a certain type.**
* **Type and class are synonymous.**

```python
<type> = type(<obj>)                # Returns object's type. Same as `<obj>.__class__`.
<bool> = isinstance(<obj>, <type>)  # Same result as `issubclass(type(<obj>), <type>)`.
```

```python
>>> type('a'), 'a'.__class__, str
(<class 'str'>, <class 'str'>, <class 'str'>)
```

#### Some types do not have built-in names, so they must be imported:
```python
from types import FunctionType, MethodType, LambdaType, GeneratorType, ModuleType
```

### Abstract Base Classes
**Each abstract base class specifies a set of virtual subclasses. These classes are then recognized by isinstance() and issubclass() as subclasses of the ABC, although they are really not. An ABC can also manually decide whether or not a specific class is its virtual subclass, usually based on which methods that class has implemented. For instance, Iterable ABC looks for method iter(), while Collection ABC looks for iter(), contains() and len().**

```python
>>> from collections.abc import Iterable, Collection, Sequence
>>> isinstance([1, 2, 3], Iterable)
True
```

```text
+------------------+------------+------------+------------+
|                  |  Iterable  | Collection |  Sequence  |
+------------------+------------+------------+------------+
| list, range, str |    yes     |    yes     |    yes     |
| dict, set        |    yes     |    yes     |            |
| iter             |    yes     |            |            |
+------------------+------------+------------+------------+
```

```python
>>> from numbers import Number, Complex, Real, Rational, Integral
>>> isinstance(123, Number)
True
```

```text
+--------------------+-----------+-----------+----------+----------+----------+
|                    |   Number  |  Complex  |   Real   | Rational | Integral |
+--------------------+-----------+-----------+----------+----------+----------+
| int                |    yes    |    yes    |   yes    |   yes    |   yes    |
| fractions.Fraction |    yes    |    yes    |   yes    |   yes    |          |
| float              |    yes    |    yes    |   yes    |          |          |
| complex            |    yes    |    yes    |          |          |          |
| decimal.Decimal    |    yes    |           |          |          |          |
+--------------------+-----------+-----------+----------+----------+----------+
```


String
------
**Immutable sequence of characters.**
```python
<str>  = 'abc'                               # Also "abc". Interprets \n, \t, \x00-\xff, etc.
```

```python
<str>  = <str>.strip()                       # Strips all whitespace characters from both ends.
<str>  = <str>.strip('<chars>')              # Strips passed characters. Also lstrip/rstrip().
```

```python
<list> = <str>.split()                       # Splits it on one or more whitespace characters.
<list> = <str>.split(sep=None, maxsplit=-1)  # Splits on 'sep' string at most 'maxsplit' times.
<list> = <str>.splitlines(keepends=False)    # On [\n\r\f\v\x1c-\x1e\x85\u2028\u2029] and \r\n.
<str>  = <str>.join(<coll_of_strings>)       # Joins items by using the string as a separator.
```

```python
<bool> = <sub_str> in <str>                  # Returns True if string contains the substring.
<bool> = <str>.startswith(<sub_str>)         # Pass tuple of strings to give multiple options.
<int>  = <str>.find(<sub_str>)               # Returns start index of the first match or `-1`.
```

```python
<str>  = <str>.lower()                       # Lowers the case. Also upper/capitalize/title().
<str>  = <str>.casefold()                    # Lower() that converts ẞ/ß to ss, Σ/ς to σ, etc.
<str>  = <str>.replace(old, new [, count])   # Replaces 'old' with 'new' at most 'count' times.
<str>  = <str>.translate(table)              # Use `str.maketrans(<dict>)` to generate table.
```

```python
<str>  = chr(<int>)                          # Converts passed integer into Unicode character.
<int>  = ord(<str>)                          # Converts passed Unicode character into integer.
```
* **Use `'unicodedata.normalize("NFC", <str>)'` on strings like `'Motörhead'` before comparing them to other strings, because `'ö'` can be stored as one or two characters.**
* **`'NFC'` converts such characters to a single character, while `'NFD'` converts them to two.**

```python
<bool> = <str>.isdecimal()                   # Checks all chars for [0-9]. Also [०-९], [٠-٩].
<bool> = <str>.isdigit()                     # Checks for [²³¹…] and isdecimal(). Also [፩-፱].
<bool> = <str>.isnumeric()                   # Checks for [¼½¾…] and isdigit(). Also [零〇一…].
<bool> = <str>.isalnum()                     # Checks for [ABC…] and isnumeric(). Also [ªµº…].
<bool> = <str>.isprintable()                 # Checks for [ !"#…], basic emojis and isalnum().
<bool> = <str>.isspace()                     # Checks for [ \t\n\r\f\v\x1c\x1d\x1e\x1f\x85…].
```


Regex
-----
**Functions for regular expression matching.**

```python
import re
<str>   = re.sub(r'<regex>', new, text)  # Substitutes occurrences with string 'new'.
<list>  = re.findall(r'<regex>', text)   # Returns all occurrences as string objects.
<list>  = re.split(r'<regex>', text)     # Add brackets around regex to keep matches.
<Match> = re.search(r'<regex>', text)    # Returns first occ. of the pattern or None.
<Match> = re.match(r'<regex>', text)     # Only searches at the start of the 'text'.
<iter>  = re.finditer(r'<regex>', text)  # Returns all occurrences as Match objects.
```

* **Raw string literals do not interpret escape sequences, thus enabling us to use the regex-specific escape sequences that cause SyntaxWarning in normal string literals (since 3.12).**
* **Argument `'new'` can also be a function that accepts a Match object and returns a string.**
* **Argument `'flags=re.IGNORECASE'` can be used with all functions that are listed above.**
* **Argument `'flags=re.MULTILINE'` makes `'^'` and `'$'` match the start/end of each line.**
* **Argument `'flags=re.DOTALL'` makes `'.'` also accept the `'\n'` (besides all other chars).**
* **`'re.compile(r"<regex>")'` returns a Pattern object with methods sub(), findall(), etc.**

### Match Object
```python
<str>   = <Match>.group()                # Returns the whole match. Also group(0).
<str>   = <Match>.group(1)               # Returns part inside the first brackets.
<tuple> = <Match>.groups()               # Returns all bracketed parts as strings.
<int>   = <Match>.start()                # Returns start index of the whole match.
<int>   = <Match>.end()                  # Returns the match's end index plus one.
```

### Special Sequences
```python
'\d' == '[0-9]'                          # Also [०-९…]. Matches decimal character.
'\w' == '[a-zA-Z0-9_]'                   # Also [ª²³…]. Matches alphanumeric or _.
'\s' == '[ \t\n\r\f\v]'                  # Also [\x1c-\x1f…]. Matches whitespace.
```
* **By default, decimal characters and alphanumerics from all alphabets are matched unless `'flags=re.ASCII'` is used. It restricts special sequence matches to the first 128 Unicode characters and also prevents `'\s'` from accepting `'\x1c'`, `'\x1d'`, `'\x1e'` and `'\x1f'` (non-printable characters that divide text into files, tables, rows and fields, respectively).**
* **Use a capital letter, i.e. `'\D'`, `'\W'` or `'\S'`, for negation. All non-ASCII characters are matched if ASCII flag is used in conjunction with a capital letter.**


Format
------
```perl
<str> = f'{<obj>}, {<obj>}'            # Curly brackets can contain any expression.
<str> = '{}, {}'.format(<obj>, <obj>)  # Same as '{0}, {a}'.format(<obj>, a=<obj>).
<str> = '%s, %s' % (<obj>, <obj>)      # Redundant and inferior C-style formatting.
```

### Example
```python
>>> Person = collections.namedtuple('Person', 'name height')
>>> person = Person('Jean-Luc', 187)
>>> f'{person.name} is {person.height / 100} meters tall.'
'Jean-Luc is 1.87 meters tall.'
```

### General Options
```python
{<obj>:<10}                            # '<obj>     '
{<obj>:^10}                            # '  <obj>   '
{<obj>:>10}                            # '     <obj>'
{<obj>:.<10}                           # '<obj>.....'
{<obj>:0}                              # '<obj>'
```
* **Objects are converted to strings with format() function, e.g. `'format(<obj>, "<10")'`.**
* **Options can be generated dynamically via nested braces: `f'{<obj>:{<str/int>}[…]}'`.**
* **Adding `'='` to the expression prepends it to its result, e.g. `f'{1+1=}'` returns `'1+1=2'`.**
* **Adding `'!r'` to the expression first calls result's [repr()](#class) method and only then format().**

### Strings
```python
{'abcde':10}                           # 'abcde     '
{'abcde':10.3}                         # 'abc       '
{'abcde':.3}                           # 'abc'
{'abcde'!r:10}                         # "'abcde'   "
```

### Numbers
```python
{123456:10}                            # '    123456'
{123456:10,}                           # '   123,456'
{123456:10_}                           # '   123_456'
{123456:+10}                           # '   +123456'
{123456:=+10}                          # '+   123456'
{123456: }                             # ' 123456'
{-123456: }                            # '-123456'
```

### Floats
```python
{1.23456:10.3}                         # '      1.23'
{1.23456:10.3f}                        # '     1.235'
{1.23456:10.3e}                        # ' 1.235e+00'
{1.23456:10.3%}                        # '  123.456%'
```

#### Comparison of presentation types:
```text
+--------------+----------------+----------------+----------------+----------------+
|              |    {<float>}   |   {<float>:f}  |   {<float>:e}  |   {<float>:%}  |
+--------------+----------------+----------------+----------------+----------------+
|  0.000056789 |   '5.6789e-05' |    '0.000057'  | '5.678900e-05' |    '0.005679%' |
|  0.00056789  |   '0.00056789' |    '0.000568'  | '5.678900e-04' |    '0.056789%' |
|  0.0056789   |   '0.0056789'  |    '0.005679'  | '5.678900e-03' |    '0.567890%' |
|  0.056789    |   '0.056789'   |    '0.056789'  | '5.678900e-02' |    '5.678900%' |
|  0.56789     |   '0.56789'    |    '0.567890'  | '5.678900e-01' |   '56.789000%' |
|  5.6789      |   '5.6789'     |    '5.678900'  | '5.678900e+00' |  '567.890000%' |
| 56.789       |  '56.789'      |   '56.789000'  | '5.678900e+01' | '5678.900000%' |
+--------------+----------------+----------------+----------------+----------------+
```

```text
+--------------+----------------+----------------+----------------+----------------+
|              |  {<float>:.2}  |  {<float>:.2f} |  {<float>:.2e} |  {<float>:.2%} |
+--------------+----------------+----------------+----------------+----------------+
|  0.000056789 |    '5.7e-05'   |      '0.00'    |   '5.68e-05'   |      '0.01%'   |
|  0.00056789  |    '0.00057'   |      '0.00'    |   '5.68e-04'   |      '0.06%'   |
|  0.0056789   |    '0.0057'    |      '0.01'    |   '5.68e-03'   |      '0.57%'   |
|  0.056789    |    '0.057'     |      '0.06'    |   '5.68e-02'   |      '5.68%'   |
|  0.56789     |    '0.57'      |      '0.57'    |   '5.68e-01'   |     '56.79%'   |
|  5.6789      |    '5.7'       |      '5.68'    |   '5.68e+00'   |    '567.89%'   |
| 56.789       |    '5.7e+01'   |     '56.79'    |   '5.68e+01'   |   '5678.90%'   |
+--------------+----------------+----------------+----------------+----------------+
```
* **`'{<num>:g}'` is `'{<float>:.6}'` that strips `'.0'` and has exponent starting at `'1e+06'`.**
* **When both rounding up and rounding down are possible, the one that returns result with even last digit is chosen. Hence `'{6.5:.0f}'` becomes a `'6'`, while `'{7.5:.0f}'` an `'8'`. This rule only effects numbers that can be represented exactly by a float (`.5`, `.25`, …).**

### Ints
```python
{90:c}                                 # Converts 90 to Unicode character 'Z'.
{90:b}                                 # Converts 90 to binary number '1011010'.
{90:X}                                 # Converts 90 to hexadecimal number '5A'.
```


Numbers
-------
```python
<int>      = int(<float/str/bool>)             # A whole number. Truncates floats.
<float>    = float(<int/str/bool>)             # 64-bit decimal. Also <fl>e±<int>.
<complex>  = complex(real=0, imag=0)           # Complex number. Also <fl> ± <fl>j.
<Fraction> = fractions.Fraction(numer, denom)  # `<Fraction> = <Fraction> / <int>`.
<Decimal>  = decimal.Decimal(<str/int/tuple>)  # `Decimal((1, (2,), 3)) == -2000`.
```
* **`'int(<str>)'` and `'float(<str>)'` raise ValueError exception if string is malformed.**
* **Decimal objects store numbers exactly, unlike most floats where `'1.1 + 2.2 != 3.3'`.**
* **Floats can be compared with: `'math.isclose(<float>, <float>, rel_tol=1e-09)'`.**
* **Precision of decimal operations is set with: `'decimal.getcontext().prec = <int>'`.**
* **Bools can be used anywhere ints can, since bool is a subclass of int: `'True + 1 == 2'`.**

### Built-in Functions
```python
<num> = pow(<num>, <num>)                      # E.g. `pow(3, 4) == 3 ** 4 == 81`.
<num> = abs(<num>)                             # E.g. `abs(complex(3, 4)) == 5`.
<num> = round(<num> [, ±ndigits])              # E.g. `round(123.45, -1) == 120`.
<num> = min(<coll_of_nums>)                    # Also `max(<num>, <num> [, ...])`.
<num> = sum(<coll_of_nums>)                    # Also `math.prod(<coll_of_nums>)`.
```

### Math
```python
from math import floor, ceil, trunc            # Funcs that convert float into int.
from math import pi, inf, nan, isnan           # `inf*0` and `nan+1` return `nan`.
from math import sqrt, factorial               # `sqrt(-1)` will raise ValueError.
from math import sin, cos, tan                 # Also: degrees, radians, asin, etc.
from math import log, log10, log2              # Log() can accept 'base' argument.
```

### Statistics
```python
from statistics import mean, median, mode      # Mode returns most common element.
from statistics import variance, stdev         # Also `cuts = quantiles(data, n)`.
```

### Random
```python
from random import random, randint, uniform    # Also: gauss, choice, shuffle, etc.
```

```python
<float> = random()                             # Selects random float from [0, 1).
<num>   = randint/uniform(a, b)                # Selects an int/float from [a, b].
<float> = gauss(mean, stdev)                   # Also triangular(low, high, mode).
<el>    = choice(<sequence>)                   # Doesn't modify. Also sample(p, n).
shuffle(<list>)                                # Works with all mutable sequences.
```

### Hexadecimal Numbers
```python
<int> = 0x<hex>                                # E.g. `0xFf == 255`. Also 0b<bin>.
<int> = int('±<hex>', 16)                      # Also int('±0x<hex>/±0b<bin>', 0).
<str> = hex(<int>)                             # Returns '[-]0x<hex>'. Also bin().
```

### Bitwise Operators
```python
<int> = <int> & <int>                          # E.g. `0b1100 & 0b1010 == 0b1000`.
<int> = <int> | <int>                          # E.g. `0b1100 | 0b1010 == 0b1110`.
<int> = <int> ^ <int>                          # E.g. `0b1100 ^ 0b1010 == 0b0110`.
<int> = <int> << n_bits                        # E.g. `0b1111 << 4 == 0b11110000`.
<int> = ~<int>                                 # E.g. `~0b1 == -(0b1+1) == -0b10`.
```


Combinatorics
-------------
```python
import itertools as it
```

```python
>>> list(it.product('abc', repeat=2))        #   a  b  c
[('a', 'a'), ('a', 'b'), ('a', 'c'),         # a x  x  x
 ('b', 'a'), ('b', 'b'), ('b', 'c'),         # b x  x  x
 ('c', 'a'), ('c', 'b'), ('c', 'c')]         # c x  x  x
```

```python
>>> list(it.permutations('abc', 2))          #   a  b  c
[('a', 'b'), ('a', 'c'),                     # a .  x  x
 ('b', 'a'), ('b', 'c'),                     # b x  .  x
 ('c', 'a'), ('c', 'b')]                     # c x  x  .
```

```python
>>> list(it.combinations('abc', 2))          #   a  b  c
[('a', 'b'), ('a', 'c'),                     # a .  x  x
 ('b', 'c')                                  # b .  .  x
]                                            # c .  .  .
```


Datetime
--------
**Provides 'date', 'time', 'datetime' and 'timedelta' classes. All are immutable and hashable.**

```python
# $ pip3 install python-dateutil
from datetime import date, time, datetime, timedelta, timezone
import zoneinfo, dateutil.tz
```

```python
<D>  = date(year, month, day)               # Accepts valid dates between AD 1 and AD 9999.
<T>  = time(hour=0, minute=0, second=0)     # Also: `microsecond=0, tzinfo=None, fold=0`.
<DT> = datetime(year, month, day, hour=0)   # Also: `minute=0, second=0, microsecond=0, …`.
<TD> = timedelta(weeks=0, days=0, hours=0)  # Also: `minutes=0, seconds=0, microseconds=0`.
```
* **Times and datetimes that have defined timezone are called aware and ones that don't, naive. If time or datetime object is naive, it is presumed to be in the system's timezone!**
* **`'fold=1'` means the second pass in case of time jumping back (usually for one hour).**
* **Timedelta normalizes arguments to ±days, seconds (< 86 400) and microseconds (< 1M). Its str() method returns `'[±D, ]H:MM:SS[.…]'` and total_seconds() a float of seconds.**
* **Use `'<D/DT>.weekday()'` to get the day of the week as an int (with Monday being 0).**

### Now
```python
<D/DTn> = D/DT.today()                      # Current local date or naive DT. Also DT.now().
<DTa>   = DT.now(<tzinfo>)                  # Aware DT from current time in passed timezone.
```
* **To extract time use `'<DTn>.time()'`, `'<DTa>.time()'` or `'<DTa>.timetz()'`.**

### Timezones
```python
<tzinfo> = timezone.utc                     # Coordinated universal time. London without DST.
<tzinfo> = timezone(<timedelta>)            # Timezone with fixed offset from universal time.
<tzinfo> = dateutil.tz.tzlocal()            # Local timezone with dynamic offset from the UTC.
<tzinfo> = zoneinfo.ZoneInfo('<iana_key>')  # 'Continent/City_Name' zone with dynamic offset.
<DTa>    = <DT>.astimezone([<tzinfo>])      # Converts DT to the passed or local fixed zone.
<Ta/DTa> = <T/DT>.replace(tzinfo=<tzinfo>)  # Changes the timezone object without conversion.
```
* **Timezones returned by tzlocal(), ZoneInfo() and implicit local timezone of naive objects have offsets that vary through time due to DST and historical changes of the base offset.**
* **To get ZoneInfo() to work on Windows run `'> pip3 install tzdata'`.**

### Encode
```python
<D/T/DT> = D/T/DT.fromisoformat(<str>)      # Object from the ISO string. Raises ValueError.
<DT>     = DT.strptime(<str>, '<format>')   # Naive or aware datetime from the custom string.
<D/DTn>  = D/DT.fromordinal(<int>)          # Date or DT from days since the Gregorian NYE 1.
<DTn>    = DT.fromtimestamp(<float>)        # A local naive DT from seconds since the epoch.
<DTa>    = DT.fromtimestamp(<float>, <tz>)  # An aware datetime from seconds since the epoch.
```
* **ISO strings come in following forms: `'YYYY-MM-DD'`, `'HH:MM:SS.mmmuuu[±HH:MM]'`, or both separated by an arbitrary character. All parts following the hours are optional.**
* **Python uses the Unix epoch: `'1970-01-01 00:00 UTC'`, `'1970-01-01 01:00 CET'`, ...**

### Decode
```python
<str>    = <D/T/DT>.isoformat(sep='T')      # Also `timespec='auto/hours/minutes/seconds/…'`.
<str>    = <D/T/DT>.strftime('<format>')    # Returns custom string representation of object.
<int>    = <D/DT>.toordinal()               # Days since NYE 1, ignoring DT's time and zone.
<float>  = <DTn>.timestamp()                # Seconds since the epoch from a local naive DT.
<float>  = <DTa>.timestamp()                # Seconds since the epoch from an aware datetime.
```

### Format
```python
>>> dt = datetime.strptime('2025-08-14 23:39:00.00 +0200', '%Y-%m-%d %H:%M:%S.%f %z')
>>> dt.strftime("%dth of %B '%y (%a), %I:%M %p %Z")
"14th of August '25 (Thu), 11:39 PM UTC+02:00"
```
* **`'%z'` accepts `'±HH[:]MM'` and returns `'±HHMM'` or empty string if object is naive.**
* **`'%Z'` accepts `'UTC/GMT'` and local timezone's code and returns timezone's name, `'UTC[±HH:MM]'` if timezone is nameless, or an empty string if object is naive.**

### Arithmetics
```python
<bool>   = <D/T/DTn> > <D/T/DTn>            # Ignores time jumps (fold attribute). Also `==`.
<bool>   = <DTa>     > <DTa>                # Ignores time jumps if they share tzinfo object.
<TD>     = <D/DTn>   - <D/DTn>              # Ignores jumps. Convert to UTC for actual delta.
<TD>     = <DTa>     - <DTa>                # Ignores jumps if they share the tzinfo object.
<D/DT>   = <D/DT>    ± <TD>                 # Returned datetime can fall into a missing hour.
<TD>     = <TD>      * <float>              # Also `<TD> = <TD> ± <TD>`, `<TD> = abs(<TD>)`.
<float>  = <TD>      / <TD>                 # Calling divmod(<TD>, <TD>) returns int and TD.
```


Function
--------
**Independent block of code that returns a value when called.**
```python
def <func_name>(<nondefault_args>): ...                  # E.g. `def func(x, y): ...`.
def <func_name>(<default_args>): ...                     # E.g. `def func(x=0, y=0): ...`.
def <func_name>(<nondefault_args>, <default_args>): ...  # E.g. `def func(x, y=0): ...`.
```
* **Function returns None if it doesn't encounter the `'return <object/expr>'` statement.**
* **Run `'global <var_name>'` inside the function before assigning to the global variable.**
* **Value of a default argument is evaluated when function is first encountered in the scope.**
* **Any mutation of a default argument value will persist between function invocations!**

### Function Call

```python
<obj> = <function>(<positional_args>)                    # E.g. `func(0, 0)`.
<obj> = <function>(<keyword_args>)                       # E.g. `func(x=0, y=0)`.
<obj> = <function>(<positional_args>, <keyword_args>)    # E.g. `func(0, y=0)`.
```


Splat Operator
--------------
**Splat expands a collection into positional arguments, while splatty-splat expands a dictionary into keyword arguments.**
```python
args, kwargs = (1, 2), {'z': 3}
func(*args, **kwargs)
```

#### Is the same as:
```python
func(1, 2, z=3)
```

### Inside Function Definition
**Splat combines zero or more positional arguments into a tuple, while splatty-splat combines zero or more keyword arguments into a dictionary.**
```python
def add(*a):
    return sum(a)
```

```python
>>> add(1, 2, 3)
6
```

#### Allowed compositions of arguments and the ways they can be called:
```text
+---------------------------+----------------+--------------+--------------+
|                           | func(x=1, y=2) | func(1, y=2) |  func(1, 2)  |
+---------------------------+----------------+--------------+--------------+
| func(x, *args, **kwargs): |      yes       |     yes      |     yes      |
| func(*args, y, **kwargs): |      yes       |     yes      |              |
| func(*, x, **kwargs):     |      yes       |              |              |
+---------------------------+----------------+--------------+--------------+
```

### Other Uses
```python
<list>  = [*<collection> [, ...]]  # Same as `list(<coll>) [+ ...]`.
<tuple> = (*<collection>, [...])   # Same as `tuple(<coll>) [+ ...]`.
<set>   = {*<collection> [, ...]}  # Same as `set(<coll>) [| ...]`.
<dict>  = {**<dict> [, ...]}       # Last dict has priority. Also |.
```

```python
head, *body, tail = <collection>   # Head or tail can be omitted.
```


Inline
------
### Lambda
```python
<func> = lambda: <return_value>                    # A single statement function.
<func> = lambda <arg_1>, <arg_2>: <return_value>   # Also allows default arguments.
```

### Comprehensions
```python
<list> = [i+1 for i in range(5)]                   # Returns `[1, 2, 3, 4, 5]`.
<iter> = (i for i in range(10) if i > 5)           # Returns `iter([6, 7, 8, 9])`.
<set>  = {i+5 for i in range(5)}                   # Returns `{5, 6, 7, 8, 9}`.
<dict> = {i: i**2 for i in range(1, 4)}            # Returns `{1: 1, 2: 4, 3: 9}`.
```

```python
>>> [l+r for l in 'abc' for r in 'abc']            # Inner loop is on right side.
['aa', 'ab', 'ac', ..., 'cc']
```

### Map, Filter, Reduce
```python
from functools import reduce
```

```python
<iter> = map(lambda x: x + 1, range(5))            # Returns `iter([1, 2, 3, 4, 5])`.
<iter> = filter(lambda x: x > 5, range(10))        # Returns `iter([6, 7, 8, 9])`.
<obj>  = reduce(lambda out, x: out + x, range(5))  # Returns 10. Accepts 'initial'.
```

### Any, All
```python
<bool> = any(<collection>)                         # Is bool(<el>) True for any el?
<bool> = all(<collection>)                         # Is it True for all (or empty)?
```

### Conditional Expression
```python
<obj> = <exp> if <condition> else <exp>            # Evaluates only one expression.
```

```python
>>> [i if i else 'zero' for i in (0, 1, 2, 3)]     # `any(['', [], None])` is False.
['zero', 1, 2, 3]
```

### And, Or
```python
<obj> = <exp> and <exp> [and ...]                  # Returns first false or last obj.
<obj> = <exp> or <exp> [or ...]                    # Returns first true or last obj.
```

### Walrus Operator
```python
>>> [i for ch in '0123' if (i := int(ch)) > 0]     # Assigns to var in mid-sentence.
[1, 2, 3]
```

### Named Tuple, Enum, Dataclass
```python
from collections import namedtuple
Point = namedtuple('Point', 'x y')                 # Creates tuple's subclass.
point = Point(0, 0)                                # Returns its instance.

from enum import Enum
Direction = Enum('Direction', 'N E S W')           # Creates an enumeration.
direction = Direction.N                            # Returns its member.

from dataclasses import make_dataclass
Player = make_dataclass('Player', ['loc', 'dir'])  # Creates a normal class.
player = Player(point, direction)                  # Returns its instance.
```


Imports
-------
**Mechanism that makes code in one file available to another file.**

```python
import <module>                # Imports a built-in or '<module>.py'.
import <package>               # Imports a built-in or '<package>/__init__.py'.
import <package>.<module>      # Imports a built-in or '<package>/<module>.py'.
```
* **Package is a collection of modules, but it can also define its own functions, classes, etc. On a filesystem this corresponds to a directory of Python files with an optional init script.**
* **Running `'import <package>'` does not automatically provide access to the package's modules unless they are explicitly imported in the `'<package>/__init__.py'` script.**
* **Directory of the file that is passed to python command serves as a root of local imports.**
* **Use relative imports, i.e. `'from .[…][<pkg/mod>[.…]] import <obj>'`, if project has scattered entry points. Another option is to install the whole project by moving its code into 'src' dir, adding ['pyproject.toml'](https://packaging.python.org/en/latest/guides/writing-pyproject-toml/#basic-information) to its root, and running `'$ pip3 install -e .'`.**


Closure
-------
**We have/get a closure in Python when a nested function references a value of its enclosing function and then the enclosing function returns its nested function (any value that is ref&shy;erenced from within multiple nested functions gets shared).**

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

### Partial
```python
from functools import partial
<function> = partial(<function> [, <arg_1> [, ...]])
```

```python
>>> def multiply(a, b):
...     return a * b
>>> multiply_by_3 = partial(multiply, 3)
>>> multiply_by_3(10)
30
```
* **Partial is also useful in cases when a function needs to be passed as an argument because it enables us to set its arguments beforehand (`'collections.defaultdict(<func>)'`, `'iter(<func>, to_exc)'` and `'dataclasses.field(default_factory=<func>)'`).**

### Non-Local
**If variable is being assigned to anywhere in the scope (i.e., body of a function), it is treated as a local variable unless it is declared `'global'` or `'nonlocal'` before its first usage.**

```python
def get_counter():
    i = 0
    def out():
        nonlocal i
        i += 1
        return i
    return out
```

```python
>>> counter = get_counter()
>>> counter(), counter(), counter()
(1, 2, 3)
```


Decorator
---------
**A decorator takes a function, adds some functionality and returns it. It can be any [callable](#callable), but is usually implemented as a function that returns a [closure](#closure).**

```python
@decorator_name
def function_that_gets_passed_to_decorator():
    ...
```

### Debugger Example
**Decorator that prints function's name every time _that_ function is called.**

```python
from functools import wraps

def debug(func):
    @wraps(func)
    def out(*args, **kwargs):
        print(func.__name__)
        return func(*args, **kwargs)
    return out

@debug
def add(x, y):
    return x + y
```
* **Wraps is a helper decorator that copies the metadata of the passed function (func) to the function it is decorating (out). Without it, `'add.__name__'` would return `'out'`.**

### Cache
**Decorator that caches function's return values. All function's arguments must be hashable.**

```python
from functools import cache

@cache
def fibonacci(n):
    return n if n < 2 else fibonacci(n-2) + fibonacci(n-1)
```
* **Potential problem with cache is that it can grow indefinitely. To clear stored values run `'<func>.cache_clear()'`, or use `'@lru_cache(maxsize=<int>)'` decorator instead.**
* **CPython interpreter limits recursion depth to 3000 by default. To increase the limit run `'sys.setrecursionlimit(<int>)'`.**

### Parametrized Decorator
**A decorator that accepts arguments and returns a normal decorator that accepts a function.**
```python
from functools import wraps

def debug(print_result=False):
    def decorator(func):
        @wraps(func)
        def out(*args, **kwargs):
            result = func(*args, **kwargs)
            print(func.__name__, result if print_result else '')
            return result
        return out
    return decorator

@debug(print_result=True)
def add(x, y):
    return x + y
```
* **Using only `'@debug'` to decorate the add() function would not work here, because debug would then receive the add() function as a 'print_result' argument. Decorators can how&shy;ever manually check if the argument they received is a function and act accordingly.**


Class
-----
**A template for creating user-defined objects.**

```python
class MyClass:
    def __init__(self, a):
        self.a = a
    def __str__(self):
        return str(self.a)
    def __repr__(self):
        class_name = self.__class__.__name__
        return f'{class_name}({self.a!r})'

    @classmethod
    def get_class_name(cls):
        return cls.__name__
```

```python
>>> obj = MyClass(1)
>>> obj.a, str(obj), repr(obj)
(1, '1', 'MyClass(1)')
```
* **Methods whose names start and end with two underscores are called special methods. They are executed when object is passed to a built-in function or used as an operand, for&nbsp;example, `'print(a)'` calls `'a.__str__()'` and `'a + b'` calls `'a.__add__(b)'`.**
* **Methods decorated with `'@staticmethod'` receive neither 'self' nor 'cls' argument.**
* **Return value of str() special method should be readable and of repr() unambiguous. If&nbsp;only repr() is defined, it will also be used for str().**

#### Expressions that call str() special method:
```python
f'{obj}'
print(obj)
logging.warning(obj)
<csv_writer>.writerow([obj])
```

#### Expressions that call repr() special method:
```python
f'{obj!r}'
print/str/repr([obj])
print/str/repr({obj: obj})
print/str/repr(MyDataClass(obj))
```

### Subclass
* **Inheritance is a mechanism that enables a class to extend some other class (i.e., a sub&shy;class to extend its parent), and by doing so inherit all of its methods and attributes.**
* **Subclass can then add its own methods and attributes or override inherited ones by reusing their names.**

```python
class Person:
    def __init__(self, name):
        self.name = name
    def __repr__(self):
        return f'Person({self.name!r})'
    def __lt__(self, other):
        return self.name < other.name

class Employee(Person):
    def __init__(self, name, staff_num):
        super().__init__(name)
        self.staff_num = staff_num
    def __repr__(self):
        return f'Employee({self.name!r}, {self.staff_num})'
```

```python
>>> people = [Person('Bob'), Employee('Ann', 0)]
>>> sorted(people)
[Employee('Ann', 0), Person('Bob')]
```

### Type Annotations
* **They add type hints to variables, arguments and functions (`'def f() -> <type>:'`).**
* **Hints are used by type checkers like [mypy](https://pypi.org/project/mypy/), data validation libraries such as [Pydantic](https://pypi.org/project/pydantic/) and lately also by [Cython](https://pypi.org/project/Cython/) compiler. However, they are not enforced by CPython interpreter.**
```python
from collections import abc

<name>: <type> [| ...] [= <obj>]
<name>: list/set/abc.Iterable/abc.Sequence[<type>] [= <obj>]
<name>: tuple/dict[<type>, ...] [= <obj>]
```

### Dataclass
**Decorator that uses class variables to generate init(), repr() and eq() special methods.**
```python
from dataclasses import dataclass, field, make_dataclass

@dataclass(order=False, frozen=False)
class <class_name>:
    <attr_name>: <type>
    <attr_name>: <type> = <default_value>
    <attr_name>: list/dict/set = field(default_factory=list/dict/set)
```
* **Objects can be made [sortable](#sortable) with `'order=True'` and immutable with `'frozen=True'`.**
* **For object to be [hashable](#hashable), all attributes must be hashable and `'frozen'` must be `'True'`.**
* **Function field() is needed because `'<attr_name>: list = []'` would make a list that is&nbsp;shared among all instances. Its 'default_factory' argument accepts any [callable](#callable) object.**
* **For attributes of arbitrary type use `'typing.Any'`.**

#### Inline:
```python
P = make_dataclass('P', ['x', 'y'])
P = make_dataclass('P', [('x', float), ('y', float)])
P = make_dataclass('P', [('x', float, 0), ('y', float, 0)])
```

### Property
**Pythonic way of implementing getters and setters.**
```python
class Person:
    @property
    def name(self):
        return ' '.join(self._name)

    @name.setter
    def name(self, value):
        self._name = value.split()
```

```python
>>> person = Person()
>>> person.name = '\t Guido  van Rossum \n'
>>> person.name
'Guido van Rossum'
```

### Slots
**Mechanism that restricts objects to attributes listed in 'slots'.**

```python
class MyClassWithSlots:
    __slots__ = ['a']
```

### Copy
```python
from copy import copy, deepcopy
<object> = copy/deepcopy(<object>)
```


Duck Types
----------
**A duck type is an implicit type that prescribes a set of special methods. Any object that has those methods defined is considered a member of that duck type.**

### Comparable
* **If eq() method is not overridden, it returns `'id(self) == id(other)'`, which is the same as `'self is other'`. That means all user-defined objects compare not equal by default (because id() returns object's memory address that is guaranteed to be unique).**
* **Only the left side object has eq() method called, unless it returns NotImplemented, in which case the right object is consulted. Result is False if both return NotImplemented.**
* **Method ne() (called by `'!='`) automatically works on any object that has eq() defined.**

```python
class MyComparable:
    def __init__(self, a):
        self.a = a
    def __eq__(self, other):
        if isinstance(other, type(self)):
            return self.a == other.a
        return NotImplemented
```

### Hashable
* **Hashable object needs both hash() and eq() methods and its hash value must not change.**
* **Hashable objects that compare equal must have the same hash value, meaning default hash() that returns `'id(self)'` will not do. That is why Python automatically makes classes unhashable if you only implement the eq() method.**

```python
class MyHashable:
    def __init__(self, a):
        self._a = a
    @property
    def a(self):
        return self._a
    def __eq__(self, other):
        if isinstance(other, type(self)):
            return self.a == other.a
        return NotImplemented
    def __hash__(self):
        return hash(self.a)
```

### Sortable
* **With 'total_ordering' decorator, you only need to provide eq() and one of lt(), gt(), le() or ge() special methods (used by <, >, <=, >=) and the rest will be automatically generated.**
* **Functions sorted() and min() only require lt() method, while max() only requires gt(). However, it is best to define them all so that confusion doesn't arise in other contexts.**
* **When two lists, strings or dataclasses are compared, their values get compared in order until a pair of unequal values is found. The comparison of this two values is then re&shy;turned. The shorter sequence is considered smaller in case of all values being equal.**
* **To sort a coll. of strings in proper alphabetical order pass `'key=locale.strxfrm'` to sorted() after running `'locale.setlocale(locale.LC_COLLATE, "en_US.UTF-8")'`.**

```python
from functools import total_ordering

@total_ordering
class MySortable:
    def __init__(self, a):
        self.a = a
    def __eq__(self, other):
        if isinstance(other, type(self)):
            return self.a == other.a
        return NotImplemented
    def __lt__(self, other):
        if isinstance(other, type(self)):
            return self.a < other.a
        return NotImplemented
```

### Iterator
* **Any object that has methods next() and iter() is an iterator.**
* **Next() should return next item or raise StopIteration exception.**
* **Iter() should return unmodified iterator, i.e. the 'self' argument.**
* **Any object that has iter() method can be used in a for loop.**
```python
class Counter:
    def __init__(self):
        self.i = 0
    def __next__(self):
        self.i += 1
        return self.i
    def __iter__(self):
        return self
```

```python
>>> counter = Counter()
>>> next(counter), next(counter), next(counter)
(1, 2, 3)
```

#### Python has many different iterator objects:
* **Sequence iterators returned by the [iter()](#iterator) function, such as list\_iterator, etc.**
* **Objects returned by the [itertools](#itertools) module, such as count, repeat and cycle.**
* **Generators returned by the [generator functions](#generator) and [generator expressions](#comprehensions).**
* **File objects returned by the [open()](#open) function, [SQLite](#sqlite) cursor objects, etc.**

### Callable
* **All functions and classes have a call() method that is executed when they are called.**
* **Use `'callable(<obj>)'` or `'isinstance(<obj>, collections.abc.Callable)'` to check if object is callable. You can also call the object and check if it raised TypeError.**
* **When this cheatsheet uses `'<function>'` as an argument, it means `'<callable>'`.**
```python
class Counter:
    def __init__(self):
        self.i = 0
    def __call__(self):
        self.i += 1
        return self.i
```

```python
>>> counter = Counter()
>>> counter(), counter(), counter()
(1, 2, 3)
```

### Context Manager
* **With statements only work on objects that have enter() and exit() special methods.**
* **Enter() should lock the resources and optionally return an object (file, lock, etc.).**
* **Exit() should release the resources (for example close a file, release a lock, etc.).**
* **Any exception that happens inside the with block is passed to the exit() method.**
* **The exit() method can suppress the exception by returning a true value.**
```python
class MyOpen:
    def __init__(self, filename):
        self.filename = filename
    def __enter__(self):
        self.file = open(self.filename)
        return self.file
    def __exit__(self, exc_type, exception, traceback):
        self.file.close()
```

```python
>>> with open('test.txt', 'w') as file:
...     file.write('Hello World!')
>>> with MyOpen('test.txt') as file:
...     print(file.read())
Hello World!
```


Iterable Duck Types
-------------------
### Iterable
* **Only required method is iter(). It should return an iterator of object's items.**
* **Contains() automatically works on any object that has iter() defined.**
```python
class MyIterable:
    def __init__(self, a):
        self.a = a
    def __iter__(self):
        return iter(self.a)
    def __contains__(self, el):
        return el in self.a
```

```python
>>> obj = MyIterable([1, 2, 3])
>>> [el for el in obj]
[1, 2, 3]
>>> 1 in obj
True
```

### Collection
* **Only required methods are iter() and len(). Len() should return the number of items.**
* **This cheatsheet actually means `'<iterable>'` when it uses the `'<collection>'`.**
* **I chose not to use the name 'iterable' because it sounds scarier and more vague than 'collection'. The main drawback of this decision is that the reader could think a certain function doesn't accept iterators when it does, since iterators are the only built-in objects that are iterable but are not collections.**
```python
class MyCollection:
    def __init__(self, a):
        self.a = a
    def __iter__(self):
        return iter(self.a)
    def __contains__(self, el):
        return el in self.a
    def __len__(self):
        return len(self.a)
```

### Sequence
* **Only required methods are getitem() and len(). Getitem() should return the item at the passed index or raise IndexError (it may also support negative indices and/or slices).**
* **Iter() and contains() automatically work on any object that has getitem() defined.**
* **Reversed() automatically works on any object that has getitem() and len() defined. It returns reversed iterator of object's items.**
```python
class MySequence:
    def __init__(self, a):
        self.a = a
    def __iter__(self):
        return iter(self.a)
    def __contains__(self, el):
        return el in self.a
    def __len__(self):
        return len(self.a)
    def __getitem__(self, i):
        return self.a[i]
    def __reversed__(self):
        return reversed(self.a)
```

#### Discrepancies between glossary definitions and abstract base classes:
* **Python's glossary defines iterable as any object with special method iter() or getitem(), and sequence as any object with getitem() and len(). It does not define collection.**
* **Passing ABC Iterable to isinstance() or issubclass() only checks whether object/class has special method iter(), while ABC Collection checks for iter(), contains() and len().**

### ABC Sequence
* **It's a richer interface than the basic sequence that also requires just getitem() and len().**
* **Extending it generates iter(), contains(), reversed(), index() and count() special methods.**
* **Unlike `'abc.Iterable'` and `'abc.Collection'`, it is not a duck type. That is why exp. `'issubclass(MySequence, abc.Sequence)'` would return False even if MySequence had all the methods defined. It however recognizes list, tuple, range, str, bytes, bytearray, array, memoryview and deque, since they are registered as Sequence's virtual subclasses.**
```python
from collections import abc

class MyAbcSequence(abc.Sequence):
    def __init__(self, a):
        self.a = a
    def __len__(self):
        return len(self.a)
    def __getitem__(self, i):
        return self.a[i]
```

#### Table of required and automatically available special methods:
```text
+------------+------------+------------+------------+--------------+
|            |  Iterable  | Collection |  Sequence  | abc.Sequence |
+------------+------------+------------+------------+--------------+
| iter()     |    REQ     |    REQ     |    Yes     |     Yes      |
| contains() |    Yes     |    Yes     |    Yes     |     Yes      |
| len()      |            |    REQ     |    REQ     |     REQ      |
| getitem()  |            |            |    REQ     |     REQ      |
| reversed() |            |            |    Yes     |     Yes      |
| index()    |            |            |            |     Yes      |
| count()    |            |            |            |     Yes      |
+------------+------------+------------+------------+--------------+
```
* **Method iter() is required for `'isinstance(<obj>, abc.Iterable)'` to return True, however any object with getitem() will work with any code expecting an iterable.**
* **MutableSequence, Set, MutableSet, Mapping and MutableMapping ABCs are also ex&shy;tendable. Use `'<abc>.__abstractmethods__'` to get names of required methods.**


Enum
----
**Class of named constants called members.**

```python
from enum import Enum, auto
```

```python
class <enum_name>(Enum):
    <member_name> = auto()              # An increment of last numeric value or 1.
    <member_name> = <value>             # Values don't have to be hashable/unique.
    <member_name> = <el_1>, <el_2>      # Value can be a collection, e.g. a tuple.
```
* **Methods receive the member they were called on as the 'self' argument.**
* **Accessing a member named after a reserved keyword causes SyntaxError.**

```python
<member> = <enum>.<member_name>         # Accesses a member via enum's attribute.
<member> = <enum>['<member_name>']      # Returns the member or raises KeyError.
<member> = <enum>(<value>)              # Returns the member or raises ValueError.
<str>    = <member>.name                # Returns the member's name as a string.
<obj>    = <member>.value               # Value can't be a user-defined function.
```

```python
<list>   = list(<enum>)                 # Returns a list containing every member.
<list>   = <enum>._member_names_        # Returns a list containing member names.
<list>   = [m.value for m in <enum>]    # Returns a list containing member values.
```

```python
<enum>   = type(<member>)               # Returns an enum. Also <memb>.__class__.
<iter>   = itertools.cycle(<enum>)      # Returns an endless iterator of members.
<member> = random.choice(list(<enum>))  # Randomly selects one of enum's members.
```

### Inline
```python
Cutlery = Enum('Cutlery', 'FORK KNIFE SPOON')
Cutlery = Enum('Cutlery', ['FORK', 'KNIFE', 'SPOON'])
Cutlery = Enum('Cutlery', {'FORK': 1, 'KNIFE': 2, 'SPOON': 3})
```

#### User-defined functions cannot be values, so they must be wrapped:
```python
from functools import partial
LogicOp = Enum('LogicOp', {'AND': partial(lambda l, r: l and r),
                           'OR':  partial(lambda l, r: l or r)})
```


Exceptions
----------
```python
try:
    <code>
except <exception>:
    <code>
```

### Complex Example
```python
try:
    <code_1>
except <exception_a>:
    <code_2_a>
except <exception_b>:
    <code_2_b>
else:
    <code_2_c>
finally:
    <code_3>
```
* **Code inside the `'else'` block will only be executed if `'try'` block had no exceptions.**
* **Code inside the `'finally'` block will always be executed (unless a signal is received).**
* **All variables that are initialized in executed blocks are also visible in all subsequent blocks, as well as outside the try statement (only the function block delimits scope).**
* **To catch signals use `'signal.signal(signal_number, handler_function)'`.**

### Catching Exceptions
```python
except <exception>: ...
except <exception> as <name>: ...
except (<exception>, [...]): ...
except (<exception>, [...]) as <name>: ...
```
* **It also catches subclasses, e.g. `'ArithmeticError'` is caught by `'except Exception:'`.**
* **Use `'traceback.print_exc()'` to print the full error message to standard error stream.**
* **Use `'print(<name>)'` to print just the cause of the exception (that is, its arguments).**
* **Use `'logging.exception(<str>)'` to log the passed message, followed by the full error message of the caught exception. For details about setting up the logger see [Logging](#logging).**
* **Use `'sys.exc_info()'` to get exception type, object, and traceback of caught exception.**

### Raising Exceptions
```python
raise <exception>
raise <exception>()
raise <exception>(<obj> [, ...])
```

#### Re-raising caught exception:
```python
except <exception> [as <name>]:
    ...
    raise
```

### Exception Object
```python
arguments = <name>.args
exc_type  = <name>.__class__
filename  = <name>.__traceback__.tb_frame.f_code.co_filename
func_name = <name>.__traceback__.tb_frame.f_code.co_name
line_str  = linecache.getline(filename, <name>.__traceback__.tb_lineno)
trace_str = ''.join(traceback.format_tb(<name>.__traceback__))
error_msg = ''.join(traceback.format_exception(*sys.exc_info()))
```

### Built-in Exceptions
```text
BaseException
 +-- SystemExit                   # Raised when `sys.exit()` is called. See #Exit for details.
 +-- KeyboardInterrupt            # Raised when the user hits the interrupt key, i.e. `ctrl-c`.
 +-- Exception                    # User-defined exceptions should be derived from this class.
      +-- ArithmeticError         # Base class for arithmetic errors such as ZeroDivisionError.
      +-- AssertionError          # Raised by `assert <exp>` if expression returns false value.
      +-- AttributeError          # Raised when object doesn't have requested attribute/method.
      +-- EOFError                # Raised by `input()` when it hits an end-of-file condition.
      +-- LookupError             # Base class for errors when a collection can't find an item.
      |    +-- IndexError         # Raised when index of a sequence (list/str) is out of range.
      |    +-- KeyError           # Raised when a dictionary key or a set element is missing.
      +-- MemoryError             # Out of memory. May be too late to start deleting variables.
      +-- NameError               # Raised when nonexistent name (variable/func/class) is used.
      |    +-- UnboundLocalError  # Raised when local name is used before it is being defined.
      +-- OSError                 # Errors such as FileExistsError and TimeoutError. See #Open.
      |    +-- ConnectionError    # Errors such as BrokenPipeError and ConnectionAbortedError.
      +-- RuntimeError            # Is raised by errors that do not fit into other categories.
      |    +-- NotImplementedEr…  # Can be raised by abstract methods or by an unfinished code.
      |    +-- RecursionError     # Raised if max recursion depth is exceeded (3k by default).
      +-- StopIteration           # Raised when exhausted (empty) iterator is passed to next().
      +-- TypeError               # When an argument of the wrong type is passed to function.
      +-- ValueError              # When argument has the right type but inappropriate value.
```

#### Collections and their exceptions:
```text
+-----------+------------+------------+------------+
|           |    List    |    Set     |    Dict    |
+-----------+------------+------------+------------+
| getitem() | IndexError |            |  KeyError  |
| pop()     | IndexError |  KeyError  |  KeyError  |
| remove()  | ValueError |  KeyError  |            |
| index()   | ValueError |            |            |
+-----------+------------+------------+------------+
```

#### Useful built-in exceptions:
```python
raise TypeError('Passed argument is of the wrong type!')
raise ValueError('Argument has the right type but its value is off!')
raise RuntimeError('I am too lazy to define my own exception!')
```

### User-defined Exceptions
```python
class MyError(Exception): pass
class MyInputError(MyError): pass
```


Exit
----
**Exits the interpreter by raising SystemExit exception.**
```python
import sys
sys.exit()                     # Exits with exit code 0 (success).
sys.exit(<int>)                # Exits with the passed exit code.
sys.exit(<obj>)                # Prints to stderr and exits with 1.
```


Print
-----
```python
print(<el_1>, ..., sep=' ', end='\n', file=sys.stdout, flush=False)
```
* **Use `'file=sys.stderr'` or `'sys.stderr.write(<str>)'` for messages about errors.**
* **Stdout and stderr streams hold output in a buffer until they receive a string containing '\n' or '\r', buffer reaches 4096 characters, `'flush=True'` is used, or program exits.**

### Pretty Print
```python
from pprint import pprint
pprint(<collection>, width=80, depth=None, compact=False, sort_dicts=True)
```
* **Each item is printed on its own line if collection exceeds 'width' characters.**
* **Nested collections that are 'depth' levels deep get printed as '...'.**


Input
-----
```python
<str> = input()
```
* **Reads a line from the user input or pipe if present (trailing newline gets stripped).**
* **If argument is passed, it gets printed to the standard output before input is read.**
* **EOFError is raised if user hits EOF (ctrl-d/ctrl-z⏎) or if stream is already exhausted.**


Command Line Arguments
----------------------
```python
import sys
scripts_path = sys.argv[0]
arguments    = sys.argv[1:]
```

### Argument Parser
```python
from argparse import ArgumentParser
p = ArgumentParser(description=<str>)                       # Also accepts 'usage' str.
p.add_argument('-<char>', '--<name>', action='store_true')  # Flag (defaults to False).
p.add_argument('-<char>', '--<name>', type=<type>)          # Option (defaults to None).
p.add_argument('<name>', type=<type>, nargs=1)              # Mandatory first argument.
p.add_argument('<name>', type=<type>, nargs='+')            # Mandatory remaining args.
p.add_argument('<name>', type=<type>, nargs='?')            # Optional argument. Also *.
args  = p.parse_args()                                      # Exits on a parsing error.
<obj> = args.<name>                                         # Returns `<type>(<arg>)`.
```
* **Use `'help=<str>'` to set argument description that is used by `'-h'`.**
* **Use `'default=<obj>'` to set option's or argument's default value.**


Open
----
**Opens a file and returns the corresponding file object.**

```python
<file> = open(<path>, mode='r', encoding=None, newline=None)
```
* **`'encoding=None'` means that the default encoding is used, which is platform dependent. Best practice is to use `'encoding="utf-8"'` until it becomes the default (Python 3.15).**
* **`'newline=None'` means all different end of line combinations are converted to '\n' on read, while on write all '\n' characters are converted to system's default line separator.**
* **`'newline=""'` means no conversions take place, but input is still broken into chunks by readline() on every '\n', '\r' and '\r\n'. Passing `'newline="\n"'` breaks input only on '\n'.**
* **`'newline="\r\n"'` converts every '\n' to '\r\n' on write and breaks input only on '\r\n'.**

### Modes
* **`'r'`  - Read text from the file (the default option).**
* **`'w'`  - Write to the file. Deletes existing contents.**
* **`'x'`  - Write or raise FileExistsError if file exists.**
* **`'a'`  - Append. Creates new file if it doesn't exist.**
* **`'w+'` - Read and write. Deletes existing contents.**
* **`'r+'` - Read and write from the start of the file.**
* **`'a+'` - Read and write from the end of the file.**
* **`'rb'` - Read bytes from the file. Also `'wb'`, etc.**

### Exceptions
* **`'FileNotFoundError'` can be raised when reading with `'r'` or `'r+'`.**
* **`'FileExistsError'` exception can be raised when writing with `'x'`.**
* **`'IsADirectoryError'`, `'PermissionError'` can be raised by any.**
* **`'OSError'` is the parent class of all listed exceptions.**

### File Object
```python
<file>.seek(0)                      # Moves current position to the start of file.
<file>.seek(offset)                 # Moves 'offset' chars/bytes from the start.
<file>.seek(0, 2)                   # Moves current position to the end of file.
<bin_file>.seek(±offset, origin)    # Origin: 0 start, 1 current position, 2 end.
```

```python
<str/bytes> = <file>.read(size=-1)  # Reads 'size' chars/bytes or until the EOF.
<str/bytes> = <file>.readline()     # Returns a line or empty string/bytes on EOF.
<list>      = <file>.readlines()    # Returns remaining lines. Also list(<file>).
<str/bytes> = next(<file>)          # Returns a line using the read-ahead buffer.
```

```python
<file>.write(<str/bytes>)           # Writes str or bytes object to write buffer.
<file>.writelines(<collection>)     # Writes a coll. of strings or bytes objects.
<file>.flush()                      # Flushes write buff. Runs every 4096/8192 B.
<file>.close()                      # Closes the file after flushing write buffer.
```
* **Methods do not add or strip trailing newlines, not even writelines().**

### Read Text from File
```python
def read_file(filename):
    with open(filename, encoding='utf-8') as file:
        return file.readlines()
```

### Write Text to File
```python
def write_to_file(filename, text):
    with open(filename, 'w', encoding='utf-8') as file:
        file.write(text)
```


Paths
-----
```python
import os, glob
from pathlib import Path
```

```python
<str>  = os.getcwd()                # Returns working dir. Starts as shell's `$PWD`.
<str>  = os.path.join(<path>, ...)  # Uses `os.sep` to join strings or Path objects.
<str>  = os.path.realpath(<path>)   # Resolves symlinks and calls os.path.abspath().
```

```python
<str>  = os.path.basename(<path>)   # Returns final component (filename or dirname).
<str>  = os.path.dirname(<path>)    # Returns the path without its final component.
<tup.> = os.path.splitext(<path>)   # Splits on last period of the final component.
```

```python
<list> = os.listdir(path='.')       # Returns all file/dir names located at 'path'.
<list> = glob.glob('<pattern>')     # Returns paths matching the wildcard pattern.
```

```python
<bool> = os.path.exists(<path>)     # Checks if path exists. Also <Path>.exists().
<bool> = os.path.isfile(<path>)     # Also <Path>.is_file(), <DirEntry>.is_file().
<bool> = os.path.isdir(<path>)      # Also <Path>.is_dir() and <DirEntry>.is_dir().
```

```python
<stat> = os.stat(<path>)            # A status object. Also <Path/DirEntry>.stat().
<num>  = <stat>.st_size/st_mtime/…  # Returns size in bytes, modification time, ...
```

### DirEntry
**Unlike listdir(), scandir() returns DirEntry objects that cache isfile, isdir, and on Windows also stat information, thus significantly increasing the performance of code that requires it.**

```python
<iter> = os.scandir(path='.')       # Returns DirEntry objects located at the path.
<str>  = <DirEntry>.path            # Is absolute if 'path' argument was absolute.
<str>  = <DirEntry>.name            # Returns the path's final component as string.
<file> = open(<DirEntry>)           # Opens the file and returns its file object.
```

### Path Object
```python
<Path> = Path(<path> [, ...])       # Accepts strings, Paths, and DirEntry objects.
<Path> = <path> / <path> [/ ...]    # First or second path must be a Path object.
<Path> = <Path>.resolve()           # Returns absolute path with resolved symlinks.
```

```python
<Path> = Path()                     # Returns current working dir. Also Path('.').
<Path> = Path.cwd()                 # Returns absolute CWD. Also Path().resolve().
<Path> = Path.home()                # Returns the user's absolute home directory.
<Path> = Path(__file__).resolve()   # Returns module's path if CWD wasn't changed.
```

```python
<Path> = <Path>.parent              # Returns the path without its final component.
<str>  = <Path>.name                # Returns final component (filename or dirname).
<str>  = <Path>.suffix              # Returns the name's last extension, e.g. '.gz'.
<str>  = <Path>.stem                # Returns the name without its last extension.
<tup.> = <Path>.parts               # Starts with '/' or 'C:\' if path is absolute.
```

```python
<iter> = <Path>.iterdir()           # Returns directory contents as Path objects.
<iter> = <Path>.glob('<pattern>')   # Returns Paths matching the wildcard pattern.
```

```python
<str>  = str(<Path>)                # Returns path as string. Also <Path>.as_uri().
<file> = open(<Path>)               # Also <Path>.read_text/write_bytes/…(<args>).
```


OS Commands
-----------
```python
import os, shutil
```

```python
os.chdir(<path>)                 # Changes the current working directory (CWD).
os.mkdir(<path>, mode=0o777)     # Creates a directory. Permissions are in octal.
os.makedirs(<path>, mode=0o777)  # Creates all path's dirs. Also `exist_ok=False`.
```

```python
shutil.copy(from, to)            # Copies the file ('to' can exist or be a dir).
shutil.copy2(from, to)           # Also copies creation and modification time.
shutil.copytree(from, to)        # Copies the directory ('to' should not exist).
```

```python
os.rename(from, to)              # Renames or moves the file or directory 'from'.
os.replace(from, to)             # Same, but overwrites file 'to' even on Windows.
shutil.move(from, to)            # Rename() that moves into 'to' if it is a dir.
```

```python
os.remove(<path>)                # Deletes file. Also `$ pip3 install send2trash`.
os.rmdir(<path>)                 # Deletes the empty directory or raises OSError.
shutil.rmtree(<path>)            # Deletes the directory and all of its contents.
```
* **Provided paths can be either strings, Path objects, or DirEntry objects.**
* **Functions report OS related errors by raising OSError or one of its [subclasses](#exceptions-1).**


Shell Commands
--------------
```python
import os, subprocess, shlex
```

```python
<int>  = os.system('<commands>')      # Runs commands in sh/cmd shell. Prints results.
<proc> = subprocess.run('<command>')  # For arguments see examples. Prints by default.
<pipe> = os.popen('<commands>')       # Prints only stderr. Soft deprecated since 3.14.
<str>  = <pipe>.read(size=-1)         # Returns combined stdout. Provides readline/s().
<int>  = <pipe>.close()               # Returns None if last command had returncode 0.
```

#### Sends "1 + 1" to the basic calculator and captures its stdout and stderr streams:
```python
>>> subprocess.run('bc', input='1 + 1\n', capture_output=True, text=True)
CompletedProcess(args='bc', returncode=0, stdout='2\n', stderr='')
```

#### Sends test.in to the 'bc' running in standard mode and saves its stdout to test.out:
```python
>>> if os.system('echo 1 + 1 > test.in') == 0:
...     with open('test.in') as file_in, open('test.out', 'w') as file_out:
...         subprocess.run(shlex.split('bc -s'), stdin=file_in, stdout=file_out)
...     print(open('test.out').read())
2
```


JSON
----
```python
import json
<str>  = json.dumps(<list/dict>)  # Converts collection to JSON string.
<coll> = json.loads(<str>)        # Converts JSON string to collection.
```

### Read Collection from JSON File
```python
def read_json_file(filename):
    with open(filename, encoding='utf-8') as file:
        return json.load(file)
```

### Write Collection to JSON File
```python
def write_to_json_file(filename, collection):
    with open(filename, 'w', encoding='utf-8') as file:
        json.dump(collection, file, ensure_ascii=False, indent=2)
```


Pickle
------
```python
import pickle
<bytes>  = pickle.dumps(<object>)  # Converts object to bytes object.
<object> = pickle.loads(<bytes>)   # Converts bytes object to object.
```

### Read Object from Pickle File
```python
def read_pickle_file(filename):
    with open(filename, 'rb') as file:
        return pickle.load(file)
```

### Write Object to Pickle File
```python
def write_to_pickle_file(filename, an_object):
    with open(filename, 'wb') as file:
        pickle.dump(an_object, file)
```


CSV
---
**Text file format for storing spreadsheets.**

```python
import csv
```

```python
<file>   = open(<path>, newline='')             # Opens the CSV (text) file for reading.
<reader> = csv.reader(<file>, dialect='excel')  # Also `delimiter=','`. See Parameters.
<list>   = next(<reader>)                       # Returns next row as a list of strings.
<list>   = list(<reader>)                       # Returns a list of all remaining rows.
```
* **Without the `'newline=""'` argument, every '\r\n' sequence that is embedded inside a quoted field will get converted to '\n'! For details about the _newline_ argument see [Open](#open).**
* **To nicely print the spreadsheet to the console use either [Tabulate](#table) or PrettyTable library.**
* **For XML and binary Excel files (with extensions xlsx, xlsm and xlsb) use [Pandas](#file-formats) library.**
* **Reader can process any iterator (or collection) of strings, not just text files.**

### Write
```python
<file>   = open(<path>, mode='a', newline='')   # Opens the CSV (text) file for writing.
<writer> = csv.writer(<file>, dialect='excel')  # Also `delimiter=','`. See Parameters.
<writer>.writerow(<collection>)                 # Encodes each object using `str(<el>)`.
<writer>.writerows(<coll_of_coll>)              # Appends multiple rows to opened file.
```
* **If file is opened without the `'newline=""'` argument, '\r' will be added in front of every '\n' on platforms that use '\r\n' line endings (i.e., newlines may get doubled on Windows)!**
* **Open existing file with `'mode="a"'` to append to it or `'mode="w"'` to overwrite it.**

### Parameters
* **`'dialect'` - Master parameter that sets the default values. String or a _csv.Dialect_ object.**
* **`'delimiter'` - A one-character string that separates fields (comma, tab, semicolon, etc.).**
* **`'lineterminator'` - Sets how writer terminates rows. Reader looks for '\n', '\r' and '\r\n'.**
* **`'quotechar'` - Character for quoting fields containing delimiters, quotechars, '\n' or '\r'.**
* **`'escapechar'` - Character for escaping quotechars (can be None if doublequote is True).**
* **`'doublequote'` - Whether quotechars inside fields are/get doubled (instead of escaped).**
* **`'quoting'` - 0: As necessary, 1: All, 2: All but numbers which are read as floats, 3: None.**
* **`'skipinitialspace'` - Is space character at the start of the field stripped by the reader.**

### Dialects
```text
+------------------+--------------+--------------+--------------+
|                  |     excel    |   excel-tab  |     unix     |
+------------------+--------------+--------------+--------------+
| delimiter        |       ','    |      '\t'    |       ','    |
| lineterminator   |    '\r\n'    |    '\r\n'    |      '\n'    |
| quotechar        |       '"'    |       '"'    |       '"'    |
| escapechar       |      None    |      None    |      None    |
| doublequote      |      True    |      True    |      True    |
| quoting          |         0    |         0    |         1    |
| skipinitialspace |     False    |     False    |     False    |
+------------------+--------------+--------------+--------------+
```

### Read Rows from CSV File
```python
def read_csv_file(filename, **csv_params):
    with open(filename, encoding='utf-8', newline='') as file:
        return list(csv.reader(file, **csv_params))
```

### Write Rows to CSV File
```python
def write_to_csv_file(filename, rows, mode='w', **csv_params):
    with open(filename, mode, encoding='utf-8', newline='') as file:
        writer = csv.writer(file, **csv_params)
        writer.writerows(rows)
```


SQLite
------
**A server-less database engine that stores each database into its own file.**

```python
import sqlite3
<conn> = sqlite3.connect(<path>)               # Opens existing or new file. Also ':memory:'.
<conn>.close()                                 # Closes connection. Discards uncommitted data.
```

### Read
```python
<cursor> = <conn>.execute('<query>')           # Can raise a subclass of the `sqlite3.Error`.
<tuple>  = <cursor>.fetchone()                 # Returns the next row. Also next(<cursor>).
<list>   = <cursor>.fetchall()                 # Returns remaining rows. Also list(<cursor>).
```

### Write
```python
<conn>.execute('<query>')                      # Can raise a subclass of the `sqlite3.Error`.
<conn>.commit()                                # Saves all the changes since the last commit.
<conn>.rollback()                              # Discards all changes since the last commit.
```

#### Or:
```python
with <conn>:                                   # Exits the block with commit() or rollback(),
    <conn>.execute('<query>')                  # depending on whether any exception occurred.
```

### Placeholders
```python
<conn>.execute('<query>', <list/tuple>)        # Replaces every question mark with its item.
<conn>.execute('<query>', <dict/namedtuple>)   # Replaces every :<key> with a matching value.
<conn>.executemany('<query>', <coll_of_coll>)  # Executes the query once for each collection.
```
* **Accepts strings, ints, floats, bytes, None objects and bools (stored as 1 or 0).**
* **Columns are not restricted to any type unless table is declared as strict.**

### Example
**Values are not actually saved in this example because `'conn.commit()'` is omitted!**
```python
>>> conn = sqlite3.connect('test.db')
>>> conn.execute('CREATE TABLE person (name TEXT, height INTEGER) STRICT')
>>> conn.execute('INSERT INTO person VALUES (?, ?)', ('Jean-Luc', 187))
>>> conn.execute('SELECT rowid, * FROM person').fetchall()
[(1, 'Jean-Luc', 187)]
```

### SQLAlchemy
**Library for interacting with various DB systems via SQL, [method chaining](https://docs.sqlalchemy.org/en/latest/tutorial/data_select.html#the-select-sql-expression-construct) or [ORM](https://docs.sqlalchemy.org/en/latest/orm/quickstart.html#simple-select).**
```python
# $ pip3 install sqlalchemy
from sqlalchemy import create_engine, text
<engine> = create_engine('<url>')              # Url: 'dialect://user:password@host/dbname'.
<conn>   = <engine>.connect()                  # Creates a connection. Also <conn>.close().
<cursor> = <conn>.execute(text('<query>'), …)  # `<dict>`. Replaces every :<key> with value.
with <conn>.begin(): ...                       # Exits the block with a commit or rollback.
```

```text
+-----------------+--------------+----------------------------------+
| Dialect         | pip3 install |           Dependencies           |
+-----------------+--------------+----------------------------------+
| mysql           | mysqlclient  | www.pypi.org/project/mysqlclient |
| postgresql      | psycopg2     | www.pypi.org/project/psycopg2    |
| mssql           | pyodbc       | www.pypi.org/project/pyodbc      |
| oracle+oracledb | oracledb     | www.pypi.org/project/oracledb    |
+-----------------+--------------+----------------------------------+
```


Bytes
-----
**An immutable sequence of single bytes. Mutable version is called bytearray.**

```python
<bytes> = b'<str>'                       # Accepts ASCII characters and \x00 to \xff.
<int>   = <bytes>[index]                 # Returns the byte as int between 0 and 255.
<bytes> = <bytes>[<slice>]               # Returns bytes even if it has one element.
<bytes> = <bytes>.join(<coll_of_bytes>)  # Joins elements using bytes as a separator.
```

### Encode
```python
<bytes> = bytes(<coll_of_ints>)          # Passed integers must be between 0 and 255.
<bytes> = bytes(<str>, 'utf-8')          # Encodes the string. Same as <str>.encode().
<bytes> = bytes.fromhex('<hex>')         # Hex pairs can be separated by whitespaces.
<bytes> = <int>.to_bytes(n_bytes)        # Accepts `byteorder='little', signed=True`.
```

### Decode
```python
<list>  = list(<bytes>)                  # Returns a list of ints between 0 and 255.
<str>   = str(<bytes>, 'utf-8')          # Returns a string. Same as <bytes>.decode().
<str>   = <bytes>.hex()                  # Returns hex pairs separated by `sep=<str>`.
<int>   = int.from_bytes(<bytes>)        # Accepts `byteorder='little', signed=True`.
```


### Read Bytes from File
```python
def read_bytes(filename):
    with open(filename, 'rb') as file:
        return file.read()
```

### Write Bytes to File
```python
def write_bytes(filename, bytes_obj):
    with open(filename, 'wb') as file:
        file.write(bytes_obj)
```


Struct
------
* **Module that performs conversions between a sequence of numbers and a bytes object.**
* **System’s type sizes, byte order, and alignment rules are used by default.**

```python
from struct import pack, unpack

<bytes> = pack('<format>', <el_1> [, ...])  # Packs numbers according to format.
<tuple> = unpack('<format>', <bytes>)       # Use `iter_unpack()` to get tuples.
```

```python
>>> pack('>hhl', 1, 2, 3)
b'\x00\x01\x00\x02\x00\x00\x00\x03'
>>> unpack('>hhl', b'\x00\x01\x00\x02\x00\x00\x00\x03')
(1, 2, 3)
```

### Format
#### For standard type sizes and manual alignment (padding) start format string with:
* **`'='` - System's byte order (usually little-endian).**
* **`'<'` - Little-endian (i.e. least significant byte first).**
* **`'>'` - Big-endian (also `'!'`).**

#### Besides numbers, pack() and unpack() also support bytes objects as a part of the sequence:
* **`'c'` - A bytes object with a single element. For pad byte use `'x'`.**
* **`'<n>s'` - A bytes object with n elements (not effected by byte order).**

#### Integer types. Use capital letter for unsigned type. Minimum/standard sizes are in brackets:
* **`'b'` - char (1/1)**
* **`'h'` - short (2/2)**
* **`'i'` - int (2/4)**
* **`'l'` - long (4/4)**
* **`'q'` - long long (8/8)**

#### Floating point types (struct always uses standard sizes):
* **`'f'` - float (4/4)**
* **`'d'` - double (8/8)**


Array
-----
**List that can only contain numbers that fit into the chosen C type. Available types and their min&shy;imum sizes in bytes are listed above. Type sizes and byte order are always determined by the system, how&shy;ever bytes of each element can be reversed (by calling byteswap() method).**

```python
from array import array
```

```python
<array> = array('<typecode>' [, <coll>])  # Creates array. Accepts collection of numbers.
<array> = array('<typecode>', <bytes>)    # Copies passed bytes into the array's memory.
<array> = array('<typecode>', <array>)    # Treats passed array as a sequence of numbers.
<array>.fromfile(<file>, n_items)         # Appends file contents to the array's memory.
```

```python
<bytes> = bytes(<array>)                  # Returns the copy of array's memory as bytes.
<file>.write(<array>)                     # Appends the array's memory to a binary file.
```


Memory View
-----------
**A sequence object that points to the memory of another bytes-like object. Each element can reference a single or multiple consecutive bytes, depending on format. Order and number of elements can be changed with slicing.**

```python
<mview> = memoryview(<bytes/array>)       # Returns mutable memoryview if array is passed.
<obj>   = <mview>[index]                  # Returns an int/float. Bytes if format is 'c'.
<mview> = <mview>[<slice>]                # Returns a memoryview with rearranged elements.
<mview> = <mview>.cast('<typecode>')      # Only works between B/b/c and the other types.
<mview>.release()                         # Releases the memory buffer of the base object.
```

```python
<bytes> = bytes(<mview>)                  # Returns a new bytes object. Also bytearray().
<bytes> = <bytes>.join(<coll_of_mviews>)  # Joins memoryviews using bytes as a separator.
<array> = array('<typecode>', <mview>)    # Treats passed mview as a sequence of numbers.
<file>.write(<mview>)                     # Appends `bytes(<mview>)` to the binary file.
```

```python
<list>  = list(<mview>)                   # Returns list of ints, floats or bytes objects.
<str>   = str(<mview>, 'utf-8')           # Treats passed memoryview as `bytes(<mview>)`.
<str>   = <mview>.hex()                   # Returns hexadecimal pairs. Also `sep=<str>`.
```


Deque
-----
**List with efficient appends and pops from either side.**

```python
from collections import deque
```

```python
<deque> = deque(<collection>)     # Pass `maxlen=<int>` to set the size limit.
<deque>.appendleft(<el>)          # Drops last element if maxlen is exceeded.
<deque>.extendleft(<collection>)  # Prepends reversed collection to the deque.
<deque>.rotate(n=1)               # Moves last element to the start of deque.
<el> = <deque>.popleft()          # Removes and returns deque's first element.
```


Operator
--------
**Module of functions that provide the functionality of operators. Functions are grouped by operator precedence, from least to most binding. Functions and operators in first, third and fifth line are also ordered by precedence within a line.**
```python
import operator as op
```

```python
<bool> = op.not_(<obj>)                                        # or, and, not (or/and missing)
<bool> = op.eq/ne/lt/ge/is_/is_not/contains(<obj>, <obj>)      # ==, !=, <, >=, is, is not, in
<obj>  = op.or_/xor/and_(<int/set>, <int/set>)                 # |, ^, & (sorted by precedence)
<int>  = op.lshift/rshift(<int>, <int>)                        # <<, >> (i.e. <int> << n_bits)
<obj>  = op.add/sub/mul/truediv/floordiv/mod(<obj>, <obj>)     # +, -, *, /, //, % (two groups)
<num>  = op.neg/invert(<num>)                                  # -, ~ (negate and bitwise not)
<num>  = op.pow(<num>, <num>)                                  # ** (pow() accepts 3 arguments)
<func> = op.itemgetter/attrgetter/methodcaller(<obj> [, ...])  # [index/key], .name, .name([…])
```

```python
elementwise_sum  = map(op.add, list_a, list_b)
sorted_by_second = sorted(<coll>, key=op.itemgetter(1))
sorted_by_both   = sorted(<coll>, key=op.itemgetter(1, 0))
first_element    = op.methodcaller('pop', 0)(<list>)
```
* **Most operators call the object's special method that is named after them (second object is passed as an argument), while logical operators call their own code that relies on bool().**
* **Comparisons can be chained: `'x < y < z'` gets converted to `'(x < y) and (y < z)'`.**


Match Statement
---------------
**Executes the first block with matching pattern.**

```python
match <object/expression>:
    case <pattern> [if <condition>]:
        <code>
    ...
```

### Patterns
```python
<value_pattern> = 1/'abc'/True/None/math.pi        # Matches the literal or attribute's value.
<class_pattern> = <type>()                         # Matches any object of that type (or ABC).
<wildcard_patt> = _                                # Matches any object. Useful in last case.
<capture_patt>  = <name>                           # Matches any object and binds it to name.
<as_pattern>    = <pattern> as <name>              # Binds match to name. Also <type>(<name>).
<or_pattern>    = <pattern> | <pattern> [| ...]    # Matches if any of listed patterns match.
<sequence_patt> = [<pattern>, ...]                 # Matches a sequence. All items must match.
<mapping_patt>  = {<value_pattern>: <patt>, ...}   # Matches a dict if it has matching items.
<class_pattern> = <type>(<attr_name>=<patt>, ...)  # Matches object that has matching attrbs.
```
* **The sequence pattern can also be written as a tuple, either with or without the brackets.**
* **Use `'*<name>'` and `'**<name>'` in sequence/mapping patterns to bind remaining items.**
* **Sequence pattern must match all items of the collection, while mapping pattern does not.**
* **Patterns can be surrounded with brackets to override their precedence: `'|'` > `'as'` > `','`. For example, `'[1, 2]'` is matched by the `'case 1|2, 2|3 as x if x == 2:'` block.**
* **All names that are bound in the matching case, as well as variables initialized in its body, are visible after the match statement (only function block delimits scope).**

### Example
```python
>>> from pathlib import Path
>>> match Path('/home/gto/python-cheatsheet/README.md'):
...     case Path(
...         parts=['/', 'home', user, *_]
...     ) as p if p.name.lower().startswith('readme') and p.is_file():
...         print(f'{p.name} is a readme file that belongs to user {user}.')
README.md is a readme file that belongs to user gto.
```


Logging
-------
```python
import logging as log
```

```python
log.basicConfig(filename=<path>, level='WARNING')  # Configures the root logger (see Setup).
log.debug/info/warning/error/critical(<str>)       # Sends passed message to the root logger.
<Logger> = log.getLogger(__name__)                 # Returns a logger named after the module.
<Logger>.<level>(<str>)                            # Sends the message. Same levels as above.
<Logger>.exception(<str>)                          # Error() that appends caught exception.
```

### Setup
```python
log.basicConfig(
    filename=None,                                 # Prints to stderr when filename is None.
    filemode='a',                                  # Use mode 'w' to overwrite existing file.
    format='%(levelname)s:%(name)s:%(message)s',   # Using '%(asctime)s' adds local datetime.
    level=log.WARNING,                             # Drops messages that have lower priority.
    handlers=[log.StreamHandler(sys.stderr)]       # Uses FileHandler when 'filename' is set.
)
```

```python
<Formatter> = log.Formatter('<format>')            # Formats messages using the format str.
<Handler> = log.FileHandler(<path>, mode='a')      # Appends to file. Also `encoding=None`.
<Handler>.setFormatter(<Formatter>)                # Only outputs bare messages by default.
<Handler>.setLevel(<str/int>)                      # Prints/saves every message by default.
<Logger>.addHandler(<Handler>)                     # Loggers can have more than one handler.
<Logger>.setLevel(<str/int>)                       # What's sent to its/ancestors' handlers.
<Logger>.propagate = <bool>                        # Cuts off ancestors' handlers if False.
```
* **Parent logger can be specified by naming the child logger `'<parent_name>.<name>'`.**
* **Logger will inherit the level from its parent if you don't set it via the setLevel() method.**
* **Format string can contain: pathname, filename, funcName, lineno, thread and process.**
* **RotatingFileHandler rotates files according to 'maxBytes' and 'backupCount' arguments.**
* **An object with `'filter(<LogRecord>)'` method (or the method itself) can be added to loggers and handlers via addFilter(). Message is dropped if filter() returns a false value.**
* **Logging messages generated by libraries are passed to the root's handlers. Level of the library's logger can be set with `'log.getLogger("<library>").setLevel(<str>)'`.**

#### Creates a logger that writes all messages to a file and sends them to the root's handler that prints warnings or higher:
```python
>>> logger = log.getLogger('my_module')
>>> handler = log.FileHandler('test.log', encoding='utf-8')
>>> format_str = '%(asctime)s %(levelname)s:%(name)s:%(message)s'
>>> handler.setFormatter(log.Formatter(format_str))
>>> logger.addHandler(handler)
>>> logger.setLevel('DEBUG')
>>> log.basicConfig()
>>> roots_handler = log.root.handlers[0]
>>> roots_handler.setLevel('WARNING')
>>> logger.critical('Running out of disk space.')
CRITICAL:my_module:Running out of disk space.
>>> print(open('test.log').read())
2023-02-07 23:21:01,430 CRITICAL:my_module:Running out of disk space.
```


Introspection
-------------
```python
<list> = dir()                     # Local names of objects (including functions and classes).
<dict> = vars()                    # Dict of local names and their objects. Same as locals().
<dict> = globals()                 # Dict of global names and their objects, e.g. __builtin__.
```

```python
<list> = dir(<obj>)                # Returns names of object's attributes (including methods).
<dict> = vars(<obj>)               # Returns dict of writable attributes. Also <obj>.__dict__.
<bool> = hasattr(<obj>, '<name>')  # Checks if object possesses attribute of the passed name.
value  = getattr(<obj>, '<name>')  # Returns the object's attribute or raises AttributeError.
setattr(<obj>, '<name>', value)    # Sets attribute. Only works on objects with __dict__ attr.
delattr(<obj>, '<name>')           # Deletes attribute from __dict__. Also `del <obj>.<name>`.
```


Threading
---------
**CPython interpreter can only run a single thread at a time. Using multiple threads won't result in a faster execution, unless at least one of the threads contains an I/O operation.**
```python
from threading import Thread, Lock, RLock, Semaphore, Event, Barrier
from concurrent.futures import ThreadPoolExecutor, as_completed
```

### Thread
```python
<Thread> = Thread(target=<function>)           # Use `args=<coll>` to set function's arguments.
<Thread>.start()                               # Runs func. in the background. Also is_alive().
<Thread>.join()                                # Waits until the func. has finished executing.
```
* **Use `'kwargs=<dict>'` to pass keyword arguments to the function, i.e. thread.**
* **Use `'daemon=True'`, or the program won't be able to exit while the thread is alive.**

### Lock
```python
<lock> = Lock/RLock()                          # RLock can only be released by acquirer thread.
<lock>.acquire()                               # Blocks (waits) until lock becomes available.
<lock>.release()                               # Releases the lock so it can be acquired again.
```

#### Or:
```python
with <lock>:                                   # Enters the block by calling method acquire().
    ...                                        # Exits it by calling release(), even on error.
```

### Semaphore, Event, Barrier
```python
<Semaphore> = Semaphore(value=1)               # Lock that can be acquired by 'value' threads.
<Event>     = Event()                          # Method wait() blocks until set() is called.
<Barrier>   = Barrier(<int>)                   # Wait() blocks until it is called int times.
```

### Queue
```python
<Queue> = queue.Queue(maxsize=0)               # A first-in-first-out queue. It's thread safe.
<Queue>.put(<obj>)                             # The call blocks until queue stops being full.
<Queue>.put_nowait(<obj>)                      # Raises queue.Full exception if queue is full.
<obj> = <Queue>.get()                          # The call blocks until queue stops being empty.
<obj> = <Queue>.get_nowait()                   # Raises queue.Empty exception if it is empty.
```

### Thread Pool Executor
```python
<Exec> = ThreadPoolExecutor(max_workers=None)  # Also `with ThreadPoolExecutor() as <name>: …`.
<iter> = <Exec>.map(<func>, <args_1>, ...)     # Multithreaded and non-lazy map(). Keeps order.
<Futr> = <Exec>.submit(<func>, <arg_1>, ...)   # Creates a thread and queues it for execution.
<Exec>.shutdown()                              # Waits for all the threads to finish executing.
```

```python
<bool> = <Future>.done()                       # Checks if the thread has finished executing.
<obj>  = <Future>.result(timeout=None)         # Raises TimeoutError after 'timeout' seconds.
<bool> = <Future>.cancel()                     # Just returns False if it is running/finished.
<iter> = as_completed(<coll_of_Futures>)       # `next(<iter>)` returns next completed Future.
```
* **Map() and as\_completed() also accept 'timeout' arg. It causes _futures.TimeoutError_ when next() is called or blocking. Map() times from original call and as_completed() from first call to next(). As\_completed() fails if next() is called too late, even if all threads are done.**
* **Exceptions that happen inside threads are raised when map's next() or Future's result() method is called. Future's exception() method returns caught exception object or None.**
* **ProcessPoolExecutor provides true parallelism but: everything sent to and from workers must be [pickable](#pickle), queues must be sent using executor's 'initargs' and 'initializer' param&shy;eters, and executor should only be reachable via `'if __name__ == "__main__": …'`.**


Coroutines
----------
* **Coroutines have a lot in common with threads, but unlike threads, they only give up control when they call another coroutine and they don’t consume as much memory.**
* **Coroutine definition starts with `'async'` keyword and its call with `'await'` keyword.**
* **Use `'asyncio.run(<coroutine>)'` to start the first/main coroutine.**

```python
import asyncio as aio
```

```python
<coro> = <async_function>(<args>)          # Creates a coroutine by calling async def function.
<obj>  = await <coroutine>                 # Starts the coroutine. Returns its result or None.
<task> = aio.create_task(<coroutine>)      # Schedules it for execution. Always keep the task.
<obj>  = await <task>                      # Returns coroutine's result. Also <task>.cancel().
```

```python
<coro> = aio.gather(<coro/task>, ...)      # Schedules coros. Returns list of results on await.
<coro> = aio.wait(<tasks>, return_when=…)  # `'ALL/FIRST_COMPLETED'`. Returns (done, pending).
<iter> = aio.as_completed(<coros/tasks>)   # Iter of coros. Each returns next result on await.
```

#### Runs a terminal game where you control an asterisk that must avoid numbers:
```python
import asyncio, collections, curses, curses.textpad, enum, random

P = collections.namedtuple('P', 'x y')     # Position (x and y coordinates).
D = enum.Enum('D', 'n e s w')              # Direction (north, east, etc.).
W, H = 15, 7                               # Width and height of the field.

def main(screen):
    curses.curs_set(0)                     # Makes the cursor invisible.
    screen.nodelay(True)                   # Makes getch() non-blocking.
    asyncio.run(main_coroutine(screen))    # Starts running asyncio code.

async def main_coroutine(screen):
    moves = asyncio.Queue()
    state = {'*': P(0, 0)} | {id_: P(W//2, H//2) for id_ in range(10)}
    ai    = [random_controller(id_, moves) for id_ in range(10)]
    mvc   = [controller(screen, moves), model(moves, state), view(state, screen)]
    tasks = [asyncio.create_task(coro) for coro in ai + mvc]
    await asyncio.wait(tasks, return_when=asyncio.FIRST_COMPLETED)

async def random_controller(id_, moves):
    while True:
        d = random.choice(list(D))
        moves.put_nowait((id_, d))
        await asyncio.sleep(random.triangular(0.01, 0.65))

async def controller(screen, moves):
    while True:
        key_mappings = {258: D.s, 259: D.n, 260: D.w, 261: D.e}
        if d := key_mappings.get(screen.getch()):
            moves.put_nowait(('*', d))
        await asyncio.sleep(0.005)

async def model(moves, state):
    while state['*'] not in (state[id_] for id_ in range(10)):
        id_, d = await moves.get()
        deltas = {D.n: P(0, -1), D.e: P(1, 0), D.s: P(0, 1), D.w: P(-1, 0)}
        state[id_] = P((state[id_].x + deltas[d].x) % W, (state[id_].y + deltas[d].y) % H)

async def view(state, screen):
    offset = P(curses.COLS//2 - W//2, curses.LINES//2 - H//2)
    while True:
        screen.erase()
        curses.textpad.rectangle(screen, offset.y-1, offset.x-1, offset.y+H, offset.x+W)
        for id_, p in state.items():
            screen.addstr(offset.y + (p.y - state['*'].y + H//2) % H,
                          offset.x + (p.x - state['*'].x + W//2) % W, str(id_))
        screen.refresh()
        await asyncio.sleep(0.005)

if __name__ == '__main__':
    curses.wrapper(main)
```
<br>


Libraries
=========

Progress Bar
------------
```python
# $ pip3 install tqdm
>>> import tqdm, time
>>> for el in tqdm.tqdm([1, 2, 3], desc='Processing'):
...     time.sleep(1)
Processing: 100%|████████████████████| 3/3 [00:03<00:00,  1.00s/it]
```


Plot
----
```python
# $ pip3 install matplotlib
import matplotlib.pyplot as plt

plt.plot/bar/scatter(x_data, y_data [, label=<str>])  # Accepts plt.plot(y_data).
plt.legend()                                          # Adds a legend of labels.
plt.title/xlabel/ylabel(<str>)                        # Adds title or axis label.
plt.show()                                            # Also plt.savefig(<path>).
plt.clf()                                             # Clears the plot (figure).
```


Table
-----
#### Prints a CSV spreadsheet to the console:
```python
# $ pip3 install tabulate
import csv, tabulate
with open('test.csv', encoding='utf-8', newline='') as file:
    rows = list(csv.reader(file))
print(tabulate.tabulate(rows, headers='firstrow'))
```


Console App
-----------
#### Runs a basic file explorer in the console:
```python
# $ pip3 install windows-curses
import curses, os
from curses import A_REVERSE, KEY_UP, KEY_DOWN, KEY_LEFT, KEY_RIGHT

def main(screen):
    ch, first, selected, paths = 0, 0, 0, os.listdir()
    while ch != ord('q'):
        height, width = screen.getmaxyx()
        screen.erase()
        for y, filename in enumerate(paths[first : first+height]):
            color = A_REVERSE if filename == paths[selected] else 0
            screen.addnstr(y, 0, filename, width-1, color)
        ch = screen.getch()
        selected -= (ch == KEY_UP) and (selected > 0)
        selected += (ch == KEY_DOWN) and (selected < len(paths)-1)
        first -= (first > selected)
        first += (first < selected-(height-1))
        if ch in [KEY_LEFT, KEY_RIGHT, ord('\n')]:
            new_dir = '..' if ch == KEY_LEFT else paths[selected]
            if os.path.isdir(new_dir):
                os.chdir(new_dir)
                first, selected, paths = 0, 0, os.listdir()

if __name__ == '__main__':
    curses.wrapper(main)
```


GUI App
-------
#### Runs a desktop app for converting weights from metric units into pounds:

```python
# $ pip3 install FreeSimpleGUI
import FreeSimpleGUI as sg

text_box = sg.Input(default_text='100', enable_events=True, key='QUANTITY')
dropdown = sg.InputCombo(['g', 'kg', 't'], 'kg', readonly=True, enable_events=True, k='UNIT')
label    = sg.Text('100 kg is 220.462 lbs.', key='OUTPUT')
window   = sg.Window('Weight Converter', [[text_box, dropdown], [label], [sg.Button('Close')]])

while True:
    event, values = window.read()
    if event in [sg.WIN_CLOSED, 'Close']:
        break
    try:
        quantity = float(values['QUANTITY'])
    except ValueError:
        continue
    unit = values['UNIT']
    lbs = quantity * {'g': 0.001, 'kg': 1, 't': 1000}[unit] / 0.45359237
    window['OUTPUT'].update(value=f'{quantity} {unit} is {lbs:g} lbs.')
window.close()
```


Scraping
--------
#### Scrapes Python's URL and logo from its Wikipedia page:
```python
# $ pip3 install requests beautifulsoup4
import requests, bs4, os

get = lambda url: requests.get(url, headers={'User-Agent': 'cpc-bot'})
response = get('https://en.wikipedia.org/wiki/Python_(programming_language)')
document = bs4.BeautifulSoup(response.text, 'html.parser')
table = document.find('table', class_='infobox vevent')
python_url = table.find('th', string='Website').next_sibling.a['href']
logo_url = table.find('img')['src']
filename = os.path.basename(logo_url)
with open(filename, 'wb') as file:
    file.write(get(f'https:{logo_url}').content)
print(f'URL: {python_url}, logo: file://{os.path.abspath(filename)}')
```

### Selenium
**Library for scraping websites with dynamic content.**
```python
# $ pip3 install selenium
from selenium import webdriver
```

```python
<Drv> = webdriver.Chrome/Firefox/Safari/Edge()  # Opens the browser. Also <Driver>.quit().
<Drv>.implicitly_wait(seconds)                  # Sets timeout for find_element/s() methods.
<Drv>.get('<url>')                              # Blocks until browser fires the load event.
<str> = <Drv>.page_source                       # Returns HTML of the page's current state.
<El>  = <Drv/El>.find_element('xpath', <str>)   # Accepts '//<tag>[@<attr_name>="<val>"]…'.
<str> = <El>.get_attribute('<name>')            # Returns attribute or property if exists.
<El>.click/clear()                              # Also <El>.text and <El>.send_keys(<str>).
```

#### XPath — also available in lxml, Scrapy, and browser's console via `'$x("<xpath>")'`:
```python
<xpath>     = //<element>[/ or // <element>]    # E.g. …/child, …//descendant, …/../sibling.
<xpath>     = //<element>/following::<element>  # Next element. Also preceding::, parent::.
<element>   = <tag><conditions><index>          # Tag accepts */a/…. Use [1/2/…] for index.
<condition> = [<sub_cond> [and/or <sub_cond>]]  # Use not(<sub_cond>) to negate condition.
<sub_cond>  = @<attr>[="<val>"]                 # `text()=` and `.=` match (complete) text.
<sub_cond>  = contains(@<attr>, "<val>")        # Is <val> a substring of attribute's value?
<sub_cond>  = [//]<element>                     # Has matching child? Descendant if //<el>.
```


Web App
-------
**Flask is a micro web framework/server. If you just want to open a html file in a web browser use `'webbrowser.open(<path>)'` instead.**
```python
# $ pip3 install flask
import flask as fl
```

```python
app = fl.Flask(__name__)                   # Returns the app object. Put at the top.
app.run(host=None, port=None, debug=None)  # Same as `$ flask --app FILE run --ARG=VAL`.
```
* **Starts the app at `'http://localhost:5000'`. Use `'host="0.0.0.0"'` to run externally.**
* **Install a WSGI server like [Waitress](https://flask.palletsprojects.com/en/latest/deploying/waitress/) and a HTTP server such as [Nginx](https://flask.palletsprojects.com/en/latest/deploying/nginx/) for better security.**
* **Debug mode restarts the app whenever script changes and displays errors in the browser.**

### Serving Files
```python
@app.route('/img/<path:filename>')
def serve_file(filename):
    return fl.send_from_directory('DIRNAME', filename)
```

### Serving HTML
```python
@app.route('/<sport>')
def serve_html(sport):
    return fl.render_template_string('<h1>{{title}}</h1>', title=sport)
```
* **`'fl.render_template(filename, <kwargs>)'` renders a file located in 'templates' dir.**
* **`'fl.abort(<int>)'` returns error code and `'return fl.redirect(<url>)'` redirects.**
* **`'fl.request.args[<str>]'` returns parameter from query string (URL part right of '?').**
* **`'fl.session[<str>] = <obj>'` stores session data and `'fl.session.clear()'` clears it. A session cookie key needs to be set at the startup with `'app.secret_key = <str>'`.**

### Serving JSON
```python
@app.post('/<sport>/odds')
def serve_json(sport):
    team = fl.request.form['team']
    return {'team': team, 'odds': [2.09, 3.74, 3.68]}
```

#### Starts the app in its own thread and queries its REST API:
```python
# $ pip3 install requests
>>> import threading, requests
>>> threading.Thread(target=app.run, daemon=True).start()
>>> url = 'http://localhost:5000/football/odds'
>>> response = requests.post(url, data={'team': 'arsenal f.c.'})
>>> response.json()
{'team': 'arsenal f.c.', 'odds': [2.09, 3.74, 3.68]}
```


Profiling
---------

```python
from time import perf_counter
start_time = perf_counter()
...
duration_in_seconds = perf_counter() - start_time
```

### Timing a Snippet
```python
>>> from timeit import timeit
>>> timeit('list(range(10000))', number=1000, globals=globals(), setup='pass')
0.19373
```

### Profiling by Line
```text
$ pip3 install line_profiler
$ echo '@profile
def main():
    a = list(range(10000))
    b = set(range(10000))
main()' > test.py
$ kernprof -lv test.py
Line #      Hits         Time  Per Hit   % Time  Line Contents
==============================================================
     1                                           @profile
     2                                           def main():
     3         1        253.4    253.4     32.2      a = list(range(10000))
     4         1        534.1    534.1     67.8      b = set(range(10000))
```

### Call and Flame Graphs
```bash
$ apt install graphviz && pip3 install gprof2dot snakeviz  # Or install graphviz.exe.
$ tail -n +2 test.py > test.tmp && mv test.tmp test.py     # Removes the first line.
$ python3 -m cProfile -o test.prof test.py                 # Runs a tracing profiler.
$ gprof2dot -f pstats test.prof | dot -T png -o test.png   # Generates a call graph.
$ xdg-open test.png                                        # Displays the call graph.
$ snakeviz test.prof                                       # Displays a flame graph.
```

### Sampling and Memory Profilers
```text
+--------------+------------+-------------------------------+-------+------+
| pip3 install |   Target   |          How to run           | Lines | Live |
+--------------+------------+-------------------------------+-------+------+
| pyinstrument |    CPU     | pyinstrument test.py          |  No   | No   |
| py-spy       |    CPU     | py-spy top -- python3 test.py |  No   | Yes  |
| scalene      | CPU+Memory | scalene test.py               |  Yes  | No   |
| memray       |   Memory   | memray run --live test.py     |  Yes  | Yes  |
+--------------+------------+-------------------------------+-------+------+
```


NumPy
-----
**Array manipulation mini-language. It can run up to one hundred times faster than the equivalent Python code. An even faster alternative that runs on a GPU is called CuPy.**

```python
# $ pip3 install numpy
import numpy as np
```

```python
<array> = np.array(<list/list_of_lists/…> [, dtype])  # NumPy array of one or more dimensions.
<array> = np.zeros/ones/empty(shape)                  # Pass a tuple of ints (dimension sizes).
<array> = np.arange(from_inc, to_exc, ±step)          # Also np.linspace(start, stop, length).
<array> = np.random.randint(from_inc, to_exc, shape)  # Also random.uniform(low, high, shape).
```

```python
<view>  = <array>.reshape(shape)                      # Also `<array>.shape = (<int>, [...])`.
<array> = <array>.flatten()                           # Returns 1d copy. Also <array>.ravel().
<view>  = <array>.transpose()                         # Flips the table over its main diagonal.
```

```python
<array> = np.copy/abs/sqrt/log/int64(<array>)         # Returns a new array of the same shape.
<array> = <array>.sum/max/mean/argmax/all(axis)       # Aggregates dimension with passed index.
<array> = np.apply_along_axis(<func>, axis, <array>)  # Func. can return a scalar or an array.
```

```python
<array> = np.concatenate(<list_of_arrays>, axis=0)    # Links arrays along first axis (rows).
<array> = np.vstack/column_stack(<list_of_arrays>)    # A 1d array is treated as a row/column.
<array> = np.tile/repeat(<array>, <int/s> [, axis])   # Tiles the array or repeats elements.
```
* **Shape is a tuple of dimension sizes. A 100x50 RGB image has shape (50, 100, 3).**
* **Axis is an index of a dimension. Leftmost dimension has index 0. Summing the RGB image along axis 2 will return a greyscale image with shape (50, 100).**

### Indexing
```perl
<el>       = <2d>[row_index, col_index]               # Also `<3d>[<int>, <int>, <int>]`.
<1d_view>  = <2d>[row_index]                          # Also `<3d>[<int>, <int>, <slice>]`.
<1d_view>  = <2d>[:, col_index]                       # Also `<3d>[<int>, <slice>, <int>]`.
<2d_view>  = <2d>[from:to_row_i, from:to_col_i]       # Also `<3d>[<int>, <slice>, <slice>]`.
```

```perl
<1d_array> = <2d>[row_indices, col_indices]           # Also `<3d>[<int/1d>, <1d>, <1d>]`.
<2d_array> = <2d>[row_indices]                        # Also `<3d>[<int/1d>, <1d>, <slice>]`.
<2d_array> = <2d>[:, col_indices]                     # Also `<3d>[<int/1d>, <slice>, <1d>]`.
<2d_array> = <2d>[np.ix_(row_indices, col_indices)]   # Also `<3d>[<int/1d/2d>, <2d>, <2d>]`.
```

```perl
<2d_bools> = <2d> > <el/1d/2d>                        # A 1d object must be a size of a row.
<1/2d_arr> = <2d>[<2d/1d_bools>]                      # A 1d object must be a size of a col.
```
* **`':'` returns a slice of all dimension's indices. Omitted dimensions default to `':'`.**
* **Python converts `'obj[i, j]'` to `'obj[(i, j)]'`. This makes `'<2d>[row_i, col_i]'` and `'<2d>[row_indices]'` indistinguishable to NumPy if tuple of two indices is passed!**
* **`'ix_([1, 2], [3, 4])'` returns `'[[1], [2]]'` and `'[[3, 4]]'`. Due to broadcasting rules, this is the same as using `'[[1, 1], [2, 2]]'` and `'[[3, 4], [3, 4]]'`.**
* **Any value that is broadcastable to the indexed shape can be assigned to the selection.**

### Broadcasting
**A set of rules by which NumPy functions operate on arrays of different shapes.**
```python
left  = np.array([0.1,  0.6,  0.8])                   # I.e. `left.shape  == (3,)`.
right = np.array([[0.1], [0.6], [0.8]])               # I.e. `right.shape == (3, 1)`.
```

#### 1. If array shapes differ in length, left-pad the shorter shape with ones:
```python
left  = np.array([[0.1,  0.6,  0.8]])                 # I.e. `left.shape  == (1, 3)`.
right = np.array([[0.1], [0.6], [0.8]])               # I.e. `right.shape == (3, 1)`.
```

#### 2. If any dimensions differ in size, expand the ones that have size 1 by duplicating their elements:
```python
left  = np.array([[0.1,  0.6,  0.8],                  # I.e. `left.shape  == (3, 3)`.
                  [0.1,  0.6,  0.8],
                  [0.1,  0.6,  0.8]])

right = np.array([[0.1,  0.1,  0.1],                  # I.e. `right.shape == (3, 3)`.
                  [0.6,  0.6,  0.6],
                  [0.8,  0.8,  0.8]])
```

### Example
#### For each point returns index of its nearest point (`[0.1, 0.6, 0.8] => [1, 2, 1]`):

```python
>>> print(points := np.array([0.1, 0.6, 0.8]))
[0.1  0.6  0.8]
>>> print(wrapped_points := points.reshape(3, 1))
[[0.1]
 [0.6]
 [0.8]]
>>> print(deltas := points - wrapped_points)
[[ 0.   0.5  0.7]
 [-0.5  0.   0.2]
 [-0.7 -0.2  0. ]]
>>> deltas[range(3), range(3)] = np.inf
>>> print(distances := np.abs(deltas))
[[inf  0.5  0.7]
 [0.5  inf  0.2]
 [0.7  0.2  inf]]
>>> print(distances.argmin(axis=1))
[1 2 1]
```


Image
-----
```python
# $ pip3 install pillow
from PIL import Image
```

```python
<Image> = Image.new('RGB', (width, height))   # Creates an image. Also `color=<tuple_of_ints>`.
<Image> = Image.open(<path>)                  # Identifies format based on the file's contents.
<Image> = <Image>.convert('<mode>')           # Converts the image to the new mode (see Modes).
<Image>.save(<path>)                          # Also `quality=<int>` if extension is jpg/jpeg.
<Image>.show()                                # Displays image in system's default preview app.
```

```python
<int/tup> = <Image>.getpixel((x, y))          # Returns the pixel's value, that is, its color.
<ImgCore> = <Image>.getdata()                 # Returns a flattened view of the pixel values.
<Image>.putpixel((x, y), <int/tuple>)         # Updates pixel's value. Clips passed integer/s.
<Image>.putdata(<list/ImgCore>)               # Updates pixels with a copy of passed sequence.
<Image>.paste(<Image>, (x, y))                # Draws passed image at the specified location.
```

```python
<Image> = <Image>.filter(<Filter>)            # E.g. `<Image>.filter(ImageFilter.FIND_EDGES)`.
<Image> = <Enhance>.enhance(<float>)          # E.g. `ImageEnhance.Color(<Image>).enhance(2)`.
```

```python
<array> = np.array(<Image>)                   # Creates a 2d or 3d NumPy array from the image.
<Image> = Image.fromarray(np.uint8(<array>))  # Use `<array>.clip(0, 255)` to clip the values.
```

### Modes
* **`'L'` - Lightness (greyscale image). Each pixel is stored as an int between 0 and 255.**
* **`'RGB'` - Red, green, blue (true color image). Each pixel is a tuple of three integers.**
* **`'RGBA'` - RGB with alpha. Low alpha (i.e. fourth int) makes pixel more transparent.**
* **`'HSV'` - Hue, saturation, value. Three ints representing color in HSV color space.**


### Examples
#### Creates a PNG image of a rainbow gradient:
```python
WIDTH, HEIGHT = 100, 100
n_pixels = WIDTH * HEIGHT
hues = (255 * i/n_pixels for i in range(n_pixels))
img = Image.new('HSV', (WIDTH, HEIGHT))
img.putdata([(int(h), 255, 255) for h in hues])
img.convert('RGB').save('test.png')
```

#### Adds noise to the PNG image and displays it:
```python
from random import randint
add_noise = lambda value: max(0, min(255, value + randint(-20, 20)))
img = Image.open('test.png').convert('HSV')
img.putdata([(add_noise(h), s, v) for h, s, v in img.getdata()])
img.show()
```

### Image Draw
```python
from PIL import ImageDraw
<Draw> = ImageDraw.Draw(<Image>)              # An object for adding 2D graphics to the image.
<Draw>.point((x, y))                          # Draws a point. Accepts `fill=<int/tuple/str>`.
<Draw>.line((x1, y1, x2, y2 [, ...]))         # To get anti-aliasing use <Img>.resize((w, h)).
<Draw>.arc((x1, y1, x2, y2), deg1, deg2)      # Draws arc of an ellipse in clockwise direction.
<Draw>.rectangle((x1, y1, x2, y2))            # Also rounded_rectangle() and regular_polygon().
<Draw>.polygon((x1, y1, x2, y2, ...))         # The last point gets connected to the first one.
<Draw>.ellipse((x1, y1, x2, y2))              # To rotate it use <Image>.rotate(anticlock_deg).
<Draw>.text((x, y), <str>)                    # Accepts `font=ImageFont.truetype(path, size)`.
```
* **Pass `'fill=<color>'` to set the figure's primary color.**
* **Pass `'width=<int>'` to set the width of lines or contours.**
* **Pass `'outline=<color>'` to set the color of the contours.**
* **Color can be an int, tuple, `'#rrggbb[aa]'` or a color name.**


Animation
---------
#### Creates a GIF of a bouncing ball:
```python
# $ pip3 install imageio
from PIL import Image, ImageDraw
import imageio

WIDTH, HEIGHT, R = 126, 126, 10
frames = []
for velocity in range(1, 16):
    y = sum(range(velocity))
    frame = Image.new('L', (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(frame)
    draw.ellipse((WIDTH/2-R, y, WIDTH/2+R, y+R*2), fill='white')
    frames.append(frame)
frames += reversed(frames[1:-1])
imageio.mimsave('test.gif', frames, duration=0.03)
```


Audio
-----
```python
import wave
```

```python
<Wave>  = wave.open('<path>')         # Opens specified WAV file for reading.
<int>   = <Wave>.getframerate()       # Returns number of frames per second.
<int>   = <Wave>.getnchannels()       # Returns number of samples per frame.
<int>   = <Wave>.getsampwidth()       # Returns number of bytes per sample.
<tuple> = <Wave>.getparams()          # Returns namedtuple of all parameters.
<bytes> = <Wave>.readframes(nframes)  # Returns all frames if `-1` is passed.
```

```python
<Wave> = wave.open('<path>', 'wb')    # Creates/truncates a file for writing.
<Wave>.setframerate(<int>)            # Pass 44100, or 48000 for video track.
<Wave>.setnchannels(<int>)            # Pass 1 for mono, 2 for stereo signal.
<Wave>.setsampwidth(<int>)            # Pass 2 for CD, 3 for hi-res quality.
<Wave>.setparams(<tuple>)             # Passed tuple must contain all params.
<Wave>.writeframes(<bytes>)           # Appends passed frames to audio file.
```
* **The bytes object contains a sequence of frames, each consisting of one or more samples.**
* **In stereo signal, first sample of a frame belongs to the left channel (second to the right).**
* **Each sample consists of one or more bytes (depending on sample width) that, when con&shy;verted to an integer, indicate the displacement of a speaker membrane at that moment.**
* **If sample width is one byte, then the integer should be encoded unsigned. For all other sizes, the integer should be encoded signed with little-endian byte order.**

### Sample Values
```text
+-----------+-----------+------+-----------+
| sampwidth |    min    | zero |    max    |
+-----------+-----------+------+-----------+
|     1     |         0 |  128 |       255 |
|     2     |    -32768 |    0 |     32767 |
|     3     |  -8388608 |    0 |   8388607 |
+-----------+-----------+------+-----------+
```

### Read Float Samples from WAV File
```python
def read_wav_file(filename):
    def get_int(bytes_obj):
        an_int = int.from_bytes(bytes_obj, 'little', signed=(p.sampwidth != 1))
        return an_int - (128 * (p.sampwidth == 1))
    with wave.open(filename) as file:
        p = file.getparams()
        frames = file.readframes(-1)
    samples_b = (frames[i : i + p.sampwidth] for i in range(0, len(frames), p.sampwidth))
    return [get_int(b) / pow(2, (p.sampwidth * 8) - 1) for b in samples_b], p
```

### Write Float Samples to WAV File
```python
def write_to_wav_file(filename, samples_f, p=None, nchannels=1, sampwidth=2, fs=44100):
    def get_bytes(a_float):
        a_float = max(-1, min(1 - 2e-16, a_float)) + (p.sampwidth == 1)
        a_float *= pow(2, (p.sampwidth * 8) - 1)
        return int(a_float).to_bytes(p.sampwidth, 'little', signed=(p.sampwidth != 1))
    if p is None:
        p = wave._wave_params(nchannels, sampwidth, fs, 0, 'NONE', 'not compressed')
    with wave.open(filename, 'wb') as file:
        file.setparams(p)
        file.writeframes(b''.join(get_bytes(f) for f in samples_f))
```

### Examples
#### Saves a 440 Hz sine wave to a mono WAV file:
```python
from math import sin, pi
get_sin = lambda i: sin(i * 2 * pi * 440 / 44100) * 0.2
write_to_wav_file('test.wav', (get_sin(i) for i in range(100_000)))
```

#### Adds noise to the WAV file:
```python
from random import uniform
samples_f, params = read_wav_file('test.wav')
samples_f = (f + uniform(-0.02, 0.02) for f in samples_f)
write_to_wav_file('test.wav', samples_f, p=params)
```

### Audio Player
```python
# $ pip3 install nava
from nava import play
play('test.wav')
```

### Text to Speech
```python
# $ pip3 install piper-tts sounddevice
import os, piper, sounddevice
os.system('python3 -m piper.download_voices en_US-lessac-high')
voice = piper.PiperVoice.load('en_US-lessac-high.onnx')
for sentence in voice.synthesize('Sally sells seashells by the seashore.'):
    sounddevice.wait()
    sounddevice.play(sentence.audio_float_array, sentence.sample_rate)
sounddevice.wait()
```


Synthesizer
-----------
#### Plays Popcorn by Gershon Kingsley:
```python
# $ pip3 install numpy sounddevice
import itertools as it, math, numpy as np, sounddevice

def play_notes(notes, bpm=132, fs=44100, volume=0.1):
    beat_len  = 60/bpm * fs
    get_pause = lambda n_beats: it.repeat(0, int(n_beats * beat_len))
    get_sinus = lambda i, hz: math.sin(i * 2 * math.pi * hz / fs) * volume
    get_wave  = lambda hz, n_beats: (get_sinus(i, hz) for i in range(int(n_beats * beat_len)))
    get_herz  = lambda note: 440 * 2 ** ((int(note[:2]) - 69) / 12)
    get_beats = lambda note: 1/2 if '♩' in note else 1/4 if '♪' in note else 1
    get_samps = lambda n: get_wave(get_herz(n), get_beats(n)) if n else get_pause(1/4)
    samples_f = it.chain(get_pause(1/2), *(get_samps(n) for n in notes.split(',')))
    sounddevice.play(np.fromiter(samples_f, np.float32), fs, blocking=True)

play_notes('83♩,81♪,,83♪,,78♪,,74♪,,78♪,,71♪,,,,83♪,,81♪,,83♪,,78♪,,74♪,,78♪,,71♪,,,,'
           '83♩,85♪,,86♪,,85♪,,86♪,,83♪,,85♩,83♪,,85♪,,81♪,,83♪,,81♪,,83♪,,79♪,,83♪,,,,')
```


Pygame
------
#### Opens a window and draws a square that can be moved with arrow keys:
```python
# $ pip3 install pygame
import pygame as pg

pg.init()
screen = pg.display.set_mode((500, 500))
rect = pg.Rect(240, 240, 20, 20)
while not pg.event.get(pg.QUIT):
    for event in pg.event.get(pg.KEYDOWN):
        dx = (event.key == pg.K_RIGHT) - (event.key == pg.K_LEFT)
        dy = (event.key == pg.K_DOWN) - (event.key == pg.K_UP)
        rect = rect.move((dx * 20, dy * 20))
    screen.fill(pg.Color('black'))
    pg.draw.rect(screen, pg.Color('white'), rect)
    pg.display.flip()
pg.quit()
```

### Rect
**Object for storing rectangular coordinates.**
```python
<Rect> = pg.Rect(x, y, width, height)           # Creates Rect object. Truncates passed floats.
<int>  = <Rect>.x/y/centerx/centery/…           # `top/right/bottom/left`. Allows assignments.
<tup.> = <Rect>.topleft/center/…                # `topright/bottomright/bottomleft/size`. Same.
<Rect> = <Rect>.move((delta_x, delta_y))        # Use move_ip() to move the rectangle in-place.
```

```python
<bool> = <Rect>.collidepoint((x, y))            # Checks whether rectangle contains the point.
<bool> = <Rect>.colliderect(<Rect>)             # Checks whether the two rectangles overlap.
<int>  = <Rect>.collidelist(<list_of_Rect>)     # Returns index of first colliding Rect or -1.
<list> = <Rect>.collidelistall(<list_of_Rect>)  # Returns indices of all colliding rectangles.
```

### Surface
**Object for representing images.**
```python
<Surf> = pg.display.set_mode((width, height))   # Opens a new window and returns its surface.
<Surf> = pg.Surface((width, height))            # New RGB surface. RGBA if `flags=pg.SRCALPHA`.
<Surf> = pg.image.load(<path/file>)             # Loads the image. Format depends on source.
<Surf> = pg.surfarray.make_surface(<np_array>)  # Also `<np_arr> = surfarray.pixels3d(<Surf>)`.
<Surf> = <Surf>.subsurface(<Rect>)              # Creates a new surface from the cutout.
```

```python
<Surf>.fill(color)                              # Pass tuple of ints or pg.Color('<name/hex>').
<Surf>.set_at((x, y), color)                    # Updates pixel. Also <Surf>.get_at((x, y)).
<Surf>.blit(<Surf>, (x, y))                     # Draws passed surface at specified location.
```

```python
from pygame.transform import scale, rotate      # Also: flip, smoothscale, scale_by.
<Surf> = scale(<Surf>, (width, height))         # Scales the surface. `smoothscale()` blurs it.
<Surf> = rotate(<Surf>, angle)                  # Rotates the surface for counterclock degrees.
<Surf> = flip(<Surf>, flip_x=False)             # Mirrors the surface. Also `flip_y=False`.
```

```python
from pygame.draw import line, arc, rect         # Also: ellipse, polygon, circle, aaline.
line(<Surf>, color, (x1, y1), (x2, y2))         # Draws a line to the surface. Also `width=1`.
arc(<Surf>, color, <Rect>, from_rad, to_rad)    # Also ellipse(<Surf>, color, <Rect>, width=0).
rect(<Surf>, color, <Rect>, width=0)            # Also polygon(<Surf>, color, points, width=0).
```

```python
<Font> = pg.font.Font(<path/file>, size)        # Loads TTF file. Pass None for default font.
<Surf> = <Font>.render(text, antialias, color)  # Accepts background color as fourth argument.
```

### Sound
```python
<Sound> = pg.mixer.Sound(<path/file/bytes>)     # WAV file or bytes/array of signed shorts.
<Sound>.play/stop()                             # Also set_volume(<float>) and fadeout(msec).
```

### Basic Mario Brothers Example
```python
import collections, dataclasses, enum, io, itertools as it, pygame as pg, urllib.request
from random import randint

P = collections.namedtuple('P', 'x y')          # Position (x and y coordinates).
D = enum.Enum('D', 'n e s w')                   # Direction (north, east, etc.).
W, H, MAX_S = 50, 50, P(5, 10)                  # Width, height, maximum speed.

def main():
    def get_screen():
        pg.init()
        return pg.display.set_mode((W*16, H*16))
    def get_images():
        url = 'https://gto76.github.io/python-cheatsheet/web/mario_bros.png'
        img = pg.image.load(io.BytesIO(urllib.request.urlopen(url).read()))
        return [img.subsurface(get_rect(x, 0)) for x in range(img.get_width() // 16)]
    def get_mario():
        Mario = dataclasses.make_dataclass('Mario', 'rect spd facing_left frame_cycle'.split())
        return Mario(get_rect(1, 1), P(0, 0), False, it.cycle(range(3)))
    def get_tiles():
        border = [(x, y) for x in range(W) for y in range(H) if x in [0, W-1] or y in [0, H-1]]
        platforms = [(randint(1, W-2), randint(2, H-2)) for _ in range(W*H // 10)]
        return [get_rect(x, y) for x, y in border + platforms]
    def get_rect(x, y):
        return pg.Rect(x*16, y*16, 16, 16)
    run(get_screen(), get_images(), get_mario(), get_tiles())

def run(screen, images, mario, tiles):
    clock = pg.time.Clock()
    pressed = set()
    while not pg.event.get(pg.QUIT):
        clock.tick(28)
        pressed |= {e.key for e in pg.event.get(pg.KEYDOWN)}
        pressed -= {e.key for e in pg.event.get(pg.KEYUP)}
        update_speed(mario, tiles, pressed)
        update_position(mario, tiles)
        draw(screen, images, mario, tiles)
    pg.quit()

def update_speed(mario, tiles, pressed):
    x, y = mario.spd
    x += 2 * ((pg.K_RIGHT in pressed) - (pg.K_LEFT in pressed))
    x += (x < 0) - (x > 0)
    y += 1 if D.s not in get_boundaries(mario.rect, tiles) else (pg.K_UP in pressed) * -10
    mario.spd = P(x=max(-MAX_S.x, min(MAX_S.x, x)), y=max(-MAX_S.y, min(MAX_S.y, y)))

def update_position(mario, tiles):
    x, y = mario.rect.topleft
    n_steps = max(abs(s) for s in mario.spd)
    for _ in range(n_steps):
        mario.spd = stop_on_collision(mario.spd, get_boundaries(mario.rect, tiles))
        mario.rect.topleft = x, y = x + (mario.spd.x / n_steps), y + (mario.spd.y / n_steps)

def get_boundaries(rect, tiles):
    deltas = {D.n: P(0, -1), D.e: P(1, 0), D.s: P(0, 1), D.w: P(-1, 0)}
    return {d for d, delta in deltas.items() if rect.move(delta).collidelist(tiles) != -1}

def stop_on_collision(spd, bounds):
    return P(x=0 if (D.w in bounds and spd.x < 0) or (D.e in bounds and spd.x > 0) else spd.x,
             y=0 if (D.n in bounds and spd.y < 0) or (D.s in bounds and spd.y > 0) else spd.y)

def draw(screen, images, mario, tiles):
    screen.fill((85, 168, 255))
    mario.facing_left = mario.spd.x < 0 if mario.spd.x else mario.facing_left
    is_airborne = D.s not in get_boundaries(mario.rect, tiles)
    image_index = 4 if is_airborne else next(mario.frame_cycle) if mario.spd.x else 6
    screen.blit(images[image_index + (mario.facing_left * 9)], mario.rect)
    for tile in tiles:
        is_border = tile.x in [0, (W-1)*16] or tile.y in [0, (H-1)*16]
        screen.blit(images[18 if is_border else 19], tile)
    pg.display.flip()

if __name__ == '__main__':
    main()
```


Pandas
------
**Data analysis library. For examples see [Plotly](#plotly).**

```python
# $ pip3 install pandas matplotlib
import pandas as pd, matplotlib.pyplot as plt
```

### Series
**Ordered dictionary with a name.**

```python
>>> s = pd.Series([1, 2], index=['x', 'y'], name='a'); s
x    1
y    2
Name: a, dtype: int64
```

```python
<S>  = pd.Series(<list>)                       # Uses list's indices for 'index'.
<S>  = pd.Series(<dict>)                       # Uses dictionary's keys for 'index'.
```

```python
<el> = <S>.loc[key]                            # Or: <S>.iloc[i]
<S>  = <S>.loc[coll_of_keys]                   # Or: <S>.iloc[coll_of_i]
<S>  = <S>.loc[from_key : to_key_inc]          # Or: <S>.iloc[from_i : to_i_exc]
```

```python
<el> = <S>[key/i]                              # Or: <S>.<key>
<S>  = <S>[coll_of_keys/coll_of_i]             # Or: <S>[key/i : key/i]
<S>  = <S>[<S_of_bools>]                       # Or: <S>.loc/iloc[<S_of_bools>]
```

```python
<S>  = <S> > <el/S>                            # Returns S of bools. For logic use &, |, ~.
<S>  = <S> + <el/S>                            # Items with non-matching keys get value NaN.
```

```python
<S>  = <S>.head/describe/sort_values()         # Also <S>.unique/value_counts/round/dropna().
<S>  = <S>.str.strip/lower/contains/replace()  # Also split().str[i] or split(expand=True).
<S>  = <S>.dt.year/month/day/hour              # Use pd.to_datetime(<S>) to get S of datetimes.
<S>  = <S>.dt.to_period('y/m/d/h')             # Quantizes datetimes into Period objects.
```

```python
<S>.plot.line/area/bar/pie/hist()              # Generates a plot. Accepts `title=<str>`.
plt.show()                                     # Displays the plot. Also plt.savefig(<path>).
```
* **Use `'print(<S>.to_string())'` to print a Series that has more than sixty items.**
* **Use `'<S>.index'` to get collection of keys and `'<S>.index = <coll>'` to update them.**
* **Only pass a list or Series to loc/iloc because `'obj[x, y]'` is converted to `'obj[(x, y)]'` and `'<S>.loc[key_1, key_2]'` is how you retrieve a value from a multi-indexed Series.**
* **Pandas uses NumPy types like `'np.int64'`. Series is converted to `'float64'` if np.nan is assigned to any item. Use `'<S>.astype(<str/type>)'` to get converted Series.**

#### Series — Aggregate, Transform, Map:
```python
<el> = <S>.sum/max/mean/std/idxmax/count()     # Or: <S>.agg(lambda <S>: <el>)
<S>  = <S>.rank/diff/cumsum/ffill/interpol…()  # Or: <S>.agg/transform(lambda <S>: <S>)
<S>  = <S>.isna/fillna/isin([<el/coll>])       # Or: <S>.agg/transform/map(lambda <el>: <el>)
```

```text
+--------------+-------------+-------------+---------------+
|              |    'sum'    |   ['sum']   | {'s': 'sum'}  |
+--------------+-------------+-------------+---------------+
| s.apply(…)   |      3      |    sum  3   |     s  3      |
| s.agg(…)     |             |             |               |
+--------------+-------------+-------------+---------------+
```

```text
+--------------+-------------+-------------+---------------+
|              |    'rank'   |   ['rank']  | {'r': 'rank'} |
+--------------+-------------+-------------+---------------+
| s.apply(…)   |             |      rank   |               |
| s.agg(…)     |    x  1.0   |   x   1.0   |   r  x  1.0   |
|              |    y  2.0   |   y   2.0   |      y  2.0   |
+--------------+-------------+-------------+---------------+
```

### DataFrame
**Table with labeled rows and columns.**

```python
>>> df = pd.DataFrame([[1, 2], [3, 4]], index=['a', 'b'], columns=['x', 'y']); df
   x  y
a  1  2
b  3  4
```

```python
<DF>   = pd.DataFrame(<list_of_rows>)          # Rows can be either lists, dicts or series.
<DF>   = pd.DataFrame(<dict_of_columns>)       # Columns can be either lists, dicts or series.
```

```python
<el>   = <DF>.loc[row_key, col_key]            # Or: <DF>.iloc[row_i, col_i]
<S/DF> = <DF>.loc[row_key/s]                   # Or: <DF>.iloc[row_i/s]
<S/DF> = <DF>.loc[:, col_key/s]                # Or: <DF>.iloc[:, col_i/s]
<DF>   = <DF>.loc[row_bools, col_bools]        # Or: <DF>.iloc[row_bools, col_bools]
```

```python
<S/DF> = <DF>[col_key/s]                       # Or: <DF>.<col_key>
<DF>   = <DF>[<S_of_bools>]                    # Filters rows. For example `df[df.x > 1]`.
<DF>   = <DF>[<DF_of_bools>]                   # Assigns NaN to items that are False in bools.
```

```python
<DF>   = <DF> > <el/S/DF>                      # Returns DF of bools. Treats series as a row.
<DF>   = <DF> + <el/S/DF>                      # Items with non-matching keys get value NaN.
```

```python
<DF>   = <DF>.set_index(col_key)               # Replaces row keys with column's values.
<DF>   = <DF>.reset_index(drop=False)          # Drops or moves row keys to column named index.
<DF>   = <DF>.sort_index(ascending=True)       # Sorts rows by row keys. Use `axis=1` for cols.
<DF>   = <DF>.sort_values(col_key/s)           # Sorts rows by passed column/s. Also `axis=1`.
```

```python
<DF>   = <DF>.head/tail/sample(<int>)          # Returns first, last, or random n rows.
<DF>   = <DF>.describe()                       # Describes columns. Also info(), corr(), shape.
<DF>   = <DF>.query('<query>')                 # Filters rows. For example `df.query('x > 1')`.
```

```python
<DF>.plot.line/area/bar/scatter(x=col_key, …)  # `y=col_key/s`. Also hist/box(column/by=col_k).
plt.show()                                     # Displays the plot. Also plt.savefig(<path>).
```

#### DataFrame — Merge, Join, Concat:
```python
>>> df_2 = pd.DataFrame([[4, 5], [6, 7]], index=['b', 'c'], columns=['y', 'z']); df_2
   y  z
b  4  5
c  6  7
```

```text
+-----------------------+---------------+------------+------------+---------------------------+
|                       |    'outer'    |   'inner'  |   'left'   |       Description         |
+-----------------------+---------------+------------+------------+---------------------------+
| df.merge(df_2,        |    x   y   z  | x   y   z  | x   y   z  | Merges on column if 'on'  |
|          on='y',      | 0  1   2   .  | 3   4   5  | 1   2   .  | or 'left_on/right_on' are |
|          how=…)       | 1  3   4   5  |            | 3   4   5  | set, else on shared cols. |
|                       | 2  .   6   7  |            |            | Uses 'inner' by default.  |
+-----------------------+---------------+------------+------------+---------------------------+
| df.join(df_2,         |    x yl yr  z |            | x yl yr  z | Merges on row keys.       |
|         lsuffix='l',  | a  1  2  .  . | x yl yr  z | 1  2  .  . | Uses 'left' by default.   |
|         rsuffix='r',  | b  3  4  4  5 | 3  4  4  5 | 3  4  4  5 | If Series is passed, it   |
|         how=…)        | c  .  .  6  7 |            |            | is treated as a column.   |
+-----------------------+---------------+------------+------------+---------------------------+
| pd.concat([df, df_2], |    x   y   z  |     y      |            | Adds rows at the bottom.  |
|           axis=0,     | a  1   2   .  |     2      |            | Uses 'outer' by default.  |
|           join=…)     | b  3   4   .  |     4      |            | A Series is treated as a  |
|                       | b  .   4   5  |     4      |            | column. To add a row use  |
|                       | c  .   6   7  |     6      |            | pd.concat([df, DF([s])]). |
+-----------------------+---------------+------------+------------+---------------------------+
| pd.concat([df, df_2], |    x  y  y  z |            |            | Adds columns at the       |
|           axis=1,     | a  1  2  .  . | x  y  y  z |            | right end. Uses 'outer'   |
|           join=…)     | b  3  4  4  5 | 3  4  4  5 |            | by default. A Series is   |
|                       | c  .  .  6  7 |            |            | treated as a column.      |
+-----------------------+---------------+------------+------------+---------------------------+
```

#### DataFrame — Aggregate, Transform, Map:
```python
<S>  = <DF>.sum/max/mean/std/idxmax/count()    # Or: <DF>.apply/agg(lambda <S>: <el>)
<DF> = <DF>.rank/diff/cumsum/ffill/interpo…()  # Or: <DF>.apply/agg/transform(lambda <S>: <S>)
<DF> = <DF>.isna/fillna/isin([<el/coll>])      # Or: <DF>.applymap(lambda <el>: <el>)
```

```text
+-----------------+---------------+---------------+---------------+
|                 |     'sum'     |    ['sum']    | {'x': 'sum'}  |
+-----------------+---------------+---------------+---------------+
| df.apply(…)     |      x  4     |        x  y   |     x  4      |
| df.agg(…)       |      y  6     |   sum  4  6   |               |
+-----------------+---------------+---------------+---------------+
```

```text
+-----------------+---------------+---------------+---------------+
|                 |     'rank'    |    ['rank']   | {'x': 'rank'} |
+-----------------+---------------+---------------+---------------+
| df.apply(…)     |               |       x    y  |               |
| df.agg(…)       |       x    y  |    rank rank  |         x     |
| df.transform(…) |  a  1.0  1.0  |  a  1.0  1.0  |    a  1.0     |
|                 |  b  2.0  2.0  |  b  2.0  2.0  |    b  2.0     |
+-----------------+---------------+---------------+---------------+
```
* **Listed methods process the columns unless they receive `'axis=1'`. Exceptions to this rule are `'<DF>.dropna()'`, `'<DF>.drop(row_key/s)'` and `'<DF>.rename(<dict/func>)'`.**
* **Fifth result's columns are indexed with a multi-index. This means we need a tuple of column keys to specify a column: `'<DF>.loc[row_key, (col_key_1, col_key_2)]'`.**

### Multi-Index
```python
<DF> = <DF>.loc[row_key_1]                     # Or: <DF>.xs(row_key_1)
<DF> = <DF>.loc[:, (slice(None), col_key_2)]   # Or: <DF>.xs(col_key_2, axis=1, level=1)
<DF> = <DF>.set_index(col_keys)                # Creates index from cols. Also `append=False`.
<DF> = <DF>.pivot_table(index=col_key/s)       # `columns=key/s, values=key/s, aggfunc='mean'`.
<S>  = <DF>.stack/unstack(level=-1)            # Combines col keys with row keys or vice versa.
```

### File Formats
```python
<S/DF> = pd.read_json/pickle(<path/url/file>)  # Also io.StringIO(<str>), io.BytesIO(<bytes>).
<DF>   = pd.read_csv/excel(<path/url/file>)    # Also `header/index_col/dtype/usecols/…=<obj>`.
<list> = pd.read_html(<path/url/file>)         # Raises ImportError if webpage has zero tables.
<S/DF> = pd.read_parquet/feather/hdf(<path…>)  # Function read_hdf() accepts `key=<s/df_name>`.
<DF>   = pd.read_sql('<table/query>', <conn>)  # Pass SQLite3/Alchemy connection. See #SQLite.
```

```python
<DF>.to_json/csv/html/latex/parquet(<path>)    # Returns a string/bytes if path is omitted.
<DF>.to_pickle/excel/feather/hdf(<path>)       # Method to_hdf() requires `key=<s/df_name>`.
<DF>.to_sql('<table_name>', <connection>)      # Also `if_exists='fail/replace/append'`.
```
* **`'$ pip3 install "pandas[excel]" odfpy lxml pyarrow'` installs dependencies.**
* **Csv functions use the same dialect as standard library's csv module (e.g. `'sep=","'`).**
* **Read\_csv() only parses dates of columns that are listed in 'parse\_dates'. It automatically tries to detect the format, but it can be helped with 'date\_format' or 'dayfirst' arguments.**
* **We get a dataframe with DatetimeIndex if 'parse_dates' argument includes 'index\_col'. Its `'resample("y/m/d/h")'` method returns Resampler object that is similar to GroupBy.**

### GroupBy
**Object that groups together rows of a dataframe based on the value of the passed column.**

```python
<GB> = <DF>.groupby(col_key/s)                 # Splits DF into groups based on passed column.
<DF> = <GB>.apply/filter(<func>)               # Filter drops a group if func returns False.
<DF> = <GB>.get_group(<el>)                    # Selects a group by grouping column's value.
<S>  = <GB>.size()                             # S of group sizes. Same keys as get_group().
<GB> = <GB>[col_key]                           # Single column GB. All operations return S.
```

```python
<DF> = <GB>.sum/max/mean/std/idxmax/count()    # Or: <GB>.agg(lambda <S>: <el>)
<DF> = <GB>.rank/diff/cumsum/ffill()           # Or: <GB>.transform(lambda <S>: <S>)
<DF> = <GB>.fillna(<el>)                       # Or: <GB>.transform(lambda <S>: <S>)
```

#### Divides rows into groups and sums their columns. Result has a named index that creates column `'z'` on reset_index():
```python
>>> df = pd.DataFrame([[1, 2, 3], [4, 5, 6], [7, 8, 6]], list('abc'), list('xyz'))
>>> gb = df.groupby('z'); gb.apply(print)
   x  y  z
a  1  2  3
   x  y  z
b  4  5  6
c  7  8  6
>>> gb.sum()
    x   y
z
3   1   2
6  11  13
```

### Rolling
**Object for rolling window calculations.**

```python
<RS/RDF/RGB> = <S/DF/GB>.rolling(win_size)     # Also: `min_periods=None, center=False`.
<RS/RDF/RGB> = <RDF/RGB>[col_key/s]            # Or: <RDF/RGB>.<col_key>
<S/DF>       = <R>.mean/sum/max()              # Or: <R>.apply/agg(<agg_func/str>)
```


Plotly
------
```python
# $ pip3 install plotly kaleido pandas
import plotly.express as px, pandas as pd
```

```python
<Fig> = px.line(<DF> [, y=col_key/s [, x=col_key]])   # Also px.line(y=<list> [, x=<list>]).
<Fig>.update_layout(paper_bgcolor='#rrggbb')          # Also `margin=dict(t=0, r=0, b=0, l=0)`.
<Fig>.write_html/json/image('<path>')                 # Use <Fig>.show() to display the plot.
```

```python
<Fig> = px.area/bar/box(<DF>, x=col_key, y=col_keys)  # Also `color=col_key`. All are optional.
<Fig> = px.scatter(<DF>, x=col_key, y=col_keys)       # Also `color/size/symbol=col_key`. Same.
<Fig> = px.scatter_3d(<DF>, x=col_key, y=col_key, …)  # `z=col_key`. Also color, size, symbol.
<Fig> = px.histogram(<DF>, x=col_keys, y=col_key)     # Also color, nbins. All are optional.
```

#### Displays a line chart of total COVID-19 deaths per million grouped by continent:

![Covid Deaths](web/covid_deaths.png)
<div id="2a950764-39fc-416d-97fe-0a6226a3095f" class="plotly-graph-div" style="height:312px; width:914px;"></div>

```python
covid = pd.read_csv('https://raw.githubusercontent.com/owid/covid-19-data/8dde8ca49b'
                    '6e648c17dd420b2726ca0779402651/public/data/owid-covid-data.csv',
                    usecols=['iso_code', 'date', 'population', 'total_deaths'])
continents = pd.read_csv('https://gto76.github.io/python-cheatsheet/web/continents.csv',
                         usecols=['Three_Letter_Country_Code', 'Continent_Name'])
df = pd.merge(covid, continents, left_on='iso_code', right_on='Three_Letter_Country_Code')
df = df.groupby(['Continent_Name', 'date']).sum().reset_index()
df['Total Deaths per Million'] = df.total_deaths * 1e6 / df.population
df = df[df.date > '2020-03-14']
df = df.rename({'date': 'Date', 'Continent_Name': 'Continent'}, axis='columns')
px.line(df, x='Date', y='Total Deaths per Million', color='Continent')
```

#### Displays a multi-axis line chart of total COVID-19 cases and changes in prices of Bitcoin, Dow Jones and gold:

![Covid Cases](web/covid_cases.png)
<div id="e23ccacc-a456-478b-b467-7282a2165921" class="plotly-graph-div" style="height:285px; width:935px;"></div>

```python
# $ pip3 install pandas lxml selenium plotly
import pandas as pd, selenium.webdriver, io, plotly.graph_objects as go

def main():
    covid, (bitcoin, gold, dow) = get_covid_cases(), get_tickers()
    df = wrangle_data(covid, bitcoin, gold, dow)
    display_data(df)

def get_covid_cases():
    url = 'https://catalog.ourworldindata.org/garden/covid/latest/compact/compact.csv'
    df = pd.read_csv(url, parse_dates=['date'])
    df = df[df.country == 'World']
    s = df.set_index('date').total_cases
    return s.rename('Total Cases')

def get_tickers():
    with selenium.webdriver.Chrome() as driver:
        driver.implicitly_wait(10)
        symbols = {'Bitcoin': 'BTC-USD', 'Gold': 'GC=F', 'Dow Jones': '%5EDJI'}
        return [get_ticker(driver, name, symbol) for name, symbol in symbols.items()]

def get_ticker(driver, name, symbol):
    url = f'https://finance.yahoo.com/quote/{symbol}/history/'
    driver.get(url + '?period1=1579651200&period2=9999999999')
    if buttons := driver.find_elements('xpath', '//button[@name="reject"]'):
        buttons[0].click()
    html = io.StringIO(driver.page_source)
    dataframes = pd.read_html(html, parse_dates=['Date'])
    s = dataframes[0].set_index('Date').Open
    return s.rename(name)

def wrangle_data(covid, bitcoin, gold, dow):
    df = pd.concat([bitcoin, gold, dow], axis=1)  # Creates table by joining columns on dates.
    df = df.sort_index().interpolate()            # Sorts rows by date and interpolates NaN-s.
    df = df.loc['2020-02-23':'2021-12-20']        # Keeps rows between specified dates.
    df = (df / df.iloc[0]) * 100                  # Calculates percentages relative to day 1.
    df = df.join(covid)                           # Adds column with covid cases.
    return df.sort_values(df.index[-1], axis=1)   # Sorts columns by last day's value.

def display_data(df):
    figure = go.Figure()
    for col_name in reversed(df.columns):
        yaxis = 'y1' if col_name == 'Total Cases' else 'y2'
        trace = go.Scatter(x=df.index, y=df[col_name], yaxis=yaxis, name=col_name)
        figure.add_trace(trace)
    figure.update_layout(
        width=944,
        height=423,
        yaxis1=dict(title='Total Cases', rangemode='tozero'),
        yaxis2=dict(title='%', rangemode='tozero', overlaying='y', side='right'),
        colorway=['#EF553B', '#636EFA', '#00CC96', '#FFA152'],
        legend=dict(x=1.08)
    )
    figure.show()

if __name__ == '__main__':
    main()
```


Appendix
--------
### Cython
**Library that compiles Python-like code into C.**

```python
# $ pip3 install cython
import pyximport; pyximport.install()                # Module that runs Cython scripts.
import <cython_script>                               # Script must have '.pyx' extension.
```

#### All `'cdef'` definitions are optional, but they contribute to the speed-up:
```python
cdef <type> <var_name> [= <obj/var>]                 # Either Python or C type variable.
cdef <ctype> *<pointer_name> [= &<var>]              # Use <pointer>[0] to get the value.
cdef <ctype>[size] <array_name> [= <coll/array>]     # Also `<ctype>[:] <mview> = <array>`.
cdef <ctype> *<array_name> [= <coll/array/pointer>]  # E.g. `<<ctype> *> malloc(n_bytes)`.
```

```python
cdef <type> <func_name>(<type> [*]<arg_name>): ...   # Omitted types default to `object`.
```

```python
cdef class <class_name>:                             # Also `cdef struct <struct_name>:`.
    cdef public <type> [*]<attr_name>                # Also `... <ctype> [*]<field_name>`.
    def __init__(self, <type> <arg_name>):           # Also `cdef __dealloc__(self):`.
        self.<attr_name> = <arg_name>                # Also `... free(<array/pointer>)`.
```

### Virtual Environments
**System for installing libraries directly into project's directory.**

```perl
$ python3 -m venv NAME         # Creates virtual environment in current directory.
$ source NAME/bin/activate     # Activates it. On Windows run `NAME\Scripts\activate`.
$ pip3 install LIBRARY         # Installs the library into active environment.
$ python3 FILE                 # Runs the script in active environment. Also `./FILE`.
$ deactivate                   # Deactivates the active virtual environment.
```

### Basic Script Template
**Run the script with `'$ python3 FILE'` or `'$ chmod u+x FILE; ./FILE'`. To automatically start the debugger when uncaught exception occurs run `'$ python3 -m pdb -cc FILE'`.**
```python
#!/usr/bin/env python3
#
# Usage: .py
#

from sys import argv, exit
from collections import defaultdict, namedtuple
from dataclasses import make_dataclass
from enum import Enum
import functools as ft, itertools as it, operator as op, re


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


Index
-----
* **Ctrl+F / ⌘F is usually sufficient.**
* **Searching `'#<title>'` on the [webpage](https://gto76.github.io/python-cheatsheet/) will limit the search to the titles.**
* **Click on the title's `'🔗'` to get a link to its section.**
