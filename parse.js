#!/usr/bin/env node
// Usage: node parse.js
// Script that creates index.html out of web/template.html and README.md.
// It is written in JS because this code used to be executed on the client side.
// To install dependencies run:
// $ npm install -g jsdom jquery showdown highlightjs
// If running on Mac and modules can't be found after installation add:
// export NODE_PATH=/usr/local/lib/node_modules
// to the ~/.bash_profile or ~/.bashrc file and run '$ bash'.


const fs = require('fs');
const jsdom = require('jsdom');
const showdown  = require('showdown');
const hljs = require('highlightjs');


const TOC =
  '<br>' +
  '<h2 id="toc">Contents</h2>\n' +
  '<pre><code class="hljs bash"><strong>ToC</strong> = {\n' +
  '    <strong><span class="hljs-string">\'1. Collections\'</span></strong>: [<a href="#list">List</a>, <a href="#dictionary">Dictionary</a>, <a href="#set">Set</a>, <a href="#tuple">Tuple</a>, <a href="#range">Range</a>, <a href="#enumerate">Enumerate</a>, <a href="#iterator">Iterator</a>, <a href="#generator">Generator</a>],\n' +
  '    <strong><span class="hljs-string">\'2. Types\'</span></strong>:       [<a href="#type">Type</a>, <a href="#string">String</a>, <a href="#regex">Regular_Exp</a>, <a href="#format">Format</a>, <a href="#numbers">Numbers</a>, <a href="#combinatorics">Combinatorics</a>, <a href="#datetime">Datetime</a>],\n' +
  '    <strong><span class="hljs-string">\'3. Syntax\'</span></strong>:      [<a href="#arguments">Args</a>, <a href="#inline">Inline</a>, <a href="#closure">Closure</a>, <a href="#decorator">Decorator</a>, <a href="#class">Class</a>, <a href="#ducktypes">Duck_Type</a>, <a href="#enum">Enum</a>, <a href="#exceptions">Exception</a>],\n' +
  '    <strong><span class="hljs-string">\'4. System\'</span></strong>:      [<a href="#exit">Exit</a>, <a href="#print">Print</a>, <a href="#input">Input</a>, <a href="#commandlinearguments">Command_Line_Arguments</a>, <a href="#open">Open</a>, <a href="#path">Path</a>, <a href="#oscommands">OS_Commands</a>],\n' +
  '    <strong><span class="hljs-string">\'5. Data\'</span></strong>:        [<a href="#json">JSON</a>, <a href="#pickle">Pickle</a>, <a href="#csv">CSV</a>, <a href="#sqlite">SQLite</a>, <a href="#bytes">Bytes</a>, <a href="#struct">Struct</a>, <a href="#array">Array</a>, <a href="#memoryview">Memory_View</a>, <a href="#deque">Deque</a>],\n' +
  '    <strong><span class="hljs-string">\'6. Advanced\'</span></strong>:    [<a href="#threading">Threading</a>, <a href="#operator">Operator</a>, <a href="#introspection">Introspection</a>, <a href="#metaprograming">Metaprograming</a>, <a href="#eval">Eval</a>, <a href="#coroutines">Coroutine</a>],\n' +
  '    <strong><span class="hljs-string">\'7. Libraries\'</span></strong>:   [<a href="#progressbar">Progress_Bar</a>, <a href="#plot">Plot</a>, <a href="#table">Table</a>, <a href="#curses">Curses</a>, <a href="#logging">Logging</a>, <a href="#scraping">Scraping</a>, <a href="#web">Web</a>, <a href="#profiling">Profile</a>,\n' +
  '                       <a href="#numpy">NumPy</a>, <a href="#image">Image</a>, <a href="#audio">Audio</a>, <a href="#pygame">Games</a>, <a href="#pandas">Data</a>, <a href="#pysimplegui">GUI</a>, <a href="https://gto76.github.io/advent-of-code-2020/">🎄</a>]\n' +
  '}\n' +
  '</code></pre>\n';

const LRU_CACHE =
  '<span class="hljs-keyword">from</span> functools <span class="hljs-keyword">import</span> lru_cache\n' +
  '\n' +
  '<span class="hljs-meta">@lru_cache(maxsize=None)</span>\n' +
  '<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">fib</span><span class="hljs-params">(n)</span>:</span>\n' +
  '    <span class="hljs-keyword">return</span> n <span class="hljs-keyword">if</span> n &lt; <span class="hljs-number">2</span> <span class="hljs-keyword">else</span> fib(n-<span class="hljs-number">2</span>) + fib(n-<span class="hljs-number">1</span>)\n';

const CONSTRUCTOR_OVERLOADING =
  '<span class="hljs-class"><span class="hljs-keyword">class</span> &lt;<span class="hljs-title">name</span>&gt;:</span>\n' +
  '    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">__init__</span><span class="hljs-params">(self, a=<span class="hljs-keyword">None</span>)</span>:</span>\n' +
  '        self.a = a\n';

const DATACLASS =
  '<span class="hljs-keyword">from</span> dataclasses <span class="hljs-keyword">import</span> make_dataclass\n' +
  '&lt;class&gt; = make_dataclass(<span class="hljs-string">\'&lt;class_name&gt;\'</span>, &lt;coll_of_attribute_names&gt;)\n' +
  '&lt;class&gt; = make_dataclass(<span class="hljs-string">\'&lt;class_name&gt;\'</span>, &lt;coll_of_tuples&gt;)\n' +
  '&lt;tuple&gt; = (<span class="hljs-string">\'&lt;attr_name&gt;\'</span>, &lt;type&gt; [, &lt;default_value&gt;])';

