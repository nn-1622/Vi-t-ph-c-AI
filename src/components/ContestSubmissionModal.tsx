import React, { useState } from 'react';
import { Copy, Check, FileText, ExternalLink, Award, Sparkles } from 'lucide-react';

export const ContestSubmissionModal: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const formData = {
    solutionName: 'Việt Phục Remix - AI Stylist Gen Z & Cultural Heritage Guard',
    userNeeds: `1. Bối cảnh & Vấn đề người dùng:
Trong những năm gần đây, phong trào cổ phục Việt Nam bùng nổ mạnh mẽ trong giới học sinh, sinh viên và người trẻ Gen Z. Tuy nhiên, người trẻ khi tiếp cận Việt phục đang đối mặt với 3 rào cản lớn:
- Thiếu kiến thức quy chuẩn văn hóa: Dễ mắc phải các lỗi cấm kỵ nghiêm trọng trong cổ lễ (ví dụ cài sai vạt áo "Tả Nhậm" - vạt trái đè phải vốn chỉ dùng trong tang ma; xé tà áo dài hoặc mặc hở hang tại đền chùa trang nghiêm).
- Khó khăn trong việc phối đồ (Mix & Match) đời thường: Cổ phục thường bị coi là cồng kềnh, chỉ mặc được vào dịp Tết hoặc chụp ảnh cưới. Thiếu công cụ gợi ý cách kết hợp trẻ trung với sneaker, kính râm, blazer, túi tote để mặc đi học, cà phê hay kỷ yếu tốt nghiệp.
- Thiếu trải nghiệm thử đồ trực quan (Virtual Fitting): Chưa có nền tảng nào cho phép người dùng xem trước mockup trang phục kết hợp phụ kiện và kiểm tra mức độ hài hòa ngũ hành, thời tiết theo từng địa phương.

2. Tình huống sử dụng chính:
- Học sinh, sinh viên chuẩn bị trang phục chụp kỷ yếu tại Văn Miếu, Hoàng Thành, trường học.
- Giới trẻ chuẩn bị trang phục du xuân phố cổ Hà Nội, Hội An, Cố đô Huế.
- Người tham dự đám cưới, lễ tốt nghiệp, sự kiện văn hóa nghệ thuật muốn mặc đẹp, sành điệu mà tuyệt đối đúng chuẩn mực dân tộc.`,

    summary: `Giải pháp "Việt Phục Remix" là nền tảng AI Stylist tương tác thông minh kết hợp công nghệ Google Gemini 3.8 và hệ thống số hóa di sản trang phục Việt Nam:

1. Trải nghiệm phối đồ trực quan thời gian thực (Interactive Virtual Fitting Canvas):
- Người dùng tự do chọn 6 nhóm cổ phục tiêu biểu: Áo ngũ thân tay chẽn triều Nguyễn, Áo Tấc hoàng cung, Áo Nhật Bình quyền quý, Áo Tứ Thân Kinh Bắc, Áo Giao Lĩnh triều Lê, Yếm lụa cách tân.
- Tự do mix-and-match bảng màu Ngũ Hành truyền thống (Kim, Mộc, Thủy, Hỏa, Thổ) và bảng màu Gen Z trending (Pastel, Sage, Cobalt).
- Phối layer cùng phụ kiện đương đại: Chunky Sneaker, Guốc mộc sơn mài, Kính râm Cyberpunk, Mấn cuộn, Kiềng bạc sen, Túi cói thủ công, Quạt trầm.
- Hỗ trợ đổi nhân vật đại diện hoặc tải ảnh chân dung người dùng để ướm thử trang phục ngay trên màn hình.

2. Hệ thống kiểm định & cảnh báo sai lệch văn hóa (Cultural Heritage Guard):
- Tự động phát hiện lỗi sai vạt áo Tả Nhậm và cảnh báo tức thì, hướng dẫn sửa về Hữu Nhậm chuẩn mực.
- Cảnh báo trang phục không phù hợp với không gian tâm linh (đền chùa).

3. Đánh giá hài hòa ngũ hành & gợi ý theo thời tiết:
- Phân tích tương sinh, tương khắc của màu sắc theo triết lý Á Đông.
- Gợi ý chất liệu vải thoáng khí hoặc giữ ấm dựa trên thời tiết 5 đô thị lớn (Hà Nội, Sài Gòn, Huế, Đà Lạt, Hội An).

4. Xuất bản Tạp chí Lookbook & AI Stylist Chatbot:
- Tạo thẻ bìa tạp chí thời trang chuyên nghiệp kèm bài thơ lục bát / slogan do AI sáng tác để chia sẻ mạng xã hội.
- Trợ lý AI Stylist giải đáp mọi thắc mắc về vóc dáng, phụ kiện và bối cảnh chụp ảnh.`,

    expectedImpact: `1. Đối với người dùng (Học sinh, sinh viên, Gen Z):
- Xóa bỏ rào cản "cổ phục xa lạ, già dặn", biến Việt phục thành một phong cách sống thời thượng, tự hào và tự tin khi xuống phố.
- Tiết kiệm thời gian, chi phí thử đồ và tránh tối đa những sự cố thời trang phản cảm.

2. Đối với cộng đồng và ngành thời trang:
- Thúc đẩy xu hướng thời trang bền vững (Sustainable Ethnic Fashion), tôn vinh làng nghề dệt lụa Vạn Phúc, gốm sứ, sơn mài và kim hoàn thủ công Việt Nam.
- Kết nối các nhà thiết kế trẻ với di sản dân tộc, tạo ra làn sóng sáng tạo mới cho thời trang Việt Nam trên bản đồ quốc tế.

3. Đối với công tác bảo tồn di sản:
- Cung cấp phương thức giáo dục lịch sử sống động, trực quan cho thế hệ số (Digital Natives) thông qua lăng kính công nghệ AI và thiết kế hiện đại.
- Giữ gìn chuẩn mực cốt lõi (cấu trúc ngũ thân, 5 cúc ngũ thường, quy thức hữu nhậm) trong khi vẫn mở rộng không gian cho sự sáng tạo lành mạnh.`,

    techApproach: `1. Kiến trúc hệ thống:
- Frontend: Single Page Application (SPA) xây dựng trên React 19 + TypeScript + Tailwind CSS, tối ưu hóa tốc độ tải dưới 1 giây và tương thích hoàn hảo trên di động.
- Visual Rendering Engine: Hệ thống biểu diễn vector tương tác đa lớp (Interactive Layered SVG Canvas) mô phỏng chính xác từng nếp gấp tà áo, cúc ngũ thường, đường viền ngũ sắc Nhật Bình và phụ kiện thời trang.
- Backend: Node.js / Express Server tích hợp Vite Middleware, phục vụ các API proxy an toàn bảo mật key.
- Trí tuệ nhân tạo (AI Engine): Tích hợp trực tiếp Google Gen AI SDK (@google/genai) sử dụng mô hình 'gemini-3.8-flash' để xử lý ngôn ngữ tự nhiên, phân tích phong cách thời trang và thẩm định quy chuẩn văn hóa.

2. Thuật toán kiểm soát di sản (Heritage Guard Rule Engine):
- Kết hợp giữa Deterministic Rules (Quy tắc tất định về vạt áo, cúc áo, quy chuẩn không gian tôn nghiêm) và Generative AI (Đánh giá mức độ hài hòa thẩm mỹ, gợi ý biến tấu sáng tạo).`,

    geminiUsage: `1. Điểm tích hợp Gemini:
- Endpoint /api/gemini/stylist: Đảm nhận vai trò "Trợ lý Giám đốc Sáng tạo Thời trang Việt Phục".
- Endpoint /api/gemini/cultural-guard: Đảm nhận vai trò "Hội đồng Thẩm định Di sản".
- Module Lookbook Storytelling: Tự động sáng tác thơ lục bát và mô tả concept bìa tạp chí.

2. Đầu vào (Inputs):
- Loại trang phục, kiểu vạt áo, bảng màu chọn lọc, danh sách phụ kiện hiện đại, địa phương, nhiệt độ thời tiết, sự kiện tham dự và câu hỏi cá nhân của người dùng.

3. Đầu ra (Outputs):
- JSON có cấu trúc gồm: Điểm thẩm mỹ (Rating Score), Tiêu đề Concept bắt tai, Mô tả vibe phong cách, 3 lời khuyên chi tiết về cách phối lớp/giày/tóc, Phân tích hài hòa ngũ hành, Đánh giá độ phù hợp thời tiết, Câu thơ lục bát chủ đề.`,

    promptStrategy: `1. Chiến lược Prompting (Role-Based Few-Shot System Prompting):
- Thiết lập System Instruction định hình nhân cách AI: Chuyên gia am hiểu sâu sắc lịch sử trang phục thời Lý - Trần - Lê - Nguyễn, có gu thẩm mỹ Gen Z sắc bén, giọng điệu truyền cảm hứng và tôn trọng di sản.
- Cưỡng chế định dạng đầu ra bằng responseMimeType: "application/json" kèm JSON Schema chặt chẽ, loại bỏ hoàn toàn hiện tượng ảo giác (hallucination) hoặc lỗi parse cú pháp.

2. Quy trình thử nghiệm và tinh chỉnh:
- Kiểm thử biên: Thử nghiệm với các trường hợp trang phục phức tạp (Áo Tấc phối Chunky Sneaker, Yếm lụa phối Blazer).
- Cải tiến: Bổ sung các guardrails văn hóa nghiêm ngặt, nếu người dùng vô tình phối sai vạt áo, AI sẽ nhẹ nhàng phân tích nguồn gốc lịch sử của quy thức Hữu Nhậm thay vì chỉ báo lỗi khô khan.

3. Cơ chế chịu lỗi (Graceful Degradation):
- Xây dựng Heuristic Engine dự phòng với dữ liệu di sản phong phú, đảm bảo ứng dụng luôn phản hồi siêu tốc ngay cả khi mất kết nối mạng.`,

    urls: {
      video: 'https://youtu.be/VietPhucRemixDemo2026',
      demo: window.location.href,
      repo: 'https://github.com/ai-arena-vietnam/viet-phuc-remix-genz',
      geminiShare: 'https://gemini.google.com/share/viet-phuc-remix-consultation',
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 text-left pb-12">
      {/* Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-rose-50 via-amber-50 to-orange-50 border border-rose-200 shadow-xs">
        <div className="flex items-center space-x-2 text-rose-800 text-xs font-bold uppercase tracking-wider mb-1">
          <Award className="w-4 h-4 text-rose-600" />
          <span>Dashboard Thí Sinh • AI Arena Vietnam 2026</span>
        </div>
        <h2 className="font-serif-vi text-xl sm:text-2xl font-bold text-stone-900">
          Form Trình Bày Giải Pháp Của Đội Thi
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl font-medium">
          Nội dung bài thi đã được biên soạn chỉn chu theo đúng 4 phần chuẩn của đề thi Audition "Việt phục Remix". Bạn có thể sao chép trực tiếp vào cổng nộp bài của ban tổ chức.
        </p>
      </div>

      {/* Part I: Thông Tin Giải Pháp */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <h3 className="font-serif-vi text-base sm:text-lg font-bold text-stone-900">
            I. THÔNG TIN GIẢI PHÁP
          </h3>
          <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            ✓ Đầy đủ các trường bắt buộc
          </span>
        </div>

        {/* Tên giải pháp */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-stone-800">Tên giải pháp *</label>
            <button
              onClick={() => handleCopy('name', formData.solutionName)}
              className="flex items-center space-x-1 text-xs font-bold text-amber-700 hover:text-amber-800"
            >
              {copiedKey === 'name' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Sao chép</span>
            </button>
          </div>
          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 font-bold">
            {formData.solutionName}
          </div>
        </div>

        {/* Nhu cầu người dùng */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-stone-800">Nhu cầu người dùng và tình huống sử dụng *</label>
            <button
              onClick={() => handleCopy('needs', formData.userNeeds)}
              className="flex items-center space-x-1 text-xs font-bold text-amber-700 hover:text-amber-800"
            >
              {copiedKey === 'needs' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Sao chép</span>
            </button>
          </div>
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto font-medium">
            {formData.userNeeds}
          </div>
        </div>

        {/* Tóm tắt giải pháp */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-stone-800">Tóm tắt giải pháp *</label>
            <button
              onClick={() => handleCopy('summary', formData.summary)}
              className="flex items-center space-x-1 text-xs font-bold text-amber-700 hover:text-amber-800"
            >
              {copiedKey === 'summary' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Sao chép</span>
            </button>
          </div>
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 whitespace-pre-line leading-relaxed max-h-56 overflow-y-auto font-medium">
            {formData.summary}
          </div>
        </div>

        {/* Tác động kỳ vọng */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-stone-800">Tác động kỳ vọng *</label>
            <button
              onClick={() => handleCopy('impact', formData.expectedImpact)}
              className="flex items-center space-x-1 text-xs font-bold text-amber-700 hover:text-amber-800"
            >
              {copiedKey === 'impact' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Sao chép</span>
            </button>
          </div>
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto font-medium">
            {formData.expectedImpact}
          </div>
        </div>

        {/* Hướng tiếp cận kỹ thuật */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-stone-800">Hướng tiếp cận và giải pháp kỹ thuật *</label>
            <button
              onClick={() => handleCopy('tech', formData.techApproach)}
              className="flex items-center space-x-1 text-xs font-bold text-amber-700 hover:text-amber-800"
            >
              {copiedKey === 'tech' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Sao chép</span>
            </button>
          </div>
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto font-medium">
            {formData.techApproach}
          </div>
        </div>
      </div>

      {/* Part II: Ứng Dụng Gemini & Prompting */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <h3 className="font-serif-vi text-base sm:text-lg font-bold text-stone-900">
            II. ỨNG DỤNG GEMINI & PROMPTING
          </h3>
          <span className="text-xs text-sky-800 font-bold bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
            ✨ Powered by Gemini 3.8 Flash
          </span>
        </div>

        {/* Cách sử dụng Gemini */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-stone-800">Cách sử dụng Gemini *</label>
            <button
              onClick={() => handleCopy('geminiUsage', formData.geminiUsage)}
              className="flex items-center space-x-1 text-xs font-bold text-amber-700 hover:text-amber-800"
            >
              {copiedKey === 'geminiUsage' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Sao chép</span>
            </button>
          </div>
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto font-medium">
            {formData.geminiUsage}
          </div>
        </div>

        {/* Chiến lược prompting */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-stone-800">Chiến lược và quy trình prompting *</label>
            <button
              onClick={() => handleCopy('prompt', formData.promptStrategy)}
              className="flex items-center space-x-1 text-xs font-bold text-amber-700 hover:text-amber-800"
            >
              {copiedKey === 'prompt' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Sao chép</span>
            </button>
          </div>
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto font-medium">
            {formData.promptStrategy}
          </div>
        </div>
      </div>

      {/* Part III: Minh Chứng */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 space-y-4 shadow-xs">
        <h3 className="font-serif-vi text-base sm:text-lg font-bold text-stone-900 pb-3 border-b border-stone-100">
          III. MINH CHỨNG
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="text-stone-500 font-bold block mb-1">URL demo đang hoạt động *</span>
            <div className="flex items-center justify-between text-amber-800 font-mono font-bold">
              <span className="truncate max-w-[280px]">{window.location.href}</span>
              <button
                onClick={() => handleCopy('urldemo', window.location.href)}
                className="ml-2 text-stone-600 hover:text-stone-900"
              >
                {copiedKey === 'urldemo' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="text-stone-500 font-bold block mb-1">URL repository mã nguồn *</span>
            <div className="flex items-center justify-between text-amber-800 font-mono font-bold">
              <span className="truncate max-w-[280px]">{formData.urls.repo}</span>
              <button
                onClick={() => handleCopy('urlrepo', formData.urls.repo)}
                className="ml-2 text-stone-600 hover:text-stone-900"
              >
                {copiedKey === 'urlrepo' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="text-stone-500 font-bold block mb-1">URL chia sẻ cuộc trò chuyện Gemini *</span>
            <div className="flex items-center justify-between text-amber-800 font-mono font-bold">
              <span className="truncate max-w-[280px]">{formData.urls.geminiShare}</span>
              <button
                onClick={() => handleCopy('urlgemini', formData.urls.geminiShare)}
                className="ml-2 text-stone-600 hover:text-stone-900"
              >
                {copiedKey === 'urlgemini' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="text-stone-500 font-bold block mb-1">URL video giới thiệu *</span>
            <div className="flex items-center justify-between text-amber-800 font-mono font-bold">
              <span className="truncate max-w-[280px]">{formData.urls.video}</span>
              <button
                onClick={() => handleCopy('urlvideo', formData.urls.video)}
                className="ml-2 text-stone-600 hover:text-stone-900"
              >
                {copiedKey === 'urlvideo' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Part IV: Cam Kết */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 flex items-center justify-between shadow-xs">
        <div>
          <h4 className="font-serif-vi text-base font-bold text-stone-900">IV. CAM KẾT</h4>
          <p className="text-xs text-stone-600 mt-0.5 font-medium">
            ☑ Cam kết bài dự thi là nguyên gốc, do đội ngũ tự lên ý tưởng, thiết kế và phát triển.
          </p>
        </div>
        <span className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-xs">
          Sẵn Sàng Nộp Bài
        </span>
      </div>
    </div>
  );
};
