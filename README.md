Python and Libraries Cheatsheet
===============================

Sum
---
```
sum(<list>)
```

Profile
-------
```
import pycallgraph
graph = pycallgraph.output.GraphvizOutput()
graph.output_file = <filename>
whith pycallgraph.PyCallGraph(output=graph):
    <code>
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

Curses
------
```
import curses
def main():
    curses.wrapper(draw)
def draw(screen):
    screen.clear()
    screen.addstr(0, 0, "Press ESC to quit.")
    while screen.getch() != 27:
        pass
```

Regex
-----
```
import re
re.sub(<regex>, <new>, <text>)
re.search(<regex>, <text>)
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

Bottle
------
```
import bottle
```

### Run
```
bottle.run(host='localhost', port=8080)
bottle.run(host='0.0.0.0', port=80, server='cherypy')
```

### Static request

### Dynamic request

### REST request

Type
----
```
type(<el>) is int/str/set/list
```
```
import numbers
isinstance(<el>, numbers.Number)
```

Arguments
---------
```
import sys
sys.argv
```

Enumerate
---------
```
for i, <el> in enumerate(<list>)
```


System Commands
---------------
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


Datetime
--------
```
import datetime
now = datetime.datetime.now()
now.strftime('%Y%m%d')
now.strftime('%Y%m%d%H%M%S')
```

String
------
```
str.replace(<text>, <old>, <new>)
<str>.isnumeric()
```

Enum
----
```
import enum
class <name>(enum.Enum):
    <value> = <index>
```

Copy
----
```
import copy
copy.copy(<object>)
copy.deepcopy(<object>)
```

Infinity
--------
```
float("inf")
```

Plot
----
```
import matplotlib
matplotlib.pyplot.plot(<data>, ...)
matplotlib.pyplot.show()
matplotlib.pyplot.savefig(<filename>)
```

List
----
```
<list>[<inclusive from>:<exclusive to>:<step size>]
```

Lambda
------
```
lambda <arg1>, <arg2>: <return value>
lambda: <return value>
```

[For]
-----
```
[i+1 for i in range(10)]
[i+1 for i in range(10) if i > 5]
[i+j for i in range(10) for j in range(10)]
```

Class
-----
```
class <name>:
    def __init__(self, <arg>):
        self.a = <arg>
    def __repr__(self):
        return str({'a': self.a})
    def __str__(self):
        return str(self.a)
```

Random
------
```
import random
random.random()
random.randint(<from inclusive>, <to inclusive>)
random.shuffle(<list>)
```

Range
-----
```
range(<to exclusive>)
range(<from inclusive>, <to exclusive>)
range(<from inclusive>, <to exclusive>, <step size>)  # Negative step for backward
```

List
----
```
<list>.sort()
<list>.reverse()
<list>.extend(<list>)
```

Print
-----
```
print(<el1>, <el2>, end='', sep='', file=<file>)
```

Format
------
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

Text Wrap
---------
```
import textwrap
textwrap.wrap(<text>, <width>)
```

Dictionary
----------
<dict>.items()
<dict>.get(<key>, <default>)
<dict>.setdefault(<key>, <default>)
```



































