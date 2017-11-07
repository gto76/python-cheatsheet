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



