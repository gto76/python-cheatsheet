#!/usr/bin/env node
// Usage: node parse.js
//
// Script that creates index.html out of web/template.html and README.md.
//
// It is written in JS because this code used to be executed on the client side.
// To install the Node.js and npm run:
// $ sudo apt install nodejs npm  # On macOS use `brew install ...` instead.
//
// To install dependencies globally, run:
// $ npm install -g jsdom jquery showdown highlightjs@9.12.0
//
// If running on macOS and modules can't be found after installation add:
// export NODE_PATH=/usr/local/lib/node_modules
// to the ~/.bash_profile or ~/.bashrc file and run '$ bash'.
//
// To avoid problems with permissions and path variables, install modules
// into project's directory using:
// $ npm install jsdom jquery showdown highlightjs@9.12.0
//
// It is also advisable to add a Bash script into .git/hooks directory, that will
// run this script before every commit. It should be named 'pre-commit' and it
// should contain the following line: `./parse.js`.


const fs = require('fs');
const jsdom = require('jsdom');
const showdown  = require('showdown');
const hljs = require('highlightjs');


const TOC =
  '<pre style="border-left: none;padding-left: 1.9px;"><code class="hljs bash" style="line-height: 1.327em;"><strong>ToC</strong> = {\n' +
  '    <strong><span class="hljs-string">\'1. Collections\'</span></strong>: [<a href="#list">List</a>, <a href="#dictionary">Dictionary</a>, <a href="#set">Set</a>, <a href="#tuple">Tuple</a>, <a href="#range">Range</a>, <a href="#enumerate">Enumerate</a>, <a href="#iterator">Iterator</a>, <a href="#generator">Generator</a>],\n' +
  '    <strong><span class="hljs-string">\'2. Types\'</span></strong>:       [<a href="#type">Type</a>, <a href="#string">String</a>, <a href="#regex">Regular_Exp</a>, <a href="#format">Format</a>, <a href="#numbers">Numbers</a>, <a href="#combinatorics">Combinatorics</a>, <a href="#datetime">Datetime</a>],\n' +
  '    <strong><span class="hljs-string">\'3. Syntax\'</span></strong>:      [<a href="#arguments">Args</a>, <a href="#inline">Inline</a>, <a href="#imports">Import</a>, <a href="#decorator">Decorator</a>, <a href="#class">Class</a>, <a href="#ducktypes">Duck_Types</a>, <a href="#enum">Enum</a>, <a href="#exceptions">Exception</a>],\n' +
  '    <strong><span class="hljs-string">\'4. System\'</span></strong>:      [<a href="#exit">Exit</a>, <a href="#print">Print</a>, <a href="#input">Input</a>, <a href="#commandlinearguments">Command_Line_Arguments</a>, <a href="#open">Open</a>, <a href="#paths">Path</a>, <a href="#oscommands">OS_Commands</a>],\n' +
  '    <strong><span class="hljs-string">\'5. Data\'</span></strong>:        [<a href="#json">JSON</a>, <a href="#pickle">Pickle</a>, <a href="#csv">CSV</a>, <a href="#sqlite">SQLite</a>, <a href="#bytes">Bytes</a>, <a href="#struct">Struct</a>, <a href="#array">Array</a>, <a href="#memoryview">Memory_View</a>, <a href="#deque">Deque</a>],\n' +
  '    <strong><span class="hljs-string">\'6. Advanced\'</span></strong>:    [<a href="#operator">Operator</a>, <a href="#matchstatement">Match_Stmt</a>, <a href="#logging">Logging</a>, <a href="#introspection">Introspection</a>, <a href="#threading">Threading</a>, <a href="#coroutines">Coroutines</a>],\n' +
  '    <strong><span class="hljs-string">\'7. Libraries\'</span></strong>:   [<a href="#progressbar">Progress_Bar</a>, <a href="#plot">Plot</a>, <a href="#table">Table</a>, <a href="#consoleapp">Console_App</a>, <a href="#guiapp">GUI</a>, <a href="#scraping">Scraping</a>, <a href="#webapp">Web</a>, <a href="#profiling">Profile</a>],\n' +
  '    <strong><span class="hljs-string">\'8. Multimedia\'</span></strong>:  [<a href="#numpy">NumPy</a>, <a href="#image">Image</a>, <a href="#animation">Animation</a>, <a href="#audio">Audio</a>, <a href="#synthesizer">Synthesizer</a>, <a href="#pygame">Pygame</a>, <a href="#pandas">Pandas</a>, <a href="#plotly">Plotly</a>]\n' +
  '}\n' +
  '</code></pre>\n';

const BIN_HEX =
  '&lt;int&gt; = ±<span class="hljs-number">0b</span>&lt;bin&gt;                                  <span class="hljs-comment"># Or: ±0x&lt;hex&gt;</span>\n' +
  '&lt;int&gt; = int(<span class="hljs-string">\'±&lt;bin&gt;\'</span>, <span class="hljs-number">2</span>)                          <span class="hljs-comment"># Or: int(\'±&lt;hex&gt;\', 16)</span>\n' +
  '&lt;int&gt; = int(<span class="hljs-string">\'±0b&lt;bin&gt;\'</span>, <span class="hljs-number">0</span>)                        <span class="hljs-comment"># Or: int(\'±0x&lt;hex&gt;\', 0)</span>\n' +
  '&lt;str&gt; = bin(&lt;int&gt;)                                <span class="hljs-comment"># Returns \'[-]0b&lt;bin&gt;\'. Also hex().</span>\n';

const CACHE =
  '<span class="hljs-keyword">from</span> functools <span class="hljs-keyword">import</span> cache\n' +
  '\n' +
  '<span class="hljs-meta">@cache</span>\n' +
  '<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">fib</span><span class="hljs-params">(n)</span>:</span>\n' +
  '    <span class="hljs-keyword">return</span> n <span class="hljs-keyword">if</span> n &lt; <span class="hljs-number">2</span> <span class="hljs-keyword">else</span> fib(n-<span class="hljs-number">2</span>) + fib(n-<span class="hljs-number">1</span>)';

const PARAMETRIZED_DECORATOR =
  '<span class="hljs-keyword">from</span> functools <span class="hljs-keyword">import</span> wraps\n' +
  '\n' +
  '<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">debug</span><span class="hljs-params">(print_result=<span class="hljs-keyword">False</span>)</span>:</span>\n' +
  '    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">decorator</span><span class="hljs-params">(func)</span>:</span>\n' +
  '<span class="hljs-meta">        @wraps(func)</span>\n' +
  '        <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">out</span><span class="hljs-params">(*args, **kwargs)</span>:</span>\n' +
  '            result = func(*args, **kwargs)\n' +
  '            print(func.__name__, result <span class="hljs-keyword">if</span> print_result <span class="hljs-keyword">else</span> <span class="hljs-string">\'\'</span>)\n' +
  '            <span class="hljs-keyword">return</span> result\n' +
  '        <span class="hljs-keyword">return</span> out\n' +
  '    <span class="hljs-keyword">return</span> decorator\n' +
  '\n' +
  '<span class="hljs-meta">@debug(print_result=True)</span>\n' +
  '<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">add</span><span class="hljs-params">(x, y)</span>:</span>\n' +
  '    <span class="hljs-keyword">return</span> x + y\n';

const REPR_USE_CASES =
  'print/str/repr([&lt;obj&gt;])\n' +
  'print/str/repr({&lt;obj&gt;: &lt;obj&gt;})\n' +
  '<span class="hljs-string">f\'<span class="hljs-subst">{&lt;obj&gt;!r}</span>\'</span>\n' +
  'Z = make_dataclass(<span class="hljs-string">\'Z\'</span>, [<span class="hljs-string">\'a\'</span>]); print/str/repr(Z(&lt;obj&gt;))\n' +
  '<span class="hljs-meta">&gt;&gt;&gt; </span>&lt;obj&gt;\n';

const CONSTRUCTOR_OVERLOADING =
  '<span class="hljs-class"><span class="hljs-keyword">class</span> &lt;<span class="hljs-title">name</span>&gt;:</span>\n' +
  '    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">__init__</span><span class="hljs-params">(self, a=<span class="hljs-keyword">None</span>)</span>:</span>\n' +
  '        self.a = a\n';

const SHUTIL_COPY =
  'shutil.copy(from, to)               <span class="hljs-comment"># Copies the file. \'to\' can exist or be a dir.</span>\n' +
  'shutil.copy2(from, to)              <span class="hljs-comment"># Also copies creation and modification time.</span>\n' +
  'shutil.copytree(from, to)           <span class="hljs-comment"># Copies the directory. \'to\' must not exist.</span>\n';

const OS_RENAME =
  'os.rename(from, to)                 <span class="hljs-comment"># Renames/moves the file or directory.</span>\n' +
  'os.replace(from, to)                <span class="hljs-comment"># Same, but overwrites file \'to\' even on Windows.</span>\n' +
  'shutil.move(from, to)               <span class="hljs-comment"># Rename() that moves into \'to\' if it\'s a dir.</span>\n';

const STRUCT_FORMAT =
  '<span class="hljs-section">\'&lt;n&gt;s\'</span><span class="hljs-attribute"></span>';

