import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  Building2, User, Users, Shield, CheckCircle2, Clock, FileText, Upload,
  ChevronRight, ChevronLeft, ArrowRight, Search, Filter, AlertTriangle,
  MapPin, Briefcase, Star, Eye, BarChart3, Zap, Lock, Settings, Home,
  HardHat, Ruler, ClipboardCheck, TrendingUp, Globe, Phone, Mail, Hash,
  Award, Target, Layers, BookOpen, Wrench, Truck, Camera, MessageSquare,
  Calendar, DollarSign, PieChart, Activity, Box, ShieldCheck, UserCheck,
  CircleDot, Sparkles, RefreshCw, AlertCircle, XCircle, CheckCircle, Info,
  LayoutDashboard, FolderOpen, BadgeCheck, UserPlus, Pencil, Trash2,
  MoreHorizontal, Bell, LogOut, Menu, X, ChevronDown, Play, Pause,
  Compass, FileCheck, Cpu, Hammer, TreePine, Gauge, ArrowUpRight,
  GraduationCap, Headphones, Heart, Lightbulb, Package, Workflow,
  ArrowLeft, ExternalLink, DownloadCloud, Flag, Percent, ThumbsUp,
  Navigation, Grid3X3, Share2, Database, BarChart2, Table, Check
} from "lucide-react";

/* ═══════════════════════════════════════════════════════
   KOMA V3 — DESIGN TOKENS
   ═══════════════════════════════════════════════════════ */
const K = {
  primary: "#18B7D2", primaryDark: "#0E8FA6", primaryLight: "#E8F8FB",
  secondary: "#6BC0AA", secondaryLight: "#EDF8F4",
  accent: "#2D2496", accentLight: "#EEEDF8",
  dark: "#1A1A2E", gray900: "#2A2D3E", gray700: "#5A5D6E",
  gray500: "#8A8D9E", gray400: "#A8ABBC", gray300: "#C8CBD8",
  gray200: "#E2E4EC", gray100: "#F0F1F5", gray50: "#F7F8FA",
  white: "#FFFFFF",
  success: "#10B981", successLight: "#ECFDF5",
  warning: "#F59E0B", warningLight: "#FFF8E1",
  danger: "#EF4444", dangerLight: "#FEF2F2",
  info: "#3B82F6", infoLight: "#EFF6FF",
  moe: "#7C3AED", moeDark: "#5B21B6", moeLight: "#F3EEFF",
  moex: "#D97706", moexDark: "#92400E", moexLight: "#FFF7ED",
  shadow1: "0 1px 2px rgba(0,0,0,.04), 0 4px 12px rgba(0,0,0,.03)",
  shadow2: "0 2px 8px rgba(0,0,0,.06), 0 8px 24px rgba(0,0,0,.04)",
  shadow3: "0 4px 16px rgba(0,0,0,.08), 0 16px 48px rgba(0,0,0,.06)",
  r: "14px", rSm: "10px", rLg: "18px", rXl: "24px",
  font: "'Outfit', system-ui, -apple-system, sans-serif",
};
const TC = { client: K.primary, amoa: K.accent, moe: K.moe, moex: K.moex, spoc: K.secondary, admin: K.dark };
const TL = { client: "Client", amoa: "AMOA", moe: "MOE", moex: "MOEX", spoc: "SPOC", admin: "Admin" };
const TI = { client: User, amoa: ShieldCheck, moe: Ruler, moex: HardHat, spoc: Target, admin: Settings };
const TBg = { client: K.primaryLight, amoa: K.accentLight, moe: K.moeLight, moex: K.moexLight, spoc: K.secondaryLight, admin: K.gray100 };

// ── Global styles ──
const _s = document.createElement("style");
_s.textContent = `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Serif+Display&display=swap');
*{box-sizing:border-box;margin:0;padding:0}body{font-family:${K.font};background:${K.gray50};color:${K.dark};-webkit-font-smoothing:antialiased}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:${K.gray300};border-radius:3px}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes scaleIn{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}
@keyframes slideR{from{opacity:0;transform:translateX(-12px)}to{opacity:1;transform:translateX(0)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.6}}
.fu{animation:fadeUp .45s ease both}.fu1{animation-delay:.06s}.fu2{animation-delay:.12s}.fu3{animation-delay:.18s}.fu4{animation-delay:.24s}.fu5{animation-delay:.3s}
.fi{animation:fadeIn .3s ease both}.si{animation:scaleIn .35s ease both}
`;
document.head.appendChild(_s);

/* ═══════════════════════════════════════════════════════
   SHARED COMPONENTS V3
   ═══════════════════════════════════════════════════════ */
