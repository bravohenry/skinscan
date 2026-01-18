/**
 * [INPUT]: result (分析结果), imageUrl (用户图片), FaceAnalysisOverlay
 * [OUTPUT]: ShareCard 组件 (3:4 比例结果卡片)
 * [POS]: components/ShareCard, 核心结果展示组件, 适配户外机器
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AURA_TYPES } from '@/lib/schema';
import { cn } from '@/lib/utils';
import { FaceAnalysisOverlay } from '@/components/FaceAnalysisOverlay';
import { DetailedReportContent } from '@/components/DetailedReport';
import { RotateCcw, Lock, ChevronRight } from 'lucide-react';

const CATEGORY_THEMES = {
  cool: {
    bg: 'bg-slate-50',
    border: 'border-slate-100',
    text: 'text-slate-800',
    badge: 'bg-slate-100 text-slate-700',
    accent: 'bg-slate-200',
    icon: '❄️'
  },
  sweet: {
    bg: 'bg-rose-50',
    border: 'border-rose-100',
    text: 'text-rose-900',
    badge: 'bg-rose-100 text-rose-700',
    accent: 'bg-rose-200',
    icon: '🌸'
  },
  queen: {
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    text: 'text-amber-900',
    badge: 'bg-amber-100 text-amber-700',
    accent: 'bg-amber-200',
    icon: '👑'
  },
  vibe: {
    bg: 'bg-violet-50',
    border: 'border-violet-100',
    text: 'text-violet-900',
    badge: 'bg-violet-100 text-violet-700',
    accent: 'bg-violet-200',
    icon: '✨'
  },
  warm: {
    bg: 'bg-orange-50',
    border: 'border-orange-100',
    text: 'text-orange-900',
    badge: 'bg-orange-100 text-orange-700',
    accent: 'bg-orange-200',
    icon: '☀️'
  },
  gentle: {
    bg: 'bg-teal-50',
    border: 'border-teal-100',
    text: 'text-teal-900',
    badge: 'bg-teal-100 text-teal-700',
    accent: 'bg-teal-200',
    icon: '🍃'
  },
  retro: {
    bg: 'bg-stone-50',
    border: 'border-stone-100',
    text: 'text-stone-800',
    badge: 'bg-stone-100 text-stone-700',
    accent: 'bg-stone-200',
    icon: '🎬'
  },
  edgy: {
    bg: 'bg-zinc-50',
    border: 'border-zinc-100',
    text: 'text-zinc-800',
    badge: 'bg-zinc-100 text-zinc-700',
    accent: 'bg-zinc-200',
    icon: '⚡'
  },
  exotic: {
    bg: 'bg-cyan-50',
    border: 'border-cyan-100',
    text: 'text-cyan-900',
    badge: 'bg-cyan-100 text-cyan-700',
    accent: 'bg-cyan-200',
    icon: '💎'
  }
};

const AURA_TO_CATEGORY = {
  cool_goddess: 'cool',
  ice_queen: 'cool',
  cold_prince: 'cool',
  gentle_scholar: 'cool',
  sweet_first_love: 'sweet',
  cute_baby: 'sweet',
  sunny_girl: 'sweet',
  warm_sunshine: 'warm',
  sporty_fresh: 'warm',
  puppy_boy: 'sweet',
  queen_elegant: 'queen',
  boss_lady: 'queen',
  mature_charm: 'queen',
  mature_elite: 'queen',
  tough_guy: 'queen',
  gentleman: 'queen',
  pure_desire: 'vibe',
  melancholy: 'vibe',
  mysterious: 'vibe',
  artistic_soul: 'vibe',
  mysterious_wolf: 'vibe',
  girl_next_door: 'gentle',
  gentle_beauty: 'gentle',
  neighbor_brother: 'gentle',
  japanese_soft: 'gentle',
  retro_classic: 'retro',
  retro_hong_kong: 'retro',
  korean_idol: 'sweet',
  edgy_cool: 'edgy',
  bad_boy: 'edgy',
  exotic_beauty: 'exotic',
  mixed_exotic: 'exotic'
};

function getThemeForAura(auraType) {
  const category = AURA_TO_CATEGORY[auraType] || 'cool';
  return CATEGORY_THEMES[category];
}

export function ShareCard({ result, imageUrl, onReset }) {
  const [showPaid, setShowPaid] = useState(false);
  
  if (!result) return null;

  const { aura_type, aura_label, predicted_age, beauty_score, tagline } = result;
  const theme = getThemeForAura(aura_type);

  if (showPaid) {
    return (
      <Card className={cn(
        "h-[calc(100dvh-3rem)] w-[calc((100dvh-3rem)*3/4)] mx-auto overflow-hidden shadow-2xl border-0 ring-1 ring-black/5 relative",
        theme.bg
      )}>
        <Tabs defaultValue="radar" className="h-full flex flex-col">
          <div className="absolute top-4 left-0 right-0 z-20 flex items-center justify-between px-4">
            <Button
              onClick={() => setShowPaid(false)}
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-full bg-white/80 hover:bg-white text-stone-500 hover:text-stone-700 shadow-sm"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
            </Button>
            
            <TabsList className="grid grid-cols-2 bg-white/90 backdrop-blur p-1 rounded-full h-10 w-44 shadow-sm">
              <TabsTrigger
                value="radar"
                className="rounded-full text-xs data-[state=active]:bg-stone-100 data-[state=active]:text-stone-900"
              >
                气质雷达
              </TabsTrigger>
              <TabsTrigger
                value="metrics"
                className="rounded-full text-xs data-[state=active]:bg-stone-100 data-[state=active]:text-stone-900"
              >
                肤质分析
              </TabsTrigger>
            </TabsList>
            
            {onReset ? (
              <Button
                onClick={onReset}
                variant="ghost"
                size="icon"
                className="w-10 h-10 rounded-full bg-white/80 hover:bg-white text-stone-500 hover:text-stone-700 shadow-sm"
              >
                <RotateCcw className="w-5 h-5" />
              </Button>
            ) : (
              <div className="w-10 h-10" />
            )}
          </div>
          
          <CardContent className="p-0 h-full pt-16">
            <DetailedReportContent result={result} />
          </CardContent>
        </Tabs>
      </Card>
    );
  }

  return (
    <Card className={cn(
      "h-[calc(100dvh-3rem)] w-[calc((100dvh-3rem)*3/4)] mx-auto overflow-hidden shadow-2xl border-0 ring-1 ring-black/5 relative",
      theme.bg
    )}>
      {onReset && (
        <Button
          onClick={onReset}
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-stone-500 hover:text-stone-700 shadow-sm"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
      )}
      <CardContent className="p-0 h-full">
        <div className="relative h-full flex flex-col">
          <div className="flex-[40] min-h-0">
            <FaceAnalysisOverlay imageUrl={imageUrl} compact />
          </div>

          <div className="flex-[60] flex flex-col items-center justify-evenly py-4 px-6">
            <Badge 
              variant="secondary" 
              className={cn(
                "px-5 py-1.5 text-base font-medium tracking-wide rounded-full border-0 shadow-none",
                theme.badge
              )}
            >
              {theme.icon} {aura_label || AURA_TYPES[aura_type]?.label}
            </Badge>

            <div className="flex items-center justify-center gap-12 w-full">
              <div className="text-center">
                <div className={cn("text-5xl font-light tabular-nums tracking-tight", theme.text)}>
                  {predicted_age}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-gray-400 font-medium mt-1">
                  测龄
                </div>
              </div>
              
              <div className="w-px h-14 bg-gray-200/50"></div>
              
              <div className="text-center">
                <div className={cn("text-5xl font-light tabular-nums tracking-tight", theme.text)}>
                  {beauty_score}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-gray-400 font-medium mt-1">
                  颜值
                </div>
              </div>
            </div>

            <p className={cn(
              "text-center text-sm leading-relaxed text-pretty font-medium opacity-90 italic px-4 max-w-[95%]",
              theme.text
            )}>
              "{tagline}"
            </p>

            <Button
              onClick={() => setShowPaid(true)}
              className="w-full max-w-[280px] h-12 rounded-xl bg-stone-900 text-white hover:bg-stone-800 shadow-lg group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]"></div>
              <div className="flex items-center gap-2 relative z-10">
                <Lock className="w-4 h-4" />
                <span>解锁完整报告</span>
                <ChevronRight className="w-4 h-4 opacity-50 group-hover:translate-x-1 transition-transform" />
              </div>
            </Button>

            <div className="flex items-center justify-center gap-2 opacity-40">
              <div className="h-px w-8 bg-current"></div>
              <span className="text-[10px] tracking-[0.2em] font-light uppercase">SkinScan AI</span>
              <div className="h-px w-8 bg-current"></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ShareCard;
