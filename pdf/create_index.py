#!/usr/bin/env python3
#
# Usage: .py
#

from collections import namedtuple
from dataclasses import make_dataclass
from enum import Enum
import re
import sys
from bs4 import BeautifulSoup
from collections import defaultdict


def main():
    html = read_file('index.html')
    doc  = BeautifulSoup(''.join(html), 'html.parser')
    hhh = defaultdict(lambda: defaultdict(list))
    for i in range(2, 5):
        for h in doc.find_all(f'h{i}'):
            an_id = h.attrs['id']
            text  = h.text.lstrip('#')
            first_letter = text[0]
            hhh[first_letter][text].append(an_id)
    print_hhh(hhh)


def print_hhh(hhh):
    letters = hhh.keys()
    for letter in sorted(letters):
        hh = hhh[letter]
        print(f'### {letter}')
        commands = hh.keys()
        for command in sorted(commands):
            links = hh[command]
            lll = ', '.join(f'[1](#{l})' for l in links)
            print(f'**{command} {lll}**  ')
        print()


###
##  UTIL
#

def read_file(filename):
    with open(filename, encoding='utf-8') as file:
        return file.readlines()


if __name__ == '__main__':
    main()