const Badge = ({children, color=K.primary, bg, sm, pill}) => (
  <span style={{display:"inline-flex",alignItems:"center",gap:4,padding:sm?"2px 8px":"4px 12px",
    borderRadius:pill?20:6,fontSize:sm?11:12,fontWeight:600,letterSpacing:".02em",
    color,background:bg||(color+"12"),whiteSpace:"nowrap"}}>{children}</span>
);
const StatusDot = ({status}) => {
  const m={brouillon:{c:K.gray400,l:"Brouillon"},prequalifie:{c:K.warning,l:"Préqualifié"},en_revue:{c:K.info,l:"En revue"},
    qualifie:{c:K.success,l:"Qualifié"},qualifie_reserve:{c:K.moe,l:"Sous réserve"},active:{c:K.success,l:"Activé"},
    refuse:{c:K.danger,l:"Refusé"},attente_pieces:{c:K.warning,l:"Attente pièces"},invite:{c:K.gray400,l:"Invité"},suspendu:{c:K.danger,l:"Suspendu"}};
  const s=m[status]||m.brouillon;
  return <span style={{display:"inline-flex",alignItems:"center",gap:6,fontSize:12,fontWeight:600,color:s.c}}>
    <span style={{width:8,height:8,borderRadius:"50%",background:s.c,boxShadow:`0 0 0 3px ${s.c}20`}}/>{s.l}</span>;
};
const Progress = ({v,max=100,color=K.primary,h=6}) => (
  <div style={{width:"100%",height:h,borderRadius:h,background:K.gray100,overflow:"hidden"}}>
    <div style={{width:`${Math.min(100,(v/max)*100)}%`,height:"100%",borderRadius:h,
      background:`linear-gradient(90deg,${color},${color}dd)`,transition:"width .5s cubic-bezier(.4,0,.2,1)"}}/>
  </div>
);
const Score = ({value,max=100,label,size=68,color=K.primary}) => {
  const pct=(value/max)*100, r=(size-8)/2, c=2*Math.PI*r;
  return <div style={{textAlign:"center"}}>
    <div style={{position:"relative",width:size,height:size,margin:"0 auto"}}>
      <svg width={size} height={size} style={{transform:"rotate(-90deg)"}}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={K.gray100} strokeWidth={5}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={5}
          strokeDasharray={c} strokeDashoffset={c*(1-pct/100)} strokeLinecap="round"
          style={{transition:"stroke-dashoffset .8s cubic-bezier(.4,0,.2,1)"}}/>
      </svg>
      <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",
        fontSize:size*.28,fontWeight:800,color:K.dark}}>{value}</div>
    </div>
    {label&&<div style={{fontSize:11,fontWeight:500,color:K.gray500,marginTop:6}}>{label}</div>}
  </div>;
};
const Card = ({children,style:s,onClick,...p}) => (
  <div onClick={onClick} style={{background:K.white,borderRadius:K.r,padding:20,boxShadow:K.shadow1,
    border:`1px solid ${K.gray100}`,cursor:onClick?"pointer":"default",transition:"all .2s ease",...s}}
    onMouseEnter={e=>{if(onClick){e.currentTarget.style.boxShadow=K.shadow2;e.currentTarget.style.transform="translateY(-2px)"}}}
    onMouseLeave={e=>{if(onClick){e.currentTarget.style.boxShadow=K.shadow1;e.currentTarget.style.transform="none"}}}
    {...p}>{children}</div>
);
const Btn = ({children,v="primary",sz="md",icon:I,onClick,disabled,style:s,full}) => {
  const b={display:"inline-flex",alignItems:"center",justifyContent:"center",gap:8,fontFamily:K.font,fontWeight:600,
    borderRadius:K.rSm,cursor:disabled?"not-allowed":"pointer",border:"none",transition:"all .15s",
    opacity:disabled?.5:1,letterSpacing:".01em",width:full?"100%":"auto",
    ...(sz==="sm"?{padding:"7px 14px",fontSize:13}:sz==="lg"?{padding:"13px 26px",fontSize:15}:sz==="xl"?{padding:"16px 36px",fontSize:16.5}:{padding:"9px 20px",fontSize:14})};
  const vs={primary:{background:`linear-gradient(135deg,${K.primary},${K.primaryDark})`,color:K.white},
    secondary:{background:K.gray100,color:K.dark},accent:{background:K.accent,color:K.white},
    outline:{background:"transparent",color:K.primary,border:`1.5px solid ${K.primary}`},
    ghost:{background:"transparent",color:K.gray700},success:{background:K.success,color:K.white},
    danger:{background:K.danger,color:K.white},moe:{background:K.moe,color:K.white},moex:{background:K.moex,color:K.white},
    white:{background:K.white,color:K.dark,border:`1px solid ${K.gray200}`},
    hero:{background:`linear-gradient(135deg,${K.primary},${K.secondary})`,color:K.white,boxShadow:`0 4px 20px ${K.primary}40`}};
  return <button onClick={onClick} disabled={disabled} style={{...b,...vs[v],...s}}
    onMouseEnter={e=>{if(!disabled)e.currentTarget.style.opacity=".88"}} onMouseLeave={e=>{if(!disabled)e.currentTarget.style.opacity="1"}}
  >{I&&<I size={sz==="xl"?18:15}/>}{children}</button>;
};
const Sec = ({icon:I,title,sub,action,style:s}) => (
  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14,...s}}>
    <div style={{display:"flex",alignItems:"center",gap:10}}>
      {I&&<div style={{width:34,height:34,borderRadius:9,background:`${K.primary}0C`,display:"flex",alignItems:"center",justifyContent:"center"}}><I size={17} color={K.primary}/></div>}
      <div><h3 style={{fontSize:15,fontWeight:700,color:K.dark,lineHeight:1.3}}>{title}</h3>
        {sub&&<p style={{fontSize:12,color:K.gray500,marginTop:1}}>{sub}</p>}</div>
    </div>{action}
  </div>
);
const HelpBox = ({icon:I=Info,title,children,color=K.info}) => (
  <div style={{padding:"12px 14px",borderRadius:K.rSm,background:`${color}08`,border:`1px solid ${color}18`,display:"flex",gap:10,alignItems:"flex-start"}}>
    <I size={16} color={color} style={{marginTop:2,flexShrink:0}}/>
    <div>{title&&<div style={{fontWeight:600,fontSize:13,color:K.dark,marginBottom:3}}>{title}</div>}
      <div style={{fontSize:13,color:K.gray700,lineHeight:1.55}}>{children}</div></div>
  </div>
);
const HeroBanner = ({icon:I,title,sub,color=K.primary,badge,time}) => (
  <div className="fu" style={{padding:"24px 28px",borderRadius:K.rLg,
    background:`linear-gradient(135deg, ${color}0A, ${color}04)`,
    border:`1px solid ${color}18`,marginBottom:20,display:"flex",alignItems:"center",gap:18}}>
    <div style={{width:52,height:52,borderRadius:14,
      background:`linear-gradient(135deg, ${color}18, ${color}0C)`,
      display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
      <I size={26} color={color}/>
    </div>
    <div style={{flex:1}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
        <h2 style={{fontSize:21,fontWeight:800,color:K.dark}}>{title}</h2>
        {badge&&<Badge color={color} sm>{badge}</Badge>}
      </div>
      <p style={{fontSize:14,color:K.gray700,lineHeight:1.5}}>{sub}</p>
    </div>
    {time&&<div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"6px 14px",borderRadius:20,
      background:`${K.secondary}12`,color:K.secondary,fontSize:13,fontWeight:500}}><Clock size={14}/>{time}</div>}
  </div>
);

/* ═══════ STEPPER V2 ═══════ */
const StepperV2 = ({steps,current,onStep,color=K.primary}) => (
  <div style={{display:"flex",alignItems:"center",overflowX:"auto",padding:"4px 0",gap:0}}>
    {steps.map((s,i)=>{
      const done=i<current,act=i===current;
      return <div key={i} style={{display:"flex",alignItems:"center",flex:i<steps.length-1?1:"none",minWidth:0}}>
        <div onClick={()=>onStep?.(i)} style={{display:"flex",alignItems:"center",gap:6,cursor:onStep?"pointer":"default",
          padding:"5px 10px",borderRadius:8,background:act?`${color}0C`:"transparent",transition:"all .15s",flexShrink:0}}>
          <div style={{width:26,height:26,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:11,fontWeight:700,background:done?K.success:act?color:K.gray200,
            color:done||act?K.white:K.gray500,transition:"all .25s",boxShadow:act?`0 0 0 3px ${color}20`:"none"}}>
            {done?<CheckCircle2 size={13}/>:i+1}
          </div>
          <span style={{fontSize:12.5,fontWeight:act?600:400,color:act?K.dark:K.gray500,whiteSpace:"nowrap"}}>{s}</span>
        </div>
        {i<steps.length-1&&<div style={{flex:1,height:2,minWidth:12,background:done?K.success:`${K.gray200}`,margin:"0 2px",borderRadius:1,transition:"background .3s"}}/>}
      </div>;
    })}
  </div>
);

/* ═══════ FORM HELPERS ═══════ */
const RadioCards = ({field,options,cols=2,form,set}) => (
  <div style={{display:"grid",gridTemplateColumns:`repeat(${cols},1fr)`,gap:10}}>
    {options.map(opt=>{
      const id=opt.id||opt, sel=form[field]===id, I=opt.icon;
      return <div key={id} onClick={()=>set(field,id)} style={{padding:"12px 14px",borderRadius:K.rSm,cursor:"pointer",
        border:`2px solid ${sel?K.primary:K.gray200}`,background:sel?`${K.primary}06`:K.white,transition:"all .15s",
        display:"flex",alignItems:"center",gap:10}}>
        {I&&<div style={{width:36,height:36,borderRadius:9,background:sel?`${K.primary}12`:K.gray50,
          display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><I size={18} color={sel?K.primary:K.gray500}/></div>}
        <div style={{flex:1,minWidth:0}}><div style={{fontWeight:600,fontSize:13.5,color:K.dark}}>{opt.label||opt}</div>
          {opt.desc&&<div style={{fontSize:12,color:K.gray500,marginTop:1}}>{opt.desc}</div>}</div>
        <div style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${sel?K.primary:K.gray300}`,
          display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          {sel&&<div style={{width:9,height:9,borderRadius:"50%",background:K.primary}}/>}</div>
      </div>;
    })}
  </div>
);
const Chips = ({field,options,form,set,multi,color=K.primary}) => (
  <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
    {options.map(o=>{
      const sel=multi?(form[field]||[]).includes(o):form[field]===o;
      return <div key={o} onClick={()=>{
        if(multi){set(field,sel?(form[field]||[]).filter(s=>s!==o):[...(form[field]||[]),o])}else{set(field,o)}
      }} style={{padding:"7px 15px",borderRadius:20,cursor:"pointer",fontSize:13,fontWeight:500,
        border:`1.5px solid ${sel?color:K.gray200}`,background:sel?`${color}0C`:K.white,
        color:sel?color:K.gray700,transition:"all .15s"}}>{o}</div>;
    })}
  </div>
);
const Input = ({label,placeholder,field,req,type="text",form,set,area}) => (
  <div style={{marginBottom:14}}>
    <label style={{fontSize:13,fontWeight:600,color:K.dark,display:"block",marginBottom:5}}>{label}{req&&<span style={{color:K.danger}}> *</span>}</label>
    {area?<textarea placeholder={placeholder} value={form[field]||""} onChange={e=>set(field,e.target.value)} rows={3}
      style={{width:"100%",padding:"9px 13px",borderRadius:8,border:`1.5px solid ${K.gray200}`,fontSize:14,fontFamily:K.font,outline:"none",transition:"border .15s",resize:"vertical"}}
      onFocus={e=>e.target.style.borderColor=K.primary} onBlur={e=>e.target.style.borderColor=K.gray200}/>
    :<input type={type} placeholder={placeholder} value={form[field]||""} onChange={e=>set(field,e.target.value)}
      style={{width:"100%",padding:"9px 13px",borderRadius:8,border:`1.5px solid ${K.gray200}`,fontSize:14,fontFamily:K.font,outline:"none",transition:"border .15s"}}
      onFocus={e=>e.target.style.borderColor=K.primary} onBlur={e=>e.target.style.borderColor=K.gray200}/>}
  </div>
);
const CheckList = ({items,field,form,set,color=K.primary}) => (
  <div>{items.map(q=>{const sel=(form[field]||[]).includes(q);
    return <div key={q} onClick={()=>set(field,sel?(form[field]||[]).filter(s=>s!==q):[...(form[field]||[]),q])}
      style={{padding:"9px 12px",borderRadius:7,cursor:"pointer",marginBottom:4,border:`1.5px solid ${sel?color:K.gray200}`,
        background:sel?`${color}08`:K.white,fontSize:13,fontWeight:sel?600:400,display:"flex",alignItems:"center",gap:7,transition:"all .12s"}}>
      <div style={{width:16,height:16,borderRadius:4,border:`2px solid ${sel?color:K.gray300}`,background:sel?color:K.white,
        display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{sel&&<CheckCircle2 size={10} color={K.white}/>}</div>{q}</div>;})}
</div>);

/* ═══════ DRAWER ═══════ */
const Drawer = ({open,onClose,title,children,width=440}) => {
  if(!open) return null;
  return <div style={{position:"fixed",inset:0,zIndex:1000,animation:"fadeIn .2s ease"}}>
    <div onClick={onClose} style={{position:"absolute",inset:0,background:"rgba(0,0,0,.3)",backdropFilter:"blur(2px)"}}/>
    <div style={{position:"absolute",right:0,top:0,bottom:0,width,background:K.white,boxShadow:K.shadow3,
      display:"flex",flexDirection:"column",animation:"slideR .25s ease"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px",borderBottom:`1px solid ${K.gray100}`}}>
        <h3 style={{fontSize:16,fontWeight:700}}>{title}</h3>
        <div onClick={onClose} style={{cursor:"pointer",padding:4}}><X size={18} color={K.gray500}/></div></div>
      <div style={{flex:1,overflowY:"auto",padding:20}}>{children}</div>
    </div>
  </div>;
};

/* ═══════ MODAL ═══════ */
const Modal = ({open,onClose,title,children,wide}) => {
  if(!open) return null;
  return <div style={{position:"fixed",inset:0,zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",animation:"fadeIn .2s ease"}}>
    <div onClick={onClose} style={{position:"absolute",inset:0,background:"rgba(0,0,0,.35)",backdropFilter:"blur(3px)"}}/>
    <div style={{position:"relative",background:K.white,borderRadius:K.rLg,boxShadow:K.shadow3,
      width:wide?700:500,maxHeight:"85vh",display:"flex",flexDirection:"column",animation:"scaleIn .25s ease"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 22px",borderBottom:`1px solid ${K.gray100}`}}>
        <h3 style={{fontSize:16,fontWeight:700}}>{title}</h3>
        <div onClick={onClose} style={{cursor:"pointer",padding:4}}><X size={18} color={K.gray500}/></div></div>
      <div style={{flex:1,overflowY:"auto",padding:22}}>{children}</div>
    </div>
  </div>;
};

/* ═══════ QUALIFICATION LEVEL BADGE ═══════ */
const LEVELS = [
  {n:1,l:"Référencé",c:K.gray400,desc:"Dossier reçu, identité vérifiée"},
  {n:2,l:"Vérifié",c:K.info,desc:"Documents conformes, pièces validées"},
  {n:3,l:"Qualifié",c:K.success,desc:"Compétences confirmées, références vérifiées"},
  {n:4,l:"Confirmé",c:K.accent,desc:"Track-record solide, missions réussies"},
  {n:5,l:"Expert KOMA",c:K.primary,desc:"Partenaire premium, label d'excellence"},
];
const LevelBadge = ({level=1,onClick}) => {
  const lv = LEVELS[Math.min(level,5)-1];
  return <div onClick={onClick} style={{display:"inline-flex",alignItems:"center",gap:6,padding:"5px 12px",borderRadius:20,
    background:`${lv.c}12`,cursor:onClick?"pointer":"default",transition:"all .15s"}}>
    {Array.from({length:5}).map((_,i)=><Star key={i} size={12} color={i<level?lv.c:K.gray200} fill={i<level?lv.c:"none"} strokeWidth={2}/>)}
    <span style={{fontSize:12,fontWeight:700,color:lv.c,marginLeft:2}}>Niv. {level} — {lv.l}</span>
  </div>;
};

/* ═══════════════════════════════════════════════════════
   SIDEBAR V3
   ═══════════════════════════════════════════════════════ */
const NAV=[
  {id:"home_client",label:"Accueil Client",icon:Home,group:"client"},
  {id:"prospect",label:"Mon projet",icon:Compass,group:"client",dot:K.primary},
  {id:"post_onboarding",label:"Mon dossier",icon:FolderOpen,group:"client"},
  {id:"sep1",sep:true},
  {id:"pro_hub",label:"Espace Pro",icon:Briefcase,group:"pro"},
  {id:"amoa",label:"AMOA",icon:ShieldCheck,group:"pro",dot:K.accent},
  {id:"moe",label:"MOE",icon:Ruler,group:"pro",dot:K.moe},
  {id:"moex",label:"MOEX",icon:HardHat,group:"pro",dot:K.moex},
  {id:"sep2",sep:true},
  {id:"internal",label:"Espace Interne",icon:Shield,group:"internal"},
  {id:"spoc",label:"SPOC",icon:Target,group:"internal",dot:K.secondary},
  {id:"sep3",sep:true},
  {id:"dashboard",label:"Tableau de bord",icon:LayoutDashboard},
  {id:"documents",label:"Documents",icon:FolderOpen},
  {id:"equipes",label:"Équipes",icon:Users},
  {id:"habilitations",label:"Habilitations",icon:Lock},
  {id:"qualification",label:"Qualification",icon:Award},
  {id:"resume",label:"Résumé IA",icon:Sparkles},
  {id:"admin",label:"Pilotage Admin",icon:Settings},
];
const Sidebar=({active,onNav})=>(
  <div style={{width:232,minHeight:"100vh",background:K.dark,color:K.white,padding:"18px 0",
    display:"flex",flexDirection:"column",position:"fixed",left:0,top:0,zIndex:100}}>
    <div style={{padding:"0 18px 20px",borderBottom:`1px solid #ffffff12`}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:34,height:34,borderRadius:9,background:`linear-gradient(135deg,${K.secondary},${K.primary})`,
          display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:16,color:K.white}}>K</div>
        <div><div style={{fontWeight:700,fontSize:14.5,letterSpacing:".02em"}}>KOMA Expertise</div>
          <div style={{fontSize:10.5,color:K.gray500,marginTop:1,letterSpacing:".04em",textTransform:"uppercase"}}>Portail V3</div></div>
      </div>
    </div>
    <div style={{flex:1,padding:"10px 6px",overflowY:"auto"}}>
      {NAV.map(n=>{
        if(n.sep) return <div key={n.id} style={{height:1,background:"#ffffff08",margin:"8px 12px"}}/>;
        const I=n.icon,a=active===n.id;
        return <div key={n.id} onClick={()=>onNav(n.id)} style={{display:"flex",alignItems:"center",gap:9,
          padding:"9px 12px",borderRadius:8,cursor:"pointer",marginBottom:1,
          background:a?`${K.primary}18`:"transparent",color:a?K.primary:`#ffffffaa`,
          fontWeight:a?600:400,fontSize:13,transition:"all .12s"}}
          onMouseEnter={e=>{if(!a)e.currentTarget.style.background="#ffffff08"}}
          onMouseLeave={e=>{if(!a)e.currentTarget.style.background="transparent"}}>
          <I size={17}/><span style={{flex:1}}>{n.label}</span>
          {n.dot&&<span style={{width:7,height:7,borderRadius:"50%",background:n.dot,opacity:a?1:.4}}/>}
        </div>;
      })}
    </div>
    <div style={{padding:"10px 14px",borderTop:`1px solid #ffffff12`,display:"flex",alignItems:"center",gap:9}}>
      <div style={{width:30,height:30,borderRadius:"50%",background:K.accent,display:"flex",alignItems:"center",justifyContent:"center",
        fontWeight:700,fontSize:12,color:K.white}}>AD</div>
      <div style={{flex:1}}><div style={{fontSize:12.5,fontWeight:500}}>Admin KOMA</div>
        <div style={{fontSize:10.5,color:K.gray500}}>Super administrateur</div></div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════
   MOCK DATA
   ═══════════════════════════════════════════════════════ */
const MOCK={
  dash:{brouillon:8,prequalifie:12,attente_pieces:5,en_revue:7,qualifie:23,refuse:3,active:18,
    recent:[
      {id:"PRS-0412",name:"Marie-Claire Nkengué",type:"client",status:"en_revue",pct:72,date:"14/04",proj:"Construction neuve — Douala"},
      {id:"AMOA-018",name:"Cabinet Tekton SARL",type:"amoa",status:"attente_pieces",pct:55,date:"12/04",proj:"Onboarding AMOA"},
      {id:"MOE-009",name:"Arch. Jean-Paul Fotso",type:"moe",status:"qualifie",pct:100,date:"10/04",proj:"MOE indépendant"},
      {id:"MOEX-007",name:"BTP Construct SARL",type:"moex",status:"prequalifie",pct:40,date:"09/04",proj:"Onboarding MOEX"},
      {id:"PRS-0398",name:"Alain Tchetchoua",type:"client",status:"brouillon",pct:20,date:"08/04",proj:"Rénovation — Yaoundé"},
      {id:"SPOC-003",name:"Nadège Mbarga",type:"spoc",status:"active",pct:100,date:"06/04",proj:"Habilitation SPOC"},
    ]},
  amoa:{name:"Cabinet Tekton SARL",type:"Entreprise",zone:"Douala, Yaoundé, Bafoussam",exp:8,proj:34,
    missions:["Audit","Contrôle qualité","Validation livrables","Suivi conformité","Assistance décision"],
    phases:["Pré-faisabilité","Conception","Devis","Exécution","Clôture"],
    scores:{conformite:82,capacite:75,fiabilite:88,metier:80,global:82},
    docs:[{n:"RCCM",s:"ok"},{n:"NIU",s:"ok"},{n:"Assurance RC Pro",s:"review"},{n:"Références projets",s:"received"},{n:"CV équipe clé",s:"missing"}],
    team:[{n:"Paul Essama",r:"Chef de mission",s:"actif",sp:"AMOA",anc:"5 ans"},{n:"Aline Mbarga",r:"Contrôleur qualité",s:"actif",sp:"Qualité",anc:"3 ans"},{n:"Yves Nkodo",r:"Auditeur terrain",s:"invite",sp:"Audit",anc:"2 ans"}]},
  moe:{name:"Arch. Jean-Paul Fotso",type:"Indépendant",specs:["Architecture","Économie construction"],
    phases:{APS:true,APD:true,PRO:true,DCE:false,ACT:false},
    scores:{qualite:91,process:78,conformite:85,metier:84,global:85},
    livrables:["Plans architecturaux APS/APD","Notes de calcul","DPGF estimatif","Détails techniques façades","Perspectives 3D"],
    refs:[{n:"Villa Akwa — Douala",y:2024,b:"85M",r:"Architecture complète"},{n:"Immeuble R+3 — Yaoundé",y:2023,b:"250M",r:"APS + APD"}],
    team:[{n:"Jean-Paul Fotso",r:"Architecte principal",s:"actif",sp:"Architecture",anc:"12 ans"},{n:"Marie Talla",r:"Économiste",s:"actif",sp:"Économie",anc:"5 ans"},{n:"Éric Ndjock",r:"Dessinateur projeteur",s:"invite",sp:"DAO",anc:"3 ans"}]},
  moex:{name:"BTP Construct SARL",type:"Entreprise",cap:"5 chantiers simultanés",
    scores:{terrain:72,reporting:65,process:70,hse:78,global:71},
    capacities:["Suivi journalier","Coordination chantier","Remontée besoins","Gestion tâches","Photos/vidéos","Discipline HSE"],
    refs:[{n:"Résidence Bali — Douala",y:2024,b:"120M"},{n:"Villa Omnisport — Yaoundé",y:2023,b:"90M"}],
    team:[{n:"Amadou Bello",r:"Chef de chantier",s:"actif",sp:"Terrain",anc:"8 ans"},{n:"Thierry Ngo",r:"Conducteur travaux",s:"actif",sp:"Suivi",anc:"4 ans"},{n:"Sandrine Eyenga",r:"Responsable HSE",s:"invite",sp:"HSE",anc:"2 ans"}]},
  spoc:{name:"Nadège Mbarga",seniority:"Senior",zone:"Afrique Centrale",
    modules:["Portefeuille","Prospects","Projet","Devis","Tâches","Achats","Stock","Facturation","Rapports","GED","Messagerie","Météo","Vidéo","KPI","IA"],
    scores:{coordination:92,arbitrage:85,relation:90,synthese:88,global:89}},
};

/* ═══════════════════════════════════════════════════════
   JOURNEY WRAPPER
   ═══════════════════════════════════════════════════════ */
const Journey = ({steps,current,setCurrent,color,renderStep,sideInfo,onFinish}) => (
  <div style={{display:"grid",gridTemplateColumns:"1fr 260px",gap:18}}>
    <div>
      <Card style={{marginBottom:16,padding:"10px 14px"}}><StepperV2 steps={steps} current={current} onStep={setCurrent} color={color}/></Card>
      <Card className="si">{renderStep()}
        <div style={{display:"flex",justifyContent:"space-between",marginTop:22,paddingTop:14,borderTop:`1px solid ${K.gray100}`}}>
          <Btn v="ghost" icon={ChevronLeft} onClick={()=>setCurrent(Math.max(0,current-1))} disabled={current===0}>Précédent</Btn>
          <Btn icon={current<steps.length-1?ChevronRight:CheckCircle}
            onClick={()=>{if(current<steps.length-1)setCurrent(current+1);else if(onFinish)onFinish();}}>
            {current<steps.length-1?"Continuer":"Finaliser"}</Btn>
        </div>
      </Card>
    </div>
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      <Card><div style={{fontSize:13,fontWeight:600,marginBottom:10,color:K.gray700}}>Progression</div>
        <Progress v={(current+1)*100/steps.length} color={color} h={7}/>
        <div style={{fontSize:12,color:K.gray500,marginTop:7,textAlign:"center"}}>Étape {current+1} / {steps.length}</div></Card>
      <Card><div style={{fontSize:13,fontWeight:600,marginBottom:8,color:K.gray700}}>Étapes du parcours</div>
        {steps.map((s,i)=><div key={i} onClick={()=>setCurrent(i)} style={{display:"flex",alignItems:"center",gap:7,marginBottom:5,fontSize:12.5,
          color:i<=current?K.dark:K.gray400,cursor:"pointer"}}>
          {i<current?<CheckCircle2 size={13} color={K.success}/>:i===current?<CircleDot size={13} color={color}/>:
            <div style={{width:13,height:13,borderRadius:"50%",border:`1.5px solid ${K.gray300}`}}/>}
          <span style={{fontWeight:i===current?600:400}}>{s}</span></div>)}</Card>
      {sideInfo||<HelpBox icon={Shield} color={K.secondary}>Vos données sont protégées. Vous pouvez reprendre à tout moment.</HelpBox>}
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════
   A. HOME CLIENT / PROSPECT — Landing page dédiée
   ═══════════════════════════════════════════════════════ */
const SHomeClient=({onNav})=>{
  const benefits = [
    {icon:Shield,title:"Sécurité totale",desc:"Chaque prestataire est qualifié, chaque étape est documentée"},
    {icon:Eye,title:"Visibilité en continu",desc:"Suivez votre projet en temps réel, depuis la France ou ailleurs"},
    {icon:Users,title:"Experts coordonnés",desc:"AMOA, MOE, MOEX : une équipe structurée pour votre projet"},
    {icon:CheckCircle,title:"Conformité garantie",desc:"Plans, devis, exécution : tout est contrôlé et validé"},
  ];
  const steps = [
    {n:"1",t:"Décrivez votre projet",d:"Type, lieu, budget, délai — en 3 minutes"},
    {n:"2",t:"KOMA analyse et structure",d:"Un conseiller étudie votre dossier sous 24h"},
    {n:"3",t:"Recevez un plan d'action",d:"Études, devis, planning — tout est organisé"},
    {n:"4",t:"Suivez l'avancement",d:"Tableau de bord, rapports, alertes en temps réel"},
  ];
  return <div style={{maxWidth:900,margin:"0 auto"}}>
    {/* HERO */}
    <div className="fu" style={{textAlign:"center",padding:"32px 20px 38px",marginBottom:28,
      borderRadius:K.rXl,background:`linear-gradient(160deg,${K.dark} 0%,${K.gray900} 40%,${K.primaryDark} 100%)`,
      position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:-60,right:-60,width:220,height:220,borderRadius:"50%",background:`${K.primary}12`}}/>
      <div style={{position:"absolute",bottom:-40,left:-40,width:160,height:160,borderRadius:"50%",background:`${K.secondary}10`}}/>
      <div style={{position:"relative",zIndex:1}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"6px 16px",borderRadius:20,
          background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.12)",marginBottom:18}}>
          <div style={{width:24,height:24,borderRadius:7,background:`linear-gradient(135deg,${K.secondary},${K.primary})`,
            display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:11,color:K.white}}>K</div>
          <span style={{color:"rgba(255,255,255,.8)",fontSize:13,fontWeight:500}}>KOMA Expertise</span></div>
        <h1 style={{fontSize:32,fontWeight:900,color:K.white,lineHeight:1.25,maxWidth:640,margin:"0 auto 14px",letterSpacing:"-.02em"}}>
          Construisez en Afrique avec<br/>
          <span style={{background:`linear-gradient(90deg,${K.primary},${K.secondary})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
            visibilité, méthode et contrôle</span>
        </h1>
        <p style={{fontSize:16,color:"rgba(255,255,255,.65)",maxWidth:520,margin:"0 auto 24px",lineHeight:1.65}}>
          Un seul point d'entrée, des experts qualifiés, un suivi structuré.<br/>
          Terrain, études, conception, exécution : tout commence ici.
        </p>
        <div style={{display:"flex",gap:12,justifyContent:"center"}}>
          <Btn v="hero" sz="xl" icon={ArrowRight} onClick={()=>onNav("prospect")}>Démarrer mon projet</Btn>
          <Btn v="white" sz="lg" icon={RefreshCw} onClick={()=>onNav("post_onboarding")}>Reprendre mon dossier</Btn>
        </div>
      </div>
    </div>

    {/* HOW IT WORKS */}
    <div className="fu fu1" style={{marginBottom:28}}>
      <div style={{textAlign:"center",marginBottom:18}}>
        <h2 style={{fontSize:20,fontWeight:800,marginBottom:4}}>Comment ça fonctionne</h2>
        <p style={{color:K.gray500,fontSize:14}}>4 étapes simples pour lancer votre projet immobilier</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
        {steps.map((s,i)=><Card key={i} style={{textAlign:"center",padding:18,position:"relative"}}>
          <div style={{width:36,height:36,borderRadius:"50%",background:`linear-gradient(135deg,${K.primary},${K.secondary})`,
            display:"inline-flex",alignItems:"center",justifyContent:"center",color:K.white,fontWeight:800,fontSize:15,marginBottom:10}}>{s.n}</div>
          <div style={{fontWeight:700,fontSize:14,marginBottom:5}}>{s.t}</div>
          <div style={{fontSize:12.5,color:K.gray500,lineHeight:1.5}}>{s.d}</div>
        </Card>)}
      </div>
    </div>

    {/* BENEFITS */}
    <div className="fu fu2" style={{marginBottom:28}}>
      <div style={{textAlign:"center",marginBottom:18}}>
        <h2 style={{fontSize:20,fontWeight:800,marginBottom:4}}>Pourquoi choisir KOMA</h2>
        <p style={{color:K.gray500,fontSize:14}}>KOMA sécurise votre projet de bout en bout</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        {benefits.map((b,i)=>{const I=b.icon;return <Card key={i} style={{display:"flex",gap:14,padding:18}}>
          <div style={{width:44,height:44,borderRadius:12,background:K.primaryLight,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <I size={22} color={K.primary}/></div>
          <div><div style={{fontWeight:700,fontSize:14,marginBottom:3}}>{b.title}</div>
            <div style={{fontSize:13,color:K.gray500,lineHeight:1.5}}>{b.desc}</div></div>
        </Card>;})}
      </div>
    </div>

    {/* WHAT YOU GET */}
    <Card className="fu fu3" style={{marginBottom:28,padding:22,background:`linear-gradient(135deg,${K.primaryLight},${K.secondaryLight})`}}>
      <Sec icon={Sparkles} title="Ce que vous allez obtenir" style={{marginBottom:12}}/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
        {["Un dossier structuré et complet","Une étude de faisabilité technique","Des plans architecturaux validés",
          "Un devis détaillé par lots","Un planning réaliste","Un suivi de chantier en temps réel"].map((t,i)=>
          <div key={i} style={{display:"flex",alignItems:"center",gap:7,fontSize:13,fontWeight:500}}>
            <CheckCircle2 size={14} color={K.success}/>{t}</div>)}
      </div>
    </Card>

    {/* BOTTOM CTAs */}
    <div className="fu fu4" style={{display:"flex",gap:12,justifyContent:"center",marginBottom:16}}>
      <Btn icon={ArrowRight} onClick={()=>onNav("prospect")}>Démarrer mon projet</Btn>
      <Btn v="outline" icon={Compass} onClick={()=>onNav("prospect")}>Découvrir comment ça marche</Btn>
    </div>
    <div style={{textAlign:"center",marginBottom:12}}>
      <span onClick={()=>onNav("pro_hub")} style={{fontSize:13,color:K.gray500,cursor:"pointer",textDecoration:"underline"}}>
        Vous êtes un professionnel ? Accéder à l'espace partenaire →</span>
    </div>
    <div style={{textAlign:"center"}}>
      <span onClick={()=>onNav("internal")} style={{fontSize:12,color:K.gray400,cursor:"pointer"}}>
        Espace interne KOMA</span>
    </div>
  </div>;
};

/* ═══════════════════════════════════════════════════════
   B. HUB PROFESSIONNELS
   ═══════════════════════════════════════════════════════ */
const SProHub=({onNav})=>{
  const paths=[
    {id:"amoa",label:"AMOA",desc:"Assistance à Maîtrise d'Ouvrage — Audit, contrôle, validation, suivi conformité",icon:ShieldCheck,color:K.accent,
      details:"Vous accompagnez le client dans la définition, la vérification et le pilotage de son projet."},
    {id:"moe",label:"MOE",desc:"Maîtrise d'Œuvre — Architecture, BET, ingénierie de conception",icon:Ruler,color:K.moe,
      details:"Vous concevez les plans, produisez les livrables techniques et coordonnez la conception."},
    {id:"moex",label:"MOEX",desc:"Maîtrise d'Œuvre d'Exécution — Chantier, pilotage terrain, exécution",icon:HardHat,color:K.moex,
      details:"Vous pilotez l'exécution sur le terrain : coordination, suivi, reporting, HSE."},
  ];
  return <div style={{maxWidth:860,margin:"0 auto"}}>
    <div className="fu" style={{textAlign:"center",marginBottom:28}}>
      <div style={{width:56,height:56,borderRadius:14,background:`linear-gradient(135deg,${K.accent},${K.moe})`,
        display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:14}}>
        <Briefcase size={28} color={K.white}/></div>
      <h1 style={{fontSize:26,fontWeight:900,marginBottom:8}}>Espace Professionnels Partenaires</h1>
      <p style={{fontSize:15,color:K.gray700,maxWidth:540,margin:"0 auto",lineHeight:1.6}}>
        Rejoignez le réseau KOMA Expertise. Qualifiez votre structure, présentez vos compétences et accédez à des missions qualifiées.</p>
    </div>
    <div className="fu fu1" style={{display:"grid",gridTemplateColumns:"1fr",gap:14,marginBottom:24}}>
      {paths.map(p=>{const I=p.icon;return <Card key={p.id} onClick={()=>onNav(p.id)} style={{padding:20}}>
        <div style={{display:"flex",alignItems:"center",gap:16}}>
          <div style={{width:52,height:52,borderRadius:14,background:`${p.color}0C`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <I size={26} color={p.color}/></div>
          <div style={{flex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
              <span style={{fontWeight:800,fontSize:17,color:K.dark}}>{p.label}</span>
              <Badge color={p.color} sm pill>Parcours ~5 min</Badge></div>
            <div style={{fontSize:14,color:K.gray700,marginBottom:3}}>{p.desc}</div>
            <div style={{fontSize:12.5,color:K.gray500}}>{p.details}</div></div>
          <ChevronRight size={22} color={K.gray300}/></div>
      </Card>;})}
    </div>
    <div className="fu fu2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20}}>
      <HelpBox icon={Award} title="Système de qualification" color={K.primary}>
        5 niveaux de qualification — du référencement initial jusqu'au label Expert KOMA. Chaque niveau débloque de nouvelles missions.</HelpBox>
      <HelpBox icon={Shield} title="Vérification et conformité" color={K.accent}>
        Documents vérifiés, références contrôlées, compétences validées. KOMA garantit un réseau de partenaires fiables.</HelpBox>
    </div>
    <div style={{textAlign:"center"}}>
      <span onClick={()=>onNav("home_client")} style={{fontSize:13,color:K.gray500,cursor:"pointer"}}>← Retour à l'accueil client</span>
    </div>
  </div>;
};

/* ═══════════════════════════════════════════════════════
   C. HUB INTERNE KOMA
   ═══════════════════════════════════════════════════════ */
const SInternal=({onNav})=>(
  <div style={{maxWidth:700,margin:"0 auto"}}>
    <div className="fu" style={{textAlign:"center",marginBottom:28}}>
      <div style={{width:56,height:56,borderRadius:14,background:`linear-gradient(135deg,${K.secondary},${K.dark})`,
        display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:14}}>
        <Shield size={28} color={K.white}/></div>
      <h1 style={{fontSize:24,fontWeight:900,marginBottom:8}}>Espace Interne KOMA</h1>
      <p style={{fontSize:14,color:K.gray700,maxWidth:480,margin:"0 auto"}}>
        Réservé aux collaborateurs KOMA Expertise. Habilitation, pilotage et coordination interne.</p>
    </div>
    <div className="fu fu1" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      {[{id:"spoc",l:"SPOC",d:"Point de contact unique — Pilotage client & coordination",i:Target,c:K.secondary},
        {id:"admin",l:"Admin KOMA",d:"Administration globale — Paramétrage & pilotage",i:Settings,c:K.dark}
      ].map(p=>{const I=p.i;return <Card key={p.id} onClick={()=>onNav(p.id)} style={{textAlign:"center",padding:24}}>
        <div style={{width:48,height:48,borderRadius:12,background:`${p.c}0C`,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:10}}>
          <I size={24} color={p.c}/></div>
        <div style={{fontWeight:700,fontSize:16,marginBottom:4}}>{p.l}</div>
        <div style={{fontSize:13,color:K.gray500}}>{p.d}</div>
      </Card>;})}
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════
   PROSPECT JOURNEY P-01 to P-06 + Post-onboarding
   ═══════════════════════════════════════════════════════ */
const SProspect=({onNav})=>{
  const [step,setStep]=useState(0),[form,setForm]=useState({}),[done,setDone]=useState(false);
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const steps=["Qualification","Cadrage","Maturité","Intervenants","Coordonnées","Résumé"];
  const matScore=()=>{let s=0;if(form.has_land==="Oui")s++;if(form.has_feasibility==="Oui")s++;
    if(form.has_plans&&form.has_plans!=="Non")s++;if(form.has_quote&&form.has_quote!=="Non")s++;if(form.has_financing==="Oui")s++;return s;};
  const matLevel=()=>{const s=matScore();return s<=1?"Débutant":s<=3?"Intermédiaire":"Avancé"};
  const matColor=()=>{const s=matScore();return s<=1?K.warning:s<=3?K.info:K.success};
  const nextStep=()=>{const sc=matScore();
    if(sc<=1)return {t:"Étude de préfaisabilité",d:"Valider la faisabilité technico-économique du projet"};
    if(sc<=3)return {t:"Finalisation conception",d:"Compléter les plans et préparer le chiffrage détaillé"};
    return {t:"Lancement exécution",d:"Contractualiser et démarrer le chantier avec suivi KOMA"};};
  const docsToPrep=()=>{const d=[];if(form.has_land!=="Oui")d.push("Titre foncier / Plan de bornage");
    if(form.has_plans==="Non"||!form.has_plans)d.push("Esquisse ou programme architectural");
    if(form.has_quote==="Non"||!form.has_quote)d.push("Budget indicatif détaillé");
    d.push("Pièce d'identité","Photos du terrain (si disponible)");return d;};

  if(done) return <div style={{maxWidth:700,margin:"0 auto"}}>
    <div className="fu" style={{textAlign:"center",padding:"36px 28px",borderRadius:K.rXl,
      background:`linear-gradient(160deg,${K.successLight},${K.primaryLight})`,border:`2px solid ${K.success}22`,marginBottom:20}}>
      <div style={{width:64,height:64,borderRadius:"50%",background:`${K.success}15`,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:14}}>
        <CheckCircle size={34} color={K.success}/></div>
      <h1 style={{fontSize:24,fontWeight:900,marginBottom:8}}>Votre projet a bien été enregistré</h1>
      <p style={{fontSize:15,color:K.gray700,maxWidth:480,margin:"0 auto 6px",lineHeight:1.6}}>
        Un conseiller KOMA va analyser votre dossier et vous recontacter sous <strong>24 heures</strong>.</p>
      <div style={{fontSize:13,color:K.gray500}}>Référence dossier : <strong>PRS-{String(Math.floor(Math.random()*9000+1000))}</strong></div>
    </div>
    <div className="fu fu1" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:18}}>
      <Card style={{padding:16}}>
        <Sec icon={Target} title="Prochaines étapes" style={{marginBottom:10}}/>
        <div style={{fontSize:13,color:K.gray700,lineHeight:1.7}}>
          <div style={{marginBottom:6}}>1. Analyse du dossier par un SPOC KOMA</div>
          <div style={{marginBottom:6}}>2. Proposition de plan d'action personnalisé</div>
          <div>3. Mise en relation avec les experts adaptés</div>
        </div>
      </Card>
      <Card style={{padding:16}}>
        <Sec icon={FileText} title="Documents à préparer" style={{marginBottom:10}}/>
        {docsToPrep().map((d,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:6,fontSize:13,color:K.gray700,marginBottom:5}}>
          <CircleDot size={10} color={K.warning}/>{d}</div>)}
      </Card>
    </div>
    <Card className="fu fu2" style={{padding:16,marginBottom:18,background:K.primaryLight,border:`1px solid ${K.primary}18`}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
        <Clock size={16} color={K.primary}/><span style={{fontWeight:700,fontSize:14}}>Délai estimatif de retour</span></div>
      <div style={{fontSize:13.5,color:K.gray700}}>Votre conseiller KOMA vous contactera sous <strong>24h ouvrées</strong> pour valider votre dossier et planifier les prochaines étapes.</div>
    </Card>
    <div className="fu fu3" style={{display:"flex",gap:12,justifyContent:"center"}}>
      <Btn icon={FolderOpen} onClick={()=>onNav("post_onboarding")}>Suivre mon dossier</Btn>
      <Btn v="outline" icon={Upload}>Ajouter mes documents</Btn>
      <Btn v="ghost" icon={ArrowLeft} onClick={()=>onNav("home_client")}>Revenir plus tard</Btn>
    </div>
  </div>;

  const render=()=>{switch(step){
    /* P-01 Qualification du projet */
    case 0:return <div className="fi">
      <h3 style={{fontSize:17,fontWeight:700,marginBottom:5}}>P-01 — Qualification du projet</h3>
      <p style={{color:K.gray500,fontSize:13,marginBottom:16}}>Quel est votre projet ? Où se situe-t-il ? Quelle est sa destination ?</p>
      <div style={{marginBottom:16}}>
        <label style={{fontSize:13,fontWeight:600,marginBottom:7,display:"block"}}>Type de projet</label>
        <RadioCards field="project_type" form={form} set={set} cols={1} options={[
          {id:"new_build",label:"Construction neuve",desc:"Maison, duplex, immeuble, villa",icon:Building2},
          {id:"renovation",label:"Travaux de rénovation",desc:"Réhabilitation, extension, mise aux normes",icon:Wrench},
          {id:"restart",label:"Reprise de chantier",desc:"Chantier arrêté, abandonné ou inachevé",icon:RefreshCw},
          {id:"study_only",label:"Réalisation d'études",desc:"Faisabilité, audit, diagnostic, expertise",icon:BookOpen},
          {id:"fitout",label:"Ameublement / agencement",desc:"Aménagement intérieur, mobilier, finitions",icon:Layers},
        ]}/></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
        <Input label="Pays du projet" placeholder="Cameroun" field="project_country" req form={form} set={set}/>
        <Input label="Ville / zone" placeholder="Douala, Yaoundé…" field="project_city" req form={form} set={set}/></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
        <Input label="Quartier / secteur" placeholder="Akwa, Bonapriso…" field="project_quartier" form={form} set={set}/>
        <div><label style={{fontSize:13,fontWeight:600,marginBottom:5,display:"block"}}>Destination du projet</label>
          <Chips field="destination" form={form} set={set} options={["Résidence principale","Résidence secondaire","Investissement locatif","Usage mixte","Usage commercial"]}/></div></div>
      <HelpBox icon={Lightbulb} title="Pourquoi ces informations ?" color={K.primary}>
        Le type de projet et la localisation déterminent les compétences, les étapes et les partenaires qui vous seront proposés.</HelpBox>
    </div>;
    /* P-02 Cadrage initial */
    case 1:return <div className="fi">
      <h3 style={{fontSize:17,fontWeight:700,marginBottom:5}}>P-02 — Cadrage initial</h3>
      <p style={{color:K.gray500,fontSize:13,marginBottom:16}}>Aidez-nous à comprendre votre objectif et votre horizon</p>
      <div style={{marginBottom:16}}><label style={{fontSize:13,fontWeight:600,marginBottom:7,display:"block"}}>Votre besoin principal aujourd'hui</label>
        <RadioCards field="project_goal" form={form} set={set} cols={1} options={[
          {id:"full",label:"Être accompagné de A à Z",desc:"Projet complet, de la conception à la livraison",icon:Compass},
          {id:"step",label:"Avancer sur une étape précise",desc:"Besoin ciblé : études, plans, devis…",icon:Target},
          {id:"verify",label:"Faire vérifier ce que j'ai déjà",desc:"Audit, contrôle, second avis",icon:Eye},
          {id:"quote",label:"Obtenir un devis",desc:"Chiffrage détaillé de mon projet",icon:DollarSign},
          {id:"find_pro",label:"Trouver des prestataires",desc:"Architecte, MOE, entreprise travaux",icon:Search},
          {id:"follow",label:"Suivre un chantier existant",desc:"Reporting, suivi, contrôle qualité",icon:Activity},
        ]}/></div>
      <div style={{marginBottom:16}}><label style={{fontSize:13,fontWeight:600,marginBottom:7,display:"block"}}>Type de bien / espace</label>
        <Chips field="asset_type" form={form} set={set} options={["Maison","Duplex","Villa","Immeuble","Local commercial","Appartement","Terrain nu","Autre"]}/></div>
      <div style={{marginBottom:16}}><label style={{fontSize:13,fontWeight:600,marginBottom:7,display:"block"}}>Budget indicatif (FCFA)</label>
        <Chips field="budget" form={form} set={set} options={["< 10M","10–25M","25–50M","50–100M","100–250M","> 250M","Je ne sais pas"]}/></div>
      <div><label style={{fontSize:13,fontWeight:600,marginBottom:7,display:"block"}}>Délai visé</label>
        <Chips field="timeline" form={form} set={set} options={["Dès que possible","1–3 mois","3–6 mois","6–12 mois","Plus de 12 mois"]}/></div>
    </div>;
    /* P-03 Maturité */
    case 2:return <div className="fi">
      <h3 style={{fontSize:17,fontWeight:700,marginBottom:5}}>P-03 — Maturité du projet</h3>
      <p style={{color:K.gray500,fontSize:13,marginBottom:16}}>Situez-vous pour que nous adaptions nos recommandations</p>
      {[{f:"has_land",l:"Avez-vous déjà un terrain ?",o:["Oui","Non","En cours d'acquisition"]},
        {f:"has_feasibility",l:"Avez-vous une étude de faisabilité ?",o:["Oui","Non","Je ne sais pas"]},
        {f:"has_plans",l:"Avez-vous déjà des plans ?",o:["Non","Esquisse","APS / APD","Plans détaillés"]},
        {f:"has_quote",l:"Avez-vous déjà un devis ?",o:["Non","Devis partiel","Devis global"]},
        {f:"has_financing",l:"Avez-vous un financement ?",o:["Non","En cours","Oui"]}
      ].map((q,i)=><div key={i} style={{marginBottom:14}}>
        <label style={{fontSize:13.5,fontWeight:600,marginBottom:6,display:"block"}}>{q.l}</label>
        <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>{q.o.map(o=>{const sel=form[q.f]===o;
          return <div key={o} onClick={()=>set(q.f,o)} style={{padding:"8px 16px",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:500,
            border:`1.5px solid ${sel?K.primary:K.gray200}`,background:sel?`${K.primary}0C`:K.white,color:sel?K.primary:K.gray700,transition:"all .12s"}}>{o}</div>;})}</div>
      </div>)}
      <Card style={{background:`${matColor()}06`,border:`1.5px solid ${matColor()}25`,padding:16,marginTop:8}}>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <Score value={matScore()} max={5} size={56} color={matColor()}/>
          <div style={{flex:1}}>
            <div style={{fontWeight:700,fontSize:15}}>Jauge d'avancement : {matLevel()}</div>
            <div style={{fontSize:12.5,color:K.gray500,marginTop:3}}>{matScore()}/5 critères validés — Calcul automatique selon vos réponses</div>
            <Progress v={matScore()*20} color={matColor()} h={5}/></div></div></Card>
    </div>;
    /* P-04 Intervenants */
    case 3:return <div className="fi">
      <h3 style={{fontSize:17,fontWeight:700,marginBottom:5}}>P-04 — Intervenants existants</h3>
      <p style={{color:K.gray500,fontSize:13,marginBottom:16}}>Travaillez-vous déjà avec des professionnels sur ce projet ?</p>
      <div style={{marginBottom:16}}><label style={{fontSize:13.5,fontWeight:600,marginBottom:7,display:"block"}}>Avec qui travaillez-vous déjà ?</label>
        <CheckList items={["Aucun intervenant pour le moment","Architecte / MOE","Entrepreneur / MOEX","Technicien / Artisan","Bureau d'études","Plusieurs intervenants"]}
          field="stakeholders" form={form} set={set}/></div>
      <div style={{marginBottom:16}}><label style={{fontSize:13.5,fontWeight:600,marginBottom:7,display:"block"}}>Quel est votre besoin le plus urgent ?</label>
        <RadioCards field="urgent_need" form={form} set={set} cols={2} options={[
          {id:"terrain",label:"Trouver un terrain"},{id:"feasibility",label:"Vérifier la faisabilité"},
          {id:"plans",label:"Réaliser les plans"},{id:"quote",label:"Obtenir un devis"},
          {id:"financing",label:"Trouver un financement"},{id:"launch",label:"Lancer le chantier"}]}/></div>
      <div style={{marginBottom:16}}><label style={{fontSize:13.5,fontWeight:600,marginBottom:7,display:"block"}}>
        Avez-vous des documents à faire vérifier ?</label>
        <Chips field="docs_to_verify" form={form} set={set} options={["Non","Oui, des plans","Oui, un devis","Oui, un contrat","Oui, plusieurs documents"]}/></div>
      <HelpBox icon={ShieldCheck} title="Le rôle de l'AMOA" color={K.accent}>
        Si vous avez déjà un MOE ou des documents, KOMA peut auditer, vérifier, réorienter et reprendre la main intelligemment via l'AMOA.</HelpBox>
    </div>;
    /* P-05 Coordonnées */
    case 4:return <div className="fi">
      <h3 style={{fontSize:17,fontWeight:700,marginBottom:5}}>P-05 — Vos coordonnées</h3>
      <p style={{color:K.gray500,fontSize:13,marginBottom:16}}>Pour que nous puissions vous recontacter et créer votre dossier</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        <Input label="Nom" placeholder="Ngameni" field="lastname" req form={form} set={set}/>
        <Input label="Prénom" placeholder="Rostand" field="firstname" req form={form} set={set}/>
        <Input label="Téléphone" placeholder="+33 6 12 34 56 78" field="phone" req type="tel" form={form} set={set}/>
        <Input label="E-mail" placeholder="nom@email.com" field="email" req type="email" form={form} set={set}/>
        <Input label="Pays de résidence" placeholder="France" field="country_res" req form={form} set={set}/>
        <Input label="Ville de résidence" placeholder="Paris" field="city_res" form={form} set={set}/></div>
      <div style={{marginBottom:14}}><label style={{fontSize:13,fontWeight:600,marginBottom:7,display:"block"}}>Canal de communication préféré</label>
        <Chips field="channel" form={form} set={set} options={["Téléphone","WhatsApp","E-mail","Visio","Plateforme KOMA"]}/></div>
      <div style={{marginBottom:14}}><label style={{fontSize:13,fontWeight:600,marginBottom:7,display:"block"}}>Souhaitez-vous un recontact rapide ?</label>
        <Chips field="recontact" form={form} set={set} options={["Oui, dès que possible","Oui, dans la semaine","Non, je prends mon temps"]}/></div>
      <div onClick={()=>set("consent",!form.consent)} style={{display:"flex",alignItems:"flex-start",gap:9,cursor:"pointer",padding:12,borderRadius:8,
        background:form.consent?K.successLight:K.gray50,border:`1px solid ${form.consent?K.success+"30":K.gray200}`,transition:"all .15s"}}>
        <div style={{width:18,height:18,borderRadius:4,border:`2px solid ${form.consent?K.success:K.gray300}`,background:form.consent?K.success:K.white,
          display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>
          {form.consent&&<CheckCircle2 size={11} color={K.white}/>}</div>
        <span style={{fontSize:12.5,color:K.gray700,lineHeight:1.5}}>J'accepte la création de mon dossier et le traitement de mes données par KOMA Expertise conformément à la politique de confidentialité.</span></div>
    </div>;
    /* P-06 Résumé intelligent */
    case 5:return <div className="fi">
      <h3 style={{fontSize:17,fontWeight:700,marginBottom:16}}>P-06 — Résumé intelligent</h3>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:16}}>
        <Card style={{background:K.primaryLight,border:`1px solid ${K.primary}18`,padding:16}}>
          <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:10}}><Building2 size={16} color={K.primary}/><span style={{fontWeight:700,fontSize:13.5}}>Votre projet</span></div>
          <div style={{fontSize:13,color:K.gray700,lineHeight:1.8}}>
            <div><strong>Type :</strong> {({new_build:"Construction neuve",renovation:"Rénovation",restart:"Reprise",study_only:"Études",fitout:"Agencement"})[form.project_type]||"—"}</div>
            <div><strong>Lieu :</strong> {form.project_city||"—"}, {form.project_country||"—"}</div>
            <div><strong>Quartier :</strong> {form.project_quartier||"—"}</div>
            <div><strong>Destination :</strong> {form.destination||"—"}</div>
            <div><strong>Bien :</strong> {form.asset_type||"—"}</div>
            <div><strong>Budget :</strong> {form.budget||"—"}</div>
            <div><strong>Délai :</strong> {form.timeline||"—"}</div></div></Card>
        <Card style={{background:`${matColor()}06`,border:`1px solid ${matColor()}18`,padding:16}}>
          <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:10}}><TrendingUp size={16} color={matColor()}/><span style={{fontWeight:700,fontSize:13.5}}>Votre niveau d'avancement</span></div>
          <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:12}}>
            <Score value={matScore()} max={5} size={56} color={matColor()}/>
            <div><div style={{fontWeight:700,fontSize:14}}>{matLevel()}</div>
              <div style={{fontSize:12,color:K.gray500}}>{matScore()}/5 critères</div></div></div>
          <div style={{fontSize:12.5,color:K.gray700,lineHeight:1.7}}>
            {["Terrain","Faisabilité","Plans","Devis","Financement"].map((l,i)=>{
              const fields=["has_land","has_feasibility","has_plans","has_quote","has_financing"];
              const v=form[fields[i]]; const ok=v==="Oui"||v==="Devis global"||v==="Plans détaillés"||v==="APS / APD"||v==="Devis partiel";
              return <div key={i} style={{display:"flex",alignItems:"center",gap:5}}>
                {ok?<CheckCircle2 size={12} color={K.success}/>:<CircleDot size={12} color={K.gray300}/>}
                <span>{l}: {v||"Non"}</span></div>})}</div></Card></div>
      <Card style={{background:`linear-gradient(135deg,${K.accent}06,${K.primary}06)`,border:`1.5px solid ${K.accent}18`,padding:16,marginBottom:14}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><Sparkles size={17} color={K.accent}/>
          <span style={{fontWeight:700,fontSize:14.5,color:K.accent}}>Prochaine étape recommandée</span></div>
        <div style={{padding:"12px 14px",borderRadius:8,background:K.white,display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:42,height:42,borderRadius:10,background:K.accentLight,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <Target size={20} color={K.accent}/></div>
          <div style={{flex:1}}><div style={{fontWeight:700,fontSize:14}}>{nextStep().t}</div>
            <div style={{fontSize:12.5,color:K.gray500}}>{nextStep().d}</div></div>
          <Badge color={K.success} pill>Recommandé</Badge></div></Card>
      <Card style={{padding:14,marginBottom:14,border:`1px solid ${K.warning}22`,background:K.warningLight}}>
        <Sec icon={FileText} title="Documents utiles à préparer" style={{marginBottom:8}}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
          {docsToPrep().map((d,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:5,fontSize:12.5,color:K.gray700}}>
            <CircleDot size={10} color={K.warning}/>{d}</div>)}</div></Card>
      <div style={{padding:18,borderRadius:K.r,background:`linear-gradient(135deg,${K.successLight},${K.primaryLight})`,
        border:`2px solid ${K.success}25`,textAlign:"center"}}>
        <CheckCircle size={24} color={K.success}/>
        <div style={{fontWeight:800,fontSize:16,marginTop:8,marginBottom:4}}>Fin du formulaire prospect</div>
        <div style={{fontSize:13,color:K.gray700,marginBottom:14}}>Créez votre dossier pour être recontacté par un conseiller KOMA sous 24h.</div>
        <div style={{display:"flex",gap:10,justifyContent:"center"}}>
          <Btn v="hero" icon={ArrowRight} onClick={()=>setDone(true)}>Créer mon dossier et continuer</Btn>
          <Btn v="outline" icon={Clock} onClick={()=>onNav("home_client")}>Je compléterai plus tard</Btn></div></div>
    </div>;
    default:return null;}};

  return <div>
    <HeroBanner icon={User} title="Parcours Client / Prospect" color={K.primary}
      sub="Qualifiez votre projet immobilier en quelques étapes simples et guidées" time="~3 min"/>
    <Journey steps={steps} current={step} setCurrent={setStep} color={K.primary} renderStep={render} onFinish={()=>setDone(true)}/>
  </div>;
};

/* ═══════════════════════════════════════════════════════
   POST-ONBOARDING CLIENT
   ═══════════════════════════════════════════════════════ */
const SPostOnboarding=({onNav})=>{
  const [drawer,setDrawer]=useState(null);
  return <div>
    <HeroBanner icon={FolderOpen} title="Mon dossier — Espace Client" sub="Suivez l'avancement de votre dossier et vos prochaines étapes" badge="PRS-0412"/>
    <div className="fu fu1" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:18}}>
      {[{l:"Statut",v:"En revue",c:K.info,i:Eye},{l:"Avancement",v:"72%",c:K.primary,i:TrendingUp},
        {l:"Prochaine étape",v:"Faisabilité",c:K.accent,i:Target},{l:"Délai retour",v:"< 24h",c:K.success,i:Clock}].map((k,i)=>{
        const I=k.i;return <Card key={i} onClick={()=>setDrawer("detail")} style={{textAlign:"center",padding:14}}>
          <I size={18} color={k.c} style={{marginBottom:5}}/><div style={{fontSize:18,fontWeight:800}}>{k.v}</div>
          <div style={{fontSize:11,color:K.gray500,marginTop:3}}>{k.l}</div></Card>;})}
    </div>
    <div className="fu fu2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:18}}>
      <Card style={{padding:16}}>
        <Sec icon={FileText} title="Documents déposés"/>
        {[{n:"Pièce d'identité",s:"ok"},{n:"Photos terrain",s:"received"},{n:"Plans existants",s:"missing"},{n:"Budget indicatif",s:"missing"}].map((d,i)=>{
          const m={ok:{c:K.success,l:"Validé"},received:{c:K.warning,l:"Reçu"},missing:{c:K.danger,l:"Manquant"}};const s=m[d.s];
          return <div key={i} onClick={()=>setDrawer("doc_"+i)} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 0",borderBottom:`1px solid ${K.gray50}`,cursor:"pointer",fontSize:13}}>
            <span style={{width:7,height:7,borderRadius:"50%",background:s.c}}/><span style={{flex:1}}>{d.n}</span>
            <Badge color={s.c} sm>{s.l}</Badge></div>;})}
        <Btn v="outline" sz="sm" icon={Upload} style={{marginTop:10}}>Ajouter un document</Btn>
      </Card>
      <Card style={{padding:16}}>
        <Sec icon={Activity} title="Historique"/>
        {[{a:"Dossier créé",d:"14/04 · 10:23"},{a:"Documents reçus (2)",d:"14/04 · 10:25"},
          {a:"SPOC assigné : N. Mbarga",d:"14/04 · 14:00"},{a:"Analyse en cours",d:"15/04 · 09:30"}].map((h,i)=>
          <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 0",borderBottom:`1px solid ${K.gray50}`,fontSize:13}}>
            <CheckCircle2 size={12} color={K.success}/><span style={{flex:1}}>{h.a}</span>
            <span style={{fontSize:11,color:K.gray400}}>{h.d}</span></div>)}
      </Card>
    </div>
    <div className="fu fu3" style={{display:"flex",gap:10,justifyContent:"center"}}>
      <Btn icon={MessageSquare}>Contacter mon SPOC</Btn>
      <Btn v="outline" icon={Upload}>Ajouter des documents</Btn>
      <Btn v="ghost" icon={ArrowLeft} onClick={()=>onNav("home_client")}>Revenir à l'accueil</Btn>
    </div>
    <Drawer open={!!drawer} onClose={()=>setDrawer(null)} title={drawer?.startsWith("doc")?"Détail document":"Détail dossier"}>
      <div style={{fontSize:14,color:K.gray700,lineHeight:1.7}}>
        <div style={{fontWeight:700,fontSize:16,marginBottom:12}}>Informations</div>
        <div style={{marginBottom:8}}>Statut : <Badge color={K.info}>En revue</Badge></div>
        <div style={{marginBottom:8}}>Créé le : 14/04/2026</div>
        <div style={{marginBottom:8}}>SPOC assigné : Nadège Mbarga</div>
        <div style={{marginBottom:8}}>Type de projet : Construction neuve</div>
        <div style={{marginBottom:8}}>Lieu : Douala, Cameroun</div>
        <div style={{marginBottom:14}}>Budget : 25–50M FCFA</div>
        <Btn v="outline" icon={Mail} full>Envoyer un message</Btn>
      </div>
    </Drawer>
  </div>;
};

/* ═══════════════════════════════════════════════════════
   AMOA JOURNEY (7 steps + end message)
   ═══════════════════════════════════════════════════════ */
const SAMOA=({onNav})=>{
  const [step,setStep]=useState(0),[form,setForm]=useState({}),[done,setDone]=useState(false);
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const steps=["Structure","Positionnement","Références","Conformité","Équipe","Modalités","Résumé"];
  const p=MOCK.amoa;

  if(done) return <EndMessage type="pro" role="AMOA" name={p.name} level={2} onNav={onNav}/>;

  const render=()=>{switch(step){
    case 0:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:5}}>Structure</h3>
      <p style={{color:K.gray500,fontSize:13,marginBottom:16}}>Êtes-vous une entreprise ou un indépendant ?</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
        {[{id:"entreprise",l:"Entreprise",d:"Cabinet, société, BET",i:Building2},
          {id:"independant",l:"Indépendant",d:"Expert, consultant individuel",i:User}].map(o=>{const sel=form.structure===o.id;
          return <Card key={o.id} onClick={()=>set("structure",o.id)} style={{textAlign:"center",padding:22,
            border:`2px solid ${sel?K.accent:K.gray200}`,background:sel?K.accentLight:K.white}}>
            <o.i size={28} color={sel?K.accent:K.gray400}/><div style={{fontWeight:700,fontSize:15,marginTop:8}}>{o.l}</div>
            <div style={{fontSize:12.5,color:K.gray500,marginTop:3}}>{o.d}</div></Card>;})}
      </div>
      <Input label="Raison sociale / Nom" placeholder="Cabinet Tekton SARL" field="name" req form={form} set={set}/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        <Input label="Zone d'intervention" placeholder="Douala, Yaoundé…" field="zone" form={form} set={set}/>
        <Input label="Années d'expérience" placeholder="8" field="exp" form={form} set={set}/></div>
    </div>;
    case 1:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:16}}>Positionnement métier</h3>
      <div style={{marginBottom:16}}><label style={{fontSize:13,fontWeight:600,marginBottom:8,display:"block"}}>Missions couvertes</label>
        <CheckList items={["Audit technique","Contrôle qualité","Validation livrables","Suivi conformité","Assistance décision","Pilotage projet","Coordination acteurs"]}
          field="missions" form={form} set={set} color={K.accent}/></div>
      <div style={{marginBottom:16}}><label style={{fontSize:13,fontWeight:600,marginBottom:8,display:"block"}}>Phases couvertes</label>
        <Chips field="phases" form={form} set={set} multi color={K.accent}
          options={["Pré-faisabilité","Conception","Devis","Exécution","Clôture"]}/></div>
    </div>;
    case 2:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:16}}>Références et expérience</h3>
      {[{n:"Villa Akwa — Douala",y:2024,b:"85M FCFA",r:"AMOA complète"},
        {n:"Immeuble R+4 — Yaoundé",y:2023,b:"320M FCFA",r:"Contrôle qualité"},
        {n:"Résidence Bali — Douala",y:2022,b:"150M FCFA",r:"Suivi conformité"}].map((ref,i)=>
        <Card key={i} onClick={()=>{}} style={{marginBottom:8,padding:12,cursor:"pointer"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><div style={{fontWeight:600,fontSize:13.5}}>{ref.n}</div>
              <div style={{fontSize:12,color:K.gray500,marginTop:2}}>{ref.r} · {ref.y} · {ref.b}</div></div>
            <Badge color={K.success} sm pill><Star size={10}/>Vérifié</Badge></div></Card>)}
      <Btn v="outline" sz="sm" icon={UserPlus}>Ajouter une référence</Btn>
    </div>;
    case 3:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:5}}>Conformité documentaire</h3>
      <p style={{color:K.gray500,fontSize:13,marginBottom:14}}>Déposez les pièces requises</p>
      {p.docs.map((doc,i)=>{const m={ok:{c:K.success,l:"Validée"},review:{c:K.info,l:"En revue"},received:{c:K.warning,l:"Reçue"},missing:{c:K.danger,l:"Manquante"}};
        const s=m[doc.s];return <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:7,marginBottom:4,
          border:`1px solid ${doc.s==="missing"?K.danger+"20":K.gray100}`,background:doc.s==="missing"?K.dangerLight:"transparent",cursor:"pointer"}}
          onClick={()=>{}}>
          <FileText size={16} color={s.c}/><span style={{flex:1,fontSize:13.5,fontWeight:500}}>{doc.n}</span>
          <Badge color={s.c} sm>{s.l}</Badge>
          {doc.s==="missing"&&<Btn v="outline" sz="sm" icon={Upload}>Déposer</Btn>}</div>;})}
      <div style={{marginTop:14,padding:18,borderRadius:K.rSm,border:`2px dashed ${K.gray300}`,textAlign:"center",color:K.gray500,cursor:"pointer"}}>
        <Upload size={22} style={{marginBottom:6}}/><br/><span style={{fontWeight:500}}>Glissez vos fichiers ici</span>
        <br/><span style={{fontSize:12}}>PDF, JPG, PNG — 10 Mo max</span></div>
    </div>;
    case 4:return <TeamStep team={p.team} color={K.accent}/>;
    case 5:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:16}}>Modalités opérationnelles</h3>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {[{l:"Délai moyen de réponse",v:"24–48h"},{l:"Fréquence reporting",v:"Hebdomadaire"},
          {l:"Capacité terrain",v:"3 chantiers"},{l:"Compatibilité KOMA",v:"Templates validés"}].map((it,i)=>
          <Card key={i} onClick={()=>{}} style={{padding:12,cursor:"pointer"}}><div style={{fontSize:12,color:K.gray500,marginBottom:3}}>{it.l}</div>
            <div style={{fontSize:14.5,fontWeight:600}}>{it.v}</div></Card>)}</div>
    </div>;
    case 6:return <ProSummary role="AMOA" color={K.accent} icon={ShieldCheck} data={p} onFinish={()=>setDone(true)}/>;
    default:return null;}};

  return <div>
    <HeroBanner icon={ShieldCheck} title="Parcours AMOA" color={K.accent}
      sub="Qualification partenaire — Assistance à Maîtrise d'Ouvrage" time="~5 min" badge="Entreprise"/>
    <Journey steps={steps} current={step} setCurrent={setStep} color={K.accent} renderStep={render} onFinish={()=>setDone(true)}/>
  </div>;
};

/* Shared Pro Summary */
const ProSummary = ({role,color,icon:I,data,onFinish})=>(
  <div className="fi">
    <h3 style={{fontSize:17,fontWeight:700,marginBottom:16}}>Résumé de qualification {role}</h3>
    <Card style={{padding:18,background:`linear-gradient(135deg,${color}06,${K.primary}04)`,border:`1.5px solid ${color}18`,marginBottom:14}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
        <div style={{width:48,height:48,borderRadius:12,background:`${color}12`,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <I size={24} color={color}/></div>
        <div style={{flex:1}}><div style={{fontWeight:700,fontSize:17}}>{data.name}</div>
          <div style={{fontSize:13,color:K.gray500}}>{data.type} — {data.zone||data.cap||""}</div></div>
        <LevelBadge level={3}/></div>
      <div style={{display:"grid",gridTemplateColumns:`repeat(${Object.keys(data.scores).length},1fr)`,gap:10}}>
        {Object.entries(data.scores).map(([k,v])=>
          <Score key={k} value={v} label={k.charAt(0).toUpperCase()+k.slice(1)} size={58}
            color={k==="global"?K.primary:color}/>)}</div></Card>
    <HelpBox icon={Sparkles} title="Recommandation système" color={color}>
      {role} qualifié — Profil solide. Activation possible après validation des pièces restantes.</HelpBox>
    <div style={{display:"flex",gap:10,justifyContent:"center",marginTop:16}}>
      <Btn style={{background:color,color:K.white}} icon={CheckCircle} onClick={onFinish}>Soumettre mon dossier</Btn>
      <Btn v="outline">Demander compléments</Btn></div>
  </div>
);

/* Shared Team Step */
const TeamStep = ({team,color=K.primary})=>{
  const [detail,setDetail]=useState(null);
  return <div className="fi">
    <h3 style={{fontSize:17,fontWeight:700,marginBottom:5}}>Équipe</h3>
    <p style={{color:K.gray500,fontSize:13,marginBottom:14}}>Enregistrez vos collaborateurs clés</p>
    {team.map((m,i)=><Card key={i} onClick={()=>setDetail(m)} style={{marginBottom:8,padding:12,display:"flex",alignItems:"center",gap:12,cursor:"pointer"}}>
      <div style={{width:36,height:36,borderRadius:"50%",background:`${color}12`,display:"flex",alignItems:"center",justifyContent:"center",
        fontWeight:700,fontSize:13,color}}>{m.n.split(" ").map(w=>w[0]).join("")}</div>
      <div style={{flex:1}}><div style={{fontWeight:600,fontSize:13.5}}>{m.n}</div>
        <div style={{fontSize:12,color:K.gray500}}>{m.r} · {m.sp} · {m.anc}</div></div>
      <StatusDot status={m.s==="actif"?"active":"invite"}/><ChevronRight size={14} color={K.gray300}/></Card>)}
    <Btn v="outline" sz="sm" icon={UserPlus} style={{marginTop:6}}>Ajouter un collaborateur</Btn>
    <Drawer open={!!detail} onClose={()=>setDetail(null)} title={detail?.n||"Collaborateur"} width={380}>
      {detail&&<div>
        <div style={{textAlign:"center",marginBottom:18}}>
          <div style={{width:56,height:56,borderRadius:"50%",background:`${color}12`,display:"inline-flex",alignItems:"center",justifyContent:"center",
            fontWeight:800,fontSize:18,color,marginBottom:8}}>{detail.n.split(" ").map(w=>w[0]).join("")}</div>
          <div style={{fontWeight:700,fontSize:16}}>{detail.n}</div>
          <div style={{fontSize:13,color:K.gray500}}>{detail.r}</div></div>
        {[{l:"Spécialité",v:detail.sp},{l:"Ancienneté",v:detail.anc},{l:"Statut",v:detail.s==="actif"?"Actif":"Invité"},
          {l:"Rattachement",v:"Société principale"},{l:"Disponibilité",v:"Disponible"}].map((it,i)=>
          <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${K.gray50}`,fontSize:13}}>
            <span style={{color:K.gray500}}>{it.l}</span><span style={{fontWeight:500}}>{it.v}</span></div>)}
        <div style={{marginTop:14}}><Btn v="outline" sz="sm" icon={FileText} full>Documents individuels</Btn></div>
      </div>}
    </Drawer>
  </div>;
};

/* END MESSAGE for all profiles */
const EndMessage = ({type,role,name,level=1,onNav})=>(
  <div style={{maxWidth:650,margin:"0 auto"}}>
    <div className="fu" style={{textAlign:"center",padding:"32px 24px",borderRadius:K.rXl,
      background:`linear-gradient(160deg,${type==="internal"?K.secondaryLight:K.accentLight},${K.primaryLight})`,
      border:`2px solid ${K.success}22`,marginBottom:20}}>
      <div style={{width:60,height:60,borderRadius:"50%",background:`${K.success}15`,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:14}}>
        <CheckCircle size={32} color={K.success}/></div>
      <h1 style={{fontSize:22,fontWeight:900,marginBottom:8}}>
        {type==="pro"?"Dossier soumis avec succès":type==="internal"?"Habilitation activée":"Projet enregistré"}</h1>
      <p style={{fontSize:14,color:K.gray700,maxWidth:420,margin:"0 auto 12px",lineHeight:1.6}}>
        {type==="pro"?`Votre dossier ${role} (${name}) est en cours de revue par l'équipe KOMA.`
         :type==="internal"?`Bienvenue ${name}. Vos modules sont ouverts et votre périmètre est configuré.`
         :"Un conseiller KOMA analysera votre dossier sous 24h."}</p>
      <LevelBadge level={level}/>
    </div>
    {type==="pro"&&<div className="fu fu1" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:18}}>
      <Card style={{padding:14}}>
        <Sec icon={Eye} title="Statut de revue" style={{marginBottom:8}}/>
        <StatusDot status="en_revue"/>
        <div style={{fontSize:12.5,color:K.gray500,marginTop:6}}>Votre dossier est en cours d'examen. Délai moyen : 48h ouvrées.</div></Card>
      <Card style={{padding:14}}>
        <Sec icon={FileText} title="Pièces à compléter" style={{marginBottom:8}}/>
        <div style={{fontSize:13,color:K.gray700}}>1 pièce manquante (CV équipe)</div>
        <Btn v="outline" sz="sm" icon={Upload} style={{marginTop:8}}>Compléter mon dossier</Btn></Card>
    </div>}
    {type==="internal"&&<div className="fu fu1" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:18}}>
      {[{l:"Modules ouverts",v:"15"},{l:"Périmètre",v:"Afrique Centrale"},{l:"Niveau",v:"Senior"}].map((k,i)=>
        <Card key={i} style={{textAlign:"center",padding:14}}>
          <div style={{fontSize:22,fontWeight:800,color:K.secondary}}>{k.v}</div>
          <div style={{fontSize:12,color:K.gray500,marginTop:3}}>{k.l}</div></Card>)}</div>}
    <div className="fu fu2" style={{display:"flex",gap:12,justifyContent:"center"}}>
      {type==="pro"&&<><Btn icon={LayoutDashboard} onClick={()=>onNav("dashboard")}>Accéder à mon espace</Btn>
        <Btn v="outline" icon={Upload} onClick={()=>onNav("documents")}>Compléter mon dossier</Btn></>}
      {type==="internal"&&<Btn icon={LayoutDashboard} onClick={()=>onNav("dashboard")}>Aller au cockpit</Btn>}
      <Btn v="ghost" icon={ArrowLeft} onClick={()=>onNav("home_client")}>Retour accueil</Btn>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════
   MOE JOURNEY
   ═══════════════════════════════════════════════════════ */
