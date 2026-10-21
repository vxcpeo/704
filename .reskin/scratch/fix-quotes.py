from pathlib import Path

p = Path('src/App.vue')
t = p.read_text(encoding='utf-8')
before = t
t = t.replace("'Refreshing\u2026 :", "'Refreshing\u2026' :")
t = t.replace("'Connecting\u2026 :", "'Connecting\u2026' :")
t = t.replace("'Refreshing\u2026 }}", "'Refreshing\u2026' }}")
p.write_text(t, encoding='utf-8', newline='')
print('changed', before != t)
for i, line in enumerate(t.splitlines(), 1):
    if '\u2026' in line:
        print(i, line.strip()[:140].encode('ascii', 'backslashreplace').decode())
