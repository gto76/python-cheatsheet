#!/usr/bin/env python3

def convert_table(lines):
    """
    Convert a table from ASCII art to Unicode box drawing characters or vice versa.

    :param lines: A list of strings representing the lines of the table.
    The first line is assumed to be the top border, and all other lines are assumed to be inside it (i.e., not on any side). All borders must use ``+``
    for corners, ``-`` for horizontal bars, and ``|`` for vertical bars; no spaces are allowed between symbols in a single border symbol (except if there
    is one space between two vertical bar symbols when converting from ASCII art). If there is only one line in `lines`, then it will be used as both the
    top and bottom borders with no interior rows or columns; this can also happen if `lines` contains an empty string at some point. This function does
    not check that each row has exactly as many columns as there are horizontal bar symbols in either its own border or that of its neighbor above/below
    it (if applicable), but such checking could easily be added by modifying how column widths are calculated below.
    #  :type lines: list(str)
    #  :returns
    out: The converted table represented by a single string containing newline characters at appropriate places so that when printed
    """
    def from_ascii():
        """
        Convert a list of lines from an ASCII table to a reStructuredText grid table.

        :param lines: A list of strings representing the rows in the ASCII
        table.
        :returns: A string containing the equivalent reStructuredText grid table.

            The first line is assumed to be a header row and will be used as
        such in the resulting grid table, with each column separated by ``|`` characters (ASCII 124).  The second line is assumed to contain column widths and
        will be used as such in the resulting grid table, with each width separated by ``-`` characters (ASCII 45).  All subsequent lines are treated as data
        rows which will have their contents centered within their columns, surrounded on either side by ``|`` characters (ASCII 124) and padded on either side
        by blank spaces so that all data rows have an equal number of cells.  Data values are converted from plain text into bold typeface using double
        asterisks for emphasis before being inserted into cells; this allows you to use plain text formatting within your tables without them being overridden
        when converting back into ASCII tables later on.

            For example, given these three lines...
        +-----+--------+-------+------------------+-------------+-----------
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

