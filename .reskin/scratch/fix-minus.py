from pathlib import Path

p = Path('src/App.vue')
t = p.read_text(encoding='utf-8')
t = t.replace("'\u2212 : ''", "'\u2212' : ''")
p.write_text(t, encoding='utf-8', newline='')
print('ok', "'\u2212 : ''" in t)
print(p.read_text(encoding='utf-8').splitlines()[274].encode('ascii', 'backslashreplace').decode())
