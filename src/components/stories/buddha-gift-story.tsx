import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock3, Compass, Heart, HelpCircle } from "lucide-react";

import type { StoryDocument } from "@/lib/story-content";

const copy = {
  en: {
    stories: "Stories", personal: "Personal Story", back: "Back to Stories",
    reflections: "Editorial reflections", reflectionBoundary: "Personal and editorial reflection—not canonical Buddhist teaching.",
    lessonTitle: "What this experience taught me", buddhistTitle: "A Buddhist reflection", questionTitle: "Question for the reader",
    disclosure: "About this story", source: "Personal experience", ownership: "Photograph provided by the author",
  },
  vi: {
    stories: "Câu chuyện", personal: "Câu chuyện cá nhân", back: "Trở lại Câu chuyện",
    reflections: "Suy ngẫm biên tập", reflectionBoundary: "Suy ngẫm cá nhân và biên tập—không phải giáo lý Phật giáo chính thống.",
    lessonTitle: "Điều trải nghiệm này dạy tôi", buddhistTitle: "Một suy ngẫm Phật học", questionTitle: "Câu hỏi dành cho bạn",
    disclosure: "Về câu chuyện này", source: "Trải nghiệm cá nhân", ownership: "Ảnh do tác giả cung cấp",
  },
} as const;

const storyCopy = {
  "buddha-gift": {
    en: {
      imageAlt: "The wooden Buddha statue from the story, beside a meditation bell.", caption: "The actual wooden statue from this story.",
      lesson: "Conflict is not the whole person.", buddhist: "When our need to win, possess, or defend the self becomes lighter, kindness has more room to appear.", question: "Is there someone you may currently see only through the lens of disagreement?",
    },
    vi: {
      imageAlt: "Bức tượng Phật bằng gỗ trong câu chuyện, đặt bên cạnh chuông thiền.", caption: "Bức tượng gỗ trong chính câu chuyện này.",
      lesson: "Mâu thuẫn không nói lên toàn bộ một con người.", buddhist: "Khi nhu cầu hơn thua, nắm giữ và bảo vệ cái tôi trở nên nhẹ hơn, lòng tử tế có thêm không gian để xuất hiện.", question: "Có ai trong đời mà bạn đang chỉ nhìn họ qua lăng kính của một sự bất đồng?",
    },
  },
  "little-friend-in-the-garden": {
    en: {
      imageAlt: "A hummingbird hovering near the author as he reads in the garden.", caption: "The moment described in this story.",
      lesson: "The photograph reminds me of how easily we confuse control with connection.", buddhist: "Buddhist practice often invites us to loosen our grip on control and to meet each moment with greater presence.", question: "If nothing around you changed tomorrow, but the way you met the world did, what might you begin to notice for the first time?",
    },
    vi: {
      imageAlt: "Chú chim ruồi lơ lửng gần tác giả khi ông đọc sách trong khu vườn.", caption: "Khoảnh khắc được kể lại trong câu chuyện này.",
      lesson: "Có lẽ điều duy nhất thay đổi là chính tôi.", buddhist: "Tôi bớt vội vàng, bớt muốn kiểm soát, biết quan sát nhiều hơn và biết chờ đợi nhiều hơn.", question: "Có lẽ thế giới không hề thay đổi. Chỉ là tôi đã thay đổi cách bước vào thế giới ấy.",
    },
  },
  lotus: {
    en: {
      imageAlt: "A broad lotus pond beneath an evening sky.", caption: "A lotus pond at dusk.",
      lesson: "Some things remain with us because we are not finished understanding them.", buddhist: "These are reflections inspired by Buddhism, not quotations from scripture or claims about a single official meaning of the lotus.", question: "Is there an image from your childhood that you only began to understand after you grew older?",
    },
    vi: {
      imageAlt: "Một hồ sen rộng dưới bầu trời chiều.", caption: "Hồ sen lúc chiều xuống.",
      lesson: "Có những điều ở lại với chúng ta bởi vì chúng ta vẫn chưa hiểu hết về chúng.", buddhist: "Đây là những suy ngẫm lấy cảm hứng từ Phật học, không phải lời kinh hay một định nghĩa duy nhất về ý nghĩa của hoa sen.", question: "Có hình ảnh nào từ tuổi thơ mà chỉ đến khi trưởng thành bạn mới bắt đầu hiểu ý nghĩa của nó?",
    },
  },
  "flowers-were-already-there": {
    en: {
      imageAlt: "Bright yellow flowers along the author's lunchtime walking route near the office.", caption: "The flowers along the author's lunchtime walking route.",
      lesson: "The flowers had not suddenly appeared. They had already been there.", buddhist: "I do not take this as proof of any spiritual doctrine. It is simply a small experience that helps me understand why mindfulness places so much importance on attention.", question: "What might you notice tomorrow if you gave your mind ten quiet minutes before giving it to the world?",
    },
    vi: {
      imageAlt: "Những khóm hoa vàng rực trên con đường tác giả thường đi bộ vào giờ nghỉ trưa gần văn phòng.", caption: "Những khóm hoa trên con đường tác giả thường đi bộ vào giờ nghỉ trưa.",
      lesson: "Những bông hoa ấy không vừa mới nở. Chúng đã ở đó từ lâu.", buddhist: "Tôi không xem trải nghiệm này như một bằng chứng cho bất kỳ giáo lý nào.", question: "Nếu sáng mai bạn dành cho tâm trí mình mười phút yên tĩnh trước khi trao nó cho thế giới, bạn sẽ nhìn thấy điều gì khác đi?",
    },
  },
} as const;