const SHUTIL_COPY =
  'shutil.copy(from, to)               <span class="hljs-comment"># Copies the file. \'to\' can exist or be a dir.</span>\n' +
  'shutil.copytree(from, to)           <span class="hljs-comment"># Copies the directory. \'to\' must not exist.</span>\n';

const OS_RENAME =
  'os.rename(from, to)                 <span class="hljs-comment"># Renames/moves the file or directory.</span>\n' +
  'os.replace(from, to)                <span class="hljs-comment"># Same, but overwrites \'to\' if it exists.</span>\n';

const TYPE =
  '&lt;class&gt; = type(<span class="hljs-string">\'&lt;class_name&gt;\'</span>, &lt;parents_tuple&gt;, &lt;attributes_dict&gt;)';

const EVAL =
  '<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-keyword">from</span> ast <span class="hljs-keyword">import</span> literal_eval\n' +
  '<span class="hljs-meta">&gt;&gt;&gt; </span>literal_eval(<span class="hljs-string">\'1 + 2\'</span>)\n' +
  '<span class="hljs-number">3</span>\n' +
  '<span class="hljs-meta">&gt;&gt;&gt; </span>literal_eval(<span class="hljs-string">\'[1, 2, 3]\'</span>)\n' +
  '[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]\n' +
  '<span class="hljs-meta">&gt;&gt;&gt; </span>literal_eval(<span class="hljs-string">\'abs(1)\'</span>)\n' +
  'ValueError: malformed node or string\n';

const PROGRESS_BAR =
  '<span class="hljs-comment"># $ pip3 install tqdm</span>\n' +
  '<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm\n' +
  '<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-keyword">from</span> time <span class="hljs-keyword">import</span> sleep\n' +
  '<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-keyword">for</span> el <span class="hljs-keyword">in</span> tqdm([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>], desc=<span class="hljs-string">\'Processing\'</span>):\n' +
  '<span class="hljs-meta">... </span>    sleep(<span class="hljs-number">1</span>)\n' +
  'Processing: 100%|████████████████████| 3/3 [00:03&lt;00:00,  1.00s/it]\n';

const NUMPY_1 =
  '&lt;el&gt;       = &lt;2d_array&gt;[<span class="hljs-number">0</span>, <span class="hljs-number">0</span>]        <span class="hljs-comment"># First element.</span>\n' +
  '&lt;1d_view&gt;  = &lt;2d_array&gt;[<span class="hljs-number">0</span>]           <span class="hljs-comment"># First row.</span>\n' +
  '&lt;1d_view&gt;  = &lt;2d_array&gt;[:, <span class="hljs-number">0</span>]        <span class="hljs-comment"># First column. Also [..., 0].</span>\n' +
  '&lt;3d_view&gt;  = &lt;2d_array&gt;[<span class="hljs-keyword">None</span>, :, :]  <span class="hljs-comment"># Expanded by dimension of size 1.</span>\n';

const NUMPY_2 =
  '&lt;1d_array&gt; = &lt;2d_array&gt;[&lt;1d_row_indexes&gt;, &lt;1d_column_indexes&gt;]\n' +
  '&lt;2d_array&gt; = &lt;2d_array&gt;[&lt;2d_row_indexes&gt;, &lt;2d_column_indexes&gt;]\n';

const NUMPY_3 =
  '&lt;2d_bools&gt; = &lt;2d_array&gt; &gt; <span class="hljs-number">0</span>\n' +
  '&lt;1d_array&gt; = &lt;2d_array&gt;[&lt;2d_bools&gt;]\n';

const PYINSTALLER =
  '$ pip3 install pyinstaller\n' +
  '$ pyinstaller script.py                        <span class="hljs-comment"># Compiles into \'./dist/script\' directory.</span>\n' +
  '$ pyinstaller script.py --onefile              <span class="hljs-comment"># Compiles into \'./dist/script\' console app.</span>\n' +
  '$ pyinstaller script.py --windowed             <span class="hljs-comment"># Compiles into \'./dist/script\' windowed app.</span>\n' +
  '$ pyinstaller script.py --add-data \'&lt;path&gt;:.\'  <span class="hljs-comment"># Adds file to the root of the executable.</span>\n';

const INDEX =
  '<li><strong>Only available in <a href="https://transactions.sendowl.com/products/78175486/4422834F/view">PDF</a>.</strong></li>\n' +
  '<li><strong>Ctrl+F / ⌘F is usually sufficient.</strong></li>\n' +
  '<li><strong>Searching <code class="python hljs"><span class="hljs-string">\'#&lt;title&gt;\'</span></code> will limit the search to the titles.</strong></li>\n';


const DIAGRAM_1_A =
  '+------------------+------------+------------+------------+\n' +
  '|                  |  Sequence  | Collection |  Iterable  |\n' +
  '+------------------+------------+------------+------------+\n';

