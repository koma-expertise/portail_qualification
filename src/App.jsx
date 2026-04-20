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
  GraduationCap, Headphones, Heart, Lightbulb, Package, Workflow
} from "lucide-react";

/* ═══════════════════════════════════════════════════════
   KOMA V2 — DESIGN TOKENS
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

// ── Inject global styles ──
const _s = document.createElement("style");
_s.textContent = `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Serif+Display&display=swap');
*{box-sizing:border-box;margin:0;padding:0}body{font-family:${K.font};background:${K.gray50};color:${K.dark};-webkit-font-smoothing:antialiased}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:${K.gray300};border-radius:3px}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes scaleIn{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}
@keyframes slideR{from{opacity:0;transform:translateX(-12px)}to{opacity:1;transform:translateX(0)}}
.fu{animation:fadeUp .45s ease both}.fu1{animation-delay:.06s}.fu2{animation-delay:.12s}.fu3{animation-delay:.18s}.fu4{animation-delay:.24s}.fu5{animation-delay:.3s}
.fi{animation:fadeIn .3s ease both}.si{animation:scaleIn .35s ease both}
`;
document.head.appendChild(_s);

/* ═══════════════════════════════════════════════════════
   SHARED COMPONENTS V2
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
const Btn = ({children,v="primary",sz="md",icon:I,onClick,disabled,style:s}) => {
  const b={display:"inline-flex",alignItems:"center",gap:8,fontFamily:K.font,fontWeight:600,
    borderRadius:K.rSm,cursor:disabled?"not-allowed":"pointer",border:"none",transition:"all .15s",
    opacity:disabled?.5:1,letterSpacing:".01em",
    ...(sz==="sm"?{padding:"7px 14px",fontSize:13}:sz==="lg"?{padding:"13px 26px",fontSize:15}:{padding:"9px 20px",fontSize:14})};
  const vs={primary:{background:`linear-gradient(135deg,${K.primary},${K.primaryDark})`,color:K.white},
    secondary:{background:K.gray100,color:K.dark},accent:{background:K.accent,color:K.white},
    outline:{background:"transparent",color:K.primary,border:`1.5px solid ${K.primary}`},
    ghost:{background:"transparent",color:K.gray700},success:{background:K.success,color:K.white},
    danger:{background:K.danger,color:K.white},moe:{background:K.moe,color:K.white},moex:{background:K.moex,color:K.white}};
  return <button onClick={onClick} disabled={disabled} style={{...b,...vs[v],...s}}>{I&&<I size={15}/>}{children}</button>;
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
const TimeBadge = ({text="Mise en route en moins de 3 min"}) => (
  <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"6px 14px",borderRadius:20,
    background:`${K.secondary}12`,color:K.secondary,fontSize:13,fontWeight:500}}><Clock size={14}/>{text}</div>
);
const HelpBox = ({icon:I=Info,title,children,color=K.info}) => (
  <div style={{padding:"12px 14px",borderRadius:K.rSm,background:`${color}08`,border:`1px solid ${color}18`,display:"flex",gap:10,alignItems:"flex-start"}}>
    <I size={16} color={color} style={{marginTop:2,flexShrink:0}}/>
    <div>{title&&<div style={{fontWeight:600,fontSize:13,color:K.dark,marginBottom:3}}>{title}</div>}
      <div style={{fontSize:13,color:K.gray700,lineHeight:1.55}}>{children}</div></div>
  </div>
);

/* ═══════ STEPPER V2 — Premium ═══════ */
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

/* ═══════ HERO BANNER ═══════ */
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
    {time&&<TimeBadge text={time}/>}
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
const Chips = ({field,options,form,set}) => (
  <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
    {options.map(o=>{const sel=form[field]===o;
      return <div key={o} onClick={()=>set(field,o)} style={{padding:"7px 15px",borderRadius:20,cursor:"pointer",fontSize:13,fontWeight:500,
        border:`1.5px solid ${sel?K.primary:K.gray200}`,background:sel?`${K.primary}0C`:K.white,
        color:sel?K.primary:K.gray700,transition:"all .15s"}}>{o}</div>;})}
  </div>
);
const Input = ({label,placeholder,field,req,type="text",form,set}) => (
  <div style={{marginBottom:14}}>
    <label style={{fontSize:13,fontWeight:600,color:K.dark,display:"block",marginBottom:5}}>{label}{req&&<span style={{color:K.danger}}> *</span>}</label>
    <input type={type} placeholder={placeholder} value={form[field]||""} onChange={e=>set(field,e.target.value)}
      style={{width:"100%",padding:"9px 13px",borderRadius:8,border:`1.5px solid ${K.gray200}`,fontSize:14,fontFamily:K.font,outline:"none",transition:"border .15s"}}
      onFocus={e=>e.target.style.borderColor=K.primary} onBlur={e=>e.target.style.borderColor=K.gray200}/>
  </div>
);

/* ═══════════════════════════════════════════════════════
   SIDEBAR V2
   ═══════════════════════════════════════════════════════ */
const NAV=[
  {id:"accueil",label:"Accueil",icon:Home},
  {id:"dashboard",label:"Tableau de bord",icon:LayoutDashboard},
  {id:"prospect",label:"Client / Prospect",icon:User,dot:K.primary},
  {id:"amoa",label:"AMOA",icon:ShieldCheck,dot:K.accent},
  {id:"moe",label:"MOE",icon:Ruler,dot:K.moe},
  {id:"moex",label:"MOEX",icon:HardHat,dot:K.moex},
  {id:"spoc",label:"SPOC interne",icon:Target,dot:K.secondary},
  {id:"documents",label:"Documents",icon:FolderOpen},
  {id:"habilitations",label:"Habilitations",icon:Lock},
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
          <div style={{fontSize:10.5,color:K.gray500,marginTop:1,letterSpacing:".04em",textTransform:"uppercase"}}>Qualification · Onboarding</div></div>
      </div>
    </div>
    <div style={{flex:1,padding:"10px 6px",overflowY:"auto"}}>
      {NAV.map(n=>{const I=n.icon,a=active===n.id;
        return <div key={n.id} onClick={()=>onNav(n.id)} style={{display:"flex",alignItems:"center",gap:9,
          padding:"9px 12px",borderRadius:8,cursor:"pointer",marginBottom:1,
          background:a?`${K.primary}18`:"transparent",color:a?K.primary:`#ffffffaa`,
          fontWeight:a?600:400,fontSize:13,transition:"all .12s"}}
          onMouseEnter={e=>{if(!a)e.currentTarget.style.background="#ffffff08"}}
          onMouseLeave={e=>{if(!a)e.currentTarget.style.background="transparent"}}>
          <I size={17}/><span style={{flex:1}}>{n.label}</span>
          {n.dot&&<span style={{width:7,height:7,borderRadius:"50%",background:n.dot,opacity:a?1:.4}}/>}
        </div>;})}
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
    team:[{n:"Paul Essama",r:"Chef de mission",s:"actif"},{n:"Aline Mbarga",r:"Contrôleur qualité",s:"actif"},{n:"Yves Nkodo",r:"Auditeur terrain",s:"invite"}]},
  moe:{name:"Arch. Jean-Paul Fotso",type:"Indépendant",
    specs:["Architecture","Économie construction"],
    phases:{APS:true,APD:true,PRO:true,DCE:false,ACT:false},
    scores:{qualite:91,process:78,conformite:85,metier:84,global:85},
    livrables:["Plans architecturaux APS/APD","Notes de calcul","DPGF estimatif","Détails techniques façades","Perspectives 3D"],
    refs:[{n:"Villa Akwa — Douala",y:2024,b:"85M",r:"Architecture complète"},{n:"Immeuble R+3 — Yaoundé",y:2023,b:"250M",r:"APS + APD"}]},
  moex:{name:"BTP Construct SARL",type:"Entreprise",cap:"5 chantiers simultanés",
    scores:{terrain:72,reporting:65,process:70,hse:78,global:71},
    capacities:["Suivi journalier","Coordination chantier","Remontée besoins","Gestion tâches","Photos/vidéos","Discipline HSE"],
    refs:[{n:"Résidence Bali — Douala",y:2024,b:"120M"},{n:"Villa Omnisport — Yaoundé",y:2023,b:"90M"}]},
  spoc:{name:"Nadège Mbarga",seniority:"Senior",zone:"Afrique Centrale",
    modules:["Portefeuille","Prospects","Projet","Devis","Tâches","Achats","Stock","Facturation","Rapports","GED","Messagerie","Météo","Vidéo","KPI","IA"],
    scores:{coordination:92,arbitrage:85,relation:90,synthese:88,global:89}},
};

/* ═══════════════════════════════════════════════════════
   GENERIC JOURNEY WRAPPER
   ═══════════════════════════════════════════════════════ */
const Journey = ({steps,current,setCurrent,color,renderStep,sideInfo}) => (
  <div style={{display:"grid",gridTemplateColumns:"1fr 260px",gap:18}}>
    <div>
      <Card style={{marginBottom:16,padding:"10px 14px"}}><StepperV2 steps={steps} current={current} onStep={setCurrent} color={color}/></Card>
      <Card className="si">{renderStep()}
        <div style={{display:"flex",justifyContent:"space-between",marginTop:22,paddingTop:14,borderTop:`1px solid ${K.gray100}`}}>
          <Btn v="ghost" icon={ChevronLeft} onClick={()=>setCurrent(Math.max(0,current-1))} disabled={current===0}>Précédent</Btn>
          <Btn icon={current<steps.length-1?ChevronRight:CheckCircle} onClick={()=>setCurrent(Math.min(steps.length-1,current+1))}>
            {current<steps.length-1?"Continuer":"Finaliser"}</Btn>
        </div>
      </Card>
    </div>
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      <Card><div style={{fontSize:13,fontWeight:600,marginBottom:10,color:K.gray700}}>Progression</div>
        <Progress v={(current+1)*100/steps.length} color={color} h={7}/>
        <div style={{fontSize:12,color:K.gray500,marginTop:7,textAlign:"center"}}>Étape {current+1} / {steps.length}</div></Card>
      <Card><div style={{fontSize:13,fontWeight:600,marginBottom:8,color:K.gray700}}>Étapes du parcours</div>
        {steps.map((s,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:7,marginBottom:5,fontSize:12.5,
          color:i<=current?K.dark:K.gray400}}>
          {i<current?<CheckCircle2 size={13} color={K.success}/>:i===current?<CircleDot size={13} color={color}/>:
            <div style={{width:13,height:13,borderRadius:"50%",border:`1.5px solid ${K.gray300}`}}/>}
          <span style={{fontWeight:i===current?600:400}}>{s}</span></div>)}</Card>
      {sideInfo||<HelpBox icon={Shield} color={K.secondary}>Vos données sont protégées. Vous pouvez reprendre à tout moment.</HelpBox>}
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════
   SCREEN: ACCUEIL
   ═══════════════════════════════════════════════════════ */