const MATCH =
  '<span class="hljs-keyword">match</span> &lt;object/expression&gt;:\n' +
  '    <span class="hljs-keyword">case</span> &lt;pattern&gt; [<span class="hljs-keyword">if</span> &lt;condition&gt;]:\n' +
  '        &lt;code&gt;\n' +
  '    ...\n';

const MATCH_EXAMPLE =
  '<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-keyword">from</span> pathlib <span class="hljs-keyword">import</span> Path\n' +
  '<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-keyword">match</span> Path(<span class="hljs-string">\'/home/gto/python-cheatsheet/README.md\'</span>):\n' +
  '<span class="hljs-meta">... </span>    <span class="hljs-keyword">case</span> Path(\n' +
  '<span class="hljs-meta">... </span>        parts=[<span class="hljs-string">\'/\'</span>, <span class="hljs-string">\'home\'</span>, user, *_]\n' +
  '<span class="hljs-meta">... </span>    ) <span class="hljs-keyword">as</span> p <span class="hljs-keyword">if</span> p.name.lower().startswith(<span class="hljs-string">\'readme\'</span>) <span class="hljs-keyword">and</span> p.is_file():\n' +
  '<span class="hljs-meta">... </span>        print(<span class="hljs-string">f\'<span class="hljs-subst">{p.name}</span> is a readme file that belongs to user <span class="hljs-subst">{user}</span>.\'</span>)\n' +
  'README.md is a readme file that belongs to user gto.\n';

const COROUTINES =
  '<span class="hljs-keyword">import</span> asyncio, collections, curses, curses.textpad, enum, random\n' +
  '\n' +
  'P = collections.namedtuple(<span class="hljs-string">\'P\'</span>, <span class="hljs-string">\'x y\'</span>)     <span class="hljs-comment"># Position</span>\n' +
  'D = enum.Enum(<span class="hljs-string">\'D\'</span>, <span class="hljs-string">\'n e s w\'</span>)              <span class="hljs-comment"># Direction</span>\n' +
  'W, H = <span class="hljs-number">15</span>, <span class="hljs-number">7</span>                               <span class="hljs-comment"># Width, Height</span>\n' +
  '\n' +
  '<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">main</span><span class="hljs-params">(screen)</span>:</span>\n' +
  '    curses.curs_set(<span class="hljs-number">0</span>)                     <span class="hljs-comment"># Makes cursor invisible.</span>\n' +
  '    screen.nodelay(<span class="hljs-keyword">True</span>)                   <span class="hljs-comment"># Makes getch() non-blocking.</span>\n' +
  '    asyncio.run(main_coroutine(screen))    <span class="hljs-comment"># Starts running asyncio code.</span>\n' +
  '\n' +
  '<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">main_coroutine</span><span class="hljs-params">(screen)</span>:</span>\n' +
  '    moves = asyncio.Queue()\n' +
  '    state = {<span class="hljs-string">\'*\'</span>: P(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>)} | {id_: P(W//<span class="hljs-number">2</span>, H//<span class="hljs-number">2</span>) <span class="hljs-keyword">for</span> id_ <span class="hljs-keyword">in</span> range(<span class="hljs-number">10</span>)}\n' +
  '    ai    = [random_controller(id_, moves) <span class="hljs-keyword">for</span> id_ <span class="hljs-keyword">in</span> range(<span class="hljs-number">10</span>)]\n' +
  '    mvc   = [human_controller(screen, moves), model(moves, state), view(state, screen)]\n' +
  '    tasks = [asyncio.create_task(coro) <span class="hljs-keyword">for</span> coro <span class="hljs-keyword">in</span> ai + mvc]\n' +
  '    <span class="hljs-keyword">await</span> asyncio.wait(tasks, return_when=asyncio.FIRST_COMPLETED)\n' +
  '\n' +
  '<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">random_controller</span><span class="hljs-params">(id_, moves)</span>:</span>\n' +
  '    <span class="hljs-keyword">while</span> <span class="hljs-keyword">True</span>:\n' +
  '        d = random.choice(list(D))\n' +
  '        moves.put_nowait((id_, d))\n' +
  '        <span class="hljs-keyword">await</span> asyncio.sleep(random.triangular(<span class="hljs-number">0.01</span>, <span class="hljs-number">0.65</span>))\n' +
  '\n' +
  '<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">human_controller</span><span class="hljs-params">(screen, moves)</span>:</span>\n' +
  '    <span class="hljs-keyword">while</span> <span class="hljs-keyword">True</span>:\n' +
  '        key_mappings = {<span class="hljs-number">258</span>: D.s, <span class="hljs-number">259</span>: D.n, <span class="hljs-number">260</span>: D.w, <span class="hljs-number">261</span>: D.e}\n' +
  '        <span class="hljs-keyword">if</span> d := key_mappings.get(screen.getch()):\n' +
  '            moves.put_nowait((<span class="hljs-string">\'*\'</span>, d))\n' +
  '        <span class="hljs-keyword">await</span> asyncio.sleep(<span class="hljs-number">0.005</span>)\n' +
  '\n' +
  '<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">model</span><span class="hljs-params">(moves, state)</span>:</span>\n' +
  '    <span class="hljs-keyword">while</span> state[<span class="hljs-string">\'*\'</span>] <span class="hljs-keyword">not</span> <span class="hljs-keyword">in</span> (state[id_] <span class="hljs-keyword">for</span> id_ <span class="hljs-keyword">in</span> range(<span class="hljs-number">10</span>)):\n' +
  '        id_, d = <span class="hljs-keyword">await</span> moves.get()\n' +
  '        deltas = {D.n: P(<span class="hljs-number">0</span>, <span class="hljs-number">-1</span>), D.e: P(<span class="hljs-number">1</span>, <span class="hljs-number">0</span>), D.s: P(<span class="hljs-number">0</span>, <span class="hljs-number">1</span>), D.w: P(<span class="hljs-number">-1</span>, <span class="hljs-number">0</span>)}\n' +
  '        state[id_] = P((state[id_].x + deltas[d].x) % W, (state[id_].y + deltas[d].y) % H)\n' +
  '\n' +
  '<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">view</span><span class="hljs-params">(state, screen)</span>:</span>\n' +
  '    offset = P(curses.COLS//<span class="hljs-number">2</span> - W//<span class="hljs-number">2</span>, curses.LINES//<span class="hljs-number">2</span> - H//<span class="hljs-number">2</span>)\n' +
  '    <span class="hljs-keyword">while</span> <span class="hljs-keyword">True</span>:\n' +
  '        screen.erase()\n' +
  '        curses.textpad.rectangle(screen, offset.y-<span class="hljs-number">1</span>, offset.x-<span class="hljs-number">1</span>, offset.y+H, offset.x+W)\n' +
  '        <span class="hljs-keyword">for</span> id_, p <span class="hljs-keyword">in</span> state.items():\n' +
  '            screen.addstr(offset.y + (p.y - state[<span class="hljs-string">\'*\'</span>].y + H//<span class="hljs-number">2</span>) % H,\n' +
  '                          offset.x + (p.x - state[<span class="hljs-string">\'*\'</span>].x + W//<span class="hljs-number">2</span>) % W, str(id_))\n' +
  '        screen.refresh()\n' +
  '        <span class="hljs-keyword">await</span> asyncio.sleep(<span class="hljs-number">0.005</span>)\n' +
  '\n' +
  '<span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">\'__main__\'</span>:\n' +
  '    curses.wrapper(main)\n';

const CURSES =
  '<span class="hljs-comment"># $ pip3 install windows-curses</span>\n' +
  '<span class="hljs-keyword">import</span> curses, os\n' +
  '<span class="hljs-keyword">from</span> curses <span class="hljs-keyword">import</span> A_REVERSE, KEY_UP, KEY_DOWN, KEY_LEFT, KEY_RIGHT, KEY_ENTER\n' +
  '\n' +
  '<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">main</span><span class="hljs-params">(screen)</span>:</span>\n' +
  '    ch, first, selected, paths = <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, os.listdir()\n' +
  '    <span class="hljs-keyword">while</span> ch != ord(<span class="hljs-string">\'q\'</span>):\n' +
  '        height, width = screen.getmaxyx()\n' +
  '        screen.erase()\n' +
  '        <span class="hljs-keyword">for</span> y, filename <span class="hljs-keyword">in</span> enumerate(paths[first : first+height]):\n' +
  '            color = A_REVERSE <span class="hljs-keyword">if</span> filename == paths[selected] <span class="hljs-keyword">else</span> <span class="hljs-number">0</span>\n' +
  '            screen.addnstr(y, <span class="hljs-number">0</span>, filename, width-<span class="hljs-number">1</span>, color)\n' +
  '        ch = screen.getch()\n' +
  '        selected -= (ch == KEY_UP) <span class="hljs-keyword">and</span> (selected &gt; <span class="hljs-number">0</span>)\n' +
  '        selected += (ch == KEY_DOWN) <span class="hljs-keyword">and</span> (selected &lt; len(paths)-<span class="hljs-number">1</span>)\n' +
  '        first = min(first, selected)\n' +
  '        first = max(first, selected - (height-<span class="hljs-number">1</span>))\n' +
  '        <span class="hljs-keyword">if</span> ch <span class="hljs-keyword">in</span> [KEY_LEFT, KEY_RIGHT, KEY_ENTER, ord(<span class="hljs-string">\'\\n\'</span>), ord(<span class="hljs-string">\'\\r\'</span>)]:\n' +
  '            new_dir = <span class="hljs-string">\'..\'</span> <span class="hljs-keyword">if</span> ch == KEY_LEFT <span class="hljs-keyword">else</span> paths[selected]\n' +
  '            <span class="hljs-keyword">if</span> os.path.isdir(new_dir):\n' +
  '                os.chdir(new_dir)\n' +
  '                first, selected, paths = <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, os.listdir()\n' +
  '\n' +
  '<span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">\'__main__\'</span>:\n' +
  '    curses.wrapper(main)\n';

