export interface MitGorseli {
  palet: [string, string, string];
  figur: string;
}

const kolon: MitGorseli = {
  palet: ['#5d5a63', '#232833', '#d9ae75'],
  figur:
    '<path d="M150 110h140v18H150Z" fill="{c}"/><path d="M164 128h112v14H164Z" fill="{c}"/>' +
    '<path d="M176 142h88v168h-88Z" fill="{c}"/>' +
    '<path d="M194 150v152M212 150v152M230 150v152M248 150v152" stroke="{b}" stroke-width="4"/>' +
    '<path d="M156 310h128v16H156Z" fill="{c}"/>',
};

const gorseller: Record<string, MitGorseli> = {
  prometheus: {
    palet: ['#b0603a', '#2e2329', '#efc283'],
    figur:
      '<path d="M150 336 238 182" stroke="{c}" stroke-width="16" stroke-linecap="round"/>' +
      '<path d="M170 300l18 10M190 266l18 10M210 230l18 10" stroke="{b}" stroke-width="4"/>' +
      '<path d="M252 44c-40 48-64 80-64 114a64 64 0 0 0 128 0c0-34-24-66-64-114Z" fill="{c}"/>' +
      '<path d="M252 108c-18 22-28 36-28 52a28 28 0 0 0 56 0c0-16-10-30-28-52Z" fill="{b}"/>' +
      '<circle cx="330" cy="86" r="5" fill="{c}"/><circle cx="178" cy="70" r="4" fill="{c}"/>' +
      '<circle cx="342" cy="150" r="3" fill="{c}"/><circle cx="160" cy="128" r="3" fill="{c}"/>',
  },
  pandora: {
    palet: ['#6e5a7a', '#241f33', '#dcb98c'],
    figur:
      '<path d="M218 104c-14-24 8-40-6-62M238 104c10-22-10-38 6-60M228 100c0-30 22-40 10-70" fill="none" stroke="{c}" stroke-width="3" opacity=".7"/>' +
      '<ellipse cx="248" cy="98" rx="58" ry="11" transform="rotate(-16 248 98)" fill="{c}"/>' +
      '<circle cx="246" cy="78" r="8" transform="rotate(-16 248 98)" fill="{c}"/>' +
      '<path d="M176 118h88l-8 24c46 22 66 70 58 118-6 40-34 64-70 68h-48c-36-4-64-28-70-68-8-48 12-96 58-118Z" fill="{c}"/>' +
      '<path d="M146 196q74 20 148 0M140 262q80 22 160 0" fill="none" stroke="{b}" stroke-width="5"/>' +
      '<path d="M152 222l12 14 12-14 12 14 12-14 12 14 12-14 12 14 12-14 12 14 12-14 12 14" fill="none" stroke="{b}" stroke-width="3"/>',
  },
  narkissos: {
    palet: ['#3f6b6a', '#132c34', '#e6d4a2'],
    figur:
      '<g id="{id}-cicek">' +
      '<path d="M220 206c0-30-8-56-2-84" fill="none" stroke="{c}" stroke-width="5"/>' +
      '<path d="M218 176c-22-8-36-2-46 12 18 4 32 2 46-12Z" fill="{c}"/>' +
      '<g fill="{c}"><ellipse cx="218" cy="78" rx="12" ry="26"/><ellipse cx="218" cy="122" rx="12" ry="26"/>' +
      '<ellipse cx="218" cy="100" rx="12" ry="26" transform="rotate(60 218 100)"/>' +
      '<ellipse cx="218" cy="100" rx="12" ry="26" transform="rotate(-60 218 100)"/></g>' +
      '<circle cx="218" cy="100" r="13" fill="{b}"/><circle cx="218" cy="100" r="6" fill="{c}"/>' +
      '</g>' +
      '<path d="M60 206h320" stroke="{c}" stroke-width="2"/>' +
      '<g transform="translate(0 412) scale(1 -1)" opacity=".38"><use href="#{id}-cicek"/></g>' +
      '<path d="M150 236q20-6 40 0t40 0M196 262q20-6 40 0t40 0M130 290q20-6 40 0t40 0" fill="none" stroke="{c}" stroke-width="2" opacity=".6"/>',
  },
  ikaros: {
    palet: ['#c58a4a', '#33324a', '#f3d9a4'],
    figur:
      '<circle cx="366" cy="58" r="24" fill="{c}"/>' +
      '<path d="M366 22v-10M366 104v-10M330 58h-10M412 58h-10M341 33l-7-7M398 90l-7-7M391 33l7-7M334 90l7-7" stroke="{c}" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M210 210C170 200 116 170 78 112l32 12-18-28 36 18-12-30 36 24-4-28 32 34c18 28 28 58 30 96Z" fill="{c}"/>' +
      '<path d="M230 210c40-10 94-40 132-98l-32 12 18-28-36 18 12-30-36 24 4-28-32 34c-18 28-28 58-30 96Z" fill="{c}"/>' +
      '<circle cx="220" cy="176" r="13" fill="{c}"/><path d="M220 190v52" stroke="{c}" stroke-width="12" stroke-linecap="round"/>' +
      '<g fill="{c}" opacity=".75"><ellipse cx="150" cy="268" rx="5" ry="15" transform="rotate(30 150 268)"/>' +
      '<ellipse cx="282" cy="292" rx="5" ry="15" transform="rotate(-40 282 292)"/>' +
      '<ellipse cx="196" cy="310" rx="4" ry="12" transform="rotate(70 196 310)"/></g>',
  },
  akhilleus: {
    palet: ['#8a3d32', '#241c20', '#e3ba80'],
    figur:
      '<path d="M128 150C130 56 310 56 312 150h-22c-4-60-136-60-140 0Z" fill="{c}"/>' +
      '<path d="M156 118l-6-18M180 100l-4-20M206 92l-2-20M234 92l2-20M260 100l4-20M284 118l6-18" stroke="{b}" stroke-width="4"/>' +
      '<path d="M150 304V196c0-56 32-96 70-96s70 40 70 96v108h-46v-66c0-10-8-16-24-16s-24 6-24 16v66Z" fill="{c}"/>' +
      '<path d="M168 196c10-8 26-10 42-4l-4 14c-12-4-26-2-36 4ZM272 196c-10-8-26-10-42-4l4 14c12-4 26-2 36 4Z" fill="{b}"/>' +
      '<path d="M220 170v42" stroke="{b}" stroke-width="4"/>' +
      '<path d="M64 336 142 300" stroke="{c}" stroke-width="4"/><path d="M152 296l-20-2 8 16Z" fill="{c}"/>' +
      '<path d="M64 336l-10-2M68 334l-6-10" stroke="{c}" stroke-width="3"/>',
  },
  'truva-ati': {
    palet: ['#9b6b3f', '#2a2622', '#e8c68f'],
    figur:
      '<path d="M128 214h150v58H128Z" fill="{c}"/>' +
      '<path d="M258 222l22-108h40l-6 22 34 18-14 24-30-10-14 54Z" fill="{c}"/>' +
      '<path d="M286 118l6-22 10 18M120 222c-26 6-36 36-28 60" fill="{c}" stroke="{c}" stroke-width="8" stroke-linecap="round"/>' +
      '<path d="M140 272h16v32h-16ZM176 272h16v32h-16ZM226 272h16v32h-16ZM260 272h16v32h-16Z" fill="{c}"/>' +
      '<path d="M108 304h196v12H108Z" fill="{c}"/>' +
      '<circle cx="132" cy="326" r="12" fill="{b}" stroke="{c}" stroke-width="5"/><circle cx="280" cy="326" r="12" fill="{b}" stroke="{c}" stroke-width="5"/>' +
      '<path d="M128 234h150M128 254h150" stroke="{b}" stroke-width="3"/>' +
      '<path d="M190 226h30v30h-30Z" fill="none" stroke="{b}" stroke-width="3"/><circle cx="304" cy="136" r="4" fill="{b}"/>',
  },
  'perseus-ve-medusa': {
    palet: ['#2e5555', '#0d2f37', '#ad9b6f'],
    figur:
      '<path d="M140 212c-44-57-19-103 26-123 46-19 46 28 89-8 43-35 86 1 47 36-42 38-22 78 19 65-29 49-79 20-88-13-25 38-89 50-93 43Z" fill="{b}" stroke="{c}" stroke-width="5"/>' +
      '<ellipse cx="221" cy="198" rx="73" ry="90" fill="{c}"/>' +
      '<path d="M151 180q70-70 145 1" fill="none" stroke="{b}" stroke-width="21"/>' +
      '<path d="M179 197h20m49 0h20" stroke="{b}" stroke-width="6"/>' +
      '<path d="M220 205l-9 30h23m-30 20q17 13 36 0" fill="none" stroke="{b}" stroke-width="4"/>' +
      '<path d="M134 313q80-70 171 0" fill="{b}"/>',
  },
  'orpheus-ve-eurydike': {
    palet: ['#4b5b7a', '#1b2133', '#dcc08f'],
    figur:
      '<path d="M176 290c-50-56-46-148-6-184 10 40 2 86 28 120" fill="none" stroke="{c}" stroke-width="14" stroke-linecap="round"/>' +
      '<path d="M264 290c50-56 46-148 6-184-10 40-2 86-28 120" fill="none" stroke="{c}" stroke-width="14" stroke-linecap="round"/>' +
      '<path d="M156 128h128" stroke="{c}" stroke-width="10" stroke-linecap="round"/>' +
      '<path d="M200 128v158M214 128v162M228 128v162M242 128v158" stroke="{c}" stroke-width="2"/>' +
      '<ellipse cx="220" cy="292" rx="58" ry="24" fill="{c}"/><path d="M180 292h80" stroke="{b}" stroke-width="3"/>',
  },
  persephone: {
    palet: ['#6b5674', '#28364e', '#cfb7ad'],
    figur:
      '<circle cx="224" cy="204" r="82" fill="{c}"/>' +
      '<path d="M200 128l8-28 16 20 16-20 8 28Z" fill="{c}"/>' +
      '<path d="M174 164q-12 40 8 80" fill="none" stroke="{b}" stroke-width="5" opacity=".45"/>' +
      '<g fill="{c}"><ellipse cx="320" cy="292" rx="6" ry="8" transform="rotate(20 320 292)"/><ellipse cx="300" cy="306" rx="6" ry="8" transform="rotate(-30 300 306)"/>' +
      '<ellipse cx="338" cy="310" rx="6" ry="8" transform="rotate(50 338 310)"/><ellipse cx="318" cy="318" rx="5" ry="7"/>' +
      '<ellipse cx="282" cy="296" rx="5" ry="7" transform="rotate(10 282 296)"/><ellipse cx="350" cy="292" rx="5" ry="7" transform="rotate(-20 350 292)"/></g>' +
      '<path d="M146 168c-30-16-48-52-44-86M120 122c-18-2-30 8-34 22 14 4 26 0 34-22ZM130 100c-4-18 4-30 18-36 4 14 0 26-18 36Z" fill="{c}" stroke="{c}" stroke-width="4" stroke-linecap="round"/>',
  },
  sisifos: {
    palet: ['#7a6a55', '#26262b', '#d8bf94'],
    figur:
      '<path d="M40 330 400 120V360H40Z" fill="{b}"/><path d="M40 330 400 120" stroke="{c}" stroke-width="3"/>' +
      '<circle cx="221" cy="157" r="58" fill="{c}"/>' +
      '<path d="M196 128q14-10 30-4M236 176q14 4 22-8" fill="none" stroke="{b}" stroke-width="3"/>' +
      '<circle cx="150" cy="182" r="12" fill="{c}"/>' +
      '<path d="M152 198 134 244M134 244 118 282M134 244 150 266M150 206 172 190M146 216 170 206" fill="none" stroke="{c}" stroke-width="10" stroke-linecap="round"/>' +
      '<path d="M290 230q40 20 60 60" fill="none" stroke="{c}" stroke-width="2" stroke-dasharray="6 8" opacity=".7"/>',
  },
};

export function mitGorseli(slug: string): MitGorseli {
  return gorseller[slug] ?? kolon;
}
