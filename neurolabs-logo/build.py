import subprocess, sys
from PIL import Image
base = open('logo.svg').read()
# palette: bg0,bg1,bg2, grad a,b,c, text-grad a,b,c, halo, sub, word, n1..n5, small1, small2
P = {
 "ember":  dict(bg=("#2a1610","#150b08","#070302"), g=("#ffd166","#ff7a3d","#e63946"),
                t=("#ffe0a3","#ffb07a","#ff8a7a"), halo="#ff6a2b", sub="#b39a8a", word="#fff4e8",
                n=("#ffd166","#ffb347","#ff8c42","#ff6b4a","#e63946"), s=("#ffd8a8","#ffb4a2")),
 "acid":   dict(bg=("#10220f","#081207","#020502"), g=("#e8ff5a","#7cff6b","#00d68f"),
                t=("#f0ff8a","#b4ff8f","#5cf2b0"), halo="#5dff7a", sub="#8fa58a", word="#f4ffe8",
                n=("#e8ff5a","#b8ff60","#7cff6b","#3df08a","#00d68f"), s=("#efffb0","#b0ffd0")),
 "royal":  dict(bg=("#0e2a26","#071715","#020807"), g=("#f7e3a1","#d4a64a","#a8742a"),
                t=("#fbecc0","#e6c27a","#cc9a4a"), halo="#c9973d", sub="#8fa69f", word="#fffaf0",
                n=("#f7e3a1","#e8c879","#d4a64a","#bf8d3a","#a8742a"), s=("#fbefc8","#e8d3a0")),
 "coral":  dict(bg=("#2a0f22","#150712","#060206"), g=("#ffb4a2","#ff5e78","#7b2ff7"),
                t=("#ffd3c4","#ff9aa8","#b98bff"), halo="#ff4f7a", sub="#a88fa0", word="#fff0f3",
                n=("#ffb4a2","#ff8a8a","#ff5e78","#c04dd8","#7b2ff7"), s=("#ffd6cc","#e0c0ff")),
}
orig = dict(bg=("#16204a","#0b1030","#05060f"), g=("#22d3ee","#6366f1","#c026d3"),
            t=("#67e8f9","#a5b4fc","#f0abfc"), halo="#4f46e5", sub="#94a3b8", word="#ffffff",
            n=("#22d3ee","#38bdf8","#818cf8","#a855f7","#d946ef"), s=("#a5b4fc","#c4b5fd"))
def sub(svg, a, b):
    assert a in svg, a
    return svg.replace(a, b)
for name, p in P.items():
    s = base
    for o, n in zip(orig["n"], p["n"]): s = sub(s, f'fill="{o}"', f'fill="{n}"')
    for o, n in zip(orig["s"], p["s"]): s = sub(s, f'fill="{o}"', f'fill="{n}"')
    for k in ("bg","g","t"):
        for o, n in zip(orig[k], p[k]): s = sub(s, f'"{o}"', f'"{n}"')
    s = sub(s, '"#4f46e5"', f'"{p["halo"]}"')
    s = sub(s, 'fill="#94a3b8"', f'fill="{p["sub"]}"')
    s = sub(s, 'fill="#ffffff">Neuro', f'fill="{p["word"]}">Neuro')
    open(f'logo-{name}.svg','w').write(s)
    subprocess.run(["node","render.js",f'logo-{name}.svg','raw.png'],check=True)
    Image.open('raw.png').convert('RGB').save(f'neurolabs-logo-{name}-512.png')
# preview grid
ims=[Image.open(f'neurolabs-logo-{n}-512.png') for n in P]
g=Image.new('RGB',(1024+12,1024+12),'#ffffff')
for i,im in enumerate(ims): g.paste(im,((i%2)*524,(i//2)*524))
g.save('variants-preview.png')
