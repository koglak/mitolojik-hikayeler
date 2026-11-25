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
  argonotlar: {
    palet: ['#2f6a7a', '#122633', '#e8c77a'],
    figur:
      '<path d="M160 40c30-10 70-6 90 10-14 4-18 14-14 26 10 2 20 8 24 20-30 8-70 6-100-6 8-10 8-22 0-30 10-4 8-14 0-20Z" fill="{c}"/>' +
      '<path d="M176 50l-6 40M200 46l-2 52M226 52l2 46" stroke="{b}" stroke-width="3" opacity=".7"/>' +
      '<path d="M220 112v118" stroke="{c}" stroke-width="6"/>' +
      '<path d="M226 120c60 20 80 60 76 100h-76Z" fill="{c}" opacity=".85"/>' +
      '<path d="M60 236h320c-14 36-54 56-110 56H150c-50 0-80-20-90-56Z" fill="{c}"/>' +
      '<path d="M60 236c-14-10-18-26-10-40 12 10 14 26 10 40ZM380 236c10-14 26-20 40-14-10 12-24 16-40 14Z" fill="{c}"/>' +
      '<g fill="{b}"><circle cx="120" cy="256" r="5"/><circle cx="160" cy="258" r="5"/><circle cx="200" cy="258" r="5"/><circle cx="240" cy="258" r="5"/><circle cx="280" cy="258" r="5"/><circle cx="320" cy="256" r="5"/></g>' +
      '<path d="M120 262l-14 40M160 264l-12 40M200 264l-10 40M240 264l-8 40M280 264l-6 40M320 262l-4 40" stroke="{c}" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M40 322q30-10 60 0t60 0 60 0 60 0 60 0 60 0" fill="none" stroke="{c}" stroke-width="2" opacity=".6"/>',
  },
  pygmalion: {
    palet: ['#8a6a5a', '#2a1e22', '#f2e6d0'],
    figur:
      '<path d="M140 316h160v20H140ZM156 296h128v20H156Z" fill="{c}"/>' +
      '<circle cx="220" cy="78" r="26" fill="{c}"/>' +
      '<path d="M196 70c-6-30 14-46 34-40 18 6 24 22 18 40-4-18-20-24-26-12-8-6-20-4-26 12Z" fill="{b}" opacity=".5"/>' +
      '<path d="M210 104h20l2 14c26 6 38 26 36 52l-6 40c10 30 12 58 8 86H170c-4-28-2-56 8-86l-6-40c-2-26 10-46 36-52Z" fill="{c}"/>' +
      '<path d="M186 200q34 16 68 0M180 240q40 14 80 0M178 270q42 12 84 0" fill="none" stroke="{b}" stroke-width="3" opacity=".55"/>' +
      '<path d="M304 140l10-10M318 150h14M304 160l10 10" stroke="{c}" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M120 140l-10-10M106 150H92M120 160l-10 10" stroke="{c}" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M330 70c-8-14-28-10-28 4 0 16 28 28 28 28s28-12 28-28c0-14-20-18-28-4Z" fill="{c}" opacity=".8"/>',
  },
  'teumessos-tilkisi': {
    palet: ['#7a6a4a', '#1e1c2a', '#ead9b0'],
    figur:
      '<path d="M60 200c20-30 60-40 100-30l30-30 8 32c14 6 20 16 18 26l-26 4-20 30-12 40h-12l4-40-30 10-16 30h-12l8-40c-40 10-70 0-70-24 20 0 30-4 30-8Z" fill="{c}"/>' +
      '<path d="M252 196c18-22 44-30 70-26l26-28 8 30c18 4 30 14 34 28l-30 2-14 26 6 44h-12l-12-36-40 4-14 32h-12l6-40c-20-6-30-18-30-34-14 4-30 14-40 24 4-16 20-26 54-26Z" fill="{c}"/>' +
      '<circle cx="194" cy="166" r="3" fill="{b}"/><circle cx="352" cy="168" r="3" fill="{b}"/>' +
      '<path d="M40 300h360" stroke="{c}" stroke-width="3"/>' +
      '<path d="M230 300c4-10 12-14 20-12M120 300c6-8 12-10 20-8" fill="none" stroke="{c}" stroke-width="2" opacity=".6"/>' +
      '<g fill="{c}"><circle cx="90" cy="60" r="3"/><circle cx="140" cy="44" r="2"/><circle cx="300" cy="50" r="4"/><circle cx="350" cy="80" r="2"/><circle cx="250" cy="90" r="2"/></g>' +
      '<path d="M90 60L140 44M300 50l50 30" stroke="{c}" stroke-width="1" opacity=".5"/>',
  },
  tantalos: {
    palet: ['#5a6a4a', '#1c2420', '#e6d2a0'],
    figur:
      '<path d="M150 30c40-14 100-12 140 4 10 16 6 34-10 44-40 10-90 10-124-2-16-12-18-32-6-46Z" fill="{c}"/>' +
      '<path d="M180 46l20 10M236 40l-10 18M262 52l-20 8" stroke="{b}" stroke-width="3" opacity=".6"/>' +
      '<path d="M60 120c40-10 80-4 120 10M380 116c-40-8-80 0-110 18" fill="none" stroke="{c}" stroke-width="6" stroke-linecap="round"/>' +
      '<g fill="{c}"><circle cx="96" cy="136" r="11"/><circle cx="140" cy="142" r="10"/><path d="M118 132c-8 4-10 18 0 26 10-8 8-22 0-26Z"/>' +
      '<circle cx="336" cy="134" r="11"/><circle cx="296" cy="146" r="10"/><path d="M318 132c-8 4-10 18 0 26 10-8 8-22 0-26Z"/></g>' +
      '<path d="M96 125v-6M140 132v-6M336 123v-6M296 136v-6" stroke="{c}" stroke-width="2"/>' +
      '<circle cx="220" cy="196" r="18" fill="{c}"/>' +
      '<path d="M190 176l-22-40M250 176l22-40" stroke="{c}" stroke-width="8" stroke-linecap="round"/>' +
      '<path d="M200 216h40l6 50h-52Z" fill="{c}"/>' +
      '<path d="M50 250q30-8 60 0t60 0 60 0 60 0 60 0 60 0" fill="none" stroke="{c}" stroke-width="3"/>' +
      '<path d="M60 250h320l-20 70H80Z" fill="{c}" opacity=".25"/>' +
      '<path d="M90 286q30-6 60 0t60 0 60 0 60 0" fill="none" stroke="{c}" stroke-width="2" opacity=".5"/>',
  },
  herakles: {
    palet: ['#a2643a', '#2a1c18', '#efcf8e'],
    figur:
      '<path d="M290 170L262 186L282 212L250 217L258 248L227 240L222 272L196 252L180 280L164 252L138 272L133 240L102 248L110 217L78 212L98 186L70 170L98 154L78 128L110 123L102 92L133 100L138 68L164 88L180 60L196 88L222 68L227 100L258 92L250 123L282 128L262 154Z" fill="{c}"/>' +
      '<circle cx="180" cy="170" r="70" fill="{b}"/>' +
      '<path d="M130 150q20-16 36 0M194 150q20-16 36 0" fill="none" stroke="{c}" stroke-width="6" stroke-linecap="round"/>' +
      '<path d="M166 186h28l-14 18Z" fill="{c}"/>' +
      '<path d="M180 204v14M180 218q-14 12-26 6M180 218q14 12 26 6" fill="none" stroke="{c}" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M310 330l46-250" stroke="{c}" stroke-width="22" stroke-linecap="round"/>' +
      '<path d="M336 140l16 6M330 180l16 6M342 104l16 6M324 220l16 6" stroke="{b}" stroke-width="4" stroke-linecap="round"/>',
  },
  'theseus-ve-minotauros': {
    palet: ['#7a4a3a', '#1f1a22', '#e8c48a'],
    figur:
      '<path d="M220 60h120v240H100V100h200v160H140v-120h120v80h-80" fill="none" stroke="{c}" stroke-width="10" stroke-linejoin="round"/>' +
      '<path d="M40 330c40-10 60-40 80-30s20 40 60 30 50-50 40-60" fill="none" stroke="{c}" stroke-width="3" stroke-dasharray="6 6"/>' +
      '<circle cx="216" cy="212" r="14" fill="{c}"/>' +
      '<path d="M200 204c-12-10-16-22-14-30M232 204c12-10 16-22 14-30" fill="none" stroke="{c}" stroke-width="5" stroke-linecap="round"/>' +
      '<circle cx="40" cy="330" r="10" fill="{c}"/>',
  },
  odysseus: {
    palet: ['#3c5c7a', '#131c2a', '#e6cf96'],
    figur:
      '<path d="M220 50v200" stroke="{c}" stroke-width="7"/>' +
      '<path d="M224 62c70 20 96 70 92 130h-92ZM216 70c-50 24-70 70-66 120h66Z" fill="{c}"/>' +
      '<path d="M100 250h240c-10 30-44 46-90 46h-60c-46 0-80-16-90-46Z" fill="{c}"/>' +
      '<circle cx="220" cy="214" r="10" fill="{b}"/><path d="M220 224v26M206 236l14-8 14 8" stroke="{b}" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M40 322q30-10 60 0t60 0 60 0 60 0 60 0 60 0" fill="none" stroke="{c}" stroke-width="2" opacity=".6"/>' +
      '<path d="M50 120l12-10 12 10M370 90l12-10 12 10" fill="none" stroke="{c}" stroke-width="3"/>',
  },
  bellerophon: {
    palet: ['#4a6a8a', '#16202e', '#f0d6a0'],
    figur:
      '<path d="M120 230c10-40 60-60 110-56 30 2 54-10 70-36l20 10-6 30c14 10 18 26 10 40-20-6-34-4-44 6l-10 76h-14l-2-60c-30 6-60 4-84-6l-14 66h-14l-2-60c-14-2-26-6-30-10Z" fill="{c}"/>' +
      '<path d="M190 180c-20-50-70-90-140-100 30 20 46 40 50 60-20-4-40 0-54 10 30 6 60 20 80 40 10 0 40-6 64-10Z" fill="{c}" opacity=".85"/>' +
      '<path d="M220 176c-6-60 20-110 80-140-10 30-10 56 0 76 10-20 30-30 50-30-20 24-34 52-40 84Z" fill="{c}" opacity=".7"/>' +
      '<circle cx="306" cy="150" r="3" fill="{b}"/>' +
      '<path d="M340 300c10-30 30-40 50-36-4 20-20 34-50 36Z" fill="{c}" opacity=".6"/>',
  },
  oidipus: {
    palet: ['#8a6a3a', '#221c1a', '#ecd29a'],
    figur:
      '<path d="M80 300c0-30 20-50 60-54l120-6c30-30 40-70 40-110h50c4 40-4 80-26 110 26 6 46 26 46 60Z" fill="{c}"/>' +
      '<circle cx="324" cy="104" r="28" fill="{c}"/>' +
      '<path d="M296 96c-6-30 10-54 30-54s34 20 28 48l-10-20h-36Z" fill="{b}" opacity=".45"/>' +
      '<path d="M296 90v50M352 90v50" stroke="{c}" stroke-width="8"/>' +
      '<path d="M120 246c-10-70 20-140 90-170-8 30-6 54 4 72 14-30 40-48 70-52-20 30-30 60-32 92Z" fill="{c}" opacity=".85"/>' +
      '<path d="M80 300c-20-6-34-24-30-50" fill="none" stroke="{c}" stroke-width="6" stroke-linecap="round"/>' +
      '<path d="M60 320h340" stroke="{c}" stroke-width="3"/>' +
      '<path d="M70 70q8-24 30-24 20 0 20 20 0 16-20 22v14M100 118v4" fill="none" stroke="{c}" stroke-width="6" stroke-linecap="round"/>',
  },
  atalante: {
    palet: ['#a5703a', '#241e1a', '#f3d690'],
    figur:
      '<circle cx="190" cy="100" r="22" fill="{c}"/>' +
      '<path d="M170 92c-30-6-56 4-80 20 24-2 44 2 60 10M172 108c-26 6-44 20-56 38" fill="none" stroke="{c}" stroke-width="5" stroke-linecap="round"/>' +
      '<path d="M198 124l20 80M208 150l50-20M206 160l-46 10M218 204l40 50 30-6M218 204l-30 60-30 0" fill="none" stroke="{c}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<g fill="{c}"><circle cx="300" cy="300" r="14"/><circle cx="350" cy="290" r="14"/><circle cx="396" cy="304" r="14"/></g>' +
      '<path d="M300 286v-8M350 276v-8M396 290v-8" stroke="{c}" stroke-width="3"/>' +
      '<path d="M40 320h380" stroke="{c}" stroke-width="2" opacity=".6"/>',
  },
  'kastor-ve-polydeukes': {
    palet: ['#3e4e7a', '#12162a', '#ecdcae'],
    figur:
      '<g id="{id}-ikiz"><circle cx="150" cy="150" r="20" fill="{c}"/>' +
      '<path d="M150 172l-6 80M144 196l-30 30M144 196l40 20M144 252l-20 60M144 252l20 60" fill="none" stroke="{c}" stroke-width="12" stroke-linecap="round"/>' +
      '<path d="M150 74l7 20h21l-17 12 6 20-17-12-17 12 6-20-17-12h21Z" fill="{c}"/></g>' +
      '<g transform="translate(440 0) scale(-1 1)"><use href="#{id}-ikiz"/></g>' +
      '<circle cx="80" cy="60" r="3" fill="{c}"/><circle cx="360" cy="60" r="3" fill="{c}"/><circle cx="220" cy="40" r="2" fill="{c}"/>',
  },
  'titanlar-savasi': {
    palet: ['#5a4a6a', '#18142a', '#f0d080'],
    figur:
      '<path d="M40 330l80-150 50 70 50-110 60 120 40-60 80 130Z" fill="{c}" opacity=".5"/>' +
      '<path d="M250 30l-60 110h50l-50 120 110-150h-56l46-80Z" fill="{c}"/>' +
      '<path d="M120 80c-20 0-30 20-20 34 10 14 34 10 40-6 4-14-6-28-20-28ZM340 110c-16 0-26 14-18 28 8 12 28 10 32-4 4-12-4-24-14-24Z" fill="{c}" opacity=".7"/>',
  },
  hermes: {
    palet: ['#6a7a4a', '#1c2218', '#ecd9a0'],
    figur:
      '<path d="M220 40v280" stroke="{c}" stroke-width="10" stroke-linecap="round"/>' +
      '<circle cx="220" cy="40" r="14" fill="{c}"/>' +
      '<path d="M206 62c-50-20-90-10-120 10 30 0 60 4 90 20M234 62c50-20 90-10 120 10-30 0-60 4-90 20" fill="{c}"/>' +
      '<path d="M220 110c-40 10-40 40 0 50s40 40 0 50-40 40 0 50" fill="none" stroke="{c}" stroke-width="6"/>' +
      '<path d="M220 110c40 10 40 40 0 50s-40 40 0 50 40 40 0 50" fill="none" stroke="{c}" stroke-width="6" opacity=".7"/>' +
      '<circle cx="190" cy="104" r="5" fill="{c}"/><circle cx="250" cy="104" r="5" fill="{c}"/>',
  },
  arakhne: {
    palet: ['#6a4a6a', '#1e1624', '#e6d0b0'],
    figur:
      '<g fill="none" stroke="{c}" stroke-width="2.5">' +
      '<path d="M220 40v280M80 180h280M120 80l200 200M320 80 120 280"/>' +
      '<path d="M220 80l70 30 30 70-30 70-70 30-70-30-30-70 30-70Z"/>' +
      '<path d="M220 120l42 18 18 42-18 42-42 18-42-18-18-42 18-42Z"/>' +
      '<path d="M220 150l21 9 9 21-9 21-21 9-21-9-9-21 9-21Z"/></g>' +
      '<ellipse cx="270" cy="234" rx="14" ry="18" fill="{c}"/><circle cx="270" cy="210" r="9" fill="{c}"/>' +
      '<path d="M258 226l-22-10M258 236l-24 2M258 246l-20 14M282 226l22-10M282 236l24 2M282 246l20 14M262 214l-16-16M278 214l16-16" stroke="{c}" stroke-width="3" stroke-linecap="round"/>',
  },
  'athena-ve-poseidon': {
    palet: ['#4a6a5a', '#16221e', '#e8d8a0'],
    figur:
      '<path d="M140 320c0-60-4-120 6-170" stroke="{c}" stroke-width="12" stroke-linecap="round"/>' +
      '<g fill="{c}"><ellipse cx="120" cy="130" rx="8" ry="22" transform="rotate(-40 120 130)"/><ellipse cx="170" cy="120" rx="8" ry="22" transform="rotate(40 170 120)"/>' +
      '<ellipse cx="146" cy="96" rx="8" ry="22"/><ellipse cx="110" cy="170" rx="8" ry="22" transform="rotate(-60 110 170)"/><ellipse cx="180" cy="166" rx="8" ry="22" transform="rotate(60 180 166)"/></g>' +
      '<g fill="{b}"><circle cx="132" cy="146" r="4"/><circle cx="160" cy="140" r="4"/></g>' +
      '<path d="M310 320V90" stroke="{c}" stroke-width="8"/>' +
      '<path d="M270 70v40c0 14 18 24 40 24s40-10 40-24V70M310 50v84" fill="none" stroke="{c}" stroke-width="8" stroke-linecap="round"/>' +
      '<path d="M280 260c10-20 20-30 30-30s20 10 30 30" fill="none" stroke="{c}" stroke-width="3" opacity=".6"/>' +
      '<path d="M60 320h340" stroke="{c}" stroke-width="3"/>',
  },
  erysikhthon: {
    palet: ['#7a5a3a', '#201a14', '#e4c890'],
    figur:
      '<path d="M120 320c10-40 20-80 20-120h60c0 40 10 80 20 120Z" fill="{c}"/>' +
      '<ellipse cx="170" cy="200" rx="30" ry="8" fill="{b}" stroke="{c}" stroke-width="3"/>' +
      '<path d="M156 196q14 6 28 0M150 204q20 6 40 0" fill="none" stroke="{c}" stroke-width="2"/>' +
      '<path d="M230 220l120-110" stroke="{c}" stroke-width="10" stroke-linecap="round"/>' +
      '<path d="M330 90c30-4 50 10 52 34-24-4-42 0-56 12Z" fill="{c}"/>' +
      '<path d="M200 170c40-60 100-90 160-90" fill="none" stroke="{c}" stroke-width="4" opacity=".4"/>' +
      '<g fill="{c}" opacity=".7"><circle cx="110" cy="120" r="10"/><circle cx="90" cy="150" r="8"/><circle cx="130" cy="90" r="7"/></g>',
  },
  europa: {
    palet: ['#3a6a8a', '#12202c', '#f2e2c0'],
    figur:
      '<path d="M80 236c10-40 60-56 120-54h90c10 0 20 10 20 24v40c-60 10-160 10-230-10Z" fill="{c}"/>' +
      '<path d="M286 186c10-24 34-34 56-28 20 6 30 26 26 46-4 18-20 28-40 30l-36 4Z" fill="{c}"/>' +
      '<path d="M310 162c-14-18-14-40 4-54M346 160c16-16 38-18 54-6" fill="none" stroke="{c}" stroke-width="7" stroke-linecap="round"/>' +
      '<circle cx="334" cy="196" r="5" fill="{b}"/>' +
      '<circle cx="180" cy="134" r="16" fill="{c}"/>' +
      '<path d="M180 150l-4 36M174 160c-30 8-52 0-70-20M186 160c30 0 60-6 100-24" fill="none" stroke="{c}" stroke-width="10" stroke-linecap="round"/>' +
      '<path d="M40 250q30-14 60 0t60 0 60 0 60 0 60 0 60 0M40 290q30-14 60 0t60 0 60 0 60 0 60 0 60 0M40 324q30-14 60 0t60 0 60 0 60 0 60 0 60 0" fill="none" stroke="{c}" stroke-width="3" opacity=".6"/>',
  },
  io: {
    palet: ['#3a6a6a', '#122424', '#e6d8a8'],
    figur:
      '<path d="M220 300c-10-60-10-120 0-170" stroke="{c}" stroke-width="6"/>' +
      '<g fill="none" stroke="{c}" stroke-width="4">' +
      '<path d="M220 140c-60-20-110-70-120-120M220 140c60-20 110-70 120-120M220 160c-80 0-140-30-170-80M220 160c80 0 140-30 170-80M220 190c-80 20-150 0-190-40M220 190c80 20 150 0 190-40"/></g>' +
      '<g fill="{c}"><circle cx="100" cy="30" r="12"/><circle cx="340" cy="30" r="12"/><circle cx="50" cy="80" r="12"/><circle cx="390" cy="80" r="12"/><circle cx="30" cy="150" r="12"/><circle cx="410" cy="150" r="12"/></g>' +
      '<g fill="{b}"><circle cx="100" cy="30" r="5"/><circle cx="340" cy="30" r="5"/><circle cx="50" cy="80" r="5"/><circle cx="390" cy="80" r="5"/><circle cx="30" cy="150" r="5"/><circle cx="410" cy="150" r="5"/></g>' +
      '<path d="M200 300c0-30 10-44 20-44s20 14 20 44Z" fill="{c}"/><circle cx="220" cy="120" r="14" fill="{c}"/>',
  },
  midas: {
    palet: ['#a8802a', '#241c10', '#f6dc8a'],
    figur:
      '<path d="M130 120l30 40 30-60 30 60 30-60 30 60 30-40-20 90H150Z" fill="{c}"/>' +
      '<g fill="{b}"><circle cx="190" cy="180" r="6"/><circle cx="250" cy="180" r="6"/><circle cx="220" cy="186" r="6"/></g>' +
      '<path d="M146 120c-14-40-10-80 6-100 10 30 14 60 8 90M294 120c14-40 10-80-6-100-10 30-14 60-8 90" fill="{c}" opacity=".7"/>' +
      '<path d="M220 230c-40 0-60 20-60 40s20 40 60 40 60-20 60-40-20-40-60-40Z" fill="{c}"/>' +
      '<path d="M220 230v-14M214 216c4-8 10-10 16-8" fill="none" stroke="{c}" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M186 260c6-8 14-12 22-12" fill="none" stroke="{b}" stroke-width="4" stroke-linecap="round"/>',
  },
  marsyas: {
    palet: ['#6a7a3a', '#1c2014', '#ecdca0'],
    figur:
      '<path d="M220 80l-80 220M220 80l80 220" stroke="{c}" stroke-width="10" stroke-linecap="round"/>' +
      '<path d="M200 80h40l-6 16h-28Z" fill="{c}"/>' +
      '<g fill="{b}"><circle cx="196" cy="150" r="4"/><circle cx="182" cy="190" r="4"/><circle cx="168" cy="230" r="4"/><circle cx="244" cy="150" r="4"/><circle cx="258" cy="190" r="4"/><circle cx="272" cy="230" r="4"/></g>' +
      '<path d="M100 70q20-20 40 0t40 0M260 50q20-20 40 0t40 0M300 120q20-20 40 0" fill="none" stroke="{c}" stroke-width="3" opacity=".6"/>' +
      '<path d="M40 320q30-10 60 0t60 0 60 0 60 0 60 0 60 0" fill="none" stroke="{c}" stroke-width="3" opacity=".7"/>',
  },
  'baukis-ve-philemon': {
    palet: ['#5a6a3a', '#1a2014', '#e8dcac'],
    figur:
      '<path d="M140 320c-4-50-2-100 4-140M300 320c4-50 2-100-4-140" stroke="{c}" stroke-width="14" stroke-linecap="round"/>' +
      '<path d="M146 220c40-20 80-20 150 0" fill="none" stroke="{c}" stroke-width="6" stroke-linecap="round"/>' +
      '<circle cx="140" cy="130" r="64" fill="{c}"/><path d="M300 60c44 10 70 50 60 90-10 40-50 60-90 50-40-10-54-50-40-84 10-30 40-60 70-56Z" fill="{c}"/>' +
      '<path d="M110 120c10-10 20-14 30-10M150 150c10-6 20-6 30 0M280 110c10 0 20 6 26 16M300 160c10-4 20-2 28 6" fill="none" stroke="{b}" stroke-width="3" opacity=".7"/>' +
      '<path d="M60 320h320" stroke="{c}" stroke-width="3"/>',
  },
  'pyramos-ve-thisbe': {
    palet: ['#8a3a4a', '#22141a', '#f0d6c0'],
    figur:
      '<path d="M40 330V180h160v150ZM240 330V180h160v150Z" fill="{c}" opacity=".4"/>' +
      '<path d="M220 330V60" stroke="{c}" stroke-width="40"/>' +
      '<path d="M220 80l-6 30 8 20-6 30 6 30-8 30 6 30" fill="none" stroke="{b}" stroke-width="5" stroke-linejoin="round"/>' +
      '<path d="M100 120c-14-14-34-10-34 6 0 18 34 34 34 34s34-16 34-34c0-16-20-20-34-6ZM340 120c-14-14-34-10-34 6 0 18 34 34 34 34s34-16 34-34c0-16-20-20-34-6Z" fill="{c}"/>',
  },
  'hero-ve-leandros': {
    palet: ['#2e4a6a', '#0e1626', '#f2d48a'],
    figur:
      '<path d="M320 320V110h50v210Z" fill="{c}"/>' +
      '<path d="M310 110h70l-35-24Z" fill="{c}"/>' +
      '<circle cx="345" cy="70" r="12" fill="{c}"/>' +
      '<path d="M345 40v-10M375 70h10M305 70h10M366 49l8-8M324 49l-8-8" stroke="{c}" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M40 240q30-14 60 0t60 0 60 0 60 0M40 280q30-14 60 0t60 0 60 0 60 0M40 316q30-14 60 0t60 0 60 0 60 0" fill="none" stroke="{c}" stroke-width="3" opacity=".7"/>' +
      '<circle cx="130" cy="230" r="10" fill="{c}"/>' +
      '<path d="M140 226c20-14 40-14 56-6" fill="none" stroke="{c}" stroke-width="6" stroke-linecap="round"/>',
  },
  orion: {
    palet: ['#354c75', '#151b33', '#f1d59a'],
    figur:
      '<path d="m114 91-28 58 23 56-19 82m19-82 67-20 23 77m-113-113 55 21 48-31 38-59m-86 90 35 15" fill="none" stroke="{c}" stroke-width="3" opacity=".55"/>' +
      '<path d="M187 88q67 48 38 121m-38-121 38 121" fill="none" stroke="{c}" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M85 149h1m27-58h1m-6 114h1m31-35h1m16 8h1m17 7h1m-87 102h1m108-25h1" stroke="{c}" stroke-width="10" stroke-linecap="round"/>' +
      '<path d="M268 232c12-18 36-15 46 1 19 2 37-11 39-28 2-12-7-24-19-21l-9 6m-53 36-13-14-18 3 10 13m26-14-8-17-16-3m28 46-7 14-18 5m34-17-2 18-12 9m22-29 6 16-8 14" fill="none" stroke="{c}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M38 310q65-20 137 0t185 0" fill="none" stroke="{c}" stroke-width="2" opacity=".35"/>',
  },
  arion: {
    palet: ['#2a5a7a', '#0e1a26', '#ecd8a0'],
    figur:
      '<path d="M80 220c40-60 120-80 200-60 40 10 70 30 90 60-30-10-60-10-80 0 10 20 6 40-10 50-4-20-14-34-30-40-50 20-110 20-170-10Z" fill="{c}"/>' +
      '<path d="M200 170c-10-30 0-50 20-60 0 20 6 40 20 54Z" fill="{c}"/>' +
      '<circle cx="110" cy="214" r="4" fill="{b}"/>' +
      '<circle cx="230" cy="94" r="14" fill="{c}"/>' +
      '<path d="M254 96c0-30 20-40 30-40M290 96c0-30-20-40-30-40M254 96h36M262 66v30M272 62v34M282 66v30" fill="none" stroke="{c}" stroke-width="3"/>' +
      '<path d="M40 290q30-14 60 0t60 0 60 0 60 0 60 0 60 0M40 322q30-14 60 0t60 0 60 0 60 0 60 0 60 0" fill="none" stroke="{c}" stroke-width="3" opacity=".6"/>',
  },
  'kephalos-ve-prokris': {
    palet: ['#6a5a3a', '#1c1a14', '#ecd8a8'],
    figur:
      '<path d="M60 90l300 150" stroke="{c}" stroke-width="8" stroke-linecap="round"/>' +
      '<path d="M360 240l-34-4 14-24Z" fill="{c}"/>' +
      '<path d="M60 90l-10-20M60 90l-20-4" stroke="{c}" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M300 330c-20-30-10-60 20-70 10 20 30 30 50 20 10 20 0 40-10 50Z" fill="{c}" opacity=".8"/>' +
      '<path d="M330 300c-10-20 0-30 10-34M360 296c4-14 14-20 24-20" fill="none" stroke="{b}" stroke-width="3"/>' +
      '<path d="M60 200q20-10 40 0t40 0M40 240q20-10 40 0t40 0M80 160q20-10 40 0" fill="none" stroke="{c}" stroke-width="3" opacity=".5"/>',
  },
  'altin-koc': {
    palet: ['#3a6f88', '#14233a', '#f0cd7c'],
    figur:
      '<circle cx="352" cy="66" r="20" fill="{c}" opacity=".5"/>' +
      '<path d="M122 176c-18-6-30 6-28 22 8 10 22 10 32 2Z" fill="{c}"/>' +
      '<path d="M128 186c-4-22 14-38 32-34 8-16 32-18 44-6 14-12 36-8 44 6 20-4 36 10 36 28 10 16 0 36-18 40-10 16-32 18-46 8-14 12-38 10-48-2-18 4-36-6-38-20-8-4-10-12-6-20Z" fill="{c}"/>' +
      '<path d="M256 214c30-6 52-30 56-58l-34-30c-22 14-34 38-34 60Z" fill="{c}"/>' +
      '<path d="M272 132c16-18 46-18 60 0l36 22c6 6 4 16-6 18l-28 4c-20 4-44 0-58-14Z" fill="{c}"/>' +
      '<path d="M300 122c-22-12-50 4-48 30 2 24 34 34 48 16 12-16-2-36-18-30-12 4-12 20 0 22" fill="none" stroke="{b}" stroke-width="15" stroke-linecap="round"/>' +
      '<path d="M300 122c-22-12-50 4-48 30 2 24 34 34 48 16 12-16-2-36-18-30-12 4-12 20 0 22" fill="none" stroke="{c}" stroke-width="8" stroke-linecap="round"/>' +
      '<circle cx="330" cy="142" r="4" fill="{b}"/>' +
      '<path d="M252 220l44 18 40-14M228 230l38 30 42-4M160 226l-34 26-38 2M184 232l-28 36-36 8" fill="none" stroke="{c}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M150 176q10-12 20 0t20 0M196 170q10-12 20 0t20 0M160 200q10-12 20 0t20 0M208 198q10-12 20 0t20 0" fill="none" stroke="{b}" stroke-width="3" opacity=".7"/>' +
      '<path d="M40 304q30-12 60 0t60 0 60 0 60 0 60 0 60 0M40 328q30-12 60 0t60 0 60 0 60 0 60 0 60 0" fill="none" stroke="{c}" stroke-width="3" opacity=".6"/>',
  },
  'guzellik-yarismasi': {
    palet: ['#8a4a58', '#2a1626', '#f0cf86'],
    figur:
      '<path d="M220 22v30M118 60l20 24M322 60l-20 24M64 150l28 8M376 150l-28 8" stroke="{c}" stroke-width="4" stroke-linecap="round" opacity=".7"/>' +
      '<g transform="translate(48.4 12) scale(.78)">' +
      '<path d="M220 112c-20-18-76-16-90 30-14 50 20 112 60 118 12 2 20-4 30-4s18 6 30 4c40-6 74-68 60-118-14-46-70-48-90-30Z" fill="{c}"/>' +
      '<path d="M220 116c-2-22 4-38 18-50" fill="none" stroke="{c}" stroke-width="8" stroke-linecap="round"/>' +
      '<path d="M236 88c10-26 38-34 62-26-8 24-36 36-62 26Z" fill="{c}"/>' +
      '<path d="M198 118q22 14 44 0" fill="none" stroke="{b}" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M128 176h184M142 220h156M140 210l14-24 14 24 14-24 14 24 14-24 14 24 14-24 14 24 14-24 14 24 14-24" fill="none" stroke="{b}" stroke-width="4" stroke-linejoin="round"/>' +
      '<path d="M150 146c4-14 14-22 26-24" fill="none" stroke="{b}" stroke-width="5" stroke-linecap="round" opacity=".5"/>' +
      '</g>' +
      '<path d="M90 318l-8-34 18 14 10-22 10 22 18-14-8 34Z" fill="{c}"/>' +
      '<path d="M192 324v-24c0-18 12-28 28-28s28 10 28 28v24h-18v-18h-20v18Z" fill="{c}"/>' +
      '<path d="M182 284c2-24 18-36 38-36s36 12 38 36h-9c-4-16-14-22-29-22s-25 6-29 22Z" fill="{c}"/>' +
      '<path d="M330 320c-34-20-32-44-12-46 8 0 12 6 12 10 0-4 4-10 12-10 20 2 22 26-12 46Z" fill="{c}"/>',
  },
  antigone: {
    palet: ['#74637d', '#241d2c', '#eccb9b'],
    figur:
      '<path d="M79 297q61-21 100-12l50-24q47-16 122 23l20 13Z" fill="{c}" opacity=".38"/>' +
      '<path d="M87 304h269m-191-17q62-25 124-7" stroke="{c}" stroke-width="4" fill="none"/>' +
      '<g transform="rotate(32 212 149)">' +
      '<path d="M192 84h40v13h-40Zm5 14h30v37c0 9 32 29 32 56 0 22-20 37-47 37s-47-15-47-37c0-27 32-47 32-56Z" fill="{c}"/>' +
      '<path d="M228 126c42-32 67 29 25 46" fill="none" stroke="{c}" stroke-width="10"/>' +
      '<path d="M175 176h74m-78 17h82m-75 12h68" stroke="{b}" stroke-width="4"/>' +
      '</g>' +
      '<path d="M222 92q-58 1-82 49t-15 122" fill="none" stroke="{c}" stroke-width="5" stroke-linecap="round" stroke-dasharray="1 12"/>' +
      '<path d="m306 145 16 12-16 12-16-12Z" fill="{c}" opacity=".8"/>',
  },
  medeia: {
    palet: ['#8c4a47', '#321b2d', '#ffd28f'],
    figur:
      '<circle cx="220" cy="128" r="61" fill="none" stroke="{c}" stroke-width="3" opacity=".56"/>' +
      '<path d="M220 52V39m0 178v-24m-76-65h-16m184 0h-16m-129-53-14-14m134 134-14-14m0-106 14-14m-134 134 14-14" stroke="{c}" stroke-width="4"/>' +
      '<circle cx="200" cy="106" r="14" fill="{c}"/>' +
      '<path d="M192 123c-17 12-20 38-28 72h46l-3-55 24 21 23-8-3-7-18 4-24-26Z" fill="{c}"/>' +
      '<path d="M129 188q55 16 132 0l-13 42h-97Z" fill="{c}"/>' +
      '<circle cx="184" cy="252" r="26" fill="{b}" stroke="{c}" stroke-width="8"/>' +
      '<path d="M159 252h50m-25-25v50M250 213q56 36 79-5c17-29-44-30-39-60 4-21 29-18 42-12M307 190l28-25-8 23 25-7-18 26" fill="none" stroke="{c}" stroke-width="7" stroke-linejoin="round"/>' +
      '<path d="M330 129l22 8-16 8Z" fill="{c}"/>',
  },
  'iphigeneia-auliste': {
    palet: ['#5b696a', '#1e3136', '#f1d5a7'],
    figur:
      '<path d="M126 268h186v14H126Zm14 14h158v22H140Z" fill="{c}"/>' +
      '<path d="M162 220c-10-26 21-49 70-43l32 5 20-47 20-13 23 10-17 16-12 1-17 61-21 14-11 39h-10l-3-43-42-5-20 49h-11l9-47Zm-1-10-21-13 14-5 13 10Z" fill="{c}"/>' +
      '<path d="M292 132c-15-17-22-38-17-58m1 32-18-12m38 33c8-16 12-38 2-58m5 35 15-14" fill="none" stroke="{c}" stroke-width="5" stroke-linecap="round"/>' +
      '<circle cx="310" cy="133" r="2.5" fill="{b}"/>' +
      '<path d="M163 73c-15 16-12 39 9 47-33 9-50-33-9-47Z" fill="{c}"/>' +
      '<path d="M105 238q17-51 68-93m-35 102q8-34 37-65" fill="none" stroke="{c}" stroke-width="3" opacity=".55"/>',
  },
  kassandra: {
    palet: ['#864d60', '#281b2f', '#f4cda4'],
    figur:
      '<path d="M94 275v-88h20v-19h22v19h22v-19h22v19h80v-19h22v19h22v-19h22v19h20v88Z" fill="{c}"/>' +
      '<path d="M195 275v-41a25 25 0 0 1 50 0v41Zm-83-63h13v24h-13Zm203 0h13v24h-13Z" fill="{b}"/>' +
      '<path d="M126 244h45m98 0h45m-157 15h24m78 0h24" stroke="{b}" stroke-width="3" opacity=".7"/>' +
      '<path d="M142 110q78-79 156 0-78 79-156 0Z" fill="none" stroke="{c}" stroke-width="6"/>' +
      '<circle cx="220" cy="110" r="24" fill="{c}"/><circle cx="220" cy="110" r="10" fill="{b}"/>' +
      '<path d="M220 43v18m-49-6 10 14m88-14-10 14M151 142l-16 13m154-13 16 13" stroke="{c}" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M81 294h278" stroke="{c}" stroke-width="5"/>',
  },
  'dionysos-ve-pentheus': {
    palet: ['#5b5269', '#20282d', '#dece91'],
    figur:
      '<path d="M102 298q49-41 89-54 30 13 69 2 36 16 77 52Z" fill="{c}" opacity=".45"/>' +
      '<path d="M170 291 264 116" fill="none" stroke="{c}" stroke-width="11" stroke-linecap="round"/>' +
      '<path d="M249 118q-16-28 34-58 22 53-9 68Z" fill="{c}"/>' +
      '<path d="m263 93 19 9m-23 3 19 9m-8-30 14 7" stroke="{b}" stroke-width="3"/>' +
      '<path d="M205 221c50 5 74-32 55-48-14-11-31 3-25 15m-21 14c-28-27-53-39-68-21-10 12 1 27 12 22" fill="none" stroke="{c}" stroke-width="5"/>' +
      '<path d="M156 185q-43-2-46-34 33-2 46 34Zm105 24q11-42 47-33-13 31-47 33Z" fill="{c}"/>' +
      '<path d="M132 263v-39m-27 19 27-43 28 43Zm180 24v-30m-25 15 25-40 24 40Z" fill="{c}"/>',
  },
  alkestis: {
    palet: ['#676782', '#222437', '#edd5b2'],
    figur:
      '<path d="M151 291V153a69 69 0 0 1 138 0v138m-116 0V153a47 47 0 0 1 94 0v138M132 292h176" fill="none" stroke="{c}" stroke-width="9"/>' +
      '<path d="M198 163q22-28 44 0l24 105h-92Z" fill="{c}"/>' +
      '<path d="M205 172q15 13 30 0m-36 25-9 59m23-66-4 66m17-66 4 66m10-59 9 59" fill="none" stroke="{b}" stroke-width="4"/>' +
      '<path d="M307 270l19-93 20 4-20 93-9 9Z" fill="{c}"/>' +
      '<path d="m330 184 14-13m-10 37 12-8" stroke="{c}" stroke-width="6" stroke-linecap="round"/>' +
      '<path d="M220 58v14m-21-9 5 12m37-12-5 12" stroke="{c}" stroke-width="4" stroke-linecap="round"/>',
  },
  'aineias-truvadan-kacis': {
    palet: ['#a35440', '#34212b', '#f3cd94'],
    figur:
      '<path d="M68 255V155h24v-18h19v18h22v-18h19v18h24v100Zm211 0v-87h26v-20h21v20h25v-20h20v107Z" fill="{c}" opacity=".32"/>' +
      '<path d="M82 136c-20-28 16-38 11-62 30 37 23 54 10 66m216 10c-26-28 9-45 5-69 27 25 27 53 10 73" fill="{c}" opacity=".55"/>' +
      '<circle cx="225" cy="131" r="16" fill="{c}"/>' +
      '<path d="M209 149q-23 7-31 50l-10 41 15 5 18-32-2 25-30 55 13 8 41-49 16 13 10 33 16-4-5-44-23-30-5-51 26 26 22 3 2-11-16-5-21-30Z" fill="{c}"/>' +
      '<circle cx="169" cy="119" r="14" fill="{c}"/>' +
      '<path d="M161 135c-22 4-36 28-31 55l39 17 14-33 22-21-7-11-25 14Z" fill="{c}"/>' +
      '<path d="m151 156 24 15m-37 9 28 13" stroke="{b}" stroke-width="4"/>' +
      '<circle cx="299" cy="205" r="12" fill="{c}"/>' +
      '<path d="m280 188 18 32 26 24-6 7-18-12 2 17 13 32-11 5-15-28-10 27-11-4 8-41 5-23-11-25Z" fill="{c}"/>' +
      '<path d="m291 69 5 13 13 5-13 5-5 13-5-13-13-5 13-5Z" fill="{c}"/>',
  },
  'afrodit-ve-adonis': {
    palet: ['#93515b', '#341e34', '#f7ceae'],
    figur:
      '<path d="M218 169c-14 47-11 86 13 129m-18-63c-43 5-68-13-76-35 34-3 66 12 76 35Zm9 38c37-6 59-30 57-54-31 7-54 24-57 54Z" fill="none" stroke="{c}" stroke-width="7" stroke-linejoin="round"/>' +
      '<path d="M220 123C194 88 218 56 240 71c15 10 8 31-4 51 32-24 60-10 56 13-3 19-30 22-53 14 28 28 15 54-8 50-18-3-22-26-18-48-16 29-41 36-54 20-14-17 3-36 41-37-26-8-40-30-27-46 17-19 40 1 47 35Z" fill="{c}"/>' +
      '<circle cx="220" cy="138" r="15" fill="{b}"/>' +
      '<path d="M289 281q17-23 38-26l15-20 5 17 18 11-7 13-20-3-17 12-12 13h-18l9-14Zm52-7 14 13 2-15" fill="{c}" opacity=".8"/>' +
      '<path d="M103 108q21-14 50-12m-60 32q19-10 43-9" stroke="{c}" stroke-width="4" stroke-linecap="round" fill="none" opacity=".7"/>',
  },
  'kirke-ve-odysseus': {
    palet: ['#4d746f', '#202d36', '#e6d4a8'],
    figur:
      '<path d="M135 144h170l-14 38c-15 42-41 63-70 63s-56-21-72-63Zm78 96h16v37l48 12v10H165v-10l48-12Z" fill="{c}"/>' +
      '<path d="M139 155c-53-15-58 37 36 57m126-57c53-15 58 37-36 57" fill="none" stroke="{c}" stroke-width="8"/>' +
      '<path d="M155 170h130m-119 17h108m-94 21 13-13 13 13 14-13 14 13 13-13 13 13" stroke="{b}" stroke-width="4" fill="none"/>' +
      '<path d="M226 141q15-38-5-73m11 44q22-22 42-10-16 17-42 10Zm-3 11q-31-4-35-23 27-1 35 23Z" fill="none" stroke="{c}" stroke-width="4"/>' +
      '<path d="M221 66c-29 2-23-19-8-16-7-17 12-23 15-5 14-11 26 6 9 13 9 13-9 22-16 8Z" fill="{c}"/>' +
      '<circle cx="224" cy="57" r="4" fill="{b}"/>' +
      '<path d="m111 102 4 12 12 4-12 4-4 12-4-12-12-4 12-4Zm215-22 4 10 10 4-10 4-4 10-4-10-10-4 10-4Z" fill="{c}"/>',
  },
};

export function mitGorseli(slug: string): MitGorseli {
  return gorseller[slug] ?? kolon;
}