const PROGRESS_BAR =
  '<span class="hljs-comment"># $ pip3 install tqdm</span>\n' +
  '<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-keyword">import</span> tqdm, time\n' +
  '<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-keyword">for</span> el <span class="hljs-keyword">in</span> tqdm.tqdm([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>], desc=<span class="hljs-string">\'Processing\'</span>):\n' +
  '<span class="hljs-meta">... </span>    time.sleep(<span class="hljs-number">1</span>)\n' +
  'Processing: 100%|████████████████████| 3/3 [00:03&lt;00:00,  1.00s/it]\n';

const LOGGING_EXAMPLE =
  '<span class="hljs-meta">&gt;&gt;&gt; </span>logger = log.getLogger(<span class="hljs-string">\'my_module\'</span>)\n' +
  '<span class="hljs-meta">&gt;&gt;&gt; </span>handler = log.FileHandler(<span class="hljs-string">\'test.log\'</span>, encoding=<span class="hljs-string">\'utf-8\'</span>)\n' +
  '<span class="hljs-meta">&gt;&gt;&gt; </span>handler.setFormatter(log.Formatter(<span class="hljs-string">\'%(asctime)s %(levelname)s:%(name)s:%(message)s\'</span>))\n' +
  '<span class="hljs-meta">&gt;&gt;&gt; </span>logger.addHandler(handler)\n' +
  '<span class="hljs-meta">&gt;&gt;&gt; </span>logger.setLevel(<span class="hljs-string">\'DEBUG\'</span>)\n' +
  '<span class="hljs-meta">&gt;&gt;&gt; </span>log.basicConfig()\n' +
  '<span class="hljs-meta">&gt;&gt;&gt; </span>log.root.handlers[<span class="hljs-number">0</span>].setLevel(<span class="hljs-string">\'WARNING\'</span>)\n' +
  '<span class="hljs-meta">&gt;&gt;&gt; </span>logger.critical(<span class="hljs-string">\'Running out of disk space.\'</span>)\n' +
  'CRITICAL:my_module:Running out of disk space.\n' +
  '<span class="hljs-meta">&gt;&gt;&gt; </span>print(open(<span class="hljs-string">\'test.log\'</span>).read())\n' +
  '2023-02-07 23:21:01,430 CRITICAL:my_module:Running out of disk space.\n';

const AUDIO_1 =
  '<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">write_to_wav_file</span><span class="hljs-params">(filename, samples_f, p=<span class="hljs-keyword">None</span>, nchannels=<span class="hljs-number">1</span>, sampwidth=<span class="hljs-number">2</span>, framerate=<span class="hljs-number">44100</span>)</span>:</span>\n' +
  '    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">get_bytes</span><span class="hljs-params">(a_float)</span>:</span>\n' +
  '        a_float = max(<span class="hljs-number">-1</span>, min(<span class="hljs-number">1</span> - <span class="hljs-number">2e-16</span>, a_float))\n' +
  '        a_float += (p.sampwidth == <span class="hljs-number">1</span>)\n' +
  '        a_float *= pow(<span class="hljs-number">2</span>, (p.sampwidth * <span class="hljs-number">8</span>) - <span class="hljs-number">1</span>)\n' +
  '        <span class="hljs-keyword">return</span> int(a_float).to_bytes(p.sampwidth, <span class="hljs-string">\'little\'</span>, signed=(p.sampwidth != <span class="hljs-number">1</span>))\n' +
  '    <span class="hljs-keyword">if</span> p <span class="hljs-keyword">is</span> <span class="hljs-keyword">None</span>:\n' +
  '        p = wave._wave_params(nchannels, sampwidth, framerate, <span class="hljs-number">0</span>, <span class="hljs-string">\'NONE\'</span>, <span class="hljs-string">\'not compressed\'</span>)\n' +
  '    <span class="hljs-keyword">with</span> wave.open(filename, <span class="hljs-string">\'wb\'</span>) <span class="hljs-keyword">as</span> file:\n' +
  '        file.setparams(p)\n' +
  '        file.writeframes(<span class="hljs-string">b\'\'</span>.join(get_bytes(f) <span class="hljs-keyword">for</span> f <span class="hljs-keyword">in</span> samples_f))\n';

const AUDIO_2 =
  '<span class="hljs-keyword">from</span> math <span class="hljs-keyword">import</span> pi, sin\n' +
  'samples_f = (sin(i * <span class="hljs-number">2</span> * pi * <span class="hljs-number">440</span> / <span class="hljs-number">44100</span>) <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> range(<span class="hljs-number">100_000</span>))\n' +
  'write_to_wav_file(<span class="hljs-string">\'test.wav\'</span>, samples_f)\n';

