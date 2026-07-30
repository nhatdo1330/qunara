import type { PathLocale } from "./path-of-seeing-config";

export type ReflectionText = { full: string; medium: string; short: string };
export type ReflectionNodeData = {
  id: string;
  text: Record<PathLocale, ReflectionText>;
  related: string[];
  temporary: true;
};

// Phase 1 fixture only. These prompts are not approved editorial content.
const prompts: Array<[string, string, string, string, string, string, string]> = [
  ["change","What changes when you stop trying to hold this moment still?","What changes when you stop holding this moment?","What changes?","Điều gì đổi thay khi bạn thôi cố giữ khoảnh khắc này đứng yên?","Điều gì đổi thay khi bạn thôi níu giữ?","Đổi thay?"],
  ["arrival","What was already here before you noticed it?","What was here before you noticed?","Already here?","Điều gì đã có mặt trước khi bạn nhận ra?","Điều gì đã ở đây từ trước?","Đã ở đây?"],
  ["passing","Can a thought pass without being followed?","Can this thought pass on its own?","Let it pass?","Một ý nghĩ có thể đi qua mà bạn không cần chạy theo không?","Ý nghĩ này có thể tự đi qua không?","Để nó qua?"],
  ["sound","Where does a sound go when it ends?","Where does the sound go?","After sound?","Một âm thanh đi về đâu khi chấm dứt?","Âm thanh đi về đâu?","Sau âm thanh?"],
  ["space","What becomes visible when there is more space?","What appears with more space?","More space?","Điều gì hiện ra khi có thêm khoảng trống?","Có khoảng trống, điều gì hiện ra?","Thêm khoảng trống?"],
  ["effort","What remains when effort softens?","What remains without effort?","Less effort?","Điều gì còn lại khi sự cố gắng dịu xuống?","Khi bớt cố gắng, điều gì còn lại?","Bớt gắng sức?"],
  ["body","What is the body quietly telling you now?","What is the body saying now?","The body?","Lúc này thân thể đang lặng lẽ nói điều gì?","Thân thể đang nói gì?","Thân thể?"],
  ["edge","Where does this feeling begin and end?","Where are this feeling's edges?","Its edges?","Cảm giác này bắt đầu và kết thúc ở đâu?","Ranh giới của cảm giác này ở đâu?","Ranh giới?"],
  ["waiting","What happens when nothing needs to happen yet?","What if nothing needs to happen?","Simply wait?","Điều gì xảy ra khi chưa có gì cần xảy ra?","Nếu chưa cần điều gì xảy ra thì sao?","Chỉ đợi?"],
  ["name","What changes when you do not name the experience?","What changes without a name?","Without a name?","Điều gì thay đổi khi bạn không đặt tên trải nghiệm?","Không gọi tên, điều gì đổi khác?","Không tên?"],
  ["attention","What is attention resting on by itself?","Where is attention resting?","Attention rests?","Sự chú ý đang tự dừng lại nơi đâu?","Sự chú ý đang ở đâu?","Chú ý?"],
  ["distance","Can you notice without moving closer?","Can you notice from here?","From here?","Bạn có thể nhận ra mà không cần tiến lại gần không?","Từ đây, bạn có thể nhận ra không?","Từ đây?"],
  ["quiet","Is quiet the absence of sound, or something else?","Is quiet more than no sound?","What is quiet?","Tĩnh lặng chỉ là không có âm thanh, hay còn điều gì khác?","Tĩnh lặng có nhiều hơn im tiếng không?","Tĩnh lặng?"],
  ["breath","Does the next breath need your instruction?","Does the breath need instruction?","The next breath?","Hơi thở tiếp theo có cần bạn chỉ dẫn không?","Hơi thở có cần được chỉ dẫn không?","Hơi thở tới?"],
  ["light","How does light change what you think you see?","How does light change seeing?","Changing light?","Ánh sáng thay đổi điều bạn tưởng mình thấy như thế nào?","Ánh sáng đổi cách nhìn ra sao?","Ánh sáng đổi?"],
  ["memory","Is this moment being seen, or remembered?","Are you seeing or remembering?","Seeing or remembering?","Khoảnh khắc này đang được nhìn thấy, hay được nhớ lại?","Bạn đang thấy hay đang nhớ?","Thấy hay nhớ?"],
  ["certainty","What does uncertainty feel like before it becomes a story?","How does uncertainty feel before the story?","Before the story?","Sự chưa chắc chắn có cảm giác thế nào trước khi thành câu chuyện?","Trước câu chuyện, chưa chắc chắn ra sao?","Trước câu chuyện?"],
  ["movement","Can stillness contain movement?","Is there movement inside stillness?","Movement within?","Sự tĩnh có thể chứa chuyển động không?","Trong tĩnh có chuyển động không?","Chuyển động bên trong?"],
  ["holding","What are you holding that does not need to be held?","What need not be held?","Release holding?","Bạn đang giữ điều gì vốn không cần phải giữ?","Điều gì không cần níu giữ?","Buông giữ?"],
  ["near","What feels close without being touched?","What feels close from here?","What is near?","Điều gì cảm thấy gần dù không được chạm tới?","Từ đây, điều gì thật gần?","Điều gì gần?"],
  ["return","What returns when distraction passes?","What returns after distraction?","What returns?","Điều gì trở lại khi xao nhãng đi qua?","Sau xao nhãng, điều gì trở lại?","Điều gì trở lại?"],
  ["weather","Can this mood be met like passing weather?","Can this mood pass like weather?","Passing weather?","Bạn có thể gặp tâm trạng này như một cơn thời tiết đi qua không?","Tâm trạng này có thể đi qua như thời tiết không?","Thời tiết qua?"],
  ["knowing","What do you notice before deciding what it means?","What appears before meaning?","Before meaning?","Bạn nhận ra điều gì trước khi quyết định nó có nghĩa gì?","Trước ý nghĩa, điều gì hiện ra?","Trước ý nghĩa?"],
  ["center","Does experience have a fixed center?","Where is experience centered?","A fixed center?","Trải nghiệm có một trung tâm cố định không?","Trung tâm của trải nghiệm ở đâu?","Trung tâm cố định?"],
  ["softening","What becomes possible when resistance softens?","What appears when resistance softens?","Resistance softens?","Điều gì trở nên có thể khi sự chống cự dịu xuống?","Khi bớt chống cự, điều gì hiện ra?","Dịu chống cự?"],
  ["ordinary","What is quietly remarkable about this ordinary moment?","What is remarkable in this moment?","Quietly remarkable?","Điều gì lặng lẽ đáng kinh ngạc trong khoảnh khắc bình thường này?","Khoảnh khắc này có gì đáng kinh ngạc?","Lặng lẽ lạ thường?"],
  ["between","What can be noticed in the space between two thoughts?","What is between two thoughts?","Between thoughts?","Có thể nhận ra điều gì trong khoảng giữa hai ý nghĩ?","Giữa hai ý nghĩ có gì?","Giữa ý nghĩ?"],
  ["enough","Could this moment be enough without becoming different?","Could this moment already be enough?","Already enough?","Khoảnh khắc này có thể đã đủ mà không cần trở nên khác đi không?","Khoảnh khắc này đã đủ chưa?","Đã đủ?"],
  ["kindness","What changes when this moment is met with kindness?","What changes with kindness?","Meet kindly?","Điều gì thay đổi khi bạn gặp khoảnh khắc này bằng sự tử tế?","Có lòng tử tế, điều gì đổi khác?","Gặp bằng tử tế?"],
  ["seeing","What is seeing when nothing is being searched for?","What sees without searching?","Seeing without seeking?","Điều gì đang thấy khi không có gì được tìm kiếm?","Điều gì thấy mà không tìm?","Thấy không tìm?"],
];

export const reflectionGraph: ReflectionNodeData[] = prompts.map((item, index) => ({
  id: item[0],
  temporary: true,
  text: { en: { full: item[1], medium: item[2], short: item[3] }, vi: { full: item[4], medium: item[5], short: item[6] } },
  related: [1, 4, 9].map((offset) => prompts[(index + offset) % prompts.length][0]),
}));

export const reflectionNodeMap = new Map(reflectionGraph.map((node) => [node.id, node]));
