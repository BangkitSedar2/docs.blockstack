import React from 'react';
import { Box, color, space } from '@blockstack/ui';
import { TOC_WIDTH } from '@common/constants';
import { slugify } from '@common/utils';
import { Text } from '@components/typography';
import { Link } from '@components/mdx';
import { useActiveHeading } from '@common/hooks/use-active-heading';

const getLevelPadding = (level: number) => {
  switch (level) {
    case 2:
      return space('base-loose');
    case 3:
      return space('extra-loose');
    default:
      return 0;
  }
};

const Item = ({ slug, label, level }) => {
  const { isActive: _isActive, doChangeActiveSlug, slugInView } = useActiveHeading(slug);
  const isOnScreen = slugInView === slug;

  const isActive = isOnScreen || _isActive;
  return (
    <Box pl={getLevelPadding(level - 2)} py={space('extra-tight')}>
      <Link
        href={`#${slug}`}
        fontSize="14px"
        color={isActive ? color('text-title') : color('text-caption')}
        fontWeight={isActive ? '600' : '400'}
        onClick={() => doChangeActiveSlug(slug)}
        textDecoration="none"
        _hover={{
          textDecoration: 'underline',
          color: color('accent'),
        }}
        pointerEvents={isActive ? 'none' : 'unset'}
      >
        <Box as="span" dangerouslySetInnerHTML={{ __html: label }} />
      </Link>
    </Box>
  );
};

export const TableOfContents = ({
  headings,
}: {
  headings?: {
    content: string;
    level: number;
  }[];
}) => {
  return (
    <Box position="relative">
      <Box
        mt="50px"
        flexShrink={0}
        display={['none', 'none', 'block', 'block']}
        minWidth={['100%', `${TOC_WIDTH}px`, `${TOC_WIDTH}px`]}
        position="sticky"
        top="118px"
        pr={space('base')}
      >
        <Box mb={space('extra-tight')}>
          <Text fontWeight="bold" fontSize="14px">
            On this page
          </Text>
        </Box>
        {headings.map((heading, index) => {
          return index > 0 ? (
            <Item
              level={heading.level}
              slug={slugify(heading.content)}
              label={heading.content}
              key={index}
            />
          ) : null;
        })}
      </Box>
    </Box>
  );
};