const MARIO =
  '<span class="hljs-keyword">import</span> collections, dataclasses, enum, io, itertools <span class="hljs-keyword">as</span> it, pygame <span class="hljs-keyword">as</span> pg, urllib.request\n' +
  '<span class="hljs-keyword">from</span> random <span class="hljs-keyword">import</span> randint\n' +
  '\n' +
  'P = collections.namedtuple(<span class="hljs-string">\'P\'</span>, <span class="hljs-string">\'x y\'</span>)          <span class="hljs-comment"># Position</span>\n' +
  'D = enum.Enum(<span class="hljs-string">\'D\'</span>, <span class="hljs-string">\'n e s w\'</span>)                   <span class="hljs-comment"># Direction</span>\n' +
  'W, H, MAX_S = <span class="hljs-number">50</span>, <span class="hljs-number">50</span>, P(<span class="hljs-number">5</span>, <span class="hljs-number">10</span>)                  <span class="hljs-comment"># Width, Height, Max speed</span>\n' +
  '\n' +
  '<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">main</span><span class="hljs-params">()</span>:</span>\n' +
  '    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">get_screen</span><span class="hljs-params">()</span>:</span>\n' +
  '        pg.init()\n' +
  '        <span class="hljs-keyword">return</span> pg.display.set_mode((W*<span class="hljs-number">16</span>, H*<span class="hljs-number">16</span>))\n' +
  '    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">get_images</span><span class="hljs-params">()</span>:</span>\n' +
  '        url = <span class="hljs-string">\'https://gto76.github.io/python-cheatsheet/web/mario_bros.png\'</span>\n' +
  '        img = pg.image.load(io.BytesIO(urllib.request.urlopen(url).read()))\n' +
  '        <span class="hljs-keyword">return</span> [img.subsurface(get_rect(x, <span class="hljs-number">0</span>)) <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> range(img.get_width() // <span class="hljs-number">16</span>)]\n' +
  '    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">get_mario</span><span class="hljs-params">()</span>:</span>\n' +
  '        Mario = dataclasses.make_dataclass(<span class="hljs-string">\'Mario\'</span>, <span class="hljs-string">\'rect spd facing_left frame_cycle\'</span>.split())\n' +
  '        <span class="hljs-keyword">return</span> Mario(get_rect(<span class="hljs-number">1</span>, <span class="hljs-number">1</span>), P(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>), <span class="hljs-keyword">False</span>, it.cycle(range(<span class="hljs-number">3</span>)))\n' +
  '    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">get_tiles</span><span class="hljs-params">()</span>:</span>\n' +
  '        border = [(x, y) <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> range(W) <span class="hljs-keyword">for</span> y <span class="hljs-keyword">in</span> range(H) <span class="hljs-keyword">if</span> x <span class="hljs-keyword">in</span> [<span class="hljs-number">0</span>, W-<span class="hljs-number">1</span>] <span class="hljs-keyword">or</span> y <span class="hljs-keyword">in</span> [<span class="hljs-number">0</span>, H-<span class="hljs-number">1</span>]]\n' +
  '        platforms = [(randint(<span class="hljs-number">1</span>, W-<span class="hljs-number">2</span>), randint(<span class="hljs-number">2</span>, H-<span class="hljs-number">2</span>)) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> range(W*H // <span class="hljs-number">10</span>)]\n' +
  '        <span class="hljs-keyword">return</span> [get_rect(x, y) <span class="hljs-keyword">for</span> x, y <span class="hljs-keyword">in</span> border + platforms]\n' +
  '    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">get_rect</span><span class="hljs-params">(x, y)</span>:</span>\n' +
  '        <span class="hljs-keyword">return</span> pg.Rect(x*<span class="hljs-number">16</span>, y*<span class="hljs-number">16</span>, <span class="hljs-number">16</span>, <span class="hljs-number">16</span>)\n' +
  '    run(get_screen(), get_images(), get_mario(), get_tiles())\n' +
  '\n' +
  '<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">run</span><span class="hljs-params">(screen, images, mario, tiles)</span>:</span>\n' +
  '    clock = pg.time.Clock()\n' +
  '    pressed = set()\n' +
  '    <span class="hljs-keyword">while</span> <span class="hljs-keyword">not</span> pg.event.get(pg.QUIT):\n' +
  '        clock.tick(<span class="hljs-number">28</span>)\n' +
  '        pressed |= {e.key <span class="hljs-keyword">for</span> e <span class="hljs-keyword">in</span> pg.event.get(pg.KEYDOWN)}\n' +
  '        pressed -= {e.key <span class="hljs-keyword">for</span> e <span class="hljs-keyword">in</span> pg.event.get(pg.KEYUP)}\n' +
  '        update_speed(mario, tiles, pressed)\n' +
  '        update_position(mario, tiles)\n' +
  '        draw(screen, images, mario, tiles)\n' +
  '\n' +
  '<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">update_speed</span><span class="hljs-params">(mario, tiles, pressed)</span>:</span>\n' +
  '    x, y = mario.spd\n' +
  '    x += <span class="hljs-number">2</span> * ((pg.K_RIGHT <span class="hljs-keyword">in</span> pressed) - (pg.K_LEFT <span class="hljs-keyword">in</span> pressed))\n' +
  '    x += (x &lt; <span class="hljs-number">0</span>) - (x &gt; <span class="hljs-number">0</span>)\n' +
  '    y += <span class="hljs-number">1</span> <span class="hljs-keyword">if</span> D.s <span class="hljs-keyword">not</span> <span class="hljs-keyword">in</span> get_boundaries(mario.rect, tiles) <span class="hljs-keyword">else</span> (pg.K_UP <span class="hljs-keyword">in</span> pressed) * <span class="hljs-number">-10</span>\n' +
  '    mario.spd = P(x=max(-MAX_S.x, min(MAX_S.x, x)), y=max(-MAX_S.y, min(MAX_S.y, y)))\n' +
  '\n' +
  '<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">update_position</span><span class="hljs-params">(mario, tiles)</span>:</span>\n' +
  '    x, y = mario.rect.topleft\n' +
  '    n_steps = max(abs(s) <span class="hljs-keyword">for</span> s <span class="hljs-keyword">in</span> mario.spd)\n' +
  '    <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> range(n_steps):\n' +
  '        mario.spd = stop_on_collision(mario.spd, get_boundaries(mario.rect, tiles))\n' +
  '        x, y = x + (mario.spd.x / n_steps), y + (mario.spd.y / n_steps)\n' +
  '        mario.rect.topleft = x, y\n' +
  '\n' +
  '<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">get_boundaries</span><span class="hljs-params">(rect, tiles)</span>:</span>\n' +
  '    deltas = {D.n: P(<span class="hljs-number">0</span>, <span class="hljs-number">-1</span>), D.e: P(<span class="hljs-number">1</span>, <span class="hljs-number">0</span>), D.s: P(<span class="hljs-number">0</span>, <span class="hljs-number">1</span>), D.w: P(<span class="hljs-number">-1</span>, <span class="hljs-number">0</span>)}\n' +
  '    <span class="hljs-keyword">return</span> {d <span class="hljs-keyword">for</span> d, delta <span class="hljs-keyword">in</span> deltas.items() <span class="hljs-keyword">if</span> rect.move(delta).collidelist(tiles) != <span class="hljs-number">-1</span>}\n' +
  '\n' +
  '<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">stop_on_collision</span><span class="hljs-params">(spd, bounds)</span>:</span>\n' +
  '    <span class="hljs-keyword">return</span> P(x=<span class="hljs-number">0</span> <span class="hljs-keyword">if</span> (D.w <span class="hljs-keyword">in</span> bounds <span class="hljs-keyword">and</span> spd.x &lt; <span class="hljs-number">0</span>) <span class="hljs-keyword">or</span> (D.e <span class="hljs-keyword">in</span> bounds <span class="hljs-keyword">and</span> spd.x &gt; <span class="hljs-number">0</span>) <span class="hljs-keyword">else</span> spd.x,\n' +
  '             y=<span class="hljs-number">0</span> <span class="hljs-keyword">if</span> (D.n <span class="hljs-keyword">in</span> bounds <span class="hljs-keyword">and</span> spd.y &lt; <span class="hljs-number">0</span>) <span class="hljs-keyword">or</span> (D.s <span class="hljs-keyword">in</span> bounds <span class="hljs-keyword">and</span> spd.y &gt; <span class="hljs-number">0</span>) <span class="hljs-keyword">else</span> spd.y)\n' +
  '\n' +
  '<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">draw</span><span class="hljs-params">(screen, images, mario, tiles)</span>:</span>\n' +
  '    screen.fill((<span class="hljs-number">85</span>, <span class="hljs-number">168</span>, <span class="hljs-number">255</span>))\n' +
  '    mario.facing_left = mario.spd.x &lt; <span class="hljs-number">0</span> <span class="hljs-keyword">if</span> mario.spd.x <span class="hljs-keyword">else</span> mario.facing_left\n' +
  '    is_airborne = D.s <span class="hljs-keyword">not</span> <span class="hljs-keyword">in</span> get_boundaries(mario.rect, tiles)\n' +
  '    image_index = <span class="hljs-number">4</span> <span class="hljs-keyword">if</span> is_airborne <span class="hljs-keyword">else</span> (next(mario.frame_cycle) <span class="hljs-keyword">if</span> mario.spd.x <span class="hljs-keyword">else</span> <span class="hljs-number">6</span>)\n' +
  '    screen.blit(images[image_index + (mario.facing_left * <span class="hljs-number">9</span>)], mario.rect)\n' +
  '    <span class="hljs-keyword">for</span> t <span class="hljs-keyword">in</span> tiles:\n' +
  '        is_border = t.x <span class="hljs-keyword">in</span> [<span class="hljs-number">0</span>, (W-<span class="hljs-number">1</span>)*<span class="hljs-number">16</span>] <span class="hljs-keyword">or</span> t.y <span class="hljs-keyword">in</span> [<span class="hljs-number">0</span>, (H-<span class="hljs-number">1</span>)*<span class="hljs-number">16</span>]\n' +
  '        screen.blit(images[<span class="hljs-number">18</span> <span class="hljs-keyword">if</span> is_border <span class="hljs-keyword">else</span> <span class="hljs-number">19</span>], t)\n' +
  '    pg.display.flip()\n' +
  '\n' +
  '<span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">\'__main__\'</span>:\n' +
  '    main()\n';

const GROUPBY =
  '<span class="hljs-meta">&gt;&gt;&gt; </span>df = pd.DataFrame([[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>], [<span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>], [<span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">6</span>]], list(<span class="hljs-string">\'abc\'</span>), list(<span class="hljs-string">\'xyz\'</span>))\n' +
  '<span class="hljs-meta">&gt;&gt;&gt; </span>gb = df.groupby(<span class="hljs-string">\'z\'</span>); gb.apply(print)\n' +
  '   x  y  z\n' +
  'a  <span class="hljs-number">1</span>  <span class="hljs-number">2</span>  <span class="hljs-number">3</span>\n' +
  '   x  y  z\n' +
  'b  <span class="hljs-number">4</span>  <span class="hljs-number">5</span>  <span class="hljs-number">6</span>\n' +
  'c  <span class="hljs-number">7</span>  <span class="hljs-number">8</span>  <span class="hljs-number">6</span>\n' +
  '<span class="hljs-meta">&gt;&gt;&gt; </span>gb.sum()\n' +
  '    x   y\n' +
  'z\n' +
  '<span class="hljs-number">3</span>   <span class="hljs-number">1</span>   <span class="hljs-number">2</span>\n' +
  '<span class="hljs-number">6</span>  <span class="hljs-number">11</span>  <span class="hljs-number">13</span>';


const CYTHON_1 =
  '<span class="hljs-keyword">cdef</span> &lt;ctype/type&gt; &lt;var_name&gt; [= &lt;obj&gt;]\n' +
  '<span class="hljs-keyword">cdef</span> &lt;ctype&gt;[n_elements] &lt;var_name&gt; [= &lt;coll_of_nums&gt;]\n' +
  '<span class="hljs-keyword">cdef</span> &lt;ctype/type/void&gt; &lt;func_name&gt;(&lt;ctype/type&gt; &lt;arg_name&gt;): ...\n';

const CYTHON_2 =
  '<span class="hljs-keyword">cdef</span> <span class="hljs-class"><span class="hljs-keyword">class</span> &lt;<span class="hljs-title">class_name</span>&gt;:</span>\n' +
  '    <span class="hljs-keyword">cdef</span> <span class="hljs-keyword">public</span> &lt;ctype/type&gt; &lt;attr_name&gt;\n' +
  '    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">__init__</span><span class="hljs-params">(self, &lt;ctype/type&gt; &lt;arg_name&gt;)</span>:</span>\n' +
  '        self.&lt;attr_name&gt; = &lt;arg_name&gt;\n';

const INDEX =
  '<li><strong>Ctrl+F / ⌘F is usually sufficient.</strong></li>\n' +
  '<li><strong>Searching <code class="python hljs"><span class="hljs-string">\'#&lt;title&gt;\'</span></code> will limit the search to the titles.</strong></li>\n' +
  '<li><strong>Click on the title\'s <code class="python hljs"><span class="hljs-string">\'#\'</span></code> to get a link to its section.</strong></li>\n';


