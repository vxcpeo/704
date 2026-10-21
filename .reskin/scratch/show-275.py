from pathlib import Path

p = Path('src/App.vue')
lines = p.read_text(encoding='utf-8').splitlines()
for n in (275,):
    print(n, lines[n - 1].encode('ascii', 'backslashreplace').decode())