const DIAGRAM_1_B =
  '┏━━━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━┯━━━━━━━━━━━━┯━━━━━━━━━━━━┓\n' +
  '┃                  │  Sequence  │ Collection │  Iterable  ┃\n' +
  '┠──────────────────┼────────────┼────────────┼────────────┨\n' +
  '┃ list, range, str │     ✓      │     ✓      │     ✓      ┃\n' +
  '┃ dict, set        │            │     ✓      │     ✓      ┃\n' +
  '┃ iter             │            │            │     ✓      ┃\n' +
  '┗━━━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━┷━━━━━━━━━━━━┷━━━━━━━━━━━━┛\n';

const DIAGRAM_2_A =
  '+--------------------+----------+----------+----------+----------+----------+\n' +
  '|                    | Integral | Rational |   Real   | Complex  |  Number  |\n' +
  '+--------------------+----------+----------+----------+----------+----------+\n';

const DIAGRAM_2_B =
  '┏━━━━━━━━━━━━━━━━━━━━┯━━━━━━━━━━┯━━━━━━━━━━┯━━━━━━━━━━┯━━━━━━━━━━┯━━━━━━━━━━┓\n' +
  '┃                    │ Integral │ Rational │   Real   │ Complex  │  Number  ┃\n' +
  '┠────────────────────┼──────────┼──────────┼──────────┼──────────┼──────────┨\n' +
  '┃ int                │    ✓     │    ✓     │    ✓     │    ✓     │    ✓     ┃\n' +
  '┃ fractions.Fraction │          │    ✓     │    ✓     │    ✓     │    ✓     ┃\n' +
  '┃ float              │          │          │    ✓     │    ✓     │    ✓     ┃\n' +
  '┃ complex            │          │          │          │    ✓     │    ✓     ┃\n' +
  '┃ decimal.Decimal    │          │          │          │          │    ✓     ┃\n' +
  '┗━━━━━━━━━━━━━━━━━━━━┷━━━━━━━━━━┷━━━━━━━━━━┷━━━━━━━━━━┷━━━━━━━━━━┷━━━━━━━━━━┛\n';

const DIAGRAM_3_A =
  '+---------------+----------+----------+----------+----------+----------+\n';

const DIAGRAM_3_B =
  '┏━━━━━━━━━━━━━━━┯━━━━━━━━━━┯━━━━━━━━━━┯━━━━━━━━━━┯━━━━━━━━━━┯━━━━━━━━━━┓\n' +
  '┃               │ [ !#$%…] │ [a-zA-Z] │  [¼½¾]   │  [²³¹]   │  [0-9]   ┃\n' +
  '┠───────────────┼──────────┼──────────┼──────────┼──────────┼──────────┨\n' +
  '┃ isprintable() │    ✓     │    ✓     │    ✓     │    ✓     │    ✓     ┃\n' +
  '┃ isalnum()     │          │    ✓     │    ✓     │    ✓     │    ✓     ┃\n' +
  '┃ isnumeric()   │          │          │    ✓     │    ✓     │    ✓     ┃\n' +
  '┃ isdigit()     │          │          │          │    ✓     │    ✓     ┃\n' +
  '┃ isdecimal()   │          │          │          │          │    ✓     ┃\n' +
  '┗━━━━━━━━━━━━━━━┷━━━━━━━━━━┷━━━━━━━━━━┷━━━━━━━━━━┷━━━━━━━━━━┷━━━━━━━━━━┛\n';

const DIAGRAM_4_A =
  "+---------------+-----------------+-----------------+-----------------+-----------------+\n" +
  "|               |    {<float>}    |   {<float>:f}   |   {<float>:e}   |   {<float>:%}   |\n" +
  "+---------------+-----------------+-----------------+-----------------+-----------------+\n";

const DIAGRAM_4_B =
  "┏━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━━┓\n" +
  "┃               │    {&lt;float&gt;}    │   {&lt;float&gt;:f}   │   {&lt;float&gt;:e}   │   {&lt;float&gt;:%}   ┃\n" +
  "┠───────────────┼─────────────────┼─────────────────┼─────────────────┼─────────────────┨\n" +
  "┃   0.000056789 │    '5.6789e-05' │     '0.000057'  │  '5.678900e-05' │     '0.005679%' ┃\n" +
  "┃   0.00056789  │    '0.00056789' │     '0.000568'  │  '5.678900e-04' │     '0.056789%' ┃\n" +
  "┃   0.0056789   │    '0.0056789'  │     '0.005679'  │  '5.678900e-03' │     '0.567890%' ┃\n" +
  "┃   0.056789    │    '0.056789'   │     '0.056789'  │  '5.678900e-02' │     '5.678900%' ┃\n" +
  "┃   0.56789     │    '0.56789'    │     '0.567890'  │  '5.678900e-01' │    '56.789000%' ┃\n" +
  "┃   5.6789      │    '5.6789'     │     '5.678900'  │  '5.678900e+00' │   '567.890000%' ┃\n" +
  "┃  56.789       │   '56.789'      │    '56.789000'  │  '5.678900e+01' │  '5678.900000%' ┃\n" +
  "┃ 567.89        │  '567.89'       │   '567.890000'  │  '5.678900e+02' │ '56789.000000%' ┃\n" +
  "┗━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━━━┛\n";

const DIAGRAM_5_A =
  "+---------------+-----------------+-----------------+-----------------+-----------------+\n" +
  "|               |   {<float>:.2}  |  {<float>:.2f}  |  {<float>:.2e}  |  {<float>:.2%}  |\n" +
  "+---------------+-----------------+-----------------+-----------------+-----------------+\n";