const DIAGRAM_1_A =
  '+------------------+------------+------------+------------+\n' +
  '|                  |  Iterable  | Collection |  Sequence  |\n' +
  '+------------------+------------+------------+------------+\n';

const DIAGRAM_1_B =
  '┏━━━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━┯━━━━━━━━━━━━┯━━━━━━━━━━━━┓\n' +
  '┃                  │  Iterable  │ Collection │  Sequence  ┃\n' +
  '┠──────────────────┼────────────┼────────────┼────────────┨\n' +
  '┃ list, range, str │     ✓      │     ✓      │     ✓      ┃\n' +
  '┃ dict, set        │     ✓      │     ✓      │            ┃\n' +
  '┃ iter             │     ✓      │            │            ┃\n' +
  '┗━━━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━┷━━━━━━━━━━━━┷━━━━━━━━━━━━┛\n';

const DIAGRAM_2_A =
  '+--------------------+----------+----------+----------+----------+----------+\n' +
  '|                    |  Number  |  Complex |   Real   | Rational | Integral |\n' +
  '+--------------------+----------+----------+----------+----------+----------+\n';

const DIAGRAM_2_B =
  '┏━━━━━━━━━━━━━━━━━━━━┯━━━━━━━━━━┯━━━━━━━━━━┯━━━━━━━━━━┯━━━━━━━━━━┯━━━━━━━━━━┓\n' +
  '┃                    │  Number  │  Complex │   Real   │ Rational │ Integral ┃\n' +
  '┠────────────────────┼──────────┼──────────┼──────────┼──────────┼──────────┨\n' +
  '┃ int                │    ✓     │    ✓     │    ✓     │    ✓     │    ✓     ┃\n' +
  '┃ fractions.Fraction │    ✓     │    ✓     │    ✓     │    ✓     │          ┃\n' +
  '┃ float              │    ✓     │    ✓     │    ✓     │          │          ┃\n' +
  '┃ complex            │    ✓     │    ✓     │          │          │          ┃\n' +
  '┃ decimal.Decimal    │    ✓     │          │          │          │          ┃\n' +
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
  "+--------------+----------------+----------------+----------------+----------------+\n" +
  "|              |    {<float>}   |   {<float>:f}  |   {<float>:e}  |   {<float>:%}  |\n" +
  "+--------------+----------------+----------------+----------------+----------------+\n";

const DIAGRAM_4_B =
  "┏━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━┓\n" +
  "┃              │    {&lt;float&gt;}   │   {&lt;float&gt;:f}  │   {&lt;float&gt;:e}  │   {&lt;float&gt;:%}  ┃\n" +
  "┠──────────────┼────────────────┼────────────────┼────────────────┼────────────────┨\n" +
  "┃  0.000056789 │   '5.6789e-05' │    '0.000057'  │ '5.678900e-05' │    '0.005679%' ┃\n" +
  "┃  0.00056789  │   '0.00056789' │    '0.000568'  │ '5.678900e-04' │    '0.056789%' ┃\n" +
  "┃  0.0056789   │   '0.0056789'  │    '0.005679'  │ '5.678900e-03' │    '0.567890%' ┃\n" +
  "┃  0.056789    │   '0.056789'   │    '0.056789'  │ '5.678900e-02' │    '5.678900%' ┃\n" +
  "┃  0.56789     │   '0.56789'    │    '0.567890'  │ '5.678900e-01' │   '56.789000%' ┃\n" +
  "┃  5.6789      │   '5.6789'     │    '5.678900'  │ '5.678900e+00' │  '567.890000%' ┃\n" +
  "┃ 56.789       │  '56.789'      │   '56.789000'  │ '5.678900e+01' │ '5678.900000%' ┃\n" +
  "┗━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━━┛\n" +
  "\n" +
  "┏━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━┓\n" +
  "┃              │  {&lt;float&gt;:.2}  │  {&lt;float&gt;:.2f} │  {&lt;float&gt;:.2e} │  {&lt;float&gt;:.2%} ┃\n" +
  "┠──────────────┼────────────────┼────────────────┼────────────────┼────────────────┨\n" +
  "┃  0.000056789 │    '5.7e-05'   │      '0.00'    │   '5.68e-05'   │      '0.01%'   ┃\n" +
  "┃  0.00056789  │    '0.00057'   │      '0.00'    │   '5.68e-04'   │      '0.06%'   ┃\n" +
  "┃  0.0056789   │    '0.0057'    │      '0.01'    │   '5.68e-03'   │      '0.57%'   ┃\n" +
  "┃  0.056789    │    '0.057'     │      '0.06'    │   '5.68e-02'   │      '5.68%'   ┃\n" +
  "┃  0.56789     │    '0.57'      │      '0.57'    │   '5.68e-01'   │     '56.79%'   ┃\n" +
  "┃  5.6789      │    '5.7'       │      '5.68'    │   '5.68e+00'   │    '567.89%'   ┃\n" +
  "┃ 56.789       │    '5.7e+01'   │     '56.79'    │   '5.68e+01'   │   '5678.90%'   ┃\n" +
  "┗━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━━┛\n";

const DIAGRAM_5_A =
  "+--------------+----------------+----------------+----------------+----------------+\n" +
  "|              |  {<float>:.2}  |  {<float>:.2f} |  {<float>:.2e} |  {<float>:.2%} |\n" +
  "+--------------+----------------+----------------+----------------+----------------+\n";

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
  "      ├── ArithmeticError         <span class='hljs-comment'># Base class for arithmetic errors such as ZeroDivisionError.</span>\n" +
  "      ├── AssertionError          <span class='hljs-comment'># Raised by `assert &lt;exp&gt;` if expression returns false value.</span>\n" +
  "      ├── AttributeError          <span class='hljs-comment'># Raised when object doesn't have requested attribute/method.</span>\n" +
  "      ├── EOFError                <span class='hljs-comment'># Raised by input() when it hits an end-of-file condition.</span>\n" +
  "      ├── LookupError             <span class='hljs-comment'># Base class for errors when a collection can't find an item.</span>\n" +
  "      │    ├── IndexError         <span class='hljs-comment'># Raised when a sequence index is out of range.</span>\n" +
  "      │    └── KeyError           <span class='hljs-comment'># Raised when a dictionary key or set element is missing.</span>\n" +
  "      ├── MemoryError             <span class='hljs-comment'># Out of memory. May be too late to start deleting variables.</span>\n" +
  "      ├── NameError               <span class='hljs-comment'># Raised when nonexistent name (variable/func/class) is used.</span>\n" +
  "      │    └── UnboundLocalError  <span class='hljs-comment'># Raised when local name is used before it's being defined.</span>\n" +
  "      ├── OSError                 <span class='hljs-comment'># Errors such as FileExistsError/TimeoutError (see #Open).</span>\n" +
  "      │    └── ConnectionError    <span class='hljs-comment'># Errors such as BrokenPipeError/ConnectionAbortedError.</span>\n" +
  "      ├── RuntimeError            <span class='hljs-comment'># Raised by errors that don't fall into other categories.</span>\n" +
  "      │    ├── NotImplementedEr…  <span class='hljs-comment'># Can be raised by abstract methods or by unfinished code.</span>\n" +
  "      │    └── RecursionError     <span class='hljs-comment'># Raised when the maximum recursion depth is exceeded.</span>\n" +
  "      ├── StopIteration           <span class='hljs-comment'># Raised when an empty iterator is passed to next().</span>\n" +
  "      ├── TypeError               <span class='hljs-comment'># When an argument of the wrong type is passed to function.</span>\n" +
  "      └── ValueError              <span class='hljs-comment'># When argument has the right type but inappropriate value.</span>\n";

const DIAGRAM_8_A =
  '+-----------+------------+------------+------------+\n' +
  '|           |    List    |    Set     |    Dict    |\n' +
  '+-----------+------------+------------+------------+\n';

const DIAGRAM_8_B =
  '┏━━━━━━━━━━━┯━━━━━━━━━━━━┯━━━━━━━━━━━━┯━━━━━━━━━━━━┓\n' +
  '┃           │    List    │    Set     │    Dict    ┃\n' +
  '┠───────────┼────────────┼────────────┼────────────┨\n' +
  '┃ getitem() │ IndexError │            │  KeyError  ┃\n' +
  '┃ pop()     │ IndexError │  KeyError  │  KeyError  ┃\n' +
  '┃ remove()  │ ValueError │  KeyError  │            ┃\n' +
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
  "┃ lineterminator   │    '\\r\\n'    │    '\\r\\n'    │      '\\n'    ┃\n" +
  "┃ quotechar        │       '\"'    │       '\"'    │       '\"'    ┃\n" +
  "┃ escapechar       │      None    │      None    │      None    ┃\n" +
  "┃ doublequote      │      True    │      True    │      True    ┃\n" +
  "┃ quoting          │         0    │         0    │         1    ┃\n" +
  "┃ skipinitialspace │     False    │     False    │     False    ┃\n" +
  "┗━━━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━┛\n";

