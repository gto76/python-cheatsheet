#!/usr/bin/env python3

def convert_table(lines):
    def from_ascii():
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