const SAccueil=({onNav})=>{
  const ps=[
    {id:"prospect",label:"Client / Prospect",desc:"Je veux réaliser un projet immobilier",icon:User,color:K.primary,time:"~3 min"},
    {id:"amoa",label:"AMOA",desc:"Cabinet d'assistance à maîtrise d'ouvrage",icon:ShieldCheck,color:K.accent,time:"~5 min"},
    {id:"moe",label:"MOE",desc:"Architecte, BET, ingénierie de conception",icon:Ruler,color:K.moe,time:"~5 min"},
    {id:"moex",label:"MOEX",desc:"Entreprise travaux, conducteur, pilotage terrain",icon:HardHat,color:K.moex,time:"~5 min"},
    {id:"spoc",label:"Collaborateur KOMA",desc:"Habilitation interne SPOC",icon:Target,color:K.secondary,time:"~5 min"},
  ];
  return <div style={{maxWidth:860,margin:"0 auto"}}>
    <div className="fu" style={{textAlign:"center",marginBottom:36}}>
      <div style={{width:60,height:60,borderRadius:16,background:`linear-gradient(135deg,${K.primary},${K.secondary})`,
        display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:14}}>
        <Building2 size={30} color={K.white}/></div>
      <h1 style={{fontSize:27,fontWeight:900,color:K.dark,marginBottom:8,letterSpacing:"-.02em"}}>Bienvenue sur KOMA Expertise</h1>
      <p style={{fontSize:15,color:K.gray700,maxWidth:480,margin:"0 auto 14px",lineHeight:1.6}}>
        Identifiez votre profil et démarrez votre parcours de qualification. Nous vous guidons pas à pas.</p>
      <TimeBadge text="Configuration estimée : 3 à 5 min"/>
    </div>
    <div className="fu fu1" style={{marginBottom:28}}>
      <h3 style={{fontSize:12,fontWeight:700,color:K.gray500,textTransform:"uppercase",letterSpacing:1.2,marginBottom:14}}>Choisissez votre parcours</h3>
      <div style={{display:"grid",gridTemplateColumns:"1fr",gap:10}}>
        {ps.map(p=>{const I=p.icon;return <Card key={p.id} onClick={()=>onNav(p.id)} style={{padding:16}}>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div style={{width:44,height:44,borderRadius:12,background:`${p.color}0C`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <I size={22} color={p.color}/></div>
            <div style={{flex:1}}><div style={{fontWeight:700,fontSize:15,color:K.dark}}>{p.label}</div>
              <div style={{fontSize:13,color:K.gray500,marginTop:2}}>{p.desc}</div></div>
            <div style={{display:"flex",alignItems:"center",gap:6,fontSize:12,color:K.gray400}}><Clock size={12}/>{p.time}</div>
            <ChevronRight size={18} color={K.gray300}/></div>
        </Card>;})}
      </div>
    </div>
    <div className="fu fu2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:28}}>
      <HelpBox icon={Sparkles} title="Ce que vous allez préparer" color={K.primary}>
        Profil, compétences, documents. KOMA qualifie, filtre et attribue les droits adaptés à chaque acteur.</HelpBox>
      <HelpBox icon={Shield} title="Pourquoi ce parcours" color={K.accent}>
        Sécuriser chaque projet en vérifiant crédibilité, conformité et maturité de tous les intervenants.</HelpBox>
    </div>
    <div className="fu fu3" style={{textAlign:"center"}}>
      <Btn v="outline" icon={RefreshCw} onClick={()=>onNav("dashboard")}>Reprendre un dossier en cours</Btn></div>
  </div>;
};

/* ═══════════════════════════════════════════════════════
   SCREEN: DASHBOARD
   ═══════════════════════════════════════════════════════ */
const SDashboard=({onNav})=>{
  const d=MOCK.dash;
  const stats=[{l:"Brouillon",v:d.brouillon,c:K.gray400,i:Pencil},{l:"Préqualifiés",v:d.prequalifie,c:K.warning,i:Clock},
    {l:"Attente pièces",v:d.attente_pieces,c:K.warning,i:FileText},{l:"En revue",v:d.en_revue,c:K.info,i:Eye},
    {l:"Qualifiés",v:d.qualifie,c:K.success,i:CheckCircle},{l:"Activés",v:d.active,c:K.success,i:Zap},{l:"Refusés",v:d.refuse,c:K.danger,i:XCircle}];
  return <div>
    <HeroBanner icon={LayoutDashboard} title="Tableau de bord Onboarding" sub="Vue consolidée de tous les dossiers de qualification"
      badge={`${d.brouillon+d.prequalifie+d.attente_pieces+d.en_revue+d.qualifie+d.active+d.refuse} dossiers`}/>
    <div className="fu fu1" style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:10,marginBottom:20}}>
      {stats.map((s,i)=>{const I=s.i;return <Card key={i} style={{padding:14,textAlign:"center"}}>
        <I size={18} color={s.c} style={{marginBottom:6}}/><div style={{fontSize:22,fontWeight:800}}>{s.v}</div>
        <div style={{fontSize:11,color:K.gray500,marginTop:3}}>{s.l}</div></Card>;})}
    </div>
    <div className="fu fu2" style={{display:"grid",gridTemplateColumns:"1fr 280px",gap:16}}>
      <Card style={{padding:0,overflow:"hidden"}}>
        <div style={{padding:"14px 18px",borderBottom:`1px solid ${K.gray100}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <Sec icon={FolderOpen} title="Dossiers récents" style={{marginBottom:0}}/>
          <Btn v="ghost" sz="sm" icon={Search}>Rechercher</Btn></div>
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
        <Card><Sec icon={PieChart} title="Par acteur"/>
          {Object.entries(TL).map(([k,l])=>{const cnt=d.recent.filter(r=>r.type===k).length;
            return <div key={k} style={{display:"flex",alignItems:"center",gap:7,marginBottom:8}}>
              <span style={{width:8,height:8,borderRadius:3,background:TC[k]}}/><span style={{fontSize:13,flex:1}}>{l}</span>
              <span style={{fontWeight:700,fontSize:13}}>{cnt}</span></div>;})}
        </Card>
        <Card><Sec icon={AlertTriangle} title="Alertes"/>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            <div style={{padding:9,borderRadius:7,background:K.warningLight,fontSize:12.5}}><strong>3</strong> dossiers en attente &gt; 7j</div>
            <div style={{padding:9,borderRadius:7,background:K.dangerLight,fontSize:12.5}}><strong>2</strong> pièces rejetées</div>
            <div style={{padding:9,borderRadius:7,background:K.infoLight,fontSize:12.5}}><strong>4</strong> en cours de revue</div>
          </div></Card>
      </div>
    </div>
  </div>;
};

/* ═══════════════════════════════════════════════════════
   SCREEN: PROSPECT
   ═══════════════════════════════════════════════════════ */
const SProspect=()=>{
  const [step,setStep]=useState(0),[form,setForm]=useState({});
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const steps=["Type de projet","Cadrage","Maturité","Intervenants","Coordonnées","Résumé"];
  const matScore=()=>{let s=0;if(form.has_land==="Oui")s++;if(form.has_feasibility==="Oui")s++;
    if(form.has_plans&&form.has_plans!=="Non")s++;if(form.has_quote&&form.has_quote!=="Non")s++;if(form.has_financing==="Oui")s++;return s;};
  const matLevel=()=>{const s=matScore();return s<=1?"Débutant":s<=3?"Intermédiaire":"Avancé"};
  const matColor=()=>{const s=matScore();return s<=1?K.warning:s<=3?K.info:K.success};

  const render=()=>{switch(step){
    case 0:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:5}}>Quel est votre type de projet ?</h3>
      <p style={{color:K.gray500,fontSize:13,marginBottom:16}}>Choisissez le besoin principal pour orienter votre parcours</p>
      <RadioCards field="project_type" form={form} set={set} cols={1} options={[
        {id:"new_build",label:"Construction neuve",desc:"Maison, duplex, immeuble, villa",icon:Building2},
        {id:"renovation",label:"Travaux de rénovation",desc:"Réhabilitation, extension, reprise",icon:Wrench},
        {id:"restart",label:"Reprise de chantier",desc:"Chantier arrêté ou inachevé",icon:RefreshCw},
        {id:"study_only",label:"Études / expertise",desc:"Faisabilité, audit, diagnostic",icon:BookOpen},
        {id:"fitout",label:"Agencement / ameublement",desc:"Aménagement intérieur, mobilier",icon:Layers},
      ]}/>
      <div style={{marginTop:16,display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        <Input label="Pays du projet" placeholder="Cameroun" field="project_country" req form={form} set={set}/>
        <Input label="Ville / zone" placeholder="Douala, Yaoundé…" field="project_city" req form={form} set={set}/>
      </div>
      <HelpBox icon={Lightbulb} title="Pourquoi cette question ?" color={K.primary}>
        Le type de projet détermine les compétences, les étapes et les partenaires qui vous seront proposés.</HelpBox>
    </div>;
    case 1:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:5}}>Cadrage initial</h3>
      <p style={{color:K.gray500,fontSize:13,marginBottom:16}}>Aidez-nous à comprendre votre objectif et votre horizon</p>
      <div style={{marginBottom:16}}><label style={{fontSize:13,fontWeight:600,marginBottom:7,display:"block"}}>Votre besoin principal</label>
        <RadioCards field="project_goal" form={form} set={set} cols={1} options={[
          {id:"full",label:"Être accompagné de A à Z",desc:"Projet complet"},
          {id:"step",label:"Avancer sur une étape précise",desc:"Besoin ciblé"},
          {id:"verify",label:"Faire vérifier ce qui existe",desc:"Audit / contrôle"},]}/></div>
      <div style={{marginBottom:16}}><label style={{fontSize:13,fontWeight:600,marginBottom:7,display:"block"}}>Type de bien</label>
        <Chips field="asset_type" form={form} set={set} options={["Maison","Duplex","Villa","Immeuble","Local commercial","Appartement","Autre"]}/></div>
      <div style={{marginBottom:16}}><label style={{fontSize:13,fontWeight:600,marginBottom:7,display:"block"}}>Budget indicatif</label>
        <Chips field="budget" form={form} set={set} options={["< 10M","10–25M","25–50M","50–100M","> 100M","Je ne sais pas"]}/></div>
      <div><label style={{fontSize:13,fontWeight:600,marginBottom:7,display:"block"}}>Délai visé</label>
        <Chips field="timeline" form={form} set={set} options={["Dès que possible","1–3 mois","3–6 mois","6–12 mois","Plus tard"]}/></div>
    </div>;
    case 2:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:5}}>Maturité du projet</h3>
      <p style={{color:K.gray500,fontSize:13,marginBottom:16}}>Situez-vous pour que nous adaptions nos recommandations</p>
      {[{f:"has_land",l:"Avez-vous un terrain ?",o:["Oui","Non","En cours"]},
        {f:"has_feasibility",l:"Étude de faisabilité ?",o:["Oui","Non","Je ne sais pas"]},
        {f:"has_plans",l:"Des plans ?",o:["Non","Esquisse","APS-APD","Plans détaillés"]},
        {f:"has_quote",l:"Un devis ?",o:["Non","Partiel","Global"]},
        {f:"has_financing",l:"Un financement ?",o:["Non","Partiel","Oui"]}
      ].map((q,i)=><div key={i} style={{marginBottom:14}}>
        <label style={{fontSize:13.5,fontWeight:600,marginBottom:6,display:"block"}}>{q.l}</label>
        <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>{q.o.map(o=>{const sel=form[q.f]===o;
          return <div key={o} onClick={()=>set(q.f,o)} style={{padding:"7px 16px",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:500,
            border:`1.5px solid ${sel?K.primary:K.gray200}`,background:sel?`${K.primary}0C`:K.white,color:sel?K.primary:K.gray700}}>{o}</div>;})}</div>
      </div>)}
      <Card style={{background:`${matColor()}06`,border:`1.5px solid ${matColor()}25`,padding:14}}>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <Score value={matScore()} max={5} size={52} color={matColor()}/>
          <div><div style={{fontWeight:700,fontSize:14}}>Avancement : {matLevel()}</div>
            <div style={{fontSize:12,color:K.gray500,marginTop:3}}>{matScore()}/5 critères — Calcul automatique</div></div></div></Card>
    </div>;
    case 3:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:16}}>Intervenants existants</h3>
      <div style={{marginBottom:16}}><label style={{fontSize:13.5,fontWeight:600,marginBottom:7,display:"block"}}>Travaillez-vous déjà avec…</label>
        {["Aucun","MOE / Architecte","Entrepreneur / MOEX","Technicien / Artisan","Plusieurs"].map(o=>{const sel=form.stakeholders===o;
          return <div key={o} onClick={()=>set("stakeholders",o)} style={{padding:"9px 13px",borderRadius:8,cursor:"pointer",marginBottom:5,
            border:`1.5px solid ${sel?K.primary:K.gray100}`,background:sel?`${K.primary}06`:K.white,fontSize:13.5,fontWeight:sel?600:400,
            color:sel?K.primary:K.dark,display:"flex",alignItems:"center",gap:9}}>
            <div style={{width:16,height:16,borderRadius:4,border:`2px solid ${sel?K.primary:K.gray300}`,display:"flex",alignItems:"center",justifyContent:"center"}}>
              {sel&&<CheckCircle2 size={10} color={K.primary}/>}</div>{o}</div>;})}</div>
      <div style={{marginBottom:16}}><label style={{fontSize:13.5,fontWeight:600,marginBottom:7,display:"block"}}>Besoin le plus urgent</label>
        <RadioCards field="need" form={form} set={set} cols={2} options={[
          {id:"terrain",label:"Trouver un terrain"},{id:"feasibility",label:"Vérifier la faisabilité"},
          {id:"plans",label:"Réaliser les plans"},{id:"quote",label:"Obtenir un devis"},
          {id:"financing",label:"Trouver un financement"},{id:"launch",label:"Lancer le chantier"}]}/></div>
      <HelpBox icon={ShieldCheck} title="Le rôle de l'AMOA" color={K.accent}>
        Si vous avez un MOE ou des documents, l'AMOA pourra les auditer et sécuriser votre parcours.</HelpBox>
    </div>;
    case 4:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:16}}>Vos coordonnées</h3>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        <Input label="Nom et prénom" placeholder="Ex. Rostand Ngameni" field="name" req form={form} set={set}/>
        <Input label="Téléphone" placeholder="+33 6…" field="phone" req type="tel" form={form} set={set}/>
        <Input label="E-mail" placeholder="nom@email.com" field="email" req type="email" form={form} set={set}/>
        <Input label="Pays de résidence" placeholder="France" field="country_res" req form={form} set={set}/></div>
      <div style={{marginBottom:14}}><label style={{fontSize:13,fontWeight:600,marginBottom:7,display:"block"}}>Canal préféré</label>
        <Chips field="channel" form={form} set={set} options={["Téléphone","WhatsApp","E-mail","Plateforme"]}/></div>
      <div onClick={()=>set("consent",!form.consent)} style={{display:"flex",alignItems:"flex-start",gap:9,cursor:"pointer",padding:11,borderRadius:8,
        background:form.consent?K.successLight:K.gray50}}>
        <div style={{width:18,height:18,borderRadius:4,border:`2px solid ${form.consent?K.success:K.gray300}`,background:form.consent?K.success:K.white,
          display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>
          {form.consent&&<CheckCircle2 size={11} color={K.white}/>}</div>
        <span style={{fontSize:12.5,color:K.gray700,lineHeight:1.5}}>J'accepte la création de mon dossier et le traitement de mes données par KOMA Expertise.</span></div>
    </div>;
    case 5:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:16}}>Résumé intelligent</h3>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:16}}>
        <Card style={{background:K.primaryLight,border:`1px solid ${K.primary}18`,padding:16}}>
          <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:10}}><Building2 size={16} color={K.primary}/><span style={{fontWeight:700,fontSize:13.5}}>Votre projet</span></div>
          <div style={{fontSize:13,color:K.gray700,lineHeight:1.8}}>
            <div><strong>Type :</strong> {form.project_type||"Construction neuve"}</div>
            <div><strong>Lieu :</strong> {form.project_city||"Douala"}, {form.project_country||"Cameroun"}</div>
            <div><strong>Budget :</strong> {form.budget||"25–50M"}</div>
            <div><strong>Délai :</strong> {form.timeline||"3–6 mois"}</div></div></Card>
        <Card style={{background:`${matColor()}06`,border:`1px solid ${matColor()}18`,padding:16}}>
          <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:10}}><TrendingUp size={16} color={matColor()}/><span style={{fontWeight:700,fontSize:13.5}}>Avancement</span></div>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <Score value={matScore()} max={5} size={52} color={matColor()}/>
            <div style={{fontSize:12.5,color:K.gray700,lineHeight:1.7}}>
              {["Terrain","Faisabilité","Plans","Devis","Financement"].map((l,i)=>{
                const fields=["has_land","has_feasibility","has_plans","has_quote","has_financing"];
                return <div key={i}>{l}: {form[fields[i]]||"Non"}</div>})}</div></div></Card></div>
      <Card style={{background:`linear-gradient(135deg,${K.accent}06,${K.primary}06)`,border:`1.5px solid ${K.accent}18`,padding:16,marginBottom:14}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><Sparkles size={17} color={K.accent}/>
          <span style={{fontWeight:700,fontSize:14.5,color:K.accent}}>Prochaine étape recommandée</span></div>
        <div style={{padding:"10px 14px",borderRadius:8,background:K.white,display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:40,height:40,borderRadius:10,background:K.accentLight,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <Target size={20} color={K.accent}/></div>
          <div style={{flex:1}}><div style={{fontWeight:700,fontSize:14}}>Étude de préfaisabilité</div>
            <div style={{fontSize:12.5,color:K.gray500}}>Valider la faisabilité technico-économique</div></div>
          <Badge color={K.success} pill>Recommandé</Badge></div></Card>
      <div style={{marginTop:16,padding:16,borderRadius:K.rSm,background:K.successLight,border:`1.5px solid ${K.success}20`,textAlign:"center"}}>
        <CheckCircle size={22} color={K.success}/>
        <div style={{fontWeight:700,fontSize:15,marginTop:7}}>Qualification terminée</div>
        <div style={{display:"flex",gap:10,justifyContent:"center",marginTop:14}}>
          <Btn icon={ArrowRight}>Créer mon dossier</Btn><Btn v="outline">Compléter plus tard</Btn></div></div>
    </div>;
    default:return null;}};

  return <div>
    <HeroBanner icon={User} title="Parcours Client / Prospect" color={K.primary}
      sub="Qualifiez votre projet immobilier en quelques étapes simples et guidées" time="~3 min"/>
    <Journey steps={steps} current={step} setCurrent={setStep} color={K.primary} renderStep={render}/>
  </div>;
};

/* ═══════════════════════════════════════════════════════
   SCREEN: AMOA (full journey)
   ═══════════════════════════════════════════════════════ */
const SAMOA=()=>{
  const [step,setStep]=useState(0),[form,setForm]=useState({});
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const steps=["Structure","Positionnement","Références","Conformité","Équipe","Modalités","Résumé"];
  const p=MOCK.amoa;

  const render=()=>{switch(step){
    case 0:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:5}}>Type de structure</h3>
      <p style={{color:K.gray500,fontSize:13,marginBottom:16}}>Êtes-vous une entreprise ou un indépendant ?</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
        {[{id:"entreprise",l:"Entreprise",d:"Cabinet, société, BET",i:Building2},
          {id:"independant",l:"Indépendant",d:"Expert, consultant individuel",i:User}].map(o=>{
          const sel=form.structure===o.id;
          return <Card key={o.id} onClick={()=>set("structure",o.id)} style={{textAlign:"center",padding:22,
            border:`2px solid ${sel?K.accent:K.gray200}`,background:sel?K.accentLight:K.white}}>
            <o.i size={28} color={sel?K.accent:K.gray400}/><div style={{fontWeight:700,fontSize:15,marginTop:8}}>{o.l}</div>
            <div style={{fontSize:12.5,color:K.gray500,marginTop:3}}>{o.d}</div></Card>;})}
      </div>
      <HelpBox icon={Building2} title="Pour les entreprises" color={K.accent}>
        Vous pourrez ensuite ajouter vos collaborateurs et leur attribuer des rôles spécifiques sur la plateforme.</HelpBox>
    </div>;
    case 1:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:16}}>Positionnement métier</h3>
      <div style={{marginBottom:16}}><label style={{fontSize:13,fontWeight:600,marginBottom:8,display:"block"}}>Missions couvertes</label>
        <div style={{display:"flex",flexWrap:"wrap",gap:7}}>{p.missions.map(m=>
          <Badge key={m} color={K.accent} pill><CheckCircle2 size={11}/>{m}</Badge>)}</div></div>
      <div style={{marginBottom:16}}><label style={{fontSize:13,fontWeight:600,marginBottom:8,display:"block"}}>Phases couvertes</label>
        <div style={{display:"flex",gap:4}}>{p.phases.map((ph,i)=>
          <div key={ph} style={{flex:1,textAlign:"center",padding:"9px 5px",borderRadius:7,
            background:`${K.accent}${String(8+i*4).padStart(2,'0')}`,fontSize:12,fontWeight:500}}>{ph}</div>)}</div></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        <Input label="Zone d'intervention" placeholder="Douala, Yaoundé…" field="zone" form={form} set={set}/>
        <Input label="Années d'expérience" placeholder="8" field="exp" form={form} set={set}/></div>
      <HelpBox icon={Lightbulb} title="Ce que cela débloque" color={K.info}>
        Un positionnement clair permet à KOMA de vous proposer les projets les plus adaptés à votre expertise.</HelpBox>
    </div>;
    case 2:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:16}}>Références et expérience</h3>
      <p style={{color:K.gray500,fontSize:13,marginBottom:14}}>Ajoutez vos projets de référence pour renforcer votre profil</p>
      {[{n:"Villa Akwa — Douala",y:2024,b:"85M FCFA",r:"AMOA complète"},
        {n:"Immeuble R+4 — Yaoundé",y:2023,b:"320M FCFA",r:"Contrôle qualité"},
        {n:"Résidence Bali — Douala",y:2022,b:"150M FCFA",r:"Suivi conformité"}].map((ref,i)=>
        <Card key={i} style={{marginBottom:8,padding:12}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><div style={{fontWeight:600,fontSize:13.5}}>{ref.n}</div>
              <div style={{fontSize:12,color:K.gray500,marginTop:2}}>{ref.r} · {ref.y} · {ref.b}</div></div>
            <Badge color={K.success} sm pill><Star size={10}/>Vérifié</Badge></div></Card>)}
      <Btn v="outline" sz="sm" icon={UserPlus} style={{marginTop:6}}>Ajouter une référence</Btn>
    </div>;
    case 3:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:5}}>Conformité documentaire</h3>
      <p style={{color:K.gray500,fontSize:13,marginBottom:14}}>Déposez les pièces requises pour finaliser votre dossier</p>
      <div style={{marginBottom:12,fontSize:12.5,color:K.warning,fontWeight:500,display:"flex",alignItems:"center",gap:5}}>
        <AlertCircle size={13}/> {p.docs.filter(d=>d.s==="missing").length} pièce(s) manquante(s)</div>
      {p.docs.map((doc,i)=>{const m={ok:{c:K.success,l:"Validée"},review:{c:K.info,l:"En revue"},received:{c:K.warning,l:"Reçue"},missing:{c:K.danger,l:"Manquante"}};
        const s=m[doc.s];return <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:7,marginBottom:4,
          border:`1px solid ${doc.s==="missing"?K.danger+"20":K.gray100}`,background:doc.s==="missing"?K.dangerLight:"transparent"}}>
          <FileText size={16} color={s.c}/><span style={{flex:1,fontSize:13.5,fontWeight:500}}>{doc.n}</span>
          <Badge color={s.c} sm>{s.l}</Badge>
          {doc.s==="missing"&&<Btn v="outline" sz="sm" icon={Upload}>Déposer</Btn>}</div>;})}
      <div style={{marginTop:14,padding:18,borderRadius:K.rSm,border:`2px dashed ${K.gray300}`,textAlign:"center",color:K.gray500,cursor:"pointer"}}>
        <Upload size={22} style={{marginBottom:6}}/><br/><span style={{fontWeight:500}}>Glissez vos fichiers ici</span>
        <br/><span style={{fontSize:12}}>PDF, JPG, PNG — 10 Mo max</span></div>
    </div>;
    case 4:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:16}}>Équipe projet</h3>
      {p.team.map((m,i)=><Card key={i} style={{marginBottom:8,padding:12,display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:36,height:36,borderRadius:"50%",background:K.accentLight,display:"flex",alignItems:"center",justifyContent:"center",
          fontWeight:700,fontSize:13,color:K.accent}}>{m.n.split(" ").map(w=>w[0]).join("")}</div>
        <div style={{flex:1}}><div style={{fontWeight:600,fontSize:13.5}}>{m.n}</div>
          <div style={{fontSize:12,color:K.gray500}}>{m.r}</div></div>
        <StatusDot status={m.s==="actif"?"active":"invite"}/></Card>)}
      <Btn v="outline" sz="sm" icon={UserPlus} style={{marginTop:6}}>Ajouter un collaborateur</Btn>
    </div>;
    case 5:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:16}}>Modalités opérationnelles</h3>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {[{l:"Délai moyen de réponse",v:"24–48h"},{l:"Fréquence reporting",v:"Hebdomadaire"},
          {l:"Capacité terrain",v:"3 chantiers"},{l:"Compatibilité KOMA",v:"Templates validés"}].map((it,i)=>
          <Card key={i} style={{padding:12}}><div style={{fontSize:12,color:K.gray500,marginBottom:3}}>{it.l}</div>
            <div style={{fontSize:14.5,fontWeight:600}}>{it.v}</div></Card>)}</div>
      <HelpBox icon={Lightbulb} title="Pourquoi ces informations ?" color={K.info}>
        Elles permettent d'évaluer votre capacité d'engagement et de réactivité sur les projets KOMA.</HelpBox>
    </div>;
    case 6:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:16}}>Résumé de qualification AMOA</h3>
      <Card style={{padding:18,background:`linear-gradient(135deg,${K.accent}06,${K.primary}04)`,border:`1.5px solid ${K.accent}18`,marginBottom:14}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
          <div style={{width:48,height:48,borderRadius:12,background:K.accentLight,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <ShieldCheck size={24} color={K.accent}/></div>
          <div style={{flex:1}}><div style={{fontWeight:700,fontSize:17}}>{p.name}</div>
            <div style={{fontSize:13,color:K.gray500}}>{p.type} — {p.zone}</div></div>
          <StatusDot status="qualifie"/></div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12}}>
          {Object.entries(p.scores).map(([k,v])=>
            <Score key={k} value={v} label={k.charAt(0).toUpperCase()+k.slice(1)} size={60}
              color={k==="global"?K.primary:k==="conformite"?K.success:k==="capacite"?K.info:k==="fiabilite"?K.accent:K.moe}/>)}</div></Card>
      <HelpBox icon={Sparkles} title="Recommandation système" color={K.accent}>
        AMOA qualifié — Profil solide, 8 ans, 34 projets. 1 pièce manquante avant activation complète.</HelpBox>
      <div style={{display:"flex",gap:10,justifyContent:"center",marginTop:16}}>
        <Btn v="accent" icon={CheckCircle}>Approuver et activer</Btn><Btn v="outline">Demander compléments</Btn></div>
    </div>;
    default:return null;}};

  return <div>
    <HeroBanner icon={ShieldCheck} title="Parcours AMOA" color={K.accent}
      sub="Qualification partenaire — Assistance à Maîtrise d'Ouvrage" time="~5 min" badge="Entreprise"/>
    <Journey steps={steps} current={step} setCurrent={setStep} color={K.accent} renderStep={render}/>
  </div>;
};

/* ═══════════════════════════════════════════════════════
   SCREEN: MOE — FULL JOURNEY (9 steps)
   ═══════════════════════════════════════════════════════ */
const SMOE=()=>{
  const [step,setStep]=useState(0),[form,setForm]=useState({});
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const steps=["Structure","Spécialités","Phases","Livrables","Qualité","Conformité","Équipe","Workflow","Résumé"];
  const p=MOCK.moe;

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
      <HelpBox icon={Lightbulb} title="Ce que cela débloque" color={K.moe}>
        Permet à KOMA de vous orienter vers les projets adaptés à votre profil et votre zone.</HelpBox>
    </div>;
    case 1:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:5}}>Spécialités techniques</h3>
      <p style={{color:K.gray500,fontSize:13,marginBottom:16}}>Quelles disciplines maîtrisez-vous ?</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        {["Architecture","Structure / Génie civil","Fluides / CVC","Électricité","Économie construction","VRD","Coordination OPC","Paysagisme"].map(sp=>{
          const sel=(form.specialties||[]).includes(sp);
          return <div key={sp} onClick={()=>set("specialties",sel?(form.specialties||[]).filter(s=>s!==sp):[...(form.specialties||[]),sp])}
            style={{padding:"9px 13px",borderRadius:8,cursor:"pointer",border:`1.5px solid ${sel?K.moe:K.gray200}`,
              background:sel?K.moeLight:K.white,fontSize:13,fontWeight:sel?600:400,color:sel?K.moe:K.dark,
              display:"flex",alignItems:"center",gap:7}}>
            <div style={{width:16,height:16,borderRadius:4,border:`2px solid ${sel?K.moe:K.gray300}`,background:sel?K.moe:K.white,
              display:"flex",alignItems:"center",justifyContent:"center"}}>{sel&&<CheckCircle2 size={10} color={K.white}/>}</div>{sp}</div>;})}
      </div>
      <div style={{marginTop:14}}><label style={{fontSize:13,fontWeight:600,marginBottom:7,display:"block"}}>Typologies de projets</label>
        <Chips field="project_types" form={form} set={set} options={["Résidentiel","Tertiaire","Industriel","Infrastructure","Mixte"]}/></div>
    </div>;
    case 2:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:5}}>Phases maîtrisées</h3>
      <p style={{color:K.gray500,fontSize:13,marginBottom:16}}>Indiquez les phases que vous pouvez couvrir</p>
      <div style={{display:"flex",gap:8,marginBottom:16}}>
        {Object.entries(p.phases).map(([ph,ok])=><div key={ph} style={{flex:1,textAlign:"center",padding:"12px 8px",borderRadius:8,
          border:`2px solid ${ok?K.success:K.gray200}`,background:ok?K.successLight:K.white,cursor:"pointer"}}
          onClick={()=>set(`phase_${ph}`,!form[`phase_${ph}`])}>
          <div style={{fontWeight:700,fontSize:15,color:ok?K.success:K.gray400}}>{ph}</div>
          <div style={{fontSize:11,color:K.gray500,marginTop:3}}>{ok?"Maîtrisé":"Non couvert"}</div>
          {ok&&<CheckCircle2 size={14} color={K.success} style={{marginTop:4}}/>}</div>)}</div>
      <HelpBox icon={Info} title="Pourquoi c'est important" color={K.moe}>
        La maîtrise des phases APS, APD, PRO, DCE et ACT détermine votre niveau de qualification et les missions accessibles.</HelpBox>
    </div>;
    case 3:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:5}}>Livrables et portfolio</h3>
      <p style={{color:K.gray500,fontSize:13,marginBottom:16}}>Quels types de livrables savez-vous produire ?</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}>
        {p.livrables.map((l,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:7,padding:"9px 12px",borderRadius:7,
          background:K.moeLight,border:`1px solid ${K.moe}15`,fontSize:13,fontWeight:500}}>
          <CheckCircle2 size={13} color={K.moe}/>{l}</div>)}</div>
      <Sec icon={Star} title="Références projets"/>
      {p.refs.map((ref,i)=><Card key={i} style={{marginBottom:8,padding:12}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div><div style={{fontWeight:600,fontSize:13.5}}>{ref.n}</div>
            <div style={{fontSize:12,color:K.gray500,marginTop:2}}>{ref.r} · {ref.y} · {ref.b} FCFA</div></div>
          <Badge color={K.success} sm pill><Star size={10}/>Vérifié</Badge></div></Card>)}
      <Btn v="outline" sz="sm" icon={Upload} style={{marginTop:6}}>Ajouter un livrable / référence</Btn>
    </div>;
    case 4:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:5}}>Qualité et méthode</h3>
      <p style={{color:K.gray500,fontSize:13,marginBottom:16}}>Comment gérez-vous la qualité de vos livrables ?</p>
      {["Revue interne systématique","Versioning documentaire","Gestion des itérations","Checklists qualité","Compatibilité templates KOMA","Coordination BIM / CAO"].map(q=>{
        const sel=(form.quality||[]).includes(q);
        return <div key={q} onClick={()=>set("quality",sel?(form.quality||[]).filter(s=>s!==q):[...(form.quality||[]),q])}
          style={{padding:"9px 13px",borderRadius:8,cursor:"pointer",marginBottom:5,
            border:`1.5px solid ${sel?K.moe:K.gray200}`,background:sel?K.moeLight:K.white,fontSize:13,fontWeight:sel?600:400,
            display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:16,height:16,borderRadius:4,border:`2px solid ${sel?K.moe:K.gray300}`,background:sel?K.moe:K.white,
            display:"flex",alignItems:"center",justifyContent:"center"}}>{sel&&<CheckCircle2 size={10} color={K.white}/>}</div>{q}</div>;})}
      <HelpBox icon={Award} title="Ce que cela débloque" color={K.moe}>
        Un process qualité structuré vous donne accès aux projets de conception complexe et aux missions sensibles.</HelpBox>
    </div>;
    case 5:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:5}}>Conformité documentaire</h3>
      <p style={{color:K.gray500,fontSize:13,marginBottom:14}}>Pièces requises pour finaliser votre qualification</p>
      {[{n:"Inscription Ordre des Architectes",s:"ok"},{n:"Attestation RC Pro",s:"review"},{n:"Assurance décennale",s:"missing"},
        {n:"NIU / Carte contribuable",s:"ok"},{n:"Portfolio / Book",s:"received"}].map((doc,i)=>{
        const m={ok:{c:K.success,l:"Validée"},review:{c:K.info,l:"En revue"},received:{c:K.warning,l:"Reçue"},missing:{c:K.danger,l:"Manquante"}};
        const s=m[doc.s];return <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 11px",borderRadius:7,marginBottom:4,
          border:`1px solid ${doc.s==="missing"?K.danger+"20":K.gray100}`,background:doc.s==="missing"?K.dangerLight:"transparent"}}>
          <FileText size={15} color={s.c}/><span style={{flex:1,fontSize:13,fontWeight:500}}>{doc.n}</span>
          <Badge color={s.c} sm>{s.l}</Badge>{doc.s==="missing"&&<Btn v="outline" sz="sm" icon={Upload}>Déposer</Btn>}</div>;})}
    </div>;
    case 6:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:16}}>Équipe et ressources</h3>
      <p style={{color:K.gray500,fontSize:13,marginBottom:14}}>Pour les cabinets : présentez vos collaborateurs clés</p>
      {[{n:"Jean-Paul Fotso",r:"Architecte principal",s:"actif"},{n:"Marie Talla",r:"Économiste",s:"actif"},
        {n:"Éric Ndjock",r:"Dessinateur projeteur",s:"invite"}].map((m,i)=>
        <Card key={i} style={{marginBottom:8,padding:11,display:"flex",alignItems:"center",gap:11}}>
          <div style={{width:34,height:34,borderRadius:"50%",background:K.moeLight,display:"flex",alignItems:"center",justifyContent:"center",
            fontWeight:700,fontSize:12,color:K.moe}}>{m.n.split(" ").map(w=>w[0]).join("")}</div>
          <div style={{flex:1}}><div style={{fontWeight:600,fontSize:13}}>{m.n}</div>
            <div style={{fontSize:12,color:K.gray500}}>{m.r}</div></div>
          <StatusDot status={m.s==="actif"?"active":"invite"}/></Card>)}
      <Btn v="outline" sz="sm" icon={UserPlus} style={{marginTop:6}}>Ajouter un collaborateur</Btn>
    </div>;
    case 7:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:16}}>Workflow et modalités</h3>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
        {[{l:"Délai livraison APS",v:"2–3 semaines"},{l:"Délai livraison APD",v:"4–6 semaines"},
          {l:"Outils CAO",v:"AutoCAD, Revit"},{l:"Format de livraison",v:"PDF, DWG, IFC"},
          {l:"Méthode de coordination",v:"BIM niveau 2"},{l:"Gestion versions",v:"Nomenclature KOMA"}].map((it,i)=>
          <Card key={i} style={{padding:11}}><div style={{fontSize:12,color:K.gray500,marginBottom:2}}>{it.l}</div>
            <div style={{fontSize:14,fontWeight:600}}>{it.v}</div></Card>)}</div>
      <HelpBox icon={Workflow} title="Compatibilité KOMA" color={K.moe}>
        L'utilisation des templates et nomenclatures KOMA facilite l'intégration et accélère les validations.</HelpBox>
    </div>;
    case 8:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:16}}>Résumé de qualification MOE</h3>
      <Card style={{padding:18,background:`linear-gradient(135deg,${K.moe}06,${K.primary}04)`,border:`1.5px solid ${K.moe}18`,marginBottom:14}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
          <div style={{width:48,height:48,borderRadius:12,background:K.moeLight,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <Ruler size={24} color={K.moe}/></div>
          <div style={{flex:1}}><div style={{fontWeight:700,fontSize:17}}>{p.name}</div>
            <div style={{fontSize:13,color:K.gray500}}>{p.type} — {p.specs.join(", ")}</div></div>
          <StatusDot status="qualifie"/></div>
        <div style={{display:"flex",gap:6,marginBottom:16}}>
          {Object.entries(p.phases).map(([ph,ok])=><div key={ph} style={{padding:"6px 14px",borderRadius:7,fontSize:13,fontWeight:600,
            background:ok?K.successLight:`${K.gray200}40`,color:ok?K.success:K.gray400,display:"flex",alignItems:"center",gap:5}}>
            {ok?<CheckCircle2 size={13}/>:<XCircle size={13}/>}{ph}</div>)}</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10}}>
          {Object.entries(p.scores).map(([k,v])=>
            <Score key={k} value={v} label={k.charAt(0).toUpperCase()+k.slice(1)} size={58}
              color={k==="global"?K.primary:k==="qualite"?K.success:k==="process"?K.info:k==="conformite"?K.moe:K.accent}/>)}</div></Card>
      <Card style={{padding:12,background:K.successLight,border:`1px solid ${K.success}18`,marginBottom:14}}>
        <div style={{fontWeight:700,fontSize:14,color:K.success,marginBottom:3}}>Conception standard</div>
        <div style={{fontSize:13,color:K.gray700}}>MOE validé pour projets résidentiels et petits immeubles. Phases DCE/ACT à renforcer.</div></Card>
      <div style={{display:"flex",gap:10,justifyContent:"center"}}>
        <Btn v="moe" icon={CheckCircle}>Approuver et activer</Btn><Btn v="outline">Demander compléments</Btn></div>
    </div>;
    default:return null;}};

  return <div>
    <HeroBanner icon={Ruler} title="Parcours MOE" color={K.moe}
      sub="Qualification Maîtrise d'Œuvre — Conception technique, architecture, ingénierie" time="~5 min" badge={p.type}/>
    <Journey steps={steps} current={step} setCurrent={setStep} color={K.moe} renderStep={render}
      sideInfo={<HelpBox icon={Ruler} color={K.moe}>Le parcours MOE qualifie votre rigueur technique, vos livrables et votre méthode de conception.</HelpBox>}/>
  </div>;
};

/* ═══════════════════════════════════════════════════════
   SCREEN: MOEX — FULL JOURNEY (9 steps)
   ═══════════════════════════════════════════════════════ */
const SMOEX=()=>{
  const [step,setStep]=useState(0),[form,setForm]=useState({});
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const steps=["Structure","Capacités","Chantier","Reporting","HSE","Équipe","Outils","Pilotage","Résumé"];
  const p=MOCK.moex;

  const render=()=>{switch(step){
    case 0:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:5}}>Type de structure</h3>
      <p style={{color:K.gray500,fontSize:13,marginBottom:16}}>Entreprise de travaux, conducteur indépendant ou société de pilotage ?</p>
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
      <p style={{color:K.gray500,fontSize:13,marginBottom:16}}>Évaluons votre capacité de pilotage simultané et votre périmètre</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
        <Input label="Chantiers simultanés" placeholder="5" field="simultaneous" form={form} set={set}/>
        <Input label="Expérience (années)" placeholder="10" field="exp" form={form} set={set}/></div>
      <div style={{marginBottom:14}}><label style={{fontSize:13,fontWeight:600,marginBottom:7,display:"block"}}>Capacités couvertes</label>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
          {p.capacities.map(c=>{const sel=(form.caps||[]).includes(c);
            return <div key={c} onClick={()=>set("caps",sel?(form.caps||[]).filter(s=>s!==c):[...(form.caps||[]),c])}
              style={{padding:"8px 12px",borderRadius:7,cursor:"pointer",border:`1.5px solid ${sel?K.moex:K.gray200}`,
                background:sel?K.moexLight:K.white,fontSize:13,fontWeight:sel?600:400,display:"flex",alignItems:"center",gap:7}}>
              <div style={{width:15,height:15,borderRadius:3,border:`2px solid ${sel?K.moex:K.gray300}`,background:sel?K.moex:K.white,
                display:"flex",alignItems:"center",justifyContent:"center"}}>{sel&&<CheckCircle2 size={9} color={K.white}/>}</div>{c}</div>;})}
        </div></div>
      <HelpBox icon={Gauge} title="Ce que cela débloque" color={K.moex}>
        Une capacité élevée vous qualifie pour les chantiers complexes et multi-lots.</HelpBox>
    </div>;
    case 2:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:5}}>Expérience chantier</h3>
      <p style={{color:K.gray500,fontSize:13,marginBottom:14}}>Vos projets de référence sur le terrain</p>
      <div style={{marginBottom:14}}><label style={{fontSize:13,fontWeight:600,marginBottom:7,display:"block"}}>Types de projets réalisés</label>
        <Chips field="project_types" form={form} set={set} options={["Résidentiel","Immeuble","Commercial","Industriel","Infrastructure"]}/></div>
      {p.refs.map((ref,i)=><Card key={i} style={{marginBottom:8,padding:12}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div><div style={{fontWeight:600,fontSize:13.5}}>{ref.n}</div>
            <div style={{fontSize:12,color:K.gray500,marginTop:2}}>{ref.y} · {ref.b} FCFA</div></div>
          <Badge color={K.success} sm pill><Star size={10}/>Vérifié</Badge></div></Card>)}
      <Btn v="outline" sz="sm" icon={UserPlus} style={{marginTop:6}}>Ajouter une référence chantier</Btn>
    </div>;
    case 3:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:5}}>Reporting et preuves</h3>
      <p style={{color:K.gray500,fontSize:13,marginBottom:16}}>La qualité du reporting terrain est un critère majeur de qualification</p>
      {["Rapport journalier systématique","Photos horodatées","Vidéos de progression","Remontée besoins en temps réel",
        "Suivi quantitatif (tâches/stock)","Utilisation smartphone/tablette","Gestion alertes bloquantes"].map(q=>{const sel=(form.reporting||[]).includes(q);
        return <div key={q} onClick={()=>set("reporting",sel?(form.reporting||[]).filter(s=>s!==q):[...(form.reporting||[]),q])}
          style={{padding:"9px 12px",borderRadius:7,cursor:"pointer",marginBottom:4,border:`1.5px solid ${sel?K.moex:K.gray200}`,
            background:sel?K.moexLight:K.white,fontSize:13,fontWeight:sel?600:400,display:"flex",alignItems:"center",gap:7}}>
          <div style={{width:15,height:15,borderRadius:3,border:`2px solid ${sel?K.moex:K.gray300}`,background:sel?K.moex:K.white,
            display:"flex",alignItems:"center",justifyContent:"center"}}>{sel&&<CheckCircle2 size={9} color={K.white}/>}</div>{q}</div>;})}
      <HelpBox icon={Camera} title="Pourquoi le reporting est critique" color={K.moex}>
        Un MOEX fiable remonte des données terrain vérifiables. C'est la base de confiance pour le client et l'AMOA.</HelpBox>
    </div>;
    case 4:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:5}}>Hygiène, Sécurité, Environnement</h3>
      <p style={{color:K.gray500,fontSize:13,marginBottom:16}}>La discipline HSE est un critère d'éligibilité sur KOMA</p>
      {["Formation HSE équipe","EPI systématiques","Signalisation chantier","Gestion déchets","Plan de prévention",
        "Registre incidents","Audit sécurité périodique"].map(q=>{const sel=(form.hse||[]).includes(q);
        return <div key={q} onClick={()=>set("hse",sel?(form.hse||[]).filter(s=>s!==q):[...(form.hse||[]),q])}
          style={{padding:"9px 12px",borderRadius:7,cursor:"pointer",marginBottom:4,border:`1.5px solid ${sel?K.moex:K.gray200}`,
            background:sel?K.moexLight:K.white,fontSize:13,fontWeight:sel?600:400,display:"flex",alignItems:"center",gap:7}}>
          <div style={{width:15,height:15,borderRadius:3,border:`2px solid ${sel?K.moex:K.gray300}`,background:sel?K.moex:K.white,
            display:"flex",alignItems:"center",justifyContent:"center"}}>{sel&&<CheckCircle2 size={9} color={K.white}/>}</div>{q}</div>;})}
    </div>;
    case 5:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:16}}>Équipe terrain</h3>
      {[{n:"Amadou Bello",r:"Chef de chantier",s:"actif"},{n:"Thierry Ngo",r:"Conducteur travaux",s:"actif"},
        {n:"Sandrine Eyenga",r:"Responsable HSE",s:"invite"}].map((m,i)=>
        <Card key={i} style={{marginBottom:8,padding:11,display:"flex",alignItems:"center",gap:11}}>
          <div style={{width:34,height:34,borderRadius:"50%",background:K.moexLight,display:"flex",alignItems:"center",justifyContent:"center",
            fontWeight:700,fontSize:12,color:K.moex}}>{m.n.split(" ").map(w=>w[0]).join("")}</div>
          <div style={{flex:1}}><div style={{fontWeight:600,fontSize:13}}>{m.n}</div>
            <div style={{fontSize:12,color:K.gray500}}>{m.r}</div></div>
          <StatusDot status={m.s==="actif"?"active":"invite"}/></Card>)}
      <Btn v="outline" sz="sm" icon={UserPlus} style={{marginTop:6}}>Ajouter un collaborateur</Btn>
    </div>;
    case 6:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:5}}>Outils et équipement numérique</h3>
      <p style={{color:K.gray500,fontSize:13,marginBottom:16}}>La maîtrise des outils numériques facilite l'intégration KOMA</p>
      {["Smartphone terrain","Tablette chantier","Application de suivi","GPS / géolocalisation",
        "Drone (optionnel)","Connexion internet fiable"].map(q=>{const sel=(form.tools||[]).includes(q);
        return <div key={q} onClick={()=>set("tools",sel?(form.tools||[]).filter(s=>s!==q):[...(form.tools||[]),q])}
          style={{padding:"9px 12px",borderRadius:7,cursor:"pointer",marginBottom:4,border:`1.5px solid ${sel?K.moex:K.gray200}`,
            background:sel?K.moexLight:K.white,fontSize:13,fontWeight:sel?600:400,display:"flex",alignItems:"center",gap:7}}>
          <div style={{width:15,height:15,borderRadius:3,border:`2px solid ${sel?K.moex:K.gray300}`,background:sel?K.moex:K.white,
            display:"flex",alignItems:"center",justifyContent:"center"}}>{sel&&<CheckCircle2 size={9} color={K.white}/>}</div>{q}</div>;})}
    </div>;
    case 7:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:16}}>Pilotage chantier</h3>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
        {[{l:"Méthode de pilotage",v:"Réunion hebdo + journal quotidien"},{l:"Fréquence reporting",v:"Quotidien"},
          {l:"Disponibilité site",v:"6j/7"},{l:"Coordination AMOA",v:"Point hebdo + alertes temps réel"},
          {l:"Gestion sous-traitants",v:"Suivi intégré"},{l:"Réactivité alerte",v:"< 2h"}].map((it,i)=>
          <Card key={i} style={{padding:11}}><div style={{fontSize:12,color:K.gray500,marginBottom:2}}>{it.l}</div>
            <div style={{fontSize:14,fontWeight:600}}>{it.v}</div></Card>)}</div>
      <HelpBox icon={Target} title="Aptitude à collaborer" color={K.moex}>
        Un MOEX intégré dans le workflow KOMA garantit un suivi fluide entre le terrain, le SPOC, l'AMOA et le client.</HelpBox>
    </div>;
    case 8:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:16}}>Résumé de qualification MOEX</h3>
      <Card style={{padding:18,background:`linear-gradient(135deg,${K.moex}06,${K.primary}04)`,border:`1.5px solid ${K.moex}18`,marginBottom:14}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
          <div style={{width:48,height:48,borderRadius:12,background:K.moexLight,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <HardHat size={24} color={K.moex}/></div>
          <div style={{flex:1}}><div style={{fontWeight:700,fontSize:17}}>{p.name}</div>
            <div style={{fontSize:13,color:K.gray500}}>{p.type} — Capacité : {p.cap}</div></div>
          <StatusDot status="prequalifie"/></div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10}}>
          {Object.entries(p.scores).map(([k,v])=>
            <Score key={k} value={v} label={k.charAt(0).toUpperCase()+k.slice(1)} size={58}
              color={k==="global"?K.primary:k==="terrain"?K.moex:k==="reporting"?K.info:k==="process"?K.accent:K.success}/>)}</div></Card>
      <Card style={{padding:12,background:K.warningLight,border:`1px solid ${K.warning}18`,marginBottom:14}}>
        <div style={{fontWeight:700,fontSize:14,color:K.warning,marginBottom:3}}>Mission standard — Supervision recommandée</div>
        <div style={{fontSize:13,color:K.gray700}}>Score reporting à renforcer. Mission pilote supervisée conseillée avant autonomie.</div></Card>
      <div style={{display:"flex",gap:10,justifyContent:"center"}}>
        <Btn v="moex" icon={CheckCircle}>Approuver</Btn><Btn v="outline">Demander compléments</Btn><Btn v="ghost" icon={Play}>Mission pilote</Btn></div>
    </div>;
    default:return null;}};

  return <div>
    <HeroBanner icon={HardHat} title="Parcours MOEX" color={K.moex}
      sub="Qualification Maîtrise d'Œuvre d'Exécution — Terrain, chantier, pilotage opérationnel" time="~5 min" badge={p.type}/>
    <Journey steps={steps} current={step} setCurrent={setStep} color={K.moex} renderStep={render}
      sideInfo={<HelpBox icon={HardHat} color={K.moex}>Le parcours MOEX évalue votre discipline terrain, vos capacités de reporting et votre fiabilité opérationnelle.</HelpBox>}/>
  </div>;
};

/* ═══════════════════════════════════════════════════════
   SCREEN: SPOC (9 steps)
   ═══════════════════════════════════════════════════════ */
const SSPOC=()=>{
  const [step,setStep]=useState(0),[form,setForm]=useState({});
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const steps=["Profil","Portefeuille","Modules","Arbitrage","Relation client","Coordination","Finance","Test","Habilitation"];
  const p=MOCK.spoc;

  const render=()=>{switch(step){
    case 0:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:16}}>Profil collaborateur</h3>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        <Input label="Nom complet" placeholder="Nadège Mbarga" field="name" req form={form} set={set}/>
        <Input label="Seniorité" placeholder="Senior" field="seniority" form={form} set={set}/>
        <Input label="Zone / Portefeuille" placeholder="Afrique Centrale" field="zone" form={form} set={set}/>
        <Input label="Type de clients gérés" placeholder="Diaspora, locaux" field="clients" form={form} set={set}/></div>
    </div>;
    case 1:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:16}}>Portefeuille autorisé</h3>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
        {[{l:"Projets actifs",v:"12"},{l:"Clients suivis",v:"8"},{l:"Budget total",v:"1.2 Md FCFA"}].map((it,i)=>
          <Card key={i} style={{textAlign:"center",padding:16}}>
            <div style={{fontSize:24,fontWeight:800,color:K.secondary}}>{it.v}</div>
            <div style={{fontSize:12,color:K.gray500,marginTop:4}}>{it.l}</div></Card>)}</div>
    </div>;
    case 2:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:5}}>Modules à maîtriser</h3>
      <p style={{color:K.gray500,fontSize:13,marginBottom:14}}>Évaluez votre maîtrise de chaque module KOMA</p>
      <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
        {p.modules.map(m=><div key={m} style={{padding:"6px 12px",borderRadius:6,background:`${K.secondary}0C`,
          fontSize:12,fontWeight:500,color:K.secondary,display:"flex",alignItems:"center",gap:4}}>
          <CheckCircle2 size={11}/>{m}</div>)}</div>
    </div>;
    case 3:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:16}}>Règles d'arbitrage</h3>
      {["Priorisation des alertes critiques","Gestion des conflits entre acteurs","Escalade vers la direction",
        "Arbitrage budgétaire","Décision Go/No Go terrain"].map(r=>
        <div key={r} style={{display:"flex",alignItems:"center",gap:8,padding:"9px 0",borderBottom:`1px solid ${K.gray50}`,fontSize:13}}>
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
          <Card key={i} style={{padding:11}}><div style={{fontSize:12,color:K.gray500,marginBottom:2}}>{it.l}</div>
            <div style={{fontSize:14,fontWeight:600}}>{it.v}</div></Card>)}</div></div>;
    case 6:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:16}}>Finance et relance</h3>
      {["Suivi facturation client","Relance paiements","Priorisation achats terrain","Contrôle budgétaire projet",
        "Validation devis fournisseurs"].map(r=>
        <div key={r} style={{display:"flex",alignItems:"center",gap:8,padding:"9px 0",borderBottom:`1px solid ${K.gray50}`,fontSize:13}}>
          <CheckCircle2 size={14} color={K.success}/>{r}</div>)}</div>;
    case 7:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:16}}>Test de compréhension</h3>
      <Card style={{background:K.secondaryLight,border:`1.5px solid ${K.secondary}20`,padding:16,textAlign:"center"}}>
        <GraduationCap size={28} color={K.secondary}/><div style={{fontWeight:700,fontSize:15,marginTop:8}}>Évaluation en cours</div>
        <div style={{fontSize:13,color:K.gray500,marginTop:4}}>Le test vérifie votre maîtrise des workflows, votre capacité d'arbitrage et votre connaissance de la plateforme.</div>
        <Progress v={85} color={K.secondary} h={6}/><div style={{fontSize:12,color:K.gray500,marginTop:6}}>Score : 85/100</div></Card></div>;
    case 8:return <div className="fi"><h3 style={{fontSize:17,fontWeight:700,marginBottom:16}}>Habilitation finale</h3>
      <Card style={{padding:18,background:`linear-gradient(135deg,${K.secondary}06,${K.primary}04)`,border:`1.5px solid ${K.secondary}18`,marginBottom:14}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
          <div style={{width:48,height:48,borderRadius:"50%",background:K.secondaryLight,display:"flex",alignItems:"center",justifyContent:"center",
            fontWeight:800,fontSize:16,color:K.secondary}}>NM</div>
          <div style={{flex:1}}><div style={{fontWeight:700,fontSize:17}}>{p.name}</div>
            <div style={{fontSize:13,color:K.gray500}}>{p.seniority} — {p.zone}</div></div>
          <Badge color={K.success} pill><Zap size={12}/>Habilité Niv. 2</Badge></div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10}}>
          {Object.entries(p.scores).map(([k,v])=>
            <Score key={k} value={v} label={k.charAt(0).toUpperCase()+k.slice(1)} size={58}
              color={k==="global"?K.primary:k==="coordination"?K.secondary:k==="arbitrage"?K.accent:k==="relation"?K.info:K.moe}/>)}</div></Card>
      <div style={{marginBottom:14}}>
        <div style={{fontSize:13,fontWeight:600,marginBottom:8}}>Niveaux d'habilitation</div>
        {["Onboarding","Habilité Niv. 1","Habilité Niv. 2","Senior","Référent"].map((lvl,i)=>
          <div key={i} style={{display:"flex",alignItems:"center",gap:7,padding:"7px 11px",borderRadius:7,marginBottom:3,
            background:i<=2?K.successLight:K.gray50,fontSize:13,fontWeight:i===2?700:400}}>
            {i<=2?<CheckCircle2 size={13} color={K.success}/>:<div style={{width:13,height:13,borderRadius:"50%",border:`1.5px solid ${K.gray300}`}}/>}
            {lvl}{i===2&&<Badge color={K.primary} sm pill>Actuel</Badge>}</div>)}</div>
      <div style={{display:"flex",gap:10,justifyContent:"center"}}>
        <Btn icon={Zap}>Confirmer habilitation</Btn><Btn v="outline">Ajuster les droits</Btn></div>
    </div>;
    default:return null;}};

  return <div>
    <HeroBanner icon={Target} title="Parcours SPOC — Habilitation interne" color={K.secondary}
      sub="Qualification et activation du collaborateur KOMA — pilotage, arbitrage, relation client" time="~5 min"/>
    <Journey steps={steps} current={step} setCurrent={setStep} color={K.secondary} renderStep={render}
      sideInfo={<HelpBox icon={Target} color={K.secondary}>Le SPOC est l'orchestrateur. Son habilitation garantit la qualité de pilotage des projets.</HelpBox>}/>
  </div>;
};

/* ═══════════════════════════════════════════════════════
   SCREENS: Documents, Habilitations, Résumé IA, Admin
   ═══════════════════════════════════════════════════════ */
const SDocs=()=>{
  const cats=[{n:"Identité & Légal",docs:[{n:"RCCM / K-Bis",s:"ok"},{n:"NIU",s:"ok"},{n:"Pièce ID dirigeant",s:"received"}]},
    {n:"Assurance & Conformité",docs:[{n:"RC Pro",s:"review"},{n:"Décennale",s:"missing"}]},
    {n:"Références & Capacité",docs:[{n:"Références projets (min 3)",s:"received"},{n:"CV équipe clé",s:"missing"},{n:"Organigramme",s:"missing"}]}];
  const total=cats.reduce((a,c)=>a+c.docs.length,0),done=cats.reduce((a,c)=>a+c.docs.filter(d=>d.s==="ok").length,0);
  return <div>
    <HeroBanner icon={FolderOpen} title="Documents & Conformité" sub="Espace centralisé de dépôt, contrôle et validation des pièces justificatives"/>
    <div className="fu fu1" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:18}}>
      <Card style={{display:"flex",alignItems:"center",gap:14}}><Score value={Math.round(done/total*100)} label="Complétude" size={60} color={K.primary}/>
        <div><div style={{fontWeight:700,fontSize:17}}>{done}/{total} validées</div>
          <div style={{fontSize:13,color:K.gray500,marginTop:3}}>{total-done} pièce(s) restante(s)</div></div></Card>
      <Card><Progress v={done} max={total} color={K.primary} h={7}/>
        <div style={{fontSize:12.5,color:K.warning,fontWeight:500,marginTop:8,display:"flex",alignItems:"center",gap:5}}>
          <AlertCircle size={13}/>Il vous reste {total-done} pièce(s) pour finaliser</div></Card></div>
    {cats.map((cat,ci)=><Card key={ci} className={`fu fu${ci+2}`} style={{marginBottom:14}}>
      <Sec icon={FolderOpen} title={cat.n} sub={`${cat.docs.filter(d=>d.s==="ok").length}/${cat.docs.length} validées`}/>
      {cat.docs.map((doc,di)=>{const m={ok:{c:K.success,l:"Validée"},review:{c:K.info,l:"En revue"},received:{c:K.warning,l:"Reçue"},missing:{c:K.danger,l:"Manquante"}};
        const s=m[doc.s];return <div key={di} style={{display:"flex",alignItems:"center",gap:9,padding:"9px 11px",borderRadius:7,marginBottom:3,
          background:doc.s==="missing"?K.dangerLight:"transparent"}}>
          <FileText size={14} color={s.c}/><span style={{flex:1,fontSize:13}}>{doc.n}</span>
          <Badge color={s.c} sm>{s.l}</Badge>{doc.s==="missing"&&<Btn v="outline" sz="sm" icon={Upload}>Déposer</Btn>}</div>;})}</Card>)}</div>;
};

const SHab=()=>{
  const mods=["Portefeuille","Prospects","Projet","Devis","Tâches","Achats","Stock","Facturation","Rapports","GED","Messagerie"];
  const roles=[{r:"Admin",c:K.dark,a:Array(11).fill("admin")},{r:"SPOC",c:K.secondary,a:["contrib","contrib","lecture","contrib","lecture","lecture","lecture","lecture","lecture","contrib","contrib"]},
    {r:"AMOA",c:K.accent,a:["none","lecture","contrib","contrib","contrib","valid","contrib","contrib","contrib","contrib","contrib"]},
    {r:"MOE",c:K.moe,a:["none","none","lecture","lecture","contrib","none","none","none","lecture","contrib","contrib"]},
    {r:"MOEX",c:K.moex,a:["none","none","lecture","none","contrib","none","contrib","none","contrib","lecture","contrib"]},
    {r:"Client",c:K.primary,a:["none","none","lecture","lecture","none","none","none","lecture","lecture","lecture","contrib"]}];
  const ac={admin:{c:K.dark,l:"Admin"},valid:{c:K.accent,l:"Validation"},contrib:{c:K.success,l:"Contrib."},lecture:{c:K.info,l:"Lecture"},none:{c:K.gray300,l:"—"}};
  return <div>
    <HeroBanner icon={Lock} title="Habilitations & Droits d'accès" sub="Matrice des permissions par rôle et par module"/>
    <Card className="fu fu1" style={{padding:0,overflow:"auto"}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
        <thead><tr style={{background:K.gray50}}>
          <th style={{padding:"10px 14px",textAlign:"left",fontWeight:700,fontSize:12.5,borderBottom:`2px solid ${K.gray100}`,position:"sticky",left:0,background:K.gray50,zIndex:1}}>Module</th>
          {roles.map(r=><th key={r.r} style={{padding:"10px 8px",textAlign:"center",fontWeight:700,fontSize:12.5,borderBottom:`2px solid ${K.gray100}`,color:r.c}}>{r.r}</th>)}</tr></thead>
        <tbody>{mods.map((mod,mi)=><tr key={mi} style={{borderBottom:`1px solid ${K.gray50}`}}>
          <td style={{padding:"9px 14px",fontWeight:500,fontSize:13,position:"sticky",left:0,background:K.white}}>{mod}</td>
          {roles.map((r,ri)=><td key={ri} style={{padding:"8px",textAlign:"center"}}>
            <Badge color={ac[r.a[mi]].c} sm>{ac[r.a[mi]].l}</Badge></td>)}</tr>)}</tbody></table></Card>
  </div>;
};

const SResume=()=>{
  const p=MOCK.amoa;
  return <div>
    <HeroBanner icon={Sparkles} title="Résumé intelligent — Décision" sub="Fiche de qualification consolidée pour prise de décision"/>
    <Card className="fu fu1" style={{padding:22,marginBottom:18}}>
      <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:18,paddingBottom:14,borderBottom:`1px solid ${K.gray100}`}}>
        <div style={{width:52,height:52,borderRadius:14,background:K.accentLight,display:"flex",alignItems:"center",justifyContent:"center"}}><ShieldCheck size={26} color={K.accent}/></div>
        <div style={{flex:1}}><div style={{fontWeight:700,fontSize:19}}>{p.name}</div>
          <div style={{fontSize:13.5,color:K.gray500}}>AMOA — {p.type} — {p.zone}</div></div>
        <StatusDot status="qualifie"/></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:14,marginBottom:20}}>
        {Object.entries(p.scores).map(([k,v])=>
          <Score key={k} value={v} label={k.charAt(0).toUpperCase()+k.slice(1)} size={72}
            color={k==="global"?K.primary:k==="conformite"?K.success:k==="capacite"?K.info:k==="fiabilite"?K.accent:K.moe}/>)}</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:16}}>
        <div><div style={{fontSize:13,fontWeight:600,marginBottom:8}}>Informations clés</div>
          {[{l:"Type",v:"AMOA"},{l:"Structure",v:p.type},{l:"Zone",v:p.zone},{l:"Expérience",v:`${p.exp} ans — ${p.proj} projets`},{l:"Équipe",v:`${p.team.length} collaborateurs`}].map((it,i)=>
            <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:`1px solid ${K.gray50}`,fontSize:13}}>
              <span style={{color:K.gray500}}>{it.l}</span><span style={{fontWeight:500}}>{it.v}</span></div>)}</div>
        <div><div style={{fontSize:13,fontWeight:600,marginBottom:8}}>Documents</div>
          {p.docs.map((doc,i)=>{const c=doc.s==="ok"?K.success:doc.s==="missing"?K.danger:K.warning;
            return <div key={i} style={{display:"flex",alignItems:"center",gap:6,padding:"5px 0",borderBottom:`1px solid ${K.gray50}`,fontSize:13}}>
              <span style={{width:7,height:7,borderRadius:"50%",background:c}}/><span style={{flex:1}}>{doc.n}</span>
              <span style={{fontSize:11,color:c,fontWeight:500}}>{doc.s==="ok"?"OK":doc.s==="missing"?"Manquant":"En cours"}</span></div>;})}</div></div>
      <Card style={{background:`${K.warning}06`,border:`1px solid ${K.warning}18`,padding:12,marginBottom:14}}>
        <div style={{display:"flex",alignItems:"center",gap:7,fontSize:13}}><AlertTriangle size={15} color={K.warning}/>
          <span style={{fontWeight:600}}>Réserves :</span><span style={{color:K.gray700}}>1 pièce manquante (CV équipe). Score capacité à consolider.</span></div></Card>
      <Card style={{background:`linear-gradient(135deg,${K.accent}06,${K.primary}04)`,border:`1.5px solid ${K.accent}18`,padding:14}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}><Sparkles size={17} color={K.accent}/>
          <span style={{fontWeight:700,fontSize:14.5,color:K.accent}}>Recommandation système</span></div>
        <div style={{fontSize:13.5,color:K.gray700,lineHeight:1.6}}>
          Profil AMOA solide — 8 ans, 34 références. <strong style={{color:K.success}}>Qualifié</strong> — Activation après réception CV équipe.</div></Card></Card>
    <div style={{display:"flex",gap:10,justifyContent:"center"}}>
      <Btn v="success" icon={CheckCircle} sz="lg">Approuver et activer</Btn><Btn v="outline" icon={FileText}>Compléments</Btn>
      <Btn v="ghost" icon={Pause}>Suspendre</Btn><Btn v="danger" icon={XCircle}>Refuser</Btn></div>
  </div>;
};

const SAdmin=()=>{
  const kpis=[{l:"Dossiers totaux",v:"76",i:FolderOpen,c:K.primary},{l:"Taux activation",v:"68%",i:Zap,c:K.success},
    {l:"Temps moyen",v:"4.2j",i:Clock,c:K.warning},{l:"Bloqués",v:"5",i:AlertTriangle,c:K.danger},
    {l:"Conversion",v:"72%",i:TrendingUp,c:K.info},{l:"Qualité moy.",v:"81/100",i:Award,c:K.moe}];
  return <div>
    <HeroBanner icon={Settings} title="Pilotage Admin — Onboarding" sub="Vue transverse de tous les dossiers de qualification" badge="76 dossiers"/>
    <div className="fu fu1" style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:10,marginBottom:18}}>
      {kpis.map((k,i)=>{const I=k.i;return <Card key={i} style={{padding:13,textAlign:"center"}}>
        <I size={17} color={k.c} style={{marginBottom:5}}/><div style={{fontSize:20,fontWeight:800}}>{k.v}</div>
        <div style={{fontSize:11,color:K.gray500,marginTop:2}}>{k.l}</div></Card>;})}</div>
    <div className="fu fu2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:18}}>
      <Card><Sec icon={PieChart} title="Par acteur"/>
        {[{l:"Clients",p:35,c:K.primary},{l:"AMOA",p:25,c:K.accent},{l:"MOE",p:20,c:K.moe},{l:"MOEX",p:15,c:K.moex},{l:"SPOC",p:5,c:K.secondary}].map((it,i)=>
          <div key={i} style={{display:"flex",alignItems:"center",gap:7,marginBottom:7}}>
            <span style={{width:8,height:8,borderRadius:3,background:it.c}}/><span style={{fontSize:13,flex:1}}>{it.l}</span>
            <span style={{fontWeight:700,fontSize:13}}>{it.p}%</span></div>)}</Card>
      <Card><Sec icon={Activity} title="Activité récente"/>
        {[{a:"Activation",w:"Arch. Fotso",t:"moe",d:"2h"},{a:"Pièce rejetée",w:"Tekton",t:"amoa",d:"5h"},
          {a:"Nouveau dossier",w:"P. Nkengué",t:"client",d:"8h"},{a:"Qualifié",w:"BTP Construct",t:"moex",d:"hier"},
          {a:"Habilitation",w:"N. Mbarga",t:"spoc",d:"hier"}].map((a,i)=>
          <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<4?`1px solid ${K.gray50}`:"none",fontSize:13}}>
            <span style={{width:7,height:7,borderRadius:"50%",background:TC[a.t]}}/><span style={{flex:1}}><strong>{a.a}</strong> — {a.w}</span>
            <span style={{color:K.gray400,fontSize:12}}>{a.d}</span></div>)}</Card></div>
    <Card className="fu fu3"><Sec icon={Zap} title="Actions rapides"/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8}}>
        {[{l:"Relancer",i:Bell,c:K.warning,v:3},{l:"Approuver",i:CheckCircle,c:K.success,v:4},
          {l:"Pièces manquantes",i:FileText,c:K.danger,v:5},{l:"Suspendre",i:Pause,c:K.gray500,v:1},{l:"Activer",i:Zap,c:K.primary,v:2}].map((ac,i)=>{
          const I=ac.i;return <Card key={i} style={{padding:12,textAlign:"center",cursor:"pointer",border:`1px solid ${ac.c}18`}}>
            <I size={18} color={ac.c}/><div style={{fontSize:18,fontWeight:800,marginTop:5}}>{ac.v}</div>
            <div style={{fontSize:11,color:K.gray500}}>{ac.l}</div></Card>;})}</div></Card>
  </div>;
};

/* ═══════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════ */
export default function KomaV2Portal(){
  const [screen,setScreen]=useState("accueil");
  const screens={accueil:<SAccueil onNav={setScreen}/>,dashboard:<SDashboard onNav={setScreen}/>,
    prospect:<SProspect/>,amoa:<SAMOA/>,moe:<SMOE/>,moex:<SMOEX/>,spoc:<SSPOC/>,
    documents:<SDocs/>,habilitations:<SHab/>,resume:<SResume/>,admin:<SAdmin/>};
  return <div style={{display:"flex",minHeight:"100vh",fontFamily:K.font}}>
    <Sidebar active={screen} onNav={setScreen}/>
    <div style={{flex:1,marginLeft:232,padding:"24px 32px",maxWidth:1140}}>
      {screens[screen]||screens.accueil}</div></div>;
}
