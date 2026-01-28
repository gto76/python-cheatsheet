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
    """
    This function reads the file index.html and extracts all headings from it.
    It then creates a dictionary with the first letter of each heading as key,
    and for each key, a dictionary containing all headings starting with that letter as value.
    The second level of dictionaries contain the actual heading
    text as keys and their ID's (which are also stored in another list) as values.
    """
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
    """
    Prints a table of contents for the commands in the given dictionary.

    The keys of `hhh` are letters and each letter is mapped to another dictionary
    that maps command names to lists of links. The first link in each list is used as the heading for that command name, so it should be unique among all
    commands (and ideally short). All other links should be unique among all lists but not necessarily short. The order of letters and commands within a
    letter will match their order in `hhh`.
    """
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