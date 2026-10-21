from pathlib import Path

p = Path('src/App.vue')
text = p.read_text(encoding='utf-8')
fixed = text.replace('\u00c2\u00b7', '\u00b7')
p.write_text(fixed, encoding='utf-8', newline='')
print('replaced', text.count('\u00c2\u00b7'), 'remaining non-ascii', sorted({hex(ord(c)) for c in fixed if ord(c) > 127}))