const DIAGRAM_95_A =
  '+-----------------+--------------+----------------------------------+\n' +
  '| Dialect         | pip3 install |           Dependencies           |\n' +
  '+-----------------+--------------+----------------------------------+\n';

const DIAGRAM_95_B =
  '┏━━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓\n' +
  '┃ Dialect         │ pip3 install │           Dependencies           ┃\n' +
  '┠─────────────────┼──────────────┼──────────────────────────────────┨\n' +
  '┃ mysql           │ mysqlclient  │ www.pypi.org/project/mysqlclient ┃\n' +
  '┃ postgresql      │ psycopg2     │ www.pypi.org/project/psycopg2    ┃\n' +
  '┃ mssql           │ pyodbc       │ www.pypi.org/project/pyodbc      ┃\n' +
  '┃ oracle+oracledb │ oracledb     │ www.pypi.org/project/oracledb    ┃\n' +
  '┗━━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n';

const DIAGRAM_10_A =
  '+-------------+-------------+\n' +
  '|   Classes   | Metaclasses |\n' +
  '+-------------+-------------|\n' +
  '|   MyClass <-- MyMetaClass |\n';

const DIAGRAM_10_B =
  '┏━━━━━━━━━━━━━┯━━━━━━━━━━━━━┓\n' +
  '┃   Classes   │ Metaclasses ┃\n' +
  '┠─────────────┼─────────────┨\n' +
  '┃   MyClass ←──╴MyMetaClass ┃\n' +
  '┃             │     ↑       ┃\n' +
  '┃    object ←─────╴type ←╮  ┃\n' +
  '┃             │     │ ╰──╯  ┃\n' +
  '┃     str ←─────────╯       ┃\n' +
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
  '┃      ↑      │     ↑       ┃\n' +
  '┃    object╶─────→ type     ┃\n' +
  '┃      ↓      │             ┃\n' +
  '┃     str     │             ┃\n' +
  '┗━━━━━━━━━━━━━┷━━━━━━━━━━━━━┛\n';

const DIAGRAM_115_A =
  '+--------------+------------+-------------------------------+-------+------+\n' +
  '| pip3 install |   Target   |          How to run           | Lines | Live |\n' +
  '+--------------+------------+-------------------------------+-------+------+\n';

const DIAGRAM_115_B =
  '┏━━━━━━━━━━━━━━┯━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┯━━━━━━━┯━━━━━━┓\n' +
  '┃ pip3 install │   Target   │          How to run           │ Lines │ Live ┃\n' +
  '┠──────────────┼────────────┼───────────────────────────────┼───────┼──────┨\n' +
  '┃ pyinstrument │    CPU     │ pyinstrument test.py          │   ×   │  ×   ┃\n' +
  '┃ py-spy       │    CPU     │ py-spy top -- python3 test.py │   ×   │  ✓   ┃\n' +
  '┃ scalene      │ CPU+Memory │ scalene test.py               │   ✓   │  ×   ┃\n' +
  '┃ memray       │   Memory   │ memray run --live test.py     │   ✓   │  ✓   ┃\n' +
  '┗━━━━━━━━━━━━━━┷━━━━━━━━━━━━┷━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┷━━━━━━━┷━━━━━━┛\n';

const DIAGRAM_12_A =
  '+-----------+-----------+------+-----------+\n' +
  '| sampwidth |    min    | zero |    max    |\n' +
  '+-----------+-----------+------+-----------+\n';

const DIAGRAM_12_B =
  '┏━━━━━━━━━━━┯━━━━━━━━━━━┯━━━━━━┯━━━━━━━━━━━┓\n' +
  '┃ sampwidth │    min    │ zero │    max    ┃\n' +
  '┠───────────┼───────────┼──────┼───────────┨\n' +
  '┃     1     │         0 │  128 │       255 ┃\n' +
  '┃     2     │    -32768 │    0 │     32767 ┃\n' +
  '┃     3     │  -8388608 │    0 │   8388607 ┃\n' +
  '┗━━━━━━━━━━━┷━━━━━━━━━━━┷━━━━━━┷━━━━━━━━━━━┛\n';

const DIAGRAM_13_A =
  '| s.apply(…)   |      3      |    sum  3   |     s  3      |';

const DIAGRAM_13_B =
  "┏━━━━━━━━━━━━━━┯━━━━━━━━━━━━━┯━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━┓\n" +
  "┃              │    'sum'    │   ['sum']   │ {'s': 'sum'}  ┃\n" +
  "┠──────────────┼─────────────┼─────────────┼───────────────┨\n" +
  "┃ s.apply(…)   │      3      │    sum  3   │     s  3      ┃\n" +
  "┃ s.agg(…)     │             │             │               ┃\n" +
  "┗━━━━━━━━━━━━━━┷━━━━━━━━━━━━━┷━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━┛\n" +
  "\n" +
  "┏━━━━━━━━━━━━━━┯━━━━━━━━━━━━━┯━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━┓\n" +
  "┃              │    'rank'   │   ['rank']  │ {'r': 'rank'} ┃\n" +
  "┠──────────────┼─────────────┼─────────────┼───────────────┨\n" +
  "┃ s.apply(…)   │             │      rank   │               ┃\n" +
  "┃ s.agg(…)     │    x  1.0   │   x   1.0   │   r  x  1.0   ┃\n" +
  "┃              │    y  2.0   │   y   2.0   │      y  2.0   ┃\n" +
  "┗━━━━━━━━━━━━━━┷━━━━━━━━━━━━━┷━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━┛\n";

const DIAGRAM_13_BB =
  "┏━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━┯━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━┓\n" +
  "┃                │    'mean'   │   ['mean']  │ {'m': 'mean'} ┃\n" +
  "┠────────────────┼─────────────┼─────────────┼───────────────┨\n" +
  "┃ s.apply/agg(…) │     1.5     │  mean  1.5  │     m  1.5    ┃\n" +
  "┗━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━┷━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━┛\n" +
  "\n" +
  "┏━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━┯━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━┓\n" +
  "┃                │    'rank'   │   ['rank']  │ {'r': 'rank'} ┃\n" +
  "┠────────────────┼─────────────┼─────────────┼───────────────┨\n" +
  "┃ s.apply/agg(…) │             │      rank   │               ┃\n" +
  "┃                │    x  1.0   │   x   1.0   │   r  x  1.0   ┃\n" +
  "┃                │    y  2.0   │   y   2.0   │      y  2.0   ┃\n" +
  "┗━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━┷━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━┛\n";

const DIAGRAM_13_XXX =
  "┏━━━━━━━━━━━━━━━━┯━━━━━━━━━━━┯━━━━━━━━━━━━━━━━┯━━━━━━━━━━━┯━━━━━━━━━━━━━━━━━━┓\n" +
  "┃                │   'sum'   │ ['sum', 'max'] │   'rank'  │ ['rank', 'diff'] ┃\n" +
  "┠────────────────┼───────────┼────────────────┼───────────┼──────────────────┨\n" +
  "┃ s.apply/agg(…) │     3     │    sum    3    │  x  1.0   │     rank  diff   ┃\n" +
  "┃                │           │    max    2    │  y  2.0   │  x   1.0   NaN   ┃\n" +
  "┃                │           │    Name: a     │  Name: a  │  y   2.0   1.0   ┃\n" +
  "┗━━━━━━━━━━━━━━━━┷━━━━━━━━━━━┷━━━━━━━━━━━━━━━━┷━━━━━━━━━━━┷━━━━━━━━━━━━━━━━━━┛\n";

const DIAGRAM_13_XX =
  "┏━━━━━━━━━━━━━━━━┯━━━━━━━━━━━┯━━━━━━━━━━━┯━━━━━━━━━━━━━━━━┓\n" +
  "┃                │   'sum'   │   'rank'  │ ['sum', 'max'] ┃\n" +
  "┠────────────────┼───────────┼───────────┼────────────────┨\n" +
  "┃ s.apply/agg(…) │     3     │  x  1.0   │    sum    3    ┃\n" +
  "┃                │           │  y  2.0   │    max    2    ┃\n" +
  "┃                │           │  Name: a  │    Name: a     ┃\n" +
  "┗━━━━━━━━━━━━━━━━┷━━━━━━━━━━━┷━━━━━━━━━━━┷━━━━━━━━━━━━━━━━┛\n";

const DIAGRAM_13_X =
  "┏━━━━━━━━━━━━━━━━┯━━━━━━━━━━━┯━━━━━━━━━━━┯━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━━━┓\n" +
  "┃                │   'sum'   │   'rank'  │ ['sum', 'max'] │ ['rank', 'diff'] ┃\n" +
  "┠────────────────┼───────────┼───────────┼────────────────┼──────────────────┨\n" +
  "┃ s.apply/agg(…) │     3     │  x  1.0   │    sum    3    │     rank  diff   ┃\n" +
  "┃                │           │  y  2.0   │    max    2    │  x   1.0   NaN   ┃\n" +
  "┃                │           │  Name: a  │    Name: a     │  y   2.0   1.0   ┃\n" +
  "┗━━━━━━━━━━━━━━━━┷━━━━━━━━━━━┷━━━━━━━━━━━┷━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━━━━┛\n";

