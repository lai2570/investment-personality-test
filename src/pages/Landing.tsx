import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const base = import.meta.env.BASE_URL;

const animals = [
  { img: `${base}images/animal1.png`, name: '農夫烏龜', trait: '穩健踏實，相信時間的力量' },
  { img: `${base}images/animal2.png`, name: '建築師河狸', trait: '系統規劃，抗通膨意識強' },
  { img: `${base}images/animal3.png`, name: '職人蜜蜂', trait: '務實勤勞，重視現金流' },
  { img: `${base}images/animal4.png`, name: '背包客狐狸', trait: '全球視野，分散佈局' },
  { img: `${base}images/animal5.png`, name: '運動員海豚', trait: '目標導向，追求效率' },
  { img: `${base}images/animal6.png`, name: '教授貓頭鷹', trait: '深度研究，長期持有' },
  { img: `${base}images/animal7.png`, name: '獵人老鷹', trait: '精準判斷，果斷進出' },
  { img: `${base}images/animal8.png`, name: '創業野狼', trait: '逆向思維，價值發掘' },
  { img: `${base}images/animal9.png`, name: '飛行員獵豹', trait: '趨勢判斷，快速反應' },
  { img: `${base}images/animal10.png`, name: '網紅綿羊', trait: '資訊敏感，主題輪動' },
];

const faqs = [
  {
    q: '這個測驗需要花多久時間？',
    a: '只需 60 秒左右。測驗包含 3 個題目，每題都是簡單的選擇，不需要任何金融知識。',
  },
  {
    q: '測驗結果準確嗎？',
    a: '測驗設計結合 Big Five 人格模型中的神經質（Neuroticism）與開放性（Openness）兩個維度，搭配你對資金使用時間的規劃，從行為金融學角度提供投資風格傾向。結果僅供自我認識參考。',
  },
  {
    q: '測驗結果會儲存嗎？需要註冊嗎？',
    a: '不需要註冊，也不會儲存任何個人資料。測驗完成後可以透過網址分享給朋友，但結果本身不會保留在伺服器上。',
  },
  {
    q: '結果會是投資建議嗎？',
    a: '不會。本測驗僅提供投資風格的自我認識，並不構成任何投資建議。投資有風險，任何投資決策應基於你自己的研究與專業諮詢。',
  },
  {
    q: '為什麼只有 3 題？',
    a: '一般的心理測驗會有 40-50 題，但本測驗設計目的是「快速自我認識」而非臨床評估。我們保留三個最關鍵的維度：時間軸、風險焦慮程度、對新資訊的開放度，用最少的題目給你足夠有用的參考。',
  },
];