const DIAGRAM_5_B =
  "┏━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━━┓\n" +
  "┃               │   {&lt;float&gt;:.2}  │  {&lt;float&gt;:.2f}  │  {&lt;float&gt;:.2e}  │  {&lt;float&gt;:.2%}  ┃\n" +
  "┠───────────────┼─────────────────┼─────────────────┼─────────────────┼─────────────────┨\n" +
  "┃   0.000056789 │    '5.7e-05'    │       '0.00'    │    '5.68e-05'   │       '0.01%'   ┃\n" +
  "┃   0.00056789  │    '0.00057'    │       '0.00'    │    '5.68e-04'   │       '0.06%'   ┃\n" +
  "┃   0.0056789   │    '0.0057'     │       '0.01'    │    '5.68e-03'   │       '0.57%'   ┃\n" +
  "┃   0.056789    │    '0.057'      │       '0.06'    │    '5.68e-02'   │       '5.68%'   ┃\n" +
  "┃   0.56789     │    '0.57'       │       '0.57'    │    '5.68e-01'   │      '56.79%'   ┃\n" +
  "┃   5.6789      │    '5.7'        │       '5.68'    │    '5.68e+00'   │     '567.89%'   ┃\n" +
  "┃  56.789       │    '5.7e+01'    │      '56.79'    │    '5.68e+01'   │    '5678.90%'   ┃\n" +
  "┃ 567.89        │    '5.7e+02'    │     '567.89'    │    '5.68e+02'   │   '56789.00%'   ┃\n" +
  "┗━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━━━┛\n";

const DIAGRAM_6_A =
  '+------------+------------+------------+------------+--------------+\n' +
  '|            |  Iterable  | Collection |  Sequence  | abc.Sequence |\n' +
  '+------------+------------+------------+------------+--------------+\n';

const DIAGRAM_6_B =
  '┏━━━━━━━━━━━━┯━━━━━━━━━━━━┯━━━━━━━━━━━━┯━━━━━━━━━━━━┯━━━━━━━━━━━━━━┓\n' +
  '┃            │  Iterable  │ Collection │  Sequence  │ abc.Sequence ┃\n' +
  '┠────────────┼────────────┼────────────┼────────────┼──────────────┨\n' +
  '┃ iter()     │     !      │     !      │     ✓      │      ✓       ┃\n' +
  '┃ contains() │     ✓      │     ✓      │     ✓      │      ✓       ┃\n' +
  '┃ len()      │            │     !      │     !      │      !       ┃\n' +
  '┃ getitem()  │            │            │     !      │      !       ┃\n' +
  '┃ reversed() │            │            │     ✓      │      ✓       ┃\n' +
  '┃ index()    │            │            │            │      ✓       ┃\n' +
  '┃ count()    │            │            │            │      ✓       ┃\n' +
  '┗━━━━━━━━━━━━┷━━━━━━━━━━━━┷━━━━━━━━━━━━┷━━━━━━━━━━━━┷━━━━━━━━━━━━━━┛\n';

const DIAGRAM_7_A =
  'BaseException\n' +
  ' +-- SystemExit';

const DIAGRAM_7_B =
  "BaseException\n" +
  " ├── SystemExit                   <span class='hljs-comment'># Raised by the sys.exit() function.</span>\n" +
  " ├── KeyboardInterrupt            <span class='hljs-comment'># Raised when the user hits the interrupt key (ctrl-c).</span>\n" +
  " └── Exception                    <span class='hljs-comment'># User-defined exceptions should be derived from this class.</span>\n" +
  "      ├── ArithmeticError         <span class='hljs-comment'># Base class for arithmetic errors.</span>\n" +
  "      │    └── ZeroDivisionError  <span class='hljs-comment'># Raised when dividing by zero.</span>\n" +
  "      ├── AttributeError          <span class='hljs-comment'># Raised when an attribute is missing.</span>\n" +
  "      ├── EOFError                <span class='hljs-comment'># Raised by input() when it hits end-of-file condition.</span>\n" +
  "      ├── LookupError             <span class='hljs-comment'># Raised when a look-up on a collection fails.</span>\n" +
  "      │    ├── IndexError         <span class='hljs-comment'># Raised when a sequence index is out of range.</span>\n" +
  "      │    └── KeyError           <span class='hljs-comment'># Raised when a dictionary key or set element is not found.</span>\n" +
  "      ├── NameError               <span class='hljs-comment'># Raised when a variable name is not found.</span>\n" +
  "      ├── OSError                 <span class='hljs-comment'># Errors such as “file not found” or “disk full” (see Open).</span>\n" +
  "      │    └── FileNotFoundError  <span class='hljs-comment'># When a file or directory is requested but doesn't exist.</span>\n" +
  "      ├── RuntimeError            <span class='hljs-comment'># Raised by errors that don't fall in other categories.</span>\n" +
  "      │    └── RecursionError     <span class='hljs-comment'># Raised when the maximum recursion depth is exceeded.</span>\n" +
  "      ├── StopIteration           <span class='hljs-comment'># Raised by next() when run on an empty iterator.</span>\n" +
  "      ├── TypeError               <span class='hljs-comment'># Raised when an argument is of wrong type.</span>\n" +
  "      └── ValueError              <span class='hljs-comment'># When an argument is of right type but inappropriate value.</span>\n" +
  "           └── UnicodeError       <span class='hljs-comment'># Raised when encoding/decoding strings to/from bytes fails.</span>\n";

