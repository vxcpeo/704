from collections import Counter
from pathlib import Path

for rel in ['src/App.vue', 'src/style.css', 'src/components/ChainLedger.vue',
            'src/components/EventLedger.vue', 'src/components/EventBeat.vue',
            'src/components/FieldBeat.vue', 'src/components/TickerBand.vue',
            'src/components/BroadcastBar.vue', 'src/components/RouteRoll.vue',
            'src/components/ReceiptLedger.vue', 'src/components/Toast.vue',
            'src/components/FlowIcon.vue']:
    text = Path(rel).read_text(encoding='utf-8')
    counts = Counter(ch for ch in text if ord(ch) > 127)
    print(rel, {hex(ord(k)): v for k, v in counts.items()})
