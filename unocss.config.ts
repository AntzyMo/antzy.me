import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    // presetWebFonts({
    //   provider: 'google',
    //   fonts: {
    //     notosanssc: 'Noto Sans SC'
    //   }
    // }),
    presetIcons({
      collections: {
        'carbon': () => import('@iconify-json/carbon/icons.json').then(i => i.default),
        'material-symbols': () => import('@iconify-json/material-symbols/icons.json').then(i => i.default)
      }
    }),
    presetTypography()
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      'c-bg': 'var(--c-bg)',

      // scrollbar
      'c-scrollbar': 'var(--c-scrollbar)',
      'c-scrollbar-hover': 'var(--c-scrollbar-hover)',

      // font-color-gay
      'fg': 'var(--fg)',
      'fg1': 'var(--fg1)',

      // panel
      'panel-bg': 'var(--panel-bg)',
      'panel-border': 'var(--panel-border)'
    }
  },
  shortcuts: {
    'logo-hover': 'cursor-pointer hover:op-70 op-50 transition',
    'link': 'border-b-1 border-b-dashed border-b-color-fg-deeper c-fg-deeper cursor-pointer hover:border-b-solid',

    'flex-center': 'flex flex-1 items-center justify-center',

    'border-base': 'border solid'
  }
})
