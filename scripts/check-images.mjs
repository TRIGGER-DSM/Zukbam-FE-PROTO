import assert from 'node:assert/strict';
import { stat } from 'node:fs/promises';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

const server = await createServer({
  configFile: false,
  server: { middlewareMode: true },
  appType: 'custom',
});

try {
  const { Image } = await server.ssrLoadModule('/src/shared/ui/Image.tsx');
  const { imageSources } = await server.ssrLoadModule('/src/shared/assets/imageSources.ts');
  for (const [original, optimized] of Object.entries(imageSources)) {
    const markup = renderToStaticMarkup(
      createElement(Image, { src: original, alt: '', sizes: '300px' }),
    );
    assert.ok(!markup.includes('.png'));
    assert.ok(markup.includes('loading="lazy"'));
    assert.ok(markup.includes('decoding="async"'));
    assert.ok(markup.includes('sizes="300px"'));
    assert.ok(markup.includes('srcSet='));
    assert.ok(optimized.width > 0 && optimized.height > 0);
    const originalSize = (await stat(`public${original}`)).size;
    const optimizedSize = (await stat(`.${optimized.src}`)).size;
    assert.ok(optimizedSize < originalSize, original);
  }
  const hero = renderToStaticMarkup(
    createElement(Image, {
      src: '/images/home/recommend-mascot.png',
      alt: '',
      loading: 'eager',
      fetchPriority: 'high',
    }),
  );
  assert.ok(hero.includes('loading="eager"'));
  assert.ok(hero.includes('fetchPriority="high"'));
  const icon = renderToStaticMarkup(createElement(Image, { src: '/images/home/xp.svg', alt: '' }));
  assert.ok(icon.includes('src="/images/home/xp.svg"'));
  assert.ok(!icon.includes('srcSet='));
  console.log(
    `Verified ${Object.keys(imageSources).length} optimized image sources, responsive loading and hero priority.`,
  );
} finally {
  await server.close();
}
