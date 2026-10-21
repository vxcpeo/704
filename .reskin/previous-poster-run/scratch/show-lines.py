from pathlib import Path

p = Path('src/App.vue')
lines = p.read_text(encoding='utf-8').splitlines()
for n in (748, 749, 754, 756):
    print(n, lines[n - 1].strip().encode('ascii', 'backslashreplace').decode())
