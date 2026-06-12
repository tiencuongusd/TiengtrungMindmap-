import { Lesson, MindMapNode } from '../types';
import { allLessons } from './lessons/categories';

// Helper function to convert uppercase Vietnamese words to normal capitalized/sentence case.
// This preserves correct Vietnamese spelling and avoids font-rendering glitches caused by ALL CAPS styles in custom fonts.
export function formatVietnameseTitle(text: string): string {
  if (!text) return text;

  // Split on symbols like / : ( ) [ ] to format each part properly
  // Match delimiters without losing them
  const parts = text.split(/([/:\(\)\[\]]+)/);
  
  const formattedParts = parts.map(part => {
    // Trimmed part check
    const trimmed = part.trim();
    if (!trimmed) return part;
    
    // Check if the part is completely uppercase and contains at least one letter
    const hasLetters = part.toLowerCase() !== part.toUpperCase();
    const isUpper = part === part.toUpperCase();
    
    if (hasLetters && isUpper) {
      // Lowercase it
      const lower = part.toLowerCase();
      
      // Capitalize first character, preserving leading whitespace from original part
      // Let's find first letter index
      const firstLetterMatch = lower.match(/[\p{L}]/u);
      if (firstLetterMatch && firstLetterMatch.index !== undefined) {
        const idx = firstLetterMatch.index;
        return lower.substring(0, idx) + lower.charAt(idx).toUpperCase() + lower.substring(idx + 1);
      }
      return lower;
    }
    
    return part;
  });
  
  let result = formattedParts.join("");
  
  // Make sure the entire string starts with a capital letter
  const firstLetterMatch = result.match(/[\p{L}]/u);
  if (firstLetterMatch && firstLetterMatch.index !== undefined) {
    const idx = firstLetterMatch.index;
    if (result.charAt(idx) === result.charAt(idx).toLowerCase()) {
      result = result.substring(0, idx) + result.charAt(idx).toUpperCase() + result.substring(idx + 1);
    }
  }
  
  return result;
}

function formatMindMapNode(node: MindMapNode): MindMapNode {
  return {
    ...node,
    vietnamese: formatVietnameseTitle(node.vietnamese),
    children: node.children ? node.children.map(formatMindMapNode) : undefined
  };
}

function formatLesson(lesson: Lesson): Lesson {
  let originalTitle = lesson.title;
  
  // Remove Chinese characters inside standard or full-width parentheses
  originalTitle = originalTitle.replace(/\s*\([^)]*[\u4e00-\u9fa5\u3400-\u4dbf][^)]*\)/g, '');
  originalTitle = originalTitle.replace(/\s*（[^）]*[\u4e00-\u9fa5\u3400-\u4dbf][^）]*）/g, '');

  if (lesson.id >= 1001) {
    originalTitle = originalTitle.replace(/^(từ vựng:\s*|từ vựng\s*)/i, '');
  }
  const formattedTitle = formatVietnameseTitle(originalTitle.trim());
  
  let formattedDescription = lesson.description;
  if (formattedDescription) {
    // If the description contains the UPPERCASE title, replace it with lowercase formatted title for natural sentence flow.
    if (originalTitle === originalTitle.toUpperCase() && formattedTitle !== originalTitle) {
      // Create a safe pattern for replacing the whole word title
      const escapedTitle = originalTitle.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      formattedDescription = formattedDescription.replace(
        new RegExp(escapedTitle, 'g'),
        formattedTitle.toLowerCase()
      );
    }
  }
  
  return {
    ...lesson,
    title: formattedTitle,
    description: formattedDescription,
    mindMaps: lesson.mindMaps ? lesson.mindMaps.map(formatMindMapNode) : []
  };
}

export const lessons: Lesson[] = allLessons.map(formatLesson);