const dividerStarts = {
  en: [] as string[],
  vi: [
    "Trong nhóm có một anh đồng nghiệp",
    "Rồi một ngày, khi tình cờ đi ngang",
    "Từ hôm đó, tôi bắt đầu âm thầm đi tìm.",
    "Nhiều lần tôi muốn hỏi anh mua ở đâu.",
    "Thời gian trôi qua.",
    "Anh nhìn tôi.",
    "Khoảnh khắc ấy, mọi tranh luận",
    "Khi mang bức tượng về nhà",
  ],
};

export function BuddhaGiftStory({ story }: { story: StoryDocument }) {
  const locale = story.locale;
  const labels = copy[locale];
  const metadata = story.metadata;
  const presentation = storyCopy[metadata.id as keyof typeof storyCopy]?.[locale] ?? storyCopy["buddha-gift"][locale];
  const backHref = locale === "vi" ? "/vi/kham-pha#stories" : "/en/explore#stories";
  return <article className="buddha-gift-story">
    <header className="buddha-gift-hero">
      <div className="q-shell buddha-gift-hero-grid">
        <div className="buddha-gift-hero-copy">
          <Link href={backHref}><ArrowLeft/>{labels.back}</Link>
          <p className="q-kicker">{labels.stories} · {labels.personal}</p>
          <h1>{story.title}</h1>
          <p>{metadata.subtitle[locale]}</p>
          <div className="buddha-gift-meta"><span><BookOpen/>{labels.personal}</span><span><Clock3/>{metadata.readingTime[locale]}</span></div>
        </div>
        <figure className="buddha-gift-photo">
          <Image src={metadata.image} alt={presentation.imageAlt} fill priority sizes="(max-width: 760px) 100vw, 48vw"/>
          <figcaption>{presentation.caption}</figcaption>
        </figure>
      </div>
    </header>

    <div className="buddha-gift-reading q-shell">
      <div className="buddha-gift-prose">
        {story.blocks.map((block, index) => {
          const divider = block.type === "paragraph" && dividerStarts[locale].some((start) => block.text.startsWith(start));
          const pullQuote = locale === "vi" && block.type === "paragraph" && block.text === '"Anh tặng em."';
          return <div className={divider ? "story-arc-divider" : undefined} key={`${index}-${block.text}`}>
            {block.type === "opening" ? <p className="story-opening">{block.text}</p> : <p>{block.text}</p>}
            {pullQuote&&<blockquote>{block.text}</blockquote>}
          </div>;
        })}
      </div>
    </div>

    <section className="buddha-gift-reflections" aria-labelledby="story-reflections-title">
      <div className="q-shell"><header><p className="q-kicker">{labels.reflections}</p><h2 id="story-reflections-title">{labels.reflectionBoundary}</h2></header><div className="buddha-gift-reflection-grid">
        <ReflectionPanel icon={Compass} title={labels.lessonTitle} text={presentation.lesson}/>
        <ReflectionPanel icon={Heart} title={labels.buddhistTitle} text={presentation.buddhist}/>
        <ReflectionPanel icon={HelpCircle} title={labels.questionTitle} text={presentation.question}/>
      </div></div>
    </section>

    <section className="buddha-gift-disclosure q-shell" aria-labelledby="story-disclosure-title"><BookOpen/><div><p className="q-kicker" id="story-disclosure-title">{labels.disclosure}</p><p>{labels.source} · {labels.ownership}</p></div></section>
  </article>;
}

function ReflectionPanel({ icon: Icon, title, text }: { icon: typeof Compass; title: string; text: string }) {
  return <article><Icon/><h3>{title}</h3><p>{text}</p></article>;
}