const SMOE=({onNav})=>{
  const [step,setStep]=useState(0),[form,setForm]=useState({}),[done,setDone]=useState(false);
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const steps=["Structure","Spécialités","Phases","Livrables","Qualité","Conformité","Équipe","Workflow","Résumé"];
  const p=MOCK.moe;
  if(done) return <EndMessage type="pro" role="MOE" name={p.name} level={3} onNav={onNav}/>;
  const render=()=>{switch(step){
    case 0:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:5}}>Type de structure</h3>
      <p style={{color:K.gray500,fontSize:13,marginBottom:16}}>Cabinet, BET, architecte indépendant ou ingénieur conseil ?</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
        {[{id:"cabinet",l:"Cabinet / BET",d:"Structure avec équipe",i:Building2},
          {id:"independant",l:"Indépendant",d:"Architecte ou ingénieur solo",i:User}].map(o=>{const sel=form.structure===o.id;
          return <Card key={o.id} onClick={()=>set("structure",o.id)} style={{textAlign:"center",padding:22,
            border:`2px solid ${sel?K.moe:K.gray200}`,background:sel?K.moeLight:K.white}}>
            <o.i size={28} color={sel?K.moe:K.gray400}/><div style={{fontWeight:700,fontSize:15,marginTop:8}}>{o.l}</div>
            <div style={{fontSize:12.5,color:K.gray500,marginTop:3}}>{o.d}</div></Card>;})}
      </div>
      <Input label="Raison sociale / Nom" placeholder="Ex. Cabinet Archi+" field="name" req form={form} set={set}/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        <Input label="Zone d'intervention" placeholder="Douala, Yaoundé" field="zone" form={form} set={set}/>
        <Input label="Années d'expérience" placeholder="12" field="exp" form={form} set={set}/></div>
    </div>;
    case 1:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:5}}>Spécialités techniques</h3>
      <CheckList items={["Architecture","Structure / Génie civil","Fluides / CVC","Électricité","Économie construction","VRD","Coordination OPC","Paysagisme"]}
        field="specialties" form={form} set={set} color={K.moe}/>
      <div style={{marginTop:14}}><label style={{fontSize:13,fontWeight:600,marginBottom:7,display:"block"}}>Typologies de projets</label>
        <Chips field="project_types" form={form} set={set} options={["Résidentiel","Tertiaire","Industriel","Infrastructure","Mixte"]}/></div>
    </div>;
    case 2:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:5}}>Phases maîtrisées</h3>
      <div style={{display:"flex",gap:8,marginBottom:16}}>
        {Object.entries(p.phases).map(([ph,ok])=><div key={ph} onClick={()=>set(`phase_${ph}`,!form[`phase_${ph}`])}
          style={{flex:1,textAlign:"center",padding:"12px 8px",borderRadius:8,cursor:"pointer",
          border:`2px solid ${ok?K.success:K.gray200}`,background:ok?K.successLight:K.white}}>
          <div style={{fontWeight:700,fontSize:15,color:ok?K.success:K.gray400}}>{ph}</div>
          <div style={{fontSize:11,color:K.gray500,marginTop:3}}>{ok?"Maîtrisé":"Non couvert"}</div>
          {ok&&<CheckCircle2 size={14} color={K.success} style={{marginTop:4}}/>}</div>)}</div>
    </div>;
    case 3:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:5}}>Livrables et portfolio</h3>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}>
        {p.livrables.map((l,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:7,padding:"9px 12px",borderRadius:7,
          background:K.moeLight,border:`1px solid ${K.moe}15`,fontSize:13,fontWeight:500,cursor:"pointer"}}>
          <CheckCircle2 size={13} color={K.moe}/>{l}</div>)}</div>
      {p.refs.map((ref,i)=><Card key={i} onClick={()=>{}} style={{marginBottom:8,padding:12,cursor:"pointer"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div><div style={{fontWeight:600,fontSize:13.5}}>{ref.n}</div>
            <div style={{fontSize:12,color:K.gray500,marginTop:2}}>{ref.r} · {ref.y} · {ref.b} FCFA</div></div>
          <Badge color={K.success} sm pill><Star size={10}/>Vérifié</Badge></div></Card>)}
    </div>;
    case 4:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:5}}>Qualité et méthode</h3>
      <CheckList items={["Revue interne systématique","Versioning documentaire","Gestion des itérations","Checklists qualité","Compatibilité templates KOMA","Coordination BIM / CAO"]}
        field="quality" form={form} set={set} color={K.moe}/>
    </div>;
    case 5:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:5}}>Conformité documentaire</h3>
      {[{n:"Inscription Ordre des Architectes",s:"ok"},{n:"Attestation RC Pro",s:"review"},{n:"Assurance décennale",s:"missing"},
        {n:"NIU / Carte contribuable",s:"ok"},{n:"Portfolio / Book",s:"received"}].map((doc,i)=>{
        const m={ok:{c:K.success,l:"Validée"},review:{c:K.info,l:"En revue"},received:{c:K.warning,l:"Reçue"},missing:{c:K.danger,l:"Manquante"}};
        const s=m[doc.s];return <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 11px",borderRadius:7,marginBottom:4,
          border:`1px solid ${doc.s==="missing"?K.danger+"20":K.gray100}`,background:doc.s==="missing"?K.dangerLight:"transparent",cursor:"pointer"}} onClick={()=>{}}>
          <FileText size={15} color={s.c}/><span style={{flex:1,fontSize:13,fontWeight:500}}>{doc.n}</span>
          <Badge color={s.c} sm>{s.l}</Badge>{doc.s==="missing"&&<Btn v="outline" sz="sm" icon={Upload}>Déposer</Btn>}</div>;})}
    </div>;
    case 6:return <TeamStep team={p.team} color={K.moe}/>;
    case 7:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:16}}>Workflow et modalités</h3>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {[{l:"Délai livraison APS",v:"2–3 semaines"},{l:"Délai livraison APD",v:"4–6 semaines"},
          {l:"Outils CAO",v:"AutoCAD, Revit"},{l:"Format de livraison",v:"PDF, DWG, IFC"},
          {l:"Méthode de coordination",v:"BIM niveau 2"},{l:"Gestion versions",v:"Nomenclature KOMA"}].map((it,i)=>
          <Card key={i} onClick={()=>{}} style={{padding:11,cursor:"pointer"}}><div style={{fontSize:12,color:K.gray500,marginBottom:2}}>{it.l}</div>
            <div style={{fontSize:14,fontWeight:600}}>{it.v}</div></Card>)}</div>
    </div>;
    case 8:return <ProSummary role="MOE" color={K.moe} icon={Ruler} data={p} onFinish={()=>setDone(true)}/>;
    default:return null;}};
  return <div>
    <HeroBanner icon={Ruler} title="Parcours MOE" color={K.moe}
      sub="Qualification Maîtrise d'Œuvre — Conception technique, architecture, ingénierie" time="~5 min" badge={p.type}/>
    <Journey steps={steps} current={step} setCurrent={setStep} color={K.moe} renderStep={render} onFinish={()=>setDone(true)}
      sideInfo={<HelpBox icon={Ruler} color={K.moe}>Le parcours MOE qualifie votre rigueur technique, vos livrables et votre méthode de conception.</HelpBox>}/>
  </div>;
};

