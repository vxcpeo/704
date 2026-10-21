from pathlib import Path

p = Path('src/App.vue')
t = p.read_text(encoding='utf-8')
pairs = [
    ('Refreshing\u00e2\u20ac?', 'Refreshing\u2026'),
    ('Connecting\u00e2\u20ac?', 'Connecting\u2026'),
    ("' \u00e2\u20ac?'", "' \u2014 '"),
    ('\u00e2\u02c6?', '\u2212'),
]
counts = []
for a, b in pairs:
    counts.append(t.count(a))
    t = t.replace(a, b)
p.write_text(t, encoding='utf-8', newline='')

s = Path('src/style.css')
c = s.read_text(encoding='utf-8')
c = c.replace('Kavrel \u00e2\u20ac?Poster', 'Kavrel \u2014 Poster')
s.write_text(c, encoding='utf-8', newline='')

print('counts', counts)
for rel in ['src/App.vue', 'src/style.css']:
    t2 = Path(rel).read_text(encoding='utf-8')
    bad = sum(1 for ch in t2 if ch in '\u00e2\u20ac\u02c6')
    print(rel, 'residual', bad, 'emdash', t2.count('\u2014'), 'ellipsis', t2.count('\u2026'), 'minus', t2.count('\u2212'))
