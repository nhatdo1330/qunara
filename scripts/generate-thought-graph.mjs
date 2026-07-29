import { mkdirSync, writeFileSync } from "node:fs";

const groups = [
  [["work","Work","Công việc"],["meeting","Meeting","Cuộc họp"],["deadline","Deadline","Hạn chót"],["purpose","Purpose","Mục đích"],["pressure","Pressure","Áp lực"],["growth","Growth","Trưởng thành"]],
  [["family","Family","Gia đình"],["parents","Parents","Cha mẹ"],["children","Children","Con cái"],["care","Care","Chăm sóc"],["belonging","Belonging","Gắn bó"],["patience","Patience","Kiên nhẫn"]],
  [["future","Future","Tương lai"],["unknown","Unknown","Điều chưa biết"],["choice","Choice","Lựa chọn"],["possibility","Possibility","Khả năng"],["courage","Courage","Can đảm"],["trust","Trust","Tin tưởng"]],
  [["money","Money","Tiền bạc"],["security","Security","An toàn"],["enough","Enough","Đủ đầy"],["giving","Giving","Sẻ chia"],["freedom","Freedom","Tự do"],["simplicity","Simplicity","Giản dị"]],
  [["health","Health","Sức khỏe"],["body","Body","Thân thể"],["energy","Energy","Năng lượng"],["healing","Recovery","Hồi phục"],["strength","Strength","Sức mạnh"],["tenderness","Tenderness","Dịu dàng"]],
  [["love","Love","Tình yêu"],["closeness","Closeness","Gần gũi"],["distance","Distance","Khoảng cách"],["listening","Listening","Lắng nghe"],["kindness","Kindness","Tử tế"],["letting-go","Letting go","Buông nhẹ"]],
  [["memory","Memory","Ký ức"],["childhood","Childhood","Tuổi thơ"],["regret","Regret","Tiếc nuối"],["gratitude","Gratitude","Biết ơn"],["forgiveness","Forgiveness","Tha thứ"],["story","Story","Câu chuyện"]],
  [["responsibility","Responsibility","Trách nhiệm"],["duty","Duty","Bổn phận"],["expectation","Expectation","Kỳ vọng"],["balance","Balance","Cân bằng"],["boundaries","Boundaries","Giới hạn"],["rest","Rest","Nghỉ ngơi"]],
  [["fear","Fear","Sợ hãi"],["doubt","Doubt","Hoài nghi"],["risk","Risk","Rủi ro"],["acceptance","Acceptance","Chấp nhận"],["hope","Hope","Hy vọng"],["steadiness","Steadiness","Vững chãi"]],
  [["change","Change","Thay đổi"],["ending","Ending","Kết thúc"],["beginning","Beginning","Khởi đầu"],["season","Season","Mùa"],["renewal","Renewal","Đổi mới"],["movement","Movement","Chuyển động"]]
];
const contexts=["surface","echo","root","opening","release"];
const nodes=[];
for(let g=0;g<groups.length;g++)for(let w=0;w<groups[g].length;w++)for(let c=0;c<contexts.length;c++){
  const [slug,en,vi]=groups[g][w],id=`${slug}-${contexts[c]}`;
  const related=[groups[g][(w+1)%6][0],groups[g][(w+2)%6][0],groups[(g+1)%groups.length][w%6][0],groups[(g+9)%groups.length][(w+1)%6][0]];
  nodes.push({id,label:{en,vi},tone:c===0?"difficulty":c===1?"beauty":c===2?"wisdom":c===3?"possibility":"release",connections:related.map((next,index)=>`${next}-${contexts[(c+index+1)%contexts.length]}`)});
}
mkdirSync("src/content/practice",{recursive:true});
writeFileSync("src/content/practice/thought-graph.json",JSON.stringify({version:1,nodes},null,2)+"\n");
console.log(`Created ${nodes.length} connected thought nodes.`);
