"use client";

import { Info } from "lucide-react";
import {useLocale} from "next-intl";

export function ComparisonDisclaimer(){const vi=useLocale()==="vi";return <aside className="comparison-disclaimer"><Info/><p><b>{vi?"Một ranh giới cần thiết":"A necessary distinction"}</b>{vi?"Những so sánh này mang tính triết học và giáo dục. Chúng không có nghĩa vật lý lượng tử chứng minh giáo lý Phật giáo.":"These comparisons are philosophical and educational. They do not imply that quantum physics scientifically proves Buddhist teachings."}</p></aside>}