/* ═══════════════════════════════════════════════════════
   MOEX JOURNEY
   ═══════════════════════════════════════════════════════ */
const SMOEX=({onNav})=>{
  const [step,setStep]=useState(0),[form,setForm]=useState({}),[done,setDone]=useState(false);
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const steps=["Structure","Capacités","Chantier","Reporting","HSE","Équipe","Outils","Pilotage","Résumé"];
  const p=MOCK.moex;
  if(done) return <EndMessage type="pro" role="MOEX" name={p.name} level={2} onNav={onNav}/>;
  const render=()=>{switch(step){
    case 0:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:5}}>Type de structure</h3>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:16}}>
        {[{id:"entreprise",l:"Entreprise travaux",d:"Société avec équipes",i:Building2},
          {id:"conducteur",l:"Conducteur indépendant",d:"Pilotage solo",i:User},
          {id:"pilotage",l:"Société de pilotage",d:"Coordination multi-lots",i:Users}].map(o=>{const sel=form.structure===o.id;
          return <Card key={o.id} onClick={()=>set("structure",o.id)} style={{textAlign:"center",padding:18,
            border:`2px solid ${sel?K.moex:K.gray200}`,background:sel?K.moexLight:K.white}}>
            <o.i size={26} color={sel?K.moex:K.gray400}/><div style={{fontWeight:700,fontSize:14,marginTop:7}}>{o.l}</div>
            <div style={{fontSize:12,color:K.gray500,marginTop:3}}>{o.d}</div></Card>;})}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        <Input label="Raison sociale / Nom" placeholder="BTP Construct" field="name" req form={form} set={set}/>
        <Input label="Zone d'intervention" placeholder="Douala, Yaoundé" field="zone" form={form} set={set}/></div>
      <Input label="Taille de la structure" placeholder="Ex. 15 personnes" field="size" form={form} set={set}/>
    </div>;
    case 1:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:5}}>Capacités opérationnelles</h3>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
        <Input label="Chantiers simultanés" placeholder="5" field="simultaneous" form={form} set={set}/>
        <Input label="Expérience (années)" placeholder="10" field="exp" form={form} set={set}/></div>
      <CheckList items={p.capacities} field="caps" form={form} set={set} color={K.moex}/>
    </div>;
    case 2:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:5}}>Expérience chantier</h3>
      <div style={{marginBottom:14}}><label style={{fontSize:13,fontWeight:600,marginBottom:7,display:"block"}}>Types de projets réalisés</label>
        <Chips field="project_types" form={form} set={set} options={["Résidentiel","Immeuble","Commercial","Industriel","Infrastructure"]}/></div>
      {p.refs.map((ref,i)=><Card key={i} onClick={()=>{}} style={{marginBottom:8,padding:12,cursor:"pointer"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div><div style={{fontWeight:600,fontSize:13.5}}>{ref.n}</div>
            <div style={{fontSize:12,color:K.gray500,marginTop:2}}>{ref.y} · {ref.b} FCFA</div></div>
          <Badge color={K.success} sm pill><Star size={10}/>Vérifié</Badge></div></Card>)}
      <Btn v="outline" sz="sm" icon={UserPlus}>Ajouter une référence chantier</Btn>
    </div>;
    case 3:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:5}}>Reporting et preuves</h3>
      <CheckList items={["Rapport journalier systématique","Photos horodatées","Vidéos de progression","Remontée besoins en temps réel",
        "Suivi quantitatif (tâches/stock)","Utilisation smartphone/tablette","Gestion alertes bloquantes"]}
        field="reporting" form={form} set={set} color={K.moex}/>
    </div>;
    case 4:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:5}}>Hygiène, Sécurité, Environnement</h3>
      <CheckList items={["Formation HSE équipe","EPI systématiques","Signalisation chantier","Gestion déchets","Plan de prévention",
        "Registre incidents","Audit sécurité périodique"]}
        field="hse" form={form} set={set} color={K.moex}/>
    </div>;
    case 5:return <TeamStep team={p.team} color={K.moex}/>;
    case 6:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:5}}>Outils et équipement numérique</h3>
      <CheckList items={["Smartphone terrain","Tablette chantier","Application de suivi","GPS / géolocalisation","Drone (optionnel)","Connexion internet fiable"]}
        field="tools" form={form} set={set} color={K.moex}/>
    </div>;
    case 7:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:16}}>Pilotage chantier</h3>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {[{l:"Méthode de pilotage",v:"Réunion hebdo + journal quotidien"},{l:"Fréquence reporting",v:"Quotidien"},
          {l:"Disponibilité site",v:"6j/7"},{l:"Coordination AMOA",v:"Point hebdo + alertes"},
          {l:"Gestion sous-traitants",v:"Suivi intégré"},{l:"Réactivité alerte",v:"< 2h"}].map((it,i)=>
          <Card key={i} onClick={()=>{}} style={{padding:11,cursor:"pointer"}}><div style={{fontSize:12,color:K.gray500,marginBottom:2}}>{it.l}</div>
            <div style={{fontSize:14,fontWeight:600}}>{it.v}</div></Card>)}</div>
    </div>;
    case 8:return <ProSummary role="MOEX" color={K.moex} icon={HardHat} data={p} onFinish={()=>setDone(true)}/>;
    default:return null;}};
  return <div>
    <HeroBanner icon={HardHat} title="Parcours MOEX" color={K.moex}
      sub="Qualification Maîtrise d'Œuvre d'Exécution — Terrain, chantier, pilotage" time="~5 min" badge={p.type}/>
    <Journey steps={steps} current={step} setCurrent={setStep} color={K.moex} renderStep={render} onFinish={()=>setDone(true)}
      sideInfo={<HelpBox icon={HardHat} color={K.moex}>Le parcours MOEX évalue votre discipline terrain, vos capacités de reporting et votre fiabilité.</HelpBox>}/>
  </div>;
};

