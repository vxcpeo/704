from pathlib import Path

p = Path('src/App.vue')
t = p.read_text(encoding='utf-8')
fixed = t.replace("?? '\u2014 }}", "?? '\u2014' }}").replace("'\u2014 }}", "'\u2014' }}")
p.write_text(fixed, encoding='utf-8', newline='')
print('remaining unterminated dash literals:', fixed.count("'\u2014 }}"))
for i, line in enumerate(fixed.splitlines(), 1):
    if '\u2014' in line:
        print(i, line.strip().encode('ascii', 'backslashreplace').decode())
