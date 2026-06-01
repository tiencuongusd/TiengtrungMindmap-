export interface MindMapNode {
  id: string;
  vietnamese: string;
  chinese: string;
  pinyin: string;
  vietnameseHint?: string;
  children?: MindMapNode[];
}

export interface Lesson {
  id: number;
  title: string;
  description?: string;
  mindMaps: MindMapNode[];
}

export interface LessonGroup {
  id: number;
  topicId: number;
  topicTitle: string;
  title: string;
  description?: string;
  lessonIds: number[];
}