/* ═══════════════════════════════════════════════════════
   SPOC JOURNEY (internal)
   ═══════════════════════════════════════════════════════ */
const SSPOC=({onNav})=>{
  const [step,setStep]=useState(0),[form,setForm]=useState({}),[done,setDone]=useState(false);
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const steps=["Profil","Portefeuille","Modules","Arbitrage","Relation client","Coordination","Finance","Test","Habilitation"];
  const p=MOCK.spoc;
  if(done) return <EndMessage type="internal" role="SPOC" name={p.name} level={4} onNav={onNav}/>;
  const render=()=>{switch(step){
    case 0:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:16}}>Profil collaborateur</h3>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        <Input label="Nom complet" placeholder="Nadège Mbarga" field="name" req form={form} set={set}/>
        <Input label="Seniorité" placeholder="Senior" field="seniority" form={form} set={set}/>
        <Input label="Zone / Portefeuille" placeholder="Afrique Centrale" field="zone" form={form} set={set}/>
        <Input label="Type de clients gérés" placeholder="Diaspora, locaux" field="clients" form={form} set={set}/></div></div>;
    case 1:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:16}}>Portefeuille autorisé</h3>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
        {[{l:"Projets actifs",v:"12"},{l:"Clients suivis",v:"8"},{l:"Budget total",v:"1.2 Md FCFA"}].map((it,i)=>
          <Card key={i} onClick={()=>{}} style={{textAlign:"center",padding:16,cursor:"pointer"}}>
            <div style={{fontSize:24,fontWeight:800,color:K.secondary}}>{it.v}</div>
            <div style={{fontSize:12,color:K.gray500,marginTop:4}}>{it.l}</div></Card>)}</div></div>;
    case 2:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:5}}>Modules à maîtriser</h3>
      <p style={{color:K.gray500,fontSize:13,marginBottom:14}}>Évaluez votre maîtrise de chaque module KOMA</p>
      <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
        {p.modules.map(m=><div key={m} onClick={()=>{}} style={{padding:"6px 12px",borderRadius:6,background:`${K.secondary}0C`,
          fontSize:12,fontWeight:500,color:K.secondary,display:"flex",alignItems:"center",gap:4,cursor:"pointer"}}>
          <CheckCircle2 size={11}/>{m}</div>)}</div></div>;
    case 3:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:16}}>Règles d'arbitrage</h3>
      {["Priorisation des alertes critiques","Gestion des conflits entre acteurs","Escalade vers la direction",
        "Arbitrage budgétaire","Décision Go/No Go terrain"].map(r=>
        <div key={r} style={{display:"flex",alignItems:"center",gap:8,padding:"9px 0",borderBottom:`1px solid ${K.gray50}`,fontSize:13,cursor:"pointer"}}
          onClick={()=>{}}>
          <CheckCircle2 size={14} color={K.success}/>{r}</div>)}</div>;
    case 4:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:16}}>Relation client premium</h3>
      {["Communication proactive","Reporting client hebdo","Gestion des attentes","Résolution de réclamations",
        "Transparence budgétaire","Empathie et écoute active"].map(r=>
        <div key={r} style={{display:"flex",alignItems:"center",gap:8,padding:"9px 0",borderBottom:`1px solid ${K.gray50}`,fontSize:13}}>
          <CheckCircle2 size={14} color={K.success}/>{r}</div>)}</div>;
    case 5:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:16}}>Coordination transverse</h3>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {[{l:"Avec AMOA",v:"Point hebdo + validation"},{l:"Avec MOE",v:"Revue livrables"},
          {l:"Avec MOEX",v:"Suivi quotidien terrain"},{l:"Avec Client",v:"Reporting + décisions"}].map((it,i)=>
          <Card key={i} onClick={()=>{}} style={{padding:11,cursor:"pointer"}}><div style={{fontSize:12,color:K.gray500,marginBottom:2}}>{it.l}</div>
            <div style={{fontSize:14,fontWeight:600}}>{it.v}</div></Card>)}</div></div>;
    case 6:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:16}}>Finance et relance</h3>
      {["Suivi facturation client","Relance paiements","Priorisation achats terrain","Contrôle budgétaire projet",
        "Validation devis fournisseurs"].map(r=>
        <div key={r} style={{display:"flex",alignItems:"center",gap:8,padding:"9px 0",borderBottom:`1px solid ${K.gray50}`,fontSize:13}}>
          <CheckCircle2 size={14} color={K.success}/>{r}</div>)}</div>;
    case 7:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:16}}>Test de maîtrise</h3>
      <Card style={{padding:18,textAlign:"center",background:K.secondaryLight}}>
        <div style={{fontWeight:700,fontSize:15,marginBottom:6}}>Score de maîtrise globale</div>
        <Score value={p.scores.global} size={80} color={K.secondary}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginTop:14}}>
          {Object.entries(p.scores).filter(([k])=>k!=="global").map(([k,v])=>
            <Score key={k} value={v} label={k.charAt(0).toUpperCase()+k.slice(1)} size={52} color={K.secondary}/>)}</div>
      </Card></div>;
    case 8:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:16}}>Habilitation finale</h3>
      <Card style={{padding:18,background:K.secondaryLight,border:`1.5px solid ${K.secondary}22`,marginBottom:14}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
          <div style={{width:48,height:48,borderRadius:12,background:`${K.secondary}18`,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <Target size={24} color={K.secondary}/></div>
          <div style={{flex:1}}><div style={{fontWeight:700,fontSize:17}}>{p.name}</div>
            <div style={{fontSize:13,color:K.gray500}}>{p.seniority} — {p.zone}</div></div>
          <LevelBadge level={4}/></div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8}}>
          {Object.entries(p.scores).map(([k,v])=>
            <Score key={k} value={v} label={k.charAt(0).toUpperCase()+k.slice(1)} size={52} color={K.secondary}/>)}</div></Card>
      <div style={{display:"flex",gap:10,justifyContent:"center"}}>
        <Btn v="success" icon={CheckCircle} onClick={()=>setDone(true)}>Activer l'habilitation</Btn>
        <Btn v="outline">Ajuster les droits</Btn></div></div>;
    default:return null;}};
  return <div>
    <HeroBanner icon={Target} title="Parcours SPOC — Espace Interne" color={K.secondary}
      sub="Habilitation collaborateur KOMA — Pilotage client & coordination" time="~5 min" badge="Interne"/>
    <Journey steps={steps} current={step} setCurrent={setStep} color={K.secondary} renderStep={render} onFinish={()=>setDone(true)}/>
  </div>;
};