const DIAGRAM_8_A =
  '+-----------+------------+------------+------------+\n' +
  '|           |    list    |    dict    |    set     |\n' +
  '+-----------+------------+------------+------------+\n';

const DIAGRAM_8_B =
  '┏━━━━━━━━━━━┯━━━━━━━━━━━━┯━━━━━━━━━━━━┯━━━━━━━━━━━━┓\n' +
  '┃           │    list    │    dict    │    set     ┃\n' +
  '┠───────────┼────────────┼────────────┼────────────┨\n' +
  '┃ getitem() │ IndexError │  KeyError  │            ┃\n' +
  '┃ pop()     │ IndexError │  KeyError  │  KeyError  ┃\n' +
  '┃ remove()  │ ValueError │            │  KeyError  ┃\n' +
  '┃ index()   │ ValueError │            │            ┃\n' +
  '┗━━━━━━━━━━━┷━━━━━━━━━━━━┷━━━━━━━━━━━━┷━━━━━━━━━━━━┛\n';

const DIAGRAM_9_A =
  '+------------------+--------------+--------------+--------------+\n' +
  '|                  |     excel    |   excel-tab  |     unix     |\n' +
  '+------------------+--------------+--------------+--------------+\n';

const DIAGRAM_9_B =
  "┏━━━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━┓\n" +
  "┃                  │     excel    │   excel-tab  │     unix     ┃\n" +
  "┠──────────────────┼──────────────┼──────────────┼──────────────┨\n" +
  "┃ delimiter        │       ','    │      '\\t'    │       ','    ┃\n" +
  "┃ quotechar        │       '\"'    │       '\"'    │       '\"'    ┃\n" +
  "┃ doublequote      │      True    │      True    │      True    ┃\n" +
  "┃ skipinitialspace │     False    │     False    │     False    ┃\n" +
  "┃ lineterminator   │    '\\r\\n'    │    '\\r\\n'    │      '\\n'    ┃\n" +
  "┃ quoting          │         0    │         0    │         1    ┃\n" +
  "┃ escapechar       │      None    │      None    │      None    ┃\n" +
  "┗━━━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━┛\n";

const DIAGRAM_10_A =
  '+-------------+-------------+\n' +
  '|   Classes   | Metaclasses |\n' +
  '+-------------+-------------|\n' +
  '|   MyClass --> MyMetaClass |\n';

const DIAGRAM_10_B =
  '┏━━━━━━━━━━━━━┯━━━━━━━━━━━━━┓\n' +
  '┃   Classes   │ Metaclasses ┃\n' +
  '┠─────────────┼─────────────┨\n' +
  '┃   MyClass ──→ MyMetaClass ┃\n' +
  '┃             │     ↓       ┃\n' +
  '┃    object ─────→ type ←╮  ┃\n' +
  '┃             │     ↑ ╰──╯  ┃\n' +
  '┃     str ──────────╯       ┃\n' +
  '┗━━━━━━━━━━━━━┷━━━━━━━━━━━━━┛\n';

const DIAGRAM_11_A =
  '+-------------+-------------+\n' +
  '|   Classes   | Metaclasses |\n' +
  '+-------------+-------------|\n' +
  '|   MyClass   | MyMetaClass |\n';

const DIAGRAM_11_B =
  '┏━━━━━━━━━━━━━┯━━━━━━━━━━━━━┓\n' +
  '┃   Classes   │ Metaclasses ┃\n' +
  '┠─────────────┼─────────────┨\n' +
  '┃   MyClass   │ MyMetaClass ┃\n' +
  '┃      ↓      │     ↓       ┃\n' +
  '┃    object ←───── type     ┃\n' +
  '┃      ↑      │             ┃\n' +
  '┃     str     │             ┃\n' +
  '┗━━━━━━━━━━━━━┷━━━━━━━━━━━━━┛\n';

const DIAGRAM_12_A =
  '+-----------+-------------+------+-------------+\n' +
  '| sampwidth |     min     | zero |     max     |\n' +
  '+-----------+-------------+------+-------------+\n';

const DIAGRAM_12_B =
  '┏━━━━━━━━━━━┯━━━━━━━━━━━━━┯━━━━━━┯━━━━━━━━━━━━━┓\n' +
  '┃ sampwidth │     min     │ zero │     max     ┃\n' +
  '┠───────────┼─────────────┼──────┼─────────────┨\n' +
  '┃     1     │           0 │  128 │         255 ┃\n' +
  '┃     2     │      -32768 │    0 │       32767 ┃\n' +
  '┃     3     │    -8388608 │    0 │     8388607 ┃\n' +
  '┃     4     │ -2147483648 │    0 │  2147483647 ┃\n' +
  '┗━━━━━━━━━━━┷━━━━━━━━━━━━━┷━━━━━━┷━━━━━━━━━━━━━┛\n';

const DIAGRAM_13_A =
  '| sr.apply(…) |      3      |    sum  3   |     s  3      |';

const DIAGRAM_13_B =
  "┏━━━━━━━━━━━━━┯━━━━━━━━━━━━━┯━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━┓\n" +
  "┃             │    'sum'    │   ['sum']   │ {'s': 'sum'}  ┃\n" +
  "┠─────────────┼─────────────┼─────────────┼───────────────┨\n" +
  "┃ sr.apply(…) │      3      │    sum  3   │     s  3      ┃\n" +
  "┃ sr.agg(…)   │             │             │               ┃\n" +
  "┗━━━━━━━━━━━━━┷━━━━━━━━━━━━━┷━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━┛\n";

