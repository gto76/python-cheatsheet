#!/usr/bin/env python3

def convert_table(lines):
    """
    Convert a table from ASCII art to Unicode box drawing characters or vice versa.

    :param lines: A list of strings representing the lines of the table.
    :type lines: list(str)
    """
    def from_ascii():
        """
        Convert a list of lines from an ASCII table to a reStructuredText grid table.

        :param lines: A list of strings representing the rows in the ASCII
        table.
        :returns: A string containing the equivalent reStructuredText grid table.
        """
        out = []
        first, header, third, *body, last = lines
        first = first.translate(str.maketrans({'-': '━', '+': '┯'}))
        out.append(f'┏{first[1:-1]}┓')
        header = header.translate(str.maketrans({'|': '│'}))
        out.append(f'┃{header[1:-1]}┃')
        third = third.translate(str.maketrans({'-': '─', '+': '┼'}))
        out.append(f'┠{third[1:-1]}┨')
        for line in body:
            line = line.translate(str.maketrans({'|': '│'}))
            line = line.replace('yes', ' ✓ ')
            out.append(f'┃{line[1:-1]}┃')
        last = last.translate(str.maketrans({'-': '━', '+': '┷'}))
        out.append(f'┗{last[1:-1]}┛')
        return '\n'.join(out)
    def from_unicode():
        """
        Convert a Unicode box-drawing character string to ASCII.

        :param str lines: A string of Unicode box-drawing characters.
        :returns str out: The same
        text with all the Unicode box drawing characters replaced by ASCII ones.
        """
        out = []
        for line in lines:
            line = line.translate(str.maketrans('┏┓┗┛┠┼┨┯┷━─┃│', '+++++++++--||'))
            line = line.replace(' ✓ ', 'yes')
            out.append(line)
        return '\n'.join(out)
    if lines[0][0] == '+':
        return from_ascii()
    return from_unicode()

if __name__ == '__main__':
    input_lines = []
    try:
        while True:
            input_lines.append(input())
    except EOFError:
        pass
    print(convert_table(input_lines))

