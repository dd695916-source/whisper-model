import random, math, re, subprocess
from PIL import Image
random.seed(11)
W,H=2048,1152
logo=open('logo-royal.svg').read()
icon=re.search(r'<!-- hexagon frame -->(.*?)<!-- wordmark -->',logo,re.S).group(1)
defs=re.search(r'<defs>(.*?)</defs>',logo,re.S).group(1)

# subtle network
pts=[(random.uniform(0,W),random.uniform(0,H)) for _ in range(150)]
net=[]
for i,(x,y) in enumerate(pts):
    for d,j in sorted((math.hypot(x-a,y-b),j) for j,(a,b) in enumerate(pts) if j!=i)[:2]:
        if j>i and d<220: net.append(f'<line x1="{x:.0f}" y1="{y:.0f}" x2="{pts[j][0]:.0f}" y2="{pts[j][1]:.0f}"/>')
    net.append(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="{random.choice([2,2.5,3,4])}" />')
netsvg=f'<svg width="{W}" height="{H}" style="position:absolute;inset:0"><g stroke="#e9c46a" stroke-width="1.5" fill="#ffe7a8" opacity="0.38">{"".join(net)}</g></svg>'

html=f'''<!doctype html><html><head><meta charset="utf-8"><style>
*{{box-sizing:border-box;margin:0;padding:0}}
body{{width:{W}px;height:{H}px;overflow:hidden;font-family:Inter,sans-serif;color:#fff;
 background:radial-gradient(ellipse at 50% 45%,#2a8a77 0%,#14534a 45%,#0a312b 100%);position:relative}}
.abs{{position:absolute}}
.glow{{position:absolute;left:50%;top:44%;width:900px;height:620px;transform:translate(-50%,-50%);
 background:radial-gradient(closest-side,rgba(255,226,160,.22),transparent);}}
/* phones */
.phone{{position:absolute;width:270px;height:560px;border-radius:44px;background:#0b1513;padding:12px;
 border:2px solid #e2b85c;box-shadow:0 30px 80px rgba(0,0,0,.45),0 0 40px rgba(233,196,106,.25)}}
.scr{{width:100%;height:100%;border-radius:33px;overflow:hidden;position:relative;background:#f7f4ec;color:#132a25}}
.notch{{position:absolute;top:10px;left:50%;transform:translateX(-50%);width:80px;height:22px;border-radius:12px;background:#0b1513;z-index:3}}
.sb{{height:40px}}
.h{{padding:0 18px;font-weight:800;font-size:22px}}
.sub{{padding:2px 18px 10px;font-size:12px;color:#6b7f79}}
.search{{margin:0 16px 12px;height:36px;border-radius:12px;background:#ebe5d6;font-size:12px;color:#8b8a80;display:flex;align-items:center;padding:0 12px}}
.cats{{display:flex;gap:8px;padding:0 16px 12px}}
.cat{{padding:6px 12px;border-radius:20px;background:#ebe5d6;font-size:11px;font-weight:600}}
.cat.on{{background:#1a5c50;color:#fff}}
.card{{margin:0 16px 10px;border-radius:16px;background:#fff;box-shadow:0 4px 14px rgba(0,0,0,.08);display:flex;gap:10px;padding:10px;align-items:center}}
.thumb{{width:46px;height:46px;border-radius:12px;flex:none}}
.t1{{font-weight:700;font-size:13px;white-space:nowrap}} .t2{{font-size:11px;color:#7a8a85;margin-top:2px}}
.price{{white-space:nowrap;margin-left:auto;font-weight:800;font-size:13px;color:#1a5c50}}
.cta{{position:absolute;bottom:22px;left:16px;right:16px;height:46px;border-radius:14px;background:linear-gradient(90deg,#d4a64a,#f0d48a);
 color:#1b1406;font-weight:800;font-size:14px;display:flex;align-items:center;justify-content:center}}
.tab{{position:absolute;bottom:0;left:0;right:0;height:60px;background:#fff;display:flex;justify-content:space-around;align-items:center}}
.tab i{{width:22px;height:22px;border-radius:7px;background:#d9d3c3;display:block}} .tab i.on{{background:#1a5c50}}
/* dark chat phone */
.scr.dark{{background:#0f1d1a;color:#e9f2ee}}
.msg{{max-width:72%;margin:6px 14px;padding:9px 12px;border-radius:16px;font-size:12px;line-height:1.35}}
.in{{background:#1d332e}} .out{{background:linear-gradient(135deg,#d4a64a,#e9c46a);color:#1b1406;margin-left:auto}}
.chathead{{display:flex;align-items:center;gap:10px;padding:0 14px 12px;border-bottom:1px solid #1f3a34}}
.av{{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#f0d48a,#a8742a)}}
.input{{position:absolute;bottom:18px;left:12px;right:12px;height:42px;border-radius:21px;background:#1d332e;font-size:12px;color:#7d948d;display:flex;align-items:center;padding:0 16px}}
.send{{position:absolute;right:5px;top:5px;width:32px;height:32px;border-radius:50%;background:#e9c46a}}
/* laptop */
.laptop{{position:absolute;left:1350px;top:400px;width:620px}}
.lid{{height:390px;border-radius:20px 20px 6px 6px;background:#0b1513;border:2px solid #e2b85c;padding:14px;box-shadow:0 30px 80px rgba(0,0,0,.45),0 0 40px rgba(233,196,106,.25)}}
.code{{height:100%;border-radius:8px;background:#0d1b18;font-family:'DejaVu Sans Mono',monospace;font-size:14.5px;line-height:1.62;padding:14px 18px;color:#cfe0da;overflow:hidden}}
.dots{{display:flex;gap:7px;margin-bottom:10px}} .dots i{{width:11px;height:11px;border-radius:50%;display:block}}
.k{{color:#e9c46a}} .s{{color:#8fe3b6}} .c{{color:#5f7d75}} .f{{color:#7fc8f8}} .n{{color:#f4a6a0}}
.base{{height:22px;margin:0 -50px;border-radius:0 0 22px 22px;background:linear-gradient(#e9c46a,#a8742a)}}
/* floating cards */
.fc{{position:absolute;border-radius:20px;background:rgba(10,40,35,.72);border:1.5px solid rgba(233,196,106,.6);
 backdrop-filter:blur(6px);padding:16px 18px;box-shadow:0 20px 50px rgba(0,0,0,.35)}}
.lbl{{font-size:13px;color:#cfe0da;font-weight:600;letter-spacing:.5px}}
.big{{font-size:30px;font-weight:800;color:#f0d48a}}
.chip{{display:inline-flex;align-items:center;gap:8px;padding:10px 18px;border-radius:30px;background:rgba(10,40,35,.75);
 border:1.5px solid rgba(233,196,106,.7);font-weight:700;font-size:19px;color:#fff3d6;box-shadow:0 10px 30px rgba(0,0,0,.3)}}
.chip b{{width:10px;height:10px;border-radius:50%;background:#e9c46a;box-shadow:0 0 10px #e9c46a}}
/* center */
.center{{position:absolute;left:50%;top:150px;transform:translateX(-50%);text-align:center;width:640px}}
.word{{font-weight:800;font-size:96px;letter-spacing:-3px;margin-top:-6px;text-shadow:0 6px 30px rgba(0,0,0,.35)}}
.word span{{background:linear-gradient(90deg,#fbecc0,#e6c27a,#d4a64a);-webkit-background-clip:text;color:transparent}}
.by{{font-weight:600;font-size:22px;letter-spacing:7px;color:#e8f3ee;margin-top:6px}}
.tag{{margin-top:34px;font-size:27px;font-weight:600;color:#fff6e0;line-height:1.4}}
.tag em{{font-style:normal;color:#f0d48a}}
.svc{{display:flex;justify-content:center;gap:12px;margin-top:30px;flex-wrap:wrap}}
.svc div{{padding:10px 18px;border-radius:12px;background:rgba(233,196,106,.14);border:1px solid rgba(233,196,106,.5);font-size:17px;font-weight:600;color:#fff3d6}}
</style></head><body>
{netsvg}
<div class="glow"></div>

<!-- phone 1: delivery app -->
<div class="phone" style="left:110px;top:330px;transform:rotate(-9deg)"><div class="scr">
 <div class="notch"></div><div class="sb"></div>
 <div class="h">Yetkazib berish</div><div class="sub">Toshkent · 25–30 daqiqa</div>
 <div class="search">🔍&nbsp; Taom yoki do'kon qidirish</div>
 <div class="cats"><div class="cat on">Hammasi</div><div class="cat">Pizza</div><div class="cat">Burger</div></div>
 <div class="card"><div class="thumb" style="background:linear-gradient(135deg,#f6c26b,#e07a3f)"></div><div><div class="t1">Lavash Grill</div><div class="t2">★ 4.9 · 20 min</div></div><div class="price">32k</div></div>
 <div class="card"><div class="thumb" style="background:linear-gradient(135deg,#9ad48a,#3f8f5f)"></div><div><div class="t1">Green Bowl</div><div class="t2">★ 4.8 · 15 min</div></div><div class="price">45k</div></div>
 <div class="card"><div class="thumb" style="background:linear-gradient(135deg,#f3a6a0,#c0505a)"></div><div><div class="t1">Pizza House</div><div class="t2">★ 4.7 · 30 min</div></div><div class="price">68k</div></div>
 <div class="cta">Buyurtma berish →</div>
</div></div>

<!-- phone 2: chat app -->
<div class="phone" style="left:400px;top:250px;transform:rotate(6deg)"><div class="scr dark">
 <div class="notch"></div><div class="sb"></div>
 <div class="chathead"><div class="av"></div><div><div class="t1" style="color:#fff">AI Assistant</div><div style="font-size:11px;color:#8fe3b6">● online</div></div></div>
 <div class="msg in">Salom! Qanday yordam bera olaman? 👋</div>
 <div class="msg out">Ilova uchun dizayn kerak</div>
 <div class="msg in">Tayyor! 3 ta variant yubordim ✨</div>
 <div class="msg in" style="padding:6px"><div style="display:flex;gap:5px"><div style="flex:1;height:70px;border-radius:10px;background:linear-gradient(135deg,#f0d48a,#a8742a)"></div><div style="flex:1;height:70px;border-radius:10px;background:linear-gradient(135deg,#2a8a77,#0a312b)"></div><div style="flex:1;height:70px;border-radius:10px;background:linear-gradient(135deg,#f3a6a0,#7b2ff7)"></div></div></div>
 <div class="msg out">Zo'r! 🔥</div>
 <div class="input">Xabar yozing...<div class="send"></div></div>
</div></div>

<!-- floating chips left -->
<div class="chip abs" style="left:70px;top:150px"><b></b>Android</div>
<div class="chip abs" style="left:250px;top:110px"><b></b>iOS</div>
<div class="chip abs" style="left:700px;top:930px"><b></b>Flutter</div>

<!-- laptop with code -->
<div class="laptop"><div class="lid"><div class="code">
<div class="dots"><i style="background:#ff6b5f"></i><i style="background:#ffc542"></i><i style="background:#4cd964"></i></div>
<div><span class="c">// NeuroLabs · smart app core</span></div>
<div><span class="k">class</span> <span class="f">NeuroApp</span> <span class="k">extends</span> <span class="f">App</span> {{</div>
<div>&nbsp;&nbsp;<span class="k">async</span> <span class="f">launch</span>() {{</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">const</span> ai = <span class="k">await</span> <span class="f">Model</span>.<span class="f">load</span>(<span class="s">'neuro-v2'</span>);</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">const</span> api = <span class="k">new</span> <span class="f">Cloud</span>({{ region: <span class="s">'uz'</span> }});</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">this</span>.users = <span class="k">await</span> api.<span class="f">sync</span>();</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="k">this</span>.<span class="f">render</span>({{ ai, theme: <span class="s">'royal'</span> }});</div>
<div>&nbsp;&nbsp;}}</div>
<div>}}</div>
<div><span class="c">// ✓ build passed · deploy → </span><span class="n">production</span></div>
</div></div><div class="base"></div></div>

<!-- floating cards right -->
<div class="fc" style="left:1420px;top:150px;width:300px">
 <div class="lbl">ACTIVE USERS</div><div class="big">+248%</div>
 <svg width="264" height="70" viewBox="0 0 264 70"><defs><linearGradient id="a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9c46a" stop-opacity=".5"/><stop offset="1" stop-color="#e9c46a" stop-opacity="0"/></linearGradient></defs>
 <path d="M0 60 L30 52 L60 55 L90 40 L120 44 L150 28 L180 32 L210 16 L240 18 L264 4 L264 70 L0 70Z" fill="url(#a)"/>
 <path d="M0 60 L30 52 L60 55 L90 40 L120 44 L150 28 L180 32 L210 16 L240 18 L264 4" fill="none" stroke="#f0d48a" stroke-width="3.5" stroke-linejoin="round"/></svg>
</div>
<div class="fc" style="left:1765px;top:200px;width:220px;text-align:center">
 <svg width="64" height="64" viewBox="0 0 64 64"><rect x="14" y="14" width="36" height="36" rx="8" fill="none" stroke="#f0d48a" stroke-width="3.5"/>
 <text x="32" y="38" text-anchor="middle" font-family="Inter" font-weight="800" font-size="16" fill="#f0d48a">AI</text>
 <g stroke="#f0d48a" stroke-width="3" stroke-linecap="round"><path d="M24 14V6M32 14V6M40 14V6M24 50v8M32 50v8M40 50v8M14 24H6M14 32H6M14 40H6M50 24h8M50 32h8M50 40h8"/></g></svg>
 <div class="lbl" style="margin-top:6px">Artificial Intelligence</div>
</div>
<div class="chip abs" style="left:1830px;top:880px"><b></b>Web</div>
<div class="chip abs" style="left:1330px;top:900px"><b></b>Cloud ☁</div>
<div class="chip abs" style="left:1580px;top:930px"><b></b>UI/UX</div>

<!-- center brand -->
<div class="center">
 <svg width="230" height="230" viewBox="156 67 200 226"><defs>{defs}</defs>{icon}</svg>
 <div class="word">Neuro<span>Labs</span></div>
 <div class="by">BY QAYO TECH</div>
 <div class="tag">Mobile apps, websites &amp; <em>AI solutions</em><br>from idea to launch</div>
 <div class="svc"><div>📱 Mobile</div><div>🌐 Web</div><div>🤖 AI</div><div>⚙️ Backend</div><div>🎨 Design</div></div>
</div>
</body></html>'''
open('banner.html','w').write(html)
js='''const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
const p=await b.newPage({viewport:{width:2048,height:1152},deviceScaleFactor:2});
await p.goto('file://'+process.cwd()+'/banner.html');await p.waitForTimeout(600);
await p.screenshot({path:'raw.png'});await b.close();})();'''
open('render-banner.js','w').write(js)
subprocess.run(['node','render-banner.js'],check=True)
im=Image.open('raw.png').convert('RGB')
im.save('neurolabs-cover-royal-4096x2304.jpg',quality=88,optimize=True,progressive=True)
im.resize((1024,576),Image.LANCZOS).save('cover-preview.png')
print(im.size)