/* ═══════════════════════════════════════════════════════
   DASHBOARD
   ═══════════════════════════════════════════════════════ */
const SDashboard=({onNav})=>{
  const d=MOCK.dash;
  const [drawer,setDrawer]=useState(null);
  const stats=[{l:"Brouillon",v:d.brouillon,c:K.gray400,i:Pencil},{l:"Préqualifiés",v:d.prequalifie,c:K.warning,i:Clock},
    {l:"Attente pièces",v:d.attente_pieces,c:K.warning,i:FileText},{l:"En revue",v:d.en_revue,c:K.info,i:Eye},
    {l:"Qualifiés",v:d.qualifie,c:K.success,i:CheckCircle},{l:"Activés",v:d.active,c:K.success,i:Zap},{l:"Refusés",v:d.refuse,c:K.danger,i:XCircle}];
  return <div>
    <HeroBanner icon={LayoutDashboard} title="Tableau de bord Onboarding" sub="Vue consolidée de tous les dossiers"
      badge={`${d.brouillon+d.prequalifie+d.attente_pieces+d.en_revue+d.qualifie+d.active+d.refuse} dossiers`}/>
    <div className="fu fu1" style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:10,marginBottom:20}}>
      {stats.map((s,i)=>{const I=s.i;return <Card key={i} onClick={()=>setDrawer("kpi_"+s.l)} style={{padding:14,textAlign:"center"}}>
        <I size={18} color={s.c} style={{marginBottom:6}}/><div style={{fontSize:22,fontWeight:800}}>{s.v}</div>
        <div style={{fontSize:11,color:K.gray500,marginTop:3}}>{s.l}</div></Card>;})}
    </div>
    <div className="fu fu2" style={{display:"grid",gridTemplateColumns:"1fr 280px",gap:16}}>
      <Card style={{padding:0,overflow:"hidden"}}>
        <div style={{padding:"14px 18px",borderBottom:`1px solid ${K.gray100}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <Sec icon={FolderOpen} title="Dossiers récents" style={{marginBottom:0}}/></div>
        {d.recent.map((r,i)=>{const I=TI[r.type];return <div key={i} style={{padding:"12px 18px",borderBottom:`1px solid ${K.gray50}`,
          display:"flex",alignItems:"center",gap:12,cursor:"pointer"}}
          onMouseEnter={e=>e.currentTarget.style.background=K.gray50}
          onMouseLeave={e=>e.currentTarget.style.background="transparent"}
          onClick={()=>onNav("resume")}>
          <div style={{width:36,height:36,borderRadius:9,background:TBg[r.type],display:"flex",alignItems:"center",justifyContent:"center"}}>
            <I size={17} color={TC[r.type]}/></div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <span style={{fontWeight:600,fontSize:13.5}}>{r.name}</span>
              <Badge color={TC[r.type]} sm pill>{TL[r.type]}</Badge></div>
            <div style={{fontSize:12,color:K.gray500,marginTop:2}}>{r.id} · {r.proj}</div></div>
          <div style={{width:80}}><Progress v={r.pct} color={TC[r.type]} h={4}/></div>
          <StatusDot status={r.status}/><div style={{fontSize:11,color:K.gray400,width:50,textAlign:"right"}}>{r.date}</div>
          <ChevronRight size={15} color={K.gray300}/></div>;})}
      </Card>
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        <Card onClick={()=>setDrawer("actors")} style={{cursor:"pointer"}}><Sec icon={PieChart} title="Par acteur"/>
          {Object.entries(TL).map(([k,l])=>{const cnt=d.recent.filter(r=>r.type===k).length;
            return <div key={k} style={{display:"flex",alignItems:"center",gap:7,marginBottom:8}}>
              <span style={{width:8,height:8,borderRadius:3,background:TC[k]}}/><span style={{fontSize:13,flex:1}}>{l}</span>
              <span style={{fontWeight:700,fontSize:13}}>{cnt}</span></div>;})}
        </Card>
        <Card><Sec icon={AlertTriangle} title="Alertes"/>
          {[{t:"3 dossiers en attente > 7j",bg:K.warningLight},{t:"2 pièces rejetées",bg:K.dangerLight},{t:"4 en cours de revue",bg:K.infoLight}].map((a,i)=>
            <div key={i} onClick={()=>setDrawer("alert_"+i)} style={{padding:9,borderRadius:7,background:a.bg,fontSize:12.5,marginBottom:4,cursor:"pointer"}}>
              {a.t}</div>)}</Card>
      </div>
    </div>
    <Drawer open={!!drawer} onClose={()=>setDrawer(null)} title="Détail">
      <div style={{fontSize:14,color:K.gray700}}>Données détaillées du filtre sélectionné. En production, cette vue afficherait les dossiers filtrés avec actions rapides.</div>
    </Drawer>
  </div>;
};

/* ═══════════════════════════════════════════════════════
   DOCUMENTS
   ═══════════════════════════════════════════════════════ */
const SDocs=()=>{
  const [detail,setDetail]=useState(null);
  const cats=[
    {cat:"Identité & juridique",docs:[{n:"RCCM",s:"ok",d:"12/03/2026",v:"14/03/2026"},{n:"NIU",s:"ok",d:"12/03/2026",v:"14/03/2026"},{n:"Statuts",s:"review",d:"13/03/2026",v:"-"}]},
    {cat:"Assurances",docs:[{n:"RC Professionnelle",s:"received",d:"15/03/2026",v:"-"},{n:"Décennale",s:"missing",d:"-",v:"-"}]},
    {cat:"Références",docs:[{n:"Portfolio projets",s:"ok",d:"12/03/2026",v:"15/03/2026"},{n:"CV équipe clé",s:"missing",d:"-",v:"-"}]},
  ];
  const sm={ok:{c:K.success,l:"Validé"},review:{c:K.info,l:"En revue"},received:{c:K.warning,l:"Reçu"},missing:{c:K.danger,l:"Manquant"},
    rejected:{c:K.danger,l:"Rejeté"},expiring:{c:K.warning,l:"Expirant"}};
  const total=cats.reduce((a,c)=>a+c.docs.length,0);
  const valid=cats.reduce((a,c)=>a+c.docs.filter(d=>d.s==="ok").length,0);
  return <div>
    <HeroBanner icon={FolderOpen} title="Documents & Conformité" sub="Suivi documentaire par catégorie et par statut" badge={`${valid}/${total} validés`}/>
    <Card className="fu fu1" style={{marginBottom:14,padding:14}}>
      <div style={{display:"flex",alignItems:"center",gap:14}}>
        <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,marginBottom:4}}>Progression de complétude</div>
          <Progress v={valid} max={total} color={K.success} h={8}/></div>
        <div style={{fontSize:22,fontWeight:800,color:K.success}}>{Math.round(valid/total*100)}%</div></div></Card>
    {cats.map((cat,ci)=><Card key={ci} className="fu fu2" style={{marginBottom:12}}>
      <Sec icon={FileText} title={cat.cat}/>
      {cat.docs.map((doc,di)=>{const s=sm[doc.s];return <div key={di} onClick={()=>setDetail(doc)}
        style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:`1px solid ${K.gray50}`,cursor:"pointer"}}>
        <FileText size={15} color={s.c}/><span style={{flex:1,fontSize:13.5,fontWeight:500}}>{doc.n}</span>
        <span style={{fontSize:12,color:K.gray400}}>{doc.d}</span>
        <Badge color={s.c} sm>{s.l}</Badge>
        {doc.s==="missing"&&<Btn v="outline" sz="sm" icon={Upload}>Déposer</Btn>}
      </div>;})}
    </Card>)}
    <Drawer open={!!detail} onClose={()=>setDetail(null)} title={detail?.n||"Document"} width={400}>
      {detail&&<div>
        {[{l:"Statut",v:sm[detail.s].l},{l:"Date de dépôt",v:detail.d},{l:"Date de validation",v:detail.v},
          {l:"Commentaire",v:detail.s==="missing"?"Pièce requise pour finaliser la qualification":"Conforme"},
          {l:"Motif de rejet",v:"—"},{l:"Relance",v:detail.s==="missing"?"Relance automatique dans 3j":"—"}].map((it,i)=>
          <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${K.gray50}`,fontSize:13}}>
            <span style={{color:K.gray500}}>{it.l}</span><span style={{fontWeight:500}}>{it.v}</span></div>)}
        {detail.s==="missing"&&<Btn v="primary" icon={Upload} full style={{marginTop:14}}>Déposer ce document</Btn>}
      </div>}
    </Drawer>
  </div>;
};