const DIAGRAM_13_Y =
  "┏━━━━━━━━━━━━━━━━┯━━━━━━━━━━━┯━━━━━━━━━━━┯━━━━━━━━━━━┯━━━━━━━━━━━┓\n" +
  "┃                │   'sum'   │   'rank'  │  ['sum']  │ ['rank']  ┃\n" +
  "┠────────────────┼───────────┼───────────┼───────────┼───────────┨\n" +
  "┃ s.apply/agg(…) │     3     │  x  1.0   │  sum 3    │     rank  ┃\n" +
  "┃                │           │  y  2.0   │  Name: a  │  x   1.0  ┃\n" +
  "┃                │           │  Name: a  │           │  y   2.0  ┃\n" +
  "┗━━━━━━━━━━━━━━━━┷━━━━━━━━━━━┷━━━━━━━━━━━┷━━━━━━━━━━━┷━━━━━━━━━━━┛\n";

const DIAGRAM_13_BBB =
  "┏━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━┯━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━┓\n" +
  "┃                │    'sum'    │   ['sum']   │ {'s': 'sum'}  ┃\n" +
  "┠────────────────┼─────────────┼─────────────┼───────────────┨\n" +
  "┃ s.apply/agg(…) │      3      │    sum  3   │     s  3      ┃\n" +
  "┗━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━┷━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━┛\n" +
  "\n" +
  "┏━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━┯━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━┓\n" +
  "┃                │    'rank'   │   ['rank']  │ {'r': 'rank'} ┃\n" +
  "┠────────────────┼─────────────┼─────────────┼───────────────┨\n" +
  "┃ s.apply/agg(…) │             │      rank   │               ┃\n" +
  "┃                │    x  1.0   │   x   1.0   │   r  x  1.0   ┃\n" +
  "┃                │    y  2.0   │   y   2.0   │      y  2.0   ┃\n" +
  "┗━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━┷━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━┛\n";

const DIAGRAM_14_A =
  "|              |    'rank'   |   ['rank']  | {'r': 'rank'} |";

const DIAGRAM_15_A =
  '+-----------------------+---------------+------------+------------+---------------------------+';

const DIAGRAM_15_B =
  "┏━━━━━━━━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━┯━━━━━━━━━━━━┯━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━━━━━━━━━━━━┓\n" +
  "┃                       │    'outer'    │   'inner'  │   'left'   │       Description         ┃\n" +
  "┠───────────────────────┼───────────────┼────────────┼────────────┼───────────────────────────┨\n" +
  "┃ df.merge(df_2,        │    x   y   z  │ x   y   z  │ x   y   z  │ Merges on column if 'on'  ┃\n" +
  "┃          on='y',      │ 0  1   2   .  │ 3   4   5  │ 1   2   .  │ or 'left_on/right_on' are ┃\n" +
  "┃          how=…)       │ 1  3   4   5  │            │ 3   4   5  │ set, else on shared cols. ┃\n" +
  "┃                       │ 2  .   6   7  │            │            │ Uses 'inner' by default.  ┃\n" +
  "┠───────────────────────┼───────────────┼────────────┼────────────┼───────────────────────────┨\n" +
  "┃ df.join(df_2,         │    x yl yr  z │            │ x yl yr  z │ Merges on row keys.       ┃\n" +
  "┃         lsuffix='l',  │ a  1  2  .  . │ x yl yr  z │ 1  2  .  . │ Uses 'left' by default.   ┃\n" +
  "┃         rsuffix='r',  │ b  3  4  4  5 │ 3  4  4  5 │ 3  4  4  5 │ If Series is passed, it   ┃\n" +
  "┃         how=…)        │ c  .  .  6  7 │            │            │ is treated as a column.   ┃\n" +
  "┠───────────────────────┼───────────────┼────────────┼────────────┼───────────────────────────┨\n" +
  "┃ pd.concat([df, df_2], │    x   y   z  │     y      │            │ Adds rows at the bottom.  ┃\n" +
  "┃           axis=0,     │ a  1   2   .  │     2      │            │ Uses 'outer' by default.  ┃\n" +
  "┃           join=…)     │ b  3   4   .  │     4      │            │ A Series is treated as a  ┃\n" +
  "┃                       │ b  .   4   5  │     4      │            │ column. To add a row use  ┃\n" +
  "┃                       │ c  .   6   7  │     6      │            │ pd.concat([df, DF([s])]). ┃\n" +
  "┠───────────────────────┼───────────────┼────────────┼────────────┼───────────────────────────┨\n" +
  "┃ pd.concat([df, df_2], │    x  y  y  z │            │            │ Adds columns at the       ┃\n" +
  "┃           axis=1,     │ a  1  2  .  . │ x  y  y  z │            │ right end. Uses 'outer'   ┃\n" +
  "┃           join=…)     │ b  3  4  4  5 │ 3  4  4  5 │            │ by default. A Series is   ┃\n" +
  "┃                       │ c  .  .  6  7 │            │            │ treated as a column.      ┃\n" +
  "┗━━━━━━━━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━┷━━━━━━━━━━━━┷━━━━━━━━━━━━┷━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n";


const DIAGRAM_16_A =
  '| df.apply(…)     |      x  4     |        x  y   |     x  4      |';

const DIAGRAM_16_B =
  "┏━━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━┓\n" +
  "┃                 │     'sum'     │    ['sum']    │ {'x': 'sum'}  ┃\n" +
  "┠─────────────────┼───────────────┼───────────────┼───────────────┨\n" +
  "┃ df.apply(…)     │      x  4     │        x  y   │     x  4      ┃\n" +
  "┃ df.agg(…)       │      y  6     │   sum  4  6   │               ┃\n" +
  "┗━━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━┛\n" +
  "\n" +
  "┏━━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━┓\n" +
  "┃                 │     'rank'    │    ['rank']   │ {'x': 'rank'} ┃\n" +
  "┠─────────────────┼───────────────┼───────────────┼───────────────┨\n" +
  "┃ df.apply(…)     │               │       x    y  │               ┃\n" +
  "┃ df.agg(…)       │       x    y  │    rank rank  │         x     ┃\n" +
  "┃ df.transform(…) │  a  1.0  1.0  │  a  1.0  1.0  │    a  1.0     ┃\n" +
  "┃                 │  b  2.0  2.0  │  b  2.0  2.0  │    b  2.0     ┃\n" +
  "┗━━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━┛\n";

const DIAGRAM_17_A =
  "|                 |     'rank'    |    ['rank']   | {'x': 'rank'} |";

const DIAGRAM_18_A =
  '| gb.agg(…)       |      x   y  |             |      x    y |               |';

const DIAGRAM_18_B =
  "┏━━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━┯━━━━━━━━━━━━━┯━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━┓\n" +
  "┃                 │    'sum'    │    'rank'   │   ['rank']  │ {'x': 'rank'} ┃\n" +
  "┠─────────────────┼─────────────┼─────────────┼─────────────┼───────────────┨\n" +
  "┃ gb.agg(…)       │      x   y  │             │      x    y │               ┃\n" +
  "┃                 │  z          │      x  y   │   rank rank │        x      ┃\n" +
  "┃                 │  3   1   2  │   a  1  1   │ a    1    1 │     a  1      ┃\n" +
  "┃                 │  6  11  13  │   b  1  1   │ b    1    1 │     b  1      ┃\n" +
  "┃                 │             │   c  2  2   │ c    2    2 │     c  2      ┃\n" +
  "┠─────────────────┼─────────────┼─────────────┼─────────────┼───────────────┨\n" +
  "┃ gb.transform(…) │      x   y  │      x  y   │             │               ┃\n" +
  "┃                 │  a   1   2  │   a  1  1   │             │               ┃\n" +
  "┃                 │  b  11  13  │   b  1  1   │             │               ┃\n" +
  "┃                 │  c  11  13  │   c  2  2   │             │               ┃\n" +
  "┗━━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━┷━━━━━━━━━━━━━┷━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━┛\n";

const MENU = '<a href="https://raw.githubusercontent.com/gto76/python-cheatsheet/main/README.md">Download text file</a>, <a href="https://github.com/gto76/python-cheatsheet">Fork me on GitHub</a>, <a href="https://github.com/gto76/python-cheatsheet/wiki/Frequently-Asked-Questions">Check out FAQ</a> or <a href="index.html?theme=dark3">Switch to dark theme</a>.\n';

const DARK_THEME_SCRIPT =
  '<script>\n' +
  '  // Changes the banner image and link-to-theme if "theme=dark" is in query string\n' +
  '  // or if browser prefers dark mode and theme is not explicitly set.\n' +
  '\n' +
  'const theme_not_set_in_query = window.location.search.search(/[?&]theme=light/) == -1\n' +
  'const browser_prefers_dark = window.matchMedia(\'(prefers-color-scheme: dark)\').matches;\n' +
  '\n' +
  '  if ((window.location.search.search(/[?&]theme=dark/) !== -1) || \n' +
  '      (theme_not_set_in_query && browser_prefers_dark)) {\n' +
  '    activateDarkMode();\n' +
  '  }\n' +
  '\n' +
  '  function activateDarkMode() {\n' +
  '    var link_to_theme = document.createElement("a")\n' +
  '    link_to_theme.href = "index.html?theme=light"\n' +
  '    link_to_theme.text = "Switch to light theme"\n' +
  '    document.getElementsByClassName("banner")[0].firstChild.children[3].replaceWith(link_to_theme)\n' +
  '\n' +
  '    var img_dark = document.createElement("img");\n' +
  '    img_dark.src = "web/image_orig_blue6.png";\n' +
  '    img_dark.alt = "Monthy Python";\n' +
  '    if ((window.location.search.search(/[?&]theme=dark2/) !== -1) ||\n' +
  '        (window.location.search.search(/[?&]theme=dark3/) !== -1) ||\n' +
  '        (theme_not_set_in_query && browser_prefers_dark)) {\n' +
  '      img_dark.style = "width: 910px;";\n' +
  '    } else {\n' +
  '      img_dark.style = "width: 960px;";\n' +
  '    }\n' +
  '    document.getElementsByClassName("banner")[1].firstChild.replaceWith(img_dark);\n' +
  '  }\n' +
  '</script>';


