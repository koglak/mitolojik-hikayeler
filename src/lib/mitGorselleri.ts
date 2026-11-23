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
  niobe: {
    palet: ['#6c6f78', '#22252e', '#d6d0c4'],
    figur:
      '<path d="M112 326c4-86 44-160 108-196 64 36 104 110 108 196Z" fill="{c}"/>' +
      '<ellipse cx="220" cy="150" rx="26" ry="32" fill="{c}"/>' +
      '<path d="M208 148q4 4 8 0M226 148q4 4 8 0" fill="none" stroke="{b}" stroke-width="3"/>' +
      '<path d="M210 160q-2 40 2 80M232 160q2 40-2 80" fill="none" stroke="{b}" stroke-width="2" opacity=".6"/>' +
      '<path d="M206 182c-3 6-3 10 0 12 3-2 3-6 0-12ZM234 206c-3 6-3 10 0 12 3-2 3-6 0-12Z" fill="{b}"/>' +
      '<path d="M60 70 130 112M380 70 310 112" stroke="{c}" stroke-width="3"/>' +
      '<path d="M138 116l-18-2 8 14ZM302 116l18-2-8 14Z" fill="{c}"/>',
  },
  aktaion: {
    palet: ['#4f6b47', '#1c2a1e', '#e1cf9c'],
    figur:
      '<path d="M196 168c-8 52 2 104 24 150 22-46 32-98 24-150-8-10-40-10-48 0Z" fill="{c}"/>' +
      '<path d="M198 168c-20-34-46-58-80-70M162 128l-24-28M140 110l-36-6M244 168c20-34 46-58 80-70M282 128l24-28M304 110l36-6" fill="none" stroke="{c}" stroke-width="8" stroke-linecap="round"/>' +
      '<path d="M180 178c-14-6-26-4-34 4 10 8 22 8 34-4ZM260 178c14-6 26-4 34 4-10 8-22 8-34-4Z" fill="{c}"/>' +
      '<circle cx="208" cy="206" r="5" fill="{b}"/><circle cx="232" cy="206" r="5" fill="{b}"/>' +
      '<ellipse cx="220" cy="300" rx="9" ry="6" fill="{b}"/>',
  },
  'apollon-ve-daphne': {
    palet: ['#5a7a4a', '#1f2e22', '#e8d38f'],
    figur:
      '<path d="M220 330c-4-50 6-100-2-150M218 230c-30-20-50-50-56-86M220 210c30-24 48-56 52-92M218 180c-6-40 0-80 8-112" fill="none" stroke="{c}" stroke-width="10" stroke-linecap="round"/>' +
      '<g fill="{c}"><ellipse cx="156" cy="138" rx="10" ry="24" transform="rotate(-30 156 138)"/><ellipse cx="180" cy="160" rx="9" ry="22" transform="rotate(40 180 160)"/>' +
      '<ellipse cx="276" cy="110" rx="10" ry="24" transform="rotate(30 276 110)"/><ellipse cx="252" cy="140" rx="9" ry="22" transform="rotate(-40 252 140)"/>' +
      '<ellipse cx="228" cy="62" rx="10" ry="24" transform="rotate(10 228 62)"/><ellipse cx="206" cy="94" rx="9" ry="22" transform="rotate(-50 206 94)"/>' +
      '<ellipse cx="248" cy="88" rx="9" ry="20" transform="rotate(60 248 88)"/><ellipse cx="290" cy="150" rx="8" ry="20" transform="rotate(70 290 150)"/>' +
      '<ellipse cx="140" cy="178" rx="8" ry="20" transform="rotate(-70 140 178)"/></g>' +
      '<path d="M176 330h88" stroke="{c}" stroke-width="4"/>',
  },
  phaethon: {
    palet: ['#c0662e', '#2b1d24', '#f5cf87'],
    figur:
      '<circle cx="110" cy="84" r="34" fill="{c}"/>' +
      '<path d="M110 32v-14M110 150v-14M58 84h-14M176 84h-14M74 48l-10-10M156 130l-10-10M146 48l10-10M64 130l10-10" stroke="{c}" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M150 120q100 40 150 170" fill="none" stroke="{c}" stroke-width="6" stroke-dasharray="2 14" stroke-linecap="round"/>' +
      '<circle cx="306" cy="296" r="30" fill="none" stroke="{c}" stroke-width="7"/>' +
      '<path d="M306 266v60M276 296h60M285 275l42 42M327 275l-42 42" stroke="{c}" stroke-width="3"/>' +
      '<path d="M260 250c10-30 30-40 50-36-4 20-20 34-50 36ZM340 240c-4-26 6-44 26-52 6 22-4 40-26 52Z" fill="{c}" opacity=".8"/>',
  },
  endymion: {
    palet: ['#4a5878', '#141a2e', '#e4e0c8'],
    figur:
      '<path d="M300 50a56 56 0 1 0 40 96 46 46 0 1 1-40-96Z" fill="{c}"/>' +
      '<path d="M40 330c60-80 130-110 200-100s120 50 160 100Z" fill="{b}" stroke="{c}" stroke-width="3"/>' +
      '<circle cx="152" cy="250" r="14" fill="{c}"/>' +
      '<path d="M166 256c40-4 90-2 130 8l-2 14c-44-6-88-6-128-4Z" fill="{c}"/>' +
      '<path d="M190 210l8-6M206 196l10-4M226 188l10 0" stroke="{c}" stroke-width="2" opacity=".6" stroke-linecap="round"/>' +
      '<circle cx="90" cy="70" r="3" fill="{c}"/><circle cx="160" cy="110" r="2" fill="{c}"/><circle cx="380" cy="190" r="3" fill="{c}"/>',
  },
  'kybele-ve-attis': {
    palet: ['#8a6a3c', '#2a2119', '#e6c98e'],
    figur:
      '<path d="M140 210h160v-70h-24v-24h-24v24h-24v-24h-16v24h-24v-24h-24v24h-24Z" fill="{c}"/>' +
      '<path d="M162 210v-46h20v46M214 210v-46h12v46M258 210v-46h20v46" fill="{b}"/>' +
      '<path d="M140 210h160v14H140Z" fill="{c}"/>' +
      '<circle cx="220" cy="292" r="40" fill="none" stroke="{c}" stroke-width="10"/>' +
      '<circle cx="220" cy="292" r="26" fill="{c}" opacity=".35"/>' +
      '<path d="M96 330c4-60 16-100 30-120 14 20 26 60 30 120ZM344 330c-4-60-16-100-30-120-14 20-26 60-30 120Z" fill="{c}" opacity=".7"/>',
  },
  'pan-ve-syrinx': {
    palet: ['#6b7a3f', '#202814', '#e9d79a'],
    figur:
      '<path d="M140 120h22v130h-22ZM170 120h22v112h-22ZM200 120h22v96h-22ZM230 120h22v82h-22ZM260 120h22v70h-22ZM290 120h22v60h-22Z" fill="{c}"/>' +
      '<path d="M134 146h184M134 168h184" stroke="{b}" stroke-width="5"/>' +
      '<g fill="{b}"><circle cx="151" cy="128" r="4"/><circle cx="181" cy="128" r="4"/><circle cx="211" cy="128" r="4"/><circle cx="241" cy="128" r="4"/><circle cx="271" cy="128" r="4"/><circle cx="301" cy="128" r="4"/></g>' +
      '<path d="M70 330c4-60 2-110-6-160M92 330c-2-70 6-120 18-150M380 330c-4-70-12-120-26-150M356 330c2-50-2-90-10-120" fill="none" stroke="{c}" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M64 170c-8-12-8-24 0-34 8 10 8 22 0 34ZM354 180c-8-12-8-24 0-34 8 10 8 22 0 34Z" fill="{c}"/>',
  },
  'dionysos-ve-korsanlar': {
    palet: ['#6a3f5e', '#1e1a2e', '#e4c68a'],
    figur:
      '<path d="M90 236h260c-14 40-50 62-100 62h-60c-50 0-86-22-100-62Z" fill="{c}"/>' +
      '<path d="M220 236V70" stroke="{c}" stroke-width="7"/>' +
      '<path d="M220 76c40 20 60 60 50 110M220 110c-36 14-54 46-50 90" fill="none" stroke="{c}" stroke-width="3"/>' +
      '<g fill="{c}"><circle cx="270" cy="120" r="7"/><circle cx="280" cy="132" r="7"/><circle cx="266" cy="136" r="7"/><circle cx="275" cy="146" r="7"/>' +
      '<circle cx="168" cy="160" r="7"/><circle cx="178" cy="172" r="7"/><circle cx="162" cy="176" r="7"/></g>' +
      '<path d="M60 316c14-22 36-26 56-12-10 2-16 8-18 16ZM330 322c14-22 36-26 56-12-10 2-16 8-18 16Z" fill="{c}"/>' +
      '<path d="M40 330q30-10 60 0t60 0 60 0 60 0 60 0 60 0" fill="none" stroke="{c}" stroke-width="2" opacity=".6"/>',
  },
  'leto-ve-koyluler': {
    palet: ['#3f6f5a', '#122a24', '#d9e0a6'],
    figur:
      '<ellipse cx="220" cy="240" rx="80" ry="54" fill="{c}"/>' +
      '<circle cx="182" cy="182" r="22" fill="{c}"/><circle cx="258" cy="182" r="22" fill="{c}"/>' +
      '<circle cx="182" cy="180" r="9" fill="{b}"/><circle cx="258" cy="180" r="9" fill="{b}"/>' +
      '<path d="M178 236q42 22 84 0" fill="none" stroke="{b}" stroke-width="4"/>' +
      '<path d="M148 268c-30 6-48 22-56 42l24-4M292 268c30 6 48 22 56 42l-24-4" fill="none" stroke="{c}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M40 322q30-10 60 0t60 0 60 0 60 0 60 0 60 0" fill="none" stroke="{c}" stroke-width="2" opacity=".6"/>' +
      '<path d="M70 300c-4-50 0-100 10-140M370 300c4-50 0-100-10-140" fill="none" stroke="{c}" stroke-width="3" opacity=".7"/>',
  },
  'eros-ve-psykhe': {
    palet: ['#7a5a7e', '#221a30', '#ecd2a8'],
    figur:
      '<path d="M220 150c-30-70-110-90-120-40-8 40 50 60 120 40Z" fill="{c}"/>' +
      '<path d="M220 150c30-70 110-90 120-40 8 40-50 60-120 40Z" fill="{c}"/>' +
      '<path d="M220 156c-20 50-70 76-90 50-14-20 20-46 90-50ZM220 156c20 50 70 76 90 50 14-20-20-46-90-50Z" fill="{c}" opacity=".8"/>' +
      '<ellipse cx="220" cy="160" rx="7" ry="40" fill="{b}"/>' +
      '<path d="M216 124c-8-20-20-30-32-32M224 124c8-20 20-30 32-32" fill="none" stroke="{b}" stroke-width="3"/>' +
      '<path d="M176 300h88c-6 14-20 22-44 22s-38-8-44-22ZM264 300c14-4 24-12 30-26" fill="{c}" stroke="{c}" stroke-width="4"/>' +
      '<path d="M178 296c-6-14-2-26 8-34 2 12 0 24-8 34Z" fill="{c}"/>',
  },
};

export function mitGorseli(slug: string): MitGorseli {
  return gorseller[slug] ?? kolon;
}
