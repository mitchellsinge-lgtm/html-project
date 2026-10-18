"""Run from the root of the website repo:  python add-hook.py
Adds <script src="crm-lead.js" defer></script> before </body> on every page with an enquiry form."""
import glob
TAG = '<script src="crm-lead.js" defer></script>'
for f in sorted(glob.glob('*.html')):
    s = open(f, encoding='utf8').read()
    if 'enquiry-form' not in s or TAG in s:
        continue
    i = s.rfind('</body>')
    if i < 0:
        continue
    open(f, 'w', encoding='utf8').write(s[:i] + TAG + '\n' + s[i:])
    print('patched', f)