function main() {
  const html = getMd();
  initDom(html);
  modifyPage();
  var template = readFile('web/template.html');
  template = updateDate(template);
  const tokens = template.split('<div id=main_container></div>');
  const text = `${tokens[0]} ${document.body.innerHTML} ${tokens[1]}`;
  writeToFile('index.html', text);
}

function getMd() {
  var readme = readFile('README.md');
  var readme = readme.replace("#semaphore-event-barrier", "#semaphoreeventbarrier");
  var readme = readme.replace("#semaphore-event-barrier", "#semaphoreeventbarrier");
  var readme = readme.replace("#dataframe-plot-encode-decode", "#dataframeplotencodedecode");
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
  changeMenu();
  addDarkThemeScript();
  removeOrigToc();
  addToc();
  insertLinks();
  unindentBanner();
  updateDiagrams();
  highlightCode();
  fixPandasDiagram();
  removePlotImages();
  fixABCSequenceDiv();
  fixStructFormatDiv();
}

function changeMenu() {
  $('sup').first().html(MENU)
}

function addDarkThemeScript() {
  $('#main').before(DARK_THEME_SCRIPT);
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
  montyImg.parent().css({"margin-bottom": "20px", "padding-bottom": "7px"})
  const downloadPraragrapth = $('p').first();
  downloadPraragrapth.addClass('banner');
}

function updateDiagrams() {
  $(`code:contains(${DIAGRAM_1_A})`).html(DIAGRAM_1_B);
  $(`code:contains(${DIAGRAM_2_A})`).html(DIAGRAM_2_B);
  $(`code:contains(${DIAGRAM_4_A})`).html(DIAGRAM_4_B);
  $(`code:contains(${DIAGRAM_5_A})`).parent().remove();
  $(`code:contains(${DIAGRAM_6_A})`).html(DIAGRAM_6_B);
  $(`code:contains(${DIAGRAM_7_A})`).html(DIAGRAM_7_B);
  $(`code:contains(${DIAGRAM_8_A})`).html(DIAGRAM_8_B);
  $(`code:contains(${DIAGRAM_9_A})`).html(DIAGRAM_9_B);
  $(`code:contains(${DIAGRAM_95_A})`).html(DIAGRAM_95_B);
  $(`code:contains(${DIAGRAM_115_A})`).html(DIAGRAM_115_B);
  $(`code:contains(${DIAGRAM_12_A})`).html(DIAGRAM_12_B).removeClass("text").removeClass("language-text").addClass("python");
  $(`code:contains(${DIAGRAM_13_A})`).html(DIAGRAM_13_B).removeClass("text").removeClass("language-text").addClass("python");
  $(`code:contains(${DIAGRAM_14_A})`).parent().remove();
  $(`code:contains(${DIAGRAM_15_A})`).html(DIAGRAM_15_B).removeClass("text").removeClass("language-text").addClass("python");
  $(`code:contains(${DIAGRAM_16_A})`).html(DIAGRAM_16_B).removeClass("text").removeClass("language-text").addClass("python");
  $(`code:contains(${DIAGRAM_17_A})`).parent().remove();
}

function highlightCode() {
  changeCodeLanguages();
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

function changeCodeLanguages() {
  setApaches(['<D>', '<T>', '<DT>', '<TD>', '<a>', '<n>']);
  $('code').not('.python').not('.text').not('.bash').not('.apache').addClass('python');
  $('code:contains(<el>       = <2d>[row_index, col_index])').removeClass().addClass('bash');
  $('code:contains(<1d_array> = <2d>[row_indices, col_indices])').removeClass().addClass('bash');
  $('code:contains(<2d_bools> = <2d> > <el/1d/2d>)').removeClass().addClass('bash');
  $('code.perl').removeClass().addClass('python');
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
  $(`code:contains(<int> = ±0b<bin>)`).html(BIN_HEX);
  $(`code:contains( + fib(n)`).html(CACHE);
  $(`code:contains(@debug(print_result=True))`).html(PARAMETRIZED_DECORATOR);
  $(`code:contains(print/str/repr([<obj>]))`).html(REPR_USE_CASES);
  $(`code:contains((self, a=None):)`).html(CONSTRUCTOR_OVERLOADING);
  $(`code:contains(shutil.copy)`).html(SHUTIL_COPY);
  $(`code:contains(os.rename)`).html(OS_RENAME);
  $(`code:contains(\'<n>s\')`).html(STRUCT_FORMAT);
  $(`code:contains(match <object/expression>:)`).html(MATCH);
  $(`code:contains(>>> match Path)`).html(MATCH_EXAMPLE);
  $(`code:contains(import asyncio, collections, curses, curses.textpad, enum, random)`).html(COROUTINES);
  $(`code:contains(import curses, os)`).html(CURSES);
  $(`code:contains(pip3 install tqdm)`).html(PROGRESS_BAR);
  $(`code:contains(>>> log.basicConfig()`).html(LOGGING_EXAMPLE);
  $(`code:contains(a_float = max()`).html(AUDIO_1);
  $(`code:contains(samples_f = (sin(i *)`).html(AUDIO_2);
  $(`code:contains(collections, dataclasses, enum, io, itertools)`).html(MARIO);
  $(`code:contains(>>> gb = df.groupby)`).html(GROUPBY);
  $(`code:contains(cdef <ctype/type> <var_name> [= <obj>])`).html(CYTHON_1);
  $(`code:contains(cdef class <class_name>:)`).html(CYTHON_2);
  $(`ul:contains(Ctrl+F / ⌘F is usually sufficient.)`).html(INDEX);
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
  const formatDiv = $('#floatingpointtypesstructalwaysusesstandardsizes').parent().parent().parent().parent()
  move(formatDiv, 'floatingpointtypesstructalwaysusesstandardsizes')
  move(formatDiv, 'integertypesuseacapitalletterforunsignedtypeminimumandstandardsizesareinbrackets')
  move(formatDiv, 'forstandardsizesstartformatstringwith')
}

function move(anchor_el, el_id) {
  const el = $('#'+el_id).parent()
  anchor_el.after(el)
}

function insertPageBreaks() {
  insertPageBreakBefore('#decorator')
  // insertPageBreakBefore('#print')
}

function insertPageBreakBefore(an_id) {
  $('<div class="pagebreak"></div>').insertBefore($(an_id).parent())
}

function fixPandasDiagram() {
  const diagram_15 = '┏━━━━━━━━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━┯━━━━━━━━━━━━┯━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━━━━━━━━━━━━┓';
  $(`code:contains(${diagram_15})`).find(".hljs-keyword:contains(and)").after("and");
  $(`code:contains(${diagram_15})`).find(".hljs-keyword:contains(as)").after("as");
  $(`code:contains(${diagram_15})`).find(".hljs-keyword:contains(is)").after("is");
  $(`code:contains(${diagram_15})`).find(".hljs-keyword:contains(if)").after("if");
  $(`code:contains(${diagram_15})`).find(".hljs-keyword:contains(or)").after("or");
  $(`code:contains(${diagram_15})`).find(".hljs-keyword:contains(else)").after("else");
  $(`code:contains(${diagram_15})`).find(".hljs-keyword").remove();
  $(`code:contains(${diagram_15})`).find(".hljs-string:contains(\'left_on/right_on\')").after("\'left_on/right_on\'");
  $(`code:contains(${diagram_15})`).find(".hljs-string:contains(\'left_on/right_on\')").remove();
  $(`code:contains(${diagram_15})`).find(".hljs-string:contains('on')").after("'on'");
  $(`code:contains(${diagram_15})`).find(".hljs-string:contains('on')").remove();
}

function removePlotImages() {
  $('img[alt="Covid Deaths"]').remove();
  $('img[alt="Covid Cases"]').remove();
}

function fixABCSequenceDiv() {
  $('#abcsequence').parent().insertBefore($('#tableofrequiredandautomaticallyavailablespecialmethods').parent())
}

function fixStructFormatDiv() {
  const div = $('#format-2').parent()
  $('#format-2').insertBefore(div)
  $('#forstandardtypesizesandmanualalignmentpaddingstartformatstringwith').parent().insertBefore(div)
}

function updateDate(template) {
  const date = new Date();
  const date_str = date.toLocaleString('en-us', {month: 'long', day: 'numeric', year: 'numeric'});
  template = template.replace('May 20, 2021', date_str);
  template = template.replace('May 20, 2021', date_str);
  return template;
}


// UTIL

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