export default function Landing() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* ═════════ Header ═════════ */}
      <header className="border-b border-line sticky top-0 bg-paper/95 backdrop-blur z-30">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="h-14 md:h-16 flex items-center justify-between">
            <div className="flex items-center gap-6 md:gap-8">
              <img src={`${base}images/pocket.png`} alt="口袋基金" className="h-6 md:h-7 object-contain" />
              <nav className="hidden md:flex items-center gap-6 text-sm text-ink-soft">
                <a href="#about" className="link-underline">關於測驗</a>
                <a href="#how" className="link-underline">如何進行</a>
                <a href="#faq" className="link-underline">常見問題</a>
              </nav>
            </div>
            <button
              onClick={() => navigate('/quiz')}
              className="text-sm font-medium bg-accent text-white px-4 py-2 hover:bg-accent-dark transition-colors cursor-pointer"
            >
              開始測驗
            </button>
          </div>
        </div>
      </header>

      {/* ═════════ Hero ═════════ */}
      <section className="border-b border-line">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-14 md:py-20">
          <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-10 md:gap-16 items-center">
            {/* Left — Text */}
            <div className="animate-fadeIn">
              <p className="text-accent text-xs md:text-sm font-semibold tracking-wider uppercase mb-4">
                投資性格測驗
              </p>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-5">
                精準描繪你的<br className="hidden md:block" />
                投資性格
              </h1>
              <p className="text-base md:text-lg text-ink-soft leading-relaxed mb-8 max-w-xl">
                本測驗結合 Big Five 人格模型與行為金融學，
                透過 3 個簡單問題，協助你認識自己的投資風格傾向，
                找到適合的資產配置方向。
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:items-center mb-8">
                <button
                  onClick={() => navigate('/quiz')}
                  className="inline-flex items-center justify-center gap-2 bg-accent text-white font-semibold text-base h-12 px-8 hover:bg-accent-dark transition-colors cursor-pointer"
                >
                  開始測驗
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
                <span className="text-sm text-ink-mute">免費・60 秒・無需註冊</span>
              </div>

              {/* Credibility bar */}
              <div className="flex items-start gap-3 pt-6 border-t border-line">
                <div className="w-10 h-10 rounded-full bg-accent-soft flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-ink">內容審核</p>
                  <p className="text-ink-mute mt-0.5">口袋基金投資研究團隊・基於 Big Five 人格理論</p>
                </div>
              </div>
            </div>

            {/* Right — simple visual */}
            <div className="hidden md:block">
              <div className="bg-paper-gray p-8 border border-line">
                <div className="grid grid-cols-3 gap-4">
                  {animals.slice(0, 6).map((a) => (
                    <div key={a.name} className="text-center">
                      <img src={a.img} alt={a.name} className="w-16 h-16 object-contain mx-auto mb-2" />
                      <p className="text-xs text-ink-soft">{a.name}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-line text-center">
                  <p className="text-xs text-ink-mute">10 種投資性格動物，找到你的那一型</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════ About / Why this test ═════════ */}
      <section id="about" className="border-b border-line bg-paper-off">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-14 md:py-20">
          <div className="max-w-3xl">
            <p className="text-accent text-xs md:text-sm font-semibold tracking-wider uppercase mb-4">
              關於這個測驗
            </p>
            <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-6">
              為什麼需要認識自己的投資性格？
            </h2>
            <div className="space-y-5 text-base text-ink-soft leading-relaxed">
              <p>
                許多人在選擇投資工具時，往往聚焦在「哪一檔最賺錢」，卻忽略了「哪一種最適合自己」。
                事實上，再好的投資策略，如果不符合你的性格、風險承受力與資金使用時程，
                都很難長期堅持下去。
              </p>
              <p>
                本測驗根據心理學中被廣泛驗證的 Big Five 人格模型，
                挑選與投資行為最相關的兩個維度：
                <strong className="text-ink">神經質（對損失的敏感度）</strong>
                與
                <strong className="text-ink">開放性（對新標的的接受度）</strong>，
                結合你的
                <strong className="text-ink">資金使用時間軸</strong>，
                將你歸類到 10 種典型的投資性格動物。
              </p>
              <p>
                測驗結果不是「你應該怎麼投資」的命令，而是讓你對自己有更清楚的認識——
                當你了解自己的傾向，再去選擇投資工具時，就能找到能長期堅持、睡得著覺的方式。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════ How it works ═════════ */}
      <section id="how" className="border-b border-line">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-14 md:py-20">
          <p className="text-accent text-xs md:text-sm font-semibold tracking-wider uppercase mb-4">
            如何進行
          </p>
          <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-10">
            三個步驟，60 秒完成
          </h2>

          <div className="grid md:grid-cols-3 gap-6 md:gap-10">
            {[
              {
                step: '1',
                title: '回答 3 個問題',
                desc: '題目涵蓋時間規劃、風險偏好、投資開放度。不需要任何金融知識，憑直覺作答即可。',
              },
              {
                step: '2',
                title: '取得你的性格動物',
                desc: '系統依據你的答案組合，從 10 種典型投資性格中，找到最符合你的那一型。',
              },
              {
                step: '3',
                title: '了解適合的方向',
                desc: '閱讀性格描述與建議的投資組合方向，對自己的投資風格有更清楚的認識。',
              },
            ].map((s) => (
              <div key={s.step} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-ink text-white flex items-center justify-center text-sm font-semibold">
                  {s.step}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                  <p className="text-ink-soft leading-relaxed text-[15px]">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════ Animal showcase ═════════ */}
      <section className="border-b border-line bg-paper-off">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-14 md:py-20">
          <p className="text-accent text-xs md:text-sm font-semibold tracking-wider uppercase mb-4">
            10 種投資性格動物
          </p>
          <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-3">
            你會是哪一種？
          </h2>
          <p className="text-ink-soft text-base mb-10 max-w-2xl">
            每一種動物代表一種典型的投資風格傾向。測驗完成後，你會收到專屬於你的那一型。
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-line border border-line">
            {animals.map((a) => (
              <div key={a.name} className="bg-paper p-5 md:p-6 flex flex-col items-center text-center">
                <img src={a.img} alt={a.name} className="w-14 h-14 md:w-16 md:h-16 object-contain mb-3" />
                <p className="text-sm font-semibold mb-1">{a.name}</p>
                <p className="text-xs text-ink-mute leading-snug">{a.trait}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════ FAQ ═════════ */}
      <section id="faq" className="border-b border-line">
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-14 md:py-20">
          <p className="text-accent text-xs md:text-sm font-semibold tracking-wider uppercase mb-4">
            常見問題
          </p>
          <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-10">
            你可能想知道的
          </h2>

          <div className="divide-y divide-line border-t border-line">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i}>
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full py-5 flex items-start justify-between gap-4 text-left hover:text-accent transition-colors cursor-pointer"
                  >
                    <span className="font-semibold text-ink text-base md:text-lg flex-1">
                      {faq.q}
                    </span>
                    <svg
                      width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      className={`flex-shrink-0 mt-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    >
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="pb-5 pr-8 text-ink-soft leading-relaxed text-[15px]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═════════ Bottom CTA ═════════ */}
      <section className="border-b border-line bg-paper-off">
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-14 md:py-20 text-center">
          <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-4">
            準備好認識自己的投資性格了嗎？
          </h2>
          <p className="text-ink-soft text-base mb-8 max-w-lg mx-auto">
            免費，不用註冊，也不會儲存你的個人資料。
          </p>
          <button
            onClick={() => navigate('/quiz')}
            className="inline-flex items-center justify-center gap-2 bg-accent text-white font-semibold text-base h-12 px-10 hover:bg-accent-dark transition-colors cursor-pointer"
          >
            開始測驗
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </section>

      {/* ═════════ Footer ═════════ */}
      <footer className="bg-paper text-ink-soft text-sm">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-10">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div>
              <img src={`${base}images/pocket.png`} alt="口袋基金" className="h-6 object-contain mb-3 opacity-80" />
              <p className="text-xs text-ink-mute leading-relaxed">
                讓投資更簡單的基金平台
              </p>
            </div>
            <div>
              <h4 className="text-ink font-semibold mb-3 text-sm">測驗</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#about" className="link-underline">關於測驗</a></li>
                <li><a href="#how" className="link-underline">如何進行</a></li>
                <li><a href="#faq" className="link-underline">常見問題</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-ink font-semibold mb-3 text-sm">口袋基金</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="https://my.cmoneyfund.com.tw" target="_blank" rel="noopener noreferrer" className="link-underline">官方網站</a></li>
                <li><a href="https://my.cmoneyfund.com.tw/account-opening" target="_blank" rel="noopener noreferrer" className="link-underline">開戶</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-ink font-semibold mb-3 text-sm">法律</h4>
              <ul className="space-y-2 text-xs">
                <li>本測驗僅供參考</li>
                <li>不構成投資建議</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-line pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-xs text-ink-mute">
            <p>&copy; 2026 口袋基金 Pocket Fund. All Rights Reserved.</p>
            <p>投資有風險，申購前請詳閱公開說明書。</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