const DIAGRAM_14_A =
  '| sr.apply(…) |             |      rank   |               |';

const DIAGRAM_14_B =
  "┏━━━━━━━━━━━━━┯━━━━━━━━━━━━━┯━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━┓\n" +
  "┃             │    'rank'   │   ['rank']  │ {'r': 'rank'} ┃\n" +
  "┠─────────────┼─────────────┼─────────────┼───────────────┨\n" +
  "┃ sr.apply(…) │             │      rank   │               ┃\n" +
  "┃ sr.agg(…)   │     x  1    │   x     1   │    r  x  1    ┃\n" +
  "┃ sr.trans(…) │     y  2    │   y     2   │       y  2    ┃\n" +
  "┗━━━━━━━━━━━━━┷━━━━━━━━━━━━━┷━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━┛\n";

const DIAGRAM_15_A =
  '+------------------------+---------------+------------+------------+--------------------------+';

const DIAGRAM_15_B =
  "┏━━━━━━━━━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━┯━━━━━━━━━━━━┯━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━━━━━━━━━━━┓\n" +
  "┃                        │    'outer'    │   'inner'  │   'left'   │       Description        ┃\n" +
  "┠────────────────────────┼───────────────┼────────────┼────────────┼──────────────────────────┨\n" +
  "┃ l.merge(r, on='y',     │    x   y   z  │ x   y   z  │ x   y   z  │ Joins/merges on column.  ┃\n" +
  "┃            how=…)      │ 0  1   2   .  │ 3   4   5  │ 1   2   .  │ Also accepts left_on and ┃\n" +
  "┃                        │ 1  3   4   5  │            │ 3   4   5  │ right_on parameters.     ┃\n" +
  "┃                        │ 2  .   6   7  │            │            │ Uses 'inner' by default. ┃\n" +
  "┠────────────────────────┼───────────────┼────────────┼────────────┼──────────────────────────┨\n" +
  "┃ l.join(r, lsuffix='l', │    x yl yr  z │            │ x yl yr  z │ Joins/merges on row keys.┃\n" +
  "┃           rsuffix='r', │ a  1  2  .  . │ x yl yr  z │ 1  2  .  . │ Uses 'left' by default.  ┃\n" +
  "┃           how=…)       │ b  3  4  4  5 │ 3  4  4  5 │ 3  4  4  5 │ If r is a series, it is  ┃\n" +
  "┃                        │ c  .  .  6  7 │            │            │ first converted to DF.   ┃\n" +
  "┠────────────────────────┼───────────────┼────────────┼────────────┼──────────────────────────┨\n" +
  "┃ pd.concat([l, r],      │    x   y   z  │     y      │            │ Adds rows at the bottom. ┃\n" +
  "┃           axis=0,      │ a  1   2   .  │     2      │            │ Uses 'outer' by default. ┃\n" +
  "┃           join=…)      │ b  3   4   .  │     4      │            │ By default works the     ┃\n" +
  "┃                        │ b  .   4   5  │     4      │            │ same as `l.append(r)`.   ┃\n" +
  "┃                        │ c  .   6   7  │     6      │            │                          ┃\n" +
  "┠────────────────────────┼───────────────┼────────────┼────────────┼──────────────────────────┨\n" +
  "┃ pd.concat([l, r],      │    x  y  y  z │            │            │ Adds columns at the      ┃\n" +
  "┃           axis=1,      │ a  1  2  .  . │ x  y  y  z │            │ right end.               ┃\n" +
  "┃           join=…)      │ b  3  4  4  5 │ 3  4  4  5 │            │ Uses 'outer' by default. ┃\n" +
  "┃                        │ c  .  .  6  7 │            │            │                          ┃\n" +
  "┠────────────────────────┼───────────────┼────────────┼────────────┼──────────────────────────┨\n" +
  "┃ l.combine_first(r)     │    x   y   z  │            │            │ Adds missing rows and    ┃\n" +
  "┃                        │ a  1   2   .  │            │            │ columns.                 ┃\n" +
  "┃                        │ b  3   4   5  │            │            │                          ┃\n" +
  "┃                        │ c  .   6   7  │            │            │                          ┃\n" +
  "┗━━━━━━━━━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━┷━━━━━━━━━━━━┷━━━━━━━━━━━━┷━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n";

const DIAGRAM_16_A =
  '| df.apply(…) |             |       x  y  |               |';

const DIAGRAM_16_B =
  "┏━━━━━━━━━━━━━┯━━━━━━━━━━━━━┯━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━┓\n" +
  "┃             │    'sum'    │   ['sum']   │ {'x': 'sum'}  ┃\n" +
  "┠─────────────┼─────────────┼─────────────┼───────────────┨\n" +
  "┃ df.apply(…) │             │       x  y  │               ┃\n" +
  "┃ df.agg(…)   │     x  4    │  sum  4  6  │     x  4      ┃\n" +
  "┃             │     y  6    │             │               ┃\n" +
  "┗━━━━━━━━━━━━━┷━━━━━━━━━━━━━┷━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━┛\n";

const DIAGRAM_17_A =
  '| df.apply(…) |      x  y   |      x    y |        x      |';

