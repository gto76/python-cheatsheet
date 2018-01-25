Minimal Python Cheatsheet
=========================

Main
----
```
if __name__ == '__main__':
    main()
```

Ranges
------
```python
range(<from inclusive>, <to exclusive>, <step size>)  # Negative step for backward.
<list>[<from inclusive>:<to exclusive>:<step size>]   # Negative step for backward.
random.randint(<from inclusive>, <to inclusive>)
```

Dictionary
----------
```
<dict>.items()
<dict>.get(<key>, <default>)
<dict>.setdefault(<key>, <default>)
```

Enumerate
---------
```
for i, <el> in enumerate(<list/dict/set>)
```

Inline
------
### For
```pythonstub
[i+j for i in range(10) for j in range(10) if i+j > 5]
```

### Lambda
```
lambda <arg1>, <arg2>: <return value>
```

String
------

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
{:<min width>}  -> '<el>    '
{:><min width>} -> '    <el>'
{:^<min width>} -> '  <el>  '
{:_<min width>}  -> '<el>____'
{:.<max width>} -> '<e>'
{:<max widht>.<min width>} -> '    <e>'
{:<max width>.<no of decimals>f} -> '  3.14'
```

Infinity
--------
```
float("inf")
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

Random
------
```
import random
random.random()
random.shuffle(<list>)
```

Datetime
--------
```
import datetime
now = datetime.datetime.now()
now.strftime('%Y%m%d')
now.strftime('%Y%m%d%H%M%S')
```

System
------

### Arguments
```
import sys
sys.argv
```

### Read
```
with open(<filename>, encoding='utf-8') as file:
    return file.readlines()
```

### Write
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

### Read
```
with open(<filename>, encoding='utf-8') as file:
    return json.load(file)
```

### Write
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




























