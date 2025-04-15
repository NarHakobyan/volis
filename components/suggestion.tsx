'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useWindowSize } from 'usehooks-ts';

import type { UISuggestion } from '@/lib/editor/suggestions';

import { CrossIcon, MessageIcon, HighlightIcon } from './icons';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import type { ArtifactKind } from './artifact';

export const Suggestion = ({
  suggestion,
  onApply,
  artifactKind,
}: {
  suggestion: UISuggestion;
  onApply: () => void;
  artifactKind: ArtifactKind;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { width: windowWidth } = useWindowSize();

  // Determine icon and styling based on suggestion type
  const isImportance = suggestion.type === 'importance';
  const SuggestionIcon = isImportance ? HighlightIcon : MessageIcon;
  const tooltipTitle = isImportance ? 'Important' : 'Suggestion';
  const bgColorClass = isImportance ? 'bg-yellow-50 dark:bg-yellow-950/40' : '';
  const borderColorClass = isImportance ? 'border-yellow-300 dark:border-yellow-700' : 'border';

  return (
    <AnimatePresence>
      {!isExpanded ? (
        <motion.div
          className={cn('cursor-pointer p-1', {
            'absolute -right-8': artifactKind === 'text',
            'sticky top-0 right-4': artifactKind === 'code',
            'text-yellow-500': isImportance,
            'text-muted-foreground': !isImportance,
          })}
          onClick={() => {
            setIsExpanded(true);
          }}
          whileHover={{ scale: 1.1 }}
        >
          <SuggestionIcon size={windowWidth && windowWidth < 768 ? 16 : 14} />
        </motion.div>
      ) : (
        <motion.div
          key={suggestion.id}
          className={cn(`p-3 flex flex-col gap-3 rounded-2xl text-sm w-56 shadow-xl z-50 -right-12 md:-right-16 font-sans absolute border ${borderColorClass} ${bgColorClass}`)}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: -20 }}
          exit={{ opacity: 0, y: -10 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-2">
              <div className={cn("size-4 rounded-full", {
                "bg-yellow-400/40": isImportance,
                "bg-muted-foreground/25": !isImportance
              })} />
              <div className="font-medium">{tooltipTitle}</div>
            </div>
            <button
              type="button"
              className="text-xs text-gray-500 cursor-pointer"
              onClick={() => {
                setIsExpanded(false);
              }}
            >
              <CrossIcon size={12} />
            </button>
          </div>
          <div>{suggestion.description}</div>
          <Button
            variant={isImportance ? "secondary" : "outline"}
            className="w-fit py-1.5 px-3 rounded-full"
            onClick={onApply}
          >
            {isImportance ? "Accept" : "Apply"}
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