const DIAGRAM_17_B =
  "┏━━━━━━━━━━━━━┯━━━━━━━━━━━━━┯━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━┓\n" +
  "┃             │    'rank'   │   ['rank']  │ {'x': 'rank'} ┃\n" +
  "┠─────────────┼─────────────┼─────────────┼───────────────┨\n" +
  "┃ df.apply(…) │      x  y   │      x    y │        x      ┃\n" +
  "┃ df.agg(…)   │   a  1  1   │   rank rank │     a  1      ┃\n" +
  "┃ df.trans(…) │   b  2  2   │ a    1    1 │     b  2      ┃\n" +
  "┃             │             │ b    2    2 │               ┃\n" +
  "┗━━━━━━━━━━━━━┷━━━━━━━━━━━━━┷━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━┛\n";

const DIAGRAM_18_A =
  '| gb.agg(…)   |      x   y  |      x  y   |      x    y |        x      |';

const DIAGRAM_18_B =
  "┏━━━━━━━━━━━━━┯━━━━━━━━━━━━━┯━━━━━━━━━━━━━┯━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━┓\n" +
  "┃             │    'sum'    │    'rank'   │   ['rank']  │ {'x': 'rank'} ┃\n" +
  "┠─────────────┼─────────────┼─────────────┼─────────────┼───────────────┨\n" +
  "┃ gb.agg(…)   │      x   y  │      x  y   │      x    y │        x      ┃\n" +
  "┃             │  z          │   a  1  1   │   rank rank │     a  1      ┃\n" +
  "┃             │  3   1   2  │   b  1  1   │ a    1    1 │     b  1      ┃\n" +
  "┃             │  6  11  13  │   c  2  2   │ b    1    1 │     c  2      ┃\n" +
  "┃             │             │             │ c    2    2 │               ┃\n" +
  "┠─────────────┼─────────────┼─────────────┼─────────────┼───────────────┨\n" +
  "┃ gb.trans(…) │      x   y  │      x  y   │             │               ┃\n" +
  "┃             │  a   1   2  │   a  1  1   │             │               ┃\n" +
  "┃             │  b  11  13  │   b  1  1   │             │               ┃\n" +
  "┃             │  c  11  13  │   c  1  1   │             │               ┃\n" +
  "┗━━━━━━━━━━━━━┷━━━━━━━━━━━━━┷━━━━━━━━━━━━━┷━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━┛\n";


function main() {
  const html = getMd();
  initDom(html);
  modifyPage();
  const template = readFile('web/template.html');
  const tokens = template.split('<div id=main_container></div>');
  const text = `${tokens[0]} ${document.body.innerHTML} ${tokens[1]}`;
  writeToFile('index.html', text);
}

function getMd() {
  var readme = readFile('README.md');
  var readme = readme.replace("#semaphore-event-barrier", "#semaphoreeventbarrier");
  const converter = new showdown.Converter();
  return converter.makeHtml(readme);
}

function initDom(html) {
  const { JSDOM } = jsdom;
  const dom = new JSDOM(html);
  const $ = (require('jquery'))(dom.window);
  global.$ = $;
  global.document = dom.window.document;
}

function modifyPage() {
  removeOrigToc();
  addToc();
  insertLinks();
  unindentBanner();
  updateDiagrams();
  highlightCode();
  fixPandasDiagram();
  removePlotImages();
}

function removeOrigToc() {
  const headerContents = $('#contents');
  const contentsList = headerContents.next();
  headerContents.remove();
  contentsList.remove();
}

function addToc() {
  const nodes = $.parseHTML(TOC);
  $('#main').before(nodes);
}

function insertLinks() {
  $('h2').each(function() {
    const aId = $(this).attr('id');
    const text = $(this).text();
    const line = `<a href="#${aId}" name="${aId}">#</a>${text}`;
    $(this).html(line);
  });
}

function unindentBanner() {
  const montyImg = $('img').first();
  montyImg.parent().addClass('banner');
  const downloadPraragrapth = $('p').first();
  downloadPraragrapth.addClass('banner');
}

function updateDiagrams() {
  $(`code:contains(${DIAGRAM_1_A})`).html(DIAGRAM_1_B);
  $(`code:contains(${DIAGRAM_2_A})`).html(DIAGRAM_2_B);
  $(`code:contains(${DIAGRAM_3_A})`).html(DIAGRAM_3_B);
  $(`code:contains(${DIAGRAM_4_A})`).html(DIAGRAM_4_B);
  $(`code:contains(${DIAGRAM_5_A})`).html(DIAGRAM_5_B);
  $(`code:contains(${DIAGRAM_6_A})`).html(DIAGRAM_6_B);
  $(`code:contains(${DIAGRAM_7_A})`).html(DIAGRAM_7_B);
  $(`code:contains(${DIAGRAM_8_A})`).html(DIAGRAM_8_B);
  $(`code:contains(${DIAGRAM_9_A})`).html(DIAGRAM_9_B);
  $(`code:contains(${DIAGRAM_10_A})`).html(DIAGRAM_10_B);
  $(`code:contains(${DIAGRAM_11_A})`).html(DIAGRAM_11_B);
  $(`code:contains(${DIAGRAM_12_A})`).html(DIAGRAM_12_B).removeClass("text").removeClass("language-text").addClass("python");
  $(`code:contains(${DIAGRAM_13_A})`).html(DIAGRAM_13_B).removeClass("text").removeClass("language-text").addClass("python");
  $(`code:contains(${DIAGRAM_14_A})`).html(DIAGRAM_14_B).removeClass("text").removeClass("language-text").addClass("python");
  $(`code:contains(${DIAGRAM_15_A})`).html(DIAGRAM_15_B).removeClass("text").removeClass("language-text").addClass("python");
  $(`code:contains(${DIAGRAM_16_A})`).html(DIAGRAM_16_B).removeClass("text").removeClass("language-text").addClass("python");
  $(`code:contains(${DIAGRAM_17_A})`).html(DIAGRAM_17_B).removeClass("text").removeClass("language-text").addClass("python");
  $(`code:contains(${DIAGRAM_18_A})`).html(DIAGRAM_18_B).removeClass("text").removeClass("language-text").addClass("python");
}

