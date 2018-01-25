Libraries
=========


Plot
----
```
import matplotlib
matplotlib.pyplot.plot(<data>, ...)
matplotlib.pyplot.show()
matplotlib.pyplot.savefig(<filename>)
```


Web
---
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



Profile
-------
```
import timeit
timeit.timeit('"-".join(str(n) for n in range(100))', number=10000)
```

```
import pycallgraph
graph = pycallgraph.output.GraphvizOutput()
graph.output_file = <filename>
with pycallgraph.PyCallGraph(output=graph):
    <code>
```

