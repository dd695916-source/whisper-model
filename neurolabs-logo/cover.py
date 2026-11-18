import random, math, re, subprocess
from PIL import Image
random.seed(7)
W,H=2048,1152
logo=open('logo-royal.svg').read()
defs=re.search(r'<defs>(.*?)</defs>',logo,re.S).group(1)
defs=defs.replace('stdDeviation="40"','stdDeviation="120"')
# icon+wordmark group from logo (everything after the bg rect)
body=logo.split('<rect width="512" height="512" fill="url(#bg)"/>')[1].replace('</svg>','')
# procedural golden constellation
pts=[]
while len(pts)<170:
    x,y=random.uniform(-40,W+40),random.uniform(-40,H+40)
    d=math.hypot((x-W/2)/1.3,(y-H/2))
    if d<330: continue
    pts.append((x,y,d))
lines=[]
for i,(x,y,d) in enumerate(pts):
    near=sorted(((math.hypot(x-a,y-b),j) for j,(a,b,_) in enumerate(pts) if j!=i))[:3]
    for dist,j in near:
        if j>i and dist<230:
            a,b,dd=pts[j]; op=min(1,(min(d,dd)-330)/500)*0.35
            lines.append(f'<line x1="{x:.0f}" y1="{y:.0f}" x2="{a:.0f}" y2="{b:.0f}" stroke="#d4a64a" stroke-width="1.4" opacity="{op:.2f}"/>')
nodes=[]
for x,y,d in pts:
    op=min(1,(d-330)/500); r=random.choice([2,2.5,3,3,4,6])
    nodes.append(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="{r}" fill="#f0d48a" opacity="{0.25+0.6*op:.2f}"/>')
    if r>=6: nodes.append(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="{r*3}" fill="#d4a64a" opacity="{0.12*op:.2f}" filter="url(#glow)"/>')
svg=f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">
<defs>{defs}
<radialGradient id="cbg" cx="50%" cy="50%" r="70%"><stop offset="0" stop-color="#103631"/><stop offset="0.5" stop-color="#081d1a"/><stop offset="1" stop-color="#020807"/></radialGradient>
</defs>
<rect width="{W}" height="{H}" fill="url(#cbg)"/>
<g>{''.join(lines)}</g><g>{''.join(nodes)}</g>
<g transform="translate({W/2-256*1.5},{H/2-256*1.5-20}) scale(1.5)">{body}</g>
</svg>'''
open('cover-royal.svg','w').write(svg)
js='''const {chromium}=require('playwright');const fs=require('fs');(async()=>{const b=await chromium.launch();
const p=await b.newPage({viewport:{width:2048,height:1152},deviceScaleFactor:2});
await p.setContent('<html><body style="margin:0">'+fs.readFileSync('cover-royal.svg','utf8')+'</body></html>');
await p.waitForTimeout(400);await p.screenshot({path:'raw.png'});await b.close();})();'''
open('render-cover.js','w').write(js)
subprocess.run(['node','render-cover.js'],check=True)
im=Image.open('raw.png').convert('RGB'); print(im.size)
im.save('neurolabs-cover-royal-4096x2304.jpg',quality=88,optimize=True,progressive=True)
im.resize((1024,576),Image.LANCZOS).save('cover-preview.png')
