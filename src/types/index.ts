export type VerificationStatus = 'verified' | 'demo_unverified';

export interface VerifiedSource {
  id: string;
  title: string;
  authorOrInstitution: string;
  publicationYear?: string;
  url?: string;
  description: string;
  isOfficialArchived: boolean;
}

export interface CatalogItem {
  id: string;
  name: string;
  role: 'main_garment' | 'accessory' | 'footwear' | 'layer';
  description: string;
  imageOrIcon: string;
  demoStatus: VerificationStatus;
  sourceTitle?: string;
  sourceUrl?: string;
  reviewStatus?: 'approved' | 'pending' | 'unreviewed';
  reviewedAt?: string;
  verifiedFactSnippet?: string;
  citationIds?: string[];
  historicalPeriod?: string;
}

export interface OccasionOption {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  suggestedGarments?: string[];
}

export interface StyleVibeOption {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface ColorOption {
  id: string;
  name: string;
  hex: string;
  category: 'truyen-thong' | 'hien-dai';
}

export interface UserPreferences {
  startingPoint: 'garment' | 'occasion';
  garmentId?: string;
  occasionId?: string;
  styleVibe?: string;
  customStyleVibe?: string;
  selectedColors: string[];
  selectedAccessories: string[];
  allowAiAccessories: boolean;
  customRequest: string;
}

export interface LookItem {
  name: string;
  role: string;
  color: string;
  reason: string;
}

export interface CulturalNote {
  text: string;
  verification_status: VerificationStatus;
  citation_ids: string[];
}

export interface Look {
  id: string;
  name: string;
  occasion_fit: string;
  items: LookItem[];
  stylistic_suggestions: string;
  cultural_notes: CulturalNote[];
  uncertainties: string[];
  care_note: string | null;
}

export interface GeminiStylistResponse {
  clarification_question: string | null;
  looks: Look[];
  isDemoFallback?: boolean;
}

export interface SavedLookbookEntry {
  id: string;
  look: Look;
  savedAt: string;
  notes?: string;
}

// Backward-compatibility types for legacy helper components
export interface Garment {
  id: string;
  name: string;
  dynasty: string;
  era: string;
  description: string;
  heritageMeaning: string;
  cutStructure: string;
  defaultColor: string;
  defaultPantsColor: string;
  pattern: 'van-may' | 'hoa-sen' | 'chim-hac' | 'tron-tron' | 'hoa-cuc';
  recommendedOccasion: string;
  tag: string;
}

export interface Accessory {
  id: string;
  name: string;
  category: 'headwear' | 'jewelry' | 'outerwear' | 'bag' | 'footwear';
  icon: string;
  description: string;
  vibe: 'traditional' | 'modern' | 'streetwear' | 'vintage';
}

export interface EventContext {
  id: string;
  name: string;
  category: string;
  recommendedGarments: string[];
  etiquetteNote: string;
}

export interface CityWeather {
  city: string;
  temp: string;
  condition: string;
  season: string;
  fabricAdvice: string;
}

export interface ColorItem {
  id: string;
  name: string;
  hex: string;
  element: 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ';
  elementMeaning: string;
  palettesType: 'ngu-hanh' | 'genz-trend';
}

export interface OutfitConfig {
  garmentId: string;
  outerColor: string;
  innerPantsColor: string;
  collarSide: 'right_over_left' | 'left_over_right';
  pattern: 'van-may' | 'hoa-sen' | 'chim-hac' | 'tron-tron' | 'hoa-cuc';
  styleVibe: string;
  selectedAccessories: string[];
  avatarId: string;
  customAvatarUrl?: string;
  event: string;
  city: string;
  weather: string;
}

export interface LookbookCardData {
  id: string;
  title: string;
  creatorName: string;
  timestamp: string;
  config: OutfitConfig;
  score: number;
  poem: string;
  tags: string[];
}

export interface VietPhucStylistResponse {
  outfit_recommendation: {
    title: string;
    main_garment: string;
    color_palette: {
      primary_colors: string[];
      harmony_analysis: string;
    };
    accessories: string[];
    modern_twist: string;
  };
  cultural_knowledge: {
    origin_and_history: string;
    cultural_meaning: string;
  };
  context_suitability: {
    event_matching: string;
    weather_note: string;
  };
  cultural_preservation_warning: {
    has_warning: boolean;
    warning_message: string;
  };
  image_generation_prompt: string;
}