/* ═══════════════════════════════════════════════════════
   ÉQUIPES
   ═══════════════════════════════════════════════════════ */
const SEquipes=()=>{
  const [detail,setDetail]=useState(null);
  const allTeams=[...MOCK.amoa.team.map(t=>({...t,org:"Cabinet Tekton SARL",type:"amoa"})),
    ...MOCK.moe.team.map(t=>({...t,org:"Arch. Jean-Paul Fotso",type:"moe"})),
    ...MOCK.moex.team.map(t=>({...t,org:"BTP Construct SARL",type:"moex"}))];
  return <div>
    <HeroBanner icon={Users} title="Gestion des Équipes" sub="Collaborateurs enregistrés par entreprise partenaire" badge={`${allTeams.length} membres`}/>
    <div className="fu fu1" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
      {allTeams.map((m,i)=><Card key={i} onClick={()=>setDetail(m)} style={{padding:14,cursor:"pointer"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
          <div style={{width:38,height:38,borderRadius:"50%",background:`${TC[m.type]}12`,display:"flex",alignItems:"center",justifyContent:"center",
            fontWeight:700,fontSize:13,color:TC[m.type]}}>{m.n.split(" ").map(w=>w[0]).join("")}</div>
          <div style={{flex:1}}><div style={{fontWeight:600,fontSize:13.5}}>{m.n}</div>
            <div style={{fontSize:12,color:K.gray500}}>{m.r}</div></div></div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          <Badge color={TC[m.type]} sm pill>{TL[m.type]}</Badge>
          <Badge color={K.gray500} sm>{m.sp}</Badge>
          <StatusDot status={m.s==="actif"?"active":"invite"}/></div>
        <div style={{fontSize:12,color:K.gray400,marginTop:6}}>{m.org} · {m.anc}</div>
      </Card>)}
    </div>
    <Drawer open={!!detail} onClose={()=>setDetail(null)} title={detail?.n||"Collaborateur"} width={400}>
      {detail&&<div>
        <div style={{textAlign:"center",marginBottom:16}}>
          <div style={{width:56,height:56,borderRadius:"50%",background:`${TC[detail.type]}12`,display:"inline-flex",alignItems:"center",justifyContent:"center",
            fontWeight:800,fontSize:18,color:TC[detail.type],marginBottom:8}}>{detail.n.split(" ").map(w=>w[0]).join("")}</div>
          <div style={{fontWeight:700,fontSize:16}}>{detail.n}</div></div>
        {[{l:"Rôle",v:detail.r},{l:"Fonction",v:detail.sp},{l:"Spécialité",v:detail.sp},{l:"Ancienneté",v:detail.anc},
          {l:"Statut",v:detail.s==="actif"?"Actif":"Invité"},{l:"Disponibilité",v:"Disponible"},
          {l:"Rattachement",v:detail.org},{l:"Type",v:TL[detail.type]}].map((it,i)=>
          <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${K.gray50}`,fontSize:13}}>
            <span style={{color:K.gray500}}>{it.l}</span><span style={{fontWeight:500}}>{it.v}</span></div>)}
        <Btn v="outline" icon={FileText} full style={{marginTop:14}}>Documents individuels</Btn>
      </div>}
    </Drawer>
  </div>;
};

/* ═══════════════════════════════════════════════════════
   HABILITATIONS — Matrice interactive
   ═══════════════════════════════════════════════════════ */
const SHab=()=>{
  const [sel,setSel]=useState(null);
  const mods=["Prospects","Projets","Conception","Devis","Achats","Stock","Facturation","GED","Messagerie","Rapports","Chantier"];
  const roles=[{r:"Admin",c:K.dark,a:["admin","admin","admin","admin","admin","admin","admin","admin","admin","admin","admin"]},
    {r:"SPOC",c:K.secondary,a:["admin","valid","valid","valid","valid","lecture","valid","admin","admin","admin","valid"]},
    {r:"AMOA",c:K.accent,a:["lecture","contrib","valid","valid","lecture","none","lecture","contrib","contrib","contrib","valid"]},
    {r:"MOE",c:K.moe,a:["none","none","lecture","lecture","contrib","none","none","none","lecture","contrib","contrib"]},
    {r:"MOEX",c:K.moex,a:["none","none","lecture","none","contrib","none","contrib","none","contrib","lecture","contrib"]},
    {r:"Client",c:K.primary,a:["none","none","lecture","lecture","none","none","none","lecture","lecture","lecture","contrib"]}];
  const ac={admin:{c:K.dark,l:"Admin",bg:`${K.dark}12`},valid:{c:K.accent,l:"Validation",bg:`${K.accent}12`},
    contrib:{c:K.success,l:"Contrib.",bg:`${K.success}12`},lecture:{c:K.info,l:"Lecture",bg:`${K.info}12`},none:{c:K.gray300,l:"—",bg:K.gray50}};
  return <div>
    <HeroBanner icon={Lock} title="Habilitations & Droits d'accès" sub="Matrice des permissions par rôle et par module — Cliquez sur chaque cellule"/>
    <Card className="fu fu1" style={{padding:0,overflow:"auto"}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
        <thead><tr style={{background:K.gray50}}>
          <th style={{padding:"10px 14px",textAlign:"left",fontWeight:700,fontSize:12.5,borderBottom:`2px solid ${K.gray100}`,position:"sticky",left:0,background:K.gray50,zIndex:1}}>Module</th>
          {roles.map(r=><th key={r.r} onClick={()=>setSel({type:"role",val:r})}
            style={{padding:"10px 8px",textAlign:"center",fontWeight:700,fontSize:12.5,borderBottom:`2px solid ${K.gray100}`,color:r.c,cursor:"pointer"}}>{r.r}</th>)}</tr></thead>
        <tbody>{mods.map((mod,mi)=><tr key={mi} style={{borderBottom:`1px solid ${K.gray50}`}}>
          <td onClick={()=>setSel({type:"module",val:mod})} style={{padding:"9px 14px",fontWeight:500,fontSize:13,position:"sticky",left:0,background:K.white,cursor:"pointer"}}>{mod}</td>
          {roles.map((r,ri)=>{const v=ac[r.a[mi]];return <td key={ri} onClick={()=>setSel({type:"cell",role:r.r,module:mod,access:r.a[mi]})}
            style={{padding:"8px",textAlign:"center",cursor:"pointer"}}>
            <span style={{display:"inline-flex",alignItems:"center",gap:3,padding:"2px 8px",borderRadius:6,fontSize:11,fontWeight:600,
              color:v.c,background:v.bg}}>{v.l}</span></td>})}</tr>)}</tbody></table></Card>
    {sel&&<Modal open={true} onClose={()=>setSel(null)} title={sel.type==="cell"?`${sel.role} — ${sel.module}`:sel.type==="role"?`Droits ${sel.val.r}`:`Module ${sel.val}`}>
      {sel.type==="cell"&&<div>
        <div style={{fontSize:14,marginBottom:12}}>Niveau d'accès actuel : <Badge color={ac[sel.access].c}>{ac[sel.access].l}</Badge></div>
        <div style={{fontSize:13,color:K.gray700,marginBottom:14}}>Niveaux disponibles :</div>
        {Object.entries(ac).map(([k,v])=><div key={k} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 0",borderBottom:`1px solid ${K.gray50}`,
          fontSize:13,cursor:"pointer",fontWeight:k===sel.access?700:400}} onClick={()=>setSel(null)}>
          <span style={{width:10,height:10,borderRadius:3,background:v.c}}/>{v.l}
          {k===sel.access&&<Badge color={K.success} sm>Actuel</Badge>}</div>)}
      </div>}
      {sel.type==="role"&&<div><div style={{fontSize:13,color:K.gray700}}>Droits complets pour le rôle <strong>{sel.val.r}</strong> :</div>
        {mods.map((m,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:`1px solid ${K.gray50}`,fontSize:13}}>
          <span>{m}</span><Badge color={ac[sel.val.a[i]].c} sm>{ac[sel.val.a[i]].l}</Badge></div>)}</div>}
      {sel.type==="module"&&<div><div style={{fontSize:13,color:K.gray700,marginBottom:8}}>Accès au module <strong>{sel.val}</strong> par rôle :</div>
        {roles.map((r,i)=>{const mi=mods.indexOf(sel.val);return <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:`1px solid ${K.gray50}`,fontSize:13}}>
          <span style={{color:r.c,fontWeight:600}}>{r.r}</span><Badge color={ac[r.a[mi]].c} sm>{ac[r.a[mi]].l}</Badge></div>;})}</div>}
    </Modal>}
  </div>;
};

/* ═══════════════════════════════════════════════════════
   QUALIFICATION 5 NIVEAUX
   ═══════════════════════════════════════════════════════ */
const SQualification=()=>{
  const [detail,setDetail]=useState(null);
  const pillars=["Conformité doc.","Expérience","Références","Spécialités","Équipe","Zone couverture","Qualité","Reporting","Performance","Validation KOMA"];
  const pillarScores=[95,80,85,75,70,90,82,65,78,88];
  return <div>
    <HeroBanner icon={Award} title="Système de Qualification — 5 Niveaux" sub="Progression, critères et conditions d'accès à chaque niveau"/>
    <div className="fu fu1" style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12,marginBottom:20}}>
      {LEVELS.map((lv,i)=><Card key={i} onClick={()=>setDetail(lv)}
        style={{textAlign:"center",padding:16,border:`2px solid ${i<=2?lv.c+"30":K.gray200}`,background:i<=2?`${lv.c}06`:K.white,cursor:"pointer"}}>
        <div style={{display:"flex",justifyContent:"center",gap:3,marginBottom:8}}>
          {Array.from({length:5}).map((_,j)=><Star key={j} size={14} color={j<=i?lv.c:K.gray200} fill={j<=i?lv.c:"none"}/>)}</div>
        <div style={{fontWeight:800,fontSize:15,color:lv.c,marginBottom:3}}>Niv. {lv.n}</div>
        <div style={{fontWeight:700,fontSize:13,marginBottom:4}}>{lv.l}</div>
        <div style={{fontSize:12,color:K.gray500,lineHeight:1.4}}>{lv.desc}</div>
        {i<=2&&<Badge color={lv.c} sm style={{marginTop:8}}>Atteint</Badge>}
      </Card>)}
    </div>
    <div className="fu fu2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:18}}>
      <Card style={{padding:18}}>
        <Sec icon={BarChart3} title="Scores détaillés par pilier"/>
        {pillars.map((p,i)=><div key={i} style={{marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:3}}>
            <span>{p}</span><span style={{fontWeight:700}}>{pillarScores[i]}/100</span></div>
          <Progress v={pillarScores[i]} color={pillarScores[i]>=80?K.success:pillarScores[i]>=60?K.warning:K.danger} h={5}/></div>)}
      </Card>
      <Card style={{padding:18}}>
        <Sec icon={TrendingUp} title="Conditions pour le niveau suivant"/>
        <LevelBadge level={3}/>
        <div style={{fontSize:13.5,fontWeight:700,marginTop:12,marginBottom:8}}>Pour atteindre Niv. 4 — Confirmé :</div>
        {["Compléter 3 missions réussies minimum","Score reporting ≥ 80/100","Aucune réserve bloquante",
          "Toutes pièces conformes et à jour","Évaluation client positive (≥ 4/5)"].map((c,i)=>{
          const ok=i<2;return <div key={i} style={{display:"flex",alignItems:"center",gap:7,fontSize:13,padding:"5px 0",borderBottom:`1px solid ${K.gray50}`,
            color:ok?K.success:K.gray700}}>
            {ok?<CheckCircle2 size={13} color={K.success}/>:<CircleDot size={13} color={K.warning}/>}{c}</div>;})}
        <div style={{marginTop:12}}>
          <div style={{fontSize:13,fontWeight:600,color:K.danger,marginBottom:4}}>Réserves éventuelles :</div>
          <div style={{fontSize:12.5,color:K.gray700}}>Score reporting insuffisant (65/100 — requis 80)</div></div>
      </Card>
    </div>
    <Modal open={!!detail} onClose={()=>setDetail(null)} title={`Niveau ${detail?.n} — ${detail?.l}`}>
      {detail&&<div>
        <div style={{textAlign:"center",marginBottom:16}}>
          <div style={{display:"flex",justifyContent:"center",gap:3,marginBottom:8}}>
            {Array.from({length:5}).map((_,j)=><Star key={j} size={18} color={j<detail.n?detail.c:K.gray200} fill={j<detail.n?detail.c:"none"}/>)}</div>
          <div style={{fontWeight:800,fontSize:18,color:detail.c}}>{detail.l}</div>
          <div style={{fontSize:13,color:K.gray500,marginTop:4}}>{detail.desc}</div></div>
        <div style={{fontSize:13,fontWeight:600,marginBottom:8}}>Critères de ce niveau :</div>
        {["Conformité documentaire complète","Expérience vérifiée","Références contrôlées","Spécialités confirmées",
          "Équipe qualifiée","Zone de couverture validée","Qualité / fiabilité prouvée","Discipline de reporting","Performance mesurée","Validation KOMA"].slice(0,detail.n*2).map((c,i)=>
          <div key={i} style={{display:"flex",alignItems:"center",gap:6,fontSize:13,padding:"5px 0",borderBottom:`1px solid ${K.gray50}`}}>
            <CheckCircle2 size={12} color={detail.c}/>{c}</div>)}
      </div>}
    </Modal>
  </div>;
};

/* ═══════════════════════════════════════════════════════
   RÉSUMÉ IA / DÉCISION
   ═══════════════════════════════════════════════════════ */
const SResume=({onNav})=>{
  const [modal,setModal]=useState(null);
  const p=MOCK.amoa;
  return <div>
    <HeroBanner icon={Sparkles} title="Résumé intelligent — Décision" sub="Fiche de qualification consolidée pour prise de décision"/>
    <Card className="fu fu1" style={{padding:22,marginBottom:18}}>
      <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:18,paddingBottom:14,borderBottom:`1px solid ${K.gray100}`}}>
        <div style={{width:52,height:52,borderRadius:14,background:K.accentLight,display:"flex",alignItems:"center",justifyContent:"center"}}><ShieldCheck size={26} color={K.accent}/></div>
        <div style={{flex:1}}><div style={{fontWeight:700,fontSize:19}}>{p.name}</div>
          <div style={{fontSize:13.5,color:K.gray500}}>AMOA — {p.type} — {p.zone}</div></div>
        <LevelBadge level={3} onClick={()=>setModal("level")}/></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:14,marginBottom:20}}>
        {Object.entries(p.scores).map(([k,v])=>
          <div key={k} onClick={()=>setModal("score_"+k)} style={{cursor:"pointer"}}>
            <Score value={v} label={k.charAt(0).toUpperCase()+k.slice(1)} size={72}
              color={k==="global"?K.primary:k==="conformite"?K.success:k==="capacite"?K.info:k==="fiabilite"?K.accent:K.moe}/></div>)}</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:16}}>
        <div><div style={{fontSize:13,fontWeight:600,marginBottom:8}}>Forces</div>
          {["Expérience solide (8 ans, 34 projets)","Références vérifiées","Conformité documentaire avancée","Couverture multi-zones"].map((f,i)=>
            <div key={i} style={{display:"flex",alignItems:"center",gap:6,padding:"4px 0",fontSize:13,color:K.success}}>
              <CheckCircle2 size={12}/>{f}</div>)}</div>
        <div><div style={{fontSize:13,fontWeight:600,marginBottom:8}}>Faiblesses</div>
          {["CV équipe clé manquant","Score capacité à consolider"].map((f,i)=>
            <div key={i} style={{display:"flex",alignItems:"center",gap:6,padding:"4px 0",fontSize:13,color:K.warning}}>
              <AlertTriangle size={12}/>{f}</div>)}</div>
      </div>
      <Card style={{background:`${K.warning}06`,border:`1px solid ${K.warning}18`,padding:12,marginBottom:14}}>
        <div style={{display:"flex",alignItems:"center",gap:7,fontSize:13}}><AlertTriangle size={15} color={K.warning}/>
          <span style={{fontWeight:600}}>Réserves :</span><span style={{color:K.gray700}}>1 pièce manquante. Score capacité à consolider.</span></div></Card>
      <Card style={{background:`linear-gradient(135deg,${K.accent}06,${K.primary}04)`,border:`1.5px solid ${K.accent}18`,padding:14}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}><Sparkles size={17} color={K.accent}/>
          <span style={{fontWeight:700,fontSize:14.5,color:K.accent}}>Recommandation système</span></div>
        <div style={{fontSize:13.5,color:K.gray700,lineHeight:1.6}}>
          Profil AMOA solide. <strong style={{color:K.success}}>Qualifié Niveau 3</strong> — Activation après réception CV équipe. Modules à débloquer : Projet, Devis, Rapports.</div></Card></Card>
    <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
      <Btn v="success" icon={CheckCircle} onClick={()=>setModal("approve")}>Approuver et activer</Btn>
      <Btn v="outline" icon={FileText} onClick={()=>setModal("complement")}>Demander compléments</Btn>
      <Btn v="ghost" icon={Pause} onClick={()=>setModal("suspend")}>Suspendre</Btn>
      <Btn v="danger" icon={XCircle} onClick={()=>setModal("refuse")}>Refuser</Btn>
      <Btn v="secondary" icon={Award} onClick={()=>onNav("qualification")}>Ajuster le niveau</Btn>
      <Btn v="secondary" icon={Lock} onClick={()=>onNav("habilitations")}>Ajuster les droits</Btn></div>
    <Modal open={!!modal} onClose={()=>setModal(null)} title={modal==="approve"?"Confirmer l'activation":modal==="complement"?"Demande de compléments":modal==="level"?"Niveau de qualification":"Action"}>
      <div style={{fontSize:14,color:K.gray700,lineHeight:1.7}}>
        {modal==="approve"&&<div><p style={{marginBottom:12}}>Vous êtes sur le point d'activer <strong>{p.name}</strong> au <strong>Niveau 3 — Qualifié</strong>.</p>
          <p style={{marginBottom:14}}>Modules débloqués : Projet, Devis, Rapports, GED.</p>
          <Btn v="success" icon={CheckCircle} full onClick={()=>setModal(null)}>Confirmer l'activation</Btn></div>}
        {modal==="complement"&&<div><p style={{marginBottom:12}}>Pièces à demander :</p>
          <div style={{padding:10,background:K.warningLight,borderRadius:8,marginBottom:14,fontSize:13}}>CV équipe clé — Délai suggéré : 7 jours</div>
          <Btn v="primary" icon={Mail} full onClick={()=>setModal(null)}>Envoyer la demande</Btn></div>}
        {modal==="level"&&<div>{LEVELS.map((lv,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 0",borderBottom:`1px solid ${K.gray50}`}}>
          {Array.from({length:5}).map((_,j)=><Star key={j} size={12} color={j<=i?lv.c:K.gray200} fill={j<=i?lv.c:"none"}/>)}
          <span style={{fontWeight:600,fontSize:13,color:lv.c}}>{lv.l}</span>
          {i===2&&<Badge color={K.success} sm>Actuel</Badge>}</div>)}</div>}
        {(modal==="suspend"||modal==="refuse")&&<div><p>Confirmez-vous vouloir {modal==="suspend"?"suspendre":"refuser"} ce dossier ?</p>
          <Btn v={modal==="refuse"?"danger":"secondary"} full style={{marginTop:14}} onClick={()=>setModal(null)}>Confirmer</Btn></div>}
        {modal?.startsWith("score")&&<div><p>Détail du score : <strong>{modal.split("_")[1]}</strong></p>
          <Score value={p.scores[modal.split("_")[1]]} size={80} color={K.primary}/></div>}
      </div>
    </Modal>
  </div>;
};

/* ═══════════════════════════════════════════════════════
   ADMIN
   ═══════════════════════════════════════════════════════ */
const SAdmin=({onNav})=>{
  const [drawer,setDrawer]=useState(null);
  const kpis=[{l:"Dossiers totaux",v:"76",i:FolderOpen,c:K.primary},{l:"Taux activation",v:"68%",i:Zap,c:K.success},
    {l:"Temps moyen",v:"4.2j",i:Clock,c:K.warning},{l:"Bloqués",v:"5",i:AlertTriangle,c:K.danger},
    {l:"Conversion",v:"72%",i:TrendingUp,c:K.info},{l:"Qualité moy.",v:"81/100",i:Award,c:K.moe}];
  return <div>
    <HeroBanner icon={Settings} title="Pilotage Admin — Onboarding" sub="Vue transverse de tous les dossiers" badge="76 dossiers"/>
    <div className="fu fu1" style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:10,marginBottom:18}}>
      {kpis.map((k,i)=>{const I=k.i;return <Card key={i} onClick={()=>setDrawer("kpi_"+k.l)} style={{padding:13,textAlign:"center",cursor:"pointer"}}>
        <I size={17} color={k.c} style={{marginBottom:5}}/><div style={{fontSize:20,fontWeight:800}}>{k.v}</div>
        <div style={{fontSize:11,color:K.gray500,marginTop:2}}>{k.l}</div></Card>;})}</div>
    <div className="fu fu2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:18}}>
      <Card><Sec icon={PieChart} title="Par acteur"/>
        {[{l:"Clients",p:35,c:K.primary},{l:"AMOA",p:25,c:K.accent},{l:"MOE",p:20,c:K.moe},{l:"MOEX",p:15,c:K.moex},{l:"SPOC",p:5,c:K.secondary}].map((it,i)=>
          <div key={i} onClick={()=>setDrawer("actor_"+it.l)} style={{display:"flex",alignItems:"center",gap:7,marginBottom:7,cursor:"pointer"}}>
            <span style={{width:8,height:8,borderRadius:3,background:it.c}}/><span style={{fontSize:13,flex:1}}>{it.l}</span>
            <span style={{fontWeight:700,fontSize:13}}>{it.p}%</span></div>)}</Card>
      <Card><Sec icon={Activity} title="Activité récente"/>
        {[{a:"Activation",w:"Arch. Fotso",t:"moe",d:"2h"},{a:"Pièce rejetée",w:"Tekton",t:"amoa",d:"5h"},
          {a:"Nouveau dossier",w:"P. Nkengué",t:"client",d:"8h"},{a:"Qualifié",w:"BTP Construct",t:"moex",d:"hier"},
          {a:"Habilitation",w:"N. Mbarga",t:"spoc",d:"hier"}].map((a,i)=>
          <div key={i} onClick={()=>onNav("resume")} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<4?`1px solid ${K.gray50}`:"none",fontSize:13,cursor:"pointer"}}>
            <span style={{width:7,height:7,borderRadius:"50%",background:TC[a.t]}}/><span style={{flex:1}}><strong>{a.a}</strong> — {a.w}</span>
            <span style={{color:K.gray400,fontSize:12}}>{a.d}</span></div>)}</Card></div>
    <Card className="fu fu3"><Sec icon={Zap} title="Actions rapides"/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8}}>
        {[{l:"Relancer",i:Bell,c:K.warning,v:3},{l:"Approuver",i:CheckCircle,c:K.success,v:4},
          {l:"Pièces manquantes",i:FileText,c:K.danger,v:5},{l:"Suspendre",i:Pause,c:K.gray500,v:1},{l:"Activer",i:Zap,c:K.primary,v:2}].map((ac,i)=>{
          const I=ac.i;return <Card key={i} onClick={()=>setDrawer("action_"+ac.l)} style={{padding:12,textAlign:"center",cursor:"pointer",border:`1px solid ${ac.c}18`}}>
            <I size={18} color={ac.c}/><div style={{fontSize:18,fontWeight:800,marginTop:5}}>{ac.v}</div>
            <div style={{fontSize:11,color:K.gray500}}>{ac.l}</div></Card>;})}</div></Card>
    <Drawer open={!!drawer} onClose={()=>setDrawer(null)} title="Détail">
      <div style={{fontSize:14,color:K.gray700}}>Détail contextuel pour l'élément sélectionné. En production, les dossiers correspondants seraient affichés avec filtres et actions.</div>
    </Drawer>
  </div>;
};

/* ═══════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════ */
export default function KomaV3Portal(){
  const [screen,setScreen]=useState("home_client");
  const screens={
    home_client:<SHomeClient onNav={setScreen}/>,
    pro_hub:<SProHub onNav={setScreen}/>,
    internal:<SInternal onNav={setScreen}/>,
    prospect:<SProspect onNav={setScreen}/>,
    post_onboarding:<SPostOnboarding onNav={setScreen}/>,
    amoa:<SAMOA onNav={setScreen}/>,
    moe:<SMOE onNav={setScreen}/>,
    moex:<SMOEX onNav={setScreen}/>,
    spoc:<SSPOC onNav={setScreen}/>,
    dashboard:<SDashboard onNav={setScreen}/>,
    documents:<SDocs/>,
    equipes:<SEquipes/>,
    habilitations:<SHab/>,
    qualification:<SQualification/>,
    resume:<SResume onNav={setScreen}/>,
    admin:<SAdmin onNav={setScreen}/>,
  };
  return <div style={{display:"flex",minHeight:"100vh",fontFamily:K.font}}>
    <Sidebar active={screen} onNav={setScreen}/>
    <div style={{flex:1,marginLeft:232,padding:"24px 32px",maxWidth:1140}}>
      {screens[screen]||screens.home_client}</div></div>;
}
