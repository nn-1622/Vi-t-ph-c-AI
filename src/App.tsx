import React, { useState, useEffect } from 'react';
import { UserPreferences, GeminiStylistResponse, Look, SavedLookbookEntry } from './types';
import { CATALOG_ITEMS, VERIFIED_SOURCES, OCCASIONS, COLOR_OPTIONS } from './data/culturalDatabase';
import { Header } from './components/Header';
import { ThreeDModelViewer } from './components/ThreeDModelViewer';
import { StylingForm } from './components/StylingForm';
import { AiImageStudio } from './components/AiImageStudio';
import { ResultsView } from './components/ResultsView';
import { CompareView } from './components/CompareView';
import { LookbookDrawer } from './components/LookbookDrawer';
import { HowItWorksModal } from './components/HowItWorksModal';
import { AboutContentModal } from './components/AboutContentModal';
import { ReportModal } from './components/ReportModal';
import { SubmissionOverviewModal } from './components/SubmissionOverviewModal';
import { ThreeDModal } from './components/ThreeDModal';
import { Footer } from './components/Footer';
import { AlertCircle, RefreshCw, Sparkles, Eye, ShieldCheck, ChevronDown, Check } from 'lucide-react';

const STORAGE_KEY = 'viet_phuc_ai_stylist_lookbook_v1';

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [response, setResponse] = useState<GeminiStylistResponse | null>(null);
  const [lastPreferences, setLastPreferences] = useState<UserPreferences | null>(null);
  const [savedLooks, setSavedLooks] = useState<SavedLookbookEntry[]>([]);
  const [compareLooks, setCompareLooks] = useState<Look[] | null>(null);

  // Live 3D Model State (Always rendered in the center)
  const [selectedGarmentId, setSelectedGarmentId] = useState<string>('ao-ngu-than-tay-chen');
  const [selectedColors, setSelectedColors] = useState<string[]>(['Xanh Chàm Cố Đô']);
  const [selectedPantsColor, setSelectedPantsColor] = useState<string>('#ffffff');
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>(['Quạt Nan Gỗ Trầm']);

  // Modals state
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isAboutContentOpen, setIsAboutContentOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isSubmissionDocOpen, setIsSubmissionDocOpen] = useState(false);
  const [isLookbookDrawerOpen, setIsLookbookDrawerOpen] = useState(false);
  const [isThreeDModalOpen, setIsThreeDModalOpen] = useState(false);

  // Load saved lookbook from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSavedLooks(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
  }, []);

  const updateSavedLooks = (newEntries: SavedLookbookEntry[]) => {
    setSavedLooks(newEntries);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newEntries));
    } catch (e) {
      console.warn('Could not write to localStorage', e);
    }
  };

  const handleSaveLook = (look: Look) => {
    const existingIndex = savedLooks.findIndex((item) => item.look.id === look.id);
    if (existingIndex >= 0) {
      const updated = savedLooks.filter((item) => item.look.id !== look.id);
      updateSavedLooks(updated);
    } else {
      const newEntry: SavedLookbookEntry = {
        id: `saved-${Date.now()}-${look.id}`,
        look,
        savedAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };
      updateSavedLooks([newEntry, ...savedLooks]);
    }
  };

  const handleRemoveSavedEntry = (id: string) => {
    updateSavedLooks(savedLooks.filter((item) => item.id !== id));
  };

  const handleClearAllLookbook = () => {
    updateSavedLooks([]);
  };

  // Derive 3D properties directly from selections
  const currentGarment = CATALOG_ITEMS.find((g) => g.id === selectedGarmentId) || CATALOG_ITEMS[0];
  const primaryColorName = selectedColors[0] || 'Xanh Chàm Cố Đô';
  const foundColor = COLOR_OPTIONS.find((c) => c.name.toLowerCase() === primaryColorName.toLowerCase());
  const threeDColorHex = foundColor ? foundColor.hex : '#1e3a8a';
  const sleeveType: 'chen' | 'thung' = selectedGarmentId === 'ao-tac' ? 'thung' : 'chen';
  const hasManCuon = selectedAccessories.includes('Mấn Cuộn Vải Gấm') || true;
  const hasKiengBac = selectedAccessories.includes('Kiềng Bạc Chạm Hoa Sen') || true;

  const handleCallStylist = async (preferences: UserPreferences) => {
    setIsLoading(true);
    setErrorMessage(null);
    setLastPreferences(preferences);
    setCompareLooks(null);

    try {
      const garment = CATALOG_ITEMS.find((i) => i.id === preferences.garmentId);
      const occasion = OCCASIONS.find((o) => o.id === preferences.occasionId);

      const payload = {
        userPreferences: {
          ...preferences,
          garmentName: garment?.name,
          occasionName: occasion?.name,
        },
        availableItems: CATALOG_ITEMS.map((i) => ({
          name: i.name,
          role: i.role,
          demoStatus: i.demoStatus,
        })),
        verifiedContext: CATALOG_ITEMS.filter((i) => i.demoStatus === 'verified').map((i) => ({
          item: i.name,
          historicalFact: i.verifiedFactSnippet,
          citationIds: i.citationIds,
        })),
      };

      const res = await fetch('/api/gemini/stylist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Máy chủ phản hồi mã lỗi: ${res.status}`);
      }

      const data = await res.json();
      if (data.success && data.data) {
        setResponse(data.data);
        setTimeout(() => {
          document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        throw new Error(data.error || 'Dữ liệu nhận về không hợp lệ');
      }
    } catch (err: any) {
      console.error('Stylist call failed:', err);
      setErrorMessage(err.message || 'Không thể kết nối đến máy chủ. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = () => {
    if (lastPreferences) {
      handleCallStylist(lastPreferences);
    }
  };

  const handleAnswerClarification = (answer: string) => {
    if (lastPreferences) {
      handleCallStylist({
        ...lastPreferences,
        customRequest: `${lastPreferences.customRequest ? lastPreferences.customRequest + '; ' : ''}${answer}`,
      });
    }
  };

  // When user clicks a look in results, smoothly update the central 3D model!
  const handleOpenLookInThreeD = (look: Look) => {
    const mainItem = look.items.find((i) => i.role.includes('chính')) || look.items[0];
    const matchGarment = CATALOG_ITEMS.find((g) => mainItem && mainItem.name.toLowerCase().includes(g.name.toLowerCase()));
    if (matchGarment) {
      setSelectedGarmentId(matchGarment.id);
    }

    if (mainItem?.color) {
      setSelectedColors([mainItem.color]);
    }

    // Scroll smoothly up to the 3D model in center
    document.getElementById('three-d-center-stage')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGenerateImageForLook = (look: Look) => {
    const mainItem = look.items.find((i) => i.role.includes('chính')) || look.items[0];
    const matchGarment = CATALOG_ITEMS.find((g) => mainItem && mainItem.name.toLowerCase().includes(g.name.toLowerCase()));
    if (matchGarment) {
      setSelectedGarmentId(matchGarment.id);
    }

    if (mainItem?.color) {
      setSelectedColors([mainItem.color]);
    }

    // Scroll smoothly down to the AI Image Studio
    document.getElementById('ai-image-studio-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans selection:bg-rose-700 selection:text-white">
      {/* Header */}
      <Header
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
        onOpenAboutContent={() => setIsAboutContentOpen(true)}
        onOpenLookbook={() => setIsLookbookDrawerOpen(true)}
        onOpenSubmissionDoc={() => setIsSubmissionDocOpen(true)}
        onOpenThreeD={() => setIsThreeDModalOpen(true)}
        onScrollToImageStudio={() => document.getElementById('ai-image-studio-section')?.scrollIntoView({ behavior: 'smooth' })}
        lookbookCount={savedLooks.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        
        {/* SECTION 1: MÔ HÌNH NGƯỜI 3D Ở CHÍNH GIỮA (CENTER STAGE) */}
        <section id="three-d-center-stage" className="space-y-3 text-center">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white border border-amber-300 text-stone-800 text-xs font-semibold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Mô Hình Người 3D Trực Tiếp — Người Mẫu Diện Cổ Phục Xoay 360°</span>
            </div>
            <h1 className="font-serif-vi text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Phòng Thử 3D Việt Phục & Áo Dài Trên Người Mẫu
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto font-normal">
              Người mẫu 3D tương tác ở chính giữa mặc trang phục bạn chọn. Hãy chọn mẫu áo và bảng màu ở bên dưới để quan sát thay đổi trực tiếp trên người mẫu!
            </p>
          </div>

          {/* THE 3D CANVAS IN THE VERY CENTER */}
          <div className="w-full max-w-3xl mx-auto shadow-md rounded-3xl overflow-hidden border-2 border-amber-900/20 bg-white">
            <ThreeDModelViewer
              garmentName={currentGarment.name}
              garmentColor={threeDColorHex}
              pantsColor={selectedPantsColor}
              sleeveType={sleeveType}
              hasManCuon={hasManCuon}
              hasKiengBac={hasKiengBac}
            />
          </div>

          {/* Quick Indicator Below 3D Model */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-stone-600 pt-1">
            <span className="font-bold text-amber-950 flex items-center bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-300">
              <Check className="w-3.5 h-3.5 mr-1 text-emerald-700" />
              Đang thử: {currentGarment.name}
            </span>
            <span className="flex items-center space-x-1.5 bg-white px-2.5 py-0.5 rounded-full border border-stone-200">
              <span>Màu tà:</span>
              <span className="w-3.5 h-3.5 rounded-full border border-stone-300 inline-block" style={{ backgroundColor: threeDColorHex }} />
              <strong className="text-stone-800">{primaryColorName}</strong>
            </span>
            <span className="flex items-center space-x-1.5 bg-white px-2.5 py-0.5 rounded-full border border-stone-200">
              <span>Quần:</span>
              <span className="w-3.5 h-3.5 rounded-full border border-stone-300 inline-block" style={{ backgroundColor: selectedPantsColor }} />
            </span>
            <span className="text-[11px] text-stone-500 font-medium hidden sm:inline">
              (Kéo chuột trên mô hình để xoay 360°)
            </span>
          </div>
        </section>

        {/* SECTION 2: BẢNG LỰA CHỌN Ở BÊN DƯỚI MÔ HÌNH (THAY ĐỔI 3D TRỰC TIẾP) */}
        <section id="customization-controls-section" className="space-y-4">
          <StylingForm
            onSubmit={handleCallStylist}
            isLoading={isLoading}
            selectedGarmentId={selectedGarmentId}
            onSelectGarmentId={(id) => setSelectedGarmentId(id)}
            selectedColors={selectedColors}
            onSelectColors={(cols) => setSelectedColors(cols)}
            selectedPantsColor={selectedPantsColor}
            onSelectPantsColor={(hex) => setSelectedPantsColor(hex)}
            selectedAccessories={selectedAccessories}
            onSelectAccessories={(accs) => setSelectedAccessories(accs)}
          />
        </section>

        {/* SECTION 3: STUDIO TẠO & CHỈNH SỬA ẢNH ÁO DÀI THEO MẪU ĐƯỢC CHỌN (GEMINI AI) */}
        <section id="ai-image-studio-section" className="space-y-4">
          <AiImageStudio
            selectedGarmentName={currentGarment.name}
            selectedColorName={primaryColorName}
            selectedOccasionName={OCCASIONS.find((o) => o.id === selectedGarmentId)?.name || 'Lễ hội & Sự kiện'}
            selectedPantsName={
              selectedPantsColor === '#ffffff'
                ? 'Trắng Ngà / Bạch'
                : selectedPantsColor === '#1c1917'
                ? 'Huyền Đen Tuyết'
                : 'Vàng Tơ Tằm'
            }
          />
        </section>

        {/* Error Notification if any */}
        {errorMessage && (
          <div className="p-5 rounded-3xl bg-rose-50 border border-rose-300 text-left space-y-2 shadow-xs">
            <div className="flex items-center space-x-2 text-rose-800 font-bold text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>Đã xảy ra lỗi khi tạo gợi ý phối đồ</span>
            </div>
            <p className="text-xs text-stone-700 pl-7">{errorMessage}</p>
            <div className="pl-7 pt-1">
              <button
                onClick={handleRegenerate}
                className="px-4 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Thử lại</span>
              </button>
            </div>
          </div>
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="p-12 text-center bg-white rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800 animate-pulse">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="font-serif-vi text-base font-bold text-stone-900">
              Đang phân tích bối cảnh và phối trang phục...
            </h4>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Gemini đang rà soát dữ liệu văn hóa có nguồn và chọn lọc tối đa 3 phương án hài hòa nhất.
            </p>
          </div>
        )}

        {/* Compare View (if active) */}
        {compareLooks && compareLooks.length >= 2 && (
          <section id="compare-section">
            <CompareView
              looks={compareLooks}
              onClose={() => setCompareLooks(null)}
              onSaveLook={handleSaveLook}
              savedLookIds={savedLooks.map((s) => s.look.id)}
            />
          </section>
        )}

        {/* Results View */}
        {response && (
          <section id="results-section">
            <ResultsView
              response={response}
              onSaveLook={handleSaveLook}
              savedLookIds={savedLooks.map((s) => s.look.id)}
              onRegenerate={handleRegenerate}
              onCompareLooks={(looks) => setCompareLooks(looks)}
              onAnswerClarification={handleAnswerClarification}
              onOpenLookInThreeD={handleOpenLookInThreeD}
              onGenerateImageForLook={handleGenerateImageForLook}
            />
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
        onOpenAboutContent={() => setIsAboutContentOpen(true)}
        onOpenReport={() => setIsReportOpen(true)}
        onOpenSubmissionDoc={() => setIsSubmissionDocOpen(true)}
      />

      {/* Lookbook Drawer */}
      <LookbookDrawer
        isOpen={isLookbookDrawerOpen}
        onClose={() => setIsLookbookDrawerOpen(false)}
        entries={savedLooks}
        onRemoveEntry={handleRemoveSavedEntry}
        onClearAll={handleClearAllLookbook}
      />

      {/* Optional Fullscreen 3D Modal if user clicks from Header */}
      <ThreeDModal
        isOpen={isThreeDModalOpen}
        onClose={() => setIsThreeDModalOpen(false)}
        initialGarmentName={currentGarment.name}
        initialColorHex={threeDColorHex}
        initialPantsHex={selectedPantsColor}
        onApplyConfig={(gName, cHex, pHex) => {
          const matchG = CATALOG_ITEMS.find((g) => g.name.toLowerCase() === gName.toLowerCase());
          if (matchG) setSelectedGarmentId(matchG.id);
          const matchC = COLOR_OPTIONS.find((c) => c.hex.toLowerCase() === cHex.toLowerCase());
          if (matchC) setSelectedColors([matchC.name]);
          setSelectedPantsColor(pHex);
        }}
      />

      {/* Modals */}
      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
      />

      <AboutContentModal
        isOpen={isAboutContentOpen}
        onClose={() => setIsAboutContentOpen(false)}
      />

      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />

      <SubmissionOverviewModal
        isOpen={isSubmissionDocOpen}
        onClose={() => setIsSubmissionDocOpen(false)}
      />
    </div>
  );
}