function highlightCode() {
  setApaches(['<D>', '<T>', '<DT>', '<TD>', '<a>', '<n>']);
  $('code').not('.python').not('.text').not('.bash').not('.apache').addClass('python');
  $('code').each(function(index) {
      hljs.highlightBlock(this);
  });
  fixClasses();
  fixHighlights();
  preventPageBreaks();
  fixPageBreaksFile();
  fixPageBreaksStruct();
  insertPageBreaks();
}

function setApaches(elements) {
  for (el of elements) {
    $(`code:contains(${el})`).addClass('apache');
  }
}

function fixClasses() {
  // Changes class="hljs-keyword" to class="hljs-title" of 'class' keyword.
  $('.hljs-class').filter(':contains(class \')').find(':first-child').removeClass('hljs-keyword').addClass('hljs-title')
}

function fixHighlights() {
  $(`code:contains(@lru_cache(maxsize=None))`).html(LRU_CACHE);
  $(`code:contains((self, a=None):)`).html(CONSTRUCTOR_OVERLOADING);
  $(`code:contains(make_dataclass(\'<class_name>\')`).html(DATACLASS);
  $(`code:contains(shutil.copy)`).html(SHUTIL_COPY);
  $(`code:contains(os.rename)`).html(OS_RENAME);
  $(`code:contains(\'<class_name>\', <parents_tuple>, <attributes_dict>)`).html(TYPE);
  $(`code:contains(ValueError: malformed node)`).html(EVAL);
  $(`code:contains(pip3 install tqdm)`).html(PROGRESS_BAR);
  $(`code:contains(<el>       = <2d_array>[0, 0])`).html(NUMPY_1).removeClass().addClass("python language-python hljs");
  $(`code:contains(<1d_array> = <2d_array>[<1d_row_indexes>)`).html(NUMPY_2).removeClass().addClass("python language-python hljs");
  $(`code:contains(<2d_bools> = <2d_array> > 0)`).html(NUMPY_3).removeClass().addClass("python language-python hljs");
  $(`code:contains(pip3 install pyinstaller)`).html(PYINSTALLER);
  $(`ul:contains(Only available in)`).html(INDEX);
}

function preventPageBreaks() {
  $(':header').each(function(index) {
    var el = $(this)
    var untilPre = el.nextUntil('pre')
    var untilH2 = el.nextUntil('h2')
    if ((untilPre.length < untilH2.length) || el.prop('tagName') === 'H1') {
      untilPre.add(el).next().add(el).wrapAll("<div></div>");
    } else {
      untilH2.add(el).wrapAll("<div></div>");
    }
  });
}

function fixPageBreaksFile() {
  const modesDiv = $('#file').parent().parent().parent()
  move(modesDiv, 'file')
  move(modesDiv, 'exceptions-1')
}

function fixPageBreaksStruct() {
  const formatDiv = $('#floatingpointtypes').parent().parent().parent().parent()
  move(formatDiv, 'floatingpointtypes')
  move(formatDiv, 'integertypesuseacapitalletterforunsignedtypeminimumandstandardsizesareinbrackets')
  move(formatDiv, 'forstandardsizesstartformatstringwith')
}

function move(anchor_el, el_id) {
  const el = $('#'+el_id).parent()
  anchor_el.after(el)
}

function insertPageBreaks() {
  insertPageBreakBefore('#print')
}

function insertPageBreakBefore(an_id) {
  $('<div class="pagebreak"></div>').insertBefore($(an_id).parent())
}

function fixPandasDiagram() {
  const diagram_15 = '┏━━━━━━━━━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━┯━━━━━━━━━━━━┯━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━━━━━━━━━━━┓';
  $(`code:contains(${diagram_15})`).find(".hljs-keyword:contains(and)").after("and");
  $(`code:contains(${diagram_15})`).find(".hljs-keyword:contains(as)").after("as");
  $(`code:contains(${diagram_15})`).find(".hljs-keyword:contains(is)").after("is");
  $(`code:contains(${diagram_15})`).find(".hljs-keyword").remove();
}

function removePlotImages() {
  $('img[alt="Covid Deaths"]').remove();
  $('img[alt="Covid Cases"]').remove();
}

function readFile(filename) {
  try {  
    return fs.readFileSync(filename, 'utf8');
  } catch(e) {
    console.error('Error:', e.stack);
  }
}

function writeToFile(filename, text) {
  try {  
    return fs.writeFileSync(filename, text, 'utf8');
  } catch(e) {
    console.error('Error:', e.stack);
  }
}

main();
